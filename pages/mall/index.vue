<template>
	<view class="ot-mall-qn">
		<view>
			<view class="ot-mall-ech">
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="ec-canvas" @touchstart="touchLineA"></canvas>
			</view>
		</view>
		<!-- 行情资讯 -->
		<view class="ot-mall-qb">
			<view class="ot-home-qx mn">
				<text></text>
				<text>行情资讯</text>
				<text @tap="handelList">更多>> </text>
			</view>
		</view>
		<view class="ot-mall-gf">
			<view class="grace-news-list" v-for="(item, index) in information" :key="index">
					<navigator class="item" :url="detailUlr+item.id">
						<view class="body">
							<view class="title">{{item.title}}</view>
							<view class="desc">{{item.create_time}}</view>
						</view>
						<view class="img img-r">
							<!-- <image :src="item.pic==null||item.pic==''?'https://img.cdn.zhaoshang800.com/img/2018/08/08/broker/2f7a81a2-289c-41af-823a-0efe7b11f1f2.png?x-oss-process=style/hd':item.pic"></image> -->
						</view>
					</navigator>
			</view>
		</view>
		<!-- end -->
	</view>
</template>

<script>
	import uCharts from '../../common/u-charts/u-charts.js';
	var _self;
	var canvaLineA = null;
	export default {
		data() {
			return {
				detailUlr:'../mallDetail/index?id=',
				information: [],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
			uni.request({
				url:_self.$webUrl+"/getKcdt",
				success(res) {
					var data =res.data;
					_self.information = data;
					
				}
			})
		
		},
		methods: {
			getServerData() {
				uni.request({
					url:_self.$webUrl+"/loadMarketData",
					data:{type:'PP'},
					success(res){
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
						position:'top',
						lineHeight:10
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
					url: '../mallList/index',
				});
			},
			
		},
		mounted() {
		}
	}
</script>

<style>
	.ot-mall-qn {
		width: 100%;
		height: 100%;
	}

	.ot-mall-ech {
		width: 100%;
		height: 520upx;
		box-sizing: border-box;
		overflow: hidden;
		margin-bottom: 30upx;
	}
	
	.ec-canvas{
		width: 100%;
		height: 100%;
	}

	.ot-mall-qb {
		text-align: center;
	}

	.ot-mall-gf {
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}

	.ot-mall-qb {
		margin-bottom: 20upx;
	}

	.ot-mall-gf .grace-news-list {
		border-top: 1px solid #f5f6f8;
		box-sizing: border-box;
		padding: 0upx 30upx;
		margin-bottom: 0px;
	}

	.ot-mall-gf .grace-news-list:last-of-type {
		border-bottom: 1px solid #ccc;
	}

	.ot-mall-gf .grace-news-list .item {
		margin: 0px;
		height: 106upx;
	}

	.ot-mall-gf .grace-news-list .body {
		flex: 10;
		margin: 10upx 0px;
	}

	.ot-mall-gf .grace-news-list .img {
		flex: 2;
	}

	.ot-mall-gf .grace-news-list .img image {
		width: 100%;
		height: 106upx;
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
		flex: 2;
		height: 35upx;
		line-height: 35upx;
		text-align: left;
	}

	.ot-home-qx text:nth-of-type(3) {
		text-align: right;
		flex: 8;
		color: #ff5722;
		font-size: 24upx;
		padding-right: 20upx;
		box-sizing: border-box;
	}
</style>
