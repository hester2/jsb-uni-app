<template>
	<view class="container">
		<view class="ot-home-wc">
			<view class="ot-home-qx mn">
				<text></text>
				<text>上游动态</text>
			</view>
			<view class="ot-bg"></view>
			<view class="grace-list" v-for="(item,index) in upstream" :key="item.id">
				<navigator class="items" :url="articleUrl+item.id">
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
		<view class="grace-body">

		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				upstream: [],
				articleUrl: '../homeUpstreamDetail/index?id=',
			}
		},
		created() {
			_self=this
			uni.request({
				url: _self.$webUrl + "/getCcbj",
				success(res) {
					var data = res.data;
					_self.upstream = data;
					console.log(_self.upstream)
				}
			})
		},
	}
</script>

<style>
	.ot-home-wc {
		width: 100%;
		height: auto;
		box-sizing: border-box;
	}

	.ot-bg {
		height: 10px;
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
		flex: 3;
	}

	.ot-home-wc .grace-list {
		padding: 0px 10px;
		box-sizing: border-box;
	}

	.ot-home-wc .grace-list .items .icons image {
		border-radius: 10upx;
		width: 100%;
		height: 100%;
	}

	.ot-home-wc .grace-list .items {
		border-bottom: 1px solid #eee;
		margin: 0px;
		box-sizing: border-box;
		padding: 0px 0px;
	}

	.ot-home-wc .grace-list .items .icons {
		width: 145upx;
		height: 109upx;
	}

	.ot-home-wc .grace-list .items .body {
		margin-left: 14px;
		padding-top: 0px;
		width: 510upx;
		padding-right: -1px;
		box-sizing: border-box;
	}

	.ot-home-wc .title {
		display: block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ot-home-wc .grace-list .items .arrow-right:before {
		color: #ccc;
		font-size: 23px;
	}
	
	.grace-list > .items > .body > .title{
		margin-top: 20upx;
	}
	
	.grace-list > .items > .body > .desc{
		margin-top: 10upx;
	}
	.ot-home-wc .grace-list .items .arrow-right[data-v-56b24000]:before{
		color: #eee;
	}
</style>
