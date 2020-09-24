<template>
	<view class="">
		<view id="grace-filter-header">
			<scroll-view class="grace-tab-title grace-center" id="grace-tab-title" :scroll-x="false" :scroll-into-view="titleShowId">
				<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
				 @tap="tabChange" :key="index">{{tab.name}}</view>
				<view class="ot-associ-found">
					<view class="items" :style="{color:color}" @tap.stop='showOptions99'>筛选<text class="grace-icons icon-filter"></text></view>
				</view>
			</scroll-view>
		</view>
		<!-- 筛选 start -->
		<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
		 @touchmove.stop="" v-if="showingIndex == 99">
			<form @submit='formsubmit' @reset='formReset'>
				<scroll-view scroll-y="true" :style="{'height':filterHeight}">
					<view style="width:96%; padding:15upx 2%;">
						<view class="ot-sales-lr">
							<view class="grace-bold">销售日期</view>
							<view class="grace-items">
								<picker @change="bindDateChange" :value="dateValue" mode="date" name="beginTime" start="2018-01-01" end="2022-01-01">
									<text>{{dateValue == null ? '请选择' : dateValue}}</text>
								</picker>
								<text class="text">至</text>
								<picker @change="bindEndChange" :value="endValue" mode="date" name="endTime" start="2018-01-01">
									<text>{{endValue == null ? '请选择' : endValue}}</text>
								</picker>
							</view>
						</view>
						<view class="ot-sales-lr">
							<view class="grace-bold">地区排序</view>
							<view class="grace-search">
								<view class="section section">
									<view class="body-view">
										<switch :data-id="index" style="zoom:.7" color="#FF5722" @change="switch1Change($event)" />
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<!-- 按钮  -->
				<view class='grace-filter-buttons'>
					<view>
						重置
						<button form-type='reset'>重置</button>
					</view>
					<view>
						确定
						<button form-type='submit'>确定</button>
					</view>
				</view>
			</form>
		</view>
		<!-- 筛选 end -->
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环新闻项目 -->
			<swiper-item class="ot-infor-mv">
				<view class="ot-bg"></view>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="padding: 0px 0upx; width:100%;">
						<view class="ot-home-qx mn">
							<text></text>
							<text>统计</text>
						</view>
						<view class="grace-box-banner ot-bottom grace-border-radius-small">
							<view class="garce-items">
								<view class="line1">{{s.area}}</view>
								<view class="line2">产地</view>
							</view>
							<view class="garce-items">
								<view class="line1">{{s.code}}</view>
								<view class="line2">型号</view>
							</view>
							<view class="garce-items">
								<view class="line1">{{s.remainder_num}}
									<text>吨</text>
								</view>
								<view class="line2">数量</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" v-for="(item,index) in sales" :key="index" @tap="handleSales(item.id)">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.order_no}}</view>
										<view class="demo7">{{item.state}}</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：{{item.salesman_name}}</view>
								<view class="ot-sales-ln">客户：{{item.customer_name}}</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：{{item.num}}</view>
										<view class="demo7" @tap.stop="handleAssoci(item.id)">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：{{item.remainder_num}}</view>
								<view class="ot-sales-ln">收货地址：{{item.transport_address}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：{{item.transport_type}}</view>
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
								<view class="line1">{{s.area}}</view>
								<view class="line2">产地</view>
							</view>
							<view class="garce-items">
								<view class="line1">{{s.code}}</view>
								<view class="line2">型号</view>
							</view>
							<view class="garce-items">
								<view class="line1">{{s.remainder_num}}
									<text>吨</text>
								</view>
								<view class="line2">型号</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" v-for="(item,index) in money" :key="index" @tap="handleMoney(item.id)">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.order_no}}</view>
										<view class="demo7">{{item.state}}</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：{{item.salesman_name}}</view>
								<view class="ot-sales-ln">客户：{{item.customer_name}}</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：{{item.num}}</view>
										<view class="demo7" @tap.stop="handleAssoci1(item.id)">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：{{item.remainder_num}}</view>
								<view class="ot-sales-ln">收货地址：{{item.transport_address}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：{{item.transport_type}}</view>
										<view class="demo7">{{item.sale_time.substring(0,10)}}</view>
									</view>
								</view>
							</view>
						</view>

					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<form @submit="formOut" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
				<view slot="content" class="content">
					<view class="ot-pay-qp">关联数量</view>
					<view class="grace-items">
						<view class="grace-label">关联数量</view>
						<input type="text" class="input" name="num" placeholder="请输入数量" />
					</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view>
							<button type="primary" @tap="closeDialog3">取消</button>
						</view>
						<view>
							<button type="primary" style="color:#3688FF;" @tap="confirm3" formType="submit">立即提交</button>
						</view>
					</view>
				</view>
			</graceDialog>
		</form>
		
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	import graceNav from "../../../../../graceUI/components/graceNavBar.vue";
	import graceEmpty from '../../../../../graceUI/components/graceEmpty.vue';
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	import graceDialog from '../../../../../graceUI/components/graceDialog.vue';
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				index: '',
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 667,
				showingIndex: 0,
				color: '#999',
				show3: false,
				menu: false,
				dateValue: null,
				endValue: null,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '销售订单',
						id: 'xiaoshou',
						loadingType: 0,
						page: 1
					},
					{
						name: '预付款订单',
						id: 'yufukuan',
						loadingType: 0,
						page: 1
					}
				],
				titleShowId: "tabTag-0",
				filterHeight: '100px',
				s: [],
				sales: [],
				sale_total_num: '',
				sale_total_price: '',
				money: [],
				money_total_num: '',
				money_total_price: '',
				page: 1,
				type: '销售',
				sale_order_id: '',
				orderType: '',
				related: false,
			}
		},
		onReady: function() {
			_self = this;
			uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					uni.createSelectorQuery().select('#grace-tab-title').fields({
						size: true,
					}, function(res) {
						if (!res) {
							return;
						}
						var sHeight = (windowHeight - res.height - 5);
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		onLoad: function(option) {
			var id = option.id
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			_self = this
			uni.request({
				url: _self.$webUrl + "/logistics/relatedSaleList",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.sales = res.data.list
					_self.sale_total_num = res.data.totalNum
					_self.sale_total_price = res.data.totalPrice
					_self.s = res.data.s
				}
			})
			uni.request({
				url: _self.$webUrl + "/logistics/relatedPresaleList",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.money = res.data.list
					_self.money_total_num = res.data.totalNum
					_self.money_total_price = res.data.totalPrice
				}
			})
		},
		onPullDownRefresh: function() {
			this.pages[this.swiperCurrentIndex] = 1;
			this.loadingTypes[this.swiperCurrentIndex] = 0;
			
		},
		created() {
			_self = this
		},
		methods: {
			handleSales(e) {
				uni.navigateTo({
					url: '../sales/salesDetail/index?id=' +e,
				})
			},
			handleMoney(e) {
				uni.navigateTo({
					url: '../money/moneyDetail/index?id=' +e,
				})
			},
			handleAssoci1(e) {
				this.show3 = true;
				_self.sale_order_id = e
			},
			showOptions99: function() {
				 _self.color='red'
				var color = _self.color
				if (color == "red") {
					_self.showingIndex = 99
				} else {
					_self.showingIndex = 0
				}
			},

			switch1Change: function(e) {
				var switch1 = e.detail.value
				if (switch1 == true) {
					_self.orderType = "address"
					uni.showToast({
						title: '已启用',
						icon: ''
					});
				}
				if (switch1 == false) {
					_self.orderType = "time"
					uni.showToast({
						title: '已禁用',
						icon: ''
					});
				}
			},

			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value
			},
			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				if (index == 0) {
					_self.type = "销售"
				} else if (index == 1) {
					_self.type = "现金"
				}
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
				_self.showingIndex = 0
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				console.log('loadmore.....');
			},
			//提交条件
			formsubmit: function(e) {
				var formData = e.detail.value
				formData.id = _self.s.id
				if (formData.beginTime == 0) {
					formData.beginTime = ""
				}
				if (formData.endTime == 0) {
					formData.endTime = ""
				}
				formData.orderType = _self.orderType
				uni.request({
					url: this.$webUrl + "/logistics/relatedSaleList",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.sales = res.data.list
						_self.sale_total_num = res.data.totalNum
						_self.sale_total_price = res.data.totalPrice
					}
				})
				uni.request({
					url: _self.$webUrl + "/logistics/relatedPresaleList",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.money = res.data.list
						_self.money_total_num = res.data.totalNum
						_self.money_total_price = res.data.totalPrice
					}
				})
				_self.showingIndex = 0
			},
			formOut(e) {
				var formData = e.detail.value
				formData.supplierId = _self.s.id
				formData.saleId = _self.sale_order_id
				formData.type = _self.type
				if (!_self.related) {
					uni.showLoading()
					_self.related = true
					uni.request({
						url: _self.$webUrl + '/logistics/doRelated',
						data: formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							if (res.data) {
								uni.showToast({
									title: '关联成功'
								})
							} else {
								uni.showToast({
									title: '关联失败',
									icon: 'none'
								})
							}
						},
						complete() {
							_self.show3 = false;
							_self.related = false
							uni.request({
								url: _self.$webUrl + "/logistics/relatedSaleList",
								data: {
									id: _self.s.id
								},
								header: {
									'Access-Token': uni.getStorageSync("token")
								}, 
								success(res) {
									_self.sales = res.data.list
									_self.sale_total_num = res.data.totalNum
									_self.sale_total_price = res.data.totalPrice
									_self.s = res.data.s
								}
							})
							uni.request({
								url: _self.$webUrl + "/logistics/relatedPresaleList",
								data: {
									id: _self.s.id
								},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res) {
									_self.money = res.data.list
									_self.money_total_num = res.data.totalNum
									_self.money_total_price = res.data.totalPrice
								}
							})
						}
					})
				}
			},
			//重置表单
			formReset: function() {
				_self.showingIndex = 99
				_self.dateValue = '请选择'
				_self.endValue = '请选择'
			},
			handleAssoci(e) {
				this.show3 = true;
				_self.sale_order_id = e

			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3: function() {
				_self.show3 = false;
			},
		},
		components: {
			graceNav,
			graceEmpty,
			graceDialog: graceDialog
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
		padding: 10px 17px;
		padding-top: 19px;
		-webkit-box-sizing: border-box;
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
		padding-bottom: 0upx
	}

	.grace-box-banner .line1 {
		color: #FF5722;

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
		border-bottom: 4upx solid #FF5722 !important;
		color: #FF5722;
		font-weight: 700;

	}

	.grace-tab-title {
		position: relative;
		z-index: 999 !important;
	}

	.ot-associ-found {
		position: absolute;
	}

	.grace-items {
		display: flex;
	}


	.grace-items  .text {
		display: block;
		text-align: center;
		color: #999;
		margin: 0px 20upx;
	}

	.grace-items view:nth-of-type(2) {
		margin: 0px 20upx;
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

	.ot-pay-qp {
		text-align: center;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 40upx;
	}

	.ot-sales-lr {
		display: flex;
		box-sizing: border-box;
		padding: 18upx 25upx;
		border-bottom: 1px solid #eee;
	}

	.ot-sales-lr .grace-items .input {
		text-align: right;
		color: #666;
		font-size: 28upx;
		margin-right: 0px;
	}

	.ot-sales-lr .grace-items {
		width: 80%;
		display: flex;
		justify-content: flex-end;
	}

	.ot-sales-lr .grace-search {
		display: flex;
		justify-content: flex-end;
	}

	.ot-sales-lr .grace-search-in>.input {
		text-align: right;
		color: #666;
		margin-right: 0px;
	}
</style>
