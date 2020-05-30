<template>
	<div class="login">
		<el-image
      :src="bg"
      :fit="`cover`"></el-image>
	  <div class="login-form">
	  	<el-form ref="form" :label-position="`right`" :model="form" label-width="80px">
			  <el-form-item label="用户名">
			    <el-input v-model="form.name" autocomplete="off"></el-input>
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
			    <el-button type="primary" @click="onSubmit">立即创建</el-button>
			    <el-button>取消</el-button>
			  </el-form-item>
			</el-form>
	  </div>
	</div>
</template>
<script>
	import bg from '@/assets/pc/login_bg.png'
	import SIdentify from '@/views/pc/common/identify.vue'

	export default{
		name: 'login',
		components: {
			SIdentify: SIdentify
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
			position: absolute;
			top: 80px;
			right: 70px;
			padding: 15px;
			background: #ffffff;
			.el-input-group__append
				padding: 0;
				border: none;
				cursor: pointer;
</style>