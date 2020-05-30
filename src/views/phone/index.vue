<template>
	<div>
		<el-image
      :src="bg"
      :fit="`cover`"></el-image>
    <div class="footer">
	    <el-button-group>
	    	<el-button class="left" @click="showRank">查看排名</el-button>
	    	<el-button class="right" @click="register">立即报名</el-button>
	    </el-button-group>
    </div>
    <div class="rules" @click="dialogVisible = true">
      <div>赛</div>
      <div>事</div>
      <div>规</div>
      <div>则</div>
    </div>
    <el-dialog
		  title="活动规则"
		  :visible.sync="dialogVisible">
		  <p style="color: #DC3838; font-size: 16px; text-align: left;">赛程安排:</p>
	    <p style="text-align: left;"> 比赛包括周赛、月赛、总赛，一个月赛由四个周赛组成，一个周赛的比赛周期为一周（周一至周五）、总赛由所有的周赛和月赛组成。每个周赛周期比赛封闭，不允许在比赛当期中途报名，错过当期比赛报名时间的只能参加下期周赛及之后排期的比赛。比赛只需报名一次，若中途不退赛且满足参赛要求，将默认参加报名后的所有比赛。</p>
	    <p style="color: #DC3838; font-size: 16px; text-align: left;">参赛资格:</p>
	    <p style="text-align: left;">参赛选手需使用本人交易账号在活动页面点击报名方能参加比赛，选手点击报名参赛，即表示授权粤开证券计算其账户收益率、持仓明细、交易记录、资金量并结合昵称公布以上数据及排名。参赛选手可为个人或机构，需用粤开证券的交易账户参加比赛。
			</p>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">我知道了</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
	import bg from '@/assets/phone/bg.png'
  export default {
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        'bg': bg,
        dialogVisible: false
      }
    },
    methods: {
    	showRank() {
    		this.$router.push('/cgds/mobile/rank')
    	},
    	register() {
    		this.$router.push('/cgds/mobile/register')
    	}
    }
  }
</script>
<style lang="stylus">
	.footer {
		position: fixed;
		bottom: 30px;
		width: 100%;
	}
	.rules {
    width: 30px;
    background: #000000;
    border: 1px solid #000000;
    border-radius: 4px;
    opacity: 0.5;
    color: #FFD500;
    text-align: center;
    position: fixed;
    right: 16px;
    bottom: 100px;
  }
  .el-button-group {
  	width: 90%;
  }
  .el-button.left {
  	width: 45%;
  	margin-right: 10px !important;
  	border: 1px solid #DC3838 !important;
  	border-radius: 5px !important;
		color: #DC3838;
		span {
  		font-size: 18px;
  	}
  	
  }
  .el-button.right {
		width: 45%;
  	border: 1px solid #DC3838 !important;
  	background-color: #DC3838 !important;
  	float: right !important;
  	border-radius: 5px !important;
  	span {
  		font-size: 18px;
  		color: #fff;
	  }
	}
	.el-dialog {
		width: 85% !important;
	}
	.el-dialog__footer {
		text-align: center !important;
		button {
			width: 80%;
			background: #DC3838;
			color: #fff;
			font-size: 18px;
		}
	}
  
</style>