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
		<view class="ot-profile-fp">
			<view class="ot-profile-an">
				<view class="ot-profile-fl">
					<text>账户管理</text>
					<text>全部</text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<navigator url="../../setUp/index">
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
					<text @tap="handelMenu">全部</text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<navigator url="../main/historical/index">
								<view class="icon">
									<image :src="img+'geren5.png'"></image>
								</view>
								<view class="text">历史报价</view>
							</navigator>
						</view>
						<view class="items">
							<navigator url="../order/sales/salesList/index">
								<view class="icon">
									<image :src="img+'geren6.png'"></image>
								</view>
								<view class="text">销售订单</view>
							</navigator>
						</view>
						<view class="items">
							<navigator url="../order/money/moneyList/index">
								<view class="icon">
									<image :src="img+'geren7.png'"></image>
								</view>
								<view class="text">预付款订单</view>
							</navigator>
						</view>
						<view class="items">
							<navigator url="../customer/customerList/index">
								<view class="icon">
									<image :src="img+'geren8.png'"></image>
								</view>
								<view class="text">我的客户</view>
							</navigator>
						</view>
					</view>
				</view>
			</view>
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
			}
		},
		onLoad(){
			var _self = this;
			uni.getStorage({
					key:'phoneno',
					success(res){
						var data = res.data;
						//console.log(data)
						_self.user_info_phoneno = data;
					},
					fail(res){
						uni.navigateTo({
							url:'../../login/index'
						})
					}
			})
		},
		onLaunch() {
			uni.navigateTo({
				url: '../../index/index',
			});
		},
		methods: {
			handelMenu() {
				uni.navigateTo({
					url: '../menu/index',
				})
			},
			handelClick() {
				uni.navigateTo({
					url: '../../information/index?getid=0',
				});
			},
			handleLogin() {
				uni.navigateTo({
					url: '../../login/index',
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
</style>
