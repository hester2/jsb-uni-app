<template>
	<view class="">
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
				<view class='grace-filter-options' v-if="showingIndex == 1" style="max-height:150px;">
					<view :class="[index ==  orderIndex ? 'option current' : 'option']" v-for="(item, index) in orderList" :key="index"
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
				<!-- 筛选 start  -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15rpx 2%;">
								<view class="ot-sales-lr">
									<view class="grace-bold">型号</view>
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindPickerChange" :value="genderIndex" :range="gender" :range-key="'product'" name="gender">
													<text>{{gender[genderIndex].product}}</text>
												</picker>
											</view>
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
										</picker>
										<text>{{endValue == null ? '请选择' : endValue}}</text>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class=" grace-bold ">物流方式</view>
									<view class="grace-search ">
										<view class="grace-search-in ml ">
											<view class="input">
												<picker @change="bindServiceChange" :value="serviceIndex" :range="service" name="service">
													<text>{{service[serviceIndex]}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">地区排序</view>
									<view class="grace-search">
										<view class="section section">
											<view class="body-view">
												<switch :checked="false" style="zoom:.7 " color="#FF5722 " @change="switch1Change" />
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
			<view style="margin-top:51px; "></view>
		</view>
		<view class="ot-bg "></view>
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
			<view class="ot-sales-la ">
				<view class="ot-sales-lx " @tap="handleClick" :data-id="(item.id)" v-for="(item,index) in logistics" :key="item.id">
					<image class="ot-image " :src="img+'qian.png'"></image>
					<view class="ot-sales-lc ">
						<view class="grace-space-between ">
							<view class="demo6 ">物流单号: {{item.order_no}}</view>
							<view class="demo7"> {{item.state}}</view>
						</view>
					</view>
					<view class="ot-sales-ln ">订单类型：{{item.order_type}}</view>
					<view class="ot-sales-ln ">采购单号：{{item.supplier_no}}</view>
					<view class="ot-sales-lm ot-sales-ln">
						<view class="grace-space-between">
							<view class="demo6 ">品名/型号：{{item.area}}/{{item.code}}</view>
							<view class="demo7 " @tap.stop="handleChange" :data-id="item.id">销售单号</view>
						</view>
					</view>
					<view class="ot-sales-ln ">装货地址：{{item.supplier_store_address}}</view>
					<view class="ot-sales-ln ot-sales-dast">
						<view class="grace-space-between ">
							<view class="demo6 ">数量：{{item.num}}</view>
							<view class="demo7 ">{{item.release_date}}</view>
						</view>
					</view>
				</view>
				<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import common from "../../../../common/common.js";
	import graceLoading from "../../../../graceUI/components/graceLoading.vue";
	var systemInfo = require('../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				showingIndex: 0,
				tabHeight: 300,
				orderIndex: 0,
				orderList: ['全部', '销售订单', '预付款订单'],
				cateIndex: 0,
				cateList: ['状态', '未发布', '已发布','抢单中','已确认','已发货','已完成','已结算','已取消'],
				genderIndex: 0,
				gender: [{
					product: '请选择型号'
				}],
				serviceIndex: 0,
				service: ['请选择物流', '自提', '配送'],
				dateValue: null,
				endValue: null,
				logistics: [],
				orderType: 'all',
				product: '',
				startTime: '',
				endTime: '',
				transport: '',
				page: 1,
				orderby: '',
				loadings:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes:0,
				loadingText:['正在加载.....']
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
		onLoad(option) {
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			uni.request({
				url: this.$webUrl + "/logistics/orders",
				data: {
					phone: uni.getStorageSync("phoneno")
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.logistics = res.data
					if (_self.logistics.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (_self.logistics.length > 0 && _self.logistics.length < 15) {
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
					var data = res.data
					data.map(item => {
						item.product = item.area + "," + item.code
					})
					_self.gender = _self.gender.concat(data)
				}
			})
		},
		methods: {
			handleClick(e) {
				var id = e.currentTarget.dataset.id
				// 跳到销售
				uni.navigateTo({
					url: '../salesDetail/index?id=' + id,
				});
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			bindServiceChange: function(e) {
				console.log(e + 'ff');
				this.serviceIndex = e.detail.value
				_self.transport=_self.service[_self.serviceIndex]
			},
			handleChange(e) {
				var id = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../orderDetail/index?id=' + id,
				})
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value
			},
			switch1Change: function(e) {
				var switch1 = e.detail.value
				if (switch1 == true) {
					_self.orderby = "address"
					var index = e.currentTarget.dataset.id;
					uni.showToast({
						title: '已启用',
						icon: ''
					});
				}
				if (switch1 == false) {
					_self.orderby = "time"
					var index = e.currentTarget.dataset.id;
					uni.showToast({
						title: '已禁用',
						icon: ''
					});
				}
			},
			handleTo: function() {
				uni.navigateTo({
					url: '../../sales/salesList/index',
				})
				this.hideMenu1();
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
			changeCate:function(e){
				var tapIndex=e.target.dataset.itemid;
				this.cateIndex=tapIndex
				this.showingIndex=0
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				if (tapIndex == 0) {
					_self.orderType = "all"
				} else if (tapIndex == 1) {
					_self.orderType = "fax"
				} else if (tapIndex == 2) {
					_self.orderType = "cash"
				}
				uni.request({
					url: this.$webUrl + "/logistics/orders",
					data: {
						phone: uni.getStorageSync("phoneno"),
						type: _self.orderType
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.logistics = res.data
						if (_self.logistics.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.logistics.length > 0 && _self.logistics.length < 15) {
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
				formData.type = _self.orderType
				formData.phone = uni.getStorageSync("phoneno")
				_self.transport = _self.service[_self.serviceIndex]
				formData.transport = _self.transport
				formData.product = _self.gender[_self.genderIndex].product
				formData.ot = _self.orderby
				if (formData.startTime == 0) {
					formData.startTime = ""
				}
				if (formData.endTime == 0) {
					formData.endTime = ""
				}
				if (_self.serviceIndex == 0) {
					formData.transport = ""
				}
				if (_self.genderIndex == 0) {
					formData.product = ""
				}
				uni.request({
					url: this.$webUrl + "/logistics/orders",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.logistics = res.data
						if (_self.logistics.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.logistics.length > 0 && _self.logistics.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
				_self.showingIndex = 0;
				_self.page = 1
			},
			//重置表单
			formReset: function() {
				_self.dateValue=null
				_self.endValue=null
				_self.genderIndex=0
				_self.serviceIndex=0
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			scrollend(){
				var _self = this
				this.loadingType = 1;
				_self.page++;
				var product = _self.gender[_self.genderIndex].product
				var service = _self.service[_self.serviceIndex]
				if(_self.dateValue==0){
					_self.dateValue=""
				}
				if(_self.endValue==0){
					_self.endValue=""
				}
				uni.request({
					data: {
						phone: uni.getStorageSync("phoneno"),
						page: _self.page,
						product:product,
						transport:_self.transport,
						startTime: _self.dateValue,
						endTime: _self.endValue,
						orderType:_self.orderby,
						type:_self.orderType
					},
					url: _self.$webUrl + "/logistics/orders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var data = res.data
						_self.logistics = _self.logistics.concat(data)
						_self.loadingType = 0;
						_self.loadingText = ['正在加载.....']
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
			}
		},
		components: {
			graceLoading,
		}

	}
</script>

<style>
	@import "../../../../common/css/orderList.css";

	.grace-filter .items {
		width: 50%
	}

	.demo1 {
		position: relative;
	}

	.menus {
		line-height: 60rpx;
		font-size: 28rpx;
		border: none;
		margin-left: 30rpx;
		text-align: left;
		color: #000;
	}

	.ls .input:nth-of-type(2) {
		margin-left: 25upx;
	}

	.ls .input:nth-of-type(1) {
		margin-left: 10upx;
	}
</style>
