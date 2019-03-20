<template>
    <div class="wrapper">
        <a ref="btn" href="#" class="button">{{name}}</a>
    </div>
</template>
<script>
import {utils} from '../common/util.js'
export default {
    props: {
        name: String,
        sendData: String,
    },
    data() {
        return {
            client:'',
            CLICKEVENT: '',
        }
    },
    mounted() {
        this.CLICKEVENT = 'click';
        /* this.client = utils.clientCheck();
        if(this.client === 'PC') {
            this.CLICKEVENT = 'click';
        } else {
            this.CLICKEVENT = 'tap';
        } */
        this.$refs.btn.addEventListener('contextmenu',(e) => {
            e.preventDefault();
        });
        if(this.name !== '点击拍照') {
            /* this.$refs.btn.addEventListener(this.CLICKEVENT,(e) => {
                this.$axios.get(this.sendData);
            }); */
            this.$refs.btn.addEventListener('click',(e) => {
                this.$axios.get(this.sendData);
            });
        } else {
            /* this.$refs.btn.addEventListener(this.CLICKEVENT,(e) => {
                this.$root.$emit('showSnap')
            }); */
            this.$refs.btn.addEventListener('click',(e) => {
                this.$axios.get('/capture').then(data => {
                    this.$root.$emit('updateDate')
                    this.$root.$emit('showSnap')
                })
            });
        }
    },
}
</script>
<style lang="scss" scoped>
    .wrapper {
        width: 100%;
        -webkit-perspective: 400;
        .button {
            -webkit-transform: rotateX(20deg);
            display: inline-block;
            text-decoration: none;
            color: #fff;
            font-weight: bold;
            background-color: #538fbe;
            padding: 10px 25%;
            font-size: 16px;
            border: 1px solid #2d6898;
            background-image: linear-gradient(bottom, rgb(73,132,180) 0%, rgb(97,155,203) 100%);   
            background-image: -webkit-gradient(
                linear,
                left bottom,
                left top,
                color-stop(0, rgb(73,132,180)),
                color-stop(1, rgb(97,155,203))
            );
            box-shadow: 0px 6px 0px #2b638f, 0px 3px 15px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
            border-radius: 5px;
            text-shadow: 0px -1px 0px rgba(0,0,0,.5);
        }
        .button:hover {
            background-image: linear-gradient(bottom, rgb(79,142,191) 0%, rgb(102,166,214) 100%);
            background-image: -webkit-gradient(
                linear,
                left bottom,
                left top,
                color-stop(0, rgb(79,142,191)),
                color-stop(1, rgb(102,166,214))
            );
        }
        .button:active {
            background-image: linear-gradient(bottom, rgb(88,154,204) 0%, rgb(90,150,199) 100%);
            background-image: -webkit-gradient(
                linear,
                left bottom,
                left top,
                color-stop(0, rgb(88,154,204)),
                color-stop(1, rgb(90,150,199))
            );
            box-shadow: 0px 2px 0px #2b638f, 0px 1px 6px rgba(0,0,0,.4), inset 0px 1px 0px rgba(255,255,255,.3), inset 0px 0px 3px rgba(255,255,255,.5);
            transform: translate(0, 4px);
            transition: all .1s ease-in-out;
            transform: translate(0, 4px);
        }
    }
</style>

