<template>
	<view>
		<scroll-view class="grace-tab-title grace-center" id="grace-tab-title" :scroll-x="false" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
			 @tap="tabChange" :key="index">{{tab.name}}</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环新闻项目 -->
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend(0)" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list ht">
						<view class="ot-infor-mn">
							<grace-speaker :vertical="true" iconColor="#E76B61" :interval="5000" iconClass="grace-icons icon-speaker" :msgs="speakerMsgs"></grace-speaker>
							</grace-speaker>
						</view>
						<view class="item">
							<view class="ot-infor-host hj">
								<view class="grace-list" v-for="(item, index) in finance" :key="index">
									<navigator class="items" :url="'../financeDetail/index?id='+item.id">
										<view class="body">
											<view class="title">{{item.title}}</view>
											<view class="desc"> {{item.create_time}}</view>
										</view>
										<view class="arrow-right"></view>
									</navigator>
								</view>
							</view>
						</view>
					</view>
					<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend(1)" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="width: 100%;">
						<view class="ot-infor-fz item">
							<view class="ot-f">
								<!-- grace filter start -->
								<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
								<view class="grace-filter" id="grace-filter-header">
									<view class="ot-infor-fx">产品名称</view>
									<view class="items" @tap.stop='changePriceOrder1'>
										最新价
										<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/asc.png" mode="widthFix" v-if="priceOrder1 == 1"></image>
										<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/desc.png" mode="widthFix" v-if="priceOrder1 == 2"></image>
									</view>
									<view class="items" @tap.stop='changePriceOrder'>
										涨跌幅
										<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/asc.png" mode="widthFix" v-if="priceOrder == 1"></image>
										<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/desc.png" mode="widthFix" v-if="priceOrder == 2"></image>
									</view>
									<!-- 筛选 end -->
								</view>
								<!-- grace filter end -->
								<view style="margin-top:10px;">
									<view class='grace-table'>
										<view class="body" v-for="(item,index) in zz" :key="index">
											<view>{{item.name}}</view>
											<view></view>
											<view>{{item.price}}</view>
											<view>{{item.upAndDown}}</view>
										</view>
									</view>
								</view>
							</view>

						</view>
					</view>
					<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend(2)" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="width: 100%;margin-top: 20upx;" v-for="(item,index) in fer" :key="index">
						<view class="item ot-information-fo">
							<view class="grace-space-between">
								<view class="demo6  ot-infor-fp">
									<image src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=265535345,1890400617&fm=26&gp=0.jpg"></image>
									<text>{{item.name}}</text>
								</view>
								<view class="demo7  grace-no-scale ot-infor-fa">
									<text>￥{{item.spotSellingPrice-item.cashPurchasePrice}}</text>
									<text>￥{{item.spotSellingPrice}}</text>
								</view>
							</view>
							<view class="grace-nowrap ot-infor-ca">
								<view class="demo2 ">现汇买入￥{{item.foreignCurrency}}</view>
								<view class="demo2 ">现钞买入￥{{item.cashPurchasePrice}}</view>
								<view class="demo2 ">卖出￥{{item.cashSellingPrice}}</view>
							</view>
						</view>
					</view>
					<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend(3)" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="width: 100%;margin-top: 20upx;" v-for="(item,index) in speakerMsgs" :key="index">
						<view class="item ot-information-fa">
							<text>{{item.title}}</text>
							<text>
								<p v-html="item.content"></p>
							</text>
							<view>
								<image :src="img+'zhong1.png'"></image> 发布于 {{item.create_time}}
							</view>
						</view>
					</view>
					<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import common from '../../common/common.js'
	import graceNav from "../../graceUI/components/graceNavBar.vue";
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	import graceEmpty from '../../graceUI/components/graceEmpty.vue';
	import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
	var systemInfo = require('../../graceUI/jsTools/systemInfo.js');
	import DateFormat from "../../common/DateFormat.js";

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
				zz: '',
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '财经早读',
						id: 'caijing',
						loadingType: 0,
						page: 1
					},
					{
						name: '期货指数',
						id: 'qihuo',
						loadingType: 0,
						page: 1
					},
					{
						name: '外汇品牌',
						id: 'paijia',
						loadingType: 0,
						page: 1
					},
					{
						name: '外盘速递',
						id: 'sudi',
						loadingType: 0,
						page: 1
					}
				],
				pages: [],
				speakerMsgs: [],
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingText: ['正在加载.....'],
				loadingTypes: 0,
				finance: [],
				fer: [],
				page: 1,
				page1: 1,
				page2: 1,
				page3: 1,
			}
		},
		onLoad: function(option) {
			_self = this
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			let getid = option.getid
			this.tabCurrentIndex = getid
			this.swiperCurrentIndex = getid
			uni.request({
				url: this.$webUrl + "/cjzd",
				success(res) {
					_self.finance = res.data
					if (_self.finance.length > 0 && _self.finance.length < 7) {
						_self.loadingText = ['']
						_self.loadings = ''
					}
				}
			})
			uni.request({
				url: this.$webUrl + "/marketIndexData",
				success(res) {
					_self.zz = res.data
					if (_self.zz.length > 0 && _self.zz.length < 7) {
						_self.loadingText = ['']
						_self.loadings = ''
					}
				}
			})
			var dateFormat = new DateFormat()
			uni.request({
				url: this.$webUrl + "/wpsd",
				success(res) {
					var data = res.data
					data.map(item => {
						item.content = item.content.split('<br>').slice(0, 1).join('')
						item.create_time = dateFormat.setTime(new Date(item.create_time)).toString('yyyy年mm月dd日')
					})
					console.log()
					_self.speakerMsgs = data
					if (_self.speakerMsgs.length > 0 && _self.speakerMsgs.length < 7) {
						_self.loadingText = ['']
						_self.loadings = ''
					}
				}
			})
			uni.request({
				url: this.$webUrl + "/foreignExchangeRateData",
				success(res) {
					_self.fer = res.data
					if (_self.fer.length > 0 && _self.fer.length < 7) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
				}
			})

		},
		// 下拉刷新事件
		onPullDownRefresh: function() {
			// 页码重置 
			this.pages[this.swiperCurrentIndex] = 1;
			this.loadingTypes[this.swiperCurrentIndex] = 0;
		},
		methods: {
			//价格排序
			changePriceOrder: function() {
				if (this.priceOrder == 1) {
					this.priceOrder = 2;
				} else {
					this.priceOrder = 1;
				}
				uni.showModal({
					title: '价格排序已经切换',
					content: '对应的值保存在 priceOrder 变量中 ^_^'
				});
				this.getList();
			},
			//价格排序1
			changePriceOrder1: function() {
				if (this.priceOrder1 == 1) {
					this.priceOrder1 = 2;
				} else {
					this.priceOrder1 = 1;
				}
				uni.showModal({
					title: '价格排序已经切换',
					content: '对应的值保存在 priceOrder 变量中 ^_^'
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
				switch (e) {
					case 0:
						_self.page++
						uni.request({
							url: this.$webUrl + "/cjzd",
							data: {
								page: _self.page
							},
							success(res) {
								_self.finance = _self.finance.concat(res.data)
								_self.loadingType = 0;
								_self.loadingText = ['正在加载.....']
								var data = res.data
								var timer;
								clearTimeout(_self.timer)
								if (data.length == 0) {
									_self.timer = setTimeout(function() {
										_self.loadingText = ['']
										_self.loadings = ''
									}, 500)
								}
							}
						})
						break;
					case 1:
						_self.page++
						uni.request({
							url: this.$webUrl + "/marketIndexData",
							data: {
								page: _self.page
							},
							success(res) {
								_self.zz = _self.zz.concat(res.data)
								_self.loadingType = 0;
								_self.loadingText = ['正在加载.....']
								var data = res.data
								var timer;
								clearTimeout(_self.timer)
								if (data.length == 0) {
									_self.timer = setTimeout(function() {
										_self.loadingText = ['']
										_self.loadings = ''
									}, 500)
								}
							}
						})
						break;
					case 2:
						_self.page++
						uni.request({
							url: this.$webUrl + "/foreignExchangeRateData",
							data: {
								page: _self.page
							},
							success(res) {
								_self.fer = _self.fer.concat(res.data)
								_self.loadingType = 0;
								_self.loadingText = ['正在加载.....']
								var data = res.data
								var timer;
								clearTimeout(_self.timer)
								if (data.length == 0) {
									_self.timer = setTimeout(function() {
										_self.loadingText = ['']
										_self.loadings = ''
									}, 500)
								}
							}
						})
						break;
					case 3:
						_self.page3++
						uni.request({
							url: this.$webUrl + "/wpsd",
							data: {
								page: _self.page3
							},
							success(res) {
								var dateFormat = new DateFormat()
								var data = res.data
								data.map(item => {
									item.content = item.content.split('<br>').slice(0, 1).join('')
									item.create_time = dateFormat.setTime(new Date(item.create_time)).toString('yyyy年mm月dd日')
								})
								_self.speakerMsgs = _self.speakerMsgs.concat(data)
								_self.loadingType = 0;
								_self.loadingText = ['正在加载.....']
								var data = res.data
								var timer;
								clearTimeout(_self.timer)
								if (data.length == 0) {
									_self.timer = setTimeout(function() {
										_self.loadingText = ['已加载全部']
										_self.loadings = ''
									}, 500)
								}
							}
						})
						break;
					default:
						break;
				}
			},
		},
		components: {
			graceLoading,
			graceNav,
			graceEmpty,
			"grace-speaker": graceSpeaker
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}

	/* h5 端需要动态增加 44px [ 避开默认的头部导航 ] */
	.top1 {
		top: 0;
		height: 90upx;
		background-color: #FFFFFF;
	}

	/* #ifdef H5 */
	.top1 {
		top: 44px;
	}

	/* #endif */
	.grace-border-b {
		border-color: #F8F8F8;
	}

	page {
		background-color: #eee;
	}

	.demo-img {
		padding: 8upx 0;
	}

	.demo-img image {
		width: 100%;
		border-radius: 8upx;
	}

	.ot-infor-in.grace-margin {
		margin: 0px;
	}

	.grace-tab-title {
		box-shadow: 1px 1px 3px rgb(216, 216, 216);
		position: fixed;
		z-index: 99;
		height: 90upx !important;
	}

	.grace-tab-title view {
		margin: 0px 36upx;
		padding: 0px;
	}

	.grace-tab-current {
		color: #ff5722;
		border-bottom: 4upx solid #ff5722 !important;
	}

	.grace-tab-swiper {
		box-sizing: border-box;
	}

	.grace-tab-swiper-full .ot-infor-mv {
		margin-top: 43px;
		padding-top: 5px;
	}

	.grace-news-list {
		box-sizing: border-box;
		padding: 0upx 24upx;
	}

	.grace-tab-swiper-full swiper-item:nth-of-type(1) {
		background-color: #fff;
		padding-top: 0px;
	}

	.grace-tab-swiper-full swiper-item:nth-of-type(2) {
		background-color: #fff;
	}

	.grace-news-list .item.ot-information-fa {
		background-color: #fff;
		border-radius: 10upx;
		box-shadow: 1px 1px 3px rgb(216, 216, 216);
	}

	.grace-news-list .item {
		display: flex;
		flex-direction: column;
		padding: 0px 10px;
		margin-bottom: 25upx;
		box-sizing: border-box;
		padding-top: 5px;
		padding-bottom: 5px;
	}

	.ot-information-fa text {
		display: block;
	}


	.ot-information-fa text:nth-of-type(1) {
		font-size: 15px;
	}

	.ot-information-fa text:nth-of-type(2) {
		color: #a7a7a7;
		font-size: 13px;
		margin-top: 3px;
		margin-top: 12upx !important;
	}

	.ot-information-fa view:nth-of-type(1) {
		text-align: right;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		color: #a7a7a7;
		font-size: 13px;
		margin-top: 10px;
	}

	.ot-information-fa view:nth-of-type(1) image {
		margin-right: 5px;
		vertical-align: middle;
		width: 18px;
		height: 18px;
		margin-top: 2px;
	}

	.ot-bg {
		height: 20upx;
		background-color: #eee;
	}

	.ot-infor-host image {
		width: 100%;
	}

	.hj .grace-list .items {
		border-bottom: 1px dashed #ccc;
		margin: 0px !important;
		padding: 12upx 0px;
	}

	.hj .grace-list:first-of-type .items {
		border-top: 1px dashed #ccc;
	}

	.hj .grace-list .items .body {
		padding-top: 15upx;
		padding-bottom: 15upx;
	}

	.hj .grace-list {
		padding: 0px;
	}

	.hj .grace-list .items .body {
		margin-left: 0px;
	}

	.ht.grace-news-list .item {
		margin: 0px;
		padding-top: 0px;
	}

	.grace-tab-swiper-full scroll-view {
		padding-bottom: 40px !important;
		box-sizing: border-box;
	}

	.orderImg {
		width: 40upx;
		height: 40upx;
		margin-top: 1px;
	}

	.grace-filter {
		position: static;
		height: 21px;
		background-color: transparent !important;
		border: none;
	}

	.grace-news-list .ot-infor-fz.item {
		padding: 0px;
	}

	.grace-filter .items {
		display: flex;
		flex-wrap: nowrap;
		width: 20%;
		justify-content: center;
		height: 21px;
		line-height: 21px;
		margin-left: 19px;
		color: #999;
	}

	.ot-infor-fx {
		flex: 8;
		color: #999;
	}

	.grace-table .body {
		padding-bottom: 8px;
		border-bottom: 1px solid #e4e4e4;
		margin-bottom: 10px;
	}

	.grace-table .body>view {
		padding-bottom: 5px;
		box-sizing: border-box;
		border: none;
	}

	.grace-table .body>view:nth-of-type(1) {
		text-align: left;
	}

	.grace-table .body>view:nth-of-type(3) {
		color: #00c282;
	}

	.grace-table .body>view:nth-of-type(4) {
		background-color: #00c282;
		color: #fff;
	}

	.grace-news-list .item.ot-information-fo {
		background-color: #fff;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 6upx rgb(216, 216, 216);
		padding: 20upx 20upx;
	}

	.ot-infor-fp {
		display: flex;
	}

	.ot-infor-fp image {
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}

	.ot-infor-fp text {
		display: inline-block;
		margin-top: 8px;
		margin-left: 15px;
		font-size: 16px;
	}

	.ot-infor-fa {
		display: flex;
		flex-direction: column;
	}

	.ot-infor-fa text {
		display: block;
	}

	.ot-infor-fa text:nth-of-type(1) {
		color: #ff5722;
	}

	.ot-infor-fa text:nth-of-type(2) {
		color: #a4a4a4;
		font-size: 13px;
		text-align: right;
	}

	.ot-infor-ca {
		margin-top: 20px;
	}

	.ot-infor-ca .demo2 {
		width: 33.33%;
		font-size: 26upx;
		color: #a4a4a4;
	}

	.ot-infor-ca .demo2:nth-of-type(2) {
		width: 42.33%;
		font-size: 26upx;
		text-align: center;
	}

	.ot-infor-ca .demo2:nth-of-type(3) {
		width: 25%;
		font-size: 26upx;
	}

	.ot-infor-mn {
		width: 100%;
		padding: 0px 10px;
		box-sizing: border-box;
		margin-bottom: 10upx;
		margin-top: 10upx;
	}
</style>
