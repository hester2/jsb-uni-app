<template>
	<view class="grace-body">
		<view class="SegmentedControlIn">
			<graceSegmentedControl :items="items" color="#ff5722" :current="current" @change="change"></graceSegmentedControl>
		</view>
		<swiper class="swiper" :current="current" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<swiper-item>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="swiper-item">
						<view class="ot-Dtailes-host" v-for="(item,index) in log" :key="index" v-if="cache==false&&log.length>=0?true:false">
							<view class="grace-space-between">
								<view class="demo6">型号：{{item.area}},{{item.code}}</view>
								<view class="demo7  grace-no-scale f-corlor">数量(吨)：{{item.related_num}}</view>
							</view>
							<view class="grace-space-between">
								<view class="demo6">仓库：{{item.supplier_store_address}}</view>
							</view>
							<view class="grace-space-between">
								<view class="demo6">地址：{{item.transport_address}}</view>
							</view>
							<view class="grace-space-between">
								<view class="demo6">司机/号码：{{item.driver_tel}}</view>
							</view>
							<view class="grace-space-between">
								<view class="demo6">物流公司：{{item.logistics_name}}</view>
							</view>
							<view class="grace-space-between ot-host-fr">
								<view class="demo6">车牌号：{{item.card_no}}</view>
								<view class="demo7  grace-no-scale"><button type="primary" class="iconfont icon-shangchuan" @tap="showDialog3(item.id)">上传</button></view>
							</view>
						</view>
						<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
					</view>
				</scroll-view>
				<form @submit="formSubmit" class="grace-form grace-margin-top">
					<graceDialog :isTitle="false" :show="show3" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
						<view slot="content" class="content">
							<view class="ot-pay-qp">上传物流单</view>
							<view class="grace-items">
								<view class="grace-label">物流单号</view>
								<input type="text" class="input" name="r.logistics_file_num" placeholder="" />
							</view>
							<input type="text" v-show="false" name="r.id" :value="itemId">
							<input type="text" v-show="false" name="r.logistics_file_id" :value="logistics_file_id">
							<view class="grace-items">
								<view class="ot-pay-hl" @tap="selectImg3">上传物流单</view>
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
			</swiper-item>

			<swiper-item>
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="swiper-item">
						<view class="ot-Dtailes-host" v-for="(item,index) in log" :key="index" v-if="cache==false&&log.length>=0?true:false">
							<view class="ot-home-qx mn">
								<text></text>
								<text>单号1</text>
							</view>
							<view class="grace-form ">
								<view class="grace-items">
									<view class="grace-label">物流单号</view>
									<input type="text" class="input" disabled="true" name="logistics_file_num" :value="item.logistics_file_num"
									 placeholder="请输入运费" />
								</view>
								<view class="grace-items">
									<view class="grace-idcard-items">
										<image :src="item.logistics_file_id==null?'http://assets.jinsubao.cn/photos2.png':webUrl+'/file/getUploadFile?fileName='+item.logistics_file_id"
										 @tap="previewImg(item.logistics_file_id)" />
									</view>
								</view>
							</view>
						</view>
						<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import graceDialog from '../../../../../graceUI/components/graceDialog.vue';
	import graceSegmentedControl from '../../../../../graceUI/components/graceSegmentedControl.vue';
	import graceNav from "../../../../../graceUI/components/graceNavBar.vue";
	import graceEmpty from '../../../../../graceUI/components/graceEmpty.vue';
	import graceLoading from "../../../../../graceUI/components/graceLoading.vue";
	import graceSpeaker from "../../../../../graceUI/components/graceSpeaker.vue";
	var systemInfo = require('../../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		data() {
			return {
				items: ["物流信息", "物流单号"],
				current: 0,
				tabHeight: 300,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
				show3: false,
				idCard3: 'http://assets.jinsubao.cn/photos2.png',
				log: {
					sup: {
						area: ''
					},
					sal: {}
				},
				idCard: '',
				info: {},
				webUrl: '',
				logistics_file_id: '',
				submit: false,
				id: '',
				t: '',
				cache:false,
				itemId:'',
			}
		},
		onLoad: function(option) {
			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			_self = this
			var id = option.id
			var t = option.t
			_self.id = id
			_self.t = t
			_self.webUrl = this.$webUrl
			uni.request({
				url: this.$webUrl + "/logistics/salesLogistics",
				data: {
					id: id,
					t: t
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.log = res.data
					console.log(_self.log)
					if (_self.log == '') {
						_self.loadingText = ['暂无信息']
						_self.loadings = ''
					} else {
						_self.loadingText = ['']
						_self.loadings = ''
					}
				}
			})
		},
		created() {},
		components: {
			graceSegmentedControl,
			graceNav,
			graceEmpty,
			graceDialog: graceDialog,
			graceLoading,
		},
		methods: {
			selectImg3: function() {
				var _self = this
				uni.chooseImage({
					count: 1,
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						_self.idCard3 = res.tempFilePaths[0]
						var uploadTask1 = uni.uploadFile({
							url: _self.$webUrl + "/file/uploadFile",
							filePath: res.tempFilePaths[0],
							fileType: 'image',
							name: 'data',
							formData: {
								type: 8
							},
							success: function(uploadFileRes) {
								
								_self.logistics_file_id = uploadFileRes.data
								uni.hideLoading()
							}
						});
					},

				})


			},
			previewImg: function(e) {
				uni.previewImage({
					urls: [this.$webUrl + "/file/getUploadFile?fileName=" + e],
					current: 0
				});
			},
			showDialog3: function(e) {
				this.show3 = true;
				_self.itemId=e
			},
			closeDialog3: function() {
				this.show3 = false;
			},
			confirm3: function() {

			},
			formSubmit: function(e) {
				var formData = e.detail.value

				if (!_self.submit) {
					_self.submit = true
					formData.t = _self.t
					formData.id = _self.id
					uni.request({
						url: this.$webUrl + "/logistics/updateRealtedOrder",
						data: formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							if (res.data.update) {
								_self.log = res.data.list
								uni.showToast({
									title: '提交成功'
								})
							} else {
								uni.showToast({
									title: '提交失败',
									icon: 'none'
								})
							}
							_self.show3 = false
						},
						complete() {
							_self.submit = false
						}
					})
				}


			},
			change: function(e) {
				console.log(e);
				this.current = e;
			},
			swiperChange: function(e) {
				this.current = e.detail.current;
			},
			scrollend() {

			}
		},
	}
