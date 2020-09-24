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
					<view class="grace-news-list ot-console-ge" style="padding:25upx 0px; width:100%;">
						<view class="item">
							<view class="grace-grids demoForIcon grace-margin-top">
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>总销售量：16298.23吨</view>
									<view>145,456,789.7吨</view>
								</view>
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>月销售量：16298.23吨</view>
									<view>145,456,789.7吨</view>
								</view>
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>日销售量：16298.23吨</view>
									<view>145,456,789.7吨</view>
								</view>
							</view>
							<view class="ot-home-qx mn">
								<text></text>
								<text>销售趋势</text>
							</view>
							<view class="ot-mall-ech">
								<view id="main" class="ec-canvas" style="width:100%;height:400px;"></view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<view class="ot-bg"></view>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list ot-console-ge" style="padding:25upx 0px; width:100%;">
						<view class="item">
							<view class="grace-grids demoForIcon grace-margin-top">
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>总利润：1500.00元</view>
								</view>
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>月利润：1500.00元</view>
								</view>
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>日利润：0元</view>
								</view>
							</view>
							<view class="ot-home-qx mn">
								<text></text>
								<text>销售趋势</text>
							</view>
							<view class="ot-mall-ech">
								<view id="main1" class="ec-canvas" style="width:100%;height:400px;"></view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<view class="ot-bg"></view>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list fl" style="width:100%;">
						<view class="ot-home-qx mn mf">
							<text></text>
							<text>金额占比</text>
						</view>
						<view class="item">
							<view class="ot-mall-ech ot-mall-pie">
								<canvas canvas-id="canvasRing" id="canvasRing" class="ec-canvas" @touchstart="touchRing"></canvas>
							</view>
						</view>
						<!-- 2pie -->
						<view class="ot-home-qx mn mf">
							<text></text>
							<text>吨数占比</text>
						</view>
						<view class="item">
							<view class="ot-mall-ech">
								<canvas canvas-id="canvasRing1" id="canvasRing1" class="ec-canvas" @touchstart="touchRing1"></canvas>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="ot-margin"></view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<view class="ot-bg"></view>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list ot-console-ge" style="padding:25upx 0px; width:100%;">
						<view class="item">
							<view class="grace-grids demoForIcon grace-margin-top">
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>总销售量：16298.23吨</view>
									<view>145,456,789.7吨</view>
								</view>
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>月销售量：16298.23吨</view>
									<view>145,456,789.7吨</view>
								</view>
								<view class="ot-console-fl">
									<image :src="img+'zhexian1.png'" mode="widthFix"></image>
									<view>日销售量：16298.23吨</view>
									<view>145,456,789.7吨</view>
								</view>
							</view>
							<view class="ot-home-qx mn">
								<text></text>
								<text>销售趋势</text>
							</view>
							<view class="ot-mall-ech">
								<view id="main2" class="ec-canvas" style="width:100%;height:400px;"></view>
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>

	</view>
</template>

<script>
	import graceNav from "../../../../graceUI/components/graceNavBar.vue";
	var systemInfo = require('../../../../graceUI/jsTools/systemInfo.js');
	import graceEmpty from '../../../../graceUI/components/graceEmpty.vue'; 
	import common from '../../../../common/common.js';
	import uCharts from '../../../../common/u-charts/u-charts.js';
	var _self;
	var canvaRing = null;
	var canvaRing1=null
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 667,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '销售统计',
						id: 'xiaoshou',
						loadingType: 0,
						page: 1
					},
					{
						name: '利润统计',
						id: 'lirun',
						loadingType: 0,
						page: 1
					},
					{
						name: '订单统计',
						id: 'dingdan',
						loadingType: 0,
						page: 1
					},
					{
						name: '采购统计',
						id: 'caigou',
						loadingType: 0,
						page: 1
					}
				],
				titleShowId: "tabTag-0",
				newsIndex: 0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		onLoad: function() {
			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
			this.getServerData1();
		},
		// 下拉刷新事件
		onPullDownRefresh: function() {
			// 页码重置 
			this.pages[this.swiperCurrentIndex] = 1;
			this.loadingTypes[this.swiperCurrentIndex] = 0;
			this.getNews();
		},
		mounted() {
		},
		methods: {
			getServerData() {
				let Ring = {
					series: []
				}; //创建数组
				Ring.series = [{
					"name": "含税",
					"data": 70,
					'color': '#F7A35C',
				}, {
					"name": "现金",
					"data": 30,
					'color': '#7CB5EC',
				}]
				_self.showRing("canvasRing", Ring);
			},
			getServerData1() {
				let Ring = {
					series: []
				}; //创建数组
				Ring.series = [{
					"name": "现金",
					"data": 70,
					'color': '#F7A35C',
				}, {
					"name": "含税",
					"data": 30,
					'color': '#7CB5EC',
				}]
				_self.showRing1("canvasRing1", Ring);
			},
			showRing(canvasId, chartData) {
				canvaRing = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: '',
						color: '#7cb5ec',
						fontSize: 13,
						offsetY: 0,
					},
					subtitle: {
						name: '金额占比',
						color: '#666666',
						fontSize: 16,
						offsetY: 0,
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 30,
							labelWidth: 10
						}
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					series: chartData.series,
					animation: true,
					width: this.cWidth,
					height: this.cHeight,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			showRing1(canvasId, chartData) {
				canvaRing1 = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: '',
						color: '#7cb5ec',
						fontSize: 13,
						offsetY: 0,
					},
					subtitle: {
						name: '金额占比',
						color: '#666666',
						fontSize: 16,
						offsetY: 0,
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 30,
							labelWidth: 10
						}
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					series: chartData.series,
					animation: true,
					width: this.cWidth,
					height: this.cHeight,
					disablePieStroke: true,
					dataLabel: true,
				});
			},
			touchRing(e) {
				canvaRing.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			touchRing1(e) {
				canvaRing1.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
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

			},
		},
		components: {
			graceNav,
			graceEmpty
		}
	}
</script>

<style>
	@import '../../../../common/css/console.css';
</style>
