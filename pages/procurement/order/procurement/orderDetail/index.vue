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
								<view class="line1">641533.38
									<text>元</text>
								</view>
								<view class="line2">总金额</view>
							</view>
							<view class="garce-items">
								<view class="line1">410
									<text>吨</text>
								</view>
								<view class="line2">总量</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in sales" :key="index">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.number}}</view>
										<view class="demo7">{{item.state}}</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：{{item.customer}}</view>
								<view class="ot-sales-ln">型号：{{item.pro}}</view>
								<view class="ot-sales-ln">数量：{{item.num}}</view>
								<view class="ot-sales-ln">单价：{{item.unit}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">总金额：{{item.price}}</view>
										<view class="demo7">{{item.time}}</view>
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
								<view class="line1">641533.38
									<text>元</text>
								</view>
								<view class="line2">总金额</view>
							</view>
							<view class="garce-items">
								<view class="line1">410
									<text>吨</text>
								</view>
								<view class="line2">总量</view>
							</view>
						</view>
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handleChange" v-for='(item,index) in money' :key='index'>
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.number}}</view>
										<view class="demo7">{{item.state}}
											<image :src="img+'huikuan1.png'" :data-id="item.id" @tap="handleNext"></image>
										</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：{{item.customer}}</view>
								<view class="ot-sales-ln">客户：{{item.customers}}</view>
								<view class="ot-sales-lm">
									<view class="grace-space-between">
										<view class="demo6">单价：{{item.unit}}</view>
									</view>
								</view>
								<view class="ot-sales-ln">配货数量：{{item.peihuo}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">发票库存：{{item.kucun}}</view>
										<view class="demo7">{{item.time}}</view>
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
				//被展示的菜单
				showingIndex: 0,
				//价格排序
				priceOrder: 1,
				priceOrder1: 1,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				titleShowId: 'tabTag-0',
				newsIndex: 0,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
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
				money: [{
					'id': 0,
					'state': '已审核',
					'number': 'CG-1565925044971',
					'customer': '张辑赋',
					'customers': '业之峰',
					'unit': '8500',
					'peihuo': '2.00',
					'kucun': '10.00',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'state': '已审核',
					'number': 'CG-1565925044971',
					'customer': '张辑赋',
					'customers': '业之峰',
					'unit': '8500',
					'peihuo': '2.00',
					'kucun': '10.00',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'state': '已审核',
					'number': 'CG-1565925044971',
					'customer': '张辑赋',
					'customers': '业之峰',
					'unit': '8500',
					'peihuo': '2.00',
					'kucun': '10.00',
					'time': '2019-08-16'
				}],
				sales: [{
					'id': 0,
					'state': '已完成',
					'number': 'CG-1565925044971',
					'customer': '老张',
					'pro': '7042',
					'num': '100',
					'unit': '8500',
					'price': '60000',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'state': '已完成',
					'number': 'CG-1565925044971',
					'customer': '老张',
					'pro': '7042',
					'num': '100',
					'unit': '8500',
					'price': '60000',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'state': '已完成',
					'number': 'CG-1565925044971',
					'customer': '老张',
					'pro': '7042',
					'num': '100',
					'unit': '8500',
					'price': '60000',
					'time': '2019-08-16'
				}],
			}
		},
		onLoad: function(option) {
			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
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
			handleClick() {
				uni.navigateTo({
					url: '../../sales/salesDetail/index',
				})
			},
			handleChange() {
				uni.navigateTo({
					url: '../../money/moneyDetail/index',
				})
			},
			handleNext(e) {
				var index = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../customerBack/index?getid=' + index,
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
				console.log('loadmore.....');
				// 判断加载状态避免多次滚动时有加载尚未完成
				if (this.loadingTypes[this.swiperCurrentIndex] == 1 || this.loadingTypes[this.swiperCurrentIndex] == 2) {
					return;
				}
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
