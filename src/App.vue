<template>
    <div id="app">
        <transition name="fade"
                    mode="out-in">
            <!--<router-view v-wechat-title="$route.name"></router-view>-->
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    export default {
        name: 'app',
        data () {
            return {
                thisClass: ''
            }
        },
        components: {},
        watch: {
            $route(to, from){
                if (to.fullPath === '/main' && from.fullPath === '/login') {
                    if (Cookies.get("refresh") != "no") {
                        setTimeout(function () {
                            location.reload();
                            Cookies.set("refresh", "no");
                        }, 500);
                    }
                }
            }
        }
    }

</script>

<style lang="scss" type="text/scss">

    body {
        margin: 0px;
        padding: 0px;
        background-color: #f0f2f5;
        font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, SimSun, sans-serif;
        font-size: 14px;
        -webkit-font-smoothing: antialiased;
    }

    #app {
        position: absolute;
        top: 0px;
        bottom: 0px;
        width: 100%;
    }
    .el-form-item__label{
        text-align: left !important;
    }
    .el-loading-mask {
        z-index: 1000 !important;
    }

    .el-submenu [class^=fa] {
        vertical-align: baseline;
        margin-right: 10px;
    }

    .el-menu-item [class^=fa] {
        vertical-align: baseline;
        margin-right: 10px;
    }

    .toolbar {
        background: #f2f2f2;
        padding: 10px;
        /*	//border:1px solid #dfe6ec;*/
        margin: 10px 0px;
        .el-form-item {
            margin-bottom: 10px;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .2s ease;
    }

    .fade-enter,
    .fade-leave-active {
        opacity: 0;
    }

    .el-pagination__editor {
        width: 60px !important;
    }
</style>