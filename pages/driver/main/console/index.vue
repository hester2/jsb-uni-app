<template>
	<view class="container">
		<view class="grace-null">
			<telNull titleName="正在建设中"></telNull>
		</view>
	</view>
</template>

<script>
	import telNull from "../../../../components/telNull.vue"
	export default {
		components: {
			telNull
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
	}

	.grace-null {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
