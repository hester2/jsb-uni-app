<template>
	<view class="">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
			<view class="grace-filter" id="grace-filter-header">
				<view class="items" @tap='showOptions2'>{{typeList[typeIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
				</view>
				<!-- 第一个选项 -->
				<view class='grace-filter-options' style="max-height:200px;" v-if="showingIndex == 1">
					<view v-for="(item, index) in typeList" :key="index" :class="[index ==  typeIndex ? 'option current' : 'option']"
					 @tap='changeOrder' :data-itemid="index">
						{{item}}<text class="grace-icons icon-right" v-if="index ==  typeIndex"></text>
					</view>
				</view>
				<!-- 筛选 start -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15upx 2%;">
								<view class="ot-sales-lr">
								<view class="grace-bold">客户名称</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<input type="text" class="input" :value="cname" name="cname" placeholder="请输入客户名称" />
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
								<view class="grace-bold">联系方式</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<input type="text" class="input" :value="tel" name="tel"  placeholder="请输入联系方式"/>
										</view>
									</view>
								</view>
								<view class="ot-sales-lr">
								<view class="grace-bold">客户分组</view>
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindServiceChange" :value="serviceIndex" :range="service" :range-key="'name'" name="categoryId">
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
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:600+'px'}">
			<view class="ot-add-conten">
				<!-- 列表 -->
				<radio-group>
					<label class="list" v-for="(item,index) in list" :key="index" @tap="radioChange(item.id)" >
						<view class="ot-list">
							<view class="ot-ted-ol">
								<radio :value="item.name" color="#FF5722" :checked="item.id === current" />
								<view class="list_name">{{item.name}}</view>
							</view>
							<view class="cart_g_name">{{item.type}}
								<text class="list_price">{{item.ecotype}}</text>
							</view>
							<view class="cart_g_name">{{item.linkman}}
								<text class="list_price">{{item.tel}}</text>
							</view>
						</view>
					</label>
				</radio-group>
			</view>
		</scroll-view>
		<view class="ot-Dtailes-fd" style="padding:22upx 0;">
			<button formType="submit" @tap="handleClick" type="primary" style="width:100%;">下一步</button>
		</view>
	</view>
</template>

<script>
	import common from '../../../../common/common.js'
	var _self
	export default {
		data() {
			return {
				current: '',
				img: common.imageUrlPath,
				showingIndex: 0,
				typeIndex: 0,
				typeList: ["全部", "企业", "个人"],
				list: [],
				daId: '',
				cId: '',
				page: 1,
				phone: '',
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				serviceIndex: 0,
				service: [{name:'请选择客户'} ],
				tel:'',
				categoryId:'',
				cname:''
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
						//console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		created() {
			_self = this
		},
		onLoad(option) {
			var _self = this
			_self.daId = option.daId
			uni.getStorage({
				key: 'phoneno',
				success(res) {
					_self.phone = res.data
				}
			})
			uni.request({
				url: this.$webUrl + "/sale/getCustomers",
				data: {
					phone: _self.phone
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					//console.log(res.data)
					_self.list = res.data
				}
			})
			uni.request({
				url: this.$webUrl + "/sale/customerCategory",
				data: {
					phone: _self.phone
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.service = _self.service.concat(res.data)
				}
			})
		},
		methods: {
			bindPickerChange: function(e) {
				this.genderIndex = e.detail.value
			},
			bindServiceChange: function(e) {
				this.serviceIndex = e.detail.value
			},
			handleClick() {
				var _self = this
				uni.navigateTo({
					url: '../../order/sales/addOrder/index?daId=' + _self.daId + "&cId=" + _self.cId,
				})
			},
			changeOrder(e) {
				var _self = this
				_self.showingIndex = 0
				_self.typeIndex = e.currentTarget.dataset.itemid
				var type = _self.typeList[_self.typeIndex]
				uni.request({
					url: this.$webUrl + "/sale/getCustomers",
					data: {
						type: type,
						phone: _self.phone,
						tel:_self.tel,
						categoryId:_self.categoryId,
						cname:_self.cname
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var data = res.data
						_self.list = data
					}
				})
			},
			showOptions2() {
				var _self = this;
				if (_self.showingIndex == 0) {
					_self.showingIndex = 1;
				} else if (_self.showingIndex == 1) {
					_self.showingIndex = 0
				}
			},
			scrollend() {
				var _self = this
				//console.log("loadMore")
				var type = _self.typeList[_self.typeIndex]
				//console.log(type)
				_self.page++;
				uni.request({
					url: this.$webUrl + "/sale/getCustomers",
					data: {
						page: _self.page,
						phone: _self.phone,
						type: type,
						tel:_self.tel,
						categoryId:_self.categoryId,
						cname:_self.cname
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						var data = res.data;
						_self.list = _self.list.concat(data)
					}
				})
			},
			showOptions99: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 99;
			},
			//提交条件
			formsubmit: function(e) {
				var formData = e.detail.value;
				formData.categoryId=_self.service[_self.serviceIndex].id
				formData.phone=uni.getStorageSync("phoneno")
				formData.type=_self.typeList[_self.typeIndex]
			
				if(formData.categoryId==null){
					formData.categoryId=0
				}
				_self.categoryId=formData.categoryId
				_self.cname=formData.cname
				_self.tel=formData.tel
uni.request({
					url: this.$webUrl + "/sale/getCustomers",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.list = res.data
					}
				})		
						_self.showingIndex = 0;
			},
			//重置表单
			formReset: function() {
				_self.categoryId=0
				_self.cname=''
				_self.tel=''
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			/**
			 * 当前选中事件
			 */
			radioChange: function(e) {
				var lists = this.list
				var index = e
				var _self = this
				//console.log(e)
				_self.cId = e

			},
		}
	}
</script>

<style>
	@import "../../../../common/css/orderList.css";

	scroll-view {
		box-sizing: border-box;
		padding-bottom: 150upx;
	}

	.ot-Dtailes-fd {
		position: fixed;
		bottom: 0px;
		left: 0px;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		box-shadow: 2upx 2upx 12upx #ccc;
	}

	.ot-Dtailes-fd button {
		width: 80% !important;
	}

	.grace-filter .items {
		width: 100%;
		top: 20px;
	}

	.grace-filter .icons {
		width: 7%;
	}

	page {
		background-color: #eee;
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

	.ot-add-conten {
		box-sizing: border-box;
		padding: 0px 20upx;
	}

	
	.ot-list{
		background-color: #fff;
		width: 100%;
		height: auto;
		border-radius: 10upx;
		padding: 20upx 20upx;
		box-sizing: border-box;
		margin-bottom: 20upx;
	}

	.ot-ted-ol {
		display: flex;
		flex-direction: row;
		height: 55upx;
	}

	.list_name {
		margin-left: 20upx;
		font-size: 32upx;
	}

	.cart_g_name {
		color: #858585;
		margin-left: 76upx;
		margin-top: 20upx;
	}

	.list_price {
		color: #858585;
	}

	.cont_bot {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 104upx;
		line-height: 104upx;
		background: #fff;
		border-top: 2upx solid #ebebeb;
	}

	/* 全选ICON */

	.total-select {
		position: absolute;
		left: 30upx;
		top: 30upx;
		width: 40upx;
		height: 40upx;
	}

	/* 全选标题 */

	.sel_count_name {
		position: absolute;
		left: 90upx;
		top: 6upx;
		font-size: 30upx;
		color: #333;
	}

	.submit {
		position: absolute;
		width: 274upx;
		height: 104upx;
		line-height: 104upx;
		right: 0upx;
		font-size: 30upx;
		text-align: center;
		color: #fff;
		background: linear-gradient(90deg, #FF6835 0%, #FF5722 100%);
	}

	.grace-news-list {
		padding: 25upx;
		width: 100%;
		box-sizing: border-box;
	}

	button {
		background-color: #FF5722 !important;
	}

	.ot-order-fixed {
		position: fixed;
		width: 100%;
		bottom: 30px;
		left: 0px;
	}
</style>
