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
    <div class="phone" style="margin: 0 15px;" v-if="active == 0 && !showProtocol">
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
      </el-form>
			<div class="next">
				<el-button @click="phone_next('form')">下一步</el-button>	
			</div>
			<el-link type="primary" class="update" :underline="false" @click="update">修改手机号</el-link>
			<el-link type="primary" class="open" :underline="false" @click="open">没有客户号？立即开户>></el-link>
    </div>
    <div class="protocol" style="margin: 0 15px;" v-if="active == 0 && showProtocol">
    	<div style="text-align: left; margin: 0 10px;">
    		<h4 class="text-center">关于工行广州分行-粤开证券实盘炒股大赛用户个人主页信息披露的协议</h4>
        <p>甲方：粤开证券股份有限公司</p>
        <p>乙方：用户</p>
        <p>协议有效期：2020年7月20日-2020年10月30日</p>
        <p>第一、甲方为工行广州分行-粤开证券实盘炒股大赛（以下简称“大赛”）的主办方，为乙方提供炒股大赛收益率排名的网站：https://cgds.ykzq.com/；乙方自愿选择在大赛网站披露用户个人主页信息，自愿授权甲方计算其账户收益率、持仓明细、交易记录、净资产并结合昵称公布以上数据及排名。</p>
        <p>第二、乙方以自身客户号、柜台预留手机号码在大赛网站以短信校验方式完成身份校验，视同乙方本人操作行为；乙方在完成以上操作后阅览本协议并且点击同意按钮，视同乙方本人与甲方的协议签署行为，并认可本协议的约定。</p>
        <p>第三、免责条款：
        <p style="text-indent:2em;">1.甲方将本着勤勉尽职的态度竭力保证大赛的顺利进行，但对于不可抗力的因素或非主办方所能控制的情况所导致的风险、系统故障或由于网络问题导致的系统故障等原因对参赛选手收益率及排名产生的影响不做担保。</p>
        <p style="text-indent:2em;">2.乙方必须保护好自己的相关密码，如因为密码丢失或被破解所导致的账户被窃而造成损失的，甲方不负任何责任。</p>
        <p style="text-indent:2em;">3.乙方在参赛期间进行的交易操作皆为乙方本人意愿，本次大赛期间甲方人员不提供任何投资建议，只针对赛事规则和细节做好解释工作，账户操作方面造成的亏损由甲方自行承担。</p>
        <p style="text-indent:2em;">4.大赛所有规则及奖项甲方有权进行更改，本次炒股大赛活动最终解释权归大赛甲方所有。</p>
      </div>
			<div class="next">
				<el-button @click="protocol_next">同意</el-button>	
			</div>
    </div>
    <div class="info" style="margin: 0 15px;" v-if="active == 1">
    	<br>
    	<br>
    	<br>
    	<el-form ref="form2" status-icon :rules="rules" :model="form2" label-width="120px">
			  <el-form-item label="大赛密码" :key="`password`" prop="password" :rules="[
        { required: true, message: '密码不能为空'}]">
          <el-input type="password" v-model="form2.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="再次输入密码" :key="`repeatPass`" prop="repeatPass" :rules="[
        { required: true, message: '重复密码不能为空'}]">
          <el-input type="password" v-model="form2.repeatPass" autocomplete="off"></el-input>
        </el-form-item>
			</el-form>
			<br>
			<br>
			<br>
			<div class="next">
				<el-button @click="info_next('form2')">下一步</el-button>	
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
			<!-- <div class="next">
				<el-button @click="share">邀请好友来参赛</el-button>	
			</div> -->
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
        'banner': banner,
        'success': success,
        active: 0,
        showProtocol: false,
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
    	phone_next(form) {
        this.$refs[form].validate((valid) => {
          if(valid) {
            this.showProtocol = true
          } else {
            return
          }
        });
        
      },
      protocol_next() {
    		this.active++;
      },
     	info_next(form2) {
        var self = this
        this.$refs[form2].validate((valid) => {
          if(valid) {
            if (this.form2.password != this.form2.repeatPass) {
              this.$message.error('两次输入密码不一致，请重新输入')
              return
            }
            this.$api.post('/user/register', {
              mobile: this.form.phone,
              accountId: this.form.customerId,
              password: this.form2.password,
              nickName: this.form2.nickname,
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
      share() {

      },
      update() {
      	this.$router.push('/cgds/mobile/update')
      },
      open() {
    //   	var jdsParam = ''
    //   	if (window.location.href.indexOf('recommendCode') >= 0) {
				// 	var map = window.location.search;
				// 	var array = [];
				// 	for (var key in map) {
				// 		array.push(key + '=' + map[key])
				// 	}
				// 	jdsParam = array.join('&');
				// }
    //   	window.location.href="http://kh.lxsec.com:8999/osoa/views/channel/index.html?" + jdsParam;
        window.location.href = "https://kh.lxsec.com:8081/m/open/views/account/index.html?external_channel=B2020&branchId=2600";
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