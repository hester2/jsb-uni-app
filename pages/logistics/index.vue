<template>
	<view class="conainer">
		<view class="grace-body ot-logistics-fp">
			<view class="grace-grids demoForIcon grace-margin-top">
				<view class="items" @tap="handleClick(0)">
					<view>
						<view class="icon">
							<image :src="img+'icon-logis-1.png'"></image>
						</view>
						<view class="text">物流优势</view>
					</view>
				</view>
				<view class="items" @tap="handleClick(1)">
					<view>
						<view class="icon">
							<image :src="img+'icon-logis-2.png'"></image>
						</view>
						<view class="text">合作流程</view>
					</view>
				</view>
				<view class="items" @tap="handleClick(2)">
					<view>
						<view class="icon">
							<image :src="img+'icon-logis-3.png'"></image>
						</view>
						<view class="text">意见反馈</view>
					</view>
				</view>
				<view class="items" @tap="handleClick(3)">
					<view>
						<view class="icon">
							<image :src="img+'icon-logis-4.png'"></image>
						</view>
						<view class="text">联系我们</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-home-qx mn">
			<text></text>
			<text>统计</text>
		</view>
		<view class="grace-box-banner ot-bottom grace-border-radius-small">
			<view class="garce-items">
				<view class="line1">{{ct}}
					<text>单</text>
				</view>
				<view class="line2">运输单量</view>
			</view>
			<view class="garce-items">
				<view class="line1">{{cd}}
					<text>人</text>
				</view>
				<view class="line2">入驻司机</view>
			</view>
			<view class="garce-items">
				<view class="line1">{{cc}}
					<text>辆</text>
				</view>
				<view class="line2">认证车辆</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-logistics-qb">
			<view class="ot-home-qx mn ln">
				<text></text>
				<text>实时货源</text>
				<text @tap="handelList">更多>> </text>
			</view>
		</view>
		<view class="ot-logistics-gf">
			<view class="grace-margin" v-for="(item,index) in o" :key="index">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>{{item.from_area}}->{{item.to_area}}</text>
								<text class="grace-icons">{{item.release_date}}</text>
							</view>
							<view class="info">
								<text>运费:￥{{item.freight}}</text>
								<text>{{item.area}}·{{item.code}}</text>
							</view>
							<view class="content">
								<text>{{item.num}}吨</text>
								<view class="ot-hold-fl">
									<view @tap.stop="handleDg(item.id)">接单</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-logistics-qb">
			<view class="ot-home-qx mn ln">
				<text></text>
				<text>实时数据</text>
				<text> </text>
			</view>
		</view>
		<view class="ot-logistics-qd">
			<swiper class="swiper" circular="true" vertical="true" display-multiple-items="5" :indicator-dots="indicatorDots"
			 :autoplay="autoplay" :interval="interval" :duration="duration" next-margin="20px">
				<swiper-item class="ot-logistics-scllo ot-logistics-gf" @touchmove.stop="stopTouchMove" v-for="(item,index) in run"
				 :key="index">
					<view class="grace-margin">
						<view class="grace-comments">
							<view class="items">
								<view class="body">
									<view class="header ot-logistics-ife">
										<text>{{item.from_area}}->{{item.to_area}}</text>
										<text class="grace-icons">{{item.num}}吨</text>
									</view>
									<view class="header ot-logistics-ifo">
										<text>{{item.release_date}}</text>
										<text class="grace-icons">{{item.state}}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	var _self
	import common from '../../common/common.js'

	export default {
		data() {
			return {
				img: common.imageUrlPath,
				indicatorDots: false,
				autoplay: true,
				interval: 5000,
				duration: 500,
				run: '',
				cc: '',
				cd: '',
				ct: '',
				o: '',
				page: 1,
				roles: ''
			}
		},
		onLoad() {
			_self = this
			uni.request({
				url: this.$webUrl + "/iLogistics",
				success(res) {
					var data = res.data
					_self.run = data._running
					_self.cc = data.countCars
					_self.cd = data.countDrivers
					_self.ct = data.countTransport
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
				}
			})
			uni.request({
				url: this.$webUrl + "/logisticsOrderDataTable",
				data: {
					page: _self.page
				},
				success(res) {
					var data = res.data
					data.map(item => {
						if (item.freight == null) {
							item.freight = 0
						}
						item.from_area = item.from_area.split(',').slice(0, 2).join('-')
						item.to_area = item.to_area.split(',').slice(0, 2).join('-')
					})
					_self.o = data
					console.log(_self.o)
				}
			})
		},
		methods: {
			handleClick(o) {
				switch (o) {
					case 0:
						uni.navigateTo({
							url: '../logisticsAdvant/index'
						})
						break;
					case 1:
						uni.navigateTo({
							url: '../logisticsProcess/index'
						})
						break;
					case 2:
						uni.navigateTo({
							url: '../logisticsFeedback/index'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '../logisticsContact/index'
						})
						break;
				}
			},
			stopTouchMove() {
				return false;
			},
			handelList() {
				uni.navigateTo({
					url: '../logisticsList/index'
				})
			},
			handleDg(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认接单？',
					success: function(sm) {
						if (sm.confirm) {
							var phone = uni.getStorageSync('phoneno')
							var roles = _self.roles
							if (phone == null) {
								uni.showToast({
									title: '请先登录',
									icon: 'none'
								})
								return
							}
							if (roles != '51' & roles != '5' & roles != '50') {
								uni.showToast({
									title: '你不是司机或物流',
									icon: 'none'
								})
								return
							}
							console.log(roles+'')
							uni.request({
								url: _self.$webUrl + "/driver/subscribe",
								data: {
									id: e,
									phone: uni.getStorageSync('phoneno')
								},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res) {
									var data = res.data
									if (data.code == 0) {
										uni.showToast({
											title: data.msg
										})
									} else {
										uni.showToast({
											title: data.msg,
											icon: 'none'
										})
									}
								}
							})
						} else if (sm.cancel) {
						}
					}
				})
			}
		}
	}
