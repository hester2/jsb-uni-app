<template>
	<view class="conainer">
		<view class="ot-Dtailes-host" v-for="(item,index) in r" :key="index">
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">型号:</view>
					<view class="demo7  grace-no-scale">{{item.area}}，{{item.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">{{item.related_num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流公司:</view>
					<view class="demo7  grace-no-scale">{{item.logistics_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机:</view>
					<view class="demo7  grace-no-scale">{{item.driver_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">车牌号:</view>
					<view class="demo7  grace-no-scale">{{item.plate_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">司机手机:</view>
					<view class="demo7  grace-no-scale">{{item.drvier_tel}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button btn" size="mini" @tap="handleClick(0)">定位</button>
						<button type="primary" class="grace-button btn" size="mini" @tap="handleClick(1)">轨迹</button>
						<button type="primary" class="grace-button btn" size="mini" @tap="handleClick(2)">实时监控</button>
					</view>
				</view>
				
			</view>
		</view>
		<view v-if="r.length==0?true:false" class="grace-null">
			<telNull titleName="暂无支付信息"></telNull>
		</view>
	</view>
</template>

<script>
	import telNull from "../../../../../../components/telNull.vue";
	var _self
	export default {
		components: {
			telNull,
		},
		data() {
			return {
				r:{}
			}
		},
		onLoad(option){
			_self=this
			var id=option.id
			uni.request({
				url:this.$webUrl+'/sale/order/logInfo',
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.r=res.data
				}
			})
		},
		methods: {
		handleClick(o){
			switch(o){
				case 0:
				uni.navigateTo({
					url: '../salesPositioning/index',
				})
				break;
				case 1:
				uni.navigateTo({
					url: '../salesTrajectory/index',
				})
				break;
				case 2:
				uni.navigateTo({
					url: '../salesMonitoring/index',
				})
				break;
			}
		}
		}
	}
</script>

<style>
	@import "../../../../../../common/css/logistics.css";
	.grace-null {
		height: 600upx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
