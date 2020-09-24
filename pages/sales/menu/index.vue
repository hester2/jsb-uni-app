<template>
	<view class="grace-body">
		<view class="ot-menu-color">
			<view class="ot-profile-ma">
				<view class="ot-profile-left">
					<image :src="user_info_photo==''?'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1870618891,1943968365&fm=26&gp=0.jpg':user_info_photo" mode=""></image>
				</view>
				<view class="ot-profile-right">
					<text>{{user_info_phoneno}}</text>
					<text>{{user_info_titles}}</text>
				</view>
			</view>
		</view>
		<view class="grace-list">
			<navigator class="items" url="../main/console/index">
				<view class="grace-icons">
					<image :src="img+'icon-xs_1.png'" mode=""></image>
				</view>
				<view class="body">
					<view class="title">控制台</view>
				</view>
				<view class="arrow-right"></view>
			</navigator>
			<navigator class="items" url="../main/historical/index">
				<view class="grace-icons">
					<image :src="img+'icon-xs_2.png'" mode=""></image>
				</view>
				<view class="body">
					<view class="title">历史报价</view>
				</view>
				<view class="arrow-right"></view>
			</navigator>
		</view>
		<view class="ot-bg"></view>
		<view class="grace-list">
			<navigator class="items" url="../order/sales/salesList/index">
				<view class="grace-icons">
					<image :src="img+'icon-xs_3.png'" mode=""></image>
				</view>
				<view class="body">
					<view class="title">销售订单</view>
				</view>
				<view class="arrow-right"></view>
			</navigator>
			<navigator class="items" url="../order/money/moneyList/index">
				<view class="grace-icons">
					<image :src="img+'icon-xs_4.png'" mode=""></image>
				</view>
				<view class="body">
					<view class="title">预付款订单</view>
				</view>
				<view class="arrow-right"></view>
			</navigator>
			<navigator class="items" url="../order/summary/summaryList/index">
				<view class="grace-icons">
					<image :src="img+'icon-xs_5.png'" mode=""></image>
				</view>
				<view class="body">
					<view class="title">订单统计</view>
				</view>
				<view class="arrow-right"></view>
			</navigator>
		</view>

		<view class="ot-bg"></view>
		<view class="grace-list">
			<navigator class="items" url="../customer/customerList/index">
				<view class="grace-icons">
					<image :src="img+'icon-xs_6.png'" mode=""></image>
				</view>
				<view class="body">
					<view class="title">我的客户</view>
				</view>
				<view class="arrow-right"></view>
			</navigator>
			<navigator class="items" url="../customer/analysisList/index">
				<view class="grace-icons">
					<image :src="img+'icon-xs_7.png'" mode=""></image>
				</view>
				<view class="body">
					<view class="title">客户中心</view>
				</view>
				<view class="arrow-right"></view>
			</navigator>
		</view>

	</view>
</template>

<script>
	import common from '../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				user_info_photo:'',
				img: common.imageUrlPath,
				user_info_titles: '欢迎',
				user_info_phoneno:'',
			}
		},
		onLoad() {
			_self=this
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {
					_self.user_info_phoneno = res.data
					console.log(res.data);
				}
			});
			
		},
		methods: {
			
		}
	}
</script>

<style>
	page {
		background-color: #eee;
	}

	/* end */
	view,
	text {
		font-size: 32upx;
	}

	.grace-list {
		width: 100%;
		background-color: #fff;
		box-sizing: border-box;
		padding: 10upx 10upx;
	}

	.grace-list .items .grace-icons {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80upx;
		height: 80upx;
	}

	.grace-list .items .grace-icons image {
		width: 40upx;
		height: 40upx;
		display: block;
	}

	.grace-list>.items>.body {
		margin-left: 12upx;
	}

	.grace-body {
		width: 100%;
		padding: 0px;
		box-sizing: border-box;
	}

	.grace-margin-top {
		margin-top: 0px;
	}

	.ot-bg {
		background-color: #eee;
		height: 20upx;
	}

	.ot-home-qx {
		width: 3px;
		height: 20px;
		display: block;
		/* background-color: #009E94; */
		margin-right: 10px;
	}

	.ot-home-ql {
		flex: 10;
	}

	.grace-accordion-title {
		justify-content: flex-start;
		padding: 0px;
		width: 100%;
		box-sizing: border-box;
		padding-right: 25upx;
		align-items: center;
	}

	.ot-menu-color {
		background-color: #fff;
		box-sizing: border-box;
		padding: 10upx 20upx;
		background-image: url('http://assets.jinsubao.cn/pic-xs_1.png');
		background-size: cover;
		background-position-y: 84px;
	}

	.ot-profile-ma {
		width: 100%;
		overflow: hidden;
		/* background-color: pink; */
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		padding: 10upx 0 10upx 20upx;
		color: #e5015a !important;
		position: relative;
		color: #fff;
	}

	.ot-profile-left {
		border-radius: 50%;
		width: 120upx;
		height: 120upx;
		overflow: hidden;
		color: #000;
	}

	.ot-profile-left image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ot-profile-right {
		display: flex;
		flex-direction: column;
		margin-left: 25upx;
		color: #000;
		box-sizing: border-box;
		padding-top: 5upx;
	}

	.ot-profile-right text {
		font-size: 30upx;
		color: #fff;
	}
</style>
