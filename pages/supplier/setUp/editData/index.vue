<template>
	<view class="">
		<scroll-view class="grace-tab-title grace-center" id="grace-tab-title" :scroll-x="false" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
			 @tap="tabChange" :key="index">{{tab.name}}</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环新闻项目 -->
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="padding:25upx; width:700upx;">
						<view class="grace-list hj">
							<view class="items">
								<view class="icons grace-icons iconfont icon-dingdan"></view>
								<view class="body">
									<view class="title">基础信息</view>
								</view>
							</view>
						</view>
						<view class="grace-body">
							<form @submit="formSubmit" class="grace-form grace-margin-top">
								<view class="grace-items">
									<view class="grace-label">名称</view>
									<input type="text" class="input" name="name" value="" />
								</view>
								<view class="grace-items">
									<view class="grace-label">类型</view>
									<input type="text" class="input" disabled name="type" value="企业" />
								</view>
								<view class="grace-items">
									<view class="grace-label">联系人</view>
									<input type="text" class="input" name="names" value="钟女士" />
								</view>
								<view class="grace-items">
									<view class="grace-label">电话</view>
									<input type="text" class="input" name="phone" value="13545612566" />
								</view>
								<view class="grace-items">
									<view class="grace-label">管理员</view>
									<input type="text" class="input" name="phone" value="钟丽红" />
								</view>
								<view class="grace-items">
									<view class="grace-label">所在地区</view>
									<view @click="cityPicker1" class="other">
										{{cityText1}}
										<text class="grace-icons icon-arrow-right"></text>
									</view>
								</view>
								<view class="grace-items grace-noborder">
									<view class="grace-label">详细地址</view>
									<input type="text" class="input" value="" name="address" placeholder="请填写联详细地址"></input>
								</view>
								<view class="grace-items">
									<view class="grace-label">座机</view>
									<input type="text" class="input" name="tel" value="" placeholder="请输入座机" />
								</view>
								<view class="grace-items">
									<view class="grace-label">传真</view>
									<input type="text" class="input" name="fax" value="" placeholder="请输入传真" />
								</view>
								<view class="grace-items">
									<view class="grace-label">官网</view>
									<input type="text" class="input" name="website" value="" placeholder="请输入网址" />
								</view>
								<view class="grace-items grace-noborder">
									<view class="clien other">
										<textarea placeholder="备注..." name="desc"></textarea>
									</view>
								</view>
								<view style="padding:22upx 0;">
									<button formType="submit" type="primary" style="width:100%;">提交</button>
								</view>
							</form>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list" style="padding:25upx; width:700upx;">
						<view class="grace-list hj">
							<view class="items">
								<view class="icons grace-icons iconfont icon-dingdan"></view>
								<view class="body">
									<view class="title">开票信息</view>
								</view>
							</view>
						</view>
						<view class="grace-body">
							<form @submit="formSubmit1" class="grace-form grace-margin-top">
								<view class="grace-items">
									<view class="grace-label">开票公司</view>
									<input type="text" class="input" name="bill_company" value="兴建祥供应商"
									 placeholder="请输入开票公司" />
								</view>
								<view class="grace-items">
									<view class="grace-label">税号</view>
									<input type="text" class="input" name="bill_no" value="兴建祥供应商" placeholder="请输入纳税人识别号" />
								</view>
								<view class="grace-items">
									<view class="grace-label">开票联系人</view>
									<input type="text" class="input" name="bill_linkman" value="钟女士"
									 placeholder="请输入开票联系人" />
								</view>
								<view class="grace-items">
									<view class="grace-label">联系方式</view>
									<input type="text" class="input" name="bill_tel" value="15567897656"
									 placeholder="请输入联系方式" />
								</view>
								<view class="grace-items">
									<view class="grace-label">开户行</view>
									<input type="text" class="input" name="bill_bank" value=""
									 placeholder="请输入开户行" />
								</view>
								<view class="grace-items">
									<view class="grace-label">账号</view>
									<input type="text" class="input" name="bill_account" value=""
									 placeholder="请输入账号" />
								</view>
								<view class="grace-items">
									<view class="grace-label">收件地址</view>
									<input type="text" class="input" name="bill_address" value=""
									 placeholder="请输入收件地址" />
								</view>
								<view class="grace-items grace-noborder">
									<view class="clien other">
										<textarea placeholder="请输入开票要求" name="bill_remark" value=""></textarea>
									</view>
								</view>
								<view style="padding:22upx 0;">
									<button formType="submit" type="primary" style="width:100%;">提交</button>
								</view>
							</form>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="ot-infor-mv" style="background-color: #eee">
				<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list ot-padding">
						<view class="ot-Dtailes-host">
							<form @submit="formSubmit2">
								<view class="ot-photo-left">
									<view class="grace-list hl">
										<view class="grace-space-between">
											<view class="demo6">
												<button type="primary" class="grace-button ot-pay-bto" size="mini" @tap="selectImg1">上传营业执照</button>
											</view>
										</view>
										<view class="grace-space-between">
											<view class="grace-idcard-preview">
												<view>
													<image :src="idCard1" mode="" @tap="previewImg1"></image>
												</view>
											</view>

										</view>

									</view>
									<view class="grace-list hl">
										<view class="grace-space-between">
											<view class="demo6">
												<button type="primary" class="grace-button ot-pay-bto" size="mini" @tap="selectImg2">上传开户资料</button>
											</view>
										</view>
										<view class="grace-space-between">
											<view class="grace-idcard-preview">
												<view>
													<image :src="idCard2" mode="" @tap="previewImg2"></image>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="ot-sub-btn">
									<button formType="submit" type="primary" class="ot-button">提交</button>
								</view>
							</form>
						</view>

						<view class="ot-Dtailes-host">
							<view class="ot-photo-left">
								<view class="grace-list hl">
									<view class="grace-space-between">
										<view class="demo6">
											<button type="primary" class="grace-button ot-pay-bto" size="mini" @tap="selectImg3">身份证正面照</button>
										</view>
									</view>
									<view class="grace-space-between">
										<view class="grace-idcard-preview">
											<view>
												<image :src="idCard3"  @tap="previewImg3" mode=""></image>
											</view>
										</view>
									</view>
								</view>
								<view class="grace-list hl">
									<view class="grace-space-between">
										<view class="demo6">
											<button type="primary" class="grace-button ot-pay-bto" size="mini" @tap="selectImg4">身份证反面照</button>
										</view>
									</view>
									<view class="grace-space-between">
										<view class="grace-idcard-preview">
											<view>
												<image :src="idCard4" @tap="previewImg4" mode=""></image>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="ot-sub-btn">
								<button formType="submit" type="primary" class="ot-button">提交</button>
							</view>
							</form>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
		 @onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>

