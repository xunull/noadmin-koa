<template lang="html">

	<el-form class='login-form' label-width="100px">
	  <el-form-item label="用户名" >
	    <el-input type="text" v-model="username"></el-input>
	  </el-form-item>
	  <el-form-item label="密码" >
	    <el-input type="password" v-model="password" ></el-input>
	  </el-form-item>
	  <el-form-item>
	    <el-button type="primary" @click="submit">登录</el-button>
	    <el-button >重置</el-button>
	  </el-form-item>
	</el-form>

</template>

<script>
export default {
	data(){
		var username=null;
		var password=null;

		return {
			username,
			password,
		}
	},
	methods:{
		submit() {
			this.$http.post('/admin/login',{
				username:this.$data.username,
				password:this.$data.password
			}).then(response=>{

				 if(response.body.ok) {
					 	window.location.href='index'
				 } else {
					   this.$message.error({
							 duration:1000,
							 message:'密码错误'
						 });
				 }
			},response=>{
					// console.log(response);
			});
		}
	}
}
</script>

<style lang="css">
body {
	background-color: #eeeeee;
	width:100%;
	height: 100%;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
}
.login-form {
	/*width: 500px;*/
}
</style>
