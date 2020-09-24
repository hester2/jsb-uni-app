<template>
	<view class="">
		<view class="grace-body">
			<view class="ot-home-qx mn">
				<text></text>
				<text>上传合同</text>
			</view>
			<view class="ot-logis-fl">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="handleup">
						<view class="img">
							<image :src="img+'danju.png'" />
						</view>
						<view class="text">供应商上传合同</view>
					</view>
					<view class="grace-idcard-preview" v-if="display">
						<image :src="idCard1" @tap="previewImg1"></image>
						<view class="ot-tem-del" @tap="deleteImage">
							<image :src="img+'del11.png'"></image>
						</view>
					</view>
				</view>
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="selectImg2">
						<view class="img">
							<image :src="img+'fahuodan.png'" />
						</view>
						<view class="text">我方上传合同</view>
					</view>
					<view class="grace-idcard-preview" v-if="display1">
						<image :src="idCard2" @tap="previewImg2"></image>
						<view class="ot-tem-del" @tap="deleteImage1">
							<image :src="img+'del11.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="ot-home-qx mn">
				<text></text>
				<text>合同信息</text>
			</view>
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">合同编号</view>
					<input type="text" class="input" name="bianhao" value="XJX_20190900007" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">合同日期</view>
					<input type="text" class="input" name="riqi" value="2019-09-04" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">操作</view>
					<view class="other">
						<button type="primary" class="grace-button" @tap="handleDel" size="mini">删除</button>
					</view>
				</view>
			</form>
			<view class="ot-home-qx mn">
				<text></text>
				<text>审核结果</text>
				<text>已审核</text>
			</view>
			<view class="grace-form of grace-margin-top">
				<view class="grace-items">
					<button type="primary" class="grace-button iconfont icon-duigou" size="mini" @tap="handleTo">审核通过</button>
					<button type="primary" class="grace-button iconfont icon-shanchu" size="mini" @tap="handleFused">拒绝审核</button>
				</view>
			</view>
			<view style="margin-top:50upx;">
				<button type="primary" class="grace-button grace-border-radius" @tap="handleChange">下一步</button>
			</view>
		</view>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
				<view slot="content" class="content">
					<view>拒绝理由</view>
					<view class="grace-items grace-noborder">
						<view class="clien other">
							<textarea placeholder="备注..." placeholder-class="place-holder" name="desc"></textarea>
						</view>
					</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view>
							<button type="primary" @tap="closeDialog3">取消</button>
						</view>
						<view>
							<button formType="submit" type="primary" style="color:#3688FF;" @tap="confirm3">确认</button>
						</view>
					</view>
				</view>
			</graceDialog>
		</form>

		<form @submit="formOut" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="isShow" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog2">
				<view slot="content" class="content">
					<view class="ot-pay-qp">上传凭证</view>
					<view class="grace-items">
						<view class="grace-label">合同名称</view>
						<input type="text" class="input" name="mingcheng" placeholder="请输入合同名称" />
					</view>
					<view class="grace-items">
						<view class="grace-label">合同编号</view>
						<input type="text" class="input" name="bianhao" placeholder="请输入合同编号" />
					</view>
					<view class="grace-items">
						<view class="ot-pay-hl" @tap="selectImg1">上传凭证</view>
					</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view>
							<button type="primary" @tap="closeDialog2">取消</button>
						</view>
						<view>
							<button type="primary" style="color:#3688FF;" @tap="confirm2" formType="submit">立即提交</button>
						</view>
					</view>
				</view>
			</graceDialog>
		</form>

	</view>
</template>

<script>
	import graceDialog from '../../../../../graceUI/components/graceDialog.vue';
	import common from '../../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				companyIndex: 0,
				company: ['请选择', '恒辉物流', '其它物流'],
				carIndex: 0,
				car: ['请选择', ],
				driverIndex: 0,
				driver: ['请选择', ],
				idCard1: '',
				display: false,
				idCard2: '',
				display1: false,
				show3: false,
				isShow: false
			}
		},
		created() {
			_self=this
		},
		methods: {
			handleFused: function() {
				this.show3 = true
			},
			closeDialog3: function() {
				this.show3 = false
			},
			confirm3: function() {
				this.closeDialog3();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
			},
			handleup: function() {
				this.isShow = true
			},
			closeDialog2: function() {
				this.isShow = false
				this.display = false
			},
			handleDel() {
				uni.showModal({
					title: '提示',
					content: '真的要删除吗？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认删除!",
								icon: "none"
							});
							console.log('删除')

						} else if (sm.cancel) {}
					}
				})
			},
			confirm2: function() {
				this.closeDialog2();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
				this.display = true
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中"
				});
				var uploadTask1 = uni.uploadFile({
					url: '',
					filePath: _self.idCard1,
					fileType: 'file',
					name: 'data',
					success: function(uploadFileRes) {
						// 上传成功后返回服务器端保存的路径
						console.log(uploadFileRes.data);
						uni.hideLoading();

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

			formOut: function(e) {
				//定义表单规则
				var rule = [{
						name: "mingcheng",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入合同名称"
					},
					{
						name: "bianhao",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入编号"
					},
				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					consoloe.log(formData)
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			handleTo(e) {
				var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认审核？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认审核",
								icon: "none"
							});

						} else if (sm.cancel) {}
					}
				})
			},
			bindCompanyChange: function(e) {
				console.log(e);
				this.companyIndex = e.detail.value
			},
			bindCarChange: function(e) {
				console.log(e);
				this.carIndex = e.detail.value
			},
			bindDriverChange: function(e) {
				console.log(e);
				this.driverIndex = e.detail.value
			},

			handleClick() {

			},
			selectImg1: function() {

				uni.chooseImage({
					count: 1,
					type: 'file',
					success: function(res) {
						_self.idCard1 = res.tempFilePaths[0]
					}
				})
			},
			selectImg2: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard2 = res.tempFilePaths[0]
					}
				})
				// 因底层限制一次上传一个
				uni.showLoading({
					title: "上传中"
				});
				var uploadTask2 = uni.uploadFile({
					url: '',
					filePath: _self.idCard2,
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
				this.display1 = true
			},
			previewImg1: function() {
				uni.previewImage({
					urls: [_self.idCard1]
				});
			},
			previewImg2: function() {
				uni.previewImage({
					urls: [_self.idCard2]
				});
			},

			handleLock() {
				// 预览pdf
			},

			handleChange() {
				uni.navigateTo({
					url: '../temporaryPay/index',
				})
			},

			deleteImage: function(e) {
				var that = this;
				var idCard1 = that.idCard1;
				// var index = e.currentTarget.dataset.index; //获取当前长按图片下标
				console.log(e)
				wx.showModal({
					title: '系统提醒',
					content: '确定要删除此图片吗？',
					success: function(res) {
						if (res.confirm) {
							// idCard1.splice(0, 1);
							idCard1 = '';
							console.log('删除成功')
							that.display = false
						} else if (res.cancel) {
							return false;
						}
						that.idCard1 = idCard1
					}
				})
			},
			deleteImage1: function(e) {
				var that = this;
				var idCard2 = that.idCard2;
				console.log(e)
				uni.showModal({
					title: '系统提醒',
					content: '确定要删除此图片吗？',
					success: function(res) {
						if (res.confirm) {
							idCard2 = '';
							console.log('删除成功')
							that.display1 = false
						} else if (res.cancel) {
							return false;
						}
						that.idCard2 = idCard2
					}
				})
			},

		},
		components: {
			graceDialog: graceDialog
		}
	}
