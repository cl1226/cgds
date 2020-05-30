<template>
	<div>
		<el-image
      :src="award"
      :fit="`cover`"></el-image>
	</div>
</template>
<script>
	import award from '@/assets/pc/award0.png'

	export default {
		name: 'award',
		data() {
			return {
				'award': award
			}
		}
	}
</script>