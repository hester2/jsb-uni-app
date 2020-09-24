<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="grace-body">
					<form @submit="formSubmit" class="grace-form grace-margin-top">
						<view class="grace-items ot-dtaile-fo">
							<view class="grace-label">开票公司</view>
							<input type="text" class="input" name="kaipiao" value="" disabled />
						</view>
						<view class="grace-items ot-dtaile-fo">
							<view class="grace-label">税号</view>
							<input type="text" class="input" name="shuihao" value="" disabled />
						</view>
						<view class="grace-items ot-dtaile-fo">
							<view class="grace-label">联系人</view>
							<input type="text" class="input" name="name" value="" disabled />
						</view>
						<view class="grace-items ot-dtaile-fo">
							<view class="grace-label">电话</view>
							<input type="text" class="input" name="phone" value="" disabled />
						</view>
						<view class="grace-items ot-dtaile-fo">
							<view class="grace-label">开户行</view>
							<input type="text" class="input" name="kaihu" value="" disabled />
						</view>
						<view class="grace-items ot-dtaile-fo">
							<view class="grace-label">账号</view>
							<input type="text" class="input" name="" value="" disabled />
						</view>
						<view class="grace-items grace-noborder">
							<view class="grace-label">收件地址</view>
							<input type="text" class="input" value="" name="address" disabled></input>
						</view>
						<view class="grace-items grace-noborder">
							<view class="clien other">
								<textarea placeholder="请输入开票要求内容..." disabled name="desc"></textarea>
							</view>
						</view>
						<view style="padding:22rpx 0;">
							<button formType="submit" @tap="handleClick" type="primary" style="width:100%;">下一页</button>
						</view>
					</form>
				</view>
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
					url: '../salesContract/index'
				})
			},
			formSubmit(e){
				console.log(e.detail.value)
			}
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderInvoice.css";

	.ot-Dtailes-host {
		background-color: #fff;
		padding: 0px 30upx;
		margin: 20upx 20upx;
		box-sizing: border-box;
		border-radius: 10upx;
	}
</style>
