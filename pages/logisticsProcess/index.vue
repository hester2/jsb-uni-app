<template>
	<view class="conainer">
		<view class="ot-process-main">
			<image :src="img+'pic-process_1.jpg'"></image>
		</view>
		<view class="ot-process-admin">
			<image :src="img+'pic-process_2.jpg'"></image>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	export default{
		   data(){
			   return{
				   img:common.imageUrlPath
			   }
		   }
	}
</script>

<style>
	page{
		background-color: #eee;
	}
	.ot-process-main{
		height: 250upx;
		width: 100%;
	}
	.ot-process-main image{
		display: block;
		width: 100%;
		height: 250upx;
	}
	.ot-process-admin{
		margin-top: 30upx;
		background-color: #fff;
		height: 624upx;
	}
	.ot-process-admin image{
		height: 624upx;
		width: 100%;
		display: block;
	}
</style>
