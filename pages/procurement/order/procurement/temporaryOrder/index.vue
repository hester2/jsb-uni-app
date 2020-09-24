<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="ot-Dtailes-host">
				<view class="grace-items">
					<view class="grace-label">型号</view>
					<view class="other">
						<picker @change="bindModleChange" :value="modleIndex" :range="modle" name="modle">
							<text>{{modle[modleIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">仓库</view>
					<view class="other">
						<picker @change="bindWarehouseChange" :value="warehouseIndex" :range="warehouse" name="warehouse">
							<text>{{warehouse[warehouseIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">仓库地址</view>
					<input type="text" class="input" name="cangku" placeholder="请输入仓库地址" />
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
						<picker @change="bindWayChange" :value="wayIndex" :range="way" name="way">
							<text>{{way[wayIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">数量</view>
					<input type="text" class="input" name="shuliang" placeholder="请输入数量" />
				</view>
				<view class="grace-items">
					<view class="grace-label">单价</view>
					<input type="text" class="input" name="danjia" placeholder="请输入单价" />
				</view>
				<view class="grace-items">
					<view class="grace-label">付款方</view>
					<view class="other">
						<picker @change="bindPayerChange" :value="payerIndex" :range="payer" name="payer">
							<text>{{payer[payerIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">付款日期</view>
					<view class="other">
						<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2018-01-01" end="2022-01-01">
							<text>{{dateValue == null ? '请选择' : dateValue}}</text>
						</picker>
					</view>
				</view>

				<view class="grace-items grace-noborder">
					<view class="clien other">
						<textarea placeholder="备注..." name="desc"></textarea>
					</view>
				</view>
			</view>
			<view class="ot-button-fl">
				<button formType="submit" @tap="handleClick" type="primary" size="mini">提交</button>
				<button @tap="handleClick" type="primary" size="mini">下一步</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../../../../graceUI/jsTools/graceChecker.js");
	export default {
		data() {
			return {
				modleIndex: 0,
				modle: ['福联,7042', '福联,7050'],
				warehouseIndex: 0,
				warehouse: ['中石油龙江易发贸易仓', '台州市泰和塑料有限公司'],
				payIndex: 0,
				pay: ['货到付款', '款到发货'],
				wayIndex: 0,
				way: ['自提', '配送'],
				payerIndex: 0,
				payer: ['兴建祥', '兴得铭', '对私'],
				dateValue:null,
			}
		},
		methods: {
			bindModleChange: function(e) {
				console.log(e);
				this.modleIndex = e.detail.value
			},
			bindPayChange: function(e) {
				console.log(e);
				this.payIndex = e.detail.value
			},
			bindWarehouseChange: function(e) {
				console.log(e);
				this.warehouseIndex = e.detail.value
			},
			bindWayChange: function(e) {
				console.log(e);
				this.wayIndex = e.detail.value
			},
			bindPayerChange: function(e) {
				console.log(e);
				this.payerIndex = e.detail.value
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
					name: "cangku",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "仓库地址不能为空"
				}, {
					name: "shuliang",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "数量不能为空"
				}, {
					name: "danjia",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "单价不能为空"
				}, {
					name: "bd",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "付款日期不能为空"
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					console.log(formData)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},

			handleClick() {
				uni.navigateTo({
					url: '../temporaryContract/index',
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #fff;
	}
	
	.grace-body{
		width: 100%;
		padding: 0px;
		border-top: 2upx solid #E7E7E7;
		box-sizing: border-box;
	}

	.ot-Dtailes-host {
		padding: 0px 30upx;
		border-radius: 10upx;
		box-sizing: border-box;
	}

	.grace-form .grace-items .clien.other {
		margin-left: 0px;
		padding-left: 0px;
	}
	
	.grace-form .grace-items{
		border:none;
	}

	.grace-form textarea {
		font-size: 30upx;
	}

	button {
		background-color: #fe5722 !important;
	}

	.ot-submit-img {
		display: flex;
		flex-direction: row;
		justify-content: flex-start !important;
	}

	.ot-submit-img view {
		margin-right: 30upx;
		line-height: 60upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
		color: #fff;
		background-color: #fe5722 !important;
	}

	.grace-idcard-preview image {
		width: 25%;
	}

	.grace-form .grace-items .grace-label {
		width: 140upx;
	}

	.ot-button-fl {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		/* border-top: 3upx solid #AEAEAE; */
		box-shadow: 1px 1px 4upx #999;
		background-color: #fff;
		display: flex;
		box-sizing: border-box;
		padding: 20upx 40upx;
		justify-content: space-between;
	}

	.ot-button-fl button:nth-of-type(1) {
		background-color: #fe5722 !important;
		border: 2upx solid #fe5722;
		margin: 0px;
		width: 220upx;
		box-sizing: border-box;
	}

	.ot-button-fl button:nth-of-type(2) {
		background-color: transparent !important;
		border: 2upx solid #fe5722;
		color: #fe5722;
		margin: 0;
		width: 220upx;
		box-sizing: border-box;
	}

	button[size=mini] {
		line-height: 70upx;
	}
</style>
