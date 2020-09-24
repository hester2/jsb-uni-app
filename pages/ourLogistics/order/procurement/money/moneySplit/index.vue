<template>
	<view class="">
		<view class="ot-sales-la">
			<view class="ot-sales-lx" v-for="(item,index) in o" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单编号:{{item.order_no}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">客户：{{item.customer_name}}</view>
				<view class="ot-sales-ln">联系方式：{{item.customer_mobile}}</view>
				<view class="ot-sales-ln">数量：{{item.num}}吨</view>
				<view class="ot-sales-ln">单价：{{item.price}}</view>
				<view class="ot-sales-ln">含税/不含税：{{item.tax}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">总金额：{{item.total_price}}</view>
						<view class="demo7">{{item.sale_time.substring(0,10)}}</view>
					</view>
				</view>
			</view>

		</view>
		<view class="grace-null" v-if="o.length==0?true:false">
			<telNull titleName="暂无拆单信息"></telNull>
		</view>
		<view style="padding:22rpx 25rpx;">
			<button formType="submit" type="primary" style="width:100%;" @tap="hanleChange">下一页</button>
		</view>
	</view>
</template>

<script>
	var _self
	import common from "../../../../../../common/common.js"
	import telNull from "../../../../../../components/telNull.vue"
	export default {
		components: {
			telNull
		},
		data() {
			return {
				img: common.imageUrlPath,
				o: {},
				id: ''
			}
		},
		onLoad(option) {
			_self = this

			var id = option.id
			_self.id = id

			uni.request({
				url: this.$webUrl + "/presale/order/split",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.o = res.data
				}
			})
		},
		methods: {
			hanleChange() {
				uni.navigateTo({
					url: '../moneyLogistics/index?id=' + _self.id,
				});
			}
		}
	}
</script>

<style>
	@import "../../../../../../common/css/orderList.css";

	button {
		background-color: #ff5722 !important;
	}

	.grace-null {
		height: 600upx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
