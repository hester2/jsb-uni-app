<template>
	<view class="conainer">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
			<view class="grace-filter" id="grace-filter-header">
				<view class="items" @tap.stop='showOptions1'>{{orderList[orderIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>

				<view class="items" @tap.stop='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
				</view>
				<!-- 第一个选项 -->
				<view class='grace-filter-options' style="max-height:200px;" v-if="showingIndex == 1">
					<view v-for="(item, index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
					 @tap='changeOrder' :data-itemid="index">
						{{item}}
						<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
					</view>
				</view>

				<!-- 筛选 start -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15upx 2%;">

								<view class="grace-bold">型号</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
													<text>{{gender[genderIndex]}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="grace-bold">订单日期</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-form grace-margin-top">
										<view class="grace-items other">
											<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" />
										</view>
									</view>
									<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1" v-on:closeDate="closeDate1"></graceDate>
								</view>

								<view class="grace-bold">是否付款</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindServiceChange" :value="serviceIndex" :range="service" name="service">
													<text>{{service[serviceIndex]}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="grace-bold">是否开票</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindInvoiceChange" :value="invoiceIndex" :range="invoice" name="invoice">
													<text>{{invoice[invoiceIndex]}}</text>
												</picker>
											</view>
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
			<!-- 上面是一个展位的视图 其他内容这里开始 -->
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
				<view class="line2">总计</view>
			</view>
			<view class="garce-items">
				<view class="line1">78.92
					<text>吨</text>
				</view>
				<view class="line2">销量</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handClick" v-for="(item,index) in sales" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单编号:{{item.bianhao}}</view>
						<view class="demo7">{{item.state}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">型号:{{item.pro}}</view>
				<view class="ot-sales-lm">
					<view class="grace-space-between">
						<view class="demo6">订单类型：{{item.type}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">数量：{{item.num}}</view>
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
	import graceDate from '../../../graceUI/components/graceDate.vue'
	import common from '../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				date1: '点击选择',
				show1: false,
				//被展示的菜单
				showingIndex: 0,
				//第二个选项相关
				orderIndex: 0,
				orderList: ['全部订单'],
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				serviceIndex: 0,
				service: ['是否付款', '已付款', '未付款'],
				invoiceIndex: 0,
				invoice: ['是否开票', '已开票', '未开票'],
				dateValue: "请选择",
				filterHeight: '100px',
				sales: [{
					'id': 0,
					'bianhao': 'GG-1565925044971',
					'state': '已完成',
					'pro': '3,3',
					'type': '含税',
					'num': '100',
					'price': '600000',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'bianhao': 'GG-1565925044971',
					'state': '已完成',
					'pro': '3,3',
					'type': '含税',
					'num': '100',
					'price': '600000',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'bianhao': 'GG-1565925044971',
					'state': '已完成',
					'pro': '3,3',
					'type': '含税',
					'num': '100',
					'price': '600000',
					'time': '2019-08-16'
				}, {
					'id': 3,
					'bianhao': 'GG-1565925044971',
					'state': '已完成',
					'pro': '3,3',
					'type': '含税',
					'num': '100',
					'price': '600000',
					'time': '2019-08-16'
				}]
			}
		},
		created() {
			_self = this;
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
		methods: {
			handClick: function() {
				uni.navigateTo({
					url: '../salesOrderDetail/index'
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
			goback: function() {
				wx.navigateBack({});
			},

			bindInvoiceChange: function(e) {
				console.log(e);
				this.invoiceIndex = e.detail.value
			},
			closeDate1: function() {
				this.show1 = false;
			},
			showDate1: function() {
				this.show1 = true;
			},
			changeDate1: function(e) {
				this.date1 = e;
				this.show1 = false;
			},
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
			}
		},
		components: {
			graceDate
		},
	}
</script>

<style>
@import "../../../common/css/orderList.css";

/* 	.grace-filter .items {
		display: block !important;
	} */
</style>
