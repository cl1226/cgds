<template>
	<div class="login">
		<el-image
      :src="bg"
      :fit="`cover`"></el-image>
	  <div class="login-form">
	  	<el-form ref="form" :label-position="`right`" :model="form" label-width="80px">
			  <el-form-item label="用户名">
			    <el-input v-model="form.name" autocomplete="off" placeholder="客户号/手机号码/昵称"></el-input>
			  </el-form-item>
			  <el-form-item label="密码">
			    <el-input v-model="form.pass" autocomplete="off"></el-input>
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
					<el-link type="primary" class="register" :underline="false" @click="register">还未报名？立即报名>></el-link>
			  </el-form-item>
			</el-form>
	  </div>
	 	<Footer />
	</div>
</template>
<script>
	import bg from '@/assets/pc/login_bg.png'
	import SIdentify from '@/views/pc/common/identify.vue'
	import Footer from '@/views/pc/common/footer.vue'

	export default{
		name: 'login',
		components: {
			SIdentify: SIdentify,
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

			},
			forget() {

			},
			register() {

			}
		},
		created() {
			this.$emit('hide-bar');
		},
		mounted() {
			this.identifyCode = ""
			this.makeCode(this.identifyCodes, 4)
		}
	}
</script>

<style lang="stylus">
	.login
		position: relative;
		.login-form
			border-radius: 5px;
			position: absolute;
			top: 80px;
			right: 70px;
			padding: 15px;
			width: 400px;
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
				border: none;
			.forget
				float: left;
			.register
				float: right;
</style>