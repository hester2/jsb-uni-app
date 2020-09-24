<template>
	<view class='contain'>
		<view class='ot-profile-pho'>
			<view class="ot-profile-ma">
				<image class="ot-profile-left" :src="user_info_photo==''?'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1870618891,1943968365&fm=26&gp=0.jpg':user_info_photo">
				</image>
				<view class="ot-profile-right">
					<!-- <open-data type="userNickName" bindtap='djpersonal'></open-data> -->
					<text @tap="handleLogin" v-if="user_info_name != '' ? true:false">{{user_info_name}}</text>
					<text>{{user_info_phoneno}}</text>
				</view>
			</view>
			<view class="grace-nowrap grace-flex-center">
				<view>
					<text>0</text>
					<text>求购</text>
				</view>
				<view>
					<text>0</text>
					<text>供应</text>
				</view>
				<view>
					<text>0</text>
					<text>订阅</text>
				</view>
			</view>
			<view class="ot-profile-fo">
				<view class="ot-profile-fi">
					<text>【财经早读】2019.08.13 星期二</text>
					<text @tap="handelClick">查看更多>></text>
				</view>
			</view>
		</view>
		<!--  -->
		<view style="margin-top: 70upx;"></view>
		<!-- 角色登录 -->
		<view class="ot-profile-fp" v-if="display">
			<view class="ot-profile-an">
				<view class="ot-profile-fl">
					<text>账户管理</text>
					<text>全部</text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<navigator url="../setUp/grsetUp/index">
								<view class="icon">
									<image :src="img+'geren4.png'"></image>
								</view>
								<view class="text">设置</view>
							</navigator>
						</view>
					</view>
				</view>
			</view>
			<view class="ot-profile-an fp">
				<view class="ot-profile-fl">
					<text>常用功能</text>
					<text></text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<navigator url="../myQuotes/index">
								<view class="icon">
									<image :src="img+'geren5.png'"></image>
								</view>
								<view class="text">我的报价</view>
							</navigator>
						</view>
						<view class="items">
							<navigator url="../salesOrder/index">
								<view class="icon">
									<image :src="img+'geren6.png'"></image>
								</view>
								<view class="text">销售订单</view>
							</navigator>
						</view>
						<view class="items">
							<navigator url="../profileSend/index">
								<view class="icon">
									<image :src="img+'geren7.png'"></image>
								</view>
								<view class="text">派送订单</view>
							</navigator>
						</view>
						<view class="items">
							<navigator url="../profileWarehouse/index">
								<view class="icon">
									<image :src="img+'geren8.png'"></image>
								</view>
								<view class="text">我的仓库</view>
							</navigator>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 未登录 为空 -->
		<view class="ot-fill-fo" v-if="isShow">
			<graceEmpty text="暂无数据,请登录" iconType="4" iconSize="250" iconColor="#FFC0A8"></graceEmpty>
		</view>
	</view>
</template>

<script>
	import common from '../../../common/common.js'
	import graceEmpty from "../../../graceUI/components/graceEmpty.vue";
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				user_info_name: '请点击登录',
				user_info_phoneno: '登录更精彩',
				user_info_photo: '',
				display: true,
				isShow: false,
			}
		},
		methods: {
			handelClick() {
				uni.navigateTo({
					url: '../information/index?getid=0',
				});
			},
			handleLogin() {
				uni.navigateTo({
					url: '../login/index',
				});
			}
		},
		components: {
			graceEmpty
		}
	}
</script>

<style>
	@import "../../../common/css/myHome.css";

	.gd-console-fo {
		height: 140upx;
		line-height: 140upx;
		background-color: #E7412A;
		display: flex;
		box-sizing: border-box;
		padding: 0px 20rpx;
		padding-top: 40upx;
	}

	.gd-console-fs {
		flex: 1;
		color: #fff;
		line-height: 88upx;
		font-size: 45upx;
	}

	.gd-console-fe {
		flex: 10;
		color: #fff;
		text-align: center;
		line-height: 88upx;
		font-size: 34upx;
	}

	.gd-console-fr {
		flex: 1;
	}

	.gd-console-fr image {
		width: 45upx;
		height: 45upx;
		display: block;
		margin-top: 6upx;
		margin-right: 8upx;
	}
</style>
