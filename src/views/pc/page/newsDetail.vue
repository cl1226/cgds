<template>
	<div class="newsdetail">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">投顾资讯详情</span>
		  </div>
		  <el-row>
		  	<el-col class="title">
		  		{{data.title}}
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col class="publisher">
		  		<el-link :underline='false'>发布者: 广州分公司</el-link>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col class="bg">
		  		<el-image
			      :src="data.imageUrl"
			      :fit="`cover`"></el-image>
		  	</el-col>
		  </el-row>
		  <el-row>
		  	<el-col class="content">
		  		<p>{{data.content}}</p>
		  	</el-col>
		  </el-row>
		  <el-divider></el-divider>
		  <el-row>
		  	<el-col class="bottom">
		  		<p>免责申明: </p>
		  		<span>本消息基于联讯证券认为可靠的公开信息和资料，但我们对这些信息的准确性和完整性均不作任何保证，也不保证所包含的信息和建议不会发生任何变更。本公司力求文章内容的客观、公正，但文中的观点、结论和建议仅供参考，也不构成所述证券的买卖出价或询价，投资者据此作出的任何投资决策与本公司无关。投资者应根据个人投资目标、财务状况和需求来判断是否使用资料所载之内容和信息，独立做出投资决策并自行承担相应风险。
					</span>
		  	</el-col>
		  </el-row>
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
				id: null,
				data: null
			}
		},
		methods: {
			changePage(page) {
				this.pageNumber = page
				this.load()
			},
			load() {
				var self = this
				this.$api.get('/info/get', {
					id: self.id
				}, function(response) {
					if (response && response.code == 1) {
						self.data = response.obj
					}
				})
			}
		},
		created() {
			this.id = this.$route.params['id'];
			this.load()
		}
	}
</script>
<style lang="stylus">
	.newsdetail
		.el-card__header
			text-align: left;
			border-bottom: 2px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0;
		.el-col
			margin: 15px;
		.title
			font-weight: 700;
			font-size: 32px;
		.publisher
			color: #646464;
		.bg
			width: 410px;
			height: 246px;
		.content
			text-align: left;
			p
				text-indent: 2em;
				margin: 30px;
		.bottom
			text-align: left;
			margin: 0 45px 15px 45px;
</style>