<template>
	<div class="layout">
		<el-backtop></el-backtop>
		<el-container>
		  <el-header style="height: 80px; margin-top: 20px;">
		  	<Header></Header>
		  </el-header>
		  <el-divider></el-divider>
		  <!-- <el-main> -->
		  	<el-tabs v-model="activeName" @tab-click="handleClick" v-if="showBar">
		  		<el-tab-pane v-for="tab in tabs" :key="tab.code" :label="tab.name" :name="tab.code">
		  			<router-view @hide-bar="hideBar" />
		  		</el-tab-pane>
				</el-tabs>
		  	<router-view/>
		  <!-- </el-main> -->
		</el-container>
		
	</div>
</template>
<script>
	import Header from "@/views/pc/common/header.vue";

	export default {
		name: 'layout',
		components: {
	    Header
	  },
		data() {
			return {
				'activeName': 'index',
				'showBar': true,
				'tabs': [{
					name: '大赛首页',
					code: 'index'
				}, {
					name: '排行榜',
					code: 'rank'
				}, {
					name: '我的主页',
					code: 'dashboard'
				}, {
					name: '投顾咨询',
					code: 'news'
				}, {
					name: '大赛说明',
					code: 'intro'
				}, {
					name: '活动奖品',
					code: 'award'
				}, {
					name: '大赛动态',
					code: 'dynamic'
				}]
			}
		},
		methods: {
			handleClick() {
				this.$router.push('/cgds/' + this.activeName)
			},
			hideBar() {
				this.showBar = false;
			}
		}
	}
</script>
<style lang="stylus">
	.layout
		.el-divider--horizontal
			margin: 0;
		.el-tabs__header
				margin: 0;
			.el-tabs__nav
				width: 100%;
				.el-tabs__item
					width: 14.2%;
					font-size: 20px;
					height: 50px;
					line-height: 50px;
					font-weight: 400;
				.el-tabs__item:hover
					background: #DC3838;
					color: #FFF;
				.is-active
					background: #DC3838;
					color: #FFF;
				.el-tabs__active-bar
					display: none;
</style>