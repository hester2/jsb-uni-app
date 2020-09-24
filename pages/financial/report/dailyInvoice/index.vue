<template>
	<view class="container">
		<view class="status_bar"></view>
		<view class="gd-console-fo" id="grace-filter-header">
			<view class=" gd-console-fs icons grace-icons icon-arrow-left grace-white" @tap="goback"></view>
			<view class="gd-console-fe">发票明细表</view>
			<view class="gd-console-fr grace-icons icon-filter" @tap.stop='showOptions99'></view>
			<!-- 筛选 start -->
			<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
			 @touchmove.stop="" v-if="showingIndex == 99">
				<form @submit='formsubmit' @reset='formReset'>
					<scroll-view scroll-y="true" :style="{'height':filterHeight}">
						<view style="width:96%; padding:15rpx 2%;">
							<view class="ot-sales-lr">
								<view class="grace-bold">型号</view>
								<view class="grace-search">
									<view class="grace-search-in">
										<view class="input">
											<picker @change="bindPickerChange" :value="genderIndex" :range="gender" :range-key="'product'" name="gender">
												<text>{{gender[genderIndex].product}}</text>
											</picker>
										</view>
									</view>
								</view>
							</view>
							<view class="ot-sales-lr">
								<view class="grace-bold">销售日期</view>
								<view class="grace-search">
									<picker @change="bindDateChange" class="input" :value="dateValue" mode="date" name="startTime">
										<text>{{dateValue == null ? '请选择' : dateValue}}</text>
									</picker>
									<text class="text">至</text>
									<picker @change="bindEndChange" class="input" :value="endValue" mode="date" name="endTime">
										<text>{{endValue == null ? '请选择' : endValue}}</text>
									</picker>
								</view>
							</view>
							<view class="ot-sales-lr">
								<view class="grace-bold">请选择客服</view>
								<view class="grace-search">
									<view class="grace-search-in">
										<view class="input">
											<picker :range="cus" @change="bindCusChange" :value="cusIndex" name="cus">
												<text>{{cus[cusIndex]}}</text>
											</picker>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class='grace-filter-buttons'>
						<view>
							重置
							<button form-type='reset'>重置</button>
						</view>
						<view>
							确定
							<button form-type='submit'>确定</button>
						</view>
					</view>
				</form>
			</view>
			<!-- 筛选 end -->
		</view>
		<view style="padding:10upx 25rpx;">
			<graceNavBar :margin='45' activeColor="#ff5722" activeLineBg="linear-gradient(to right, #FF8E68,#ff5722)" :items="tabs" :currentIndex="currentIndex"
			 @change="navChange"></graceNavBar>
		</view>
		<view class="ot-bg"></view>
		<view class="grace-flex-v1">
			<swiper :style="{height:mainHeight+'px'}" :current="currentIndex" @change="swiperChange">
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}">
						<view class="ot-scroll-main">
							<view class="ot-sales-la">
								<view class="ot-sales-lx">
									<image class="ot-image" :src="img+'qian.png'"></image>
									<view class="ot-sales-lc">
										<view class="grace-space-between">
											<view class="demo6">采购合同号:</view>
											<view class="demo7">含税</view>
										</view>
									</view>
									<view class="ot-sales-ln">采购日期：</view>
									<view class="ot-sales-ln">品名/产地/型号：</view>
									<view class="ot-sales-ln">供应商：</view>
									<view class="ot-sales-ln">数量：</view>
									<view class="ot-sales-ln">单价：</view>
									<view class="ot-sales-dast">
										<view class="grace-space-between">
											<view class="demo6">总金额: </view>
											<view class="demo7">2019-10-12</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}">
						<view class="ot-scroll-main">
							<view class="ot-sales-la">
								<view class="ot-sales-lx">
									<image class="ot-image" :src="img+'qian.png'"></image>
									<view class="ot-sales-lc">
										<view class="grace-space-between">
											<view class="demo6">采购合同号:</view>
											<view class="demo7">含税</view>
										</view>
									</view>
									<view class="ot-sales-ln">采购日期：</view>
									<view class="ot-sales-ln">品名/产地/型号：</view>
									<view class="ot-sales-ln">供应商：</view>
									<view class="ot-sales-ln">数量：</view>
									<view class="ot-sales-ln">单价：</view>
									<view class="ot-sales-dast">
										<view class="grace-space-between">
											<view class="demo6">总金额：</view>
											<view class="demo7">2019-10-12</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}">
						<view class="ot-scroll-main">
							<view class="ot-sales-la">
								<view class="ot-sales-lx">
									<image class="ot-image" :src="img+'qian.png'"></image>
									<view class="ot-sales-lc">
										<view class="grace-space-between">
											<view class="demo6">采购合同号:</view>
											<view class="demo7">含税</view>
										</view>
									</view>
									<view class="ot-sales-ln">采购日期：</view>
									<view class="ot-sales-ln">品名/产地/型号：</view>
									<view class="ot-sales-ln">供应商：</view>
									<view class="ot-sales-ln">数量：</view>
									<view class="ot-sales-ln">单价：</view>
									<view class="ot-sales-dast">
										<view class="grace-space-between">
											<view class="demo6">总金额：</view>
											<view class="demo7">2019-10-12</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}">
						<view class="ot-scroll-main">
							<view class="ot-sales-la">
								<view class="ot-sales-lx">
									<image class="ot-image" :src="img+'qian.png'"></image>
									<view class="ot-sales-lc">
										<view class="grace-space-between">
											<view class="demo6">采购合同号:</view>
											<view class="demo7">不税</view>
										</view>
									</view>
									<view class="ot-sales-ln">采购日期：2019-12-17</view>
									<view class="ot-sales-ln">品名/产地/型号：聚乙烯/茂名/5502</view>
									<view class="ot-sales-ln">
										<view class="grace-space-between">
											<view class="demo6">供应商: 叶海明</view>
											<view class="demo7" @tap="handleClick(0)">详情</view>
										</view>
									</view>
									<view class="ot-sales-ln">数量：32</view>
									<view class="ot-sales-ln">单价：7837.34</view>
									<view class="ot-sales-dast">
										<view class="grace-space-between">
											<view class="demo6">总金额：74500</view>
											<view class="demo7">2019-12-19</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}">
						<view class="ot-scroll-main">
							<view class="ot-sales-la">
								<view class="ot-sales-lx">
									<image class="ot-image" :src="img+'qian.png'"></image>
									<view class="ot-sales-lc">
										<view class="grace-space-between">
											<view class="demo6">采购合同号:</view>
											<view class="demo7">含税</view>
										</view>
									</view>
									<view class="ot-sales-ln">采购日期：2019-12-17</view>
									<view class="ot-sales-ln">品名/产地/型号：聚乙烯/茂名/5502</view>
									<view class="ot-sales-ln">
										<view class="grace-space-between">
											<view class="demo6">供应商: 叶海明</view>
											<view class="demo7" @tap="handleClick(1)">详情</view>
										</view>
									</view>
									<view class="ot-sales-ln">数量：32</view>
									<view class="ot-sales-ln">单价：7837.34</view>
									<view class="ot-sales-dast">
										<view class="grace-space-between">
											<view class="demo6">总金额：74500</view>
											<view class="demo7">2019-12-19</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item>
					<scroll-view scroll-y="true" :style="{height:mainHeight+'px'}">
						<view class="ot-scroll-main">
							<view class="ot-sales-la">
								<view class="ot-sales-lx">
									<image class="ot-image" :src="img+'qian.png'"></image>
									<view class="ot-sales-lc">
										<view class="grace-space-between">
											<view class="demo6">采购合同号:</view>
											<view class="demo7">含税</view>
										</view>
									</view>
									<view class="ot-sales-ln">采购日期：2019-12-17</view>
									<view class="ot-sales-ln">品名/产地/型号：聚乙烯/茂名/5502</view>
									<view class="ot-sales-ln">
										<view class="grace-space-between">
											<view class="demo6">客户: 福建省晋江市晋亿鞋材有限公司</view>
											<view class="demo7" @tap="handleClick(2)">详情</view>
										</view>
									</view>
									<view class="ot-sales-ln">数量：32</view>
									<view class="ot-sales-ln">单价：7837.34</view>
									<view class="ot-sales-dast">
										<view class="grace-space-between">
											<view class="demo6">总金额：74500</view>
											<view class="demo7">2019-12-19</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>

