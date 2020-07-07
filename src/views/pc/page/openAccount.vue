<template>
	<div>
		<el-image
      :src="openAccount"
      :fit="`cover`"></el-image>
	</div>
</template>
<script>
	import openAccount from '@/assets/pc/kaihu.png'

	export default {
		name: 'openAccount',
		data() {
			return {
				'openAccount': openAccount
			}
		}
	}
</script>