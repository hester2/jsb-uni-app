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
				<view class="items icons" @tap='showOptions3'>
					<image :src="img+'adds.png'" @tap.stop="showMenu1"></image>
				</view>
				<view class="demo1" id="demo-1">
					<gracePopupMenu :show="menu1Show" :bgColor="bgColor" :top="menu1Top" v-on:hideMenu="hideMenu">
						<view>
							<view class="menus ot-menus" @tap.stop="handleClick(0)">
								<image :src="img+'pic00.png'"></image> 历史采购
							</view>
							<view class="menus ot-menus ot-menu" @tap.stop="handleClick(1)">
								<image :src="img+'pic00_1.png'"></image> 当天汇总
							</view>
						</view>
					</gracePopupMenu>
				</view>
				<view class='grace-filter-options' v-if="showingIndex == 1">
					<view v-for="(item,index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
					 @tap='changeOrder' :data-itemid="index">
						{{item}}
						<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
					</view>
				</view>
				<view class='grace-filter-options' v-if="showingIndex == 2" style="max-height:150px;">
					<view :class="[index ==  cateIndex ? 'option current' : 'option']" v-for="(item, index) in cateList" :key="index"
					 @tap='changeCate' :data-itemid="index">
						{{item}}
						<text class="grace-icons icon-right" v-if="index ==  cateIndex"></text>
					</view>
				</view>
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
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :scroll-top="scrollTop" :style="{height:tabHeight+'px'}">
			<view class="ot-bg"></view>
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
				<view class="ot-sales-lx" @tap="handleClick(2,item.id)" v-for="(item,index) in order" :key="item.id">
					<image class="ot-image" :src="img+'qian.png'"></image>
					<view class="ot-sales-lc">
						<view class="grace-space-between">
							<view class="demo6">订单编号:
								<text>{{item.order_no}}</text>
							</view>
							<view class="demo7">{{item.state}}
								<view class="demo2" id="demo-2">
									<image :src="img+'dian1.png'" :data-name="item" @tap.stop="handleMenu(item)"></image>
									<gracePopupMenu :show="item.flag" :bgColor="bgColor" :top="menu2Top" :data-name="item" v-on:hideMenu="hideMenu1(item)">
										<view>
											<view class="menus ot-menus" @tap.stop="handleChange" :data-id="item.id">查看销售</view>
											<view class="menus ot-menus" @tap.stop="handleChange1" :data-id="item.id">关联销售</view>
										</view>
									</gracePopupMenu>
								</view>
							</view>
						</view>
					</view>
					<view class="ot-sales-ln">型号：{{item.area+","+item.code}}</view>
					<view class="ot-sales-lm">
						<view class="grace-space-between">
							<view class="demo6">供应商：{{item.supplier_name}}</view>
						</view>
					</view>
					<view class="ot-sales-ln">数量：{{item.num}}</view>
					<view class="ot-sales-dast">
						<view class="grace-space-between">
							<view class="demo6">总金额：{{item.total_price}}</view>
							<view class="demo7">{{item.supplier_time.substring(0,10)}}</view>
						</view>
					</view>
				</view>
				<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import gracePopupMenu from '../../../../../graceUI/components/gracePopupMenu.vue';
	import common from '../../../../../common/common.js'
	import graceLoading from "../../../../../graceUI/components/graceLoading.vue";
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		components: {
			gracePopupMenu,
			graceLoading,
		},
		data() {
			return {
				bgColor: '#fff',
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				img: common.imageUrlPath,
				dateValue: null,
				endValue: null,
				menu1Show: false,
				menu1Top: 44,
				filterHeight: '100px',
				showingIndex: 0,
				orderIndex: 0,
				tabHeight: 300,
				scrollTop: 0,
				orderList: ['全部'],
				cateIndex: 0,
				cateList: ['状态', '已付款', '未付款', '已开票', '未开票', '已审核', '未审核', '已取消'],
				genderIndex: 0,
				gender: [],
				genderTmp: [{
					product: '请选择型号'
				}],
				menu2Show: false,
				menu2Top: 30,
				order: [],
				total_price: '',
				total_num: '',
				page: 1,
				account: '',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
			}
		},
		onLoad() {
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			uni.request({
				url: this.$webUrl + "/logistics/supplierOrders",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				data: {
					phone: uni.getStorageSync("phoneno")
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
					_self.order = res.data.data.map(item => {
						item.flag = false
						return item
					})
					var data_s = numberFormat(res.data.totalPrice)
					var data_o = numberFormat(res.data.totalNum)
					_self.total_price = data_s.value + data_s.unit
					_self.total_num = data_o.value + data_o.unit
					// 判断为空显示
					if (res.data.data.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (res.data.data.length > 0 && res.data.data.length < 15) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['已加载全部']
							_self.loadings = ''
						}, 500)
					}
				}
			})
			uni.request({
				url: this.$webUrl + "/logistics/supplierSelectList",
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
		},
		computed: {
			genders: function() {
				return _self.genderTmp.concat(_self.gender.sort(function(x, y) {
					return x["product"].localeCompare(y["product"])
				}))
			},
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
		methods: {
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value;
			},
			handleChange(e) {
				var index = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../toSales/index?id=' + index,
				})
			},
			handleChange1(e) {
				var index = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../associatedSales/index?id=' + index,
				})
			},
			handleClick(o, e) {
				switch (o) {
					case 0:
						this.hideMenu()
						break;
					case 1:
						uni.navigateTo({
							url: '../procurementSummary/index',
						});
						break;
					case 2:
						uni.navigateTo({
							url: '../procurementDetail/index?id=' + e,
						});
						break;
				}
			},
			bindPickerChange: function(e) {
				this.genderIndex = e.detail.value
			},
			showMenu1: function(e) {
				if (this.menu1Show) {
					this.menu1Show = false;
					return;
				}
				let view = uni.createSelectorQuery().select("#demo-1");
				view.fields({
					size: true
				}, data => {
					this.menu1Show = true;
					this.menu1Top = data.height;
				}).exec();
			},
			hideMenu: function(e) {
				this.menu1Show = false;
			},
			handleMenu: function(o) {
				_self.menus = o
				_self.menus.flag = !_self.menus.flag
				return
				let view = uni.createSelectorQuery().select("#demo-2");
				view.fields({
					size: true
				}, data => {
					_self.menus.flag = true;
					this.menu2Top = data.height;
				}).exec();
			},

			hideMenu1: function(o) {
				_self.menus = o
				this.getList()

			},
			getList() {
				_self.menus.flag = !_self.menus.flag
				let view = uni.createSelectorQuery().select("#demo-2");
				view.fields({
					size: true
				}, data => {
					_self.menus.flag = false;
					this.menu2Top = data.height;
				}).exec();
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				// 全部订单
				uni.request({
					url: this.$webUrl + "/logistics/supplierOrders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					data: {
						phone: uni.getStorageSync("phoneno")
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
						_self.order = res.data.data.map(item => {
							item.flag = false
							return item
						})
						var data_s = numberFormat(res.data.totalPrice)
						var data_o = numberFormat(res.data.totalNum)
						_self.total_price = data_s.value + data_s.unit
						_self.total_num = data_o.value + data_o.unit
						// 判断为空显示
						if (res.data.data.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (res.data.data.length > 0 && res.data.data.length < 15) {
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
				var tapIndex = e.target.dataset.itemid;
				this.cateIndex = tapIndex;
				this.showingIndex = 0;
				if (tapIndex == 1) {
					_self.account = "已付款"
				} else if (tapIndex == 2) {
					_self.account = "未付款"
				}
				uni.request({
					url: this.$webUrl + "/logistics/supplierOrders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					data: {
						phone: uni.getStorageSync("phoneno"),
						account: _self.account
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
						_self.order = res.data.data.map(item => {
							item.flag = false
							return item
						})
						var data_s = numberFormat(res.data.totalPrice)
						var data_o = numberFormat(res.data.totalNum)
						_self.total_price = data_s.value + data_s.unit
						_self.total_num = data_o.value + data_o.unit
					}
				})
				_self.page = 1
			},
			// 提交表单
			formsubmit: function(e) {
				var formData = e.detail.value
				formData.account = _self.account
				formData.product = _self.genders[_self.genderIndex].product
				formData.productIndex = _self.genderIndex
				if (formData.beginTime == 0) {
					formData.beginTime = ""
				}
				if (formData.endTime == 0) {
					formData.endTime = ""
				}
				uni.request({
					url: _self.$webUrl + "/logistics/supplierOrders",
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
						_self.order = res.data.data.map(item => {
							item.flag = false
							return item
						})
						if (res.data.data.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (res.data.data.length > 0 && res.data.data.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
						var data_s = numberFormat(res.data.totalPrice)
						var data_o = numberFormat(res.data.totalNum)
						_self.total_price = data_s.value + data_s.unit
						_self.total_num = data_o.value + data_o.unit
					}
				})
				_self.showingIndex = 0;
				_self.page = 1
			},
			//重置表单
			formReset: function() {
				_self.dateValue = null
				_self.endValue = null
				_self.genderIndex = 0
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			handleAdd() {
				uni.navigateTo({
					url: '../addOrder/index',
				});
			},
			// 滚动
			scrollend(e) {
				var _self = this
				_self.page++;
				_self.loadingType = 1;
				uni.request({
					url: this.$webUrl + '/logistics/supplierOrders',
					data: {
						account: _self.account,
						product: _self.gender[_self.genderIndex].product,
						startTime: _self.dateValue,
						endTime: _self.endValue,
						page: _self.page
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.order = _self.order.concat(
							res.data.data.map(item => {
								item.flag = false
								return item
							})
						)
						_self.loadingType = 0;
						_self.loadingText = ['正在加载.....']
						var data = res.data.data
						var timer;
						clearTimeout(_self.timer)
						if (data.length == 0) {
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

	.grace-null {
		width: 100%;
		justify-content: center;
		align-items: center;
	}

	.ls .input:nth-of-type(2) {
		margin-left: 25upx;
	}

	.ls .input:nth-of-type(1) {
		margin-left: 10upx;
	}

	.grace-filter .items {
		display: block;
	}

	.grace-filter.ot-date .items {
		display: flex !important;
	}

	.ot-sales-lc .demo6 {
		font-size: 26upx;
	}

	.ot-sales-lc .demo7 {
		color: #ff5722;
		font-size: 24upx;
		display: flex;
	}

	.ot-sales-lc .demo7 image {
		margin-left: 20upx;
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

	.ot-menu image {
		width: 30px;
		height: 20px;
		margin-left: -5px;
		margin-right: 5px;
	}
</style>
