// 邮箱验证
export const isEmail = (str) => {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    if(!reg.test(str)){
       this.$message('请输入有效的邮箱！');
        return false;
    }else{
        return true;
    }
}

// 手机号验证
export const isMobile = (mobile) => {
    if(mobile.length==0){
        this.$message('请输入手机号码！');
        return false;
    }
    if(mobile.length!=11){
        this.$message('请输入有效的手机号码！');
        return false;
    }

    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    if(!myreg.test(mobile)){
        this.$message('请输入有效的手机号码！');
        return false;
    }else{
        return true;
    }
}
// 身份证格式验证 
export const checkID = (ID) => {
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if (reg.test(ID) === false) {
        this.$message("身份证输入不合法");
        return false;
    }else{
        return true;
    }
}

export function CheckID(code){
  var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
  var tip = "";
  var pass= true;

  if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
      tip = "身份证号格式错误";
      pass = false;
  }

  else if(!city[code.substr(0,2)]){
      tip = "地址编码错误";
      pass = false;
  }
  else{
      //18位身份证需要验证最后一位校验位
      if(code.length == 18){
          code = code.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
          //校验位
          var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
          var sum = 0;
          var ai = 0;
          var wi = 0;
          for (var i = 0; i < 17; i++)
          {
              ai = code[i];
              wi = factor[i];
              sum += ai * wi;
          }
          var last = parity[sum % 11];
          if(parity[sum % 11] != code[17]){
              console.log(last);
              tip = "校验位错误";
              pass =false;
          }
      }
  }
  if(!pass) groy(tip);
  return pass;
}

// 信息不能为空
export function empty(content){
  if(!content){
    this.$message("信息不能为空");
  }
}
// 对姓名进行验证
export function isName(str){
  var reg = /^[\u4E00-\u9FA5]{2,4}$/;;
  if(!reg.test(str)){
      this.$message('请正确输入姓名');
      return false;
  }else{
      return true;
  }
}

