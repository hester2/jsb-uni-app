<template>
	<view class="">
		<view class="grace-body">
			<view class="ot-home-qx mn">
				<text></text>
				<text>合同信息</text>
			</view>
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">合同编号</view>
					<input type="text" disabled class="input" name="bianhao" :value="c!=null?c.no:''" />
				</view>
				<view class="grace-items">
					<view class="grace-label">合同日期</view>
					<input type="text" disabled class="input" name="riqi" :value="c!=null?c.create_time:''" />
				</view>
				<view class="grace-items">
					<view class="grace-label">操作</view>
					<view class="other">
						<button type="primary" class="grace-button" size="mini">下载</button>
						<button type="primary" class="grace-button" size="mini" @tap="handleDel">删除</button>
					</view>
				</view>
				<view class="grace-items">
					<button type="warn" class="grace-button ot-buttons" @tap="handleClick" size="mini">生成合同</button>
				</view>
			</form>
			<form @submit="formOut" class="grace-form grace-margin-top">
				<graceDialog :isTitle="false" :show="isEnd" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
					<view slot="content" class="content">
						<view class="ot-pay-qp">信息</view>
						<view class="grace-items">
							<view class="grace-label">合同编号</view>
							<input type="text" class="input" name="contractNo" placeholder="如果为空则默认为订单号" />
						</view>
						<view class="grace-items">
							<view class="grace-label">公司</view>
							<view class="other">
								<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="companyName">
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
			<view class="ot-home-qx mn">
				<text></text>
				<text>上传合同</text>
			</view>
			<view class="ot-logis-fl">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn" @tap="selectImg1">
						<view class="img">
							<image :src="img+'danju.png'" />
						</view>
						<view class="text">客户上传合同</view>
					</view>
					<view class="grace-idcard-preview" v-if="display">
						<image :src="idCard1" @tap="previewImg1"></image>
						<view class="ot-tem-del" @tap.stop="deleteImage(0)">
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
						<view class="ot-tem-del" @tap.stop="deleteImage(1)">
							<image :src="img+'del11.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<form @submit="formSubmit">
				<view class="ot-home-qx mn">
					<text></text>
					<text>发票信息</text>
				</view>
				<view class="grace-form grace-margin-top">
					<view class="grace-items">
						<view class="grace-label">发票信息</view>
						<input type="text" class="input" name="invoice_file_num" :value="s.invoice_file_num" placeholder="请输入发票号" />
					</view>
				</view>
				<view style="margin-top:30upx;" class="ot-contract-btn">
					<button type="primary" formType="submit" class="grace-button grace-border-radius">提交</button>
					<button type="primary" class="grace-button grace-border-radius" @tap="handleChange">下一页</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import common from "../../../../../common/common.js"
	import graceDialog from '../../../../../graceUI/components/graceDialog.vue';
	var _self;
	export default {
		components:{
			graceDialog: graceDialog
		},
		data() {
			return {
				img: common.imageUrlPath,
				isEnd: false,
				idCard1: '',
				display: false,
				idCard2: '',
				display1: false,
				genderIndex: 0,
				gender: ['厦门市兴建祥贸易有限公司', '厦门市兴得铭贸易有限公司'],
				c:{},
				id:'',
				s:{}
			}
		},
		onLoad(option){
			var id=option.id
			this.id=id
			uni.request({
				url:this.$webUrl+"/sale/order/contract",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.c=res.data
					if(_self.c.parta_file_id!=null){
						_self.display=true
						_self.idCard1=_self.$webUrl+"/file/getUploadFile?fileName="+_self.c.parta_file_id
					}
					if(_self.c.partb_file_id!=null){
						_self.display1=true
						_self.idCard2=_self.$webUrl+"/file/getUploadFile?fileName="+_self.c.partb_file_id
					}
				}
			})
			uni.request({
				url:this.$webUrl+"/sale/order/orderDetail",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.s=res.data
					if(_self.s.invoice_file_num==null){
						_self.s.invoice_file_num=''
					}
				}
			})
		},
		created() {
			_self = this
		},
		methods: {
			handleDel(e) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认删除订合同',
					success: function(sm) {
						if (sm.confirm) {
						uni.request({
							url:_self.$webUrl+"/sale/order/delContract",
							data:{id:_self.c.id},
							header: {
								'Access-Token': uni.getStorageSync("token")
							},
							success(res) {
								if(res.data){
									uni.showToast({
										title:'删除成功'
									})
									_self.c=null
								}
							}
						})
						} else if (sm.cancel) {}
					}
				})
			},
			bindPickerChange: function(e) {
				_self.genderIndex = e.detail.value
			},
			handleClick(){
				_self.isEnd = true;
			},
			closeDialog3: function() {
				_self.isEnd = false;
			},
			confirm3: function() {
				_self.closeDialog3();
			
			},
			formOut: function(e) {
				var formData = e.detail.value
				formData.companyName=_self.gender[_self.genderIndex]
				formData.id=_self.id
				uni.request({
					url:this.$webUrl+"/sale/order/genContract",
					data:formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res){
						_self.c=res.data
						}
		
				})
			},
			formSubmit(e) {
				var formData = e.detail.value;
				var data={}
				data["o.id"]=_self.id
				data["o.invoice_file_num"]=formData.invoice_file_num
				uni.request({
					url:this.$webUrl+"/sale/order/update",
					data:data,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res){
						if(res.data){
							uni.showToast({
								title:'提交成功'
							})
						}
						}
						
				})
			},
			selectImg1: function() {
				uni.chooseImage({
						count: 1,
						success: function(res) {
							_self.idCard1 = res.tempFilePaths[0]
							uni.showLoading({
								title: "上传中"
							});
							var uploadTask1 = uni.uploadFile({
								url: _self.$webUrl+"/file/uploadFile",
								filePath: res.tempFilePaths[0],
								fileType: 'image',
								name: 'data',
								formData:{
									type:5
								},
								success: function(uploadFileRes) {	
									var data={}
									_self.display=true
									data['c.id']=_self.c.id
									data['c.parta_file_id']=uploadFileRes.data
									uni.request({
										url:_self.$webUrl+"/sale/order/updateContract",
										data:data,
										header: {
											'Access-Token': uni.getStorageSync("token")
										},
										success(res){
											if(res.data){
												uni.showToast({
													title:'上传成功',
													
												})
											}
										}
									})
									uni.hideLoading()
								}
							});
						},
				})
		},
		selectImg2: function() {
			uni.chooseImage({
				count: 1,
				success: function(res) {
					_self.idCard2 = res.tempFilePaths[0]
					_self.display1=true
					
					// 因底层限制一次上传一个
					uni.showLoading({
						title: "上传中"
					});
					var uploadTask2 = uni.uploadFile({
					url: _self.$webUrl+"/file/uploadFile",
					filePath: res.tempFilePaths[0],
					fileType: 'image',
					name: 'data',
					formData:{
						type:5
					},
					success: function(uploadFileRes) {	
						var data={}
						data['c.id']=_self.c.id
						data['c.partb_file_id']=uploadFileRes.data
						uni.request({
							url:_self.$webUrl+"/sale/order/updateContract",
							data:data,
							header: {
								'Access-Token': uni.getStorageSync("token")
							},
							success(res){
								if(res.data){
									uni.showToast({
										title:'上传成功',	
									})
								}
							}
						})
						uni.hideLoading()
					}
					});
				}
			})
		},
		previewImg1: function() {
			uni.previewImage({
				urls: [_self.idCard1],
				current: 0
			});
		},
		previewImg2: function() {
			uni.previewImage({
				urls: [_self.idCard2],
				current: 0
			});
		},
		handleChange() {
			uni.navigateTo({
				url: '../salesInvoice/index?id='+_self.s.id,
			})
		},
		deleteImage(o) {
			var that = this;
			switch (o) {
				case 0:
					var idCard1 = that.idCard1;
					uni.showModal({
						title: '系统提醒',
						content: '确定要删除此图片吗？',
						success: function(res) {
							if (res.confirm) {
								idCard1 = '';
								//console.log('删除成功')
								that.display = false
							} else if (res.cancel) {
								return false;
							}
							that.idCard1 = idCard1
						}
					})
					break;
				case 1:
					var idCard2 = that.idCard2;
					uni.showModal({
						title: '系统提醒',
						content: '确定要删除此图片吗？',
						success: function(res) {
							if (res.confirm) {
								idCard2 = '';
								//console.log('删除成功')
								that.display1 = false
							} else if (res.cancel) {
								return false;
							}
							that.idCard2 = idCard2
						}
					})
					break;
			}
		}

	}
	}
