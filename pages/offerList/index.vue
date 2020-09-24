<template>
	<view class="contain">
		<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
		<view class="grace-filter" id="grace-filter-header">
			<view class="items" @tap.stop='showOptions1'>{{categoryList[orderIndex].category}}
				<text class="grace-icons icon-arrow-down"></text>
			</view>
			<view class="items" @tap.stop='changePriceOrder'>
				价格
				<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/asc.png" mode="widthFix" v-if="priceOrder == 1"></image>
				<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/desc.png" mode="widthFix" v-if="priceOrder == 2"></image>
			</view>
			<view class="items" @tap.stop='showOptions99'>筛选
				<text class="grace-icons icon-filter"></text>
			</view>
			<view class='grace-filter-options' style="max-height:200px;" v-if="showingIndex == 1">
				<view v-for="(item, index) in categoryList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
				 @tap='changeOrder' :data-itemid="index">
					{{item.category}}
					<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
				</view>
			</view>
			<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
			 @touchmove.stop="" v-if="showingIndex == 99">
				<form @submit='formsubmit' @reset='formReset'>
					<scroll-view scroll-y="true" :style="{'height':filterHeight}">
						<view style="width:96%; padding:15upx 2%;">
							<view class="ot-sales-lr">
								<view class="grace-bold">供应商</view>
								<view class="grace-search">
									<view class="grace-search-in">
										<view class="input">
											<input type="search" name="supplierName" placeholder="请输入" />
										</view>
									</view>
								</view>
							</view>
							<view class="ot-sales-lr">
								<view class="grace-bold">时间日期</view>
								<view class="grace-search-in ">
									<view class="input">
										<picker @change="bindDateChange" :value="dateValue" mode="date" name="date" start="2018-01-01" end="2022-01-01">
											<text>{{dateValue == null ? '请选择' : dateValue}}</text>
										</picker>
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
		<view class="ot-bg"></view>
		<view class="ot-offer-qn">
			<view class="grace-margin" v-for="(item,index) in offerList" :key="index">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>{{item.category}}·{{item.variety}}·{{item.area}}·{{item.CODE}}</text>
								<text class="grace-icons">{{item.time}}</text>
							</view>
							<view class="info">
								<text>￥{{item.tax_price}}</text>
								<text>{{item.trade_type}} {{item.transport_type}}</text>
							</view>
							<view class="content">
								<text>{{item.num}}吨</text>
								<view class="ot-hold-fl">
									<view @tap.stop="handleDg(item.id)">立即订购</view>
									<view>委托洽淡</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				date1: '',
				show1: false,
				menu1Show: false,
				menu1Top: 44,
				showingIndex: 0,
				orderIndex: 0,
				categoryList: [{
					category: '全部'
				}],
				//价格排序
				priceOrder: 1,
				offerList: [{
					id: 0,
					title: '聚乙烯',
					pro: 'LLDPE',
					dizhi: '福联',
					du: '7042',
					time: '2019-10-11',
					price: '7800',
					fahuo: '款到发货',
					peisong: '配送',
					num: '35'
				}, {
					id: 1,
					title: '聚乙烯',
					pro: 'LLDPE',
					dizhi: '福联',
					du: '7042',
					time: '2019-10-11',
					price: '7800',
					fahuo: '款到发货',
					peisong: '配送',
					num: '35'
				}, {
					id: 2,
					title: '聚乙烯',
					pro: 'LLDPE',
					dizhi: '福联',
					du: '7042',
					time: '2019-10-11',
					price: '7800',
					fahuo: '款到发货',
					peisong: '配送',
					num: '35'
				}, {
					id: 3,
					title: '聚乙烯',
					pro: 'LLDPE',
					dizhi: '福联',
					du: '7042',
					time: '2019-10-11',
					price: '7800',
					fahuo: '款到发货',
					peisong: '配送',
					num: '35'
				}],
				user_info_name: null,
				dateValue: null
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
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		onShow() {
			_self = this;
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {
					_self.user_info_name = res.data
				}
			});
		},
		onLoad() {
			var _self = this;
			//uni.startPullDownRefresh();
			uni.startPullDownRefresh({
				success: function(res) {}
			});
			uni.request({
				url: _self.$webUrl + "/getSupplierQuoteList",
				success(res) {
					var data = res.data
					_self.offerList = data;
				}
			})
			uni.request({
				url: _self.$webUrl + "/categoryList",
				success(res) {
					_self.categoryList = _self.categoryList.concat(res.data)
				}
			})
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh(); //停止下拉刷新动画
			}, 1000);
		},
		methods: {
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			handleDg(e) {
				_self = this;
				_self.$token = _self.user_info_name
				var roles;
				uni.request({
					url: _self.$webUrl + "/user/getRoles",
					data: {
						phone: uni.getStorageSync("phoneno")
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						roles = res.data
					}
				})
				if (_self.$token == null) {
					uni.showToast({
						title: '您的角色不是工厂',
						icon: 'none'
					})
					setTimeout(function() {
						uni.navigateTo({
							url: '../login/index',
						});
					}, 1000);
					return
				} else if (roles == "3") {
					uni.navigateTo({
						url: '../customer/addOrder/index?daId=' + e,
					});
				} else if (roles == "6" || roles == "60" || roles == "61") {
					uni.navigateTo({
						url: '../sales/main/addOrder/index?daId=' + e,
					});
				} else {
					uni.showToast({
						title: '您的角色不是工厂',
						icon: 'none'
					})
				}
				console.log(roles)
			},
			changeOrder: function(e) {
				var _self = this;
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				var category = _self.categoryList[tapIndex].category
				if (tapIndex == 0) {
					category = ''
				}
				console.log(this.orderIndex)
				uni.request({
					url: _self.$webUrl + "/getSupplierQuoteList",
					data: {
						category: category
					},
					success(res) {
						var data = res.data
						_self.offerList = data
					}
				})
				_self.page = 1
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
			//价格排序
			changePriceOrder: function() {
				var _self = this
				if (this.priceOrder == 1) {
					this.priceOrder = 2;
				} else {
					this.priceOrder = 1;
				}
				uni.request({
					url: _self.$webUrl + "/getSupplierQuoteList",
					data: {
						priceOrder: _self.priceOrder
					},
					success(res) {
						var data = res.data
						_self.offerList = data
					}
				})
				_self.page = 1
			},
			formsubmit: function(e) {
				var _self = this
				var formData = e.detail.value
				_self.showingIndex = 0;
			},
			//重置表单
			formReset: function() {

				_self.showingIndex = 0;
				this.getList();
			},
			closeAll: function() {
				this.showingIndex = 0;
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
		},
		components: {}
	}
</script>

<style>
	.contain {
		width: 100%;
		height: 100%;
	}

	.ot-f {
		/* margin-top: 88upx; */
	}

	.ot-bg {
		height: 20upx;
		background-color: #e0e0e0;
	}

	.orderImg {
		margin-top: 30upx;
		width: 40upx;
		height: 40upx !important;
	}

	image {
		height: 40upx;
		width: 40upx;
	}

	.ot-offer-qn {
		width: 100%;
		height: 100%;
		margin-top: 20upx;
	}

	.ot-offer-qn .grace-margin:nth-of-type(1) {
		border-top: 0px solid #f5f6f8;
	}

	.ot-offer-qn .grace-margin {
		margin: 0px;
		width: 100%;
		height: 180upx;
		padding: 0px 30upx;
		box-sizing: border-box;
		border-top: 1px solid #f5f6f8;
	}

	.ot-offer-qn .grace-margin:last-of-type {
		border-bottom: 2upx solid #ccc;
	}

	.ot-offer-qn .grace-comments {
		padding: 0px;
	}

	.ot-offer-qn .grace-comments .items {
		margin: 0px 0px;
	}

	.grace-comments .header text {
		color: #ff5722;
		font-size: 30upx;
	}

	.grace-comments .header text.grace-icons {
		color: #ccc;
		font-size: 30upx;
	}

	.grace-comments .info text:nth-of-type(1) {
		color: red;
		font-size: 28upx;
	}

	.grace-comments .info text:nth-of-type(2) {
		margin-right: 160upx;
		font-size: 28upx;
	}

	.grace-comments .content {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		line-height: 1.5em;
		justify-content: space-between;
		margin-top: 10upx;
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
		margin-right: 20upx;
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

	.ot-xf {
		position: fixed;
		right: 20upx;
		bottom: 40upx;
		width: 120upx;
		height: 120upx;
		background-color: #FF5722;
		border-radius: 50%;
	}

	.ot-xf image {
		width: 60upx;
		height: 60upx;
		display: block;
		margin: auto;
		margin-top: 30upx;
	}

	.ml input {
		width: 70%;
		outline: none;
		border: 1px solid #ccc;
		height: 60upx;
		line-height: 60upx;
		box-sizing: border-box;
		padding-left: 25upx;

	}




	.grace-search {
		width: 100%;
	}



	.grace-margin-top {
		margin-top: 0px
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

	.grace-checked {
		background-color: #FF5722 !important;
	}

	.grace-filter {
		top: 88upx;
	}

	.grace-filter .items {
		width: 33.33%;
	}

	.ot-sales-lr {
		display: flex;
		box-sizing: border-box;
		padding: 18upx 25upx;
		border-bottom: 1px solid #eee;
	}

	.grace-bold {
		width: 20%;
	}

	.ot-sales-lr .grace-items .input {
		text-align: right;
		color: #666;
		font-size: 28upx;
		margin-right: 0px;
	}

	.ot-sales-lr .grace-items {
		width: 80%;
	}

	.ot-sales-lr .grace-search-in>.input {
		text-align: right;
		color: #666;
		margin-right: 0px;
	}
</style>
