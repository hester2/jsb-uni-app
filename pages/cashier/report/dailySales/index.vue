<template>
	<view class="">
		<view class="ot-cus-container">
			<view class="grace-search" id="grace-filter-header">
				<view class="grace-search-in">
					<view class="icons iconfont icon-riliriqi"></view>
					<view class="input">
						<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" />
					</view>
				</view>
				<view>
					<button type="primary" class="grace-button" size="mini">
						<image :src="img+'offersearch.png'"></image>
					</button>
				</view>
			</view>
		</view>
		<view class="ot-container">
			<view class="ot-home-qx mn">
				<text></text>
				<text>统计</text>
			</view>
			<view class="grace-box-banner ot-bottom grace-border-radius-small">
				<view class="garce-items">
					<view class="line1">460890
						<text>元</text>
					</view>
					<view class="line2">总金额</view>
				</view>
				<view class="garce-items">
					<view class="line1">65.7
						<text>吨</text>
					</view>
					<view class="line2">总量</view>
				</view>
			</view>
			<view class="grace-box-banner grace-border-radius-small">
				<view class="garce-items">
					<view class="line1">98,500.00
						<text>元</text>
					</view>
					<view class="line2">未付账款</view>
				</view>
				<view class="garce-items">
					<view class="line1">362,390.00
						<text>吨</text>
					</view>
					<view class="line2">已付账款</view>
				</view>
			</view>
			<view class="ot-bg"></view>
			<view class="ot-sales-la">
				<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in sales" :key="index">
					<image class="ot-image" :src="img+'qian.png'"></image>
					<view class="ot-sales-lc">
						<view class="grace-space-between">
							<view class="demo6">订单号: {{item.danhao}}</view>
						</view>
					</view>
					<view class="ot-sales-ln">产地/型号：{{item.address}}/{{item.pro}}</view>
					<view class="ot-sales-ln">类型：{{item.type}}</view>
					<view class="ot-sales-lm">
						<view class="grace-space-between">
							<view class="demo6">客户：{{item.customer}}</view>
							<view class="demo7" @tap.stop="handleChange">查看详情</view>
						</view>
					</view>
					<view class="ot-sales-ln">是否开票：{{item.invoice}}</view>
					<view class="ot-sales-ln">采购金额：{{item.unit}}</view>
					<view class="ot-sales-ln ot-sales-dast">
						<view class="grace-space-between">
							<view class="demo6">到款状态：{{item.state}}</view>
							<view class="demo7">{{item.time}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1" v-on:closeDate="closeDate1"></graceDate>
	</view>
</template>

<script>
	import graceDate from '../../../../graceUI/components/graceDate.vue'
	import common from '../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				date1: '点击选择',
				show1: false,
				sales: [{
					'id': 0,
					'danhao': 'XS_1567046629446',
					'address': '大庆',
					'pro': '6097',
					'type': '含税',
					'customer': '厦门市发发集团',
					'invoice': '是',
					'unit': '35000',
					'state': '未到账',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'danhao': 'XS_1567046629446',
					'address': '大庆',
					'pro': '6097',
					'type': '含税',
					'customer': '厦门市发发集团',
					'invoice': '是',
					'unit': '35000',
					'state': '未到账',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'danhao': 'XS_1567046629446',
					'address': '大庆',
					'pro': '6097',
					'type': '含税',
					'customer': '厦门市发发集团',
					'invoice': '是',
					'unit': '35000',
					'state': '未到账',
					'time': '2019-08-16'
				}]
			}
		},
		mounted() {
			_self = this
		},

		methods: {

			handleClick() {
				uni.navigateTo({
					url: '../../order/sales/salesDetail/index',
				})
			},
			handleChange() {
				uni.navigateTo({
					url: '../dailySalesDetail/index',
				})
			},

			closeDate1: function() {
				this.show1 = false;
			},
			showDate1: function() {
				this.show1 = true;
			},
			changeDate1: function(e) {
				this.date1 = e;
				this.show1 = false;
			},


		},
		components: {
			graceDate
		},
	}
</script>

<style>
	@import "../../../../common/css/orderList.css";

	.icon-riliriqi:before {
		content: "\e60b";
	}

	.ot-cus-container {
		box-sizing: border-box;
		padding: 20upx 30upx;
		background-color: #eee;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	page {
		background-color: #fff;
	}

	.grace-search {
		padding: 0px;
		width: 100%;
		height: 70upx;
		display: flex;
		justify-content: center;
		margin: 0px;
	}

	.grace-search-in {
		border-radius: 10upx;
		height: 70upx;
		width: 100% !important;
	}

	uni-button[size=mini] {
		padding: 0px 1.34em !important;

	}

	.grace-search-in {
		width: 75%;
		margin-left: 0px;
	}

	button[size=mini] {
		line-height: 68upx;
		padding: 14upx 1.34em;
		box-sizing: border-box;
		padding-top: 3px !important;
		line-height: 68upx;
		height: 68upx;
		margin-left: 20upx;
	}

	button {
		background-color: #ff5722 !important;
	}

	nizhidao .ot-container {
		background-color: #fff;
		box-sizing: border-box;
	}
</style>