</script>

<style>
	@import "../../../../../common/css/contract.css";

	.grace-idcard-uper-btn {
		position: relative;
	}

	.grace-items .other button:nth-of-type(1) {
		boder: 1px solid #ccc;
		background-color: transparent !important;
		color: #666;
	}

	.ot-button-fixed {
		width: 100%;
		position: fixed;
		bottom: 0px;
		left: 0px;
		height: 100upx;
		background-color: #fff;
		box-shadow: 2upx 2upx 12upx #ccc;
		display: flex;
		justify-content: space-between;
		margin: 0px;
	}

	.ot-button-fixed button {
		width: 30%;
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

	.ot-contract-btn {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
	}

	.ot-contract-btn button {
		width: 25%;
		height: 64upx;
		line-height: 64upx;
		margin: 0px;
	}

	.ot-contract-btn button:nth-of-type(2) {
		border: 2upx solid #ff5722;
		background-color: transparent !important;
		color: #ff5722;
	}

	.ot-buttons {
		padding: 0px 20upx;
	}
	.ot-pay-qp {
		text-align: center;
	}
	
	.content {
		box-sizing: border-box;
		padding: 20upx 40upx;
	}
	.grace-form .content .grace-items{
		border-bottom: 1px solid #F5F6F8 !important;
	}
	
	.grace-dialog-btns button{
		background-color: #fff !important;
	}
</style>
