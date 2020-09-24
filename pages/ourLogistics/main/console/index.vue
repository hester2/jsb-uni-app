<template>
	<view class="">
		<view class="grace-null">
			<telNull titleName="正在建设中"></telNull>
		</view>
	</view>
</template>

<script>
	import telNull from '../../../../components/telNull.vue'
	export default{
		components: {
			telNull
		},
		data(){
			return{
				
			}
		}
	}
</script>

<style>
	.grace-null{
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		z-index: -1;
	}
</style>
