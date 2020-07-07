<template>
	<div class="header">
		<div class="header-bar">
			<el-row :gutter="20">
			  <el-col :span="12">
			  	<div>
			  		<el-image
				      :src="logo"
				      :fit="`cover`"></el-image>
				    <el-image
				      :src="sublogo"
				      :fit="`cover`"></el-image>
			  	</div>
			  </el-col>
			  <el-col :span="12">
			  	<div>
			  		<el-image
				      :src="right"
				      :fit="`cover`"></el-image>
				    <!-- <el-image
				      :src="middle"
				      :fit="`cover`"></el-image> -->
			  	</div>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>
<script>
	import logo from '@/assets/pc/ykzq_logo.png'
	import sublogo from '@/assets/pc/cgds_logo.png'
	import middle from '@/assets/pc/header_middle.png'
	import right from '@/assets/pc/header_right.png'

	export default {
		name: 'header',
		data() {
			return {
				'logo': logo,
				'sublogo': sublogo,
				'middle': middle,
				'right': right
			}
		},
		methods: {
			handleClick() {

			}
		}
	}
</script>
<style lang="stylus">
	.header
		width: 100%;
		margin: 0 10px;
</style>