<script>
	import common from '../../../../common/common.js'
	import graceNav from "../../../../graceUI/components/graceNavBar.vue";
	import graceEmpty from '../../../../graceUI/components/graceEmpty.vue';
	import graceSpeaker from "../../../../graceUI/components/graceSpeaker.vue";
	var systemInfo = require('../../../../graceUI/jsTools/systemInfo.js');
	import mpvuePicker from '../../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				themeColor: '#007AFF', 
				cityText1: "请选择",
				cityPickerValueDefault1: [0, 0, 1], 
				city1: null, 
				genderIndex: 2,
				gender: ['请选择', '企业', '个人'],
				micIndex: 0,
				mic: ['国有经济', '集体经济', '私营经济'],
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				newsIndex: 0,
				idCard1:'',
				idCard2:'',
				idCard3:'',
				idCard4:'',
				isReadType: true,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '基础信息',
						id: 'guanzhu',
						loadingType: 0,
						page: 1
					},
					{
						name: '开票信息',
						id: 'tuijian',
						loadingType: 0,
						page: 1
					},
					{
						name: '上传照片',
						id: 'tiyu',
						loadingType: 0,
						page: 1
					}
				],
				titleShowId: "tabTag-0",
			}
		},
		onLoad: function(option) {

			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
			_self = this;
		},
		// 下拉刷新事件
		onPullDownRefresh: function() {
			// 页码重置 
			this.pages[this.swiperCurrentIndex] = 1;
			this.loadingTypes[this.swiperCurrentIndex] = 0;
		},
		created() {
			_self = this
		},
		methods: {
			cityPicker1: function() {
				this.$refs.mpvueCityPicker1.show();
			},
			onConfirm1(e) {
				var cityText1 = e.label
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				//console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			bindMicChange: function(e) {
				//console.log(e);
				this.micIndex = e.detail.value
			},
			formSubmit: function(e) {
				var _self = this;
				
			},
			formSubmit1: function(e) {
				
			},
			formSubmit2: function(e) {
				var formData = e.detail.value;
				
			},
			formSubmit3: function(e) {
				
			},
			selectImg1: function() {
				var _self = this
				uni.chooseImage({

					success(res) {
						uni.showLoading({
							title: "上传中"
						});
						const uploadTask = uni.uploadFile({
							url: '',
							filePath: res.tempFilePaths[0],
							name: 'tmp',
							formData: {
								'type': 0
							},
							success(res) {
								
							},
						});

					}
				})
			},
			selectImg2: function() {
				var _self = this
				uni.chooseImage({
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url: '',
							filePath: res.tempFilePaths[0],
							name: 'tmp',
							formData: {
								'type': 0
							},
							success(res) {
								
								uni.showToast({
									title: '上传成功',
									icon: 'success'
								})
							},
						})

					}
				})
			},
			selectImg3: function() {
				var _self = this
				uni.chooseImage({
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url:'' ,
							filePath: res.tempFilePaths[0],
							name: 'tmp',
							formData: {
								'type': 0
							},
							success(res) {
								
								uni.showToast({
									title: '上传成功',
									icon: 'success'
								})
							},
						})

					}
				})
			},
			selectImg4: function() {
				var _self = this
				uni.chooseImage({
					success: function(res) {
						uni.showLoading({
							title: "上传中"
						});
						uni.uploadFile({
							url: '',
							filePath: res.tempFilePaths[0],
							name: 'tmp',
							formData: {
								'type': 0
							},
							success(res) {
								
								uni.showToast({
									title: '上传成功',
									icon: 'success'
								})
							},
						})

					}
				})
			},

			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0
				});
			},
			previewImg2: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard2],
					current: 0
				});
			},
			previewImg3: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard3],
					current: 0
				});
			},
			previewImg4: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard4],
					current: 0
				});
			},

			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				console.log('loadmore.....');
				// 判断加载状态避免多次滚动时有加载尚未完成
			},
		},
		components: {
			graceNav,
			graceEmpty,
			"grace-speaker": graceSpeaker,
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	.grace-tab-title {
		position: fixed;
		z-index: 9;
	}

	.grace-tab-swiper-full scroll-view {
		padding-bottom: 40px !important;
		box-sizing: border-box;
	}

	.grace-tab-swiper-full .ot-infor-mv {
		margin-top: 43px;
		padding-top: 5px;
	}

	.grace-body {
		width: 100%;
		padding: 0px;
	}

	.icon-dingdan:before {
		content: "\e608";
	}

	.hj {
		background-color: #fff;
		padding: 0px 0upx !important;
		box-sizing: border-box;
		border-radius: 10upx;
		border: none;
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
		margin-bottom: 0upx;
	}

	.hj.grace-list {
		padding: 0px;
	}

	.grace-body {
		box-sizing: border-box;
		padding: 0px 30upx;
	}

	.grace-margin-top {
		margin-top: 0px;
	}

	.grace-form .grace-items {
		padding: 0px;
		border: none;
		;
	}

	button {
		background-color: #ff5722 !important;
	}

	.grace-form .grace-items .clien.other {
		margin-left: 0px;
		padding-left: 0px;
	}

	.grace-form .grace-items .other {
		padding: 0px;
	}

	.grace-form textarea {
		font-size: 30upx;
	}

	.grace-tab-title {
		box-shadow: 1px 1px 12upx #ccc;
	}

	.grace-tab-current {
		border-bottom: 4upx solid #ff5722 !important;
		color: #ff5722;
		font-weight: 700;
	}

	.ot-Dtailes-host {
		background-color: #fff;
		padding: 20upx 0upx;
		border-radius: 10upx;
		margin-bottom: 40upx;
		box-sizing: border-box;
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

	.ot-pay-bto {
		background-color: #5ca7e2 !important;
		padding: 0px 10upx !important;
	}

	.grace-idcard-preview view:nth-of-type(1) image {
		width: 100%;
		display: block;
		height: 170upx;
	}

	.grace-idcard-preview view:nth-of-type(1) {
		display: flex;
		flex-direction: column;
	}

	.grace-idcard-preview view:nth-of-type(1) {
		display: flex;
		flex-direction: column;
		width: 200upx;
	}

	.ot-photo-left {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hl {
		width: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
		width: 50%;
		padding: 0px 0upx !important;
		box-sizing: border-box;
		border-radius: 10upx;
	}

	.hl:nth-of-type(1) {
		border-right: 1px dashed #ccc;
	}

	.ot-padding {
		padding: 25upx;
		width: 100%;
		box-sizing: border-box;
	}

	.ot-button {
		line-height: 75upx;
		background-color: #ff5722 !important;
		border-radius: 10upx !important;
	}

	.ot-sub-btn {
		padding: 22upx 60upx;
		padding-bottom: 10upx;
	}
</style>
