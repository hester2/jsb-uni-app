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

			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handClick" v-for="(item,index) in profileSend" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单编号:{{item.bianhao}}</view>
						<view class="demo7">{{item.state}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">型号:{{item.xinghao}}</view>
				<view class="ot-sales-lm">
					<view class="grace-space-between">
						<view class="demo6">订单类型：{{item.type}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">地址：{{item.address}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">数量：{{item.num}}吨</view>
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
				filterHeight: '100px',
				date1: '',
				show1: false,
				//被展示的菜单
				showingIndex: 0,
				//第二个选项相关
				orderIndex: 0,
				orderList: ['全部订单'],
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				dateValue: "请选择",
				profileSend: [{
					'id': 0,
					'bianhao': 'GG-1565925044971',
					'state': '未收货',
					'xinghao': '3,3',
					'type': '含税',
					'address': '湖北省武汉市蔡甸区',
					'num': '100吨',
					'time': '2019-08-16'
				}, {
					'id': 1,
					'bianhao': 'GG-1565925044971',
					'state': '未收货',
					'xinghao': '3,3',
					'type': '含税',
					'address': '湖北省武汉市蔡甸区',
					'num': '100吨',
					'time': '2019-08-16'
				}, {
					'id': 2,
					'bianhao': 'GG-1565925044971',
					'state': '未收货',
					'xinghao': '3,3',
					'type': '含税',
					'address': '湖北省武汉市蔡甸区',
					'num': '100吨',
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
					url: '../profileSendDetail/index'
				})
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			goback: function() {
				wx.navigateBack({});
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
	.grace-filter {
		top: 44px;
	}

	.ot-bg {
		height: 20upx;
		background-color: #eee;
	}

	.ot-sales-la {
		width: 100%;
		height: 100%;
		padding: 20upx 35upx;
		padding-top: 38upx;
		box-sizing: border-box;
	}

	.ot-sales-lx {
		width: 100%;
		box-sizing: border-box;
		padding-bottom: 10upx;
		border-radius: 10upx;
		border: 1px solid #ff5722;
		position: relative;
		margin-bottom: 38upx;
	}

	.ot-sales-lx .ot-image {
		position: absolute;
		top: -9px;
		left: -8px;
	}

	.ot-sales-lc {
		width: 100%;
		box-sizing: border-box;
		padding: 10upx 20upx;
		border-bottom: 1px solid #ff5722;
	}

	.ot-sales-lc .demo6 {
		font-size: 26upx;
	}

	.ot-sales-lc .demo7 {
		color: #ff5722;
		font-size: 24upx;
	}

	.ot-sales-ln {
		color: #646464;
		padding: 10upx 20upx;
	}

	.ot-sales-lm {
		padding: 10upx 20upx;
		box-sizing: border-box;
	}

	.ot-sales-lm .demo6 {
		color: #646464;
	}

	.ot-sales-lm .demo7 {
		background-color: #ff5722;
		color: #fff;
		box-sizing: border-box;
		padding: 0upx 20upx;
		border-radius: 40upx;
		font-size: 24upx;
		line-height: 38upx;
		height: 38upx;
		margin-top: 4upx;
	}

	.ot-sales-dast .demo6 {
		color: #f63f32;
	}

	.ot-sales-dast .demo7 {
		color: #b2b2b2;
	}

	.ot-sales-dast {
		padding: 10upx 20upx;
		box-sizing: border-box;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 20upx;
		box-sizing: border-box;
		padding: 0px 30upx;
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

	.grace-select-tags .input {
		width: 30%;
		text-align: center;
		border: 1px solid #ccc;
	}

	.ml .input {
		width: 71%;
		outline: none;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		padding: 0px 20upx;
		box-sizing: border-box;
		text-align: left;
	}

	.ml.grace-search-in {
		border-radius: 0upx;
		width: 78%;
		background-color: transparent;
		margin: 0px;
	}

	.grace-margin-top {
		margin-top: 0px;
	}

	.grace-form .grace-items .input {
		text-align: left;
		width: 70%;
		border: 1px solid #ccc;
		margin-left: 23upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.grace-filter .items {
		width: 50%;
	}

	.grace-filter .items:nth-of-type(1) {
		color: #ff5722;
	}

	.grace-select-tags {
		display: flex;
	}

	.ot-bottom {
		border-bottom: 1px solid #F1F2F3;
	}

	/* 	.grace-filter .items {
		display: block !important;
	} */
</style>
