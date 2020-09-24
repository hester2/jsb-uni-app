<template>
	<view class="">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop="nomove"></view>
			<view class="grace-filter ot-date " id="grace-filter-header">
				<view class="items" @tap='showOptions1'>{{orderList[orderIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
				</view>
				<!-- 第一个选项 -->
				<view class='grace-filter-options' v-if="showingIndex == 1">
					<view v-for="(item,index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
					 @tap='changeOrder' :data-itemid="index">
						{{item}}
						<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
					</view>
				</view>
				<!-- 第二个选项 -->
				<view class='grace-filter-options' v-if="showingIndex == 2" style="max-height:150px;">
					<view :class="[index ==  cateIndex ? 'option current' : 'option']" v-for="(item, index) in cateList" :key="index"
					 @tap='changeCate' :data-itemid="index">
						{{item}}
						<text class="grace-icons icon-right" v-if="index ==  cateIndex"></text>
					</view>
				</view>
				<!-- 筛选 start -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15rpx 2%;">
								<view class="grace-bold">型号</view>
								<view style='padding:20rpx 0;' class="grace-select-tags">
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
								<view class="grace-bold">销售日期</view>
								<view style='padding:20rpx 0;' class="grace-select-tags">
									<picker @change="bindDateChange" class="fs" :value="dateValue" mode="date" name="bd" start="2018-01-01">
										<text>{{dateValue == null ? '请选择' : dateValue}}</text>
									</picker>
									至
									<picker @change="bindEndChange" class="fs" :value="endValue" mode="date" name="hd" start="2018-01-01">
										<text>{{endValue == null ? '请选择' : endValue}}</text>
									</picker>
								</view>

								<view class="grace-bold">客服</view>
								<view style='padding:20rpx 0;' class="grace-select-tags">
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
				<view class="line1">3346572.5
					<text>元</text>
				</view>
				<view class="line2">总金额</view>
			</view>
			<view class="garce-items">
				<view class="line1">410
					<text>吨</text>
				</view>
				<view class="line2">总量</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in sales" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单编号:{{item.bianhao}}</view>
						<view class="demo7">{{item.state}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">产地/型号：{{item.address}}/{{item.pro}}</view>
				<view class="ot-sales-ln">客服：{{item.customer}}</view>
				<view class="ot-sales-ln">数量：{{item.num}}</view>
				<view class="ot-sales-ln">单价：{{item.unit}}</view>
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
	import common from "../../../../../common/common.js"
	var _self;
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				//被展示的菜单
				showingIndex: 0,
				orderIndex: 0,
				orderList: ['全部订单'],
				//第二个选项相关
				cateIndex: 0,
				cateList: ['状态', '已到账', '未到账', '已开票', '未开票'],
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				serviceIndex: 0,
				service: ['请选择客服', '老张', '无'],
				dateValue: null,
				endValue:null,
				sales: [{
					'id': 0,
					'bianhao': 'XS-1565925044971',
					'state': '已完成',
					'address': '大庆',
					'pro': '6097',
					'customer': '老张',
					'num': '10',
					'unit': '7000',
					'price': '600000',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'bianhao': 'XS-1565925044971',
					'state': '已完成',
					'address': '大庆',
					'pro': '6097',
					'customer': '老张',
					'num': '10',
					'unit': '7000',
					'price': '600000',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'bianhao': 'XS-1565925044971',
					'state': '已完成',
					'address': '大庆',
					'pro': '6097',
					'customer': '老张',
					'num': '10',
					'unit': '7000',
					'price': '600000',
					'time': '2019-08-16'
				}]
			}
		},
		created() {
			_self = this
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
			handleClick() {
				uni.navigateTo({
					url: '../salesDetail/index',
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
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value;
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
			},
			showOptions1: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 1;
			},
			showOptions2: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 2;
			},
			showOptions99: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 99;
			},
			changeCate: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.cateIndex = tapIndex;
				this.showingIndex = 0;
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
			},
		},
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";
	.fs{
		width: 30.8%;
		border:1px solid #ccc;
		text-align: center;
		margin-left: 20upx;
	}
	.fs:first-of-type{
		margin-right: 20upx;
	}
</style>
