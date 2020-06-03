<template>
	<div class="dashboard">
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">我的信息</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px;">
		    	我的关注: 
		    	<el-link @click="viewFollow">{{currentUser.followsCount}}</el-link>
		    	我的粉丝: 
		    	<el-link @click="viewFans">{{currentUser.fansCount}}</el-link>
		    </span>
		    <el-button size="mini" @click="quit" v-if="currentUser.state != 3">退出比赛</el-button>
		    <el-button size="mini" @click="quit" v-if="currentUser.state == 3" disabled>已退赛</el-button>
		  </div>
			<el-form>
			  <el-row :gutter="20">
				  <el-col :span="6">
				  	<el-form-item label="昵称:">
					  	<span>{{currentUser.nickName}}</span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="净资产:">
					  	<span>{{currentUser.totalAsset}}</span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="总排名:">
					  	<span>{{currentUser.totalRank}}</span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="总收益:">
					  	<span :class="{'font-red':currentUser.totalYieldRate>0,'font-green':currentUser.totalYieldRate<0}">{{(currentUser.totalYieldRate*100).toFixed(4)}}%</span>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="6">
				  	<el-form-item label="月收益:">
					  	<span :class="{'font-red':currentUser.weekYieldRate>0,'font-green':currentUser.weekYieldRate<0}">{{(currentUser.weekYieldRate*100).toFixed(4)}}%</span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="周收益:">
					  	<span :class="{'font-red':currentUser.weekYieldRate>0,'font-green':currentUser.weekYieldRate<0}">{{(currentUser.weekYieldRate*100).toFixed(4)}}%</span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="日收益:">
					  	<span :class="{'font-red':currentUser.weekYieldRate>0,'font-green':currentUser.weekYieldRate<0}">{{(currentUser.weekYieldRate*100).toFixed(4)}}%</span>
					  </el-form-item>
				  </el-col>
				  <el-col :span="6">
				  	<el-form-item label="周交易次数:">
					  	<span>{{currentUser.weekExchangeTime}}</span>
					  </el-form-item>
				  </el-col>
				</el-row>
				<el-row :gutter="20">
				  <el-col :span="6">
				  	<el-form-item label="所属营业部:">
					  	<span>广州分公司</span>
					  </el-form-item>
				  </el-col>
				</el-row>
			</el-form>
		</el-card>
		<br>
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">我的持仓</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px; color: #999999;">注:持仓数据每日更新一次，需实时查看持仓数据请登录交易系统</span>
		  </div>
		  <el-table
		    :data="tradeStocks"
		    height="250"
		    style="width: 100%">
		    <el-table-column
		      prop="stockCode"
		      label="证券代码"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="stockName"
		      label="证券名称"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="qty"
		      label="持仓数量">
		    </el-table-column>
		    <el-table-column
		      prop="availablecount"
		      label="可用数量">
		    </el-table-column>
		    <el-table-column
		      prop="profitcost"
		      label="成本价">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.profitcost>0,'font-green':scope.row.profitcost<0}">{{scope.row.profitcost}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="plRefer"
		      label="浮动盈亏">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.plRefer>0,'font-green':scope.row.plRefer<0}">{{(scope.row.plRefer).toFixed(4)}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="plRatio"
		      label="浮动盈亏率">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.plRatio>0,'font-green':scope.row.plRatio<0}">{{(scope.row.plRatio*100).toFixed(4)}}%</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="price"
		      label="市价">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.price>0,'font-green':scope.row.price<0}">{{scope.row.price}}</span>
		      </template>
		    </el-table-column>
		    <el-table-column
		      prop="mktValue"
		      label="市值">
		      <template scope="scope">
		      	<span :class="{'font-red':scope.row.mktValue>0,'font-green':scope.row.mktValue<0}">{{scope.row.mktValue}}</span>
		      </template>
		    </el-table-column>
		  </el-table>
		</el-card>
		<br>
		<br>
		<el-card class="box-card" style="width: 48%; float: left;" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">总收益</span>
		  </div>
		  <ve-line :data="chartData1" :settings="chartSettings"></ve-line>
		</el-card>
		<el-card class="box-card" style="width: 48%; float: right;" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">总排名</span>
		  </div>
		  <ve-line :data="chartData2" :settings="chartSettings"></ve-line>
		</el-card>
		<div style="clear: both;"></div>
		<br>
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">我的交易记录</span>
		  </div>
		  <el-table
		    :data="tradeRecords"
		    :row-class-name="rowClass"
		    height="250"
		    style="width: 100%">
		    <el-table-column
		      prop="tradeDt"
		      label="成交日期"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="stockCode"
		      label="证券代码"
		      >
		    </el-table-column>
		    <el-table-column
		      prop="stockName"
		      label="证券名称">
		    </el-table-column>
		    <el-table-column
		      prop="busNameHs"
		      label="操作">
		    </el-table-column>
		    <el-table-column
		      prop="matchPrice"
		      label="成交均价">
		    </el-table-column>
		    <el-table-column
		      prop="stockQty"
		      label="成交数量">
		    </el-table-column>
		    <el-table-column
		      prop="matchAmt"
		      label="成交金额">
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
		</el-card>
		<br>
		<Footer />
	</div>
