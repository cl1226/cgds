<template>
	<div class="mobile_rank">
		<br>
		<div class="header">
			<el-tabs v-model="active1" @tab-click="handleClick">
		    <el-tab-pane label="30万以上组" name="first"></el-tab-pane>
		    <el-tab-pane label="30万以下组" name="second"></el-tab-pane>
		  </el-tabs>	
		</div>
	  <br>
		<div class="content">
			<el-tabs v-model="active2" @tab-click="handleClick">
		    <el-tab-pane label="周赛" name="week">周赛</el-tab-pane>
		    <el-tab-pane label="月赛一期" name="month_f">月赛一期</el-tab-pane>
				<el-tab-pane label="月赛二期" name="month_s">月赛二期</el-tab-pane>
		    <el-tab-pane label="总赛" name="total">总赛</el-tab-pane>
		  </el-tabs>
		</div>
	</div>
</template>
<script>
	export default {
    data() {
      return {
        active1: 'first',
        active2: 'week'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
<style lang="stylus">
	.mobile_rank
		.header
			.el-tabs__nav
				width: 100%;
				.el-tabs__item
					width: 50% !important;
				.el-tabs__item.is-active
					color: #DC3838;
				.el-tabs__active-bar
					background-color: #DC3838;
		.content
			.el-tabs__nav
				width: 100%;
				.el-tabs__item
					width: 25% !important;
				.el-tabs__item.is-active
					color: #DC3838;
				.el-tabs__active-bar
					background-color: #DC3838;
</style>