</script>

<style>
	.icon-duigou:before {
		content: "\e69e";
		margin-right: 20upx;
		color: #e5a729;
	}

	.icon-shanchu:before {
		content: "\e62b";
		margin-right: 20upx;
		color: #f46361;
	}

	.grace-body {
		box-sizing: border-box;
		padding: 0upx 30upx;
		border-top: 2upx solid #e0e0e0;
		width: 100%;
	}

	.grace-button {
		background-color: #ff5722 !important;
	}

	.ot-buttons {
		margin: 10upx 0px;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 30upx;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 15upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx text:nth-of-type(2) {
		flex: 11;
	}

	.ot-home-qx text:nth-of-type(3) {
		background-color: #ff5722;
		color: #fff;
		box-sizing: border-box;
		padding: 0upx 20upx;
		border-radius: 40upx;
		font-size: 24upx;
		line-height: 38upx;
		height: 38upx;
	}

	/* del start */

	.grace-idcard-items {
		background: #fff;
		padding: 30upx 0;
		box-sizing: border-box;
		width: 45%;
		display: flex;
		border-radius: 10upx;
		align-items: flex-start;
	}

	.ot-tem-del {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		width: 50upx;
		height: 50upx;
		bottom: 0px;
		right: 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ot-tem-del image {
		width: 35upx !important;
		height: 35upx !important;
	}

	/* del end */

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
		width: 42%;
		position: absolute;
		height: 170upx;
		border-radius: 10upx;
	}

	.grace-idcard-preview image {
		width: 100%;
		height: 100%;
	}

	.grace-idcard-uper-btn1 {
		width: 100%;
		height: 392upx;
		border-radius: 10upx;
		text-align: center;
		position: relative;
		border: 2upx dashed #f1f1f1;
		float: left;
	}

	.grace-idcard-uper-btn1 image {
		width: 100%;
		height: 100%;
	}

	.ot-center {
		text-align: center;
		color: #666;
		margin: 10upx 0px;
	}

	.ot-certi-fa {
		color: #666;
		margin-bottom: 20upx;
		display: flex;
		font-size: 26upx;
	}

	.grace-idcard-preview1 {
		width: 668upx;
		position: absolute;
		height: 396upx;
		top: 96upx;
		left: 42upx;
	}

	.grace-idcard-preview1 image {
		width: 100%;
		height: 100%;
		border-radius: 20upx;
	}

	.hq {
		top: 564upx;
	}

	.ot-certi-fa image {
		margin-right: 10upx;
	}

	.ot-logis-fl {
		display: flex;
		justify-content: space-between;
	}

	.grace-border-radius {
		border-radius: 10upx;
	}

	.grace-form .grace-items .input {
		padding: 0px;
	}

	.grace-form .grace-items .other {
		display: flex;
		justify-content: flex-end;
	}

	.grace-items .other button {
		padding: 0px 10upx;
		margin: 0px;
		margin-left: 20upx;
		line-height: 50upx !important;
		background-color: #ff5722;
	}

	.grace-items .other button:nth-of-type(1) {
		border: 1px solid #ccc;
		background-color: transparent !important;
		color: #666;
	}

	.of.grace-form .grace-items {
		justify-content: flex-start;
	}

	.of.grace-form .grace-items button {
		margin: 0px;
		margin-right: 40upx;
		color: #666;
		background-color: transparent !important;
		padding: 0 30upx;
		font-size: 30upx;
		border: 1px solid #e0e0e0;
	}

	button::after {
		border: none;
	}


	.grace-form .grace-items .clien.other {
		margin-left: 0px;
		padding-left: 0px;
	}

	.grace-form textarea {
		font-size: 24upx;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 30upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #303030;
	}

	view {
		color: #303030;
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

	.place-holder {
		font-size: 25upx;

	}
</style>
