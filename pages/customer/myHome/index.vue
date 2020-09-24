<template>
	<view class='contain'>
		<view class='ot-profile-pho'>
			<view class="ot-profile-ma">
				<image class="ot-profile-left" :src="user_info_photo==''?'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1870618891,1943968365&fm=26&gp=0.jpg':user_info_photo">
				</image>
				<view class="ot-profile-right">
					<text @tap="handleLogin" v-if="user_info_phoneno != '' ? true:false">{{user_info_phoneno}}</text>
					<text>{{user_info_titles}}</text>
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
		<!-- 客户 -->
		<view class="ot-profile-fp" v-if="hide_menu_cus==false||roles==''?false:true">
			<view class="ot-profile-an">
				<view class="ot-profile-fl">
					<text>账户管理</text>
					<text></text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<view @tap.stop="handleCon(0)">
								<view class="icon">
									<image :src="img+'geren4.png'"></image>
								</view>
								<view class="text">设置</view>
							</view>
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
							<view @tap="handleCon(1)">
								<view class="icon">
									<image :src="img+'geren5.png'"></image>
								</view>
								<view class="text">控制台</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleCon(2)">
								<view class="icon">
									<image :src="img+'geren6.png'"></image>
								</view>
								<view class="text">我的订单</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleCon(3)">
								<view class="icon">
									<image :src="img+'geren7.png'"></image>
								</view>
								<view class="text">联系人</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleCon(4)">
								<view class="icon">
									<image :src="img+'geren8.png'"></image>
								</view>
								<view class="text">我的客户</view>
							</view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<!-- 客服 -->
		<view class="ot-profile-fp" v-if="hide_menu_sales">
			<view class="ot-profile-an">
				<view class="ot-profile-fl">
					<text>账户管理</text>
					<text></text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<view @tap="handleSales(0)">
								<view class="icon">
									<image :src="img+'geren4.png'"></image>
								</view>
								<view class="text">设置</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ot-profile-an fp">
				<view class="ot-profile-fl">
					<text>常用功能</text>
					<text @tap="handleSales(1)">全部</text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<view @tap="handleSales(2)">
								<view class="icon">
									<image :src="img+'geren5.png'"></image>
								</view>
								<view class="text">控制台</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleSales(3)">
								<view class="icon">
									<image :src="img+'geren6.png'"></image>
								</view>
								<view class="text">销售订单</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleSales(4)">
								<view class="icon">
									<image :src="img+'geren7.png'"></image>
								</view>
								<view class="text">预付款订单</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleSales(5)">
								<view class="icon">
									<image :src="img+'geren8.png'"></image>
								</view>
								<view class="text">我的客户</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 我方物流 -->
		<view class="ot-profile-fp" v-if="hide_menu_our">
			<view class="ot-profile-an">
				<view class="ot-profile-fl">
					<text>账户管理</text>
					<text></text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<view @tap="handleOur(0)">
								<view class="icon">
									<image :src="img+'geren4.png'"></image>
								</view>
								<view class="text">设置</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="ot-profile-an fp">
				<view class="ot-profile-fl">
					<text>常用功能</text>
					<text @tap="handleOur(1)">全部</text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<view @tap="handleOur(2)">
								<view class="icon">
									<image :src="img+'geren5.png'"></image>
								</view>
								<view class="text">物流订单</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleOur(3)">
								<view class="icon">
									<image :src="img+'geren6.png'"></image>
								</view>
								<view class="text">采购订单</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleOur(4)">
								<view class="icon">
									<image :src="img+'geren7.png'"></image>
								</view>
								<view class="text">我的车辆</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleOur(5)">
								<view class="icon">
									<image :src="img+'geren8.png'"></image>
								</view>
								<view class="text">我的司机</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 第三方物流 -->
		<view class="ot-profile-fp" v-if="hide_menu_third">
			<view class="ot-profile-an">
				<view class="ot-profile-fl">
					<text>账户管理</text>
					<text></text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<navigator @tap="handleThird(0)">
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
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<view @tap="handleThird(1)">
								<view class="icon">
									<image :src="img+'geren5.png'"></image>
								</view>
								<view class="text">控制台</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleThird(2)">
								<view class="icon">
									<image :src="img+'geren6.png'"></image>
								</view>
								<view class="text">我的订单</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleThird(3)">
								<view class="icon">
									<image :src="img+'geren7.png'"></image>
								</view>
								<view class="text">我的车辆</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleThird(4)">
								<view class="icon">
									<image :src="img+'geren8.png'"></image>
								</view>
								<view class="text">我的司机</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 司机-->
		<view class="ot-profile-fp" v-if="hide_menu_driver">
			<view class="ot-profile-an">
				<view class="ot-profile-fl">
					<text>账户管理</text>
					<text></text>
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<navigator @tap="handleDriver(0)">
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
				</view>
				<view class="grace-body">
					<view class="grace-grids demoForIcon grace-margin-top">
						<view class="items">
							<view @tap="handleDriver(1)">
								<view class="icon">
									<image :src="img+'geren5.png'"></image>
								</view>
								<view class="text">控制台</view>
							</view>
						</view>
						<view class="items">
							<view @tap="handleDriver(2)">
								<view class="icon">
									<image :src="img+'geren6.png'"></image>
								</view>
								<view class="text">我的订单</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-null" v-if="roles==''?true:false">
			<telNull titleName="暂无网络连接"></telNull>
		</view>
	</view>
