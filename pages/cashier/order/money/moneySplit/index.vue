<template>
	<view class="">
		<view class="ot-sales-la">
			<view class="ot-sales-lx" v-for="(item,index) in order" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单编号:{{item.bianhao}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">客户：{{item.kehu}}</view>
				<view class="ot-sales-ln">联系方式：{{item.lianxi}}</view>
				<view class="ot-sales-ln">数量：{{item.num}}吨</view>
				<view class="ot-sales-ln">单价：{{item.danjia}}</view>
				<view class="ot-sales-ln">含税/不含税：{{item.tax_nomal}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">总金额：{{item.price}}</view>
						<view class="demo7">{{item.date}}</view>
					</view>
				</view>
			</view>

		</view>
		<view style="padding:22rpx 25rpx;">
			<button formType="submit" type="primary" style="width:100%;" @tap="hanleChange">返回订单</button>
		</view>
	</view>
</template>

<script>
	import common from "../../../../../common/common.js"
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				order: [{
						id: 0,
						bianhao: 'CG-1565925044971',
						kehu: '邵武市黎明塑料制品有限公司',
						lianxi: '13960601881',
						num: '1',
						danjia: '8500',
						tax_nomal: '不含',
						price: '6000000',
						date: '2019-08-16'
					},
					{
						id: 1,
						bianhao: 'CG-1565925044971',
						kehu: '邵武市黎明塑料制品有限公司',
						lianxi: '13960601881',
						num: '1',
						danjia: '8500',
						tax_nomal: '不含',
						price: '6000000',
						date: '2019-08-16'
					},
					{
						id: 2,
						bianhao: 'CG-1565925044971',
						kehu: '邵武市黎明塑料制品有限公司',
						lianxi: '13960601881',
						num: '1',
						danjia: '8500',
						tax_nomal: '不含',
						price: '6000000',
						date: '2019-08-16'
					}
				]
			}
		},
		methods: {
			hanleChange() {
				this.$router.go(-1)
			}
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";
	button{
		background-color: #ff5722 !important;
	}
</style>
