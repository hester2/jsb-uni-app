<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form @submit="formSubmit" class="grace-form grace-margin-top">
					<view class="grace-items">
						<input type="text" name="c.id" :value="c.id" v-show="false">
						<view class="grace-label">开票公司</view>
						<input type="text" class="input" name="c.bill_company" placeholder="请输入开票公司" :value="c.bill_company"/>
					</view>
					<view class="grace-items">
						<view class="grace-label">税号</view>
						<input type="text" class="input" name="c.bill_no" :value="c.bill_no" placeholder="请输入纳税人识别号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开票联系人</view>
						<input type="text" class="input" name="c.bill_linkman" :value="c.bill_linkman" placeholder="请输入联系人" />
					</view>
					<view class="grace-items">
						<view class="grace-label">联系方式</view>
						<input type="text" class="input" name="c.bill_tel" :value="c.bill_tel" placeholder="请输入手机号码" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开户行</view>
						<input type="text" class="input" name="c.bill_bank" :value="c.bill_bank" placeholder="请输入开户行" />
					</view>
					<view class="grace-items">
						<view class="grace-label">账号</view>
						<input type="text" class="input" name="c.bill_account" :value="c.bill_account" placeholder="请输入账号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">收件地址</view>
						<input type="text" class="input" name="c.bill_address" :value="c.bill_address" placeholder="请输入收件地址" />
					</view>
					<view class="grace-items grace-noborder">
						<view class="clien other">
							<textarea placeholder="请输入开票要求" name="c.bill_remark" :value="c.bill_remark"></textarea>
						</view>
					</view>
					<view class="ot-button-fixed" style="padding:22upx 0;">
						<button formType="submit" type="primary">提交</button>
						<button formType="submit" @tap="handleClick" type="primary">下一步</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				c:{}
			}
		},
		onLoad(option) {
			_self = this
			var id = option.id
			uni.request({
				url:this.$webUrl+"/sale/findCustomer",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.c = res.data
				}
			})
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../customerContact/index?id='+_self.c.id,
				})
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0
				});
			},
			formSubmit: function(e) {
				var formData = e.detail.value
				uni.request({
					url:this.$webUrl+"/sale/updateCustomer",
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					data:formData,
					success(res){
						if(res.data){
							uni.showToast({
								title:'更新成功'
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import "../../../../common/css/orderInvoice.css";

	.ot-button-fixed {
		width: 100%;
		height: 74upx;
		display: flex;
		justify-content: space-between;

	}

	.ot-button-fixed button {
		width: 26%;
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
