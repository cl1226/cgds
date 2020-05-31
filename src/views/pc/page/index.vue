<template>
	<div class="index">
		<el-image
      :src="banner"
      :fit="`cover`"></el-image>
    <el-card class="box-card info-card" v-if="!isLogin">
    	<div slot="header" class="clearfix">
		    <span class="label">立即报名万元大奖等你来！</span>
		  </div>
		  <div class="text item">
		    <el-button class="register">立即报名</el-button>
		  </div>
		  <div class="text item">
		  	<el-button class="login">登录</el-button>
		  </div>
		  <div class="text item">
		  	<el-button class="open">去开户</el-button>
		  </div>
		</el-card>
		<el-card class="box-card info-card" v-if="isLogin">
    	<div slot="header" class="clearfix">
		    <span class="label">我的信息</span>
		  </div>
		  <div>
		  	<span>上午好! {{`AAA`}}</span>
		  </div>
		</el-card>
    <el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span class="label">高手操作</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px; color: #909399;">注：高手操作展示已公开交易记录总收益前200名的选手，交易记录每日更新一次</span>
		  </div>
		  <el-table
		    :data="tableData1"
		    height="250"
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="昵称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="成交日期"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="证券代码">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="证券名称">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="操作">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="成交均价">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="关注">
		    </el-table-column>
		  </el-table>
		</el-card>
		<br>
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>排行榜</span>
		    <el-button style="float: right; padding: 3px 0" type="text">查看详情>></el-button>
		  </div>
		  <el-table
		    :data="tableData2"
		    height="250"
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="排名"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="昵称"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="组别">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="总收益">
		    </el-table-column>
		  </el-table>
		</el-card>
		<br>
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span>投顾资讯</span>
		    <el-button style="float: right; padding: 3px 0" type="text">查看更多>></el-button>
		  </div>
		  <ul class="infinite-list" style="overflow:auto">
		    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
		  </ul>
		</el-card>
		<br>
		<el-row :gutter="2">
			<el-col :span="8">
				<el-image
		      :src="barcode1"
		      :fit="`cover`"></el-image>
			</el-col>
			<el-col :span="8">
				<el-image
		      :src="barcode2"
		      :fit="`cover`"></el-image>
			</el-col>
			<el-col :span="8">
				<el-image
		      :src="barcode3"
		      :fit="`cover`"></el-image>
			</el-col>
		</el-row>
		<el-footer>
	 		<div>
		    <el-link :underline="false" href="http://www.ykzq.com/channel/86.html" target="_blank">业务部门</el-link>
		    <el-divider direction="vertical"></el-divider>
		    <el-link :underline="false" href="http://www.ykzq.com/channel/86.html" target="_blank">分支机构</el-link>
		    <el-divider direction="vertical"></el-divider>
		    <el-link :underline="false" href="http://jobs.51job.com/all/co2937566.html" target="_blank">诚聘英才</el-link>
		    <el-divider direction="vertical"></el-divider>
		    <el-link :underline="false" href="http://www.ykzq.com/" target="_blank">网站地图</el-link>
		    <el-divider direction="vertical"></el-divider>
		    <el-link :underline="false" href="http://www.ykzq.com/channel/88.html" target="_blank">联系我们</el-link>
		    <el-divider direction="vertical"></el-divider>
		    <el-link :underline="false" href="http://www.ykzq.com/channel/136.html" target="_blank">友情链接</el-link>
		    <el-divider direction="vertical"></el-divider>
		    <el-link :underline="false" href="http://www.ykzq.com/channel/113.html" target="_blank">网站备案</el-link>
		    <el-divider direction="vertical"></el-divider>
		    <el-link :underline="false" href="http://www.ykzq.com/channel/114.html" target="_blank">免责声明</el-link>
		  </div>
		  <br>
		  <div style="font-size: 12px;">本站所提供的信息仅供参考，股市有风险,入市需谨慎。</div>
		  <div style="font-size: 12px;">[粤ICP备05020821号 广东省通信管理局]  粤开证券股份有限公司版权所有 Copyright 2008 All Rights Reserved.</div>
	 	</el-footer>
	</div>
</template>
<script>
	import banner from '@/assets/pc/banner.png'

	import barcode1 from '@/assets/pc/barcode1.png'
	import barcode2 from '@/assets/pc/barcode2.png'
	import barcode3 from '@/assets/pc/barcode3.png'

	export default {
		name: 'index',
		data() {
			return {
				isLogin: true,
				tableData1: [],
				tableData2: [],
				'banner': banner,
				'barcode1': barcode1,
				'barcode2': barcode2,
				'barcode3': barcode3,
				count: 0
			}
		},
		methods: {
			load () {
        this.count += 2
      },
      loadNews() {
				this.$api.post('info/list', {
			    pageNumber: 1,
					pageSize: 5
				}, response => {
			     	console.log(response.data);
				});
			}
		},
		created() {
			this.loadNews()
		}
	}
</script>
<style lang="stylus">
	.index
		.info-card
			width: 320px;
			position: absolute;
			top: 30px;
			right: 10px;
			.item
				padding: 10px 0;
				.el-button
					width: 90%;
				.register
					background: #DC3838;
					color: #FFF;
					border-color: #DC3838;
				.login
					background: #F68200;
					color: #FFF;
					border-color: #F68200;
				.open
					color: #DC3838
					border-color: #DC3838;
			.text
				font-size: 14px;
		.el-card__header
			text-align: left;
			border-bottom: 1px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0;
</style>