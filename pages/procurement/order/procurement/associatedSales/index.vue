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
			<!-- 筛选 start -->
			<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
			 @touchmove.stop="" v-if="showingIndex == 99">
				<form @submit='formsubmit' @reset='formReset'>
					<scroll-view scroll-y="true" :style="{'height':filterHeight}">
						<view style="width:96%; padding:15upx 2%;">
							<view class="grace-bold">销售日期</view>
							<view style='padding:20upx 20upx;' class="grace-select-tags">
								<view class="grace-items">
									<view class="other">
										<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2018-01-01" end="2022-01-01">
											<text>{{dateValue == null ? '请选择' : dateValue}}</text>
										</picker>
									</view>
									<view>至</view>
									<view class="other">
										<picker @change="bindEndChange" :value="endValue" mode="date" name="hd" start="2018-01-01">
											<text>{{endValue == null ? '请选择' : endValue}}</text>
										</picker>
									</view>
								</view>
							</view>
							<view class="grace-bold">地区排序</view>
							<view style='padding:20upx 20upx;' class="grace-select-tags">

								<view class="section section">
									<view class="body-view">
										<switch checked :data-id="index" checked style="zoom:.9" color="#FF5722" @change="switch1Change($event)" />
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
								<view class="line1">燕山
								</view>
								<view class="line2">产地</view>
							</view>
							<view class="garce-items">
								<view class="line1">1C7A
								</view>
								<view class="line2">型号</view>
							</view>
							<view class="garce-items">
								<view class="line1">78.92
									<text>吨</text>
								</view>
								<view class="line2">型号</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handleDetail">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:XJX_20190900020</view>
										<view class="demo7">已下单</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：老张</view>
								<view class="ot-sales-ln">单价：8200</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：5</view>
										<view class="demo7" @tap.stop="handleAssoci">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：5</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：自提</view>
										<view class="demo7">2019-08-16</view>
									</view>
								</view>
							</view>
							<view class="ot-sales-lx" @tap="handleDetail">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:XJX_20190900020</view>
										<view class="demo7">已下单</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：老张</view>
								<view class="ot-sales-ln">单价：8200</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：5</view>
										<view class="demo7" @tap.stop="handleAssoci">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：5</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：自提</view>
										<view class="demo7">2019-08-16</view>
									</view>
								</view>
							</view>
							<view class="ot-sales-lx" @tap="handleDetail">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:XJX_20190900020</view>
										<view class="demo7">已下单</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：老张</view>
								<view class="ot-sales-ln">单价：8200</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：5</view>
										<view class="demo7" @tap.stop="handleAssoci">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：5</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：自提</view>
										<view class="demo7">2019-08-16</view>
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
								<view class="line1">燕山
								</view>
								<view class="line2">产地</view>
							</view>
							<view class="garce-items">
								<view class="line1">1C7A
								</view>
								<view class="line2">型号</view>
							</view>
							<view class="garce-items">
								<view class="line1">78.92
									<text>吨</text>
								</view>
								<view class="line2">型号</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handlePay">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:XJX_20190900020</view>
										<view class="demo7">已下单</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：老张</view>
								<view class="ot-sales-ln">单价：8200</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：5</view>
										<view class="demo7" @tap.stop="handleAssoci">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：5</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：自提</view>
										<view class="demo7">2019-08-16</view>
									</view>
								</view>
							</view>
							<view class="ot-sales-lx" @tap="handlePay">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:XJX_20190900020</view>
										<view class="demo7">已下单</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：老张</view>
								<view class="ot-sales-ln">单价：8200</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：5</view>
										<view class="demo7" @tap.stop="handleAssoci">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：5</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：自提</view>
										<view class="demo7">2019-08-16</view>
									</view>
								</view>
							</view>
							<view class="ot-sales-lx" @tap="handlePay">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:XJX_20190900020</view>
										<view class="demo7">已下单</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：老张</view>
								<view class="ot-sales-ln">单价：8200</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">数量：5</view>
										<view class="demo7" @tap="handleAssoci">关联</view>
									</view>
								</view>
								<view class="ot-sales-ln">未关联：5</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">物流方式：自提</view>
										<view class="demo7">2019-08-16</view>
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
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 667,
				showingIndex: 0,
				color: '#999',
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
			}
		},
		onReady: function() {
			_self = this;
			uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					//获取头部标题高度
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
			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			_self = this
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
			handleDetail() {
				uni.navigateTo({
					url: '../../sales/order/salesList/index',
				})
			},
			handlePay() {
				uni.navigateTo({
					url: '../../money/order/moneyList/index',
				})
			},
			handleAssoci(e) {
				var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认关联5吨吗',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认!",
								icon: "none"
							});
							// 用户点击了确定 可以调用删除方法了

							// list.splice(current, 1)

							// this.setData({
							//   list: list
							// })

						} else if (sm.cancel) {}
					}
				})
			},
			showOptions99: function() {
				console.log('ee')
				// debugger
				var color = this.color
				if (color == "red") {
					this.showingIndex = 99
					return false
				} else {
					this.color = "red"
					this.showingIndex = 99
				}
			},

			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e)
				var switch1 = e.detail.value
				if (switch1 == true) {
					uni.showToast({
						title: '已启用',
						icon: ''
					});
				}
				if (switch1 == false) {
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
				// 判断加载状态避免多次滚动时有加载尚未完成
				if (this.loadingTypes[this.swiperCurrentIndex] == 1 || this.loadingTypes[this.swiperCurrentIndex] == 2) {
					return;
				}
			},
			//提交条件
			formsubmit: function(e) {
				console.log(e)
				uni.showModal({
					title: '请观察控制台',
					content: '条件以表单形式提交 ^_^'
				});
				_self.showingIndex = 0
			},
			//重置表单
			formReset: function() {
				_self.showingIndex = 99
				_self.dateValue = '请选择'
				_self.endValue = '请选择'
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

	.ot-sales-ln {
		color: #646464;
		padding: 10upx 20upx;
	}

	.ot-sales-lm {
		padding: 10upx 20upx;
		box-sizing: border-box;
	}

	.ot-sales-lm .demo6 {
		color: #646464;
	}

	.ot-sales-lm .demo7 {
		background-color: #ff5722;
		color: #fff;
		box-sizing: border-box;
		padding: 0upx 20upx;
		border-radius: 40upx;
		font-size: 24upx;
		line-height: 38upx;
		height: 38upx;
		margin-top: 4upx;
	}

	.ot-sales-dast .demo6 {
		color: #f63f32;
	}

	.ot-sales-dast .demo7 {
		color: #b2b2b2;
	}

	.ot-sales-dast {
		padding: 10upx 20upx;
		box-sizing: border-box;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 20upx;
		box-sizing: border-box;
		padding: 0px 30upx;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 10upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx text:nth-of-type(3) {
		margin-left: 30upx;
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

	.grace-items .other {
		width: 30%;
		border: 1px solid #ccc;
		border-radius: 10upx;
	}

	.grace-items .other text {
		display: block;
		text-align: center;
		color: #999;
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
</style>
