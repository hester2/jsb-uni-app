<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">名称</view>
				<input type="text" class="input" name="names" value="吴某某" placeholder="请输入联系人" />
			</view>
			<view class="grace-items">
				<view class="grace-label">性别</view>
				<view class="other">
					<picker bindchange="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
						<text>{{gender[genderIndex]}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label">手机</view>
				<input type="text" class="input" value="13542512563" placeholder="请输入手机号码" name="phoneno" />
			</view>
			<view class="grace-items">
				<view class="grace-label">职位</view>
				<input type="text" class="input" value="销售" placeholder="请输入职位" name="xiaoshou" />
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
				genderIndex: 2,
				gender: ['请选择', '男', '女'],
				dateValue: "请选择"
			}
		},
		methods: {
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				this.$router.go(-1)
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

	.grace-margin-top {
		margin-top: 0px;
	}
	
	.grace-form .grace-items{
		border:none;
	}

	button {
		background-color: #FF5722 !important;
	}

	.grace-label-x radio-group {
		justify-content: flex-end;
	}
</style>
