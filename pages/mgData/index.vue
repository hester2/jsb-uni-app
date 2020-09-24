<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<input type="text" :value="salesman.id" name="v.id" v-show="false">
				<view class="grace-label">姓名</view>
				<input type="text" class="input" :value="salesman.name" name="v.name" />
			</view>
			<view class="grace-items">
				<view class="grace-label">电话号码</view>
				<input type="phoneno" class="input" :value="salesman.tel" name="v.tel" />
			</view>
			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" style="width:100%;">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
	import common from '../../common/common.js'
	var _self
	export default {
		data() {
			return {
				nickname: common.nickname,
				phoneno: common.phoneno,
				password: '',
				salesman: []
			}
		},
		onLoad() {
			_self = this;
			uni.request({
				data: {
					phone: uni.getStorageSync("phoneno")
				},
				url: _self.$webUrl + "/sale/profile",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.salesman = res.data
					console.log(_self.salesman )
					
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
						name: "v.name",
						checkType: "string",
						checkRule: "1,3",
						errorMsg: "姓名应为1-3个字符"
					},
					{
						name: "v.tel",
						checkType: "phoneno",
						checkRule: "1,11",
						errorMsg: "请输入11位手机号码"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url: this.$webUrl + "/sale/doProfile",
						data: formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							if (res.data) {
								uni.showToast({
									title: "验证通过!",
									icon: "none"
								});
							}
						}
					})
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
	.grace-body {
		padding: 0px 20upx;
	}

	.grace-margin-top {
		margin: 0px;
	}

	.grace-label {
		font-size: 16px;
	}

	.grace-items {
		border-bottom: 1px solid #cecece !important;
	}

	.ot-data-bg {
		background-color: #eee;
		padding-left: 20upx;
		height: 40px;
		line-height: 40px;
		color: #666;
		font-size: 16px;
		box-sizing: border-box;
	}

	button {
		background-color: #ff5722 !important;
	}
</style>
