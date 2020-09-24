<template>
	<view class="">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
			<view class="grace-filter" id="grace-filter-header">
				<view class="items ot-color" @tap="handleMenu">{{orderList[orderIndex]}}
				</view>
				<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}
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
								<view class="ot-sales-lr">
									<view class="grace-bold">型号</view>
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindPickerChange" :value="genderIndex" :range="genders" :range-key="'code'" name="product">
													<text>{{genders[genderIndex].code}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>

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
								<view class="ot-sales-lr">
									<view class="grace-bold">客户</view>
									<view class="grace-search">
										<view class="grace-search-in ">
											<view class="input">
												<picker @change="bindServiceChange" :value="serviceIndex" :range="service" :range-key="'name'" name="customers">
													<text>{{service[serviceIndex].name}}</text>
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
					<view class="line2">总金额</view>
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
				<view class="ot-sales-lx" v-for="(item,index) in order" :key="index" @tap="handleClick(item.id)">
					<image class="ot-image" :src="img+'qian.png'"></image>
					<view class="ot-sales-lc">
						<view class="grace-space-between">
							<view class="demo6">订单编号:{{item.order_no}}</view>
							<view class="demo7">{{item.state}}</view>
						</view>
					</view>
					<view class="ot-sales-ln">客户名称:{{item.customer_name}}</view>
					<view class="ot-sales-ln">产地/型号：{{item.area}}/{{item.code}}</view>
					<view class="ot-sales-ln">数量：{{item.num}}</view>
					<view class="ot-sales-lm">
						<view class="grace-space-between">
							<view class="demo6">单价：{{item.price}}</view>
						</view>
					</view>
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
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	import graceLoading from "../../../../../graceUI/components/graceLoading.vue";
	import DateFormat from "../../../../../common/DateFormat.js";
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				dateValue: null,
				endValue: null,
				tabHeight: 300,
				menu1Show: false,
				menu1Top: 44,
				//被展示的菜单
				showingIndex: 0,
				orderIndex: 0,
				orderList: ['全部'],
				cateIndex: 0,
				cateList: ['状态', '已到账', '未到账', '已发货', '未发货'],
				genderIndex: 0,
				gender: [],
				genderTmp: [{
					code: '请选择型号'
				}],
				serviceIndex: 0,
				service: [{
					name: '请选择客户'
				}],
				order: [],
				total_price: '',
				total_num: '',
				page: 1,
				phone: '',
				state: 0,
				loadingText: ['正在加载.....', 'loading ......', '已加载全部'],
				loadingTypes: 0,
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
		onLoad() {
			_self = this
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			var dataFormat = new DateFormat()
			uni.getStorage({
				key: 'phoneno',
				success(res) {
					_self.phone = res.data
				}
			})

			uni.request({
				url: this.$webUrl + "/sale/findPreList",
				data: {
					phone: _self.phone
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
					var data = numberFormat(res.data.total_price)
					var data_o = numberFormat(res.data.total_num)
					_self.total_price = data.value + data.unit
					_self.total_num = data_o.value + data_o.unit
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
				url: this.$webUrl + "/sale/preSelectList",
				data: {
					phone: uni.getStorageSync("phoneno")
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var data = res.data
					_self.gender = _self.gender.concat(data.product)
					_self.service = _self.service.concat(data.customers)
				}
			})
		},
		created() {
			_self = this
		},
		computed: {
			genders: function() {
				return _self.genderTmp.concat(_self.gender.sort(function(x, y) {
					return x["code"].localeCompare(y["code"])
				}))
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value
			},
			scrollend() {
				_self.page++;
				this.loadingType = 1;
				uni.request({
					url: this.$webUrl + "/sale/findPreList",
					data: {
						phone: _self.phone,
						page: _self.page,
						customerName: _self.service[_self.serviceIndex],
						product: _self.gender[_self.genderIndex],
						productIndex: _self.genderIndex,
						customerIndex: _self.serviceIndex,
						state: _self.state
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var data = res.data
						_self.order = _self.order.concat(res.data.list)
						_self.page++;
						_self.loadingType = 0;
						_self.loadingText = ['正在加载.....']
						var timer;
						clearTimeout(_self.timer)
						console.log(data.list.length)
						if (data.list.length == 0) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				uni.request({
					url: this.$webUrl + "/sale/findPreList",
					data: {
						phone: _self.phone
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
						var data = numberFormat(res.data.total_price)
						var data_o = numberFormat(res.data.total_num)
						_self.total_price = data.value + data.unit
						_self.total_num = data_o.value + data_o.unit
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
				_self.cateIndex = tapIndex;
				_self.showingIndex = 0;
				_self.state = tapIndex
				uni.request({
					url: _self.$webUrl + "/sale/findPreList",
					data: {
						state: tapIndex,
						phone: uni.getStorageSync("phoneno")
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
						var data = res.data
						_self.order = data.list
						var data = numberFormat(res.data.total_price)
						var data_o = numberFormat(res.data.total_num)
						_self.total_price = data.value + data.unit
						_self.total_num = data_o.value + data_o.unit
					}
				})
				_self.page = 1;
			},
			formsubmit: function(e) {
				var formData = e.detail.value
				formData.phone = uni.getStorageSync("phoneno")
				formData.product = _self.genders[_self.genderIndex].code
				formData.customerName = _self.service[_self.serviceIndex].name
				formData.productIndex = _self.genderIndex
				formData.customerIndex = _self.serviceIndex
				if (formData.beginTime == 0) {
					formData.beginTime = ""
				}
				if (formData.endTime == 0) {
					formData.endTime = ""
				}
				uni.request({
					url: this.$webUrl + "/sale/findPreList",
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
						var data = res.data
						_self.order = data.list
						var data_s = numberFormat(data.total_price)
						var data_o = numberFormat(data.total_num)
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
				_self.showingIndex = 0;
			},
			formReset: function() {
				_self.dateValue = null
				_self.endValue = null
				_self.genderIndex = 0
				_self.serviceIndex = 0
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			handleMenu() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 1;
			},
			handleClick(e) {
				uni.navigateTo({
					url: '../moneyDetail/index?sId=' + e + '&tax=不含',
				})
			},
			bindPickerChange: function(e) {
				this.genderIndex = e.detail.value
			},
			bindServiceChange: function(e) {
				this.serviceIndex = e.detail.value
			},
		},
		components: {
			graceLoading,
		},
	}
</script>
<style>
	@import "../../../../../common/css/orderList.css";

	scroll-view {
		padding-bottom: 20px !important;
		box-sizing: border-box;
	}
</style>
