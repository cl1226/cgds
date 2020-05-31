<template>
	<div class="dashboard">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">我的信息</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px;">
		    	我的关注: {{`0人`}} 我的粉丝: {{`0人`}}
		    </span>
		    <el-button size="mini">退出比赛</el-button>
		  </div>
			<el-form>
			  <el-row :gutter="20">
				  <el-col :span="6">
				  	<el-form-item label="昵称:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="净资产:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="总排名:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="机构组排名:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="6">
				  	<el-form-item label="总收益:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="月收益:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="周收益:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="日收益:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="6">
				  	<el-form-item label="周交易次数:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="所属地区:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="所属营业部:">
					  	<span></span>
					  </el-form-item>
				  </el-col>
				</el-row>
			</el-form>
		</el-card>
		<br>
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">我的持仓</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px; color: #999999;">注:持仓数据每日更新一次，需实时查看持仓数据请登录交易系统</span>
		  </div>
		  <el-table
		    :data="tableData1"
		    height="250"
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="证券代码"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="证券名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="持仓数量">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="可用数量">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="成本价">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="浮动盈亏">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="浮动盈亏率">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="市价">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="市值">
		    </el-table-column>
		  </el-table>
		</el-card>
		<br>
		<br>
		<el-card class="box-card" style="width: 48%; float: left;" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">总收益</span>
		  </div>
		</el-card>
		<el-card class="box-card" style="width: 48%; float: right;" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">总排名</span>
		  </div>
		</el-card>
		<div style="clear: both;"></div>
		<br>
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">我的交易记录</span>
		  </div>
		  <el-table
		    :data="tableData1"
		    height="250"
		    style="width: 100%">
		    <el-table-column
		      prop="date"
		      label="成交日期"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="name"
		      label="证券代码"
		      >
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
		      label="成交数量">
		    </el-table-column>
		    <el-table-column
		      prop="address"
		      label="成交金额">
		    </el-table-column>
		  </el-table>
		</el-card>
		<br>
		<Footer />
	</div>
</template>

<script>
	import Footer from '@/views/pc/common/footer.vue'

	export default {
		name: 'dashboard',
		components: {
			Footer: Footer
		},
		data() {
			return {
				tableData1: []
			}
		},
		methods: {

		}
	}
</script>
<style lang="stylus">
	.dashboard
		.el-form-item
			margin-bottom: 0;
		.el-button
			float: right;
			color: #DC3838;
			border-color: #DC3838;
			margin-right: 10px;
		.el-button:hover
			background: #DC3838;
			border-color: #DC3838;
			color: #FFF;
		.el-card__header
			text-align: left;
			border-bottom: 2px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
</style>