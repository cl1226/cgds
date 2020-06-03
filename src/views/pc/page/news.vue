<template>
	<div class="news">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">投顾资讯</span>
		  </div>
		  <el-row v-for="(item, index) in datas" :key="index" class="item">
			  <el-col :span="8">
			  	<el-image
			      :src="item.imageUrl"
			      :fit="`cover`"></el-image>
			  </el-col>
			  <el-col :span="16">
			  	<el-col class="title">
			  		<el-link :underline='false' @click="view(item.id)">{{item.title}}</el-link>
			  	</el-col>
			  	<el-col class="content">
			  		<el-link :underline='false' @click="view(item.id)">摘要: {{item.summary}}</el-link>
			  	</el-col>
			  	<el-col class="publisher">
			  		<el-link :underline='false'>发布者: 广州分公司</el-link>
			  	</el-col>
			  </el-col>
			</el-row>
		  <br>
		  <el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total"
			  :page-size="pageSize"
			  @current-change="changePage">
			</el-pagination>
			<br>
		</el-card>
		<br>
		<Footer />
	</div>
</template>
<script>
	import Footer from '@/views/pc/common/footer.vue'

	export default {
		name: 'news',
		components: {
			Footer: Footer
		},
		data() {
			return {
				pageNumber: 1,
				pageSize: 5,
				total: 1,
				datas: []
			}
		},
		methods: {
			changePage(page) {
				this.pageNumber = page
				this.load()
			},
			view(id) {
				this.$router.push('/cgds/news/detail/' + id)
			},
			load() {
				var self = this
				this.$api.get('/info/list', {
					branchId: 2500,
					pageNumber: self.pageNumber,
					pageSize: self.pageSize
				}, function(response) {
					if (response && response.code == 1) {
						self.datas = response.obj.list
						self.total = response.obj.totalRow;
					}
				})
			}
		},
		created() {
			this.load()
			this.$emit('tabChange')
		}
	}
</script>
<style lang="stylus">
	.news
		.el-card__header
			text-align: left;
			border-bottom: 2px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0;
		.item
			border-bottom: 1px dashed #ccc;
			padding: 25px;
		.title
			margin: 5px 0;
			text-align: left !important;
			span
				font-weight: 400;
				font-size: 24px;
		.content
			margin: 5px 0;
			text-align: left !important;
			span
				color: #646464;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
		.publisher
			margin: 5px 0;
			text-align: left !important;
			span
				color: #646464;
</style>