<template>
	<div class="follower">
		<br>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/cgds/dashboard' }">我的主页</el-breadcrumb-item>
		  <el-breadcrumb-item>我的关注</el-breadcrumb-item>
		</el-breadcrumb>
		<br>
		<el-card class="box-card">
		  <div slot="header" class="clearfix">
		    <span class="label">我的关注</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px;">我的关注: {{total}}人</span>
		  </div>		  
		  <el-row :gutter="12">
			  <el-col :span="8" v-for="(item, index) in datas" :key="index" style="margin: 10px 0;">
			    <el-card shadow="always" class="item">
			      <div slot="header" class="clearfix">
					    <span class="label" style="color: #111">{{item.nickName}}</span>
					    <el-button size="mini" @click="unfollow(item)" class="unfollow">取消关注</el-button>
					  </div>
					  <el-row style="border-bottom: 1px dashed #ccc; padding: 15px 0;">
					  	<el-col :span="12" style="border-right: 1px dashed #ccc;">
					  		<el-col>总收益</el-col>
					  		<el-col :class="{'font-red':item.totalYieldRate>0,'font-green':item.totalYieldRate<0}">{{(item.totalYieldRate*100).toFixed(4)}}%</el-col>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-col>总排名</el-col>
					  		<el-col>{{item.totalRank || '--'}}</el-col>
					  	</el-col>
					  </el-row>
					  <el-row style="padding: 15px 0;">
					  	<el-col :span="12" style="border-right: 1px dashed #ccc;">
					  		<el-col>净资产</el-col>
					  		<el-col>{{item.totalAsset || 0}}</el-col>
					  	</el-col>
					  	<el-col :span="12">
					  		<el-col>粉丝数</el-col>
					  		<el-col>{{item.fansCount || 0}}</el-col>
					  	</el-col>
					  </el-row>
			    </el-card>
			  </el-col>
			</el-row>
		</el-card>
		<br>
		<el-pagination
		  background
		  layout="prev, pager, next"
		  :total="total"
		  :page-size="pageSize"
		  @current-change="changePage">
		</el-pagination>
		<br>	
		<br>
		<Footer />
	</div>
</template>
<script>
	import Footer from '@/views/pc/common/footer.vue'

	export default {
		name: 'follower',
		components: {
			Footer: Footer
		},
		data() {
			return {
				pageNumber: 1,
				pageSize: 9,
				total: 1,
				datas: []
			}
		},
		methods: {
			changePage(page) {
				this.pageNumber = page
				this.load()
			},
			unfollow(to) {
				var self = this
				self.$confirm('确认取消关注, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.post('/user/cancelFollow', {
	      		fromAccountId: this.currentUser.accountId,
	      		toAccountId: to.accountId
	      	}, function(response) {
	      		if (response && response.code == 1) {
	      			self.$message.success('取消关注成功')
	      			self.load()
	      		}
	      	})
        }).catch(() => {
          
        });
      },
			load() {
				var self = this
				self.$api.get('/user/followers', {
					fromAccountId: self.currentUser.accountId,
					pageNumber: self.pageNumber,
					pageSize: self.pageSize
				}, function(response) {
					if (response && response.code == 1) {
						self.datas = response.obj.list
						self.total = response.obj.totalRow
					}
				})
			}
		},
		created() {
			this.load()
		}
	}
</script>
<style lang="stylus">
	.follower
		.el-card__header
			text-align: left;
			border-bottom: 2px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0 10px 0 0;
		.item
			.el-card__header
				border-bottom: 1px dashed #ccc;
		.unfollow
			float: right;
			color: #DC3838;
			background: #FFF;
			border-color: #DC3838;
		.unfollow:hover
			color: #FFF;
			background: #DC3838;
		.font-red
			color: red;
		.font-green
			color: green;
</style>