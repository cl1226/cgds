<template>
	<div class="dynamicdetail">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">敏感证券列表</span>
		  </div>
		  <el-form>
			  <el-row :gutter="20">
				  <el-col :span="6" v-for="(d, i) in datas" :key="i">
				  	<el-form-item style="margin-bottom: 0;">
					  	<span>{{d.stockName}}({{d.stockCode}})</span>
					  </el-form-item>
				  </el-col>
				</el-row>
			</el-form>
		  <el-pagination
			  background
			  layout="prev, pager, next"
			  :total="total"
			  :page-size="pageSize"
			  @current-change="changePage">
			</el-pagination>
		</el-card>
		<br>
		<Footer />
	</div>
</template>
<script>
	import Footer from '@/views/pc/common/footer.vue'

	export default {
		name: 'dynamic',
		components: {
			Footer: Footer
		},
		data() {
			return {
				date: null,
				pageNumber: 1,
				pageSize: 36,
				total: 1,
				datas: []
			}
		},
		methods: {
			view(d) {
				console.log(d)
			},
			changePage(page) {
				this.pageNumber = page
				this.load()
			},
			load() {
				var self = this
				self.$api.get('/sensitiveStock/sensitiveStockList', {
					assetDate: self.date,
					pageNumber: this.pageNumber,
					pageSize: this.pageSize
				}, function(response) {
					if (response && response.code == 1) {
						self.datas = response.obj.list
						self.total = response.obj.totalRow;
					}
				})
			}
		},
		created() {
			this.date = this.$route.params['date'];
			this.load()
		}
	}
</script>
<style lang="stylus">
	.dynamicdetail
		.el-card__header
			text-align: left;
			border-bottom: 2px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0 10px 0 0;
</style>