</script>
<style>
	.icon-shangchuan:before {
		content: "\e687";
	}

	.grace-body {
		border-top: 1upx solid #eee;
		padding: 0px;
	}

	.SegmentedControlIn {
		width: 500rpx;
		padding: 20rpx 125rpx;
	}

	.swiper {
		height: 100%;
	}

	.swiper-item {
		height: 100rpx;
		text-align: center;
		line-height: 200rpx;
		font-size: 30rpx;
	}

	.ot-Dtailes-host {
		margin: 4upx 20upx;
		background-color: #fff;
		box-shadow: 2upx 2upx 12upx #ccc;
		padding: 0px 25upx;
		border-radius: 10upx;
		padding-bottom: 10upx;
		padding-top: 10upx;
		margin-bottom: 30upx;
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
		font-size: 26upx;
		overflow: hidden;
		text-align: left;
	}

	.ot-Dtailes-ov {
		height: 48upx;
		line-height: 48upx;
		width: 100%;
		overflow: hidden;
	}

	.grace-space-between .demo7 {
		color: #999;
		font-size: 26upx;
	}

	.ot-host-fr {
		border-top: 2upx dashed #ccc;
		height: 70upx;
		line-height: 70upx;
		display: flex;
		align-items: center;
	}

	.ot-host-fr button {
		display: block;
		height: 50upx !important;
		line-height: 50upx !important;
		font-size: 26upx;
		background-color: #ff5722 !important;
	}

	.f-corlor {
		color: #FEA86D !important;
	}

	.content {
		box-sizing: border-box;
		padding: 20rpx 40rpx;
	}

	.ot-pay-hl {
		box-sizing: border-box;
		line-height: 50rpx;
		height: 50rpx;
		padding: 0px 20rpx;
		background-color: #009688;
		color: #fff;
		border-radius: 10rpx;
	}

	.lo {
		margin: 94rpx 0px;
	}

	.ot-home-qx {
		font-size: 30rpx;
		margin-top: 30rpx;
		display: flex;
		line-height: 35rpx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		/* margin-bottom: 15rpx; */
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6rpx;
		height: 35rpx;
		display: block;
		background-color: #ff5722;
		margin-right: 20rpx;
	}

	.ot-home-qx text:nth-of-type(3) {
		margin-left: 30rpx;
	}

	.grace-form .grace-items {
		border-bottom: none;
	}

	.grace-idcard-items {
		width: 200upx;
		height: 180upx;
	}

	.grace-idcard-items image {
		width: 200upx;
		height: 180upx;
		background-color: #C9E4E4;
		display: block;
	}
</style>
