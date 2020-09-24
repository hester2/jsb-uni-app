<template>
	<view class="">
		<scroll-view class="grace-tab-title grace-center" id="grace-tab-title" :scroll-x="false" :scroll-into-view="titleShowId">
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
											<view class="demo7 ">{{item.pinming}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">类别：</view>
											<view class="demo7 ">{{item.pro}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">产地：</view>
											<view class="demo7 ">{{item.address}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">型号：</view>
											<view class="demo7 ">{{item.xinghao}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">含税：</view>
											<view class="demo7 ">{{item.tax}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">不含税：</view>
											<view class="demo7 ">{{item.Notax}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">付款方式：</view>
											<view class="demo7 ">{{item.pay}}</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">物流方式：</view>
											<view class="demo7 ">{{item.wuliu}}</view>
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
										<view class="grace-space-between ot-console-fc">
											<view class="demo6 ">提货地址：</view>
											<view class="demo7 ">{{item.tihuo}}</view>
										</view>
									</view>
								</view>
								<view class="grace-space-between ot-console-ht">
									<view class="demo6 ot-right">
										<view class="grace-space-between ot-console-ft">
											<view class="demo6 ">
												备注：
											</view>
											<view class="demo7">
												{{item.beizhu}}
											</view>
										</view>
									</view>
									<view class="demo7 ">
										<view class="grace-space-between gt ot-console-fc">
											<view class="demo7">
												{{item.time}}
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="ot-console-right ">
								<image :src="item.img"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="ot-xt">
					<image class="imgs" :src="img+'offersearch.png'" @tap.stop="handleChange"></image>
				</view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="ot-home-ech">
						<canvas canvas-id="canvasLineA" id="canvasLineA" class="ec-canvas" @touchstart="touchLineA"></canvas>
					</view>
					<image @tap="handleSearch" class="image" :src="img+'sousuo2.png'"></image>
				</scroll-view>
			</swiper-item>
		</swiper>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="isShow" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
				<view slot="content" class="content">
					<view class="ot-historical-pre">历史搜索</view>
					<view class="grace-items">
						<view class="grace-label">历史报价</view>
						<input type="text" class="input" name="endDate" :disabled="true" :value="date2" @tap="showDate2" />
					</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view>
							<button type="primary" class="ot-select" @tap="closeDialog3">取消</button>
						</view>
						<view>
							<button type="primary" class="ot-select" formType="submit" style="color:#3688FF;" @tap="confirm3">确认</button>
						</view>
					</view>
				</view>
			</graceDialog>
		</form>
		<graceDate :show="show2" v-on:changeDate="changeDate2" :currentHour="12" v-on:closeDate="closeDate2" :currenMinute="58"></graceDate>
	</view>
</template>

<script>
	import common from "../../../../common/common.js";
	import graceDialog from '../../../../graceUI/components/graceDialog.vue';
	import graceNav from "../../../../graceUI/components/graceNavBar.vue";
	import graceEmpty from '../../../../graceUI/components/graceEmpty.vue';
	import graceSpeaker from "../../../../graceUI/components/graceSpeaker.vue";
	var systemInfo = require('../../../../graceUI/jsTools/systemInfo.js'); //导航切换 获取屏幕高
	import uCharts from '../../../../common/u-charts/u-charts.js';
	import graceDate from '../../../../graceUI/components/graceDate.vue'
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				titleShowId: 'tabTag-0',
				newsIndex: 0,
				date2: '点击选择',
				show2: false,
				isShow: false,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '每日报价',
						id: 'baojia',
						loadingType: 0,
						page: 1
					},
					{
						name: '销售趋势',
						id: 'qusi',
						loadingType: 0,
						page: 1
					},
				],
				offerList: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		onLoad: function(option) {
			//获取屏幕高度及比例
			var _self = this
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			uni.request({
				url: this.$webUrl + "/getQuote",
				success(res) {
					_self.offerList = res.data
				}
			})
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData()
		},
		// 下拉刷新事件
		onPullDownRefresh: function() {
			// 页码重置 
			this.pages[this.swiperCurrentIndex] = 1;
			this.loadingTypes[this.swiperCurrentIndex] = 0;
		},
		mounted() {
		},
		created() {
			_self = this
		},
		methods: {
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
				this.titleShowId = 'tabTag-' + index;
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				//console.log('loadmore.....');
				// 判断加载状态避免多次滚动时有加载尚未完成
				if (this.loadingTypes[this.swiperCurrentIndex] == 1 || this.loadingTypes[this.swiperCurrentIndex] == 2) {
					return;
				}
			},
			closeDate2: function() {
				this.show2 = false;
			},
			showDate2: function() {
				this.show2 = true;
			},
			changeDate2: function(e) {
				this.date2 = e;
				this.show2 = false;
			},
			handleChange: function() {
				this.isShow = true;
			},
			closeDialog3: function() {
				this.isShow = false;
			},
			confirm3: function() {
				this.closeDialog3();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
			},
			handleSearch() {
				uni.navigateTo({
					url: '../searchList/index',
				});
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				//console.log(JSON.stringify(e.detail.value));
			},
		},
		components: {
			graceNav,
			graceEmpty,
			"grace-speaker": graceSpeaker,
			graceDate,
			graceDialog: graceDialog
		}
	}
</script>

<style>
	.grace-tab-title {
		position: relative;
		display: flex;
		box-shadow: 2upx 2upx 12upx #ccc;
	}

	page {
		background-color: #eee;
	}

	.imgs {
		position: absolute;
		right: 20upx;
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
		width: 140upx;
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
		bottom: 320upx;
		right: 40upx;
		width: 100upx;
		height: 100upx;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 50upx;
	}

	.ot-historical-pre {
		text-align: center;
	}

	.gt .demo7 {
		width: 192upx;
		color: #ff3535;
	}

	button {
		background-color: #ff5722 !important;
	}

	.grace-dialog-btns .ot-select {
		background-color: #fff !important;
	}

	.ot-xt {
		position: fixed;
		right: 20upx;
		bottom: 195upx;
		width: 72upx;
		height: 72upx;
		background-color: #ff5722;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ot-xt image {
		width: 35upx;
		height: 35upx;
		display: block;
	}
</style>
