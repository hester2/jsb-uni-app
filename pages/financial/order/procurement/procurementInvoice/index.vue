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
					<view class="ot-button-fixed" style="padding:22upx 0;">
						<button formType="submit" type="primary">提交</button>
						<button  @tap="handleClick" type="primary">下一步</button>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				 idCard1: 'http://assets.jinsubao.cn/photos2.png'
			}
		},
		methods:{
			handleClick() {
			    uni.navigateTo({
			      url: '../procurementContract/index',
			    })
			  },
			  previewImg1: function () {
			    var _self = this
			    uni.previewImage({
			      urls: [_self.idCard1],
				  current:0
			    });
			  },
			  formSubmit: function(e) {
			  	uni.showToast({
			  		title: '请观察控制台',
			  		icon: 'none'
			  	});
			  	console.log(JSON.stringify(e.detail.value));
			  }
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderInvoice.css";
</style>
