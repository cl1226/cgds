<template>
	<div>
		<el-image
      :src="rule"
      :fit="`cover`"></el-image>
	</div>
</template>
<script>
	import rule from '@/assets/pc/rule.png'

	export default {
		name: 'award',
		data() {
			return {
				'rule': rule
			}
		}
	}
</script>