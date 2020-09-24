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
												<picker @change="bindPickerChange" :value="genderIndex" :range="genders" :range-key="'product'" name="product">
													<text>{{genders[genderIndex].product}}</text>
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
											<text>{{endValue == null ? '请选择' : endValue}}</text>
										</picker>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class=" grace-bold ">物流方式</view>
									<view class="grace-search ">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="bindServiceChange" :value="serviceIndex" :range="service" name="transport">
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
												<switch :checked="switchT" style="zoom:.7 " color="#FF5722 " @change="switch1Change" />
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
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :scroll-top="scrollTop" :style="{height:tabHeight+'px'}">
			<view class="ot-sales-la ">
				<view class="ot-sales-lx " @tap="handleChange(item.id)" v-for="(item,index) in order" :key="index">
					<image class="ot-image " :src="img+'qian.png'"></image>
					<view class="ot-sales-lc ">
						<view class="grace-space-between ">
							<view class="demo6 ">供应商: {{item.supplier_name}}</view>
							<view class="demo7">
								<image :src="img+'dian1.png'" :data-name="item" @tap.stop="handleOrder(item)"></image>
								<view class="demo1" id="demo-2">
									<gracePopupMenu :show="item.flag" :top="menu1Top" :data-name="item" v-on:hideMenu="hideMenu1(item)">
										<view>
											<view class="menus" @tap.stop="handlePush(item)" >推送</view>
											<view class="menus" @tap.stop="handleDelivery" :data-trans="item.transport_type" :data-rid="item.related_order_id"
											 :data-id="item.id" :data-type="item.order_type">发货</view>
											<view class="menus" @tap.stop="handleDelete" v-if="item.transport_type=='供方配送'?true:false" :data-type="item.order_type">取消</view>
										</view>
									</gracePopupMenu>
								</view>
							</view>
						</view>
					</view>
					<view class="ot-sales-ln ">产地/型号：{{item.area}}/{{item.code}}</view>
					<view class="ot-sales-ln ">单价：{{item.sale_price}}</view>
					<view class="ot-sales-lm ot-sales-ln">
						<view class="grace-space-between ">
							<view class="demo6 ">装货数量：{{item.num}}</view>
						</view>
					</view>
					<view class="ot-sales-ln ">提货地址：{{item.supplier_store_address}}</view>
					<view class="ot-sales-ln ">物流方式：{{item.transport_type}}</view>
					<view class="ot-sales-ln ">提货地址：{{item.state}}</view>
					<view class="ot-sales-ln ot-sales-dast ">
						<view class="grace-space-between ">
							<view class="demo6 ">物流：{{item.logistics_name}}</view>
							<view class="demo7 ">{{item.sale_time.substring(0,10)}}</view>
						</view>
					</view>
				</view>
			</view>
			<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
		</scroll-view>
	</view>
</template>

