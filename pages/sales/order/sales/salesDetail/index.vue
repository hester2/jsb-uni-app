<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form @submit="formSubmit" @reset='formReset' class="grace-form grace-margin-top">
					<view class="grace-items items">
						<view class="icons grace-icons iconfont icon-dingdan"></view>
						<view class="body">
							<view class="title">基础信息</view>
						</view>
						<view class="ot-daile-ft">
							<view class="ot-daile-yt" @tap="handleChange(0)">取消订单</view>
							<view class="ot-daile-ask" @tap="handleChange(1)">确认订单</view>
							<view class="ot-daile-mast">已完成</view>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">订单号</view>
						<input type="text" class="input" name="dingdan" disabled placeholder="请输入订单号" :value="o.order_no" />
					</view>
					<view class="grace-items">
						<view class="grace-label">客户</view>
						<input type="text" class="input" disabled name="" value="含税" :value="o.customer_name" />
					</view>
					<view class="grace-items">
						<view class="grace-label">订单类型</view>
						<input type="text" class="input" disabled name="" :value="o.tax" />
					</view>
					<view class="grace-items">
						<view class="grace-label">单价</view>
						<input type="text" class="input" disabled name="" :value="o.price" placeholder="请输入单价" />
					</view>
					<view class="grace-items">
						<view class="grace-label">数量</view>
						<input type="text" class="input" disabled name="" :value="o.num" placeholder="请输入数量" />
					</view>
					<view class="grace-items">
						<view class="grace-label">总金额</view>
						<input type="text" class="input" disabled name="" :value="o.total_price" placeholder="请输入金额" />
					</view>
					<view class="grace-items">
						<view class="grace-label">配货情况</view>
						<input type="text" class="input" disabled name="" :value="o.remainder_num+'/'+o.num+'（待收货量/购买量）'" placeholder="请输入金额" />
					</view>
					<view class="grace-items">
						<view class="grace-label">产品型号</view>
						<view class="other">
							<picker @change="bindProChange" :value="proIndex" :range="pros" :range-key="'product'" name="pro">
								<text class="text">{{product}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">付款方式</view>
						<view class="other">
							<picker @change="bindPayChange" :value="payIndex" :range="pay" name="pay">
								<text class="text">{{trade}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">物流方式</view>
						<view class="other">
							<picker @change="bindLogiChange" :value="logiIndex" :range="logi" name="logi">
								<text class="text">{{transport}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">收货地址</view>
						<input type="text" class="input text" name="where" placeholder="" />
					</view>
					<view class="ot-button-fixed" style="padding:22upx 0;">
						<button formType="submit" type="primary">提交</button>
						<button @tap="handleChange(2)" type="primary">下一步</button>
					</view>
					<input type="text" :value="o.id" name="o.id" v-show="false">
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	import common from "../../../../../common/common.js"
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				cusIndex: 0,
				cus: ['请选择', '厦门荣锦贸易有限公司', '福建辉煌'],
				proIndex: 0,
				pro: [],
				payIndex: 0,
				pay: ['请选择', '货到付款', '款到发货', '赊销方式'],
				logiIndex: 0,
				logi: ['请选择', '自提', '配送'],
				dateValue: null,
				o: {},
				product: '',
				transport: '',
				trade: ''
			}
		},
		onLoad(option) {
			_self = this
			var id = option.sId
			uni.request({
				url: this.$webUrl + "/sale/order/orderDetail",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var data = res.data
					_self.o = data
					_self.product = data.area + "," + data.code
					_self.transport = data.transport_type
					_self.trade = data.trade_type
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
					_self.pro = _self.pro.concat(data)
				}
			})
		},
		computed: {
			pros: function() {
				return _self.pro.sort(function(x,y){
					return x["product"].localeCompare(y["product"])
				})
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			bindCusChange: function(e) {
				//console.log(e);
				this.cusIndex = e.detail.value;
			},
			bindProChange: function(e) {
				//console.log(e);
				this.proIndex = e.detail.value;
				_self.product = _self.pro[_self.proIndex].product
			},
			bindPayChange: function(e) {
				//console.log(e);
				this.payIndex = e.detail.value;
				_self.trade = _self.pay[_self.payIndex]
			},
			bindLogiChange: function(e) {
				console.log(e);
				this.logiIndex = e.detail.value;
				_self.transport = _self.logi[_self.logiIndex]
			},
			handleChange(o) {
				var that = this;
				switch (o) {
					case 0:
						uni.showModal({
							title: '提示',
							content: '确认取消订单',
							success: function(sm) {
								if (sm.confirm) {
									uni.showToast({
										title: "已确认!",
										icon: "none"
									});
								} else if (sm.cancel) {}
							}
						})
						break;
					case 1:
						uni.showModal({
							title: '提示',
							content: '确认订单？',
							success: function(sm) {
								if (sm.confirm) {
									uni.showToast({
										title: "已确认!",
										icon: "none"
									});
								} else if (sm.cancel) {}
							}
						})
						break;
					case 2:
						uni.navigateTo({
							url: '../salesContract/index?id=' + _self.o.id,
						})
						break;
				}
			},
			formSubmit: function(e) {
				var formData = e.detail.value
				formData["o.area"] = _self.product.split(',')[0]
				formData["o.code"] = _self.product.split(',')[1]
				formData["o.trade_type"] = _self.trade
				formData["o.transport_type"] = _self.transport
				uni.request({
					url: this.$webUrl + "/sale/order/update",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						if (res.data) {
							uni.showToast({
								title: '更改成功'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderInvoice.css";

	page {
		background-color: #eee;
	}

	.icon-dingdan:before {
		content: "\e608";
	}

	.grace-form .grace-items {
		height: 68upx !important;
	}

	.grace-form .items .icons {
		color: #5ca7e2;
		font-size: 36upx !important;
	}

	.grace-form .items .body {
		width: 190upx;
		margin-left: 10upx;
	}

	.grace-form .items .ot-daile-ft {
		width: 450upx;
		display: flex;
		justify-content: flex-end;
	}

	.grace-form .items {
		justify-content: flex-start;
		border-bottom: 2upx dashed #ccc;
		padding: 4upx 0px !important;
	}

	.ot-xt {
		position: fixed;
		right: 30upx;
		bottom: 30upx;
		width: 100upx;
		height: 100upx;
		background-color: #ff5722;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ot-xt image {
		width: 60upx;
		height: 60upx;
		display: block;
	}

	.ot-btn {
		background-color: transparent !important;
		margin: 0px !important;
		padding: 0px !important;
	}

	.ot-button-fixed {
		display: flex;
		justify-content: space-between;
	}

	.ot-button-fixed button {
		width: 26%;
		height: 70upx;
		font-size: 27upx;
		line-height: 70upx;
		margin: 0px;
	}

	.ot-button-fixed button:nth-of-type(2) {
		border: 1px solid #ff5722;
		background-color: transparent !important;
		color: #ff5722;
	}

	.ot-daile-ask {
		background-color: #1E9FFF;
		border-radius: 40upx;
		height: 35upx;
		text-align: center;
		line-height: 35upx;
		font-size: 24upx;
		color: #fff;
		width: 110upx;
		margin-left: 20upx;
		padding: 0px 0upx;
	}

	.ot-daile-yt {
		background-color: #447D66;
		border-radius: 40upx;
		height: 35upx;
		text-align: center;
		line-height: 35upx;
		font-size: 24upx;
		color: #fff;
		width: 110upx;
		margin-left: 20upx;
	}

	.ot-daile-mast {
		background-color: #FF5722;
		border-radius: 40upx;
		height: 35upx;
		text-align: center;
		line-height: 35upx;
		font-size: 24upx;
		color: #fff;
		width: 100upx;
		margin-left: 20upx;
		padding: 0px 0upx;
	}

	.input {
		font-size: 24upx !important;
		color: #666666 !important;
	}

	.other text {
		font-size: 24upx !important;
	}

	.text {
		color: #000 !important;
	}

	.grace-items .text {
		color: #000 !important;
	}
</style>
