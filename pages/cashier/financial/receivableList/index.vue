<template>
	<view class="">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
			<view class="grace-filter" id="grace-filter-header">
				<view class="items ot-color" @tap='showOptions1'>{{orderList[orderIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
				</view>
				<!-- 第一个选项 -->
				<view class='grace-filter-options' style="max-height:200px;" v-if="showingIndex == 1">
					<view v-for="(item, index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
					 @tap='changeOrder' :data-itemid="index">
						{{item}}<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
					</view>
				</view>
				<!-- 第二个选项 -->
				<view class='grace-filter-options' v-if="showingIndex == 2" style="max-height:200px;">
					<view :class="[index ==  orderIndex ? 'option current' : 'option']" v-for="(item, index) in orderList" :key="index"
					 @tap='changeOrder' :data-itemid="index">
						{{item}}<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
					</view>
				</view>
				<!-- 筛选 start -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15upx 2%;">
								<view class="grace-bold">销售日期</view>
								<view style='padding:20upx 0;' class="grace-select-tags ls">
									<picker @change="bindDateChange" class="input" :value="dateValue" mode="date" name="bd" start="2018-01-01">
										<text>{{dateValue == null ? '请选择' : dateValue}}</text>
									</picker>
									<picker @change="bindEndChange" class="input" :value="endValue" mode="date" name="hd" start="2018-01-01">
										<text>{{endValue == null ? '请选择' : endValue}}</text>
									</picker>
								</view>
								<view class="grace-bold">客服</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-search">
										<view class="grace-search-in ml">
											<input type="text" class="input" value="" />
										</view>
									</view>
								</view>
							</view>
						</scroll-view>
						<!-- 按钮  -->
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
			<!-- grace filter end -->
			<view style="margin-top:51px;"></view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-home-qx mn">
			<text></text>
			<text>统计</text>
		</view>
		<view class="grace-box-banner ot-bottom grace-border-radius-small">
			<view class="garce-items">
				<view class="line1">641533.38
					<text>元</text>
				</view>
				<view class="line2">总金额</view>
			</view>
			<view class="garce-items">
				<view class="line1">78.92
					<text>吨</text>
				</view>
				<view class="line2">总量</view>
			</view>
		</view>
		<view class="grace-box-banner grace-border-radius-small">
			<view class="garce-items">
				<view class="line1">98,500.00
					<text>元</text>
				</view>
				<view class="line2">已收账款</view>
			</view>
			<view class="garce-items">
				<view class="line1">362,390.00
					<text>元</text>
				</view>
				<view class="line2">未收账款</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in account" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单号:
							<text>{{item.danhao}}</text>
						</view>
						<view class="demo7">

						</view>
					</view>
				</view>
				<view class="ot-sales-ln">产地/型号：{{item.address}}/{{item.pro}}</view>
				<view class="ot-sales-ln">类型：{{item.type}}</view>
				<view class="ot-sales-ln ml">
					<view class="grace-space-between">
						<view class="demo6">数量：{{item.num}}</view>
						<view class="demo7" @tap.stop="handleChange">明细</view>
					</view>
				</view>
				<view class="ot-sales-ln">待收金额：{{item.daishou}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">总金额：{{item.price}}</view>
						<view class="demo7">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import graceDate from '../../../../graceUI/components/graceDate.vue'
	import common from '../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				dateValue: null,
				endValue: null,
				date1: '',
				show1: false,
				menu1Show: false,
				menu1Top: 44,
				//被展示的菜单
				showingIndex: 0,
				//第二个选项相关
				orderIndex: 0,
				orderList: ['全部订单'],
				account: [{
					'id': 0,
					'danhao': 'XS_15678967894',
					'address': '大庆',
					'pro': '6097',
					'type': '含税',
					'num': '10',
					'daishou': '0',
					'price': '70,0000',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'danhao': 'XS_15678967894',
					'address': '大庆',
					'pro': '6097',
					'type': '含税',
					'num': '10',
					'daishou': '0',
					'price': '70,0000',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'danhao': 'XS_15678967894',
					'address': '大庆',
					'pro': '6097',
					'type': '含税',
					'num': '10',
					'daishou': '0',
					'price': '70,0000',
					'time': '2019-08-16'
				}]
			}
		},
		onReady: function() {
			_self = this;
			uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					//获取头部标题高度
					uni.createSelectorQuery().select('#grace-filter-header').fields({
						size: true,
					}, function(res) {
						if (!res) {
							return;
						}
						var sHeight = (windowHeight - res.height);
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},

		created() {
			_self = this
		},
		methods: {
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				this.getList();
			},
			showOptions1: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 1;
			},
			showOptions99: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 99;
			},
			//提交条件
			formsubmit: function(e) {
				console.log(JSON.stringify(e.detail.value));
				uni.showModal({
					title: '请观察控制台',
					content: '条件以表单形式提交 ^_^'
				});
				_self.showingIndex = 0;
			},
			//重置表单
			formReset: function() {
				_self.showingIndex = 0;
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value;
			},
			handleClick() {
				uni.navigateTo({
					url: '../../order/sales/salesList/index'
				})
			},
			handleChange() {
				uni.navigateTo({
					url: '../receivableDetail/index'
				})
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			bindServiceChange: function(e) {
				console.log(e);
				this.serviceIndex = e.detail.value
			},
		},
		components: {
			graceDate
		},
	}
</script>

<style>
	@import "../../../../common/css/orderList.css";

	.ls .input {
		margin-left: 25upx;
	}

	.ml .demo7 {
		background-color: #ff5722;
		color: #fff;
		padding: 0px 15rpx;
		box-sizing: border-box;
		border-radius: 40rpx;
		height: 37rpx;
		line-height: 37rpx;
		font-size: 27rpx;
	}

	.ot-sales-ln .demo6 {
		color: #646464
	}
</style>
