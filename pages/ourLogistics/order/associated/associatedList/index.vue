<template>
	<view class="">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop="nomove"></view>
			<view class="grace-filter ot-date " id="grace-filter-header">
				<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
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
								<view class="ot-sales-lr">
									<view class="grace-bold">型号</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="bindPickerChange" :value="genderIndex" :range="gender" :range-key="'product'" name="gender">
													<text>{{gender[genderIndex].product}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">订单号</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<input class="input" type="text" :value="order_no" name="orderNo" placeholder="请输入订单号" />
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">供应商</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<input class="input" type="text" :value="supplier_name" name="supplierName" placeholder="请输入供应商" />
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">销售日期</view>
									<view class="grace-search">
										<picker @change="bindDateChange" class="input" :value="dateValue" mode="date" name="startTime" start="2018-01-01">
											<text>{{dateValue == null ? '请选择' : dateValue}}</text>
										</picker>
										<text class="text">至</text>
										<picker @change="bindEndChange" class="input" :value="endValue" mode="date" name="endTime" start="2018-01-01">
											<text>{{endValue == null ? '请选择' : endValue}}</text>
										</picker>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">物流方式</view>
									<view class="grace-search">
										<view class="grace-search-in">
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
			<view style="margin-top:51px;"></view>
		</view>
		<view class="ot-bg"></view>
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handleClick(item.rid,item.type)" v-for="(item,index) in associated" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">供应商：{{item.supplier_name}}</view>
						<view class="demo7">{{item.state}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">采购单号：{{item.supplier_no}}</view>
				<view class="ot-sales-ln">产地/型号：{{item.area}}/{{item.code}}</view>
				<view class="ot-sales-ln">
					<view class="grace-space-between">
						<view class="demo6">关联数量：{{item.num}}</view>
						<view class="demo7" :data-id="item.rid" :data-type="item.type" @tap.stop="handleChange">取消关联</view>
					</view>
				</view>
				<view class="ot-sales-ln">销售单号：{{item.sale_no}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">客户：{{item.customer_name}}</view>
						<view class="demo7">{{item.sale_time.substring(0,10)}}</view>
					</view>
				</view>
			</view>
		</view>
		<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
		</scroll-view>
	</view>
</template>

<script>
	import common from '../../../../../common/common.js';
	import graceLoading from "../../../../../graceUI/components/graceLoading.vue";
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		components: {
			graceLoading
		},
		data() {
			return {
				img: common.imageUrlPath,
				show1: false,
				menu1Show: false,
				menu1Top: 44,
				showingIndex: 0,
				tabHeight:300,
				cateIndex: 0,
				cateList: ['全部', '销售订单', '预付款订单'],
				genderIndex: 0,
				gender: [{
					product: '请选择型号'
				}],
				serviceIndex: 0,
				service: ['请选择物流', '自提', '配送'],
				dateValue: null,
				endValue: null,
				associated: [],
				product: '',
				transport: '',
				type: '',
				supplier_name: '',
				order_no: '',
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
				page:1
			}
		},
		onLoad() {
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			uni.request({
				url: this.$webUrl + "/logistics/order/relatedOrders",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.associated = res.data.list
					if (_self.associated.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (_self.associated.length > 0 && _self.associated.length < 10) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['已加载全部']
							_self.loadings = ''
						}, 500)
					}
				}
			})
			uni.request({
				url: this.$webUrl + "/logistics/selectList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var list = res.data
					list.map(item => {
						item.product = item.area + "," + item.code
					})
					_self.gender = _self.gender.concat(list)
				}
			})
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
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		methods: {
			handleClick(e, d) {
				uni.navigateTo({
					url: '../associatedDetail/index?rid=' + e + "&type=" + d,
				})
			},
			handleChange(e) {
				var index = e.currentTarget.dataset.id;
				var type = e.currentTarget.dataset.type
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认取消关联',
					success: function(sm) {
						if (sm.confirm) {
							uni.request({
								url: _self.$webUrl + "/logistics/order/cancelrelatedOrder",
								data: {
									rid: index,
									type: type
								},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res) {
									if (res.statusCode == 200) {
										var data = res.data
										var msg;
										switch (data) {
											case 0:
												msg = "关联失败"
												break
											case 1:
												msg = "关联订单不存在"
												break
											case 2:
												msg = "销售订单不存在"
												break
											case 3:
												msg = "采购订单不存在"
												break
											case 5:
												msg = "关联成功"
												break
											default:
												break
										}
										uni.showToast({
											title: msg,
											icon: 'none'
										})
									}
								}
							})
						} else if (sm.cancel) {}
					}
				})
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value;
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
				_self.product = _self.gender[_self.genderIndex]
				if (_self.genderIndex == 0) {
					_self.product = ""
				}
				  
			},
			bindServiceChange: function(e) {
				console.log(e);
				this.serviceIndex = e.detail.value
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
				if (tapIndex == 0) {
					_self.type = ""
				} else if (tapIndex == 1) {
					_self.type = "fax"
				} else if (tapIndex == 2) {
					_self.type = "cash"
				}
				uni.request({
					url: this.$webUrl + "/logistics/order/relatedOrders",
					data: {
						type: _self.type,
						product: _self.product,
						startTime: _self.dateValue,
						endTime: _self.endValue,
						transport: _self.transport,
						orderNo:_self.order_no,
						supplierName:_self.supplier_name
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.associated = res.data.list
						if (_self.associated.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.associated.length > 0 && _self.associated.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
			},
			formsubmit: function(e) {
				var formData = e.detail.value
				formData.phone = uni.getStorageSync("phoneno")
				formData.orderType = _self.orderType
				_self.product = _self.gender[_self.genderIndex].product
				if (_self.genderIndex == 0) {
					_self.product = ""
				}
				formData.product = _self.product
				formData.ot = _self.orderType
				if (formData.startTime == 0) {
					formData.startTime = ""
				}
				if (formData.endTime == 0) {
					formData.endTime = ""
				}
				if (formData.service == 0) {
					_self.transport = ""
				} else if (formData.service == 1) {
					_self.transport = "自提"
				} else if (formData.service == 2) {
					_self.transport.transport = "配送"
				}
				formData.transport = _self.transport
				formData.type = _self.type
				_self.supplier_name=formData.supplierName
				_self.order_no=formData.orderNo
				uni.request({
					url: this.$webUrl + "/logistics/order/relatedOrders",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.associated = res.data.list.map(item => {
							item.flag = false
							return item
						})
						if (_self.associated.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.associated.length > 0 && _self.associated.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
				_self.showingIndex = 0;
			},
			//重置表单
			formReset: function() {
				_self.showingIndex = 0;
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			scrollend(e) {
				var _self = this
				this.loadingType = 1;
				if(_self.genderIndex==0){
					_self.product=""
				}
				if(_self.serviceIndex==0){
					_self.transport=""
				}
				_self.page++;
				
				uni.request({
					data: {
						type: _self.type,
						product: _self.product,
						transport: _self.transport,
						page: _self.page,
						startTime:_self.dateValue,
						endTime:_self.endValue,
						orderNo:_self.order_no,
						supplierName:_self.supplier_name
					},
					url: _self.$webUrl + "/logistics/order/relatedOrders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.loading = true;
						_self.associated = _self.associated.concat(
							res.data.list.map(item => {
								item.flag = false
								return item
							})
						)
						// _self.logistics = _self.logistics.concat(res.data)
						_self.loadingType = 0;
						_self.loadingText = ['正在加载.....']
						var data = res.data
						var timer;
						clearTimeout(_self.timer)
						if (data.length == 0) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
							}, 500)
						}
					}
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";

	.grace-null {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ot-sales-lc .demo7 image {
		margin-left: 20rpx;
	}

	.ot-sales-ln .demo7 {
		background-color: #FF5722;
		border-radius: 20rpx;
		padding: 0px 15rpx;
		height: 40rpx;
		line-height: 40rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.ot-sales-ln .demo6 {
		color: #646464;
	}

	.ls .input:nth-of-type(2) {
		margin-left: 25upx;
	}

	.ls .input:nth-of-type(1) {
		margin-left: 10upx;
	}

	.input {
		font-size: 28upx;
	}
</style>
