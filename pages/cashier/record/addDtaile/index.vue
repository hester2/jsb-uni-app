<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">产品型号</view>
					<view class="other">
						<picker @change="bindProductChange" :value="productIndex" :range="product" name="product">
							<text>{{product[productIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">客户</view>
					<input type="text" class="input" name="nickname" value="厦门市华商有限公司" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">联系电话</view>
					<input type="text" class="input" name="phoneto" value="13545064255" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">来款金额</view>
					<input type="text" class="input" name="laikuan" placeholder="请输入来款金额" />
				</view>
				<view class="grace-items">
					<view class="grace-label">银行</view>
					<view class="other">
						<picker @change="bindBankChange" :value="bankIndex" :range="bank" name="bank">
							<text>{{bank[bankIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">来款日期</view>
					<view class="other">
						<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2018-01-01" end="2022-01-01">
							<text>{{dateValue == null ? '请选择' : dateValue}}</text>
						</picker>
					</view>
				</view>
				<view style="padding:22rpx 0;">
					<button formType="submit" type="primary">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				productIndex: 0,
				product: ['请选择', '福联,7042', '福联,1802'],
				bankIndex: 0,
				bank: ['建行', '民行', '农行'],
				dateValue: "请选择来款日期"
			}
		},
		methods: {
			bindProductChange: function(e) {
				console.log(e);
				this.productIndex = e.detail.value
			},
			bindBankChange: function(e) {
				console.log(e);
				this.bankIndex = e.detail.value
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				this.$router.go(-1)
				console.log(JSON.stringify(e.detail.value));
			},
		}
	}
</script>

<style>
	.grace-body {
		padding: 0px 30rpx;
	}

	button {
		background-color: #FF5722 !important;
	}
</style>
