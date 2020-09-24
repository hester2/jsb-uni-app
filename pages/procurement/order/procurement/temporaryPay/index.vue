<template>
	<view class="">

		<view class="ot-Dtailes-host ot-padding">
			总金额：
			<text>8500.00</text>
		</view>
		<view class="ot-Dtailes-host">
			<view class="ot-home-qx mn">
				<text></text>
				<text>支付信息</text>
			</view>
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
						<button type="primary" class="grace-button ot-pay-bth" size="mini" @tap="handleDel($event)">删除</button>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-space">
			<button type="primary" class="grace-button btn" size="mini" @tap="showDialog3">添加凭证</button>
			<button type="primary" class="grace-button btn" size="mini" @tap="handlePay">完成支付</button>
			<button type="primary" class="grace-button btn" size="mini" @tap="handleCon">确认到款</button>
		</view>

		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
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
	var _self;
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
				count: ['3510 1551 0010 5000 5111', '3510 1551 0010 5000 5111'],
			}
		},
		created() {
			_self = this
		},
		methods: {
			handlePay() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认完成支付？',
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
			handleCon() {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认到款？',
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
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			bindCountChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0
				});
			},

			selectImg3: function() {
				var _self = this

				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard3 = res.tempFilePaths[0]
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
			confirm3: function() {
				this.closeDialog3();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中"
				});
				var uploadTask3 = uni.uploadFile({
					url: '',
					filePath: _self.idCard3,
					fileType: 'image',
					name: 'data',
					success: function(uploadFileRes) {
						// 上传成功后返回服务器端保存的路径
						console.log(uploadFileRes.data);
						uni.hideLoading();
					},
					error: function() {

					}
				});
			},
			formSubmit: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				console.log(JSON.stringify(e.detail.value));
			},
			handleDel(e) {
				console.log(e)
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
		},
		components: {
			graceDialog: graceDialog
		},
	}
</script>

<style>
	page {
		background-color: #fff;
	}

	.ot-Dtailes-host {
		margin: 20upx 20upx;
		background-color: #fff;
		padding: 10upx 30upx;
		border-radius: 10upx;
		padding-bottom: 20upx;
		box-shadow: 2upx 2upx 12upx #ccc;
	}

	.icon-dingdan:before {
		content: "\e608";
	}

	.hj.grace-list .items .icons {
		color: #5ca7e2;
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
		background-color: #ff5722;
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

	.ot-button {
		width: 100%;
		box-sizing: border-box;
		padding: 0px 20upx;
	}

	.grace-button {
		background-color: #ff5722 !important;
	}

	.btn {
		background-color: #ff5722 !important;
		margin-top: 10upx;
	}

	.grace-space {
		background-color: transparent;
		justify-content: flex-start;
		border: none;
	}

	.grace-space button {
		margin-right: 40upx;
	}

	.grace-space button[size=mini] {
		line-height: 53upx;
	}

	.grace-idcard-preview view:nth-of-type(1) image {
		width: 100%;
		display: block;
		height: 170upx;
		position: relative;
	}

	.ot-position {
		position: absolute;
		top: 0px;
		left: 0px;
	}

	/* 图 */

	.grace-idcard-preview view:nth-of-type(1) {
		display: flex;
		flex-direction: column;
		width: 200upx;
	}

	.ot-pay-qp {
		text-align: center;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 40upx;
	}

	.ot-pay-hl {
		box-sizing: border-box;
		line-height: 50upx;
		height: 50upx;
		padding: 0px 20upx;
		background-color: #009688;
		color: #fff;
		border-radius: 10upx;
	}

	.lo {
		margin: 94upx 0px;
	}

	.lo .grace-idcard-preview view:nth-of-type(1) image {
		width: 100%;
		display: block;
		height: 180upx;
	}

	.lo .grace-idcard-preview view:nth-of-type(1) {
		display: flex;
		flex-direction: column;
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
		background-color: #ff5722;
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
		margin: 0px;
	}

	.ot-pay-bto {
		background-color: #5ca7e2 !important;
		padding: 0px 10upx !important;
	}

	button {
		padding: 0px 20upx !important;
	}

	.grace-idcard-items {
		background: #fff;
		padding: 15upx 0;
		box-sizing: border-box;
		width: 45%;
		display: flex;
		border-radius: 10upx;
		align-items: flex-start;
	}

	.grace-idcard-uper-btn {
		width: 100%;
		background: #fff;
		box-shadow: 2upx 2upx 12upx #ccc;
		padding-bottom: 10upx;
		border-radius: 10upx;
		text-align: center;
		position: relative;
		border: 2upx dashed #f1f1f1;
		float: left;
	}

	.grace-idcard-uper-btn .img {
		width: 74upx;
		height: 74upx;
		margin: 0 auto;
		margin-top: 25upx;
	}

	.grace-idcard-uper-btn .img image {
		width: 74upx;
		height: 74upx;
	}

	.grace-idcard-uper-btn .text {
		width: 100%;
		margin-top: 3upx;
		text-align: center;
		line-height: 2em;
		color: #999;
		float: left;
	}

	.grace-idcard-preview {
		width: 39%;
		position: absolute;
		height: 170upx;
		border-radius: 10upx;
	}

	.grace-idcard-preview image {
		width: 100%;
		height: 100%;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 20upx;
		box-sizing: border-box;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 10upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx text:nth-of-type(3) {
		margin-left: 30upx;
	}

	.ot-padding {
		padding-bottom: 10upx;
		color: #666;
		border-top: 1upx solid #ccc;
		margin: 0px;
		border-radius: 0px;
		margin-bottom: 20px;
	}

	.ot-padding text:nth-of-type(1) {
		color: #ff5722;
		font-size: 34upx;
	}
</style>
