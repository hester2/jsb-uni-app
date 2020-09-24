<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form @submit="formSubmit" class="grace-form grace-margin-top">
					<view class="grace-items">
						<input type="text" v-show="false" :value="info.id" name="o.id">
						<view class="grace-label">开票公司</view>
						<input type="text" class="input" name="o.bill_company" v-bind:value="info.bill_company!=null?info.bill_company:''"
						 placeholder="请输入开票公司" />
					</view>
					<view class="grace-items">
						<view class="grace-label">税号</view>
						<input type="text" class="input" name="o.bill_no" v-bind:value="info.bill_no!=null?info.bill_no:''" placeholder="请输入纳税人识别号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开票联系人</view>
						<input type="text" class="input" name="o.bill_linkman" v-bind:value="info.bill_linkman!=null?info.bill_linkman:''"
						 placeholder="请输入开票联系人" />
					</view>
					<view class="grace-items">
						<view class="grace-label">联系方式</view>
						<input type="text" class="input" name="o.bill_tel" v-bind:value="info.bill_tel!=null?info.bill_tel:''"
						 placeholder="请输入联系方式" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开户行</view>
						<input type="text" class="input" name="o.bill_bank" v-bind:value="info.bill_bank!=null?info.bill_bank:''"
						 placeholder="请输入开户行" />
					</view>
					<view class="grace-items">
						<view class="grace-label">账号</view>
						<input type="text" class="input" name="o.bill_account" v-bind:value="info.bill_account!=null?info.bill_account:''"
						 placeholder="请输入账号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">收件地址</view>
						<input type="text" class="input" name="o.bill_address" v-bind:value="info.bill_address!=null?info.bill_address:''"
						 placeholder="请输入收件地址" />
					</view>
					<!-- 	<view class="grace-items grace-noborder">
							<view class="clien other">
								<textarea placeholder="备注..." name="o.bill_remark" v-bind:value="info.bill_remark!=null?info.bill_remark:''"></textarea>
							</view>
						</view> -->
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
				s: '',
				idCard1: 'http://assets.jinsubao.cn/photos.png',
				info: ''
			}
		},
		onLoad(option) {
			_self = this
			var id = option.id
			this.id = id
			uni.request({
				url: this.$webUrl + "/sale/order/orderDetail",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.info = res.data

				}
			})
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../salesPay/index?id=' +this.id,
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
					url: this.$webUrl + "/sale/order/update",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						if (res.data) {
							uni.showToast({
								title: '更新成功',
								icon: 'none'
							})
						}

					}
				})
				//console.log(JSON.stringify(e.detail.value));
			}
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderInvoice.css";

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
