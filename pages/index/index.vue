<template>
	<view class="container">
		<view class="grace-header-body">
			<!-- 中间内容 -->
			<view class="grace-search">
				<view class="grace-search-in">
					<view class="icons grace-icons icon-search"></view>
					<view class="input">
						<input type="search" @input="searchChange" @confirm="searchNow" :value="searchKey" placeholder="关键字"></input>
					</view>
					<view class="icons grace-icons icon-close" @tap="clearKey" v-if="searchKey.length > 0"></view>
				</view>
			</view>
		</view>

		<view class="ot-home-qn">
			<!-- 内容开始区域  -->
			<view class="grace-body vf" v-if="searchClose">
				<view class="grace-list">
					<navigator class="items" hover-class="none">
						<view class="icons grace-icons icon-search"></view>
						<view class="body">
							<view class="title">1111</view>
						</view>
					</navigator>
					<navigator class="items" hover-class="none">
						<view class="icons grace-icons icon-search"></view>
						<view class="body">
							<view class="title">1111</view>
						</view>
					</navigator>
					<navigator class="items" hover-class="none">
						<view class="icons grace-icons icon-search"></view>
						<view class="body">
							<view class="title">1111</view>
						</view>
					</navigator>
				</view>
			</view>
			<!--  -->
			<view class="ot-home-qm">
				<swiper class="grace-swiper swiper1" autoplay="true" indicator-dots indicator-color="rgba(255, 255, 255, 1)"
				 indicator-active-color="#FF5722" style="height:290upx" interval="3000">
					<swiper-item v-for="(item, index) in imgList" :key="index">
						<navigator url='' class="grace-img-in">
							<image :src='item.img'></image>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- 宫格 -->
			<view class="grace-grids demoForIcon grace-margin-top">
				<view class="items ot-home-wn">
					<navigator url="../information/index?getid=0">
						<view class="icon">
							<text class="grace-icons iconfont icon-icon_hangyezhishu"></text>
						</view>
						<view class="text">财经早读</view>
					</navigator>
				</view>
				<view class="items ot-home-wn">
					<navigator url="../information/index?getid=1">
						<view class="icon">
							<text class="grace-icons iconfont icon-Futures_trade"></text>
						</view>
						<view class="text">期货指数</view>
					</navigator>
				</view>
				<view class="items ot-home-wn">
					<navigator url="../information/index?getid=2">
						<view class="icon">
							<text class="grace-icons iconfont icon-shuidi"></text>
						</view>
						<view class="text">外汇牌价</view>
					</navigator>
				</view>
				<view class="items ot-home-wn">
					<navigator url="../information/index?getid=3">
						<view class="icon">
							<text class="grace-icons iconfont icon-kuaidi"></text>
						</view>
						<view class="text">外盘速递</view>
					</navigator>
				</view>
			</view>
			<!-- 宫格结束 -->
			<view style="height:15px;background-color:#E6E6E6"></view>
			<view>
				<view class="ot-home-qb">
					<image :src="img+'shuju.png'"></image>
					<text>专业数据</text>
				</view>
				<view class="ot-home-ech">
					<canvas canvas-id="canvasLineA" id="canvasLineA" class="ec-canvas" @touchstart="touchLineA"></canvas>
				</view>
			</view>
			<!--观点begin  -->
			<view class="ot-home-qv">
				<view class="ot-home-qx">
					<text></text>
					<text>实时动态</text>
					</view>
				<view class="ot-home-qd">
					<swiper class="swiper" circular="true"  vertical="true" display-multiple-items="5"
					 :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration" next-margin="20px">
						<swiper-item class="ot-home-scllo" @touchmove.stop="stopTouchMove" v-for="(item,index) in answer" :key="index">
							<span></span>{{item.sys_body}}
						</swiper-item>
					</swiper>
				</view>
			</view>
			<!--观点end  -->
			<view style="height:15px;background-color:#E6E6E6"></view>
			<!-- 产业金融 -->
			<view class="ot-home-qc">
				<view class="ot-home-qx">
					<text></text>
					<text>产业金融</text>
					</view>
				<view class="grace-grids grace-margin-top five">
					<view class="items">
						<navigator url="../homeCdzy/index">
							<view class="icon">
								<image src="http://assets.jinsubao.cn/cyjr-1.png" mode="widthFix"></image>
							</view>
							<view class="text">仓单质押</view>
						</navigator>
					</view>
					<view class="items">
						<navigator url="../homeZqsx/index">
							<view class="icon">
								<image src="http://assets.jinsubao.cn/pic-cyjr1.png" mode="widthFix"></image>
							</view>
							<view class="text">账期授信</view>
						</navigator>
					</view>
					<view class="items">
						<navigator url="../homeRzzl/index">
							<view class="icon">
								<image src="http://assets.jinsubao.cn/pic-cyjr2.png" mode="widthFix"></image>
							</view>
							<view class="text">融资租赁</view>
						</navigator>
					</view>
					<view class="items">
						<navigator url="../homeDcdx/index">
							<view class="icon">
								<image src="http://assets.jinsubao.cn/cyjr-4.png" mode="widthFix"></image>
							</view>
							<view class="text">代采代销</view>
						</navigator>
					</view>
				</view>
			</view>
			<!-- end -->
			<!-- 上有动态 -->
			<view class="ot-home-wc">
				<view class="ot-home-qx mn">
					<text></text>
					<text>上游动态</text>
					<text @tap="handelList">更多>> </text>
				</view>
				<view class="grace-list" v-for="(item, index) in stream" :key="index">
					<navigator :url="articleUrl+item.id" class="items">
						<view class="icons">
							<image :src="item.pic==null||item.pic==''?'https://img.cdn.zhaoshang800.com/img/2018/08/08/broker/2f7a81a2-289c-41af-823a-0efe7b11f1f2.png?x-oss-process=style/hd':item.pic"></image>
						</view>
						<view class="body">
							<view class="title">{{item.title}}</view>
							<view class="desc">{{item.create_time}}</view>
						</view>
						<view class="arrow-right"></view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import graceHeader from '../../graceUI/components/graceHeader.vue';
	import common from '../../common/common.js'
	import graceFullLoading from "../../graceUI/components/graceFullLoading.vue";
	import uCharts from '../../common/u-charts/u-charts.js';
	import graceSpeaker from "../../graceUI/components/graceSpeaker.vue";
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
				title: 'Hello',
				scllo: 3,
				img: common.imageUrlPath,
				graceFullLoading: true,
				searchClose: false,
				searchKey: "",
				imgList: [{
					'id': 0,
					'img': 'http://assets.jinsubao.cn/pic-sy_1.png'
				}, {
					'id': 1,
					'img': 'http://assets.jinsubao.cn/pic-sy_2.png'
				}, {
					'id': 2,
					'img': 'http://assets.jinsubao.cn/pic-sy_3.png'
				}],
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				animate: false,
				titleShowId: 'tabTag-0',
				upstream: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
				stream: [],
				articleUrl: '../homeUpstreamDetail/index?id=',
				answer: []
			}

		},
		mounted() {
			_self = this;
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {}
			});
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
			uni.request({
				url: _self.$webUrl + "/getCcbj",
				success(res) {
					var data = res.data;
					_self.stream = data;
				}
			})
			uni.request({
				url: this.$webUrl + "/ssdt",
				success(res) {
					var data = res.data
					_self.answer = data
				}
			})
		},
		created() {},
		methods: {
			stopTouchMove() {
				return false;
			},
			getServerData() {
				uni.request({
					url: _self.$webUrl + "/loadMarketData",
					data: {
						type: 'PP'
					},
					success(res) {
						var data = res.data[0];
						var legend = data.legend;
						var series = data.series;
						var xAxis = data.xAxis;
						let LineA = {
							categories: [],
							series: []
						}; //创建数组
						LineA.categories = xAxis
						LineA.series = [{
							name: legend[0],
							data: series[0].data,
							color: '#37A2DA'
						}, {
							name: legend[1],
							data: series[1].data,
							color: '#67E0E3'
						}, {
							name: legend[2],
							data: series[2].data,
							color: '#9FE6B8'
						}]
						_self.showLineA("canvasLineA", LineA);
					}
				})

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
						min: 8000,
						max: 10000,
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

			handelList() {
				uni.navigateTo({
					url: '../homeUpstreamList/index',
				});
			},
			handelClick() {
				uni.navigateTo({
					url: '../plasticList/index'
				});
			},
			handelTap() {
				uni.navigateTo({
					url: '../morningList/index'
				});
			},
			showFullLoading: function() {
				this.graceFullLoading = true;
				setTimeout(function() {
					this.graceFullLoading = false;
				}.bind(this), 3000);
			},
			goback: function() {
				uni.showToast({
					title: "您点击了返回按钮",
					icon: "none"
				});
				uni.navigateBack({});
			},
			searchChange: function(e) {
				var key = e.detail.value;
				this.searchKey = key;
				if (key.length >= 1) {
					this.searchClose = true
				} else {
					this.searchClose = false
				}
			},
			clearKey: function() {
				this.searchClose = false;
				this.searchKey = "";
			},
			searchNow: function() {
				uni.showToast({
					title: '开始搜索 ' + this.searchKey,
					icon: "none"
				});
			},
			setKey: function(e) {
				var key = e.currentTarget.dataset.key;
				uni.showToast({
					title: '开始搜索 ' + key,
					icon: "none"
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
			}
		},
		created() {
			this.showFullLoading()
		},
		components: {
			graceFullLoading,
			graceHeader,
			"grace-speaker": graceSpeaker
		}
	}
</script>

<style>
	.container {
		width: 100%;
		height: 100%;
		background-color: #fff;
		overflow-x: hidden;
	}

	.icon-kuaidi:before {
		content: "\e608";
	}

	.icon-icon_hangyezhishu:before {
		content: "\e61f";
	}

	.icon-qihuo:before {
		content: "\e6a5";
	}

	.icon-ziyuan:before {
		content: "\e652";
	}

	.ot-home-qn {
		position: relative;
		width: 100%;
		height: 100%;
	}

	.grace-grids .items {
		width: 25%;
		padding: 16upx 0;
		box-sizing: border-box;
	}

	.demoForIcon {
		border-right: 2upx solid #f5f6f8;
		border-bottom: 2upx solid #f5f6f8;
	}

	.demoForIcon>.items {
		border-left: 2upx solid #f5f6f8;
		border-top: 2upx solid #f5f6f8;
		color: #a5a7b2;
	}

	.grace-body {
		display: block;
		background-color: #fff;
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 999999;
		margin-top: 0px;
		box-sizing: border-box;
	}

	view {
		line-height: 0em;
	}

	.input {
		width: 100%;
	}

	.grace-search {
		width: 100%;
		height: 100%;
		background-color: #e6e6e6;
		padding: 20upx 1%;
	}

	.grace-header-body {
		/* position: fixed; */
		background-color: #e6e6e6;
		z-index: 99;
		width: 100%;
		top: 0upx;
	}

	.ot-home-qm {
		margin: 20upx 20upx;
		background-color: #ccc;
		height: 290upx;
		box-sizing: border-box;
	}

	.grace-swiper swiper-item navigator image {
		height: 100%;
	}

	.grace-margin-top {
		margin-top: 20upx;
		box-sizing: border-box;
	}

	.ot-home-qb {
		width: 100%;
		display: flex;
		flex-direction: row;
		height: 60upx;
		padding: 20upx 20upx;
		border-bottom: 1px solid #f5f6f8;
	}

	.grace-grids .text {
		margin-top: 0px;
		color: #303030;
	}

	.ot-home-qb image {
		display: block;
		width: 60upx !important;
		height: 60upx !important;
	}

	.ot-home-qb text {
		margin-top: 32upx;
		margin-left: 20upx;
		font-size: 30upx;
	}

	.ot-home-qv {
		width: 100%;
		height: 300upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
		box-sizing: border-box;
		box-sizing: border-box;
		overflow: hidden;
	}

	.ot-home-qv .ot-home-qd {
		width: 100%;
		height: 200upx;
		box-sizing: border-box;
		padding: 20upx 30upx;
		margin: 20upx 0px;
		overflow: hidden;
	}

	.ot-home-qd .swiper {
		height: 250upx;
		overflow: hidden;
		margin-bottom: 20upx;
	}

	.ot-home-scllo {
		height: 60upx !important;
		font-size: 26upx;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 60upx;

	}

	.ot-home-scllo span {
		display: block;
		float: left;
		margin-top: 26upx;
		margin-right: 20upx;
		width: 10upx;
		height: 10upx;
		background-color: #797876;
		border-radius: 50%;
	}

	.ot-home-qd li {
		height: 30px;
	}

	.ot-home-qv .demo-img {
		padding: -1upx 0;
	}

	.ot-home-qv .demo-img image {
		width: 100%;
		height: 100% !important;
		border-radius: 8upx;
	}

	.ot-home-qc {
		width: 100%;
		height: auto;
		padding-top: 20upx;
		box-sizing: border-box;
		box-sizing: border-box;
		overflow: hidden;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 2upx;
		display: flex;
		line-height: 40upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 40upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx text:nth-of-type(2) {
		flex: 3;
		height: 35upx;
		line-height: 35upx;
	}

	.ot-home-qx text:nth-of-type(3) {
		text-align: right;
		flex: 8;
		color: #ff5722;
		font-size: 24upx;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	/*  */

	.ot-home-qc .grace-grids .icon {
		width: 155upx;
		height: 140upx;
	}

	.ot-home-qc .grace-grids .icon image {
		height: 100% !important;
	}

	.ot-home-qc .grace-margin-top {
		padding: 0px 20upx;
	}

	.ot-home-qc .grace-grids .text {
		margin-top: 12upx;
	}

	.ot-home-ech {
		width: 100%;
		height: 480upx;
		box-sizing: border-box;
		overflow: hidden;
		margin-bottom: 30upx;
	}

	.ec-canvas {
		width: 100%;
		height: 100%;
	}

	.ot-home-wn .grace-icons {
		color: #ff5722;
	}

	.ot-home-wn .icon-icon_hangyezhishu {
		font-size: 52upx !important;
	}

	.ot-home-wn .icon-kuaidi {
		font-size: 60upx !important;
	}

	.ot-home-wc {
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}

	.ot-home-wc .grace-list {
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.ot-home-wc .grace-list .items .icons image {
		border-radius: 10upx;
		width: 100%;
		height: 100%;
	}

	.ot-home-wc .grace-list .items {
		border-bottom: 1px solid #f5f6f8;
		margin: 0px;
		box-sizing: border-box;
		padding: 20upx 0px;
	}

	.ot-home-wc .grace-list .items .icons {
		width: 145upx;
		height: 109upx;
	}

	.ot-home-wc .grace-list .items .body {
		margin-left: 28upx;
		padding-top: 0px;
		width: 510upx;
		padding-right: 10upx;
		box-sizing: border-box;
	}

	.ot-home-wc .title {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ot-home-wc .grace-list .items .arrow-right:before {
		color: #72747c;
		font-size: 46upx;
	}

	.grace-list .items .icons {
		color: #bcbdc1 !important;
		font-size: 28upx !important;
	}

	.vf .items {
		border-bottom: 1px solid #eee;
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.vf .grace-list .items .body {
		padding: 0px;
		margin-top: 12upx;
		margin-left: 8upx;
	}

	.vf .grace-list .items {
		margin: 0px;
	}

	.vf .grace-list .items .icons {
		height: 70upx;
	}

	.vf .grace-list .items .body .title {
		font-size: 14px;
		color: rgb(170, 171, 173) !important;
	}
</style>
