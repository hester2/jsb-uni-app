<template>
	<view class="conainer">
		<view class="ot-advant-fo">
			<view class="ot-advant-title">我们的优势</view>
			<view class="ot-advant-main">
				<!-- 页面主体 -->
				<view class="grace-list">
					<navigator class="items">
						<view class="icons">
							<image :src="img+'icon-advant_1.png'" mode="widthFix"></image>
						</view>
						<view class="body">
							<view class="title">
								<text class="text">专业</text>
								<text class="desc"></text>
							</view>
							<view class="desc">培训上岗/绩效考核</view>
						</view>
					</navigator>
				</view>
				<view class="grace-list">
					<navigator class="items">
						<view class="icons">
							<image :src="img+'icon-advant_2.png'" mode="widthFix"></image>
						</view>
						<view class="body">
							<view class="title">
								<text class="text">高校</text>
								<text class="desc"></text>
							</view>
							<view class="desc">资深调度人员/专人异常处理/个人定制需求</view>
						</view>
					</navigator>
				</view>
				<view class="grace-list">
					<navigator class="items">
						<view class="icons">
							<image :src="img+'icon-advant_3.png'" mode="widthFix"></image>
						</view>
						<view class="body">
							<view class="title">
								<text class="text">安全</text>
								<text class="desc"></text>
							</view>
							<view class="desc">证照安全/货无忧保障体系/个人定制需求</view>
						</view>
					</navigator>
				</view>
				<view class="grace-list">
					<navigator class="items">
						<view class="icons">
							<image :src="img+'icon-advant_4.png'" mode="widthFix"></image>
						</view>
						<view class="body">
							<view class="title">
								<text class="text">及时</text>
								<text class="desc"></text>
							</view>
							<view class="desc">满足临时用车/运力保障可调配</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
   import common from '../../common/common.js'
   export default{
	   data(){
		   return{
			   img:common.imageUrlPath
		   }
	   }
   }
</script>

<style>
	page {
		background-color: #eee;
		background-image: url('http://assets.jinsubao.cn/pic-advant_2.jpg');
		background-repeat: no-repeat;
		background-position-x: center;
		background-position-y: -125upx;
		background-size: 100%;
	}

	.conainer {
		box-sizing: border-box;
		padding: 90upx 20upx;
	}

	.ot-advant-fo {
		background-color: #fff;
		box-sizing: border-box;
		padding: 40upx 30upx;
		height:1040upx ;
	}

	.ot-advant-title {
		background-image: url('http://assets.jinsubao.cn/pic-advant_1.jpg');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 100%;
		text-align: center;
		width: 480upx;
		color: #FDC621;
		font-size: 34upx;
		margin: auto;
	}

	.ot-advant-main {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.grace-list{
		width: 100%;
		margin-top: 15upx;
	}
	.grace-list > .items > .body > .title > .text{
		font-size: 32upx;
		color: #303030;
	}
	.grace-list > .items > .body > .desc{
		margin-top: 10upx;
		font-size: 27upx;
	}
</style>
