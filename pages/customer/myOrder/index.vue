<template>
	<view class="">
		<form @submit="formsubmit">
			<view class="ot-cus-container">
				<view class="grace-search" id="grace-filter-header">
					<view class="grace-search-in">
						<view class="icons iconfont icon-riliriqi"></view>
						<view class="input">
							<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" />
						</view>
						<view class="icons iconfont icon-shanchu" @tap="handleClear" v-if="date1=='点击选择'||date1==''?false:true"></view>
					</view>
					<view>
						<button form-type='submit' type="primary" class="grace-button" size="mini">
							<image :src="img+'offersearch.png'"></image>
						</button>
					</view>
				</view>
			</view>
		</form>
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
			<view class="ot-container">
				<view class="ot-home-qx mn">
					<text></text>
					<text>统计</text>
				</view>
				<view class="grace-box-banner ot-bottom grace-border-radius-small">
					<view class="garce-items">
						<view class="line1">{{total_price}}
							<text>元</text>
						</view>
						<view class="line2">总金额</view>
					</view>
					<view class="garce-items">
						<view class="line1">{{total_num}}
							<text>吨</text>
						</view>
						<view class="line2">总量</view>
					</view>
				</view>
				<view class="ot-bg"></view>
				<view class="ot-sales-la">
					<view class="ot-sales-lx" @tap="handleClick(item.id,item.type)" v-for="(item,index) in order" :key="index">
						<image class="ot-image" :src="img+'qian.png'"></image>
						<view class="ot-sales-lc">
							<view class="grace-space-between">
								<view class="demo6">订单编号:{{item.order_no}}</view>
								<view class="demo7">{{item.state}}</view>
							</view>
						</view>
						<view class="ot-sales-ln">产地：{{item.area}}</view>
						<view class="ot-sales-ln">型号：{{item.code}}</view>
						<view class="ot-sales-ln">数量：{{item.num}}</view>
						<view class="ot-sales-lm">
							<view class="grace-space-between">
								<view class="demo6">含税：{{item.type}}</view>
							</view>
						</view>
						<view class="ot-sales-dast">
							<view class="grace-space-between">
								<view class="demo6">金额：{{item.price}}</view>
								<view class="demo7">{{item.sale_time.substring(0,10)}}</view>
							</view>
						</view>
					</view>
					<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
				</view>
			</view>
		</scroll-view>
		<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1" v-on:closeDate="closeDate1"></graceDate>
	</view>
</template>

<script>
	import graceDate from '../../../graceUI/components/graceDate.vue'
	import graceLoading from "../../../graceUI/components/graceLoading.vue";
	import common from '../../../common/common.js'
	var systemInfo = require('../../../graceUI/jsTools/systemInfo.js');
	var _self, page = 1;
	export default {
		components: {
			graceDate,
			graceLoading
		},
		data() {
			return {
				img: common.imageUrlPath,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingText: ['正在加载.....'],
				loadingTypes: 0,
				date1: '点击选择',
				show1: false,
				order: [],
				phoneno: 0,
				total_price: '',
				total_num: '',
				tabHeight: 300,
				saleTime: '',
				page: 1
			}
		},
		onUnload: function() {
			uni.reLaunch({
				url: '../myHome/index'
			})
		},
		onLoad() {
			_self = this
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			_self = this
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {
					_self.phoneno = res.data
				}
			})
			if (!_self.phoneno) return;
			uni.request({
				url: this.$webUrl + '/customer/findOrder',
				data: {
					phoneno: _self.phoneno,
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},

				success: (res) => {
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
					_self.order = res.data.o
					var data_s = numberFormat(res.data.total.total_price)
					var data_o = numberFormat(res.data.total.total_num)
					_self.total_price = data_s.value + data_s.unit
					_self.total_num = data_o.value + data_o.unit
					if (_self.order.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (_self.order.length > 0 && _self.order.length < 15) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['已加载全部']
							_self.loadings = ''
						}, 500)
					}
				},
				fail: (error) => {
					//console.log(error)
				}
			})
		},
		mounted() {
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			handleClear() {
				this.date1 = '点击选择'
			},
			handleClick(e, o) {
				var daId = e
				var type = o
				uni.navigateTo({
					url: '../orderDtaile/index?daId=' + daId + "&type=" + type,
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
			formsubmit(e) {
				var formData = e.detail.value
				_self.saleTime = formData.startDate
				if (_self.saleTime == "点击选择") {
					_self.saleTime = ""
				}
				uni.request({
					url: this.$webUrl + '/customer/findOrder',
					data: {
						phoneno: _self.phoneno,
						saleTime: _self.saleTime
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success: (res) => {
						_self.order = res.data.o
						if (_self.order.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.order.length > 0 && _self.order.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
				_self.page = 1
			},
			scrollend() {
				_self.page++
				this.loadingType = 1;
				uni.request({
					url: this.$webUrl + '/customer/findOrder',
					data: {
						phoneno: _self.phoneno,
						page: _self.page,
						saleTime: _self.saleTime
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},

					success: (res) => {
						var data = res.data.o
						_self.order = _self.order.concat(res.data.o)
						_self.loadingType = 0;
						_self.loadingText = ['正在加载.....']
						var timer;
						clearTimeout(_self.timer)
						if (data.length == 0) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					},
					fail: (error) => {
						//console.log(error)
					}
				})
			},
		},
	}
</script>

<style>
	@import "../../../common/css/orderList.css";

	.icon-riliriqi:before {
		content: "\e60b";
	}

	.icon-shanchu:before {
		content: "\e600";
		color: #D0D0D0 !important;
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

	.ot-container {
		background-color: #fff;
		box-sizing: border-box;
	}
</style>
