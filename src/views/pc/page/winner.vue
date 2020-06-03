<template>
	<div class="rank">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">获奖名单</span>
		    <div style="float: right; padding: 3px 0; margin-left: 20px;">
		    	<el-radio v-model="radio" label="0" @change="changeRadio">30万以下</el-radio>
	  			<el-radio v-model="radio" label="1" @change="changeRadio">30万以上</el-radio>
		    </div>
		    <el-divider class="right" direction="vertical"></el-divider>
		    <div style="float: right; padding: 3px 0;margin-right: 20px;">
		    	<el-radio v-model="radio2" label="周赛" @change="changeRadio2">周赛</el-radio>
	  			<el-radio v-model="radio2" label="月赛" @change="changeRadio2">月赛</el-radio>
	  			<el-radio v-model="radio2" label="总赛" @change="changeRadio2">总赛</el-radio>
		    </div>
		  </div>
		  <el-table
		    :data="winners"
		    style="width: 100%">
		    <el-table-column
		      prop="title"
		      label="赛期"
		      width="150">
		    </el-table-column>
		    <el-table-column
		      prop="rank"
		      label="排名"
		      width="100">
		    </el-table-column>
		    <el-table-column
		    	prop="nickName"
		      label="昵称">
		    </el-table-column>
		    <el-table-column
		      prop="incomeRate"
		      label="总收益">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.incomeRate>0,'font-green':scope.row.incomeRate<0}" v-if="scope.row.incomeRate>-100">{{(scope.row.incomeRate*100).toFixed(4)}}%</span>
          	<span v-if="scope.row.incomeRate<=-100">--</span>	
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="award"
		      label="奖品">
		    </el-table-column>
		  </el-table>
		</el-card>
		<br>
		<Footer />
	</div>
</template>

<script>
	import Footer from '@/views/pc/common/footer.vue'

	export default {
		name: 'winner',
		components: {
			Footer: Footer
		},
		data() {
			return {
				radio: "0",
				radio2: "周赛",
				winners: [],

				pageNumber: 1,
				pageSize: 100
			}
		},
		methods: {
			changeRadio() {
      	this.loadWinners()
      },
      changeRadio2() {
      	this.loadWinners()
      },
      // 获奖名单
      loadWinners() {
      	var self = this
      	this.$api.get('/winner/list', {
      		accountType: self.radio,
      		type: self.radio2
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
	}
</script>
<style lang="stylus">
	.rank
		.el-card__header
			text-align: left;
			border-bottom: 1px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-card__body
			padding: 0;
		.font-red
			color: red;
		.font-green
			color: green;
		.el-divider--vertical.right
			float: right;
</style>