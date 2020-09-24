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
			<view class="grace-list hj" v-for="(item,index) in v" :key="index">
				<view class="grace-space-between">
					<view class="demo6">出款金额:</view>
					<view class="demo7  grace-no-scale">{{item.price}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">出款日期:</view>
					<view class="demo7  grace-no-scale">{{item.create_time}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7  grace-no-scale">{{item.state}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">操作:</view>
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button ot-pay-btn" size="mini" @tap="previewImg3(item.file_id)">预览</button>
						<button type="primary" class="grace-button ot-pay-bth" size="mini" @tap="handleDel(item.id)">删除</button>
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
		<view class="ot-button">
			<button type="warn" @tap="handleClick" class="grace-button">
				下一页
			</button>
		</view>
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<graceDialog :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
				<view slot="content" class="content">
					<view class="ot-pay-qp">上传凭证</view>
					<view class="grace-items">
						<view class="grace-label">出款金额</view>
						<input type="text" class="input" name="v.price" placeholder="出款金额" />
						<input type="text" name="v.fileId" :value="file_id" v-show="false">
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
							<view @tap="handleTap('picker1')">{{ value1.slice(1).join('')}} </view>
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
		<lb-picker ref="picker1" v-model="value1" mode="multiSelector" :list="list" :level="2" @change="handleChange"
		 @confirm="handleConfirm" @cancle="handleCancle">
		</lb-picker>
	</view>
</template>

<script>
	import graceDialog from '../../../../../graceUI/components/graceDialog.vue';
	import common from "../../../../../common/common.js"
	import LbPicker from '@/components/lb-picker'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				idCard1: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2997502425,1125939591&fm=26&gp=0.jpg',
				idCard2: '',
				idCard3: 'http://assets.jinsubao.cn/photos2.png',
				display: false,
				show3: false,
				genderIndex: 0,
				gender: ['厦门市兴建祥贸易有限公司', '厦门市兴得铭贸易有限公司'],
				dateValue: "请选择",
				value1: ['', '请选择'],
				list: [{
						label: '厦门市兴建祥贸易有限公司',
						value: '0',
						children: [{
								label: '35101551001050005111',
								value: '对公,35101551001050005111,中国建设银行',
							},
							{
								label: '40329001040013262',
								value: '对公,40329001040013262,中国农业银行',
							},
							{
								label: '691241959',
								value: '对公,691241959,中国民生银行',
							},
							{
								label: '802880100029826',
								value: '对公,802880100029826,广东华兴银行',
							},
							{
								label: '37510188000883885',
								value: '对公,37510188000883885,中国光大银行',
							}
						]
					},
					{
						label: '厦门市兴得铭贸易有限公司',
						value: '1',
						children: [{
								label: '40329001040011068',
								value: '对公,40329001040011068,中国农业银行',
							},
							{
								label: '802880100023927',
								value: '对公,802880100023927,广东华兴银行',
							}

						]
					},
					{
						label: '对私',
						value: '2',
						children: [{
								label: '6214991936798858',
								value: '对私,6214991936798858,中国建设银行',
							},
							{
								label: '6228460078000710376',
								value: '对私,6228460078000710376,中国农业银行',
							},
							{
								label: '6226192900364514',
								value: '对私,6226192900364514,中国民生银行',
							},
							{
								label: '6228480070302332112',
								value: '对私,6228480070302332112,中国农业银行',
							}

						]
					}
				],
				
				bank: '',
				id: '',
				v: [],
				file_id: null,
				sign_file_id: null,
				o: ''
			}
		},
		created() {
			_self = this
		},
		onLoad(option) {
			_self = this
			console.log(option.id)
			var id = option.id
			_self.id = id
			uni.request({
				url: _self.$webUrl + "/sale/order/vouchers",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.v = res.data
				}
			})
			uni.request({
				url: _self.$webUrl + "/sale/order/orderDetail",
				data: {
					id: _self.id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.o = res.data
					if (_self.o.sign_file_id != null) {
						_self.display = true
						_self.idCard2 = _self.$webUrl + "/file/getUploadFile?fileName=" + _self.o.sign_file_id
					}
				}
			})
		},
		methods: {
			handleTap(picker) {
				this.$refs[picker].show()
			},
			handleChange(item) {},
			handleConfirm(item) {
				var items = item.item
				_self.value1 = [
					[items[0].label],
					[items[1].label]
				]
				_self.bank = item.value
				console.log(_self.value1)
				console.log(_self.bank)
			},
			handleCancle(item) {
				console.log('cancle::', item)
			},
			handlePay(e) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认完成支付',
					success: function(sm) {
						if (sm.confirm) {
							uni.request({
								url: _self.$webUrl + "/sale/order/doPayment",
								data: {
									id: _self.id
								},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res) {
									uni.showToast({
										title: res.data.msg,
										icon: 'none'
									})
								}
							})



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

			},
			formSubmit: function(e) {
				var formData = e.detail.value
				formData["accountAndBank"] = _self.bank
				formData["v.payee"] = _self.gender[_self.genderIndex]
				formData["v.orderId"] = _self.id
				uni.request({
					url: _self.$webUrl + "/sale/order/doAddVoucher",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						if (res.code == 0) {

							uni.showToast({
								title: "添加成功",

							});
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
						}
					}
				})


			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1]
				});
			},
			previewImg2: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.$webUrl + "/file/getUploadFile?fileName=" + _self.o.sign_file_id],
					current: 0
				});
			},
			selectImg2: function() {
				var _self = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard2 = res.tempFilePaths[0]
						uni.showLoading({
							title: "上传中"
						});
						var uploadTask2 = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData: {
								type: 8
							},
							success: function(uploadFileRes) {
								var data = {}
								data["o.sign_file_id"] = uploadFileRes.data
								data["o.id"] = _self.id
								uni.request({
									url: _self.$webUrl + "/sale/order/update",
									data: data,
									header: {
										'Access-Token': uni.getStorageSync("token")
									},
									success(res) {
										_self.display = true
										if (res.statusCode == 200) {
											if (res.data) {
												uni.showToast({
													title: '上传成功',
												});
											} else {
												uni.showToast({
													title: '上传失败',
													icon: 'none'
												});
											}
										} else {
											uni.showToast({
												title: '上传失败',
												icon: 'none'
											});
										}


									}

								})
							},
							complete() {
								uni.hideLoading()

							}
						});
					}
				})
			},
			deleteImage(o) {
				uni.showModal({
					title: '系统提醒',
					content: '确定要删除此图片吗？',
					success: function(res) {
						if (res.confirm) {
							_self.idCard2 = '';
							_self.display = false
						} else if (res.cancel) {
							return false;
						}
					}
				})
			},

			selectImg3: function() {
				var _self = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard3 = res.tempFilePaths[0]
						uni.showLoading({
							title: "上传中"
						});
						var uploadTask2 = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData: {
								type: 6
							},
							success: function(uploadFileRes) {
								_self.file_id = uploadFileRes.data
							},
							complete() {
								uni.hideLoading()
							}
						});
					}
				})
			},
			previewImg3: function(e) {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard3],
					current: 0
				});
			},
			handleClick() {
				uni.navigateTo({
					url: '../salesLogistics/index?id=' + _self.id,
				})
			},
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			handleDel(e) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: function(sm) {
						if (sm.confirm) {
							uni.request({
								url: _self.$webUrl + "/sale/order/delVoucher",
								data: {
									id: e
								},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res) {
									_self.v = res.data
									uni.showToast({
										title: "删除成功",

									});
								}
							})

						} else if (sm.cancel) {}
					}
				})
			},
		},
		components: {
			graceDialog: graceDialog,
			LbPicker
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

	.ot-button button {
		height: 74upx;
		line-height: 74upx;
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
		border-top: 1px solid #eee;
		margin: 0px;
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

	.grace-idcard-uper-btn {
		position: relative;
	}

	.grace-idcard-preview .ot-tem-del {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.5);
		width: 50upx !important;
		height: 50upx !important;
		bottom: 0px;
		right: 0upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.grace-idcard-preview .ot-tem-del image {
		width: 35upx !important;
		height: 35upx !important;
	}

	.other view {
		color: #333 !important;
	}

	.grace-form .grace-items .other view:after {
		content: "\E601";
		padding-left: 5px;
		color: #888;
		font-family: "grace-iconfont" !important;
		font-size: 14px;
	}
</style>
