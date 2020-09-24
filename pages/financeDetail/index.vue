<template>
	<view class="container">
		<view class="ot-home-wc">
			<view class="ot-home-qx mn">
				<text></text>
				<text>财经早读</text>
				<text>/</text>
				<text>{{v.title}}</text>
			</view>
			<view class="ot-bg"></view>
			<view class="grace-list">
				<view class="items">
					<view class="body">
						<view class="title">{{v.title}}</view>
						<view class="desc">
							<text>发布时间： {{v.create_time}}</text>
							<text>来源： 中国金塑宝塑料网</text> </view>
					</view>
				</view>
			</view>
			<view class="ot-upstream-fl">
				<p v-html="v.content"></p>
				<!-- 	<view class="ot-upstream-fo">
					美国EIA原油库存连续四周下降，美中磋商释放积极信号缓和全球贸易风险，加之美联储降息预期增强，国际油价强劲上扬。WTI60.43涨2.60美元/桶;布伦特67.01涨2.85美元/桶。中国SC原油期货主力1908涨16.8至458.4元/桶。国内PP市场震荡回落，石化库存压力相对平稳，成本端对市场支撑较强，供应端对市场压力暂时偏小，标品资源紧俏，但期货高位回落拖累市场交投情绪，中下游经过短暂的补库后追涨节奏放慢，贸易商变现意愿较强，接盘积极性有所下降，受制于价格高企。下游回归随用随买模式，对高价货源相对排斥，但个别低价牌号需求较好，整体成交量尚可。国内拉丝主流价格在8850-9100元/吨。
				</view>
				<image src="http://img5.imgtn.bdimg.com/it/u=1367832262,2004134473&fm=26&gp=0.jpg" mode='widthFix'></image>
				<view class="ot-upstream-fo">后市看，行业整体心态谨慎未改，下游备货积极性跟随期货节奏为主，虽目前美联储降息预期较强，货币宽松预期再起，但整体经济形势仍有待观察，持续性反弹仍需更多利好提振，预计行情仍有反复。PP1909合约关注8700平台支撑，下破则多单暂时离场观望。（仅供参考）</view>
 -->
				<view>责编： {{v.author}}</view>
			</view>
			<view class="grace-list mc">
				<view class="items">
					<view class="body">
						<view class="title" @tap="handleOn"> {{lt}} 上一条</view>
						<view class="desc" @tap="handleNext">
							下一条>
						</view>
					</view>
				</view>
			</view>
			<view class="ot-bg"></view>
			<view class="of ot-home-qx mn">
				<text></text>
				<text>相关推荐</text>
			</view>
			<view v-for="(item,index) in history" :key="index">
				<view class="grace-list ot-upstream-fv">
					<navigator class="items" :url="'../financeDetail/index?id='+item.id">
						<view class="icons">
							<text></text>
						</view>
						<view class="body">
							<view class="title">金塑宝塑料网：{{item.title}}</view>
							<view class="desc">{{item.create_time}}</view>
						</view>
						<view class="arrow-right"></view>
					</navigator>
				</view>
			</view>

			<view class="ot-bgt"></view>
		</view>
	</view>

</template>

<script>
	var _self;
	export default {
		data() {
			return {
				lt: '<',
				v: [],
				history: [],

			}
		},
		onLoad(option) {
			var id = option.id;
			console.log(option.id)
			_self = this;
			uni.request({
				url: _self.$webUrl + "/findArticle",
				data: {
					id: id
				},
				success(res) {
					var data = res.data;
					_self.v = data;
					console.log(_self.v)
				}
			})
			uni.request({
				url: _self.$webUrl + "/cjzd",

				success(res) {
					var data = res.data;
					_self.history = data;
				}
			})
		},
		methods: {
			handleNext() {
				uni.request({
					url: this.$webUrl + "/nextArticle",
					data: {
						id: _self.v.id,
						classify: 1
					},
					success(res) {
						if (res.data == null) {
							uni.showToast({
								title: '到头了',
								icon: 'none'
							})
							return
						}
						_self.v = res.data
					}
				})
			},
			handleOn() {
				uni.request({
					url: this.$webUrl + "/preArticle",
					data: {
						id: _self.v.id,
						classify: 1
					},
					success(res) {
						if (res.data == null) {
							uni.showToast({
								title: '到头了',
								icon: 'none'
							})
							return
						}
						_self.v = res.data
					}
				})
			}
		}
	}