</template>

<script>
	import Footer from '@/views/pc/common/footer.vue'
	import VeLine from 'v-charts/lib/line.common'

	export default {
		name: 'dashboard',
		components: {
			Footer: Footer,
			VeLine: VeLine
		},
		data() {
			this.chartSettings = {
        labelMap: {
          totalYieldRate: '总收益',
          totalRank: '总排名'
        }
      }
			return {
				pageNumber: 1,
				pageSize: 10,
				total: 1,
				tradeRecords: [],
				tradeStocks: [],
				chartData1: {
	        columns: ['date', 'totalYieldRate'],
	        rows: []
	      },
	      chartData2: {
	        columns: ['date', 'totalRank'],
	        rows: []
	      }
			}
		},
		methods: {
			rowClass(row) {
      	if (row.row.tradeFlag == "1") {
          return 'font-red';
        } else if (row.row.tradeFlag == "2") {
          return 'font-green';
        }
      },
      viewFollow() {
      	this.$router.push('/cgds/follower')
      },
      viewFans() {
      	this.$router.push('/cgds/fans')
      },
			// 退出比赛
			quit() {
				var self = this
        self.$confirm('退出比赛后将不能再次报名, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$api.post('/user/quit', {
						accountId: self.currentUser.accountId
					}, function(response) {
						if (response && response.code == 1) {
							self.currentUser.state = 3
							localStorage.setItem('currentUser', JSON.stringify(self.currentUser))
							self.$message.success('退出比赛成功!')
						}
					})
        }).catch(() => {
          
        });
      },
      changePage(page) {
				this.pageNumber = page
				this.loadUserTrade()
			},
      // 加载用户交易记录
      loadUserTrade() {
      	var self = this
      	self.$api.get('/record/stockRecordList', {
      		accountId: self.currentUser.accountId,
      		pageNumber: self.pageNumber,
      		pageSize: self.pageSize
      	}, function(response) {
      		if (response && response.code == 1) {
      			self.tradeRecords = response.obj.list
      			self.total = response.obj.totalRow
      		}
      	})
      },
      // 加载我的持仓数据
      loadUserStock() {
      	var self = this
      	self.$api.get('/record/stockBalanceList', {
      		accountId: self.currentUser.accountId,
					pageNumber: 1,
					pageSize: 1000
      	}, function(response) {
      		if (response && response.code == 1) {
      			self.tradeStocks = response.obj.list
      		}
      	})
      },
      // 加载总收益图标
      loadCharts() {
      	var self = this
      	self.$api.get('/rank/rankAndYieldRecord', {
      		accountId: self.currentUser.accountId,
					offset: 0,
					limit: 100
      	}, function(response) {
      		if (response && response.code == 1) {
      			response.obj.sort(function(a, b) {
							return a.assetDate > b.assetDate ? 1 : -1;
						});
						self.chartData1.rows = []
						self.chartData2.rows = []
						for(var i=0; i<response.obj.length; i++) {
							self.chartData1.rows.push(
								{
									date: response.obj[i].assetDate,
									totalYieldRate: response.obj[i].totalYieldRate
								})
							self.chartData2.rows.push(
								{
									date: response.obj[i].assetDate,
									totalRank: response.obj[i].totalRank || 0
								})
						}
      		}
      	})
      }
		},
		created() {
			this.isLogin = localStorage.getItem('isLogin') || false
			this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {}
			this.loadUserTrade()
			this.loadUserStock()
			this.loadCharts()
		}
	}
</script>
<style lang="stylus">
	.dashboard
		.el-form-item
			margin-bottom: 0;
		.el-button
			float: right;
			color: #DC3838;
			border-color: #DC3838;
			margin-right: 10px;
		.el-button:hover
			background: #DC3838;
			border-color: #DC3838;
			color: #FFF;
		.el-card__header
			text-align: left;
			border-bottom: 2px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.el-form-item__label
			font-weight: 600;
			width: 100px;
		.el-form-item__content
			text-align: left;
		.font-red
			color: red;
		.font-green
			color: green;
</style>