<template>
	<div class="login">
		<el-backtop></el-backtop>
		<el-container>
		  <el-header style="height: 80px; margin-top: 20px;">
		  	<Header></Header>
		  </el-header>
		  <el-divider class="up"></el-divider>
			<el-image
	      :src="bg"
	      :fit="`cover`"
	      style="width: 960px;margin: 0 auto;"></el-image>
		  <div class="login-form">
		  	<el-form ref="form" :label-position="`right`" :model="form" label-width="80px">
				  <el-form-item label="用户名">
				    <el-input v-model="form.name" autocomplete="off" placeholder="客户号/手机号码/昵称"></el-input>
				  </el-form-item>
				  <el-form-item label="密码">
				    <el-input type="password" v-model="form.pass" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="验证码">
				    <el-input v-model="form.iden" autocomplete="off">
				    	<s-identify slot="append" :identifyCode="identifyCode" @refreshCode="refreshCode"></s-identify>
				    	<!-- <el-image slot="append" @click="getIdentify">获取验证码</el-image> -->
				    </el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button @click="onSubmit">登录</el-button>
				    <el-link type="primary" class="forget" :underline="false" @click="forget">忘记密码</el-link>
						<el-link type="primary" class="go_register" :underline="false" @click="register">还未报名？立即报名>></el-link>
				  </el-form-item>
				</el-form>
		  </div>  
		</el-container>
		
	 	<Footer />
	</div>
</template>
<script>
	import bg from '@/assets/pc/login_bg.png'
	import SIdentify from '@/views/pc/common/identify.vue'
	import Header from "@/views/pc/common/header.vue";
	import Footer from '@/views/pc/common/footer.vue'

	export default{
		name: 'login',
		components: {
			SIdentify: SIdentify,
			Header: Header,
			Footer: Footer
		},
		data() {
			return {
				'bg': bg,
				'identifyCode': '',
				'identifyCodes': '1234567890',
				'form': {
					name: '',
					pass: '',
					iden: ''
				}
			}
		},
		methods: {
			randomNum(min, max) {
	      return Math.floor(Math.random() * (max - min) + min);
	    },
	    refreshCode() {
	      this.identifyCode = "";
	      this.makeCode(this.identifyCodes, 4);
	    },
			makeCode(o, l) {
	      for (let i = 0; i < l; i++) {
	        this.identifyCode += this.identifyCodes[
	          this.randomNum(0, this.identifyCodes.length)
	        ];
	      }
	    },
			onSubmit() {
				if (this.form.iden != this.identifyCode) {
					this.$message.error('验证码输入有误,请重新输入')
					return
				}
				var self = this
				this.$api.post('/user/login', {
					loginId: this.form.name,
					password: this.form.pass
				}, function(response) {
					if (response && response.code == 1) {
						localStorage.setItem('isLogin', true)
						self.isLogin = true
						localStorage.setItem('currentUser', JSON.stringify(response.obj));
						self.currentUser = response.obj
						self.$router.push('/cgds/index')
					} else {
						self.$message.error('用户名或密码错误!')
					}
				})
			},
			forget() {
				this.$router.push('/cgds/forget')
			},
			register() {
				this.$router.push('/cgds/register')
			}
		},
		created() {
			// this.$emit('hide-bar');
		},
		mounted() {
			this.identifyCode = ""
			this.makeCode(this.identifyCodes, 4)
		}
	}
</script>

<style lang="stylus">
	.login
		.el-divider--horizontal.up
			margin: 0;
		position: relative;
		.login-form
			border-radius: 5px;
			position: absolute;
			top: 115px;
			right: 180px;
			padding: 15px;
			width: 350px;
			height: 280px;
			background: #ffffff;
			.el-input-group__append
				padding: 0;
				border: none;
				cursor: pointer;
			.el-button
				width: 100%;
				color: #fff;
				background: #DC3838;
				font-size: 18px;
			.el-button:active
				border-color: #DC3838;
			.forget
				float: left;
				font-size: 14px;
			.go_register
				float: right;
				font-size: 14px;
</style>