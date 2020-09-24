<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">旧密码</view>
				<input type="password" class="input" value="" name="pwd" />
			</view>
			<view class="grace-items">
				<view class="grace-label">新密码</view>
				<input type="password" class="input" value="" name="pwd2" />
			</view>
			<view style="padding:22upx 0;">
				<button formType="submit" type="primary" style="width:100%;">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
	export default {
		data() {
			return {
			}
		},
		methods: {
			formSubmit: function(e) {
				//进行表单检查
				var formData = e.detail.value;
				var rule = [
					{
						name: "pwd",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "旧密码不能为空"
					},
					{
						name: "pwd2",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "新密码不能为空"
					},
				]
				var checkRes = graceChecker.check(formData, rule);
				formData.phone = uni.getStorageSync("phoneno")
				if (checkRes) {
					uni.request({
						url:this.$webUrl+"/doChangePwd",
						data:formData,
						header:{'Access-Token':uni.getStorageSync("token")},
						success(res) {
							if(res.data){
								uni.showToast({
									title:'修改成功'
								})
							}
							else{
								uni.showToast({
									title:'修改失败',
									icon:'none'
								})
							}
						},
						fail(){
							uni.showToast({
								title:'修改失败',
								icon:'none'
							})
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
