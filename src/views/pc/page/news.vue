<template>
	<div class="news">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">投顾咨询</span>
		  </div>
		  <el-pagination
			  background
			  layout="prev, pager, next"
			  :total="10">
			</el-pagination>
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

			}
		},
		methods: {

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
</style>