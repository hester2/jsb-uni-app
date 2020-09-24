<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form  class="grace-form grace-margin-top">
					<input type="text" name="s.id" :value="order.id" v-show="false">
					<view class="grace-items">
						<view class="grace-label">开票公司</view>
						<input type="text" class="input" name="s.bill_company" :value="order.bill_company" placeholder="请输入开票公司" />
					</view>
					<view class="grace-items">
						<view class="grace-label">税号</view>
						<input type="text" class="input" name="s.bill_no" :value="order.bill_no" placeholder="请输入纳税人识别号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">联系方式</view>
						<input type="text" class="input" name="s.bill_tel" :value="order.bill_tel" placeholder="请输入手机号码" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开户行</view>
						<input type="text" class="input" name="s.bill_bank" :value="order.bill_bank" placeholder="请输入开户行" />
					</view>
					<view class="grace-items">
						<view class="grace-label">账号</view>
						<input type="text" class="input" name="s.bill_account" :value="order.bill_account" placeholder="请输入账号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">收件地址</view>
						<input type="text" class="input" name="s.bill_address" :value="order.bill_address" placeholder="请输入收件地址" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开票联系人</view>
						<input type="text" class="input" name="s.bill_linkman" :value="order.bill_linkman" placeholder="请输入联系人" />
					</view>
					<view class="grace-items grace-noborder">
						<view class="clien other">
							<textarea placeholder="备注..." name="desc"></textarea>
						</view>
					</view>
				</form>
			</view>
		</view>
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form  class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">发票号</view>
					<input type="text" class="input" disabled name="s.bill_linkman" value="" placeholder="" />
				</view>
				<view class="grace-idcard-preview">
					<image :src="idCard1" @tap="previewImg1" mode="widthFix"></image>
				</view>
				</form>
			</view>
		</view>
		<view class="ot-button" style="margin:30upx 20upx;">
			<button formType="submit" @tap="handleClick" type="primary">下一页</button>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				idCard1: 'http://assets.jinsubao.cn/photos2.png',
				order: [],
				id: ''
			}
		},
		onLoad(option) {
			_self = this
			_self.id = option.id
			uni.request({
				url: this.$webUrl + "/logistics/supplierOrderDetail",
				data: {
					id: _self.id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.order = res.data
					for (var key in _self.order) {
						if (_self.order[key] == null) {
							_self.order[key] = ""
						}
					}

				}
			})
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../procurementContract/index?id=' + _self.id,
				})
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: _self.$webUrl + "/file/getUploadFile?fileName=" + order.invoice_file_id,
					current: 0
				});
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderInvoice.css";

	.ot-button button{
		    height: 74upx !important;
		    line-height: 74upx !important;
	}
</style>
