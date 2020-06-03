<template>
	<div class="index">
		<el-image
      :src="banner"
      :fit="`cover`"></el-image>
    <el-card class="box-card info-card" v-if="!isLogin">
    	<div slot="header" class="clearfix">
		    <span class="label">立即报名万元大奖等你来！</span>
		  </div>
		  <div class="text item">
		    <el-button class="register" @click="register">立即报名</el-button>
		  </div>
		  <div class="text item">
		  	<el-button class="login" @click="login">登录</el-button>
		  </div>
		  <div class="text item">
		  	<el-button class="open" @click="open">去开户</el-button>
		  </div>
		</el-card>
		<el-card class="box-card info-card" v-if="isLogin">
    	<div slot="header" class="clearfix">
		    <span class="label">我的信息</span>
		  </div>
		  <el-row style="border-bottom: 1px dashed #ccc;padding-bottom: 15px;">
		  	<el-col :span="12">
		  		上午好! {{currentUser.nickName}}
		  	</el-col>
		  	<el-col :span="12">
		  		<el-button size="mini" @click="quit" :loading="isLoading" style="color: #DC3838; background: #FFF;border-color: #DC3838;">退出登录</el-button>
		  	</el-col>
		  </el-row>
		  <el-row style="border-bottom: 1px dashed #ccc; padding: 15px 0;">
		  	<el-col :span="12" style="border-right: 1px dashed #ccc;">
		  		<el-col>有效参赛资产</el-col>
		  		<el-col>{{currentUser.totalAsset || '--'}}</el-col>
		  	</el-col>
		  	<el-col :span="12">
		  		<el-col>总收益</el-col>
		  		<el-col>{{currentUser.totalYieldRate || '--'}}</el-col>
		  	</el-col>
		  </el-row>
		  <el-row style="padding: 15px 0;">
		  	<el-col :span="12" style="border-right: 1px dashed #ccc;">
		  		<el-col>总排名</el-col>
		  		<el-col>{{currentUser.rank || '--'}}</el-col>
		  	</el-col>
		  </el-row>
		</el-card>
    <el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span class="label">高手操作</span>
		    <span style="float: right; padding: 3px 0; font-size: 14px; color: #909399;">注：高手操作展示已公开交易记录总收益前200名的选手，交易记录每日更新一次</span>
		  </div>
		  <el-table class="onlyheader"
		    style="width: 100%" >
			    <el-table-column
			      label="昵称">
			    </el-table-column>
			    <el-table-column
			      label="成交日期">
			    </el-table-column>
			    <el-table-column
			      label="证券代码">
			    </el-table-column>
			    <el-table-column
			      label="证券名称">
			    </el-table-column>
			    <el-table-column
			      label="操作">
			    </el-table-column>
			    <el-table-column
			      label="成交均价">
			    </el-table-column>
			    <el-table-column
			      label="关注">
			    </el-table-column>
			  </el-table>
		  <vue-seamless-scroll :data="tops" class="seamless-warp">
        <el-table
		    :data="tops"
		    :row-class-name="rowClass"
		    style="width: 100%"
		    :show-header="false">
			    <el-table-column
			      prop="nickName"
			      label="昵称">
			      <template scope="scope">
			      	<span style="color: rgb(96, 98, 102)">{{scope.row.nickName}}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="tradeDt"
			      label="成交日期">
			    </el-table-column>
			    <el-table-column
			      prop="stockCode"
			      label="证券代码">
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
			      label="关注">
			      <template slot-scope="scope">
			        <el-button class="follow"
			          size="mini"
			          v-if="!scope.row.isFollowed && !!currentUser &&scope.row.accountId!=currentUser.accountId" @click="follow(scope.row)"
			          >关注</el-button>
			        <el-button class="follow"
			          size="mini"
			          v-if="scope.row.isFollowed && !!currentUser &&scope.row.accountId!=currentUser.accountId"
			          @click="unfollow(scope.row)">取消关注</el-button>
			        <span v-if="!!currentUser && scope.row.accountId==currentUser.id">--</span>
			      </template>
			    </el-table-column>
			  </el-table>
	    </vue-seamless-scroll>
		</el-card>
		<br>
		<el-card class="box-card" shadow="never">
		  <div slot="header" class="clearfix">
		    <span>排行榜</span>
		    <div style="float: right; padding: 3px 0">
		    	<el-radio v-model="radio" label="0" @change="changeRadio">30万以下</el-radio>
	  			<el-radio v-model="radio" label="1" @change="changeRadio">30万以上</el-radio>
			    <el-link :underline="false" @click="viewMoreRank">查看详情>></el-link>
		    </div>
		  </div>
		  <el-table
		    :data="ranks"
		    style="width: 100%">
		    <el-table-column
		      prop="totalRank"
		      label="排名">
		      <template scope="scope">
			      <div v-if="scope.row.totalRank <= 3">
			      	<el-image
				      :src="rankMap[scope.row.totalRank]"
				      :fit="`cover`"></el-image>
			      </div>
			      <div v-else>{{scope.row.totalRank}}</div>
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
		  </el-table>
		</el-card>
		<br>
		<el-card class="box-card info" shadow="never">
		  <div slot="header" class="clearfix">
		    <span>投顾资讯</span>
		    <el-link :underline="false" style="float: right; padding: 3px 0" @click="viewMore">查看更多>></el-link>
		  </div>
		 	<el-row v-for="(item, index) in news" :key="index" class="item">
			  <el-col :span="8">
			  	<el-image
			      :src="item.imageUrl"
			      :fit="`cover`"></el-image>
			  </el-col>
			  <el-col :span="16">
			  	<el-col class="title">
			  		<el-link :underline='false' @click="view(item.id)">{{item.title}}</el-link>
			  	</el-col>
			  	<el-col class="content">
			  		<el-link :underline='false' @click="view(item.id)">摘要: {{item.summary}}</el-link>
			  	</el-col>
			  	<el-col class="publisher">
			  		<el-link :underline='false'>发布者: 广州分公司</el-link>
			  	</el-col>
			  </el-col>
			</el-row>
			<el-row>
				<el-col class="more">
					<el-link :underline='false' @click="viewMore">查看更多</el-link>
				</el-col>
			</el-row>
		</el-card>
		<br>
		<el-row :gutter="2">
			<el-col :span="8">
				<el-image
		      :src="barcode1"
		      :fit="`cover`"></el-image>
			</el-col>
			<el-col :span="8">
				<el-image
		      :src="barcode2"
		      :fit="`cover`"></el-image>
			</el-col>
			<el-col :span="8">
				<el-image
		      :src="barcode3"
		      :fit="`cover`"></el-image>
			</el-col>
		</el-row>
		<br>
		<Footer />
	</div>
