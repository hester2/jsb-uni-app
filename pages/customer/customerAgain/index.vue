<template>
	<view class="">
		<view class="grace-space">
			<button type="primary" class="grace-button btn" size="mini" @tap="showDialog3">再销售订单</button>
		</view>
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">订单号:</view>
					<view class="demo7  grace-no-scale">XS_1566801509480</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">厦门市华商有限公司</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系方式:</view>
					<view class="demo7  grace-no-scale">15862003658</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7  grace-no-scale">1.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">单价:</view>
					<view class="demo7  grace-no-scale">9000.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">总金额:</view>
					<view class="demo7  grace-no-scale">9000.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">含税/不含:</view>
					<view class="demo7  grace-no-scale">含税</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">操作:</view>
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button ot-pay-bth" size="mini" @tap="handleDel">取消</button>
					</view>
				</view>
			</view>
		</view>
		<view class="ot-button">
			<button type="warn" @tap="handleClick" class="grace-button">
				下一步
			</button>
		</view>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
				<view slot="content" class="content">
					<view class="ot-pay-qp">上传凭证</view>
					<view class="grace-items">
						<view class="grace-label">数量</view>
						<input type="text" class="input" name="chukuan" placeholder="出款金额" />
					</view>
					<view class="grace-items">
						<view class="grace-label">客户名称</view>
						<view class="other">
							<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
								<text>{{gender[genderIndex]}}</text>
							</picker>
						</view>
					</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view>
							<button type="primary" @tap="closeDialog3">取消</button>
						</view>
						<view>
							<button type="primary" style="color:#3688FF;" @tap="confirm3" formType="submit">立即提交</button>
						</view>
					</view>
				</view>
			</graceDialog>
		</form>
	</view>
</template>

<script>
	import graceDialog from '../../../graceUI/components/graceDialog.vue';
	export default {
		data() {
			return {
				show3: false,
				genderIndex: 0,
				gender: ['厦门市华商有限公司', '厦门市华克塑料有限公司'],
				dateValue: "请选择",
			}
		},
		methods: {
			showDialog3 : function(){
			this.show3 = true;
		},
		closeDialog3 : function(){
			this.show3 = false;
		},
		confirm3 : function(){
			this.closeDialog3();
			uni.showToast({title:"您点击了确认按钮", icon:"none"});
		},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
			},
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex=e.detail.value
			},
			handleDel(e) {
				var index = e.target.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认取消？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认!",
								icon: "none"
							});
						} else if (sm.cancel) {}
					}
				})
			},
			handleClick() {
				uni.navigateTo({
					url: '../customerLogistics/index',
				})
			},
		},
		components : {
		graceDialog : graceDialog
	},
	}
</script>

<style>
	page {
		background-color: #eee;
	}

	.ot-Dtailes-host {
		margin: 20upx 20upx;
		background-color: #fff;
		padding: 10upx 30upx;
		border-radius: 10upx;
		padding-bottom: 20upx;
	}

	.icon-dingdan:before {
		content: "\e608";
	}

	.hj.grace-list .items .icons {
		color: #5CA7E2;
		font-size: 36upx !important;
	}

	.hj.grace-list .items .body {
		margin-left: 5px;
		padding: 2px 0px;
	}

	.hj.grace-list .items {
		border-bottom: 1px dashed #ccc;
		margin: 0px;
		margin-bottom: 30upx;
	}

	.hj.grace-list {
		padding: 0px;
	}

	.ot-daile-mast {
		background-color: #FF5722;
		border-radius: 40upx;
		height: 35upx;
		text-align: center;
		line-height: 35upx;
		font-size: 30upx;
		color: #fff;
		width: 110upx;
		padding: 0px 10upx;
	}

	.grace-space-between {
		margin-top: 15upx;
	}

	.grace-space-between .demo6 {
		color: #999;
		font-size: 30upx;
	}

	.grace-space-between .demo7 {
		color: #999;
		font-size: 30upx;
	}

	.ot-pay-btn {
		height: 50upx !important;
		line-height: 50upx !important;
		border: 1px solid #ccc;
		background-color: transparent !important;
		color: #575757 !important;
	}

	.ot-pay-bth {
		height: 50upx !important;
		line-height: 50upx !important;
		background-color: #FF5722;
		margin-left: 20upx;
	}

	.grace-no-scale button[size=mini] {
		display: inline-block;
		line-height: 2.3;
		font-size: 13px;
		padding: 0 20upx;

	}

	.grace-space {
		background-color: #fff;
		box-sizing: border-box;
		padding: 10upx 20upx;
		border-top: 1px solid #eee;
		margin: 0px;
	}

	.ot-pay-bto {
		background-color: #5CA7E2 !important;
		padding: 0px 10upx !important;
	}

	button {
		padding: 0px 20upx !important;
	}

	.ot-button {
		width: 100%;
		box-sizing: border-box;
		padding: 0px 25upx;
		margin-top: 30upx;
	}
	.ot-button button{
		height:74upx !important ;
		line-height: 74upx !important;
	}

	.grace-button {
		background-color: #FF5722 !important;
	}

	.btn {
		background-color: #FF5722 !important;
		margin-top: 10upx;
		height:52upx !important ;
		line-height: 52upx !important;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 40upx;
	}
</style>
