<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">仓库名称</view>
				<input type="text" class="input" name="price" placeholder="请输入仓库名称" />
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
				<input type="text" class="input" name="address" placeholder="请填写联详细地址"></input>
			</view>
			<view class="grace-items">
				<view class="grace-label">手机号码</view>
				<input type="text" class="input" name="phoneno" placeholder="请输入手机号码" />
			</view>
			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" style="width:100%;">立即提交</button>
			</view>
		</form>
				<mpvue-city-picker 
			:themeColor="themeColor" ref="mpvueCityPicker1" 
			:pickerValueDefault="cityPickerValueDefault1" 
			@onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				daId: 0,
				themeColor: '#007AFF', //颜色
				cityText1: "请选择所在地区", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null, //客户选择城市后保存的城市数据
			}
		},
		onLoad(option) {
			console.log(option.daId)
			_self = this;
		},
		methods: {
			formSubmit: function(e) {
				if (this.city1 == null) {
					uni.showToast({
						title: "请选择地区",
						icon: "none"
					});
					return false;
				}
				//定义表单规则
				var rule = [{
						name: "phoneno",
						checkType: "phoneno",
						checkRule: "1,11",
						errorMsg: "手机号码不对"
					},
					{
						name: "price",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入仓库名称"
					},
					{
						name: "address",
						checkType: "string",
						checkRule: "5,100",
						errorMsg: "请正确填写详细地址"
					}
				];
				//进行表单检查
				var formData = e.detail.value;
				formData.city1 = _self.city1.cityCode; //此处以保存用户城市代码为例
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					console.log(formData)
					this.$router.go(-1)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
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
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	.grace-body {
		box-sizing: border-box;
		padding: 0px 30upx;
		width: 100%;
	}
	
	.grace-form .grace-items{
		border:none !important;
	}

	.grace-form .grace-items .input {
		margin-left: 0px;
	}

	button {
		background-color: #ff5722 !important;
	}

	.grace-form .grace-items .grace-label {
		width: 212upx;
	}

	.grace-form textarea {
		border: 1px solid #e0e0e0;
		padding: 8upx 5upx;
	}
</style>