</template>
<script>
	import banner from '@/assets/pc/banner.png'

	import rank1 from '@/assets/pc/rank1.png'
	import rank2 from '@/assets/pc/rank2.png'
	import rank3 from '@/assets/pc/rank3.png'

	import barcode1 from '@/assets/pc/barcode1.png'
	import barcode2 from '@/assets/pc/barcode2.png'
	import barcode3 from '@/assets/pc/barcode3.png'

	import Footer from '@/views/pc/common/footer.vue'

	export default {
		name: 'index',
		components: {
			Footer: Footer
		},
		data() {
			return {
				'banner': banner,
				'barcode1': barcode1,
				'barcode2': barcode2,
				'barcode3': barcode3,
				rankMap: {
					1: rank1,
					2: rank2,
					3: rank3
				},
				count: 0,
				radio: '0',
				tops: [],
				ranks: [],
				news: [],
				isLoading: false
			}
		},
		methods: {
			quit() {
				this.isLoading = true
				localStorage.clear()
				this.isLogin = false
				this.currentUser = null

				for (var i = 0; this.tops && i < this.tops.length; i++) {
					var t = this.tops[i];
					if (t) {
						t.isFollowed = false;
					}
				}
			},
			register() {
				this.$router.push('register')
			},
			login() {
				this.$router.push('login')
			},
			open() {
				window.open('http://www.ykzq.com/channel/123.html')
			},
			load () {
        this.count += 2
      },
      change() {
      	this.tops.push(this.tops[0])
      	this.tops.shift()
      },
      play() {
      	setInterval(this.change, 2000);
      },
      // 高手操作
      loadTopTrades() {
      	var self = this
      	this.$api.get('/rank/stockRecordList', {
      		rankTop: 200,
			    pageNumber: 1,
					pageSize: 200
				}, response => {
			    if (response && response.code == 1) {
						self.tops = response.obj.list
						var userIds = [];
						var shareRanks = {};
						for (var i = 0; i < response.obj.list.length; i++) {
							var r = response.obj.list[i];
							if (userIds.indexOf(r.accountId) < 0) {
								userIds.push(r.accountId);
								shareRanks[r.accountId] = shareRanks[r.accountId] || [];
							}
							shareRanks[r.accountId].push(r);
						}
						self.isFollowed(userIds, shareRanks)
						self.play()
					}
				});
      },
      rowClass(row) {
      	if (row.row.tradeFlag == "1") {
          return 'font-red';
        } else if (row.row.tradeFlag == "2") {
          return 'font-green';
        }
      },
      isFollowed(userIds, shareRanks) {
      	this.$api.get('/user/isFollowed', {
      		toAccountIds: userIds.join(','),
			    fromAccountId: this.currentUser.accountId
				}, response => {
			    if (response && response.code == 1) {
						var result = response.obj.toAccountId.length > 0 ? response.obj.toAccountId.split(","): [];

						for (var i = 0; result.length && i < result.length; i++) {
							var u = result[i];
							if (u) {
								for (var j = 0; shareRanks[u] && j < shareRanks[u].length; j++) {
									var it = shareRanks[u][j];
									if (it) {
										it.isFollowed = true;
									}
								}
							}
						}
					}
				});
      },
      follow(to) {
      	var self = this
      	if (!this.currentUser.accountId) {
      		self.$confirm('该功能需要登录,是否前往登录页面?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          self.$router.push('/cgds/login')
	        }).catch(() => {
	          
	        });
      	} else {
    			this.$api.post('/user/follow', {
	      		fromAccountId: this.currentUser.accountId,
	      		toAccountId: to.accountId
	      	}, function(response) {
	      		if (response && response.code == 1) {
	      			to.isFollowed = true
	      			self.$message.success('关注成功')
	      			self.currentUser.followsCount++
	      			localStorage.setItem('currentUser', JSON.stringify(self.currentUser))
	      		}
	      	})
      	}
      },
      unfollow(to) {
      	var self = this
      	if (!this.currentUser.accountId) {
      		self.$confirm('该功能需要登录,是否前往登录页面?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	          self.$router.push('/cgds/login')
	        }).catch(() => {
	          
	        });
      	} else {
    			this.$api.post('/user/cancelFollow', {
	      		fromAccountId: this.currentUser.accountId,
	      		toAccountId: to.accountId
	      	}, function(response) {
	      		if (response && response.code == 1) {
	      			to.isFollowed = false
	      			self.$message.success('取消关注成功')
	      			self.currentUser.followsCount--
	      			localStorage.setItem('currentUser', JSON.stringify(self.currentUser))
	      		}
	      	})
      	}
      },
      changeRadio() {
      	this.loadRanks()
      },
      // 排行榜
      loadRanks() {
      	var self = this
      	this.$api.get('/rank/rankList', {
      		accountType: self.radio,
      		orderType: 1,
			    pageNumber: 1,
					pageSize: 5
				}, response => {
			    if (response && response.code == 1) {
						self.ranks = response.obj.list
					}
				});
      },
      viewMoreRank() {
      	this.$router.push('rank')
      },
      // 投顾资讯
      loadNews() {
      	var self = this
				this.$api.get('/info/list', {
			    pageNumber: 1,
					pageSize: 5
				}, response => {
					if (response && response.code == 1) {
						self.news = response.obj.list
					}
				});
			},
			viewMore() {
				this.$router.push('news')
			}
		},
		created() {
			this.isLogin = localStorage.getItem('isLogin') || false
			this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || {}
			this.loadNews()
			this.loadRanks()
			this.loadTopTrades()
		}
	}
