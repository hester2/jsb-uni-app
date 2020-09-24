<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">车辆所属者：</view>
					<input type="text" class="input" name="c.owner_name" />
				</view>
				<view class="grace-items">
					<view class="grace-label">车牌号：</view>
					<input type="text" class="input" name="c.plate_no" />
				</view>
				<view class="grace-items">
					<view class="grace-label">车辆类型</view>
					<view class="other">
						<picker @change="bindCarChange" :value="carIndex" :range="car" name="c.cart_type">
							<text>{{car[carIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">车长</view>
					<view class="other">
						<picker @change="bindLengChange" :value="lengIndex" :range="leng" name="c.length">
							<text>{{leng[lengIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">车宽：</view>
					<input type="text" class="input" name="c.width" value="" />
				</view>
				<view class="grace-items">
					<view class="grace-label">车高：</view>
					<input type="text" class="input" name="c.height" value="" />
				</view>
				<view class="grace-items">
					<view class="grace-label">最大吨位：</view>
					<input type="text" class="input" name="c.tonnage" value="" />
				</view>
				<view class="grace-items">
					<view class="grace-label">最大体积：</view>
					<input type="text" class="input" name="c.volume" value="" />
				</view>
				<view class="grace-items">
					<view class="grace-label">识别代号：</view>
					<input type="text" class="input" name="c.vin" value="" />
				</view>
				<view class="grace-items">
					<button type="primary" class="grace-button" size="mini" @tap="selectImg1">上传行驶证</button>
				</view>
				<input type="text" name="c.license" :value="license" v-show="false">
				
				<view class="grace-idcard-preview">
					<image :src="idCard1" @tap="previewImg1" mode="widthFix"></image>
				</view>
				<view style="padding:22rpx 0;">
					<button formType="submit" type="primary" class="grace-button">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				carIndex: 0,
				car: ['大货车', '平板', '高栏'],
				lengIndex: 0,
				leng: ['1.8', '2.7', '3.8'],
				idCard1: 'http://assets.jinsubao.cn/photos.png',
				license:'',
				c:{}
			}
		},
		created() {
			_self=this
		},
		methods: {
			selectImg1: function() {
				uni.chooseImage({
					count: 1,
					success: function(res) {
						_self.idCard1=res.tempFilePaths[0]
					uni.showLoading({
						title: "上传中"
					});
					var uploadTask1 = uni.uploadFile({
						url: _self.$webUrl+"/file/uploadFile",
						filePath: res.tempFilePaths[0],
						fileType: 'image',
						name: 'data',
						formData:{
							type:8
						},
						success: function(uploadFileRes) {	
							_self.license = uploadFileRes.data
							uni.hideLoading()
						}
					});
					}
				})
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [this.$webUrl+"/flie/getUploadFile?fileName="+_self.license]
				});
			},
			bindCarChange: function(e) {
				console.log(e);
				this.carIndex=e.detail.value
			},
			bindLengChange: function(e) {
				console.log(e);
				this.lengIndex=e.detail.value
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [
				];
				//进行表单检查 强迫性皮肤剥离症 啧啧
				var formData = e.detail.value;
				console.log(JSON.stringify(formData))
				formData['c.cart_type'] =_self.car[_self.carIndex]
				formData['c.length'] = _self.leng[_self.lengIndex]
				formData.phone=uni.getStorageSync("phoneno")
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					this.$router.go(-1)
					uni.request({
						url:this.$webUrl+"/logistics/addCar",
						data:formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							if(res.data){
								uni.showToast({
									title:'添加成功'
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
		
		}
	}
</script>

<style>
	.grace-idcard-preview image {
		width: 25%;
	}

	.grace-body {
		box-sizing: border-box;
		padding: 0px 25rpx;
	}

	.grace-margin-top {
		margin-top: 0px;
	}

	.grace-button {
		background-color: #FF5722 !important;
		margin: 0px;
		padding: 0px 20upx;
	}
	.grace-form .grace-items{
		border:none;
	}
</style>
