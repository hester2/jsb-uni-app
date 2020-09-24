<template>
	<view class="container">
		<view class="ot-home-wc">
			<view class="ot-home-qx mn">
				<text></text>
				<text>行情资讯</text>
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
				<view class="ot-upstream-fo">
					<p v-html="v.content"></p>
				</view>
				<view>责编： {{v.author}}</view>
			</view>
			<view class="grace-list mc">
				<view class="items">
					<view class="body">
						<view class="title"> {{lt}} 上一条</view>
						<view class="desc">
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
			<view class="grace-list ot-upstream-fv" v-for="(item,index) in kcdtHisotry" :key="index">
				<navigator class="items" :url="detailUrl+item.id">
						<view class="icons">
							<text></text>
						</view>
						<view class="body">
							<view class="title">{{item.title}}</view>
							<view class="desc">{{item.create_time}}</view>
						</view>
						<view class="arrow-right"></view>
				</navigator>
			</view>
			<view class="ot-bgt"></view>
		</view>
	</view>

</template>

<script>
	export default{
		data(){
			return {
				lt:'<',
				detailUrl:'../mallDetail/index?id=',
				v:[],
				kcdtHisotry:[]
			}
		},
		onLoad(option){
			var id =option.id;
			var _self = this;
			uni.request({
				url:_self.$webUrl+"/findArticle",
				data:{id:id},
				success(res){
					var data = res.data;
					_self.v= data;
					console.log(_self.v)
				}
			})
			uni.request({
				url:_self.$webUrl+"/kcdtHistory",
				success(res){
					var data = res.data
					_self.kcdtHisotry = data
				}
			})
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
