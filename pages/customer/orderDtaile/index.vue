<template>
	<view class="">
		<form @submit="formTo">
			<view class="ot-Dtailes-host">
				<view class="grace-list hj">
					<view class="items">
						<view class="icons grace-icons iconfont icon-dingdan"></view>
						<view class="body">
							<view class="title">基础信息</view>
						</view>
						<view class="ot-daile-ft">
							<view class="ot-daile-yt" @tap="handleTg" v-if="display">取消订单</view>
							<view class="ot-daile-ask" @tap="handleJu" v-if="display">确认订单</view>
							<view class="ot-daile-mast">{{order.state}}</view>
						</view>

					</view>
					<view class="grace-space-between">
						<view class="demo6">订单号:</view>
						<view class="demo7  grace-no-scale">{{order.order_no}}</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">客户:</view>
						<view class="demo7  grace-no-scale">{{order.customer_name}},{{phoneno}}</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">产品型号:</view>
						<view class="demo7  grace-no-scale">{{order.area}},{{order.category}},{{order.code}}</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">订单类型:</view>
						<view class="demo7  grace-no-scale">{{order.tax}}</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">数量:</view>
						<view class="demo7  grace-no-scale">{{order.num}}</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">单价:
							<view class="demo7  grace-no-scale"> {{price}}</view>
						</view>
						<view class="demo8  grace-no-scale" @tap="showDialog3">调价</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">总金额:</view>
						<view class="demo7  grace-no-scale">{{order.total_price}}={{order.price}}*{{order.num}}</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6">配货情况:</view>
						<view class="demo7  grace-no-scale">{{order.num}}/{{order.num}}</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6 red">付款方式:</view>
						<view class="demo7  grace-no-scale">
							<picker @change="bindPayChange" :value="payIndex" :range="pay" name="pay">
								<text>{{pay[payIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6 red">物流方式:</view>
						<view class="demo7  grace-no-scale">
							<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
								<text>{{gender[genderIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-space-between">
						<view class="demo6 red">收货地址:</view>
						<view class="demo7  grace-no-scale"><input type="text" class="input" name="nickname" :value="order.transport_address"
							 placeholder="请输入收货地址" /></view>
					</view>
				</view>
				<view class="ot-button-fl">
					<button formType="submit" type="primary" size="mini">保存修改</button>
					<button @tap="handleClick(order.id)" type="primary" size="mini">下一步</button>
				</view>
			</view>
		</form>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
				<view slot="content" class="content">
					<view class="ot-pay-qp">调整价格</view>
					<view class="grace-items">
						<view class="grace-label">单价(元)</view>
						<input type="text" class="input" name="danjia" v-model="input" placeholder="请输入单价" />
					</view>
					<view class="grace-items">
						<view class="grace-label">运费</view>
						<input type="text" class="input" name="yunfei" value="0.00" placeholder="请输入运费" />
					</view>
					<view class="grace-items">
						<view class="grace-label">附加费</view>
						<input type="text" class="input" name="fujia" value="0.00" placeholder="请输入附加费" />
					</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view>
							<button type="primary" @tap="closeDialog3">取消</button>
						</view>
						<view>
							<button type="primary" style="color:#3688FF;" @tap="confirm3" formType="submit">立即提交</button>
						</view>
					</view>
				</view>
			</graceDialog>
		</form>
	</view>
</template>

<script>
	import graceDialog from '../../../graceUI/components/graceDialog.vue';
	var graceChecker = require("../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				display: true,
				show3: false,
				price: 0,
				input: '8500.00',
				genderIndex: 0,
				gender: ['配送', '自提'],
				payIndex: 0,
				pay: ['款到发货', '货到付款', '赊销'],
				daId: 0,
				type: '',
				order: [],
				phoneno: 0,
			}
		},
		onLoad(option) {
			_self = this
			_self.type = option.type
			_self.daId = option.daId
		},
		mounted() {
			_self = this
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {
					_self.phoneno = res.data
					//console.log(_self.phoneno)
				}
			})
			if(!_self.phoneno) return;
			uni.request({
				url: this.$webUrl + '/customer/orderDetail',
				data: {
					id: _self.daId,
					type:_self.type
				},
				header:{'Access-Token':uni.getStorageSync("token")},
				
				success: (res) => {
					//console.log(res)
					_self.order = res.data
					_self.price=res.data.price
					_self.input=res.data.price
				},
				fail: (error) => {
					//console.log(error)
				}
			})
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../customerContract/index',
				})
			},
			handleTg() {
				//console.log('fff')
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否取消订单',
					success: function(sm) {
						if (sm.confirm) {
							uni.request({
								url: that.$webUrl + '/customer/cancelOrder',
								data: {
									id: _self.daId,
									type: 0
								},
								header:{'Access-Token':uni.getStorageSync("token")},
								
								success: (res) => {
									//console.log(res.data)
									that.display = false
									that.state = res.data
								},
								fail: (error) => {
									//console.log(error)
								}
							})
						} else if (sm.cancel) {

						}
					}
				})
			},
			handleJu() {
				//console.log('fff')
				var that = this;
				uni.showModal({
					title: '提示',
					content: '是否确认订单',
					success: function(sm) {
						uni.request({
							url: that.$webUrl + '/customer/confirmOrder',
							data: {
								id: _self.daId,
								type: 0
							},
							header:{'Access-Token':uni.getStorageSync("token")},
							
							success: (res) => {
								//console.log(res.data)
								that.display = false
								
							},
							fail: (error) => {
								//console.log(error)
							}
						})
						if (sm.confirm) {} else if (sm.cancel) {

						}
					}
				})
			},
			showDialog3: function() {
				this.show3 = true;
			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3: function() {
				this.closeDialog3();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
				// this.input = this.price
				_self.price = _self.input
				//console.log(this.input)
			},
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value;
			},
			bindPayChange: function(e) {
				//console.log(e);
				this.payIndex = e.detail.value;
			},
			formTo: function(e) {
				//定义表单规则
				var rule = [{
						name: "nickname",
						checkType: "notnull",
						checkRule: "1,3",
						errorMsg: "请输入收货地址"
					},
					{
						name: "gender",
						checkType: "notnull",
						checkRule: "",
						errorMsg: ""
					},
					{
						name: "pay",
						checkType: "notnull",
						checkRule: "",
						errorMsg: ""
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				//console.log(JSON.stringify(e.detail.value));
			},
		},
		components: {
			graceDialog: graceDialog
		},
	}
