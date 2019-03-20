<template>
    <div class="content">
        <el-row :gutter="10" id="mainContent">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                <div class="video">
                    <img :src="url" alt="视频流">
                    <p id="loadText">图像加载中...</p>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" id="control">
                <v-control :shotAdd="shotImg" v-on:update = "StreamUpdate"/>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {utils} from '../common/util.js'
import ControlPanel from './ControlPannel'
import loading from '../assets/loading.gif'
import errorImg from '../assets/error.png'

export default {
    data() {
        return {
            stream: '',
            url:loading,
            shotImg: ''
        }
    },
    methods: {
        StreamUpdate() {
            this.updateIMG();
        },
        newImg() {
            let newIMG = new Image();
            let text = document.getElementById('loadText');
            this.stream = utils.streamAds();
            this.shotImg = this.stream.replace(/stream/,'snapshot');
            newIMG.src = this.stream;
            newIMG.onload = () => {
                this.url = this.stream;
                if(text) {
                    text.remove();
                };
            }
        },
        updateIMG() {
            this.url = loading;
            setTimeout(() => {
                this.url = this.stream;
                let text = document.getElementById('loadText');
                if(text) {
                    text.remove();
                };
            }, 1000);
        }
    },
    mounted() {
        this.newImg();
    },
    components: {
        'v-control':ControlPanel,
    }
}
</script>
<style lang="scss" scoped>
    .content{
        height: 100%;
        width: 97%;
        margin:0 auto;
        @media only screen and (max-width: 450px) {
           .video {
            width: 100%;
            height: 200px;
                img {
                    width: 100%;
                    height: 100%;
                }
            } 
        }
        @media only screen and (min-width: 450px) and (max-width: 850px) {
           .video {
            width: 100%;
            height: 350px;
                img {
                    width: 100%;
                    height: 100%;
                }
            } 
        }
        @media only screen and (min-width: 850px) and (max-width: 1300px) {
           .video {
            width: 100%;
            height: 420px;
                img {
                    width: 100%;
                    height: 100%;
                }
            } 
        }
        @media only screen and (min-width: 1300px) {
           .video {
            width: 100%;
            height: 500px;
                img {
                    width: 100%;
                    height: 100%;
                }
            } 
        }
        #mainContent {
            @media only screen and (max-width: 1200px) {
                height: 100%;
                display:flex;
                flex-flow: column;
            }
        }
        #loadText {
            color:white;
            position: relative;
            top: -17%;
            font-size:20px;
            letter-spacing: 3px;
        }
        .video {
            padding-bottom: 8px;
        }
        #control {
            flex:1;
        }
    }
</style>