</script>

<style>
	.ot-home-wc {
		width: 100%;
		height: 100%;
	}

	.ot-bg {
		height: 10px;
		background-color: #eee;
	}

	.ot-bgt {
		height: 20px;
		background-color: #eee;
	}

	.ot-home-qx {
		font-size: 15px;
		margin-top: 10px;
		display: flex;
		line-height: 20px;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 10px;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 2px;
		height: 20px;
		display: block;
		background-color: #ff5722;
		margin-right: 10px;
	}

	.ot-home-qx text:nth-of-type(2) {
		color: #999;
	}

	.ot-home-qx text:nth-of-type(3) {
		color: #999;
		margin: 0px 10px;
	}

	.ot-home-qx text:nth-of-type(4) {
		color: #666;
	}

	.ot-home-wc .grace-list {
		padding: 0px 0px;
		box-sizing: border-box;
	}

	.ot-home-wc .grace-list .items .icons image {
		border-radius: 10upx;
		width: 100%;
		height: 100%;
	}

	.ot-home-wc .grace-list .items {
		border-bottom: 1px solid #ccc;
		margin: 0px;
		box-sizing: border-box;
		padding: 8px 0px;
	}

	.ot-home-wc .grace-list .items .body {
		margin-left: 14px;
		padding-top: 0px;
		width: 100%;
		padding-bottom: 0px;
		box-sizing: border-box;
	}

	.ot-home-wc .title {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.grace-list .items .desc {
		margin-top: 4px;
		display: flex;
		width: 100%;
	}

	.grace-list .items .desc text:nth-of-type(1) {
		font-size: 24upx;
		color: #a5a7b2;
		margin-right: 20px;
	}

	.grace-list .items .desc text:nth-of-type(2) {
		font-size: 24upx;
		color: #a5a7b2;
	}

	.ot-upstream-fl {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 0px 10px;
		padding-top: 15px;
	}

	.ot-upstream-fo {
		margin-bottom: 10px;
		text-indent: 55upx;
		font-size: 14px;
		background-color: #eee;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;
	}

	.ot-upstream-fl image {
		width: 100%;
		margin: 15px 0px;
	}

	.mc.grace-list .items {
		border-bottom: 0px solid #ccc;
		border-top: 1px solid #ccc;
		margin-top: 10px;
		padding: 6px 0px;
	}

	.mc.grace-list .items .body {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-right: 14px;
		color: #a5a7b2;
	}

	.mc.grace-list .items .body .title {
		color: #a5a7b2;
	}

	.mc.grace-list .items .desc {
		text-align: right;
		display: block;
		font-size: 30upx;
		color: #000;
		width: 70%;
	}

	.of.ot-home-qx text:nth-of-type(2) {
		color: #000;
	}

	.ot-upstream-fv.grace-list .items .icons {
		width: 30upx;
		height: 60upx;
		position: relative;
		padding-left: 5px;
	}

	.ot-upstream-fv.grace-list .items .icons text {
		position: absolute;
		right: 0px;
		top: 0px;
		width: 20upx;
		height: 20upx;
		display: block;
		background-color: rgb(187, 185, 185);
		border-radius: 50%;
	}

	.ot-upstream-fv.grace-list .items .body {
		margin-left: 8px;
	}

	.ot-upstream-fv.grace-list .items {
		padding: 4px 0px;
	}
</style>
