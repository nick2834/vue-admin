import Mock from 'mockjs';

const Random = Mock.Random;
var pageCount= Random.integer(1, 10);
var haseMore=true;//是否结束分页
var ids=10000;//自增长id
export default Mock.mock('api/user', {
    'paging': true,
    'tableData|1-10': [{
        'id': () => 1000050 + Random.increment(),
        'date': () => Random.datetime(),
        'name': () => Random.cname(),
        'proname': () => Random.csentence(),
        'address': () => Random.county(true),
        'level': /[A-D]/
    }],
    'classList|1-10':[{
        'list|4': [{
            'id|+1': 1
        }],
        name: () => Random.cname(),  //随机产生一个中文的姓名
        addr: () => Random.county(true), //随机生成一个地址
        'age|18-60': 1, //随机生成一个数字 大小在18到60
        birth: () => Random.date(), //随机生成一个日期
        'sex|1': Mock.Random.integer(0, 1),//随机生成一个整数，0/1 ，根据这个来给“男” “女”
        email:Mock.mock('@EMAIL()'), //随机生成一个邮箱
        'moblie|1':['13531544954','13632250649','15820292420','15999905612'], //在数组中随机找一个
        'num1|1-100.2':1, //1-100 中随机生成一个保留两位小数点
        'num2|100-300.2':1,
        'classroom|1':['精品语文班','精品作业A班','英语班','语文班'],
        'from|1':['到店咨询','微店','壹家教','学习服务平台'],
        'status|1':['意识强烈','预报名','意向一般','暂无意向'],
        time:() => Random.datetime(),
        mobile:/^1[0-9]{10}$/  //用正则匹配1开头的11位数字的手机号
    }]
});
