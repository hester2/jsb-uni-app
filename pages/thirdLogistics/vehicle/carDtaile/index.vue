<template>
	<view class="">
		<view class="ot-Dtailes-host">
		  <view class="grace-list hj">
		    <view class="items">
		      <view class="icons grace-icons iconfont icon-dingdan"></view>
		      <view class="body">
		        <view class="title">详情信息</view>
		      </view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">所属人:</view>
		      <view class="demo7  grace-no-scale">{{car.owner_name}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">车牌号:</view>
		      <view class="demo7  grace-no-scale">{{car.plate_no}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">车辆类型:</view>
		      <view class="demo7  grace-no-scale">{{car.cart_type}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">车长:</view>
		      <view class="demo7  grace-no-scale">{{car.length}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">车宽:</view>
		      <view class="demo7  grace-no-scale">{{car.width}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">车高:</view>
		      <view class="demo7  grace-no-scale">{{car.height}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">吨位:</view>
		      <view class="demo7  grace-no-scale">{{car.tonnage}}</view>
		    </view>
		 
		    <view class="grace-space-between">
		      <view class="demo6">体积:</view>
		      <view class="demo7  grace-no-scale">{{car.volume}}</view>
		    </view>
		    <view class="grace-space-between">
		      <view class="demo6">识别号:</view>
		      <view class="demo7  grace-no-scale">{{car.vin}}</view>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	var _self
	export default{
		data(){
			return {
				car:{}
			}
		},
		onLoad(option){
			_self =this
			var id = option.id
			uni.request({
				url:this.$webUrl+"/logistics/findCar",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.car=res.data
				}
			})
		}
	}
</script>

<style>
	@import "../../../../common/css/orderDetail.css";
</style>
