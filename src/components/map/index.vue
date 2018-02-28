<template>
    <div>
        <div id="container" style="width:500px; height:300px"></div>
    </div>
</template>
<script>
    import AMap from 'AMap'
    var map
    export default {
        mounted: function () {
            this.init()
        },
        methods: {
            init: function () {
                map = new AMap.Map('container', {
                    center: [116.397428, 39.90923],
                    resizeEnable: true,
                    zoom: 10
                })
                AMap.plugin('AMap.Geocoder',function(){
                    var geocoder = new AMap.Geocoder({
                        city: "010"//城市，默认：“全国”
                    });
                    var marker = new AMap.Marker({
                        map:map,
                        bubble:true
                    })
                    map.on('click',function(e){
                        marker.setPosition(e.lnglat);
                        geocoder.getAddress(e.lnglat,function(status,result){
                            if(status=='complete'){
                                console.log(result)
                            }
                        })
                    })
                })
            }
        }
    }
</script>
<style>
</style>