</script>
<style lang="stylus">
	.index
		.seamless-warp
			height: 300px;
			overflow: hidden;
		.info-card
			width: 320px;
			position: absolute;
			top: 30px;
			right: 10px;
			.item
				padding: 10px 0;
				.el-button
					width: 90%;
				.register
					background: #DC3838;
					color: #FFF;
					border-color: #DC3838;
				.login
					background: #F68200;
					color: #FFF;
					border-color: #F68200;
				.open
					color: #DC3838
					border-color: #DC3838;
			.text
				font-size: 14px;
		.el-card__header
			text-align: left;
			border-bottom: 1px solid #DC3838;
			.label
				color: #DC3838;
				font-size: 18px;
		.info
			.item
				border-bottom: 1px dashed #ccc;
				padding: 25px;
		.title
			margin: 5px 0;
			text-align: left !important;
			span
				font-weight: 400;
				font-size: 24px;
		.content
			margin: 5px 0;
			text-align: left !important;
			span
				color: #646464;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
		.publisher
			margin: 5px 0;
			text-align: left !important;
			span
				color: #646464;
		.more
			margin: 15px;
			span
				font-size: 20px;
		.font-red
			color: red;
		.font-green
			color: green;
		.onlyheader
			.el-table__empty-block
				display: none;
		.follow
			border-color: #DC3838 !important;
			background: #FFF !important;
			color: #DC3838 !important;
</style>