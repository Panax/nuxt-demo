<template>
  <div class="school">
      <el-container>
        <el-header style="height:100px;">
           <el-row type="flex" justify="space-between">
              <el-col :span="4"><img src="../static/img/school.png" alt="" class="schoolLog"><span class="titleLog">教务管理系统</span></el-col>
              <el-col  :span="17">
                  <el-col :span="2" :offset="16"><el-button >首页</el-button></el-col>
                  <!-- <el-col :span="2"><el-button>地区</el-button></el-col>
                  <el-col :span="2" ><el-button>阶段</el-button></el-col> -->
                  <!-- <el-col :span="2"><el-button>teacher</el-button></el-col>
                  <el-col :span="2" ><el-button>student</el-button></el-col> -->
                  <el-col :span="2" :offset="1"><el-button>个性定制</el-button></el-col>
                  <el-col :span="2" :offset="1"><el-button>商务合作</el-button></el-col>
              </el-col>
              <el-col :span="3">
                <div class="logIn">
                  <span class="logInName" @click="Login">登录</span> 
                  <span class="logInName">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                  <span class="logInName" @click="LogOut">退出</span>
                </div>
              </el-col>
           </el-row>

          
        </el-header>
        <el-container>
          <el-aside width="480px">
            <div class="addressSelected">
                <v-distpicker type="PC" @selected='selected' v-show="addInp"></v-distpicker>
            </div></el-aside>
          <el-main>
             <Login v-if="closeType==0" @CloseType='changeType'></Login>
           
          </el-main>
        </el-container>
      </el-container>
  </div>
 
</template>

<script>
import Login from '../components/login' 

export default {
   data () {
     return {
       addInp:true,
       closeType:1,
       count:0
     }
   },
   components:{
      Login
   },
   created(){
     
   },
   methods:{
     Login(){
       if(this.count<1){
         this.closeType = 0
       }else{
         this.$message('你已登录，请勿重复登录')
         return false ;
       }
        this.count++ ;

     },
     selected(data){
        this.province= data.province.value,
        this.city=data.city.value
     },
     changeType(){
       this.closeType = 1
     },
     LogOut(){
       this.$message('退出成功')
     }
   }
}
</script>

<style>
.el-header{
    color: #FFFFFF;
    text-align: center;
    background:#252C47;
    line-height: 100px;
    height: 100px;
  }
  
  .el-aside {
    background: #252C47;
    color: #FFFFFF;
    text-align: center;
    margin-top: 20px;
    height: 100vh;
  }
.schoolLog{
  display: block;
  width: 100px;
  height: 100px;
  vertical-align:middle;
  float: left;
}
.titleLogP,.logInName{
  float: left;
}
.logInSvg{
  vertical-align:middle;
  width: 20px;
  /* height: 20px; */
  float: left;
}
 .el-button{
    background:linear-gradient(0deg,rgba(29,47,85,1) 0%,rgba(35,55,97,1) 100%);
    box-shadow:0px 7px 7px 0px rgba(3,10,24,0.3);
    border: none;
    color:#FFFFFF;
    width: 100px;
 }
 .logInName{
   color: white;
   display: block;
 }
 .logInName:hover{
   color: blue;
 }
.logIn{
  align-items: center;
  float: right;
  margin-right:20px; 
}
.addressSelected{
  /* width:600px;
  height: 200px;
  background: #ffffff; */
}
.distpicker-address-wrapper select{
  background:rgba(35,55,97,1);
  box-shadow:0px 7px 7px 0px rgba(3,10,24,0.3);
  color: #FFFFFF;
  width: 150px;
}  
</style>
