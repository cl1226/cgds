<template>
	<div class="mobile-register">
		<el-image
      :src="banner"
      :fit="`cover`"></el-image>
    <div class="progress">
    	<el-steps :active="active" align-center finish-status="success">
			  <el-step title="身份验证"></el-step>
			  <el-step title="完善信息"></el-step>
			  <el-step title="完成报名"></el-step>
			</el-steps>	
    </div>
    <div class="phone" v-if="active == 1 && !showProtocol">
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
			</el-form>
			<div class="next">
				<el-button @click="phone_next">下一步</el-button>	
			</div>
			<el-link type="primary" class="update" :underline="false" @click="update">修改手机号</el-link>
			<el-link type="primary" class="open" :underline="false" @click="open">没有客户号？立即开户>></el-link>
    </div>
    <div class="protocol" v-if="active == 1 && showProtocol">
    	<div style="text-align: left; margin: 0 10px;">
    		<h4 class="text-center">关于联讯证券实盘炒股用户个人主页信息披露的协议</h4>
        <p>甲方：联讯证券股份有限公司</p>
        <p>乙方：用户</p>
        <p>协议有效期：2017年11月1日-2018年2月1日</p>
        <p>第一、甲方为联讯证券首届实盘炒股大赛（以下简称“大赛”）的主办方，为乙方提供炒股大赛收益率排名的网站8.lxsec.com;乙方自愿选择在大赛网站披露用户个人主页信息，自愿授权甲方计算其账户收益率、持仓明细、交易记录、净资产并结合昵称公布以上数据及排名。</p>
        <p>第二、乙方以自身客户号、柜台预留手机号码在大赛网站以短信校验方式完成身份校验，视同乙方本人操作行为；乙方在完成以上操作后阅览本协议并且点击同意按钮，视同乙方本人与甲方的协议签署行为，并认可本协议的约定。</p>
        <p>第三、免责条款：
        <p style="text-indent:2em;">1.甲方将本着勤勉尽职的态度竭力保证大赛的顺利进行，但对于不可抗力的因素或非主办方所能控制的情况所导致的风险、系统故障或由于网络问题导致的系统故障等原因对参赛选手收益率及排名产生的影响不做担保。</p>
        <p style="text-indent:2em;">2.乙方必须保护好自己的相关密码，如因为密码丢失或被破解所导致的账户被窃而造成损失的，甲方不负任何责任。</p>
        <p style="text-indent:2em;">3.大赛所有规则及奖项甲方有权进行更改，本次炒股大赛活动最终解释权归大赛甲方所有。</p>
      </div>
			<div class="next">
				<el-button @click="protocol_next">同意</el-button>	
			</div>
    </div>
    <div class="info" v-if="active == 2">
    	<br>
    	<br>
    	<br>
    	<el-form ref="form" status-icon :rules="rules" :model="form" label-width="80px">
			  <el-form-item label="昵称" prop="customerId" :rules="[
	      { required: true, message: '昵称不能为空'}]">
			    <el-input v-model="form.nickname" autocomplete="off" placeholder="输入长度2-14个字符"></el-input>
			  </el-form-item>
			  <el-form-item label="大赛密码" prop="pass" :rules="[
			  { required: true, message: '密码不能为空'}]">
			    <el-input v-model="form.pass" autocomplete="off" placeholder="输入长度2-14个字符"></el-input>
			  </el-form-item>
			</el-form>
			<br>
			<br>
			<br>
			<div class="next">
				<el-button @click="info_next">下一步</el-button>	
			</div>
    </div>
    <div class="success" v-if="active == 3">
    	<br>
    	<br>
    	<br>
    	<el-image
      :src="success"
      :fit="`cover`"></el-image>
    	<p style="color: #DC3838; text-align: center;">恭喜您完成大赛报名，赛前将对您账户有效参赛资产进行校验,校验结果会赛前短信通知您。</p>
			<div class="next">
				<el-button @click="share">邀请好友来参赛</el-button>	
			</div>
    </div>
	</div>
</template>
<script>
	import banner from '@/assets/phone/banner.png'
	import success from '@/assets/phone/success.png'

	export default {
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
        'banner': banner,
        'success': success,
        active: 1,
        showProtocol: false,
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
    	sendSms() {
    		
    	},
    	phone_next() {
    		// if (this.active <= 3) this.active++;
    		this.showProtocol = true;

      },
      protocol_next() {
    		if (this.active <= 2) this.active++;
      },
     	info_next() {
    		if (this.active <= 2) this.active++;
      },
      share() {

      },
      update() {
      	this.$router.push('/cgds/mobile/update')
      },
      open() {
      	var jdsParam = ''
      	if (window.location.href.indexOf('recommendCode') >= 0) {
					var map = window.location.search;
					var array = [];
					for (var key in map) {
						array.push(key + '=' + map[key])
					}
					jdsParam = array.join('&');
				}
      	window.location.href="http://kh.lxsec.com:8999/osoa/views/channel/index.html?" + jdsParam;
      }
    }
  }
</script>
<style lang="stylus">
	.mobile-register
		.progress
			margin-top: 15px;
			padding-bottom: 15px;
			border-bottom: 1px dashed #ccc;
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
		.el-step__head.is-success 
			color: #DC3838 !important;
			border: #DC3838 !important;
		.el-step__title.is-success
			color: #DC3838 !important;
		.el-link
			margin: 10px;
			font-size: 18px;
		.update
			float: left;
		.open
			float: right;
</style>