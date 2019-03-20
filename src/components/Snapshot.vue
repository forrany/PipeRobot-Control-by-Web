<template>
    <div class="mark" @click.stop = 'quit'>
        <el-card class="snapWrapper" :body-style="{ padding: '0px' }" id="wrapper">
            <div style="padding: 14px;" id="afterImg">
                <span>拍照图像</span>
                <div class="bottom clearfix">
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">
                    <a target="_blank" id="down" :href="snapAdd" :download="currentDate">点击下载</a>
                </el-button>
                </div>
            </div>
        </el-card>
    </div>
    
</template>

<script>
import moment from 'moment'
export default {
    data() {
        return {
            currentDate: moment().format('YYYY/MM/DD, hh:mm:ss'),
            snapAdd:'./SnapShoot/current.png',
            stable: '',
            IP:'',
        }
    },
    methods: {
        quit() {
            this.$root.$emit('closeSnap');
            document.getElementById('snapshotImg').remove();
        },
        newCapture() {
            this.snapAdd = `http://${this.IP}:8081/SnapShoot/current.png?t=${Math.random()}`;
            let img = document.createElement('img');
            let oDiv = document.getElementById('afterImg');
            let wrapper = oDiv.parentElement;
            img.setAttribute('class','image');
            img.setAttribute('id','snapshotImg');
            img.setAttribute('src',this.snapAdd);
            wrapper.insertBefore(img,oDiv);
        },
        getPath(){
            let add = decodeURI(decodeURIComponent(this.$route.path));
            let reg = /http:\/\/\d+\.\d+\.\d+\.\d+\:\d{4}\/\?action=stream/
             if(reg.test(add)) {
                let snap = add.match(reg)[0];
                this.stable = snap.replace('stream','snapshot');
                this.IP = this.stable.match(/\d+.\d+.\d+.\d+/)[0];
                this.snapAdd = `http://${this.IP}:8081/SnapShoot/current.png?t=${Math.random()}`;
             }
        },
    },
    watch: {
        '$route':'getPath',
    },
}
</script>

<style lang="scss" scoped>
.mark {
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.98);
    position:absolute;
    z-index: 99;
}

.snapWrapper {
    width: 50vh;
    position:fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }
  #down {
      color:#4093de
      
  }
  #down:hover {
    color:#409eff
    }
  #snapshotImg {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
