<template>
    <div class="Pannel">
        <div class="panelHeader">
            <h3>机械臂控制端</h3>
        </div>
        <div class="panelBody">
            <span>手爪末端</span>
            <el-slider v-model="ender"></el-slider>
            <span>手腕旋转关节</span>
            <el-slider v-model="wristX"></el-slider>
            <span>手腕抬起关节</span>
            <el-slider v-model="wristY"></el-slider>
            <span>手臂关节</span>
            <el-slider v-model="ArmY"></el-slider>
            <span>手臂平移</span>
            <el-slider v-model="ArmX"></el-slider>
        </div>
        <el-row>
            <el-button type="primary" @click="btnClick">自动执行</el-button>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ender:50,
            wristX: 50,
            wristY: 50,
            ArmY:50,
            ArmX: 50,
            armYTimer:null,
            io : false
        }
    },
    methods: {
        btnClick() {
            this.$axios.get('/autoArm').then(data=>{
                console.log(data.data);
                this.ender = data.data.ender;
                this.wristX = data.data.wristX;
                this.wristY = data.data.wristY;
                this.ArmY = data.data.ArmY;
                this.ArmX = data.data.ArmX;
            }).catch(err=>{
                console.log(err);
            })
        },
    },
    mounted() {
        document.addEventListener('mousedown',()=>{
            this.io = true;
        })
        document.addEventListener('mouseup',()=>{
            this.io = false;
        })
        document.addEventListener('keydown',(el)=> {
            switch (el.key) {
                case 'ArrowUp':
                    this.ArmY++;
                    break;
                case 'ArrowDown':
                    this.ArmY--;
                    break;
                case 'ArrowLeft': 
                    this.ArmX--;
                    break;
                case 'ArrowRight':
                    this.ArmX++;
                    break;
                case 'w':
                    this.wristY++;
                    break;
                case 's':
                    this.wristY--;
                    break;
                case 'a':
                    this.wristX--;
                    break;
                case 'd':
                    this.wristX++;
                    break;
                case 'f':
                    this.ender++;
                    break;
                case 'r':
                    this.ender--;
                    break;
            }   
        })
    },
    watch:{
        ender() {
            this.$axios.post('/ender',{
                'value':this.ender,
            }).then((data) => {
                console.log(data.data)
            }).catch(err => {
                console.log(err)
            })
        },
        wristX() {
            this.$axios.post('/wristX',{
            'value':this.wristX,
            }).then((data) => {
                console.log(data.data)
            }).catch(err => {
                console.log(err)
            })
        },
        wristY() {
            this.$axios.post('/wristY',{
                'value':this.wristY,
            }).then((data) => {
                console.log(data.data)
            }).catch(err => {
                console.log(err)
            })
        },
        ArmY() {
            this.$axios.post('/ArmY',{
            'value':this.ArmY,
            }).then((data) => {
                console.log(data.data)
            }).catch(err => {
                console.log(err)
            })
        },
        ArmX() {
            this.$axios.post('/ArmX',{
                'value':this.ArmX,
            }).then((data) => {
                console.log(data.data)
            }).catch(err => {
                console.log(err)
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .Pannel {
        border-radius: 4px;
        box-shadow: 0 1px 1px rgba($color: #000000, $alpha: 0.05);
        width: 100%;
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
            margin-bottom: 10px;
            .camera {
                position: relative;
                display: flex;
                border-radius: 8px;
                border:2px solid #F6F4F5;
                align-items: center;
                .desc{
                    width: 50px;
                    height: 50px;
                    margin-right: 5px;
                    background-size: 150% auto;
                    background-repeat: no-repeat;
                    background-position: -9px -14px;
                }
                .el-slider {
                    flex: 1;
                }
            }
            .buttonBlock {
                margin-top: 2px;
                border: 2px solid #F6F4F5;
                border-radius: 8px;
                .switch{
                    align-items: center;
                    .switchContent {
                        margin-left: 29px;
                    }
                }
                .el-row {
                    margin: 10px;
                }                
            }
        }
    }
</style>

