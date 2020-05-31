<template>
	<div class="register">
		<br>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">大赛首页</el-breadcrumb-item>
		  <el-breadcrumb-item>我要报名</el-breadcrumb-item>
		</el-breadcrumb>
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span>我要报名</span>
		  </div>
		  <div class="progress">
		  	<el-steps :active="active" finish-status="success">
				  <el-step title="身份验证"></el-step>
				  <el-step title="完善信息"></el-step>
				  <el-step title="完成报名"></el-step>
				</el-steps>
		  </div>
		  
			<div class="form" v-if="active == 0">
	    	<br>
		    <br>
		    <br>
	    	<el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
				  <el-form-item label="客户号" prop="customerId" :rules="[
		      { required: true, message: '客户号不能为空'}]">
				    <el-input v-model="form.customerId" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="手机号" prop="phone" :rules="[
				  { required: true, message: '手机号不能为空'}]">
				    <el-input v-model="form.phone" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="验证码" prop="code" :rules="[
		      { required: true, message: '验证码不能为空'}]">
				  	<el-input v-model="form.code" autocomplete="off">
				  		<el-button slot="append" @click="sendSms">获取验证码</el-button>
				  	</el-input>
				  </el-form-item>
				  <el-form-item label="" prop="">
				  	<div class="next">
							<el-button @click="phone_next">下一步</el-button>	
						</div>
				  </el-form-item>
				</el-form>
				
	    </div>
	    <div class="form" v-if="active == 1">
	    	<br>
		    <br>
		    <br>
	    	<el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
				  <el-form-item label="昵称" prop="nickname" :rules="[
		      { required: true, message: '昵称不能为空'}]">
				    <el-input v-model="form.nickname" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="大赛密码" prop="password" :rules="[
				  { required: true, message: '密码不能为空'}]">
				    <el-input v-model="form.password" autocomplete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="" prop="">
				  	<div class="next">
							<el-button @click="info_next">下一步</el-button>	
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
			    <p>恭喜您完成大赛报名，赛前将对您账户有效参赛资产进行校验，校验结果会赛前短信通知您。</p>
	    		<div class="next">
	    			<el-button @click="find" style="width: 60%;">去找高手</el-button>	
	    		</div>
	    	</div>
	    </div>
		</el-card>
		<Footer />
	</div>
</template>
<script>
	import Footer from '@/views/pc/common/footer.vue'
	import success from '@/assets/pc/success.png'

	export default{
		name: 'register',
		components: {
			Footer: Footer
		},
		data() {
			var validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
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
				form: {
        	customerId: '',
        	phone: '',
        	code: ''
        },
        rules: {
          phone: [
            { validator: validatePhone, trigger: 'blur' }
          ]
        }
			}
		},
		methods: {
			phone_next() {
				if (this.active <= 2) this.active++;
			},
			info_next() {
				if (this.active <= 2) this.active = this.active+2;
			},
			find() {
				
			}
		},
		created() {
			this.$emit('hide-bar');
		}
	}
</script>
<style lang="stylus">
	.register
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
				width: 60%;
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