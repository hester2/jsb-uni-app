<template>
	<view class="">
		<view class="ot-f">
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop="nomove"></view>
			<view class="grace-filter ot-date " id="grace-filter-header">
				<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
				</view>
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
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindPickerChange" :value="genderIndex" :range="genders" name="gender" :range-key="'product'">
													<text>{{genders[genderIndex].product}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class=" grace-bold ">状态</view>
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
									<view class="grace-bold">物流单号</view>
									<view class="grace-items">
										<input class="input" type="text" value="" name="orderNo" placeholder="请输入物流单号" />
									</view>
								</view>
								<view class="ot-sales-lr">
									<view class="grace-bold">发布日期</view>
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
			<view class="ot-sales-la">
				<view class="ot-sales-lx" @tap="handleClick(item.id)" v-for="(item,index) in driver" :key="item.id">
					<image class="ot-image" :src="img+'qian.png'"></image>
					<view class="ot-sales-lc">
						<view class="grace-space-between">
							<view class="demo6">物流单号：{{item.order_no}}</view>
							<view class="demo7">{{item.state}}</view>
						</view>
					</view>
					<view class="ot-sales-ln">装货地址：{{item.from_address}}</view>
					<view class="ot-sales-lm">
						<view class="demo6">
							品名：{{item.category}}
						</view>
						<view v-if="item.state=='已下单'?true:false" class="demo7" @tap.stop="handleChange(0,item.id)" :data-id="item.id">
							发货
						</view>
						<view class="demo7 " v-if="item.state=='已发货'?true:false" @tap.stop="handleChange(1,item.id)" :data-id="item.id">
							签收单
						</view>
					</view>
					<view class="ot-sales-ln">产地/型号：{{item.area}}/{{item.code}}</view>
					<view class="ot-sales-dast">
						<view class="grace-space-between">
							<view class="demo6">数量：{{item.num}}</view>
							<view class="demo7">{{item.release_date}}</view>
						</view>
					</view>
				</view>
				<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	import gracePopupMenu from '../../../../graceUI/components/gracePopupMenu.vue';
	import common from "../../../../common/common.js";
	import graceLoading from "../../../../graceUI/components/graceLoading.vue";
	var systemInfo = require('../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		components: {
			graceLoading,
		},
		data() {
			return {
				img: common.imageUrlPath,
				showingIndex: 0,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
				cateIndex: 0,
				cateList: ['全部', '销售订单', '预付款订单'],
				genderIndex: 0,
				gender: [],
				genderTmp:[{
					product: '请选择型号'
				}],
				serviceIndex: 0,
				service: ['请选择状态', '抢单中', '已下单', '已发货', '已确认', '已取消', '已结算', '已完成'],
				dateValue: null,
				endValue: null,
				sendLr: '发货',
				idCard1: '',
				driver: [],
				orderType: 'address',
				sign_file_id: '',
				orderNo:'',
				type:''
			}
		},
		onLoad(option) {
			_self=this
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			uni.request({
				url: this.$webUrl + '/driver/myOrders',
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				data: {
					phone: uni.getStorageSync("phoneno")
				},
				success(res) {
					_self.driver = res.data
					console.log(_self.driver)
					if (_self.driver.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (_self.driver.length > 0 && _self.driver.length < 15) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['已加载全部']
							_self.loadings = ''
						}, 500)
					}
				}
			})
			
			uni.request({
				url: this.$webUrl + '/driver/productList',
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				data: {
					type: '现金&销售'
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
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		methods: {
			handleClick(e) {
				console.log(e)
				uni.navigateTo({
					url: '../orderDetail/index?id=' + e,
				});
			},
			handleChange(o, e) {
				console.log(e)
				switch (o) {
					case 0:
						var that = this;
						uni.showModal({
							title: '提示',
							content: '确认发货？',
							success: function(sm) {
								if (sm.confirm) {
									uni.request({
										url: this.$webUrl + '/driver/delivery',
										header: {
											'Access-Token': uni.getStorageSync("token")
										},
										data: {
											id: e
										},
										success(res) {
											_self.driver = res.data
										}
									})
								} else if (sm.cancel) {

								}
							}
						})
						break;
					case 1:
						uni.chooseImage({
							count: 1,
							success: function(res) {
								_self.idCard1 = res.tempFilePaths[0]
								const uploadTask = uni.uploadFile({
									url: _self.$webUrl + "/file/uploadFile",
									filePath: res.tempFilePaths[0],
									name: 'tmp',
									formData: {
										'type': 8
									},
									success(res) {
										_self.sign_file_id = res.data
										uni.showToast({
											title: '上传成功',
											icon: 'success'
										})
									},
									complete(res) {
										uni.request({
											url: _self.$webUrl + '/driver/uploadSign',
											data: {
												id: e,
												fileName: _self.sign_file_id
											},
											header: {
												'Access-Token': uni.getStorageSync("token")
											},
											success(res) {
												if (res.data) {
													uni.showToast({
														title: '上传成功',
													})
												}
											}
										})
									}
								});
							}
						})
						break;
				}
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			bindServiceChange: function(e) {
				console.log(e + 'ff');
				this.serviceIndex = e.detail.value
			},
			// 关闭菜单方法
			hideMenu: function() {
				this.menu1Show = false
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			bindEndChange: function(e) {
				this.endValue = e.detail.value
			},
			switch1Change: function(e) {
				console.log('switch1 发生 change 事件，携带值为', e.detail.value)
				var switch1 = e.detail.value
				if (switch1 == true) {
					var index = e.currentTarget.dataset.id;
					uni.showToast({
						title: '已启用',
						icon: ''
					});
				}
				if (switch1 == false) {
					var index = e.currentTarget.dataset.id;
					uni.showToast({
						title: '已禁用',
						icon: ''
					});
				}
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
					_self.type = "销售"
				} else if (tapIndex == 2) {
					_self.type = "现金"
				}
				uni.request({
					url: this.$webUrl + "/driver/myOrders",
					data: {
						phone: uni.getStorageSync("phoneno"),
						product:product,
						transport: service,
						beginTime: _self.dateValue,
						endTime: _self.endValue,
						orderNo:_self.orderNo,
						type:_self.type
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.driver = res.data
						if (_self.driver.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.driver.length > 0 && _self.driver.length < 15) {
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
				var product = _self.genders[_self.genderIndex].product
				formData.state = _self.service[_self.serviceIndex]
				if (formData.beginTime == 0) {
					formData.beginTime = ""
				}
				if (formData.endTime == 0) {
					formData.endTime = ""
				}
				if (_self.genderIndex == 0) {
					product = ""
				}
				if (_self.serviceIndex == 0) {
					formData.state = ""
				}
				if (product != "") {
					formData.area = product.split(",")[0]
					formData.code = product.split(",")[1]
				}
				formData.phone = uni.getStorageSync('phoneno')
				_self.orderNo=formData.orderNo
				formData.type=_self.type
				uni.request({
					url: this.$webUrl + "/driver/myOrders",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.driver = res.data
						if (_self.driver.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (_self.driver.length > 0 && _self.driver.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
				_self.showingIndex = 0;
			},
			formReset: function() {
				_self.showingIndex = 0;
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			scrollend(e) {
				var _self = this
				_self.page++;
				this.loadingType = 1;
				var product = _self.gender[_self.genderIndex].product
				var service = _self.service[_self.serviceIndex]
				if(_self.genderIndex==0){
					product=""
				}else if(_self.serviceIndex==0){
					service=""
				}
				uni.request({
					data: {
						phone: uni.getStorageSync("phoneno"),
						page: _self.page,
						product:product ,
						transport: service,
						beginTime: _self.dateValue,
						endTime: _self.endValue,
						orderNo:_self.orderNo,
						type:_self.type
					},
					url: _self.$webUrl + "/driver/myOrders",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var data = res.data
						_self.driver = _self.driver.concat(data)
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
			},
		},

	}
</script>

<style>
	@import "../../../../common/css/orderList.css";

	.grace-filter .items {
		width: 50%
	}

	.ot-sales-lm {
		display: flex;
		justify-content: space-between;
		color: #646464;
		padding: 5px 10px;
	}

	.ot-sales-lm .demo7 {
		background-color: #FF5722;
		display: flex;
		align-items: center;
		color: #fff;
		border-radius: 20upx;
		box-sizing: border-box;
		padding: 0px 25upx;
	}
</style>