</template>

<script>
	import common from '../../../common/common.js'
	import telNull from '../../../components/telNull.vue'
	var _self;
	export default {
		components: {
			telNull
		},
		data() {
			return {
				hide_menu_cus: true,
				hide_menu_sales: false,
				hide_menu_our: false,
				hide_menu_third: false,
				hide_menu_driver: false,
				isShow: false,
				img: common.imageUrlPath,
				user_info_phoneno: '请点击登录',
				user_info_titles: '登录更精彩',
				user_info_photo: '',
				roles: ''
			}
		},
		onLoad() {
			var _self = this;
			console.log(_self.roles+'ffff')
			uni.getNetworkType({
				success: function(res) {
					if (res.networkType == 'none' || res.networkType == '2G') {
						_self.hide_menu_cus = false
						uni.showToast({
							icon: 'none',
							title: '暂无网络连接'
						})
					}
				}
			});
			uni.onNetworkStatusChange(function(res) {
				if (res.isConnected) {
					console.log(res.isConnected)
				} else {
					_self.hide_menu_cus = false
					uni.showToast({
						icon: 'none',
						title: '暂无网络连接'
					})
				}
			});
			uni.getStorage({
				key: 'phoneno',
				success(res) {
					var data = res.data;
					if (data != null) {
						_self.user_info_titles = "欢迎"
					}
				}
			})
			uni.request({
				url: _self.$webUrl + "/user/getRoles",
				data: {
					phone: uni.getStorageSync("phoneno")
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.roles = res.data
					if (_self.roles == "3") {
						_self.hide_menu_cus = true;
					} else if (_self.roles == 6 || _self.roles == 60 || _self.roles == 61) {
						_self.hide_menu_sales = true;
						_self.hide_menu_cus = false
					} else if (_self.roles == "50") {
						_self.hide_menu_our = true;
						_self.hide_menu_cus = false
					} else if (_self.roles == "5") {
						_self.hide_menu_third = true;
						_self.hide_menu_cus = false
					} else if (_self.roles == "51") {
						_self.hide_menu_driver = true;
						_self.hide_menu_cus = false
					}
				},
				fail() {
					_self.hide_menu_cus = false
					uni.showToast({
						icon: 'none',
						title: '暂无网络连接'
					})
				}
			})

		},
		mounted() {
			_self = this;
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {
					_self.user_info_phoneno = res.data
					this.$token = _self.user_info_phoneno
				}
			});
		},
		onShow() {
			_self = this;
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {
					console.log(res);
					_self.user_info_phoneno = res.data
					this.$token = _self.user_info_phoneno
				}
			});
			uni.getNetworkType({
				success: function(res) {
					console.log()
					if (res.networkType == 'none' || res.networkType == '2G') {
						_self.hide_menu_cus = false
						uni.showToast({
							icon: 'none',
							title: '暂无网络连接'
						})
					}
				}
			});
			uni.onNetworkStatusChange(function(res) {
				if (res.isConnected) {
			
				} else {
					_self.hide_menu_cus = false
					uni.showToast({
						icon: 'none',
						title: '暂无网络连接'
					})
				}
			
			});
		},
		methods: {
			fe() {
				this.$forceUpdate();
			},
			handleCon(o) {
				if (_self.roles == "") {
					uni.showToast({
						title: '正在连接网络..',
						icon: 'none'
					})
					return;
				}
				this.$token = _self.user_info_phoneno
				if (this.$token == null || this.$token == "请点击登录") {
					uni.showToast({
						title: '您的角色不是工厂',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../../login/index',
						});
					}, 1000);
					return
				} else {
					switch (o) {
						case 0:
							uni.navigateTo({
								url: '../setUp/grsetUp/index',
							});
							break;
						case 1:
							uni.navigateTo({
								url: '../console/index',
							});
							break;
						case 2:
							uni.navigateTo({
								url: '../myOrder/index',
							});
							break;
						case 3:
							uni.navigateTo({
								url: '../myContact/index',
							});
							break;
						case 4:
							uni.navigateTo({
								url: '../myCustomer/index',
							});
							break;
					}
				}


			},

			handleSales(o) {
				this.$token = _self.user_info_phoneno
				if (this.$token == null || this.$token == "请点击登录") {
					uni.showToast({
						title: '您的角色不是工厂',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../../login/index',
						});
					}, 1000);
					return
				} else {
					switch (o) {
						case 0:
							uni.navigateTo({
								url: '../../setUp/index',
							})

							break;
						case 1:
							uni.navigateTo({
								url: '../../sales/menu/index',
							});

							break;
						case 2:
							uni.navigateTo({
								url: '../../sales/main/console/index',
							});

							break;
						case 3:
							uni.navigateTo({
								url: '../../sales/order/sales/salesList/index',
							});

							break;
						case 4:
							uni.navigateTo({
								url: '../../sales/order/money/moneyList/index',
							});
							break;
						case 5:
							uni.navigateTo({
								url: '../../sales/customer/customerList/index',
							});
							break;
					}
				}
			},

			handleOur(o) {
				this.$token = _self.user_info_phoneno
				if (this.$token == null || this.$token == "请点击登录") {
					uni.showToast({
						title: '您的角色不是工厂',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../../login/index',
						});
					}, 1000);
					return
				} else {
					switch (o) {
						case 0:
							uni.navigateTo({
								url: '../../ourLogistics/setUp/grsetUp/index',
							})

							break;
						case 1:
							uni.navigateTo({
								url: '../../ourLogistics/menu/index',
							});

							break;
						case 2:
							uni.navigateTo({
								url: '../../ourLogistics/order/logistics/logisticsList/index',
							});

							break;
						case 3:
							uni.navigateTo({
								url: '../../ourLogistics/order/procurement/procurementList/index',
							});

							break;
						case 4:
							uni.navigateTo({
								url: '../../ourLogistics/vehicle/carList/index',
							});
							break;
						case 5:
							uni.navigateTo({
								url: '../../ourLogistics/driver/driverList/index',
							});
							break;
					}
				}
			},
			handleThird(o) {
				this.$token = _self.user_info_phoneno
				if (this.$token == null || this.$token == "请点击登录") {
					uni.showToast({
						title: '您的角色不是工厂',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../../login/index',
						});
					}, 1000);
					return
				} else {
					switch (o) {
						case 0:
							uni.navigateTo({
								url: '../../thirdLogistics/setUp/grsetUp/index',
							})

							break;
						case 1:
							uni.navigateTo({
								url: '../../thirdLogistics/main/console/index',
							});

							break;
						case 2:
							uni.navigateTo({
								url: '../../thirdLogistics/order/myOrder/index',
							});

							break;
						case 3:
							uni.navigateTo({
								url: '../../thirdLogistics/vehicle/carList/index',
							});
							break;
						case 4:
							uni.navigateTo({
								url: '../../thirdLogistics/driver/driverList/index',
							});
							break;
					}
				}
			},
			handleDriver(o) {
				this.$token = _self.user_info_phoneno
				if (this.$token == null || this.$token == "请点击登录") {
					uni.showToast({
						title: '您的角色不是工厂',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../../login/index',
						});
					}, 1000);
					return
				} else {
					switch (o) {
						case 0:
							uni.navigateTo({
								url: '../../driver/setUp/grsetUp/index',
							})

							break;
						case 1:
							uni.navigateTo({
								url: '../../driver/main/console/index',
							});

							break;
						case 2:
							uni.navigateTo({
								url: '../../driver/order/myOrder/index',
							});

							break;
					}
				}
			},

			handelClick() {
				uni.navigateTo({
					url: '../../information/index?getid=0',
				});
			},
			handleLogin() {
				if (_self.user_info_phoneno == '请点击登录') {
					uni.navigateTo({
						url: '../../login/index',
					});
				} else {
					return false
				}

			},
		},
		
	}
</script>

<style>
	@import "../../../common/css/myHome.css";
	
	.contain{
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
	
	.grace-null{
		margin-top: 100px;
	}

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
		line-height: 88rpx;
		font-size: 45rpx;
	}

	.gd-console-fe {
		flex: 10;
		color: #fff;
		text-align: center;
		line-height: 88rpx;
		font-size: 34rpx;
	}

	.gd-console-fr {
		flex: 1;
	}

	.gd-console-fr image {
		width: 45rpx;
		height: 45rpx;
		display: block;
		margin-top: 6rpx;
		margin-right: 8rpx;
	}
</style>
