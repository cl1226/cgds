<template>
	<div class="update_pass">
		<el-image
      :src="banner"
      :fit="`cover`"></el-image>
    <br>
    <br>
    <div class="header">
    	<p>
	    	如您的客户号未绑定手机号或需修改手机号，请按以下步骤处理。
	    </p>	
    </div>
    <div class="content">
    	<p>
	    	1、下载粤开证券
	    </p>
	    <p>
	    	2、登录您的客户号
	    </p>
	    <p>
	    	3、进入我的—业务办理—个人信息修改
	    </p>
	    <p>
	    	4、成功修改手机号即可重新报名
	    </p>
    </div>
    <br>
    <br>
    <br>
    <el-button @click="download">下载粤开证券</el-button>
    

	</div>
</template>
<script>
	import banner from '@/assets/phone/update_phone.png'

	export default {
    data() {
      return {
        'banner': banner
      }
    },
    methods: {
    	download() {
    		window.location.href = 'http://download.lxsec.com/software/lxjr2/lxjr2_download.htm'
    	}
    }
  }
</script>
<style lang="stylus">
	.update_pass
		.header
			text-align: left; 
			margin: 0 15px;
		.content
			text-align: left; 
			margin: 0 15px;
			color: #333333;
			font-weight: 600;
		.el-button
			color: #FFF !important;
			background-color: #DC3838 !important;
			width: 90%;
			font-size: 18px;
</style>