</template>
<script>
	import graceNavBar from "../../../../graceUI/components/graceNavBar.vue";
	import common from '../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				currentIndex: 0,
				tabs: ['销售明细', '现金明细', '发票库存', '预售明细', '实际库存', '真实预售'],
				mainHeight: 300,
				showingIndex: 0,
				cusIndex: 0,
				cus: ['请选择', '老张', '系统客服'],
				genderIndex: 0,
				gender: [{
					product: '请选择型号'
				}],
				dateValue: null,
				endValue: null
			}
		},
		onReady: function() {
			_self = this;
			uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					uni.createSelectorQuery().select('#grace-filter-header').fields({
						size: true,
					}, function(res) {
						if (!res) {
							return;
						}
						var sHeight = (windowHeight - res.height) - 10;
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		methods: {
			handleClick(o) {
				switch (o) {
					case 0:
						uni.navigateTo({
							url: '../dailyInvoiceDetail/index'
						})
					break;
					case 1:
					uni.navigateTo({
						uni:'../dailyInventoryDetail/index'
					})
					   
					break;
					case 2:
					   uni.navigateTo({
					   	uni:'../dailyMoneyDetail/index'
					   })
					break;
				}
			},
			goback() {
				_self.$router.go(-1)
			},
			bindEndChange: function(e) {
				_self.endValue = e.detail.value;
			},
			bindDateChange: function(e) {
				_self.dateValue = e.detail.value;
			},
			bindPickerChange: function(e) {
				_self.genderIndex = e.detail.value
			},
			bindCusChange: function(e) {
				_self.cusIndex = e.detail.value
			},
			showOptions99: function() {
				if (_self.showingIndex != 0) {
					_self.showingIndex = 0;
					return;
				}
				_self.showingIndex = 99;
			},
			formsubmit: function(e) {
				var formData = e.detail.value
				_self.showingIndex=0
			},
			formReset: function() {
				_self.endValue = null
				_self.dateValue = null
				_self.cusIndex = 0
				_self.genderIndex = 0
			},
			closeAll: function() {
				_self.showingIndex = 0;
			},
			navChange: function(e) {
				_self.currentIndex = e;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				_self.currentIndex = index;
			}
		},
		components: {
			graceNavBar
		}
	}
</script>
<style>
	@import "../../../../common/css/orderList.css";

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background-color: #fff;
	}

	.gd-console-fo {
		height: 88upx;
		line-height: 88upx;
		background-color: #fff;
		display: flex;
		box-sizing: border-box;
		padding: 0px 20rpx;
		border-bottom: 2upx solid #F8F8F8;
		/* padding-top: 40upx; */
	}

	.gd-console-fs {
		flex: 1;
		color: #707070 !important;
		line-height: 88upx;
		font-size: 45upx;
	}

	.gd-console-fe {
		flex: 10;
		color: #000;
		text-align: center;
		line-height: 88upx;
		font-size: 34upx;
	}

	.gd-console-fr {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.gd-console-fr.grace-icons {
		color: #707070;
		font-size: 36upx;
	}

	.gd-console-fr image {
		width: 45upx;
		height: 45upx;
		display: block;
		margin-top: 6upx;
		margin-right: 8upx;
	}

	.ot-bg {
		height: 20upx;
		background-color: #F9F9F9;
	}

	.ot-scroll-main {
		box-sizing: border-box;
		padding: 20upx 20upx;
	}

	.grace-space-between {
		display: flex;
		align-items: center;
	}

	.ot-sales-ln .demo7 {
		display: block;
		width: 80upx;
		text-align: center;
		background-color: #ff5722;
		color: #fff;
		border-radius: 20upx;
		height: 40upx;
		line-height: 40upx;
		font-size: 24upx;
	}
</style>
