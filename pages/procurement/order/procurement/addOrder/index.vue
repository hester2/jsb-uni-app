<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">添加型号</view>
					<view class="other">
						<picker @change="bindPickerChange" :value="modelIndex" :range="model" name="model">
							<text>{{model[modelIndex]}}</text>
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
					<view class="grace-label">供应商</view>
					<view class="other">
						<picker @change="bindSupplierChange" :value="supplierIndex" :range="supplier" name="supplier">
							<text>{{supplier[supplierIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">仓库地址</view>
					<input type="text" class="input" name="ck" placeholder="请输入仓库地址" />
				</view>
				<view class="grace-items">
					<view class="grace-label">付款方式</view>
					<view class="other">
						<picker @change="bindPaymentChange" :value="paymentIndex" :range="payment" name="payment">
							<text>{{payment[paymentIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">物流方式</view>
					<view class="other">
						<picker @change="bindLogistiChange" :value="logistiIndex" :range="logisti" name="logisti">
							<text>{{logisti[logistiIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">数量（吨）</view>
					<input type="text" class="input" name="num" placeholder="请输入数量" />
				</view>
				<view class="grace-items">
					<view class="grace-label">单价</view>
					<input type="text" class="input" name="num" placeholder="请输入单价" />
				</view>
				<view class="grace-items">
					<view class="grace-label">付款方</view>
					<view class="other">
						<picker @change="bindPayChange" :value="payIndex" :range="pay" name="pay">
							<text>{{pay[payIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">付款日期</view>
					<view class="other">
						<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" placeholder="请选择付款日期" />
					</view>
				</view>
				<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1"></graceDate>
				<view style="padding:22upx 0;">
					<button formType="submit" type="primary" style="width:100%;">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../../../graceUI/jsTools/graceChecker.js");
	import graceDate from '../../../../../graceUI/components/graceDate.vue'
	export default {
		data() {
			return {
				modelIndex: 0,
				model: ['香港,N1841H', '福联,7050', '沙特阿美,2220'],
				paymentIndex: 0,
				payment: ['货到付款', '款到发货', '赊销方式'],
				warehouseIndex: 0,
				warehouse: ['请选择仓库', '中石油龙江易发贸易仓', '福州马江仓库', '广州云埔沙元仓'],
				supplierIndex: 0,
				supplier: ['金发科技股份有限公司', '台州市泰和塑料有限公司', '汕头市美森科技有限公司'],
				payIndex: 0,
				pay: ['兴建祥', '兴得铭', '对私'],
				logistiIndex: 0,
				logisti: ['请选择', '自提', '配送'],
				dateValue: "请选择",
				date1: '',
				show1: false
			}
		},
		methods: {
			bindPickerChange: function(e) {
				console.log(e);
				this.modelIndex = e.detail.value
			},
			bindPaymentChange: function(e) {
				console.log(e);
				this.paymentIndex = e.detail.value
			},
			bindWarehouseChange: function(e) {
				console.log(e);
				this.warehouseIndex = e.detail.value
			},
			bindSupplierChange: function(e) {
				console.log(e);
				this.supplierIndex = e.detail.value
			},
			bindPayChange: function(e) {
				console.log(e);
				this.payIndex = e.detail.value
			},
			closeDate1: function() {
				this.show1 = false;
			},
			showDate1: function() {
				this.show1 = true;
			},
			changeDate1: function(e) {
				this.date1 = e;
				this.show1 = false;
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "warehouse",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择仓库"
					},
					{
						name: "ck",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择仓库地址"
					},
					{
						name: "pay",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择付款方"
					},
					{
						name: "model",
						checkType: "in",
						checkRule: "",
						errorMsg: "请选择付款方式"
					},
					{
						name: "logisti",
						checkType: "in",
						checkRule: "",
						errorMsg: "请选择配送方式"
					},
					{
						name: "num",
						checkType: "int",
						checkRule: "1,3",
						errorMsg: "请输入吨数"
					},
					{
						name: "startDate",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择日期"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					this.$router.go(-1)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		},
		components: {
			graceDate
		},
	}
</script>

<style>
	.grace-body {
		width: 100%;
		box-sizing: border-box;
		padding: 0px 30upx;
		border-top: 1px solid #e0e0e0;
	}
	
	.grace-form .grace-items{
		border:none;
	}

	.grace-form .grace-items .input {

		margin-left: 0px;
	}

	button {
		background-color: #FF5722 !important;
	}

	.grace-form .grace-items .grace-label {
		width: 212upx;
	}

	.grace-form textarea {
		border: 1px solid #e0e0e0;
		padding: 8upx 5upx;
	}
</style>
