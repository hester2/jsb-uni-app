<template>
	<view class="conainer">
		<view class="ot-f">
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
							<view style="width:96%; padding:15upx 2%;">
								<view class="ot-sales-lr">
									<view class="grace-bold">型号</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="bindPickerChange" :value="genderIndex" :range="genders" :range-key="'product'" name="gender">
													<text>{{genders[genderIndex].product}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">销售日期</view>
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

								<view class="ot-sales-lr">
									<view class="grace-bold">请选择客服</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="bindCusChange" :value="cusIndex" :range="cus" :range-key="'name'" name="cus">
													<text>{{cus[cusIndex].name}}</text>
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
			</view>
			<view style="margin-top:51px;"></view>
		</view>
		<view class="ot-bg"></view>
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
			<view class="ot-home-qx mn">
				<text></text>
				<text>统计</text>
			</view>
			<view class="grace-box-banner ot-bottom grace-border-radius-small">
				<view class="garce-items">
					<view class="line1">{{total_price}}
						<text>元</text>
					</view>
					<view class="line2">总计</view>
				</view>
				<view class="garce-items">
					<view class="line1">{{total_num}}
						<text>吨</text>
					</view>
					<view class="line2">销量</view>
				</view>
			</view>
			<view class="ot-bg"></view>
			<view class="ot-sales-la">
				<view class="ot-sales-lx" @tap="handleClick(item.id)" v-for="(item,index) in order" :key="item.id">
					<image class="ot-image" :src="img+'qian.png'"></image>
					<view class="ot-sales-lc">
						<view class="grace-space-between">
							<view class="demo6">订单编号:{{item.order_no}}</view>
							<view class="demo7">{{item.state}}</view>
						</view>
					</view>
					<view class="ot-sales-ln">客户：{{item.customer_name}}</view>
					<view class="ot-sales-ln">客服：{{item.salesman_name}}</view>
					<view class="ot-sales-ln">产地/型号：{{item.area}}/{{item.code}}</view>
					<view class="ot-sales-ln">付款：{{item.amount_receivable}}</view>
					<view class="ot-sales-ln">数量：{{item.num}}</view>
					<view class="ot-sales-ln">单价：{{item.price}}</view>
					<view class="ot-sales-dast">
						<view class="grace-space-between">
							<view class="demo6">总金额：{{item.total_price}}</view>
							<view class="demo7">{{item.sale_time.substring(0,10)}}</view>
						</view>
					</view>
				</view>
				<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	import graceLoading from "../../../../../graceUI/components/graceLoading.vue";
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		components: {
			graceLoading,
		},
		data() {
			return {
				bgColor: '#fff',
				img: common.imageUrlPath,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				dateValue: null,
				endValue: null,
				filterHeight: '100px',
				tabHeight: 300,
				//被展示的菜单
				showingIndex: 0,
				orderIndex: 0,
				orderList: ['全部'],
				cateIndex: 0,
				cateList: ['状态', '已付款', '未付款', '已开票', '未开票', '已审核', '未审核', '已取消'],
				priceOrder: 1,
				genderIndex: 0,
				gender: [{
					product: '请选择型号'
				}],
				cusIndex: 0,
				cus: [{
					name: '请选择客服'
				}],
				order: [],
				total_price: '',
				total_num: '',
				account: '',
				bill: '',
				page: 1,
				state: '',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
				genderTmp: [{
					product: '请选择型号'
				}],
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
		created() {
			console.log(this.gender[this.genderIndex].product)
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			uni.request({
				url: this.$webUrl + "/logistics/saleOrders",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var numberFormat = function(value) {
						var param = {};
						var k = 10000,
							sizes = ['', '万', '亿', '万亿'],
							i;
						if (value < k) {
							param.value = value
							param.unit = ''
						} else {
							i = Math.floor(Math.log(value) / Math.log(k));

							param.value = ((value / Math.pow(k, i))).toFixed(2);
							param.unit = sizes[i];
						}
						return param;
					}
					_self.order = res.data.list
					var data_s = numberFormat(res.data.totalPrice)
					var data_o = numberFormat(res.data.totalNum)
					_self.total_price = data_s.value + data_s.unit
					_self.total_num = data_o.value + data_o.unit;
					console.log()
					if (_self.order.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (_self.order.length > 0 && _self.order.length < 15) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['已加载全部']
							_self.loadings = ''
						}, 500)
					}
				}
			})
			uni.request({
				url: this.$webUrl + "/logistics/saleProductList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					res.data.map(item => {
						item.product = item.area + "," + item.code
					})
					_self.gender = res.data
				}
			})
			uni.request({
				url: this.$webUrl + "/logistics/salesmanList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},

				success(res) {
					var data = res.data
					_self.cus = _self.cus.concat(data)
				}
			})
		},
		computed: {
			genders: function() {
				return _self.genderTmp.concat(_self.gender.sort(function(x, y) {
					return x["product"].localeCompare(y["product"])
				}))
			},
		},
		methods: {
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value;
			},
			handleClick(e) {
				uni.navigateTo({
					url: '../salesDetail/index?id=' + e + "&t=1",
				});
			},
			bindPickerChange: function(e) {
				this.genderIndex = e.detail.value
			},
			bindCusChange: function(e) {
				console.log(e);
				this.cusIndex = e.detail.value
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				uni.request({
					url: this.$webUrl + "/logistics/saleOrders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var numberFormat = function(value) {
							var param = {};
							var k = 10000,
								sizes = ['', '万', '亿', '万亿'],
								i;
							if (value < k) {
								param.value = value
								param.unit = ''
							} else {
								i = Math.floor(Math.log(value) / Math.log(k));

								param.value = ((value / Math.pow(k, i))).toFixed(2);
								param.unit = sizes[i];
							}
							return param;
						}
						_self.order = res.data.list
						var data_s = numberFormat(res.data.totalPrice)
						var data_o = numberFormat(res.data.totalNum)
						_self.total_price = data_s.value + data_s.unit
						_self.total_num = data_o.value + data_o.unit;
						if (_self.order.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.order.length > 0 && _self.order.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})

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
				_self.account = "";
				_self.bill = ""
				_self.state = ""
				var tapIndex = e.target.dataset.itemid;
				this.cateIndex = tapIndex;
				this.showingIndex = 0;
				if (tapIndex == 1) {
					_self.account = "已到账"
				} else if (tapIndex == 2) {
					_self.account = "未到账"
				} else if (tapIndex == 3) {
					_self.bill = "已开票"
				} else if (tapIndex == 4) {
					_self.bill = "未开票"
				} else if (tapIndex == 5) {
					_self.state = "已审核"
				} else if (tapIndex == 6) {
					_self.state = "未审核"
				} else if (tapIndex == 7) {
					_self.state = "已取消"
				}
				uni.request({
					url: this.$webUrl + "/logistics/saleOrders",
					data: {
						account: _self.account,
						bill: _self.bill,
						state: _self.state
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var numberFormat = function(value) {
							var param = {};
							var k = 10000,
								sizes = ['', '万', '亿', '万亿'],
								i;
							if (value < k) {
								param.value = value
								param.unit = ''
							} else {
								i = Math.floor(Math.log(value) / Math.log(k));

								param.value = ((value / Math.pow(k, i))).toFixed(2);
								param.unit = sizes[i];
							}
							return param;
						}
						_self.order = res.data.list
						var data_s = numberFormat(res.data.totalPrice)
						var data_o = numberFormat(res.data.totalNum)
						_self.total_price = data_s.value + data_s.unit
						_self.total_num = data_o.value + data_o.unit;
						if (res.data.list.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (res.data.list.length > 0 && res.data.list.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
				_self.page = 1

			},
			formsubmit: function(e) {
				var formData = e.detail.value
				console.log(formData)
				formData.product = _self.genders[_self.genderIndex].product
				formData.salesman = _self.cus[_self.cusIndex].name
				if (formData.beginTime == 0) {
					formData.beginTime = ""
				}
				if (formData.endTime == 0) {
					formData.endTime = ""
				}
				if (_self.genderIndex == 0) {
					formData.product = ""
				}
				if (_self.cusIndex == 0) {
					formData.salesman = ""
				}
				uni.request({
					url: this.$webUrl + "/logistics/saleOrders",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var numberFormat = function(value) {
							var param = {};
							var k = 10000,
								sizes = ['', '万', '亿', '万亿'],
								i;
							if (value < k) {
								param.value = value
								param.unit = ''
							} else {
								i = Math.floor(Math.log(value) / Math.log(k));

								param.value = ((value / Math.pow(k, i))).toFixed(2);
								param.unit = sizes[i];
							}
							return param;
						}
						_self.order = res.data.list
						var data_s = numberFormat(res.data.totalPrice)
						var data_o = numberFormat(res.data.totalNum)
						_self.total_price = data_s.value + data_s.unit
						_self.total_num = data_o.value + data_o.unit;
						if (res.data.list.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (res.data.list.length > 0 && res.data.list.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
				var gp = this.endValue
				_self.showingIndex = 0;
				_self.page = 1
			},
			//重置表单
			formReset: function() {
				_self.dateValue = null
				_self.endValue = null
				_self.genderIndex = 0
				_self.cusIndex = 0
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			scrollend(e) {
				var _self = this
				_self.page++;
				this.loadingType = 1;
				uni.request({
					data: {
						phone: uni.getStorageSync("phoneno"),
						page: _self.page,
						product: _self.gender[_self.genderIndex].product,
						salesMan: _self.cus[_self.cusIndex].name,
						beginTime: _self.dateValue,
						endTime: _self.endValue
					},
					url: _self.$webUrl + "/logistics/saleOrders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var data = res.data
						_self.order = _self.order.concat(data.list)
						_self.loadingType = 0;
						_self.loadingText = ['正在加载.....']
						var timer;
						clearTimeout(_self.timer)
						if (data.list.length == 0) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
			},
		},
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";

	.ls .input:nth-of-type(2) {
		margin-left: 25upx;
	}

	.ls .input:nth-of-type(1) {
		margin-left: 10upx;
	}

	.grace-filter .items {
		display: block;
		width: 33.33% !important;
	}

	.grace-filter.ot-date .items {
		display: flex !important;
	}

	.ot-sales-lc .demo6 {
		font-size: 26upx;
	}

	.grace-null {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}



	.grace-filter .items {
		width: 29.5%;
	}

	.orderImg {
		margin-top: 15px;
	}

	.ot-color {
		color: #ff5722;
	}

	.grace-filter {
		border-bottom: 0px solid #f2f3f4;
	}

	.grace-filter .items image {
		display: block;
		margin-top: 22upx;
		width: 50upx;
		height: 50upx;
	}

	.grace-filter .icons {
		width: 7%;
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
		margin-left: 23upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.ot-order-btn {
		width: 100%;
		box-sizing: border-box;
		padding: 0px 60upx;
	}

	.ot-order-btn button {
		margin: 0px;
		border-radius: 40upx;
		margin-right: 25upx;
		background-color: #ff5722 !important;
	}

	.ot-order-btn button[size=mini] {
		line-height: 45upx;
		padding: 0px 15upx;
	}

	.grace-filter-options {
		top: 100upx;
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
		text-align: left;
		padding: 0upx 20upx;
	}

	/* 页面个性化样式 */

	.demo2 {
		position: relative;
	}
</style>
