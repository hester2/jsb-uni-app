<template>
	<view class="ot-fill-fe">
		<view class="grace-null">
			<telNull titleName="正在建设中"></telNull>
		</view>
	</view>
</template>

<script>
	import telNull from '../../../components/telNull.vue'
	export default {
		components: {
			telNull
		},
		data() {
			return {
			}
		},
	}
</script>

<style>
	page{
		height: 100%;
	}
	.ot-fill-fe {
		height: 100%;
	}

	.grace-null {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
