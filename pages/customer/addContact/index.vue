<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">名称</view>
				<input type="text" class="input" name="names" value="" placeholder="请输入联系人" />
			</view>
			<view class="grace-items">
				<view class="grace-label">性别</view>
				<view class="other">
					<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
						<text>{{gender[genderIndex]}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">手机</view>
				<input type="text" class="input" value="" placeholder="请输入手机号码" name="phoneno" />
			</view>
			<view class="grace-items">
				<view class="grace-label">职位</view>
				<input type="text" class="input" value="" placeholder="请输入职位" name="xiaoshou" />
			</view>
			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" style="width:100%;">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				genderIndex: 0,
				gender: ['请选择', '男', '女'],
				dateValue: null
			}
		},
		methods: {

			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			formSubmit: function(e) {
				var rule = [{
						name: "names",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入姓名"
					},
					{
						name: "gender",
						checkType: "in",
						checkRule: "男,女",
						errorMsg: "请选择性别"
					},
					{
						name: "phoneno",
						checkType: "phoneno",
						checkRule: "1,11",
						errorMsg: "请输入手机号码"
					},
					{
						name: "xiaoshou",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入职位"
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
					//console.log(JSON.stringify(e.detail.value));
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
		box-sizing: border-box;
		padding: 0px 30upx;
	}

	.grace-form .grace-items {
		border: none;
	}

	button {
		background-color: #FF5722 !important;
	}

	.grace-label-x radio-group {
		justify-content: flex-end;
	}
</style>
