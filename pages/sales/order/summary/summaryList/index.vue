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
				<!-- 筛选 start -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15upx 2%;">
								<view class="ot-sales-lr">
									<view class="grace-bold">销售日期</view>
									<view class="grace-search">
										<picker @change="bindDateChange" class="input" :value="dateValue" mode="date" name="beginTime" start="2018-01-01">
											<text>{{dateValue == null ? '请选择' : dateValue}}</text>
										</picker>
										<text class="text">至</text>
										<picker @change="bindEndChange" class="input" :value="endValue" mode="date" name="endTime" start="2018-01-01">
											<text>{{endValue == null ? '请选择' : endValue}}</text>
										</picker>
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
				<view class="line2">销量</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" v-for="(item,index) in order" :key="index" @tap="handleClick">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单编号:
							<text>{{item.bianhao}}</text>
						</view>
						<view class="demo7">{{item.state}}
						</view>
					</view>
				</view>
				<view class="ot-sales-ln">客户名称：{{item.customer}}</view>
				<view class="ot-sales-lm">
					<view class="grace-space-between">
						<view class="demo6">产地/型号：{{item.address}}/{{item.pro}}</view>
						<view class="demo7" :data-id="item.id" @tap.stop="handleChange">查看详情</view>
					</view>
				</view>
				<view class="ot-sales-ln">数量：{{item.num}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">含税/不含：{{item.tax}}</view>
						<view class="demo7">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				dateValue: null,
				endValue: null,
				menu1Show: false,
				menu1Top: 44,
				//被展示的菜单
				showingIndex: 0,
				//第二个选项相关
				orderIndex: 0,
				orderList: ["全部"],
				order: [{
					'id': 0,
					'bianhao': 'XS-15678945678',
					'state': '已审核',
					'customer': '业之峰',
					'address': '福联',
					'pro': '4980',
					'num': '1.6',
					'tax': '含税',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'bianhao': 'XS-15678945623',
					'state': '已发货',
					'customer': '业之峰',
					'address': '福联',
					'pro': '4980',
					'num': '1.6',
					'tax': '含税',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'bianhao': 'XS-15678945689',
					'state': '已审核',
					'customer': '业之峰',
					'address': '福联',
					'pro': '4980',
					'num': '1.6',
					'tax': '不含税',
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
						//console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		created() {
			_self = this
		},
		methods: {
			handleChange(e) {
				var id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../summaryDetail/index?daid=' + id,
				})
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
			//提交条件
			formsubmit: function(e) {
				//console.log(JSON.stringify(e.detail.value));
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
				this.dateValue = e.detail.value
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value
			},
			handleClick() {
				uni.navigateTo({
					url: '../salesDetail/index',
				})
			},

		},
		components: {
		},
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";
</style>
