<template>
   <div class="loginWindow">
        <div class="iconClose" @click="LoginClose(1)">
          <i class="el-icon-circle-close"></i>
        </div>
       <div class="bgBox">
          <el-form ref="form" :model="form" label-width="80px" v-if="loginType==0">
            <el-form-item label="账号" >
              <el-input v-model="form.name" type='text' placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="form.password" type='password' placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
               <el-input v-model="form.code" type='text' style='width:109px;float:left;'></el-input>
               <img src="../static/img/code.png" alt="" @click="codeClickImg(this)" class="codeImg">
            </el-form-item>
            <el-row  type="flex">
              <el-col justify='space-between'>
                <el-col :span="14" :offset="6">
                  <span class="loginName" @click="logIn">登录</span>
                  <span class="emput">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                  <span class="passwordName" @click="Password">忘记密码?</span>
                </el-col>
                <el-col :span="4" style="text-align:center">
                  <span class="register" @click="register">注册</span>
                </el-col>  
                  
              </el-col>
            </el-row>
          </el-form> 
          <el-form ref="form1" :model="form1"  label-width="90px" v-if="loginType==1">
            <el-form-item label="身份证号" prop="ID" >
              <el-input v-model="form1.ID" type='text' placeholder="请输入身份证号"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
               <el-input v-model="form1.codeId" prop='codeId' type='text' style='width:97px;float:left;'></el-input>
               <img src="../static/img/code.png" alt="" @click="codeClickImg(this)" class="codeImg">
            </el-form-item>
            <el-form-item label="新密码" prop='newPassword' style="margin-bottom:10px;">
               <el-input v-model="form1.newPassword" type='text' placeholder="请输入新密码"></el-input>
            </el-form-item>
            <el-form-item>
               <el-button style="font-size:12px;width:80px;margin-left:30px;" @click="submitForm">确定</el-button>
               <el-button style="font-size:12px;width:80px;" @click="goBackLogin">返回</el-button>
            </el-form-item>
          </el-form>  
       </div>
   </div>
</template>
<script>
// import {isEmail,isMobile,CheckID,empty,isName} from '../lib/utils/validate.js'
export default {
  data(){
    return {
      form:{},
      form1:{
        ID:'',
        codeId:'',
        newPassword:''
      },
      loginType:0,
      CloseType:0
    }
  },
  methods:{
    codeClickImg(obj){
      obj.src = '../static/img/code.png?time=' + new Date().getTime() ;
    },
    logIn(){

    },
    LoginClose(val){
      this.$emit('CloseType',val)
    },
    Password(){
      this.loginType = 1 ;
    },
    register(){

    },
    submitForm() {
      var that = this ;
      console.log(this.form1.ID)
      if(that.form1.codeId && that.form1.newPassword && that.CheckID(that.form1.ID)){
          that.$message('修改完成')
          return;
      }else{
          that.$message('提交信息有误，请重新修改')
          return false ;
      }

    },
    goBackLogin(){
       this.loginType = 0 ;
    },
  
    CheckID(code){
        var that = this ;
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
          var tip = "";
          var pass= true;

          if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
              tip = "身份证号格式错误";
              pass = false;
          }else if(!city[code.substr(0,2)]){
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
          if(!pass) {that.$message(tip)};
          return pass;
       
    } 

  }
}
</script>
<style>
.loginWindow{
  background:linear-gradient(0deg,rgba(34,52,91,1) 0%,rgba(64,90,144,1) 100%);
  border-radius:4px;
  width: 580px ;
  height: 239px ;
  margin-top: 10vh;
  margin-left: 20vw;
  position: relative;
}
.iconClose{
  position: absolute;
  right: -5px;
  top:-5px;
}
.bgBox{
  background: url('../static/img/login.png') center no-repeat ;
  background:cover ;
  width: 100%;
  height: 100%;
  padding-top: 20px;
  padding-right: 20px;
}
.el-form{
  width:300px;
  float: right;
}
.el-form-item__label{
  color:#FFFFFF;
}
.el-input__inner{
  background:rgba(24,41,77,1);
  border-radius:2px;
  border: none;
}
.codeImg{
  float:left;
  margin-left: 10px;
}
.loginName,.emput,.passwordName{
  float: left;
}
.passwordName,.emput{
  font-size: 12px;
  color: #f5f5f5;
  opacity: 0.5;
}
.loginName:hover,.passwordName:hover,.register:hover{
  color:blue;
}

</style>

