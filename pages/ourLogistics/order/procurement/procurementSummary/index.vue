<template>
	<view>
		<view class="ot-cus-container">
			<view class="grace-search" id="grace-filter-header">
				<view class="grace-search-in">
					<view class="icons iconfont icon-riliriqi"></view>
					<view class="input">
						<input type="text" class="input" name="date" :disabled="true" :value="date_menu" @tap="showDate" />
					</view>
				</view>
				<view>
					<button type="primary" class="grace-button" size="mini" @click="handClick">
						<image :src="img+'offersearch.png'"></image>
					</button>
				</view>
			</view>
		</view>
		<view>
			<view class="ot-home-qx mn">
				<view class="ot-text-fl">总计：
					<view class="ot-color">{{(totalPrice+'').replace(/\B(?=(\d{4})+(?!\d))/g, '.')}}</view>
				</view>
			</view>
		</view>
		<view v-for="(item,index) in o" :key="index">
			<view class="ot-container">
				<view>
					<view class="ot-sales-border" v-for="(i,index) in item" :key="index">
						<view class="ot-found-left">
							<image :src="img+'shouru.png'"></image>
						</view>
						<view class="ot-found-right">
							<view class="ot-found-betwer">
								<view class="ot-size-f2">{{i.area}}，{{i.code}}</view>
								<view>
									<text>{{i.num}}t</text>×{{i.price}}</view>
								<view>￥{{(i.total_price+'').replace(/\B(?=(\d{4})+(?!\d))/g, '.')}}</view>
							</view>
							<view class="ot-found-betwer">
								<view class="ot-size-f1">{{i.supplier_time.substring(0,10)}}</view>
							</view>
							<view class="ot-found-betwer">
								<view class="ot-size-f1">{{i.trade_type}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="ot-sales-bn">
					<view class="ot-size-f1">共发货{{item.count}}次</view>
					<view class="grace-space-between">
						<view class="demo6">合计：￥{{(item.totalPrice+'').replace(/\B(?=(\d{4})+(?!\d))/g, '.')}}</view>
						<view class="demo7">{{o_tax}}</view>
					</view>
				</view>
			</view>
		</view>
		<graceDate :show="show_menu" :isTime="false" v-on:changeDate="changeDate" v-on:closeDate="closeDate"></graceDate>
	</view>
</template>

<script>
	import graceDate from '../../../../../graceUI/components/graceDate.vue'
	import common from '../../../../../common/common.js'
	var _self
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				date_menu: '点击选择',
				show_menu: false,
				o: [],
				o_tax: '',
				totalPrice: 0
			}
		},
		onLoad(option) {
			_self = this
			uni.request({
				url: this.$webUrl + "/purchase/order/daySummary",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.o = res.data
					_self.o.map(item => {
						var totalNum = 0
						var totalPrice = 0
						var count = 0;
						item.map(i => {
							totalNum += i.num
							_self.o_tax = i.tax
							totalPrice += i.total_price
							count++
						})
						item.totalNum = totalNum;
						item.totalPrice = totalPrice
						item.count = count
						_self.totalPrice += totalPrice
					})
				}
			})
		},
		methods: {
			closeDate: function() {
				this.show_menu = false;
			},
			showDate: function() {
				this.show_menu = true;
			},
			changeDate: function(e) {
				this.date_menu = e;
				this.show_menu = false;
			},
			handClick() {
				_self.totalPrice = 0
				uni.request({
					url: this.$webUrl + "/purchase/order/daySummary",
					data: {
						date: _self.date_menu
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.o = res.data
						_self.o.map(item => {
							var totalNum = 0
							var totalPrice = 0
							var count = 0;
							item.map(i => {
								totalNum += i.num
								_self.o_tax = i.tax
								totalPrice += i.total_price
								count++
							})
							item.totalNum = totalNum;
							item.totalPrice = totalPrice
							item.count = count
							_self.totalPrice += totalPrice
						})
					}
				})

			}
		},

		components: {
			graceDate
		},
	}
</script>

<style>
	.icon-riliriqi:before {
		content: "\e60b";
	}

	view {
		color: #424242;
		font-size: 30rpx;
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

	.grace-button {
		background-color: #FF5722 !important;
	}

	.ot-home-qx {
		margin: 20upx;
	}

	.ot-text-fl {
		width: 100%;
		display: flex;
		line-height: 35upx;
	}

	.ot-color {
		color: #ff5722;
		font-size: 34upx;
		line-height: 35upx;
	}

	.ot-container {
		margin: 20rpx 20rpx;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 2rpx 2rpx 12rpx #ccc;
		margin-top: 0px;
		border-radius: 10rpx;
		margin-bottom: 35rpx;
		overflow: hidden;
	}

	.ot-sales-border {
		display: flex;
		border-bottom: 2upx solid #e0e0e0;
		box-sizing: border-box;
		padding: 20rpx 0px;
		margin: 0px 20upx;
	}

	.ot-sales-bn {
		box-sizing: border-box;
		padding: 20rpx 0px;
		margin: 0px 20upx;
	}

	.ot-found-left {
		flex: 0;
		margin-right: 16upx;
	}

	.ot-found-right {
		flex: 12;
	}

	.ot-found-betwer {
		display: flex;
		justify-content: space-between;
	}

	.ot-size-f1 {
		color: #999;
		font-size: 24upx !important;
	}

	.ot-found-betwer view:nth-of-type(2) text {
		color: #ffd518;
	}

	.grace-space-between .demo7 {
		background-color: #FFD518;
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 0px 30upx;
		line-height: 45upx;
		height: 45upx;
		font-size: 26upx;
	}
</style>
