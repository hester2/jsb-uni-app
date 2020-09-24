<template>
	<view class="">
		<view class="grace-space">
			<button type="primary" class="grace-button btn" size="mini" @tap="showDialog3">添加凭证</button>
			<button type="primary" class="grace-button btn" size="mini" @tap="handlePay">完成支付</button>
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
						<button type="primary" class="grace-button ot-pay-bth" size="mini" v-if="display1" @tap="handleDel">删除</button>
						<button type="primary" class="grace-button ot-pay-btr" size="mini" v-if="display2" @tap="handleConfim">确认</button>
					</view>
				</view>
			</view>
		</view>
		<view class="ot-Dtailes-host">
			<view class="ot-home-qx mn">
				<text></text>
				<text>上传签收单</text>
			</view>
			<view class="grace-list hj">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="selectImg2">
						<view class="img">
							<image :src="img+'danju.png'" />
						</view>
						<view class="text">上传签收单</view>
					</view>
					<view class="grace-idcard-preview" v-if="display">
						<image :src="idCard2" @tap="previewImg2"></image>
						<view class="ot-tem-del" @tap.stop="deleteImage">
							<image :src="img+'del11.png'"></image>
						</view>
					</view>
				</view>
			</view>
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
						<view class="grace-label">收款人</view>
						<view class="other">
							<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
								<text>{{gender[genderIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">收款账号</view>
						<view class="other">
							<picker @change="bindCountChange" :value="countIndex" :range="count" name="count">
								<text>{{count[countIndex]}}</text>
							</picker>
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
		<form @submit="formOut" @reset="" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="isShow3" closeBtnColor="#FFFFFF" v-on:closeDialog="bgCloseDialog">
				<view slot="content" class="content">
						<view class="ot-pay-qp">信息</view>
						<view class="grace-items">
							<view class="grace-label">到账时间</view>
							<view class="other">
								<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd">
									<text>{{dateValue == null ? '请选择' : dateValue}}</text>
								</picker>
							</view>
						</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view><button type="primary" @tap="bgCloseDialog">取消</button></view>
						<view><button type="primary" style="color:#3688FF;" @tap="bgConfirm">确认</button></view>
					</view>
				</view>
			</graceDialog>
		</form>
	</view>
</template>

<script>
	import graceDialog from '../../../../../../graceUI/components/graceDialog.vue';
	import common from "../../../../../../common/common.js"
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				idCard2: '',
				idCard3: '',
				display: false,
				display1:false,
				display2:false,
				show3: false,
				isShow3: false,
				dateValue: null,
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
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			handlePay(e) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认完成支付',
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
				_self.display1=true
				_self.display2=true
				//console.log(JSON.stringify(e.detail.value));
			},
			handleConfim() {
				this.isShow3 = true
			},
			bgCloseDialog: function() {
				this.isShow3 = false;
			},
			bgConfirm: function() {
				this.bgCloseDialog();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
				_self.display1=false
				_self.display2=false
			},
			formOut: function(e) {
				uni.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				//console.log(JSON.stringify(e.detail.value));
			},
			previewImg2: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard2],
					current: 0
				});
			},
			selectImg2: function() {
				var _self = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard2 = res.tempFilePaths[0]
						// 因底层限制一次上传一个
						uni.showLoading({
							title: "上传中"
						});
						var uploadTask1 = uni.uploadFile({
							url: '',
							filePath: _self.idCard2,
							fileType: 'image',
							name: 'data',
							success: function(uploadFileRes) {
								// 上传成功后返回服务器端保存的路径
								//console.log(uploadFileRes.data);
								uni.hideLoading();
								_self.display = true
							}
						});
					}
				})
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
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			bindCountChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			handleDel(e) {
				var index = e.target.dataset.id;
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
		  deleteImage: function (e) {
		    var that = this;
		    var idCard2 = that.idCard2;
		    //console.log(e)
		    uni.showModal({
		      title: '系统提醒',
		      content: '确定要删除此图片吗？',
		      success: function (res) {
		        if (res.confirm) {
		          idCard2 = '';
		          //console.log('删除成功')
		          that.display=false
		        } else if (res.cancel) {
		          return false;
		        }
		        that.idCard2=idCard2
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
		justify-content: flex-start;
		box-shadow: 2upx 2upx 12upx #ccc;
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
		width: 50upx;
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
		border-top: 1px solid #eee;
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

	.ot-home-qx text:nth-of-type(3) {
		margin-left: 30upx;
	}


	.grace-no-scale {
		display: flex;
	}

	.ot-btns {
		height: 45upx !important;
		line-height: 45upx;
		font-size: 28upx !important;
	}

	.ot-btns:nth-of-type(1) {
		background-color: transparent !important;
		border: 1px solid #ccc;
		color: #999;
	}

	.ot-btns:nth-of-type(2) {
		margin-left: 20upx;
	}

	.ot-pay-btr {
		height: 50upx !important;
		line-height: 50upx !important;
		margin-left: 20upx;
		background-color: #FFB800 !important;
		color: #fff;
	}
	.grace-idcard-uper-btn {
		position: relative;
	}
	.ot-tem-del {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		width: 50rpx;
		height: 50rpx;
		bottom: 0px;
		right: 0rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.ot-tem-del image {
		width: 35rpx !important;
		height: 35rpx !important;
	}
</style>
