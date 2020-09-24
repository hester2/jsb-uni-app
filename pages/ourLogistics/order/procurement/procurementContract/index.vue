<template>
	<view class="">
		<view class="grace-body">
			<view class="ot-home-qx mn">
				<text></text>
				<text>合同信息</text>
			</view>
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<input type="text" :value="c.id" name="c.id" v-show="false">
				<input type="text" :value="idCard1" name="c.parta_file_id" v-show="false">
				<input type="text" :value="idCard2" name="c.partb_file_id" v-show="false">
				<view class="grace-items">
					<view class="grace-label">合同编号</view>
					<input type="text" disabled class="input" name="c.no" :value="c.no" />
				</view>
				<view class="grace-items">
					<view class="grace-label">合同日期</view>
					<input type="text" disabled class="input" name="c.create_time" :value="c.create_time" />
				</view>
				<view class="grace-items">
					<view class="grace-label">操作</view>
					<view class="other">
						<button type="primary" class="grace-button" @tap="handleClick" size="mini">下载</button>
					</view>
				</view>
			</form>
			<view class="ot-home-qx mn">
				<text></text>
				<text>上传合同</text>
			</view>
			<view class="ot-logis-fl">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn">
						<view class="img">
							<image :src="img+'zanwu1.png'" />
						</view>
					</view>
					<view class="grace-idcard-preview">
						<image v-if="c.parta_file_id==null?false:true" :src="this.$webUrl+'/file/getUploadFile?fileName='+c.parta_file_id"
						 @tap="previewImg1"></image>
					</view>
					<view class="text">供应商上传的合同</view>
				</view>
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn">
						<view class="img">
							<image :src="img+'zanwu1.png'" />
						</view>
					</view>
					<view class="grace-idcard-preview">
						<image v-if="c.partb_file_id==null?false:true" :src="this.$webUrl+'/file/getUploadFile?fileName='+c.partb_file_id"
						 @tap="previewImg2"></image>
					</view>
					<view class="text">采购上传的合同</view>
				</view>
			</view>
			<view class="ot-button">
				<button class="grace-button grace-border-radius" @tap="handleChange(orderId)" type="primary">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../../../../common/common.js'
	var _self
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				idCard1: '',
				idCard2: '',
				c: [],
				orderId: ''
			}
		},
		onLoad(option) {
			_self = this
			var id = option.id
			_self.orderId = id
			uni.request({
				url: this.$webUrl + "/logistics/supContract",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.c = res.data
					_self.idCard1 = res.data.parta_file_id
					_self.idCard2 = res.data.partb_file_id
					console.log(_self.idCard1)
				}
			})
		},
		methods: {
			handleClick() {
				uni.downloadFile({
					url: '',
					success: function(res) {
						if (res.statusCode === 200) {
							console.log('下载成功');
							
						}
					}
				});
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
			previewImg1: function() {
				console.log(_self.idCard1)
				uni.previewImage({
					urls: [this.$webUrl + '/file/getUploadFile?fileName=' + _self.idCard1],
					current: 0

				});
			},
			previewImg2: function() {
				uni.previewImage({
					urls: [this.$webUrl + '/file/getUploadFile?fileName=' + _self.idCard2],
					current: 0
				});
			},
			handleChange(e) {
				uni.navigateTo({
					url: '../procurementPay/index?id=' + e,
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/contract.css";

	.grace-items .other button:nth-of-type(1) {
		boder: 1px solid #ccc;
		background-color: transparent !important;
		color: #666;
	}

	.grace-idcard-uper-btn {
		height: 170upx;
		padding-bottom: 0px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.grace-idcard-uper-btn .img {
		margin: 0px;
	}

	.grace-idcard-items {
		flex-direction: column;
	}

	.text {
		width: 100%;
		text-align: center;
		color: #999;
		margin-top: 10upx;
	}
	.ot-button button{
		height: 74upx !important;
		line-height: 74upx !important;
	}
</style>