</script>
<style>
	.ot-logistics-fp .grace-grids .icon {
		width: 85upx !important;
		height: 85upx !important;
	}

	.ot-logistics-fp .grace-grids .icon image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.ot-logistics-fp .grace-grids .text {
		margin-top: 10px;
		font-size: 14px;
	}

	.grace-body {
		padding: 0px;
	}

	.ot-bg {
		height: 20upx;
		background-color: #eee;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 20upx;
		box-sizing: border-box;
		padding: 0px 0upx;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 10upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx text:nth-of-type(3) {
		margin-left: 30upx;
	}

	.grace-box-banner {
		padding: 12upx 0;
		padding-bottom: 0upx;
	}

	.grace-box-banner .line1 {
		color: #ff5722;
	}

	.grace-border-radius-small {
		border-radius: 0upx;
	}

	.grace-box-banner .garce-items {
		padding-bottom: 30upx;
		width: 50%;
	}

	.grace-box-banner:nth-of-type(odd) {
		padding-top: 0px;
	}

	.ot-logistics-qb {
		text-align: center;
	}


	.ot-home-qx.ln {
		margin-bottom: 20upx;
	}

	.ot-home-qx.ln text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx.ln text:nth-of-type(2) {
		flex: 2;
		line-height: 35upx;
		height: 35upx;
		text-align: left;
	}

	.ot-home-qx.ln text:nth-of-type(3) {
		text-align: right;
		flex: 8;
		color: #ff5722;
		font-size: 24upx;
		padding-right: 20upx;
		box-sizing: border-box;
	}

	.ot-logistics-gf {
		width: 100%;
		margin-top: 20upx;
		height: auto;
		box-sizing: border-box;
	}

	.ot-logistics-gf .grace-margin:nth-of-type(1) {
		border-top: 0px solid #f5f6f8;
	}

	.ot-logistics-gf .grace-margin {
		margin: 0px;
		width: 100%;
		height: 170upx;
		padding: 0px 30upx;
		box-sizing: border-box;
		border-top: 1px solid #f5f6f8;
	}

	.ot-logistics-gf .grace-margin:last-of-type {
		border-bottom: 2upx solid #f5f6f8;
	}

	.ot-logistics-gf .grace-comments {
		padding: 0px;
	}

	.ot-logistics-gf .grace-comments .items {
		margin: 0px 0px;
		padding: 0px;
	}

	.grace-comments .header text {
		color: #ff5722;
		font-size: 30upx;
	}

	.grace-comments .header text:nth-of-type(1) {
		height: 50upx;
		line-height: 50upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.grace-comments .header text.grace-icons {
		color: #ccc;
		height: 50upx;
		line-height: 50upx;
		width: 160upx;
		text-align: right;
		font-size: 26upx;
	}

	.grace-comments .info {
		justify-content: flex-start;
	}

	.grace-comments .info text:nth-of-type(1) {
		color: red;
		font-size: 28upx;
		width: 42%;
	}

	.grace-comments .info text:nth-of-type(2) {
		font-size: 28upx;
		text-align: right;
		width: 30%;
	}

	.grace-comments .content {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		line-height: 1.5em;
		justify-content: space-between;
		margin-bottom: 0px;
	}

	.grace-comments .content text {
		font-size: 28upx;
	}

	.grace-comments .content view {
		font-size: 28upx;
	}

	.grace-comments .content view:nth-of-type(1) {
		color: #999999;
	}

	.grace-comments .content .ot-hold-fl {
		display: flex;
		justify-content: flex-end;
	}

	.grace-comments .content .ot-hold-fl view:nth-of-type(1) {
		background-color: #FF5722;
		color: #fff;
		box-sizing: border-box;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
		line-height: 17px;
		height: 20px;
	}

	.grace-comments .content .ot-hold-fl view:nth-of-type(2) {
		background-color: #FF5722;
		color: #fff;
		box-sizing: border-box;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
		line-height: 17px;
		height: 20px;
	}

	.ot-logistics-qd {
		width: 100%;
		height: 580upx;
		box-sizing: border-box;
		padding: 0upx 0upx;
		margin: 20upx 0px;
		overflow: hidden;
	}

	.ot-logistics-qd .swiper {
		height: 720upx;
		overflow: hidden;
		margin-bottom: 20upx;
	}

	.ot-logistics-scllo {
		height: 140upx !important;
		font-size: 26upx;
		float: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

	}

	.ot-logistics-scllo span {
		display: block;
		float: left;
		margin-top: 26upx;
		margin-right: 20upx;
		width: 10upx;
		height: 10upx;
		background-color: #797876;
		border-radius: 50%;
	}

	.ot-logistics-qd li {
		height: 30px;
	}

	.ot-logistics-ife text:nth-of-type(1) {
		color: #333333 !important;
		font-size: 28upx;
	}

	.header.ot-logistics-ife .grace-icons {
		color: #333333 !important;
	}

	.ot-logistics-ifo {
		margin-top: 10upx;
	}

	.ot-logistics-ifo text:nth-of-type(1) {
		color: #999999;
		font-size: 26upx;
	}

	.ot-logistics-ifo text:nth-of-type(2) {
		color: #52B83F !important;
		font-size: 24upx !important;
	}

	.ot-logistics-qd .grace-margin {
		border-bottom: 1px solid #f5f6f8;
	}

	.ot-logistics-qd .grace-margin:last-of-type {
		border-bottom: 0px solid #f5f6f8;
	}
</style>
