<template>
	<view>
		<!-- grace filter start -->
		<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
		<view class="grace-filter" id="grace-filter-header">
			<view class="items" @tap.stop='showOptions1'>{{orderList[orderIndex]}}<text class="grace-icons icon-arrow-down"></text></view>

			<view class="items" @tap.stop='showOptions99'>筛选<text class="grace-icons icon-filter"></text></view>
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
								<view class="grace-bold">采购日期</view>
								<view class="grace-search">
									<picker @change="bindDateChange" class="input" :value="dateValue" mode="date" name="beginTime">
										<text>{{dateValue == null ? '请选择' : dateValue}}</text>
									</picker>
									<text class="text">至</text>
									<picker @change="bindEndChange" class="input" :value="endValue" mode="date" name="endTime">
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
		<view style="height:51px;"></view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in summary" :key="item.id">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">采购合同号:{{item.hetong}}</view>
						<view class="demo7">{{item.pro}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">采购员: {{item.caigou}}</view>
				<view class="ot-sales-ln">型号：{{item.product}}</view>
				<view class="ot-sales-ln">数量：{{item.num}}</view>
				<view class="ot-sales-ln">供应商：{{item.gongying}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">已关联：{{item.assio}}</view>
						<view class="demo7">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import common from '../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				showingIndex: 0,
				orderIndex: 0,
				orderList: ['全部', '含税对销售', '含税对现金', '不含对销售', '不含对现金'],
				filterHeight: '100px',
				dateValue: null,
				endValue: null,
				summary:[
					{
						'id':0,
						'hetong':'CG_1576131755907',
						'pro':'含税',
						'caigou':'钟总',
						'product':'M7100',
						'num':'10',
						'assio':'10',
						'gongying':'上海中晨电子商务股份有限公司',
						'time':'2019-10-09'
					}
				]
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
						var sHeight = (windowHeight - res.height - 5);
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		methods: {
			handleClick(){
				 uni.navigateTo({
				 	url:'../dailySummaryDetail/index'
				 })
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
			//提交条件
			formsubmit: function(e) {
				console.log(JSON.stringify(e.detail.value));
				_self.showingIndex = 0;
			},
			//重置表单
			formReset: function() {
				_self.showingIndex = 0;
			},

			closeAll: function() {
				this.showingIndex = 0;
			}
		}
	}
</script>
<style>
	@import "../../../../common/css/orderList.css";

	/* #ifdef  H5 */
	.grace-filter {
		top: 44px;
	}

	.grace-filter .items {
		width: 50%;
	}
	/*  #endif  */
</style>
