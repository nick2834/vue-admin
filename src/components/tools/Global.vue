<script type="text/javascript">
    import {getToken} from 'untils/auth'
    const colorListLength = 20
    function getRandColor() {
        let tem = Math.round(Math.random() * colorListLength)
        return colorList[tem]
    }
    function getTokentoken() {
        let token = getToken('authentication_token')
        let tokenPhone = getToken('phone')
        let key = 'Token token=' + token + ',phone=' + tokenPhone
        return key
    }
    export default
    {
        colorListLength,
        getRandColor,
        getTokentoken
    }
</script>