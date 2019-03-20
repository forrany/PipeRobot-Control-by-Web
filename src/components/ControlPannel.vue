<template>
    <div class="Pannel">
        <div class="panelHeader">
            <h3>{{title}}</h3>
        </div>
        <div class="panelBody">
            <div class="videoControl">
                <el-form id="videoSet">
                    <v-videoSlect v-on="$listeners" position="ControlPannel"/>
                </el-form>      
                <v-button class="photo" name='点击拍照' sendData = '/snapShoot'/>            
            </div>
            <v-speed />              
            <div class="buttonBlock">
                <el-row><h3>运动控制区</h3></el-row>
                <el-row class="btnCol" type="flex" justify="space-between">
                    <v-button name='前进' sendData = '/up' />
                    <v-button name='后退' sendData = '/down' />
                    <v-button name='停止' sendData = '/stop' />
                </el-row>
            </div>
            <div class="buttonBlock">
                <el-row><h3>伸缩控制区</h3></el-row>
                <el-row class="btnCol" type="flex" justify="space-between" >
                    <v-button name='伸展' sendData = '/stretch' />
                    <v-button name='收缩' sendData = '/shrink' />
                    <v-button name='停止' sendData = '/stop' />
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
import Button from './Button'
import videoSlect from './VideoSelect'
import SpeedControl from './SpeedControl'

export default {
    components:{
        'v-button':Button,
        'v-videoSlect': videoSlect,
        'v-speed': SpeedControl
    },
    props: {
        title:{
            default:'控制面板'
        }
    },
    data() {
        return {
            keyFlag: false,
            motionSpeed:50
        }
    },
    mounted() {
        this.$axios.defaults.headers.post['Content-Type']='application/json;charse=UTF-8';
/*         document.addEventListener('keydown',(el)=>{
            if(el.key === 'ArrowUp' && !this.keyFlag) {
                this.$axios.get('/up');
                this.keyFlag = true;
            }
        })
        document.addEventListener('keyup',(el)=>{
            if(el.key === 'ArrowUp') {
                this.$axios.get('/stop');
                this.keyFlag = false;
            }
        }) */
    }
}
</script>
<style lang="scss" scoped>
    .Pannel {
        border-radius: 4px;
        box-shadow: 0 1px 1px rgba($color: #000000, $alpha: 0.05);
        width: 100%;
        height:98%;
        display:flex;
        flex-flow: column;
        box-sizing: border-box;
        border-color: #337ab7;
        overflow: hidden;
        .panelHeader {
            color: #fff;
            background-color: #3379FE;
            border-color: #337ab7;
            padding: 10px 15px;
            border-bottom: 1px solid transparent;
            box-sizing: border-box;
            text-align: left;
        }
        .panelBody {
            color: rgb(51,51,51);
            padding: 5px 15px;
            background-color: #fff;
            padding-bottom:20px;
            flex:1;
            @media only screen and (min-width:1200px) and (max-width: 1300px){
                height:356.387px;
            }
            @media only screen and (min-width:1300px){
                height:435px;
            }
            .videoControl {
                position: relative;
                @media only screen and (max-width: 550px) {
                    margin-bottom:10px;
                    .photo {
                        width:100%;
                    }
                }
                @media only screen and (min-width: 550px) {
                    .photo {
                        position:absolute;
                        width: 27%;
                        top:0px;
                        right:5%;
                    }
                }
                #videoSet {
                    width: 300px;
                    margin: 0 7px;
                }
            }
            .buttonBlock {
                margin-top: 17px;
                border: 2px solid #F6F4F5;
                border-radius: 8px; 
                height:70px;    
                @media only screen and (min-width:1200px) and (max-width: 1300px) {
                    margin: 20px 0px;
                    padding-top:20px;
                }
                @media only screen and (min-width:1300px){
                    margin: 40px 0px;
                    padding-top:20px;
                }
                .btnCol {
                    height: 100%;
                    align-items: center;
                }         
            }
        }
    }
</style>
