<template>
	<div class="rank">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">排行榜</span>
		    <div style="float: right; padding: 3px 0; margin-left: 20px;">
		    	<el-radio v-model="radio" label="0" @change="changeRadio">30万以下</el-radio>
	  			<el-radio v-model="radio" label="1" @change="changeRadio">30万以上</el-radio>
		    </div>
		    <el-divider class="right" direction="vertical"></el-divider>
		    <div style="float: right; padding: 3px 0;margin-right: 20px;">
		    	<el-radio v-model="radio2" label="1" @change="changeRadio2">总收益排名</el-radio>
	  			<el-radio v-model="radio2" label="2" @change="changeRadio2">日收益排名</el-radio>
	  			<el-radio v-model="radio2" label="3" @change="changeRadio2">周收益排名</el-radio>
	  			<el-radio v-model="radio2" label="4" @change="changeRadio2">月收益排名</el-radio>
		    </div>
		  </div>
		  <el-table
		    :data="ranks"
		    style="width: 100%">
		    <el-table-column
		      prop="_rank"
		      label="排名">
		      <template scope="scope">
			      <div v-if="scope.row._rank <= 3">
			      	<el-image
				      :src="rankMap[scope.row._rank]"
				      :fit="`cover`"></el-image>
			      </div>
			      <div v-else>{{scope.row._rank}}</div>
			    </template>
		    </el-table-column>
		    <el-table-column
		      prop="nickName"
		      label="昵称">
		    </el-table-column>
		    <el-table-column
		      label="组别">
		      <span v-if="radio == 0">30万以下</span>
		      <span v-else>30万以上</span>
		    </el-table-column>
		    <el-table-column
		      prop="totalYieldRate"
		      label="总收益">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.totalYieldRate>0,'font-green':scope.row.totalYieldRate<0}" v-if="scope.row.totalYieldRate>-100">{{(scope.row.totalYieldRate*100).toFixed(4)}}%</span>
          	<span v-if="scope.row.totalYieldRate<=-100">--</span>	
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="yieldRate"
		      label="日收益">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.yieldRate>0,'font-green':scope.row.yieldRate<0}" v-if="scope.row.yieldRate>-100">{{(scope.row.yieldRate*100).toFixed(4)}}%</span>
          	<span v-if="scope.row.yieldRate<=-100">--</span>	
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="weekYieldRate"
		      label="周收益">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.weekYieldRate>0,'font-green':scope.row.weekYieldRate<0}" v-if="scope.row.weekYieldRate>-100">{{(scope.row.weekYieldRate*100).toFixed(4)}}%</span>
          	<span v-if="scope.row.weekYieldRate<=-100">--</span>	
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="monthYieldRate"
		      label="月收益">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.monthYieldRate>0,'font-green':scope.row.monthYieldRate<0}" v-if="scope.row.monthYieldRate>-100">{{(scope.row.monthYieldRate*100).toFixed(4)}}%</span>
          	<span v-if="scope.row.monthYieldRate<=-100">--</span>	
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="weekTradeCount"
		      label="月交易次数">
		      <template scope="scope">
		      	{{scope.row.weekTradeCount || 0}}
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="fansCount"
		      label="粉丝数">
		    </el-table-column>
		  </el-table>
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
		<div style="color:#DC3838;font-size: 14px;line-height: 25px;padding-top: 10px; text-align: left;">
    排行榜说明：比赛选手的总收益率、月收益率、周收益率、日收益率每日根据前一日收盘清算数据计算一次，每日更新，动态变化。
    <br>
    </div>
    <div style="color:#DC3838;font-size: 14px;line-height: 25px;padding-top: 10px;text-align:right;">当前收益率统计截止至 {{calcDate}} 收盘</div>
		<br>
		<br>
		<Footer />
	</div>
</template>

<script>
	import Footer from '@/views/pc/common/footer.vue'

	import rank1 from '@/assets/pc/rank1.png'
	import rank2 from '@/assets/pc/rank2.png'
	import rank3 from '@/assets/pc/rank3.png'

	export default {
		name: 'rank',
		components: {
			Footer: Footer
		},
		data() {
			return {
				radio: "0",
				radio2: "1",
				ranks: [],
				rankMap: {
					1: rank1,
					2: rank2,
					3: rank3
				},
				pageNumber: 1,
				pageSize: 10,
				total: 1,
				calcDate: ''
			}
		},
		methods: {
			changeRadio() {
      	this.loadRanks()
      },
      changeRadio2() {
      	this.loadRanks()
      },
      changePage(page) {
				this.pageNumber = page
				this.loadRanks()
			},
      // 排行榜
      loadRanks() {
      	var self = this
      	this.$api.get('/rank/rankList', {
      		accountType: self.radio,
      		orderType: self.radio2,
			    pageNumber: self.pageNumber,
					pageSize: self.pageSize
				}, response => {
			    if (response && response.code == 1) {
						self.ranks = response.obj.list
						for (var i = self.ranks.length - 1; i >= 0; i--) {
							switch(self.radio2) {
								case "1":
									self.ranks[i]['_rank'] = self.ranks[i].totalRank
									break;
								case "2":
									self.ranks[i]['_rank'] = self.ranks[i].rank
									break;
								case "3":
									self.ranks[i]['_rank'] = self.ranks[i].weekRank
									break;
								case "4":
									self.ranks[i]['_rank'] = self.ranks[i].monthRank
									break;
								default:
									break;
							}
						}
						self.total = response.obj.totalRow;
					}
				});
      },
      loadDate() {
      	var self = this
      	self.$api.get('/rank/getNewestCalculateDate', {
      	}, function(response) {
      		if (response && response.code == 1) {
      			self.calcDate = response.obj
      		}
      	})
      }
		},
		created() {
			this.loadRanks()
			this.loadDate()
			this.$emit('tabChange')
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