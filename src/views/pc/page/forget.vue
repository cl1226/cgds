<template>
	<div>
		<el-backtop></el-backtop>
		<el-header style="height: 80px; margin-top: 20px;">
	  	<Header></Header>
	  </el-header>
	  <el-divider class="up"></el-divider>
		<div class="forgetPass">
			<br>
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item :to="{ path: '/cgds/index' }">大赛首页</el-breadcrumb-item>
			  <el-breadcrumb-item>忘记密码</el-breadcrumb-item>
			</el-breadcrumb>
			<br>
			<el-card class="box-card" shadow="never">
			  <div slot="header" class="clearfix">
			    <span>忘记密码</span>
			  </div>
			  <div class="progress">
			  	<el-steps :active="active" finish-status="success">
					  <el-step title="身份验证"></el-step>
					  <el-step title="重置密码"></el-step>
					  <el-step title="完成找回"></el-step>
					</el-steps>
			  </div>
				<div class="form" v-if="active == 0">
		    	<br>
			    <br>
			    <br>
		    	<el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
					  <el-form-item label="客户号" :key="`customerId`" prop="customerId" :rules="[
			      { required: true, message: '客户号不能为空'}]">
					    <el-input v-model="form.customerId" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="手机号" :key="`phone`" prop="phone" required>
					    <el-input v-model="form.phone" maxlength="11" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="验证码" :key="`code`" prop="code" :rules="[
			      { required: true, message: '验证码不能为空'}]">
					  	<el-input v-model="form.code" maxlength="6" autocomplete="off">
					  		<el-button slot="append" @click="sendSms('form')" :loading="sending">
					  			<span v-if="sending">{{second}}</span>
					  			{{sendText}}
					  		</el-button>
					  	</el-input>
					  </el-form-item>
					  <el-form-item label="" prop="">
					  	<div class="next">
								<el-button @click="phone_next('form')">下一步</el-button>	
							</div>
					  </el-form-item>
					</el-form>
					
		    </div>
		    <div class="form" v-if="active == 1">
		    	<br>
			    <br>
			    <br>
		    	<el-form ref="form2" status-icon :model="form2" label-width="120px">
					  <el-form-item label="输入新密码" :key="`password`" prop="password" :rules="[
					  { required: true, message: '密码不能为空'}]">
					    <el-input type="password" v-model="form2.password" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="再次输入密码" :key="`repeatPass`" prop="repeatPass" :rules="[
					  { required: true, message: '重复密码不能为空'}]">
					    <el-input type="password" v-model="form2.repeatPass" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="" prop="">
					  	<div class="next">
								<el-button @click="info_next('form2')">下一步</el-button>	
							</div>
					  </el-form-item>
					</el-form>
		    </div>
		    <div class="form" v-if="active == 3">
		    	<br>
			    <br>
			    <br>
		    	<div style="text-align: center;">
		    		<el-image
				      :src="success"
				      :fit="`cover`"></el-image>
				    <p>恭喜您成功找回密码</p>
		    		<div class="next">
		    			<el-button @click="login" style="width: 60%;">立即登录</el-button>	
		    		</div>
		    	</div>
		    </div>

	    </el-card>
		</div>
		<Footer />
	</div>
</template>
<script>
	import Header from '@/views/pc/common/header.vue'
	import Footer from '@/views/pc/common/footer.vue'
	import success from '@/assets/pc/success.png'

	export default{
		name: 'register',
		components: {
			Header: Header,
			Footer: Footer
		},
		data() {
			var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        } else if (value.length < 11) {
        	callback(new Error('手机号码格式有误'));
        } else {
          if (this.form.phone !== '') {
          	var myreg = /^1[3|4|5|7|8][0-9]{9}$/;
          	if (!myreg.test(this.form.phone)) {
							callback(new Error('手机号码格式有误'));
						}
          }
          callback();
        }
      };
			return {
				active: 0,
				success: success,
				sending: false,
				sendText: '获取验证码',
				second: 60,
				form: {
        	customerId: '',
        	phone: '',
        	code: ''
        },
        rules: {
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
        },
        form2: {
        	password: '',
        	repeatPass: ''
        }
			}
		},
		methods: {
			phone_next(form) {
				this.$refs[form].validate((valid) => {
					if(valid) {
						if (this.active <= 2) this.active++;
					} else {
						return
					}
        });
				
			},
			info_next(form2) {
				var self = this
				this.$refs[form2].validate((valid) => {
					if(valid) {
						if (this.form2.password != this.form2.repeatPass) {
							this.$message.error('两次输入密码不一致，请重新输入')
							return
						}
						this.$api.post('/user/resetPassword', {
							accountId: this.form.customerId,
							password: this.form2.password,
							code: this.form.code
						}, function(response) {
							if (response && response.code == 1) {
								self.$currentUser = response.obj
								self.active = self.active + 2
							} else {
								self.$message.error(response.message)
							}
						})
					} else {
						return
					}
        });
			},
			sendSms(form) {
				var self = this
				this.$refs[form].validateField('phone', (valid) => {
					if (valid == '请输入手机号码' || valid == '手机号码格式有误') {
						return
					} else {
						self.$api.post('/user/smsSend', {
							mobile: self.form.phone,
							type: 0
						}, function(response) {
							if (response && response.code == 1) {
								self.second = 60
								self.sending = true
								self.sendText = '秒后重发'
								var interval = setInterval(function() {
									self.second--
									if (self.second < 1) {
										clearInterval(interval);
										self.sending = false
										self.sendText = '重新获取'
									}
								}, 1000);
							}
						})
					}
        });
			},
			login() {
				this.$router.push('/cgds/login')
			}
		},
		created() {
			this.$emit('hide-bar');
		}
	}
</script>
<style lang="stylus">
	.el-divider--horizontal.up
		margin: 0;
	.forgetPass
		width: 960px;
		margin: 0 auto;
		.progress
			width: 60%;
			margin: 0 auto;
			.el-step__head.is-success 
				color: #DC3838 !important;
				border: #DC3838 !important;
			.el-step__title.is-success
				color: #DC3838 !important;
		.el-card
			text-align: left;
			color: #DC3838;
			.form
				margin: 0 auto;
				width: 400px;
				.el-button
					border: 1px solid #DC3838 !important;
					background: #fff !important;
					color: #DC3838 !important;
				.next
					.el-button
						width: 100%;
						background: #DC3838 !important;
						color: #FFF !important;
						font-size: 18px;
</style>