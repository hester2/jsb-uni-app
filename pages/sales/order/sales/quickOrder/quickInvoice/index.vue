<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form @submit="formSubmit" class="grace-form grace-margin-top">
					<view class="grace-items">
						<view class="grace-label">开票公司</view>
						<input type="text" class="input" name="kaipiao" placeholder="请输入开票公司" />
					</view>
					<view class="grace-items">
						<view class="grace-label">税号</view>
						<input type="text" class="input" name="shuihao" placeholder="请输入纳税人识别号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开票联系人</view>
						<input type="text" class="input" name="nickname" placeholder="请输入联系人" />
					</view>
					<view class="grace-items">
						<view class="grace-label">联系方式</view>
						<input type="text" class="input" name="phoneno" placeholder="请输入手机号码" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开户行</view>
						<input type="text" class="input" name="kaihu" placeholder="请输入开户行" />
					</view>
					<view class="grace-items">
						<view class="grace-label">账号</view>
						<input type="text" class="input" name="zhanghao" placeholder="请输入账号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">收件地址</view>
						<input type="text" class="input" name="address" placeholder="请输入收件地址" />
					</view>
					<view class="grace-items grace-noborder">
						<view class="clien other">
							<textarea placeholder="备注..." name="desc"></textarea>
						</view>
					</view>
					<view class="ot-button-fixed" style="padding:22upx 0;">
						<button formType="submit" type="primary">保存修改</button>
						<button formType="submit" @tap="handleClick" type="primary">下一步</button>
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
				
			}
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../quickPay/index',
				})
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				//console.log(JSON.stringify(e.detail.value));
			}
		}
	}
</script>

<style>
	@import "../../../../../../common/css/orderInvoice.css";

	.ot-button-fixed {
		width: 100%;
		height: 74upx;
		display: flex;
		justify-content: space-between;

	}

	.ot-button-fixed button {
		width: 30%;
		height: 65upx;
		line-height: 65upx;
		font-size: 32upx;
		margin: 0px;
	}

	.ot-button-fixed button:nth-of-type(2) {
		border: 2upx solid #ff5722;
		background-color: transparent !important;
		color: #ff5722;
	}
</style>
