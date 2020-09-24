<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form  class="grace-form grace-margin-top">
					<view class="grace-items">
						<view class="grace-label">发票号</view>
						<input type="text" class="input" name="invoice" :value="o.invoice_file_num" placeholder="请输入发票号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开票公司</view>
						<input type="text" class="input" name="com" :value="o.bill_company" placeholder="请输入开票公司" />
					</view>
					<view class="grace-items">
						<view class="grace-label">税号</view>
						<input type="text" class="input" name="ein" :value="o.bill_no" placeholder="请输入纳税人识别号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">联系方式</view>
						<input type="text" class="input" name="phoneno" :value="o.bill_tel" placeholder="请输入手机号码" />
					</view>
					<view class="grace-items">
						<view class="grace-label">开户行</view>
						<input type="text" class="input" name="where" :value="o.bill_bank" placeholder="请输入开户行" />
					</view>
					<view class="grace-items">
						<view class="grace-label">账号</view>
						<input type="text" class="input" name="account" :value="o.bill_account" placeholder="请输入账号" />
					</view>
					<view class="grace-items">
						<view class="grace-label">收件地址</view>
						<input type="text" class="input" name="address" :value="o.bill_address" placeholder="请输入收件地址" />
					</view>
					<view class="grace-items">
						<view class="grace-label">联系人</view>
						<input type="text" class="input" name="nickname" :value="o.bill_linkman" placeholder="请输入联系人" />
					</view>
					<view style="padding:22rpx 0;">
						<button  type="primary" @tap="handleClick" style="width:100%;">下一页</button>
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
				o:{}
			}
		},
		onLoad(option){
			_self=this
			var id=option.id
			uni.request({
				url:this.$webUrl+"/sale/order/orderDetail",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					var data=res.data
					for(var s in data){
						if(data[s]==null){
							data[s]=""
						}
					}
					_self.o=data
				}
			})
		},
		methods: {
			handleClick(){
				uni.navigateTo({
					url: '../salesContract/index?id='+_self.o.id,
				});
				}
		}
	}
</script>

<style>
 @import "../../../../../../common/css/orderInvoice.css";
</style>
