var express = require('express');
var app = express();
var bodyParse = require("body-parser");
//var Gpio = require('onoff').Gpio;
//var rpio = require('rpio');
var shell = require('shelljs');
var download = require('./downIMG');
const path = require('path');
var SerialPort = require('serialport');
const IP = getIPAdress();
const PORT = '8082';
const videoCommand = [
	'mjpg_streamer -i "./input_uvc.so -r 640x480 -q 70 -f 30 -d /dev/video0 -n" -o "./output_http.so -p 8082 -w /usr/local/www"',
	'mjpg_streamer -i "./input_uvc.so -r 1280x720 -q 70 -f 15 -d /dev/video0 -n" -o "./output_http.so -p 8082 -w /usr/local/www"',
	'mjpg_streamer -i "./input_uvc.so -r 1920x1080 -q 70 -f 15 -d /dev/video0 -n" -o "./output_http.so -p 8082 -w /usr/local/www"'
]

const snapAddress = `http://${IP}:${PORT}/?action=snapshot`;

var speed = 50; //运动速度
var videoStatus = 0;  // 1-流畅； 2-清晰； 3-高清， 默认清晰
const port = new SerialPort('/dev/ttyAMA0', {
	baudRate: 9600
})   //使用串口，与下位机机型通讯

port.write('main screen turn on', function (err) {
	if (err) {
		return console.log('Error on write: ', err.message)
	}
	console.log('message written')
})

// Open errors will be emitted as an error event
port.on('error', function (err) {
	console.log('Error: ', err.message)
})

// Switches the port into "flowing mode"
port.on('data', function (data) {
	console.log('Data:', data.toString())
})
 const buf1 = Buffer.alloc(1,1),  //前进
	buf2 = Buffer.alloc(1,2),  //后退
	buf3 = Buffer.alloc(1,3),  //伸张
	buf4 = Buffer.alloc(1,4),  //收缩
	buf5 = Buffer.alloc(1,5);  //停止

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParse.json({ limit: '1mb' }));  //body-parser 解析json格式数据
app.use(bodyParse.urlencoded({extended:false}));
/* app.post('/ServerControl',function(req,res){
	console.log(req.body.value);
	let rotation = req.body.value * 20 + 500;  //转换成毫秒数
	pwm.setPulseLength(1, rotation);
	res.end(JSON.stringify({success:true}));
})
 */
app.post('/VideoSet',(req,res) => {
	if(+req.body.Video === videoStatus) {
		res.end('Same Video Set');
		return;
	}
	switch (req.body.Video) {
		case "1": 
			openVideo(0);
			res.end('Success');
			break;
		case "2":
			openVideo(1);
			res.end('Success');
			break;
		case "3": 
			openVideo(2);
			res.end('Success');
			break;
	}
})
app.get('/capture', function (req, res) {
	download(snapAddress,'current.png',function(){
		res.send('Capture Sussess');
	})
}) 
app.get('/speed',function(req,res) {
	res.send({'speed':speed});
}) 
app.post('/speedSet',(req,res) => {
	speed = req.body.speed;
	res.end('Speed Set Success');
})

app.get('/VideoStatus', function(req, res){
	res.send(videoStatus.toString());
})

app.get('/',function(req,res){
	res.sendFile(__dirname + '/' + "index.html");
})
app.get('/up',function(req,res){
	console.log("up recieve");
	res.send('ok');
	port.write(buf1,'hex');
})
app.get('/down',function(req,res){
	console.log('down recieve');
	res.send('ok');
	port.write(buf2,'hex');
	
})
app.get('/stretch', function (req, res) {
	console.log('stretch');
	res.send('ok');
	port.write(buf3,'hex');

})
app.get('/shrink',function(req,res){
	console.log('shrink recieve');
	res.send('ok');
	port.write(buf4);
})
app.get('/stop',function(req,res){
	console.log('stop!!!');
	res.send('ok');
	port.write(buf5);
})
var server = app.listen(8081,function(){
	console.log("Server is running at 8081 port...");
});

function openVideo(qulity) {
	return new Promise((resolve,reject) => {
		if (shell.exec('pgrep mjpg_streamer').stdout !== '') {
			shell.exec('killall mjpg_streamer');
		}
		let command = videoCommand[qulity];
		shell.cd('~');
		shell.cd('mjpg-streamer/mjpg-streamer-experimental/')
		shell.exec(command, (code, std, err) => {
			console.log('Exit code:', code);
			console.log('Program output:', std);
			console.log('Program stderr:', err);
		})
		videoStatus = +qulity + 1;
		resolve('Success');
	})
}

function getIPAdress() {
	var interfaces = require('os').networkInterfaces();
	for (var devName in interfaces) {
		var iface = interfaces[devName];
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i];
			if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
				return alias.address;
			}
		}
	}
} 