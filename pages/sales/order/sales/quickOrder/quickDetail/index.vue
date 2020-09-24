<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form @submit="formSubmit" @reset='formReset' class="grace-form grace-margin-top">
					<view class="grace-items items">
						<view class="icons grace-icons iconfont icon-dingdan"></view>
						<view class="body">
							<view class="title">快捷下单</view>
						</view>
						<view class="ot-daile-ft">
							<view class="ot-daile-mast">未下单</view>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">订单号</view>
						<input type="text" class="input" name="dingdan" placeholder="请输入订单号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">产品型号</view>
						<view class="other">
							<picker @change="bindProChange" :value="proIndex" :range="pro" name="pro">
								<text>{{pro[proIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">客户</view>
						<view class="other">
							<picker @change="bindCusChange" :value="cusIndex" :range="cus" name="cus">
								<text>{{cus[cusIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">送货地址</view>
						<input type="text" class="input" name="where" placeholder="" />
					</view>
					<view class="grace-items">
						<view class="grace-label">付款方式</view>
						<view class="other">
							<picker @change="bindPayChange" :value="payIndex" :range="pay" name="pay">
								<text>{{pay[payIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">物流方式</view>
						<view class="other">
							<picker @change="bindLogiChange" :value="logiIndex" :range="logi" name="logi">
								<text>{{logi[logiIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">单价</view>
						<input type="text" class="input" name="danjia" placeholder="请输入单价" />
					</view>
					<view class="grace-items">
						<view class="grace-label">数量</view>
						<input type="text" class="input" name="num" placeholder="请输入数量" />
					</view>
					<view class="grace-items">
						<view class="grace-label">金额</view>
						<input type="text" class="input" name="price" placeholder="请输入金额" />
					</view>
					<view class="grace-items">
						<view class="grace-label">销售日期</view>
						<view class="other">
							<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="" end="">
								<text>{{dateValue == null ? '请选择' : dateValue}}</text>
							</picker>
						</view>
					</view>
					<view class="ot-button-fixed" style="padding:22upx 0;">
						<button formType="submit" type="primary">提交</button>
						<button form-type='reset' type="primary">再下一单</button>
						<button @tap="handleClick" type="primary">下一页</button>
					</view>
					<!-- <view class="ot-xt">
						<button class="ot-btn" form-type='reset'>
							<image  class="imgs" :src="img+'add1.png'" @tap.stop="handleChange"></image>
						</button>
					</view> -->
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import common from "../../../../../../common/common.js"
	var graceChecker = require("../../../../../../graceUI/jsTools/graceChecker.js");
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				cusIndex: 0,
				cus: ['请选择', '厦门荣锦贸易有限公司', '福建辉煌'],
				proIndex: 0,
				pro: ['请选择', '福联,7042', '福联,7042开机料'],
				payIndex: 0,
				pay: ['请选择', '货到付款', '款到发货', '赊销方式'],
				logiIndex: 0,
				logi: ['请选择', '自提', '配送'],
				dateValue: null
			}
		},
		methods: {
			formReset: function() {
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			bindCusChange: function(e) {
				this.cusIndex = e.detail.value;
			},
			bindProChange: function(e) {
				this.proIndex = e.detail.value;
			},
			bindPayChange: function(e) {
				this.payIndex = e.detail.value;
			},
			bindLogiChange: function(e) {
				this.logiIndex = e.detail.value;
			},
			handleClick() {
				uni.navigateTo({
					url: '../quickContract/index',
				})
			},
			handleChange() {

			},
			formSubmit: function(e) {
				_self = this;
				var rule = [{
					name: "dingdan",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "订单号不能为空"
				}];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "提交成功!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
		}
	}
</script>

<style>
	@import "../../../../../../common/css/orderInvoice.css";
  page{
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
		width: 452upx;
		display: flex;
		justify-content: flex-end;
	}

	.ot-daile-mast {
		width: 100upx;
		font-size: 25upx;
		color: #fff;
		height: 35upx;
		line-height: 35upx;
		background-color: #ff5722;
		border-radius: 20upx;
		text-align: center;
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
		width: 28%;
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
	.ot-button-fixed button:nth-of-type(3) {
		border: 1px solid #ff5722;
		background-color: transparent !important;
		color: #ff5722;
	}
</style>
