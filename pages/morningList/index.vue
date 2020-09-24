<template>
	<view class="container">
		<view class="ot-plastic-gf">
			<view class="ot-home-qx mn">
				<text></text>
				<text>行情早报</text>
			</view>
			<view class="ot-bg"></view>
			<view class="grace-news-list" v-for="(item, index) in morning" :key="item.id">
				<navigator class="item" hover-class="none" url="../morningDetail/index?getid=item.id">
					<view class="body">
						<view class="title">深圳北JHCB级你看撒CJN 从UB合计</view>
						<view class="desc">2019-06-26</view>
					</view>
					<view class="img img-r">
						<image :src="item.image"></image>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				morning: [{
					'id': 0,
					'title': '深圳北JHCB级你看撒CJN 从UB合计',
					'time': '2019-06-26',
					'image': 'http://assets.jinsubao.cn/bzfx-1.png'
				}, {
					'id': 1,
					'title': '深圳北JHCB级你看撒CJN 从UB合计',
					'time': '2019-06-26',
					'image': 'http://assets.jinsubao.cn/bzfx-1.png'
				}, {
					'id': 2,
					'title': '深圳北JHCB级你看撒CJN 从UB合计',
					'time': '2019-06-26',
					'image': 'http://assets.jinsubao.cn/bzfx-1.png'
				}, {
					'id': 3,
					'title': '深圳北JHCB级你看撒CJN 从UB合计',
					'time': '2019-06-26',
					'image': 'http://assets.jinsubao.cn/bzfx-1.png'
				}, {
					'id': 4,
					'title': '深圳北JHCB级你看撒CJN 从UB合计',
					'time': '2019-06-26',
					'image': 'http://assets.jinsubao.cn/bzfx-1.png'
				}, {
					'id': 5,
					'title': '深圳北JHCB级你看撒CJN 从UB合计',
					'time': '2019-06-26',
					'image': 'http://assets.jinsubao.cn/bzfx-1.png'
				}]
			}
		}
	}
</script>

<style>
	.ot-plastic-gf {
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}

	.ot-bg {
		height: 20upx;
		background-color: #eee;
	}

	.ot-plastic-qb {
		margin-bottom: 20upx;
	}


	.ot-plastic-gf .grace-news-list {
		border-bottom: 2upx solid #ccc;
		box-sizing: border-box;
		padding: 6upx 30upx;
		margin-bottom: 0px;
	}

	.ot-plastic-gf .grace-news-list:last-of-type {
		border-bottom: 2upx solid #ccc;
	}

	.ot-plastic-gf .grace-news-list .item {
		margin: 0px;
		height: 98upx;
	}

	.ot-plastic-gf .grace-news-list .body {
		flex: 10;
		padding: 10upx 0px;
		box-sizing: border-box;
	}

	.ot-plastic-gf .grace-news-list .img {
		flex: 2;
	}

	.ot-plastic-gf .grace-news-list .img image {
		width: 100%;
		height: 98upx;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 20upx;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 20upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 7upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.grace-news-list .desc {
		font-size: 24upx;
	}
</style>
