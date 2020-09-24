<template>
	<view class="conainer">
		<view class="ot-fill-fo">
			<graceEmpty text="正在建设中" :iconType="4" :iconSize="250" iconColor="#FFC0A8"></graceEmpty>
		</view>
	</view>
</template>

<script>
	import graceEmpty from "../../../../graceUI/components/graceEmpty.vue";
	export default {
		data() {
			return {
				show: true
			}
		},
		methods: {

		},
		components: {
			graceEmpty
		}
	}
</script>

<style>
	page {
		height: 100%;
	}
	.conainer{
		width: 100%;
		height: 100%;
	}

	.ot-fill-fo {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
