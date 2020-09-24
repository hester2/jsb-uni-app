<template>
	<view class="">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
			<view class="grace-filter ot-date" id="grace-filter-header">
				<view class="items" @tap.stop='showOptions2'>{{cateList[cateIndex]}}<text class="grace-icons icon-arrow-down"></text></view>
				<view class="items" @tap.stop='showOptions99'>筛选<text class="grace-icons icon-filter"></text></view>
				<!-- 第二个选项 -->
				<view class='grace-filter-options' v-if="showingIndex == 2" style="max-height:200px;">
					<view :class="[index ==  cateIndex ? 'option current' : 'option']" v-for="(item, index) in cateList" :key="index"
					 @tap='changeCate' :data-itemid="index">
						{{item}}<text class="grace-icons icon-right" v-if="index ==  cateIndex"></text>
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
								<view class="grace-bold">时间日期</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<form bindsubmit="formSubmit" class="grace-form grace-margin-top">
										<view class="grace-items">
											<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" />
										</view>
									</form>
								</view>
								<view class="grace-bold">客户</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindCusChange" :value="cusIndex" :range="cus" name="cus">
													<text>{{cus[cusIndex]}}</text>
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
						<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1" v-on:closeDate="closeDate1"></graceDate>
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
				<view class="line1">8
					<text>吨</text>
				</view>
				<view class="line2">数量</view>
			</view>
			<view class="garce-items">
				<view class="line1">8200
					<text>元</text>
				</view>
				<view class="line2">单价</view>
			</view>
			<view class="garce-items">
				<view class="line1">65600
					<text>元</text>
				</view>
				<view class="line2">金额</view>
			</view>
		</view>
		<view class="grace-box-banner grace-border-radius-small">
			<view class="garce-items">
				<view class="line1">0.00
					<text>吨</text>
				</view>
				<view class="line2">发票库存</view>
			</view>
			<view class="garce-items">
				<view class="line1">-829.38
					<text>元</text>
				</view>
				<view class="line2">库存成本</view>
			</view>
			<view class="garce-items">

			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-edit-of">
			<view class="ot-host-fl" v-for="(item,index) in customer" :key="index">
				<view class="grace-space-between">
					<view class="demo6 ot-size">客户：{{item.customer}}</view>
					<view class="demo7 ">
						<image :src="img+'guanlian1.png'" @tap="handleClick"></image>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">来款日期：{{item.time}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产地/型号：{{item.pro}}</view>
				</view>
				<view class="grace-space-between ot-edit-sart">
					<view class="demo6">金额: {{item.unit}}</view>
					<view class="demo7">{{item.state}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import graceDate from '../../../../../graceUI/components/graceDate.vue'
	import common from '../../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				date1: '点击选择',
				show1: false,
				showingIndex: 0,
				//第二个选项相关
				cateIndex: 0,
				cateList: ['已关联', '未关联', '已取消'],
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				cusIndex: 0,
				cus: ['请选择客户', '企业VIP客户', '厦门市华商有限公司'],
				getid: 0,
				customer: [{
					'id': 0,
					'customer': '厦门市华商有限公司',
					'time': '2019-09-05',
					'pro': '燕山/1C7A',
					'unit': '6000',
					'state': '已关联'
				}, {
					'id': 1,
					'customer': '厦门市华商有限公司',
					'time': '2019-09-05',
					'pro': '燕山/1C7A',
					'unit': '6000',
					'state': '已关联'
				}, {
					'id': 2,
					'customer': '厦门市华商有限公司',
					'time': '2019-09-05',
					'pro': '燕山/1C7A',
					'unit': '6000',
					'state': '已关联'
				}],
				filterHeight: '100px'
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
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../customerSubmit/index',
				})
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			bindCusChange: function(e) {
				console.log(e);
				this.cusIndex = e.detail.value
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
				uni.showModal({
					title: '请观察控制台',
					content: '条件以表单形式提交 ^_^'
				});
				_self.showingIndex = 0;
			},
			//重置表单
			formReset: function() {
				_self.genderIndex = 0
			},
			closeAll: function() {
				this.showingIndex = 0;
			},

		},
		components: {
			graceDate
		},
	}
</script>

<style>
	.grace-filter {
		top: 44px;
		background-color: #fff;
	}

	.grace-filter .items {
		display: block;
	}

	.grace-filter.ot-date .items {
		display: flex !important;
	}

	.ot-bg {
		width: 100%;
		height: 20upx;
		background-color: #eee;
	}

	.grace-filter .items:nth-of-type(1) {
		color: #FF4848;
	}

	.ml .input {
		width: 70%;
		outline: none;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		padding: 0px 20upx;
		margin-left: 16upx;
		box-sizing: border-box;
	}

	.grace-search {
		width: 75%;
		margin: 0px;
	}

	.ml.grace-search-in {
		border-radius: 0upx;
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
		margin-left: 16upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.grace-filter .items {
		width: 50%;
	}

	.ot-edit-of {
		box-sizing: border-box;
		padding: 25upx 30upx;

	}

	.ot-host-fl {
		box-sizing: border-box;
		padding: 5upx 20upx;
		background-color: #fff;
		margin-bottom: 25upx;
		border-radius: 10upx;
		box-shadow: 2upx 2upx 12upx #ccc;
	}

	.grace-space-between {
		margin: 15upx 0px;
	}

	.grace-space-between .demo6 {
		color: #414040;
	}

	.ot-size {
		font-size: 31upx;
	}

	.grace-space-between .demo7 image {
		width: 45upx;
		height: 45upx;
	}

	.ot-edit-sart .demo7 {
		color: #FF4848;
	}

	.ot-edit-col {
		margin-left: 147upx;
		color: #414040;
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
		padding-bottom: 0upx
	}

	.ot-bottom {
		border-bottom: 1px solid #F1F2F3;

	}

	.grace-box-banner .line1 {
		color: #FF5722;

	}

	.grace-border-radius-small {
		border-radius: 0upx;
	}

	.grace-box-banner .garce-items {
		padding-bottom: 30upx;
		width: 33.33%;
	}

	.grace-box-banner:nth-of-type(odd) {
		padding-top: 0px;
	}

	.grace-box-banner .garce-items:last-of-type {
		border: none;
	}
</style>
