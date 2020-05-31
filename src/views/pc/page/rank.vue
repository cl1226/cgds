<template>
	<div class="rank">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">旁行榜</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px; color: #909399;">注：高手操作展示已公开交易记录总收益前200名的选手，交易记录每日更新一次</span>
		  </div>
		</el-card>
		<br>
		<Footer />
	</div>
</template>

<script>
	import Footer from '@/views/pc/common/footer.vue'

	export default {
		name: 'rank',
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
	.rank
		.el-card__header
			text-align: left;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0;
</style>