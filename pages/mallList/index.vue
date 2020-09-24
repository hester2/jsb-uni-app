<template>
	<view class="container">
		<view class="ot-mall-qb">
			<view class="ot-home-qx mn">
				<text></text>
				<text>行情资讯</text>
			</view>
			<view class="ot-bg"></view>
		</view>
		<view class="ot-mall-gf">
			<view class="grace-news-list" v-for="item in information" :key="item.id">
				<navigator class="item" :url="detailUrl+item.id">
						<view class="body">
							<view class="title">{{item.title}}</view>
							<view class="desc">{{item.create_time}}</view>
						</view>
						<view class="img img-r">
							<image :src="item.pic"></image>
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
				detailUrl:'../mallDetail/index?id=',
				information: []
			}
		},
		onLoad(){
			var _self = this;
			uni.request({
				url:_self.$webUrl+"/kcdtAll",
				success(res){
					var data = res.data;
					_self.information = data;
				}
			})
		}
	}
</script>

<style>
	.container {
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

.ot-mall-gf .grace-news-list {
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  padding: 10upx 30upx;
  margin-bottom: 0px;
}

.ot-mall-gf .grace-news-list:first-of-type {
  border: none;
}

.ot-mall-gf .grace-news-list:last-of-type {
  border-bottom: 1px solid #ccc;
}

.ot-mall-gf .grace-news-list .item {
  margin: 0px;
  height: 99upx;
}

.ot-mall-gf .grace-news-list .body {
  flex: 10;
  height: 100%;
  margin: 10upx 0px;
}

.ot-mall-gf .grace-news-list .img {
  flex: 2;
}

.ot-mall-gf .grace-news-list .img image {
  width: 100%;
  height: 98upx;
}

.ot-home-qx {
  font-size: 30upx;
  margin-top: 20upx;
  margin-bottom: 20upx;
  line-height: 40upx;
  display: flex;
  box-sizing: border-box;
}

.ot-home-qx text:nth-of-type(1) {
  width: 4upx;
  height: 40upx;
  display: block;
  background-color: #ff5722;
  margin-right: 20upx;
}

.ot-home-qx text:nth-of-type(2) {
  line-height: 40upx;
  height: 40upx;
}

.ot-home-qx text:nth-of-type(3) {
  text-align: right;
  color: #ff5722;
  font-size: 24upx;
  padding-right: 20upx;
  box-sizing: border-box;
}

.ot-bg {
  height: 20upx;
  background-color: #eee;
}

</style>
