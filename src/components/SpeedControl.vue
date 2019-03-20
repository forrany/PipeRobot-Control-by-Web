<template>
    <div class="speedControl">
        <el-row type="flex" align="center" id="content">
            <el-col :xs="5" :sm="3" :md="3" :lg="3" :xl="3">
                <span>速度控制</span>
            </el-col>
            <el-col :xs="18" :sm="20" :md="20" :lg="20" :xl="20">
                <el-slider
                    v-model="motionSpeed">
                </el-slider>
            </el-col>
        </el-row>
    </div>      
</template>

<script>
export default {
    data() {
        return {
            motionSpeed:50,
            timer: null
        }
    },
    mounted() {
        this.$axios.get('/speed').then((val) => {
            this.motionSpeed = val.data.speed;
        })
    },
    watch: {
        motionSpeed(val) {
            if(this.timer) {clearTimeout(this.timer)}
            this.timer = setTimeout(() => {
                this.$axios.post('/speedSet',{
                    'speed':val
                }).then(data => {
                    console.log(data)
                }).catch(err => {
                    console.log(err)
                })
            }, 200);
        }
    },
}
</script>

<style lang="scss" scoped>
    .speedControl {
        text-align: left;
        #content{
            z-index: 0;
            background-color: #fff;
        }
        span {
            line-height:38px;
        }
    }
</style>
