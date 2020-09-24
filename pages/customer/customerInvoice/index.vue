<template>
	<view class="ot-Dtailes-host">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">发票号</view>
					<input type="text" disabled class="input" name="hao" />
				</view>
				<view class="grace-items">
					<view class="grace-label">开票公司</view>
					<input type="text" class="input" name="com" value="企业vip客户" placeholder="请输入开票公司" />
				</view>
				<view class="grace-items">
					<view class="grace-label">税号</view>
					<input type="text" class="input" name="ein" value="vip" placeholder="请输入纳税人识别号" />
				</view>
				<view class="grace-items">
					<view class="grace-label">联系方式</view>
					<input type="text" class="input" name="phoneno" value="136059523333" placeholder="请输入手机号码" />
				</view>
				<view class="grace-items">
					<view class="grace-label">开户行</view>
					<input type="text" class="input" name="where" placeholder="请输入开户行" />
				</view>
				<view class="grace-items">
					<view class="grace-label">账号</view>
					<input type="text" class="input" name="account" placeholder="请输入账号" />
				</view>
				<view class="grace-items">
					<view class="grace-label">收件地址</view>
					<input type="text" class="input" name="address" placeholder="请输入收件地址" />
				</view>
				<view class="grace-items">
					<view class="grace-label">开票联系人</view>
					<input type="text" class="input" name="nickname" value="wlx" placeholder="请输入联系人" />
				</view>
				<view class="grace-items grace-noborder">
					<view class="clien other">
						<textarea placeholder="备注..." name="desc"></textarea>
					</view>
				</view>
				<view class="ot-button-fl">
					<button formType="submit" type="primary" size="mini">提交</button>
					<button @tap="handleClick" type="primary" size="mini">下一步</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../graceUI/jsTools/graceChecker.js");
	export default {
		data() {
			return {

			}
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../customerContract/index',
				})
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "com",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "开票公司不能为空"
					},
					{
						name: "ein",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "税号不能为空"
					},
					{
						name: "phoneno",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "联系方式不能为空"
					},
					{
						name: "where",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "开户行不能为空"
					},
					{
						name: "account",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "账号不能为空"
					},
					{
						name: "address",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "收件地址不能为空"
					},
					{
						name: "nickname",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "开票联系人不能为空"
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
					//console.log(JSON.stringify(e.detail.value));
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		}
	}
</script>

<style>
	@import "../../../common/css/orderInvoice.css";

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

	.ot-button-fl button {
		height: 64upx !important;
		line-height: 64upx !important;
		padding: 0px !important;
	}
</style>
