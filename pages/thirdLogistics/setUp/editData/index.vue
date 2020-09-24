<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">名称</view>
					<input type="text" class="input" name="nickname" value="其它物流" placeholder="请填写名称"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">联系姓名</view>
					<input type="text" class="input" name="name" value="李四" placeholder="请填写联系姓名"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">联系电话</view>
					<input type="text" class="input" name="phoneno" value="13542562561" placeholder="请填写联系电话"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">所在地区</view>
					<view @click="cityPicker1" class="other">
						{{cityText1}}
						<text class="grace-icons icon-arrow-right"></text>
					</view>
				</view>
				<view class="grace-items grace-noborder">
					<view class="grace-label">详细地址</view>
					<input type="text" class="input" value="" name="address" placeholder="请填写联详细地址"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">座机</view>
					<input type="text" class="input" name="zuoji" placeholder="请填写座机"></input>
				</view>
				<view style="padding:30rpx 0;">
					<button formType="submit" type="primary" class="grace-button grace-border-radius">提交</button>
				</view>
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
				 @onConfirm="onConfirm1">
				</mpvue-city-picker>
			</form>
		</view>
	</view>
</template>

<script>
	import mpvuePicker from '../../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				themeColor: '#007AFF', //颜色
				cityText1: "请选择所在地区", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null, //客户选择城市后保存的城市数据
			}
		},
		created() {
			_self = this;
		},
		methods: {
			cityPicker1: function() {
				this.$refs.mpvueCityPicker1.show();
			},
			onConfirm1(e) {
				var cityText1 = e.label;
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
			formSubmit: function(e) {
				if (this.city1 == null) {
					uni.showToast({
						title: "请选择地区",
						icon: "none"
					});
					return false;
				}
				var rule = [{
						name: "nickname",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "名称不能为空"
					},
					{
						name: "name",
						checkType: "string",
						checkRule: "1,10",
						errorMsg: "联系人应为1-20个字符"
					},
					{
						name: "phoneno",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请正确填写手机号"
					},
					{
						name: "address",
						checkType: "string",
						checkRule: "5,100",
						errorMsg: "请正确填写详细地址"
					}
				];
				var formData = e.detail.value;
				formData.city1 = _self.city1.cityCode; //此处以保存用户城市代码为例
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "提交成功",
						icon: "success"
					});
					console.log(formData);
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	button {
		background-color: #FF5722 !important;
		border-radius: 10rpx !important;
	}

	.grace-body {
		box-sizing: border-box;
		padding: 0px 30rpx;
	}
	.grace-form .grace-items{
		border:none;
		}
</style>
