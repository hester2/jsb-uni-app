<template>
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
				<view class="grace-label">含税价</view>
				<input type="text" class="input" name="price" placeholder="请输入含税价" />
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
			<view></view>
			<view class="grace-items">
				<view class="grace-label">付款时间</view>
				<view class="other">
					<input type="text" class="input" name="endDate" :disabled="true" :value="date2" @tap="showDate2" />
				</view>
			</view>
			<graceDate :show="show2" v-on:changeDate="changeDate2" :currentHour="12" v-on:closeDate="closeDate2" :currenMinute="58"></graceDate>
			<view class="grace-items">
				<view class="grace-label">数量（吨）</view>
				<input type="text" class="input" name="num" placeholder="请输入数量" />
			</view>
			<view class="grace-items">
				<view class="grace-label">提货地址</view>
				<input type="text" class="input" name="address" placeholder="请输入提货地址" />
			</view>
			<view class="grace-items">
				<textarea placeholder="添加说明..." name="desc"></textarea>
			</view>
			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" style="width:100%;">立即提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import graceDate from '../../../../graceUI/components/graceDate.vue'
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	export default {
		data() {
			return {
				modelIndex: 0,
				model: ['请选择', '香港,N1841H', '海洋,118'],
				paymentIndex: 0,
				payment: ['款到发货', '货到付款', '款到发货'],
				logistiIndex: 0,
				logisti: ['配送', '自提', '配送'],
				dateValue: "请选择",
				date2: '点击选择',
				show2: false
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
			bindLogistiChange: function(e) {
				console.log(e);
				this.logistiIndex = e.detail.value
			},
			closeDate2: function() {
				this.show2 = false;
			},
			showDate2: function() {
				this.show2 = true;
			},
			changeDate2: function(e) {
				this.date2 = e;
				this.show2 = false;
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "price",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入含税价"
					},
					{
						name: "model",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择型号"
					},
					{
						name: "model",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择付款方式"
					},
					{
						name: "logisti",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择配送方式"
					},
					{
						name: "num",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入吨数"
					},
					{
						name: "address",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入地址"
					},
					{
						name: "desc",
						checkType: "",
						checkRule: "",
						errorMsg: "请输入备注"
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
		box-sizing: border-box;
		width: 100%;
		padding: 0px 30upx;
	}

	.grace-form .grace-items .input {
		border-bottom: 0px solid #f5f6f8;
		margin-left: 0px;
	}

	.grace-form .grace-items {
		border: 0px solid #eee;
	}

	button {
		background-color: #ff5722 !important;
	}

	.grace-form .grace-items .grace-label {
		width: 212upx;
	}

	.grace-form textarea {
		padding: 8upx 0upx;
		box-sizing: border-box;
	}
</style>
