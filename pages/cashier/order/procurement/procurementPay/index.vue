<template>
	<view class="">
		<view class="grace-space">
			<button type="primary" class="grace-button btn" size="mini" @tap="showDialog3">添加凭证</button>
			<button type="primary" class="grace-button btn" size="mini" @tap="handlePay">完成支付</button>
		</view>
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">出款金额:</view>
					<view class="demo7  grace-no-scale">680000.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">出款日期:</view>
					<view class="demo7  grace-no-scale">2019-08-17</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7  grace-no-scale">已到账</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">操作:</view>
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button ot-pay-btn" size="mini" @tap="previewImg3">预览</button>
					</view>
				</view>
			</view>
		</view>
		<view style="padding:22upx 20upx;">
			<button class="ot-button" formType="submit" type="primary" @tap="handleClick" style="width:100%;">下一步</button>
		</view>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<graceDialog  :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
				<view slot="content" class="content">
					<view class="ot-pay-qp">上传凭证</view>
					<view class="grace-items">
						<view class="grace-label">出款金额</view>
						<input type="text" class="input" name="chukuan" placeholder="出款金额" />
					</view>
					<view class="grace-items">
						<view class="grace-label">付款人</view>
						<view class="other">
							<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
								<text>{{gender[genderIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">收款人</view>
						<input type="text" class="input" name="shoukuan" value="中化石化销售有限公司" placeholder="" />
					</view>
					<view class="grace-items">
						<view class="grace-label">所在行</view>
						<view class="other">
							<picker @change="bindCountChange" :value="countIndex" :range="count" name="count">
								<text>{{count[countIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">付款类型</view>
						<view class="grace-label-x">
							<radio-group name="aihao">
								<label>
									<radio value="1"></radio>对公
								</label>
								<label>
									<radio value="2"></radio>对私
								</label>
							</radio-group>
						</view>
					</view>
					<view class="grace-items">
						<view class="ot-pay-hl" @tap="selectImg3">上传凭证</view>
					</view>
					<view class="grace-items lo">
						<view class="grace-idcard-preview">
							<view class="ot-Dtailes-ofo">
								<image :src="idCard3" @tap="previewImg3"></image>
							</view>
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
	import graceDialog from '../../../../../graceUI/components/graceDialog.vue';
	export default {
		data() {
			return {
				idCard1: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2997502425,1125939591&fm=26&gp=0.jpg',
				idCard3: 'http://assets.jinsubao.cn/photos2.png',
				show3: false,
				genderIndex: 0,
				gender: ['厦门市兴建祥贸易有限公司', '厦门市兴得铭贸易有限公司'],
				dateValue: "请选择",
				countIndex: 0,
				count: ['中国建设银行', '广东华兴银行'],
			}
		},
		methods: {
			handleClick() {
				uni.navigateTo({
					url: '../procurementInvoice/index',
				});
			},
			showDialog3: function() {
				this.show3 = true;
			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3: function() {
				this.closeDialog3();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				console.log(JSON.stringify(e.detail.value));
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1]
				});
			},

			selectImg3: function() {
				var _self = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard3=res.tempFilePaths[0]
					}
				})
			},
			previewImg3: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard3],
					current: 0 
				});
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex= e.detail.value
			},
			bindCountChange: function(e) {
				console.log(e);
				this.genderIndex=e.detail.value
			},
			handleDel(e) {
				var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认!",
								icon: "none"
							});
							// 用户点击了确定 可以调用删除方法了

							// list.splice(current, 1)

							// this.setData({
							//   list: list
							// })

						} else if (sm.cancel) {}
					}
				})
			},
		},
		components: {
			graceDialog: graceDialog
		},
	}
</script>

<style>
	@import "../../../../../common/css/orderPay.css";
	.ot-button{
		background-color: #FF5722 !important;
	}
</style>
