<template>
	<view class="">
		<scroll-view class="grace-tab-title grace-center" id="grace-tab-title" :scroll-x="false" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
			 @tap="tabChange" :key="index">{{tab.name}}</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环 -->
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="padding: 0px 0upx; width:100%;">
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in procur" :key="index">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.bianhao}}</view>
										<view class="demo7">{{item.state}}</view>
									</view>
								</view>
								<view class="ot-sales-ln">供应商：{{item.gongying}}</view>
								<view class="ot-sales-ln">配货数量：{{item.peihuo}}</view>
								<view class="ot-sales-ln">库存：{{item.kucun}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">总单价：{{item.unit}}</view>
										<view class="demo7">{{item.time}}</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style=" width:100%;">
						<view class="ot-bg"></view>
						<view class="ot-sales-la">
							<view class="ot-sales-lx" @tap="handleChange" v-for="(item,index) in money" :key="index">
								<image class="ot-image" :src="img+'qian.png'"></image>
								<view class="ot-sales-lc">
									<view class="grace-space-between">
										<view class="demo6">订单编号:{{item.bianhao}}</view>
										<view class="demo7">{{item.state}}
										</view>
									</view>
								</view>
								<view class="ot-sales-ln">客服：{{item.customer}}</view>
								<view class="ot-sales-ln">关联数量：{{item.gunlian}}</view>
								<view class="ot-sales-ln">发票库存：{{item.kucun}}</view>
								<view class="ot-sales-dast">
									<view class="grace-space-between">
										<view class="demo6">单价：{{item.unit}}</view>
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
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 667,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '采购订单',
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
				procur: [{
					'id': 0,
					'bianhao': 'CG-1565925044971',
					'state': '已下单',
					'gongying': '中化石化销售有限公司',
					'peihuo': '10',
					'kucun': '118',
					'unit': '6800.00',
					'time': '2019-09-12'
				}, {
					'id': 1,
					'bianhao': 'CG-1565925044971',
					'state': '已下单',
					'gongying': '中化石化销售有限公司',
					'peihuo': '10',
					'kucun': '118',
					'unit': '6800.00',
					'time': '2019-09-12'
				}, {
					'id': 2,
					'bianhao': 'CG-1565925044971',
					'state': '已下单',
					'gongying': '中化石化销售有限公司',
					'peihuo': '10',
					'kucun': '118',
					'unit': '6800.00',
					'time': '2019-09-12'
				}],
				money: [{
					'id': 0,
					'bianhao': 'CG-1565925044971',
					'state': '已审核',
					'customer': '老张',
					'guanlian': '5',
					'kucun': '110',
					'unit': '2000',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'bianhao': 'CG-1565925044971',
					'state': '已审核',
					'customer': '老张',
					'guanlian': '5',
					'kucun': '110',
					'unit': '2000',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'bianhao': 'CG-1565925044971',
					'state': '已审核',
					'customer': '老张',
					'guanlian': '5',
					'kucun': '110',
					'unit': '2000',
					'time': '2019-08-16'
				}],
				titleShowId: "tabTag-0",
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
					url: '../../procurement/orderBasic/index.vue',
				})
			},
			handleChange() {
				uni.navigateTo({
					url: '../../money/moneyList/index.vue',
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
@import "../../../../../common/css/orderList.css";

.ot-bg {
  height: 20upx;
  background-color: #eee;
}

.grace-tab-current {
  border-bottom: 4upx solid #ff5722 !important;
  color: #ff5722;
  font-weight: 700;
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
