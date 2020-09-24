<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">订单类型</view>
				<view class="other">
					<picker @change="bindModelChange" :value="modelIndex" :range="model" name="model">
						<text>{{model[modelIndex]}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">订单类型</view>
				<view class="other">
					<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
						<text>{{gender[genderIndex]}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">开始日期</view>
				<view class="other">
					<picker @change="bindDateChange" :value="dateValue" mode="date" name="start" start="2018-01-01">
						<text>{{dateValue == null ? '请选择' : dateValue}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">结束日期</view>
				<view class="other">
					<picker @change="bindHandChange" :value="dateHand" mode="date" name="end" start="2018-01-01">
						<text>{{dateHand == null ? '请选择' : dateHand}}</text>
					</picker>
				</view>
			</view>
			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" style="width:100%;">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	export default {
		data() {
			return {
				genderIndex: 0,
				gender: ['所有订单', '销售订单', '现金订单'],
				modelIndex: 0,
				model: ['请选择', '3，3', '福联,7042'],
				dateValue: "2019-01-01",
				dateHand: '2019-08-27'
			}
		},
		methods: {
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			bindModelChange: function(e) {
				//console.log(e);
				this.modelIndex = e.detail.value
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			bindHandChange: function(e) {
				this.dateHand = e.detail.value
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				uni.navigateBack({
					delta: 1,
				});
				//console.log(JSON.stringify(e.detail.value));
			},
		}
	}
</script>

<style>
	.grace-body {
		box-sizing: border-box;
		padding: 0px 30upx;
	}

	button {
		background-color: #FF5722 !important;
	}
</style>
