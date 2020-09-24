<template>
	<view class="">
		<scroll-view class="grace-tab-title grace-center" id="grace-tab-title" :scroll-x="false" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
			 @tap="tabChange" :key="index">{{tab.name}}</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环新闻项目 -->
			<swiper-item class="ot-infor-mv">
				<view class="ot-bg"></view>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="padding:25upx 0px; width:100%;">
						<view class="ot-home-qx mn">
							<text></text>
							<text>统计</text>
						</view>
						<view class="grace-box-banner ot-bottom grace-border-radius-small">
							<view class="garce-items">
								<view class="line1">{{sale_total_price}}
									<text>元</text>
								</view>
								<view class="line2">总金额</view>
							</view>
							<view class="garce-items">
								<view class="line1">{{sale_total_num}}
									<text>吨</text>
								</view>
								<view class="line2">总量</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handleClick(item.rid)" v-for="(item,index) in sales" :key="index">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.order_no}}</view>
										<view class="demo7">{{item.state}}</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：{{item.salesman_name}}</view>
								<view class="ot-sales-ln">客户：{{item.customer_name}}</view>
								<view class="ot-sales-ln">型号：{{item.area}},{{item.code}}</view>
								<view class="ot-sales-ln">数量：{{item.related_num}}</view>
								<view class="ot-sales-ln">单价：{{item.price}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">总金额：{{item.total_price}}</view>
										<view class="demo7">{{item.sale_time.substring(0,10)}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>

				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<view class="ot-bg"></view>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style=" width:100%;">
						<view class="ot-home-qx mn">
							<text></text>
							<text>统计</text>
						</view>
						<view class="grace-box-banner ot-bottom grace-border-radius-small">
							<view class="garce-items">
								<view class="line1">{{money_total_price}}
									<text>元</text>
								</view>
								<view class="line2">总金额</view>
							</view>
							<view class="garce-items">
								<view class="line1">{{money_total_num}}
									<text>吨</text>
								</view>
								<view class="line2">总量</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handleChange(item.rid)" v-for='(item,index) in money' :key='index'>
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.order_no}}</view>
										<view class="demo7">{{item.state}}
											<image :src="img+'huikuan1.png'" :data-id="item.id" @tap.stop="handleNext(item.left_num,item.rid,item.id,item.area,item.code)"></image>
										</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：{{item.salesman_name}}</view>
								<view class="ot-sales-ln">客户：{{item.customer_name}}</view>
								<view class="ot-sales-ln">型号：{{item.area}},{{item.code}}</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">单价：{{item.price}}</view>
									</view>
								</view>
								<view class="ot-sales-ln">数量：{{item.related_num}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">发票库存：{{item.left_num == null||item.left_num < 0 ? 0 : item.left_num}}</view>
										<view class="demo7">{{item.sale_time.substring(0,10)}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	import graceNav from "../../../../../graceUI/components/graceNavBar.vue";
	import graceEmpty from '../../../../../graceUI/components/graceEmpty.vue';
	import graceSpeaker from "../../../../../graceUI/components/graceSpeaker.vue";
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				showingIndex: 0,
				priceOrder: 1,
				priceOrder1: 1,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				titleShowId: 'tabTag-0',
				newsIndex: 0,
				tabs: [{
						name: '销售订单',
						id: 'xiaoshou',
						loadingType: 0,
						page: 1
					},
					{
						name: '现金订单',
						id: 'dingdan',
						loadingType: 0,
						page: 1
					}
				],
				money: [],
				money_total_num: '',
				money_total_price: '',
				sales: [],
				sale_total_num: '',
				sale_total_price: '',
				page: 1,
				type: '',
				supplierId: ''
			}
		},
		onLoad: function(option) {
			_self = this
			var id = option.id
			_self.supplierId = id
			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			uni.request({
				url: _self.$webUrl + "/logistics/relatedList",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var numberFormat = function(value) {
						var param = {};
						var k = 10000,
							sizes = ['', '万', '亿', '万亿'],
							i;
						if (value < k) {
							param.value = value
							param.unit = ''
						} else {
							i = Math.floor(Math.log(value) / Math.log(k));

							param.value = ((value / Math.pow(k, i))).toFixed(2);
							param.unit = sizes[i];
						}
						return param;
					}
					_self.sales = res.data.faxOrders
					_self.sales.map(item => {
						item.total_price = item.related_num * item.price
					})
					var data_s = numberFormat(res.data.faxTotalNum)
					var data_o = numberFormat(res.data.faxTotalPrice)
					_self.sale_total_num = data_s.value + data_s.unit
					_self.sale_total_price = data_o.value + data_o.unit
					_self.money = res.data.cashOrders
					_self.money.map(item => {
						item.total_price = item.related_num * item.price
					})
					var data_c = numberFormat(res.data.cashTotalNum)
					var data_v = numberFormat(res.data.cashTotalPrice)
					_self.money_total_num = data_c.value + data_c.unit
					_self.money_total_price = data_v.value + data_v.unit
					console.log(_self.money)
				}
			})
		},
		// 下拉刷新事件
		onPullDownRefresh: function() {
			// 页码重置 
			this.pages[this.swiperCurrentIndex] = 1;
			this.loadingTypes[this.swiperCurrentIndex] = 0;
		},
		created() {
			_self = this
		},
		methods: {
			handleClick(e) {
				uni.navigateTo({
					url: '../../sales/salesDetail/index?id=' + e + "&t=0",
				})
			},
			handleChange(e) {
				uni.navigateTo({
					url: '../../money/moneyDetail/index?id=' + e + "&t=0",
				})
			},
			handleNext(e, f, g, h, i, j) {
				if (e <= 0) {
					uni.showToast({
						title: '发票库存已为空',
					})
					return;
				}
				uni.navigateTo({
					url: '../customerBack/index?supplierOrderId=' + _self.supplierId + "&rid=" + f + "&pid=" + g + "&area=" + h +
						"&code=" + i + "&leftNum=" + e,
				})
			},
			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				_self.page++
				uni.request({
					url: this.$webUrl + "/logistics/relatedList",
					data: {
						page: _self.page,
						id: _self.supplierId
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.sales = _self.sales.concat(res.data.faxOrders)
						_self.sales.map(item => {
							item.total_price = item.related_num * item.price
						})
						_self.money = _self.money.concat(res.data.cashOrders)
						_self.money.map(item => {
							item.total_price = item.related_num * item.price
						})
					}
				})
			},
		},
		components: {
			graceNav,
			graceEmpty,
			"grace-speaker": graceSpeaker
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";
	page {
		background-color: #fff;
	}

	.ot-bg {
		height: 20upx;
		background-color: #eee;
	}

	.ot-sales-la {
		width: 100%;
		height: 100%;
		padding: 20upx 35upx;
		padding-top: 38upx;
		box-sizing: border-box;
	}

	.ot-sales-lx {
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 10upx;
		border-radius: 10upx;
		border: 1px solid #ff5722;
		position: relative;
		margin-bottom: 38upx;
	}

	.ot-sales-lx .ot-image {
		position: absolute;
		top: -9px;
		left: -8px;
	}

	.ot-sales-lc {
		width: 100%;
		box-sizing: border-box;
		padding: 10upx 20upx;
		border-bottom: 1px solid #ff5722;
	}

	.ot-sales-lc .demo6 {
		font-size: 26upx;
	}

	.ot-sales-lc .demo6 text {
		color: #4596db;
	}

	.ot-sales-lc .demo7 {
		color: #ff5722;
		font-size: 24upx;
		display: flex;
	}

	.ot-sales-lc .demo7 image {
		margin-left: 20upx;
	}

	.grace-box-banner {
		padding: 12upx 0;
		padding-bottom: 0upx;
	}

	.grace-box-banner .line1 {
		color: #ff5722;
	}

	.grace-border-radius-small {
		border-radius: 0upx;
	}

	.grace-box-banner .garce-items {
		padding-bottom: 30upx;
		width: 50%;
	}

	.grace-box-banner:nth-of-type(odd) {
		padding-top: 0px;
	}

	.grace-filter .items {
		width: 29.5%;
	}

	.orderImg {
		margin-top: 15px;
	}

	.ot-color {
		color: #ff5722;
	}

	.grace-filter {
		border-bottom: 0px solid #f2f3f4;
	}

	.grace-filter .items image {
		display: block;
		margin-top: 22upx;
		width: 50upx;
		height: 50upx;
	}

	.grace-filter .icons {
		width: 7%;
	}

	.grace-tab-current {
		border-bottom: 4upx solid #ff5722 !important;
		color: #ff5722;
		font-weight: 700;
	}

	.grace-tab-title view {
		padding: 0px 20upx;
	}

	.grace-tab-title {
		position: fixed;
		z-index: 9999;
	}

	.grace-tab-swiper-full scroll-view {
		padding-bottom: 40px !important;
		box-sizing: border-box;
	}

	.grace-tab-swiper-full .ot-infor-mv {
		margin-top: 43px;
		padding-top: 5px;
	}
</style>
