<template name="telNull">
	<view>
		<!-- 封装为空组件 -->
		<graceEmpty :text="titleName" :iconSize="200" :iconType="4" iconColor="#ff9673" textColor="#ff9673"></graceEmpty>
	</view>
</template>

<script>
	import graceEmpty from "../graceUI/components/graceEmpty.vue";
	export default {
		name: "telNull",
		props: {
			titleName: {
				type: String,
				value:""
			},
		},
		components: {
			graceEmpty
		},
		data() {
			return {

			};
		},
	}
</script>

<style>

</style>
