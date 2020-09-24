<template>
	<view class="">
		<view class="ot-f">
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
								<view class="ot-sales-lr">
									<view class="grace-bold">来款日期</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="bindDateChange" :value="dateValue" mode="date" name="incomingTime" >
													<text>{{dateValue == null ? '请选择' : dateValue}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">客户</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="bindCusChange" :value="cusIndex" :range="cus" :range-key="'name'" name="customerId">
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
					<view class="line1">{{num}}
						<text>吨</text>
					</view>
					<view class="line2">数量</view>
				</view>
				<view class="garce-items">
					<view class="line1">{{price}}
						<text>元</text>
					</view>
					<view class="line2">单价</view>
				</view>
				<view class="garce-items">
					<view class="line1">{{all_unit}}
						<text>元</text>
					</view>
					<view class="line2">金额</view>
				</view>
			</view>
			<view class="grace-box-banner grace-border-radius-small">
				<view class="garce-items">
					<view class="line1">{{leftNum}}
						<text>吨</text>
					</view>
					<view class="line2">发票库存</view>
				</view>
				<view class="garce-items">
					<view class="line1">{{invent}}
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
						<view class="demo6 ot-size">客户：{{item.customer_name}}</view>
						<view class="demo7 ">
							<image :src="img+'guanlian1.png'" @tap="handleClick(item.id)"></image>
						</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">来款日期：{{item.incoming_time.substring(0,10)}}</view>
					</view>
					<view class="grace-space-between ot-edit-sart">
						<view class="demo6">金额: {{item.total_price}}</view>
						<view class="demo7">{{item.state}}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				dateValue: null,
				showingIndex: 0,
				tabHeight: 300,
				cateIndex: 0,
				cateList: ['全部', '未关联', '已关联', '已取消'],
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				cusIndex: 0,
				cus: [{
					name: '请选择客户'
				}],
				getid: 0,
				customer: [],
				filterHeight: '100px',
				leftNum: '',
				invent:'',
				all_unit:'',
				area: '',
				code: '',
				page: 1,
				rid: '',
				pid: '',
				sid: '',
				mid: '',
				num: '',
				price: '',
				oprate: '',
				customerId: ''
			}
		},
		onLoad(option) {
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			_self = this
			_self.mid = option.id
			_self.area = option.area
			_self.code = option.code
			_self.leftNum = option.leftNum
			_self.rid = option.rid
			_self.pid = option.pid
			_self.sid = option.supplierOrderId
			uni.request({
				url: this.$webUrl + "/logistics/order/logisticsOrderInfo",
				data: {
					type: '现金',
					id: _self.rid
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
					var data_s = numberFormat(res.data.price)
					var data_o = numberFormat(res.data.related_num)
					_self.price = data_s.value + data_s.unit
					_self.num = data_o.value + data_o.unit
					var all_pre=_self.price*_self.num
					var data_p=numberFormat(all_pre)
					_self.all_unit=data_p.value+data_p.unit
					var all_price=_self.leftNum*_self.price
					var data_x=numberFormat(all_price)
					_self.invent=data_x.value+data_x.unit
					console.log(res.data.price)
				}
			})
			uni.request({
				url: this.$webUrl + "/customer/findCustomers",
				data: {
					type: '来款'
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.cus = _self.cus.concat(res.data)
					console.log(_self.cus)
				}
			})
			uni.request({
				url: this.$webUrl + "/logistics/resale/incomingList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.customer = res.data.list
				}
			})
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
			handleClick(e) {
				uni.navigateTo({
					url: '../customerSubmit/index?id=' + e + "&area=" + _self.area + "&code=" + _self.code + "&rid=" + _self.rid +
						"&pid=" + _self.pid + "&sid=" + _self.sid
				})
			},
			bindDateChange(e) {
				this.dateValue = e.detail.value
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			bindCusChange: function(e) {
				console.log(e);
				this.cusIndex = e.detail.value
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
				var opera;
				if (tapIndex == 0) {
					opera = ""
				}
				if (tapIndex == 1) {
					opera = "noRelated"
				} else if (tapIndex == 2) {
					opera = "related"
				} else if (tapIndex == 3) {
					opera = "cancel"
				}
				_self.oprate = opera
				uni.request({
					url: this.$webUrl + "/logistics/resale/incomingList",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					data: {
						oprate: opera
					},
					success(res) {
						_self.customer = res.data.list
						console.log(res.data.list)
					}
				})
				_self.page = 1
			},
			//提交条件
			formsubmit: function(e) {
				var formData = e.detail.value
				formData.oprate = _self.oprate
				formData.customerId = _self.cus[_self.cusIndex].customer_id
				if (formData.incomingTime == 0) {
					formData.incomingTime = ""
				}
				if (_self.cusIndex == 0) {
					formData.customerId = 0
				}
				_self.customerId = formData.customerId
				uni.request({
					url: this.$webUrl + "/logistics/resale/incomingList",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.customer = res.data.list
					}
				})
				this.showingIndex = 0;
				_self.page = 1
			},
			//重置表单
			formReset: function() {
				_self.dateValue = null
				_self.cusIndex = 0
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			scrollend(e) {
				var _self = this
				_self.page++;
				if (_self.dateValue == 0) {
					_self.dateValue = ""
				}
				uni.request({
					data: {
						phone: uni.getStorageSync("phoneno"),
						page: _self.page,
						customerId: _self.customerId,
						incomingTime: _self.dateValue,
					},
					url: this.$webUrl + "/logistics/resale/incomingList",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.customer = _self.customer.concat(res.data.list)
					}
				})
			},
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

	.grace-search {
		width: 75%;
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

	.grace-bold {
		width: 21%;
	}

	.ot-sales-lr {
		display: flex;
		box-sizing: border-box;
		padding: 18upx 25upx;
		border-bottom: 1px solid #eee;
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