<script>
	import gracePopupMenu from '../../../../../graceUI/components/gracePopupMenu.vue';
	import common from "../../../../../common/common.js";
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
				img: common.imageUrlPath,
				menu1Show: false,
				menu1Top: 5,
				showingIndex: 0,
				orderIndex: 0,
				orderList: ['全部订单', '销售订单', '现金订单'],
				cateIndex: 0,
				cateList: ['状态', '未发布', '已发布', '抢单中', '已接单', '已确认', '已发货', '已完成', '已结算'],
				genderIndex: 0,
				gender: [],
				genderTmp:[{
					product: '请选择型号'
				}],
				serviceIndex: 0,
				service: ['请选择物流', '客户自提', '平台配送', '供方配送'],
				dateValue: null,
				endValue: null,
				tabHeight: 300,
				scrollTop: 0,
				menus: [],
				old: {
					scrollTop: 0
				},
				order: [],
				page: 1,
				orderType: '',
				type: 'all',
				switchT: false,
				loadingTypes: 0,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingText: ['正在加载.....'],
				state: '',
				product: '',
				transport: '',
			}
		},
		onLoad(option) {
			_self = this
			var system = systemInfo.info();
			_self.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			uni.request({
				url: _self.$webUrl + "/logistics/orders",
				data: {
					phone: uni.getStorageSync("phoneno"),
					type: 'all'
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.order = res.data.map(item => {
						item.flag = false
						return item
					})
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
				url: _self.$webUrl + "/logistics/selectList",
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
		computed:{
			// 对picker排序
			genders:function(){
				return _self.genderTmp.concat(_self.gender.sort(function(x,y){
					return x["product"].localeCompare(y["product"])
				}))
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
		methods: {
			bindPickerChange: function(e) {
				_self.genderIndex = e.detail.value
			},
			bindServiceChange: function(e) {
				_self.serviceIndex = e.detail.value
			},
			// 关闭菜单方法
			hideMenu: function() {
				_self.menu1Show = false
			},
			handleChange(e) {
				uni.navigateTo({
					url: '../logisticsDtaile/index?id=' + e,
				})
			},
			bindDateChange: function(e) {
				_self.dateValue = e.detail.value
			},
			bindEndChange: function(e) {
				_self.endValue = e.detail.value
			},
			switch1Change: function(e) {
				if (_self.switchT == true) {
					_self.orderType = "time"
					_self.switchT = false
					var index = e.currentTarget.dataset.id;
					uni.showToast({
						title: '已禁用',
						icon: ''
					});
				} else if (_self.switchT == false) {
					_self.orderType = "address"
					_self.switchT = true
					var index = e.currentTarget.dataset.id;
					uni.showToast({
						title: '已启用',
						icon: ''
					});
				}
			},
			handleOrder: function(o) {
				console.log(_self.menus.flag)
				_self.menus = o
				_self.menus.flag = !_self.menus.flag
				return
				let view = uni.createSelectorQuery().select("#demo-2");
				view.fields({
					size: true
				}, data => {
					_self.menus.flag = true;
					_self.menu1Top = data.height;
				}).exec();
			},
			hideMenu1: function(o) {
				_self.menus = o
				_self.getList()
			},
			getList() {
				_self.menus.flag = !_self.menus.flag
				let view = uni.createSelectorQuery().select("#demo-2");
				view.fields({
					size: true
				}, data => {
					_self.menus.flag = false;
					_self.menu1Top = data.height;
				}).exec();
			},
			handlePush: function(e) {
				_self.getList();
				console.log(e)
				var id = e.id
				var trans = e.transport_type
				var type = e.order_type
				if (trans != "平台配送") {
					uni.showToast({
						title: '只有平台配送才能推送',
						icon: 'none'
					})
					return;
				}
				var state=e.state
				if(state!='未发布'){
					uni.showToast({
						title:'状态不正确',
						icon:'none'
					})
					return;
					}
				uni.navigateTo({
					url: '../dailyPush/index?id=' + id + "&type=" + type,
				})
			},
			handleDelivery: function(e) {
				_self.getList();
				var id = e.currentTarget.dataset.id
				var rid = e.currentTarget.dataset.rid
				var type = e.currentTarget.dataset.type
				var trans = e.currentTarget.dataset.trans
				if (trans != "平台配送") {
					uni.showToast({
						title: '只有平台配送才能发货',
						icon: 'none'
					})
					return;
				}
				uni.navigateTo({
					url: '../dailyDelivery/index?id=' + id + "&rid=" + rid + "&type=" + type,
				})
			},
			handleDelete() {
				_self.getList();
				uni.showModal({
					title: '提示',
					content: '确认取消订单么？',
					success: function(sm) {
						if (sm.confirm) {
						} else if (sm.cancel) {}
					}
				})
			},
			showOptions1: function() {
				if (_self.showingIndex != 0) {
					_self.showingIndex = 0;
					return;
				}
				_self.showingIndex = 1;
			},
			showOptions2: function() {
				if (_self.showingIndex != 0) {
					_self.showingIndex = 0;
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
				var tapIndex = e.target.dataset.itemid
				this.cateIndex = tapIndex
				this.showingIndex = 0
				if (tapIndex == 0) {
					_self.state = ""
				} else {
					_self.state = _self.cateList[_self.cateIndex]
				}
				uni.request({
					url: this.$webUrl + "/logistics/orders",
					data: {
						state: _self.state,
						type: _self.type,
						phone: uni.getStorageSync("phoneno"),
						product: _self.product,
						transport: _self.transport,
						startTime: _self.dateValue,
						endTime: _self.endValue,
						ot: _self.orderType
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.order = res.data.map(item => {
							item.flag = false
							return item
						})
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
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
				_self.type = "all"
				if (tapIndex == 1) {
					_self.type = "fax"
				} else if (tapIndex == 2) {
					_self.type = "cash"
				}
				uni.request({
					url: this.$webUrl + "/logistics/orders",
					data: {
						type: _self.type,
						phone: uni.getStorageSync("phoneno"),
						state: _self.state,
						product: _self.product,
						transport: _self.transport,
						startTime: _self.dateValue,
						endTime: _self.endValue,
						ot: _self.orderType,
						transport: _self.transport
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.logistics = res.data.map(item => {
							item.flag = false
							return item
						})
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
				formData.phone = uni.getStorageSync("phoneno")
				formData.orderType = _self.orderType
				_self.product = _self.genders[_self.genderIndex].product
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
				if (formData.transport == 0) {
					_self.transport = ""
				} else if (formData.transport == 1) {
					_self.transport = "客户自提"
				} else if (formData.transport == 2) {
					_self.transport = "平台配送"
				} else if (formData.transport == 3) {
					_self.transport = "供方配送"
				}
				formData.transport = _self.transport
				formData.state = _self.state
				formData.type = _self.type
				uni.request({
					url: this.$webUrl + "/logistics/orders",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.logistics = res.data.map(item => {
							item.flag = false
							return item
						})
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
			},
			//重置表单
			formReset: function() {
				_self.dateValue = null
				_self.endValue = null
				_self.serviceIndex = 0
				_self.genderIndex = 0

			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			scrollend(e) {
				var _self = this
				_self.page++;
				this.loadingType = 1;
				if (_self.genderIndex == 0) {
					_self.product = ""
				}
				if (_self.serviceIndex == 0) {
					_self.transport = ""
				}
				uni.request({
					data: {
						type: _self.type,
						phone: uni.getStorageSync("phoneno"),
						product: _self.product,
						transport: _self.transport,
						page: _self.page,
						type: _self.type,
						ot: _self.orderType,
						state: _self.state,
						startTime: _self.dateValue,
						endTime: _self.endValue
					},
					url: _self.$webUrl + "/logistics/orders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.loading = true;
						_self.order = _self.order.concat(
							res.data.map(item => {
								item.flag = false
								return item
							})
						)
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
		},
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";

	.grace-null {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

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

	.ot-sales-lx .demo7 {
		display: flex;
		align-items: center;
	}

	.ot-sales-lx image {
		display: block;
	}
</style>