</script>

<style>
	@import "../../../common/css/orderDetail.css";

	.grace-space-between .demo6 {
		color: #999;
		font-size: 24upx;
		display: flex;
	}

	.grace-space-between .demo6 .demo7 {
		color: #999;
		font-size: 24upx;
		width: 280upx;
	}
	

	.grace-space-between .demo7 {
		color: #999;
		font-size: 24upx;
	}

	.grace-space-between .demo8 {
		color: #fff;
		font-size: 24upx;
		background-color: #009688;
		box-sizing: border-box;
		padding: 0px 10upx;
		border-radius: 10upx;
		height: 45upx;
		line-height: 45upx;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 40upx;
	}

	.ot-pay-hl {
		box-sizing: border-box;
		line-height: 50upx;
		height: 50upx;
		padding: 0px 20upx;
		background-color: #009688;
		color: #fff;
		border-radius: 10upx;
	}

	.ot-pay-qp {
		text-align: center;
	}

	button {
		background-color: #fff !important;
	}

	.grace-button {
		background-color: #FF5722 !important;
	}

	.ot-button-fl {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		justify-content: space-between;
		margin-top: 60upx;
	}
	

	.ot-button-fl button:nth-of-type(1) {
		background-color: #fe5722 !important;
		border: 2upx solid #fe5722;
		margin: 0px;
		width: 26%;
		box-sizing: border-box;
	}

	.ot-button-fl button:nth-of-type(2) {
		background-color: transparent !important;
		border: 2upx solid #fe5722;
		color: #fe5722;
		margin: 0;
		width: 26%;
		box-sizing: border-box;
	}
	.ot-button-fl button{
		height: 64upx !important;
		line-height: 64upx !important;
		padding: 0px !important;
	}

	.demo7 .input {
		text-align: right;
		width: 520upx;
		font-size: 24upx !important;
	}

	.red {
		color: #ff5722 !important;
	}
</style>
