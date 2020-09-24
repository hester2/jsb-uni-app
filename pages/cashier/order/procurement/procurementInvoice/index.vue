<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form @submit="formSubmit" class="grace-form grace-margin-top">
					<view class="grace-items">
						<view class="grace-label">开票公司</view>
						<input type="text" class="input" name="com" placeholder="请输入开票公司" />
					</view>
					<view class="grace-items">
						<view class="grace-label">税号</view>
						<input type="text" class="input" name="ein" placeholder="请输入纳税人识别号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">联系方式</view>
						<input type="text" class="input" name="phoneno" placeholder="请输入手机号码" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开户行</view>
						<input type="text" class="input" name="where" placeholder="请输入开户行" />
					</view>
					<view class="grace-items">
						<view class="grace-label">账号</view>
						<input type="text" class="input" name="account" placeholder="请输入账号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">收件地址</view>
						<input type="text" class="input" name="address" placeholder="请输入收件地址" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开票联系人</view>
						<input type="text" class="input" name="nickname" placeholder="请输入联系人" />
					</view>
					<view class="grace-items">
						<view class="grace-label">发票号</view>
						<input type="text" class="input" name="invoice" placeholder="请输入发票号" />
					</view>
					<view class="grace-items grace-noborder">
						<view class="clien other">
							<textarea placeholder="备注..." name="desc"></textarea>
						</view>
					</view>
					<view class="grace-idcard-preview">
						<image :src="idCard1" @tap="previewImg1" mode="widthFix"></image>
					</view>
					<view style="padding:22rpx 0;">
						<button formType="submit" type="primary" @tap="handleClick" style="width:100%;">立即提交</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				idCard1: 'http://assets.jinsubao.cn/zanwu1.png'
			}
		},
		methods: {
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0 
				});
			},
		}
	}
</script>

<style>
	page {
		background-color: #eee;
	}

	.ot-Dtailes-host {
		margin: 20rpx 20rpx;
		background-color: #fff;
		padding: 0px 20rpx;
		border-radius: 10rpx;
	}

	.grace-form .grace-items .clien.other {
		margin-left: 0px;
		padding-left: 0px;
	}
	
	.grace-form .grace-items{
		border:none;
		}

	.grace-form textarea {
		font-size: 30rpx;
	}

	button {
		background-color: #fe5722 !important;
	}

	.ot-submit-img {
		display: flex;
		flex-direction: row;
		justify-content: flex-start !important;
	}

	.ot-submit-img view {
		margin-right: 30rpx;
		line-height: 60rpx;
		height: 60rpx;
		padding: 0px 20rpx;
		box-sizing: border-box;
		color: #fff;
		background-color: #fe5722 !important;
	}

	.grace-idcard-preview image {
		width: 25%;
	}

	.grace-form .grace-items .grace-label {
		width: 140rpx;
	}
</style>
