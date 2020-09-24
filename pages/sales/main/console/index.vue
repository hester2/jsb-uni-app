<template>
	<view class="">
		<view class="status_bar"></view>
		<view class="gd-console-fo" id="grace-tab-title">
			<view class=" gd-console-fs icons grace-icons icon-arrow-left grace-white" @tap="goback"></view>
			<view class="gd-console-fe">控制台</view>
			<view class="gd-console-fr">
				<image id="demo-1" class="imgs" :src="img+'sandian0.png'" @tap="handleChange"></image>
			</view>
		</view>
		<view class="demo1">
			<gracePopupMenu :show="menu1Show" :top="menu1Top" v-on:hideMenu="hideMenu">
				<view>
					<view class="menus" @tap.stop="handleFile(0)">导出不/含税报价</view>
					<view class="menus" @tap.stop="handleFile(1)">导出含税价</view>
					<view class="menus grace-noborder" @tap.stop="handleFile(2)">导出不含税价</view>
				</view>
			</gracePopupMenu>
		</view>
		<scroll-view class="grace-tab-title grace-center" :scroll-x="false" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
			 @tap="tabChange" :key="index">{{tab.name}}</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环新闻项目 -->
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list">
						<view class="ot-console-fl" v-for="(item,index) in offerList" :key="index">
							<view class="ot-console-left">
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right ">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">品名：</view>
											<view class="demo7 ">{{item.category}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">类别：</view>
											<view class="demo7 ">{{item.variety}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">产地：</view>
											<view class="demo7 ">{{item.area}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">型号：</view>
											<view class="demo7 ">{{item.CODE}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">含税：</view>
											<view class="demo7 ">{{item.tax_price}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">不含税：</view>
											<view class="demo7 ">{{item.normal_price}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">付款方式：</view>
											<view class="demo7 ">{{item.trade_type}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">物流方式：</view>
											<view class="demo7 ">{{item.transport_type}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">数量：</view>
											<view class="demo7 ">{{item.num}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc gt">
											<view class="demo7 ">{{item.release_time.substring(0,10)}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">备注：</view>
											<view class="demo7 ">{{item.remark}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo7 ot-buttons">
												<button type="default" class="grace-button" @tap="handleClick(item.id)" size="mini">立即订购</button>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv ot-infor-fl">
				<scroll-view scroll-y="true" @scrolltolower="" :style="{height:tabHeight+'px'}">
					<view class="ot-home-ech">
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="ec-canvas" @touchstart="touchLineA"></canvas>
					</view>
					<image @tap="handleSearch" class="image" :src="img+'sousuo2.png'"></image>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import common from '../../../../common/common.js'
	import graceNav from "../../../../graceUI/components/graceNavBar.vue";
	import graceEmpty from '../../../../graceUI/components/graceEmpty.vue';
	var systemInfo = require('../../../../graceUI/jsTools/systemInfo.js'); //导航切换 获取屏幕高
	import graceLoading from "../../../../graceUI/components/graceLoading.vue";
	import gracePopupMenu from '../../../../graceUI/components/gracePopupMenu.vue'; //弹出菜单
	import uCharts from '../../../../common/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	export default {
		components: {
			graceNav,
			graceEmpty,
			gracePopupMenu,
			graceLoading
		},
		data() {
			return {
				img: common.imageUrlPath,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				titleShowId: 'tabTag-0',
				newsIndex: 0,
				tabs: [{
						name: '每日报价',
						id: 'baojia',
						loadingType: 0,
						page: 1
					},
					{
						name: '销售趋势',
						id: 'xiaoshou',
						loadingType: 0,
						page: 1
					}
				],
				menu1Show: false,
				menu1Top: 20,
				offerList: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},

		onLoad: function(option) {
			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - 44;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData()
		},
		mounted() {
			var _self = this
			uni.request({
				url: this.$webUrl + '/getQuote',
				success: (res) => {
					_self.offerList = res.data
					if (_self.offerList.length == 0) {
						_self.loadingText = ['暂无报价']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (_self.offerList.length > 0 && _self.offerList.length < 15) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['已加载全部']
							_self.loadings = ''
						}, 500)
					}
				},
				fail: (error) => {
					uni.showToast({
						icon: 'loading',
						title: "网络请求错误"
					})
				}
			})
		},
		created() {
			_self = this
		},
		methods: {
			goback() {
				this.$router.go(-1)
			},
			getServerData() {
				_self = this
				let LineA = {
					categories: [],
					series: []

				}; //创建数组
				LineA.categories = ['2019-07-19', '2019-08-19', '2019-09-19', '2019-10-19']
				LineA.series = [{
					name: '总金额',
					data: [35, 20, 25, 37],
					color: '#2F4554'
				}, {
					name: '总吨数',
					data: [70, 40, 65, 100],
					color: '#C23531'
				}]
				_self.showLineA("canvasLineA", LineA);
			},
			showLineA(canvasId, chartData) {
				var _self = this
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {
						show: true,
						position: 'top',
						lineHeight: 10
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: 1,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 5,
						min: 10,
						max: 180,
						format: (val) => {
							return val.toFixed(0)
						}
					},
					width: this.cWidth,
					height: this.cHeight,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});
			},
			touchLineA(e) {
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
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
			},
			handleFile(o) {
				switch (o) {
					case 0:
						uni.downloadFile({
							url: '', //仅为示例，并非真实的资源
							success: function(res) {
								if (res.statusCode === 200) {
									console.log('下载不/含税');
								}
							}
						});
						break;
						case 1:
							uni.downloadFile({
								url: '', //仅为示例，并非真实的资源
								success: function(res) {
									if (res.statusCode === 200) {
										console.log('下载含税');
									}
								}
							});
							break;
							case 2:
								uni.downloadFile({
									url: '', //仅为示例，并非真实的资源
									success: function(res) {
										if (res.statusCode === 200) {
											console.log('下载不含税');
										}
									}
								});
								break;
				}
			},
			handleChange: function(e) {
				if (this.menu1Show) {
					this.menu1Show = false;
					return;
				}
				let view = uni.createSelectorQuery().select("#demo-1");
				view.fields({
					size: true
				}, data => {
					_self.menu1Show = true;
					_self.menu1Top = data.height - 20;
					console.log(data);
				}).exec();
			},
			// 关闭菜单方法
			hideMenu: function() {
				this.menu1Show = false;
			},
			handleClick(e) {
				var id = e;
				//console.log(e)
				uni.navigateTo({
					url: '../addOrder/index?daId=' + e
				})
				// 	this.$router.push({path:'../addOrder/index'})
			},
			handleSearch() {
				uni.navigateTo({
					url: '../searchList/index'
				})
			},
		},
	}
</script>

<style>
	.grace-tab-title {
		position: relative;
		display: flex;
		box-shadow: 2upx 2upx 12upx #ccc;
	}

	/* start */

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #ff5722;
	}

	.gd-console-fo {
		height: 88upx;
		line-height: 88upx;
		background-color: #ff5722;
		display: flex;
		box-sizing: border-box;
		padding: 0px 20rpx;
		/* padding-top: 40upx; */
	}

	.gd-console-fs {
		flex: 1;
		color: #fff;
		line-height: 88upx;
		font-size: 45upx;
	}

	.gd-console-fe {
		flex: 10;
		color: #fff;
		text-align: center;
		line-height: 88upx;
		font-size: 34upx;
	}

	.gd-console-fr {
		flex: 1;
	}

	.gd-console-fr image {
		width: 45upx;
		height: 45upx;
		display: block;
		margin-top: 6upx;
		margin-right: 8upx;
	}

	/* end */

	page {
		background-color: #eee;
	}

	.imgs {
		position: absolute;
		right: 4upx;
		display: block;
		top: 16upx;
		width: 50upx;
		height: 50upx;
	}

	.grace-tab-title view {
		margin: 0 50upx;
		font-size: 31upx;
	}

	.grace-tab-current {
		border-bottom: 4upx solid #ff6835 !important;
		color: #ff6835;
		font-weight: 700;
	}

	.ot-console-fl {
		background-color: #fff;
		box-sizing: border-box;
		padding: 20upx 20upx;
		border-radius: 10upx;
		margin-bottom: 20upx;
		display: flex;
		box-shadow: 1px 1px 10upx #ccc;
		flex-direction: row;
	}

	.grace-news-list {
		padding: 25upx;
		width: 100%;
		box-sizing: border-box;
	}

	.ot-console-left {
		flex: 10;
	}

	.ot-console-right {
		flex: 2;
		box-sizing: border-box;
		padding-top: 25upx;
	}

	.ot-console-right image {
		width: 28upx;
		height: 44upx;
	}

	.grace-space-between .demo7 {
		color: #858585;
	}

	.demo6 {
		color: #858585;
	}

	.grace-space-between {
		justify-content: flex-start;
	}

	.ot-console-ht {
		margin-bottom: 15upx;
		margin-top: 15upx;
	}

	.ot-console-ft .demo6 {
		width: 141upx;
		text-align: left;
	}

	.ot-console-ft .demo7 {
		width: 205upx;
		text-align: left;
	}

	.ot-console-fc .demo6 {
		width: 141upx;
		text-align: left;
	}

	.ot-console-fc .demo7 {
		width: 210upx;
		text-align: left;
	}

	.ot-button button {
		background-color: transparent;
		color: #4d4d4d;
		border: 1px solid #ccc;
	}

	.ot-buttons button {
		background-color: #ff5722;
		color: #fff;
		border: 1px solid #ccc;
	}

	button[size=mini] {
		display: inline-block;
		line-height: 48upx;
		font-size: 13px;
		padding: 0 10upx;
	}

	.demo1 {
		position: relative;
		right: 20upx;
	}

	.menus {
		color: #292929;
		line-height: 68upx;
		box-sizing: border-box;
		padding: 0px 20upx;
	}

	.ot-home-ech {
		width: 100%;
		height: 800upx;
		box-sizing: border-box;
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.ec-canvas {
		width: 100%;
		height: 100%;
	}

	.image {
		position: fixed;
		bottom: 360upx;
		right: 40upx;
		width: 72upx;
		height: 72upx;
	}

	.ot-infor-fl {
		background-color: #fff;
	}
</style>
