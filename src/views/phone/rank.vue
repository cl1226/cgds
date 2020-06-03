<template>
	<div class="mobile_rank">
		<br>
		<div class="header">
			<el-tabs v-model="active1" @tab-click="handleClick1">
		    <el-tab-pane label="30万以上组" name="0"></el-tab-pane>
		    <el-tab-pane label="30万以下组" name="1"></el-tab-pane>
		  </el-tabs>	
		</div>
	  <br>
		<div class="content">
			<el-tabs v-model="active2" @tab-click="handleClick2">
		    <el-tab-pane label="周赛" name="周赛"></el-tab-pane>
		    <el-tab-pane label="月赛一期" name="月赛一期"></el-tab-pane>
				<el-tab-pane label="月赛二期" name="月赛二期"></el-tab-pane>
		    <el-tab-pane label="总赛" name="总赛"></el-tab-pane>
		  </el-tabs>
		  <el-table
	    :data="winners"
	    style="width: 100%; height: 500px; overflow-y: auto;"
	    :show-header="false">
		    <el-table-column
		      prop="title">
		    </el-table-column>
		    <el-table-column
		      prop="nickName">
		    </el-table-column>
		    <el-table-column
		      prop="incomeRate"
		      width="180">
		      <template scope="scope">
		      	<p>收益率: <span :class="{'font-red':scope.row.incomeRate>0,'font-green':scope.row.incomeRate<0}">{{(scope.row.incomeRate*100).toFixed(2)}}%</span></p>
		      	<p>奖品: {{scope.row.award}}</p>
		      	<p></p>
		      </template>
		    </el-table-column>
		  </el-table>
		</div>
	</div>
</template>
<script>
	export default {
    data() {
      return {
        active1: '0',
        active2: '周赛',
				winners: []
      };
    },
    methods: {
      handleClick1(tab) {
      	this.active1 = tab.name
      	this.loadWinners()
      },
      handleClick2(tab) {
        this.active2 = tab.label
        this.loadWinners()
      },
      loadWinners() {
      	var self = this
      	var type = self.active2
      	var periodId = 0
      	if (self.active2 == '月赛一期') {
      		type = '月赛'
      		periodId = 1
      	}
      	if (self.active2 == '月赛二期') {
      		type = '月赛'
      		periodId = 2
      	}

      	this.$api.get('/winner/list', {
      		accountType: self.active1,
      		type: type,
      		periodId: periodId
				}, response => {
			    if (response && response.code == 1) {
						self.winners = response.obj
					}
				});
      }
    },
    created() {
    	this.loadWinners()
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
			.item
				height: 40px;
				line-height: 40px;
		.font-red
			color: red;
		.font-green
			color: green;
</style>