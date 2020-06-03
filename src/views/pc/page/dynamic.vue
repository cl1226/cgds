<template>
	<div class="dynamic">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">大赛动态</span>
		  </div>
		  <ul class="infinite-list" style="overflow:auto; text-align: left;">
		    <li v-for="(d, index) in datas" :key="index" class="infinite-list-item">
		    	<p>
		    		<el-link @click="view(d)" :underline="false">
		    			大赛观察证券及敏感证券名单({{d | dateFormat('MM-DD')}})
		    		</el-link>
		    		<el-link @click="view(d)" style="float: right;" :underline="false">
		    			{{d | dateFormat('YYYY-MM-DD')}}
		    		</el-link>
		    	</p>
		    </li>
		  </ul>  
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
		name: 'dynamic',
		components: {
			Footer: Footer
		},
		data() {
			return {
				currentDate: new Date().Format('yyyyMMdd'),
				pageNumber: 1,
				pageSize: 20,
				total: 1,
				datas: []
			}
		},
		methods: {
			changePage(page) {
				this.pageNumber = page
				this.load()
			},
			view(d) {
				this.$router.push('/cgds/dynamic/detail/' + new Date(d).Format('yyyyMMdddd'))
			},
			load() {
				var self = this
				self.$api.get('/sensitiveStock/sensitiveDateList', {
					assetDate: this.currentDate,
					pageNumber: this.pageNumber,
					pageSize: this.pageSize
				}, function(response) {
					if (response && response.code == 1) {
						self.datas = new Array(response.obj.list.length);
						var pattern = /(\d{4})(\d{2})(\d{2})/;
						for (var i = response.obj.list.length - 1; i >= 0; i--) {
							self.datas[i] = new Date((response.obj.list[i]+'').replace(pattern, '$1-$2-$3'));
						}
						self.total = response.obj.totalRow;
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
	.dynamic
		.el-card__header
			text-align: left;
			border-bottom: 2px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0 10px 0 0;
</style>