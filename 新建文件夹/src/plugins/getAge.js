function getAge(date){
    var year = date.split('-')[0]
    var month = date.split('-')[1]
    var day = date.split('-')[2]
    var now = new Date();
    var dec = now.getFullYear() - year;
    //处理闰年
    if(month === 2 && day === 29 && !isLeap(now.getFullYear())){
        day = 28;//没有29号生日为28号
    }
    //得到今年的生日
    var birthdayThisyear = new Date(now.getFullYear(),month - 1,day);//month - 1 是为了处理month数组从0开始
    if(birthdayThisyear > now){
        dec --;
    }
    return dec;
}

//判断闰年的函数
function isLeap(year){
    if(year % 100 === 0 && year % 400 === 0 || year % 100 !== 0 && year % 4 === 0){
        return true;
    }else{
        return false;
    }
}

export default getAge