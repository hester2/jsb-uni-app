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
					<input type="text" disabled class="input" name="fh" :value="c.no" />
				</view>
				<view class="grace-items">
					<view class="grace-label">合同日期</view>
					<input type="text" disabled class="input" name="ft" :value="c.create_time" />
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
					<view class="grace-idcard-preview" v-if="display">
						<image :src="idCard1==''?'http://assets.jinsubao.cn/photos2.png':idCard1" @tap="previewImg1"></image>
					</view>
					<view class="text">客户上传的合同</view>
				</view>
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn">
						<view class="img">
							<image :src="img+'zanwu1.png'" />
						</view>
					</view>
					<view class="grace-idcard-preview" v-if="display1">
						<image :src="idCard2==''?'http://assets.jinsubao.cn/photos2.png':idCard2" @tap="previewImg2"></image>
					</view>
					<view class="text">我方上传的合同</view>
				</view>
			</view>
			<view style="margin-top:50rpx;">
				<button class="grace-button grace-border-radius" @tap="handleChange" type="primary">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../../../../../common/common.js'
	var _self
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				idCard1: '',
				display: true,
				idCard2: '',
				display1: true,
				orderId: '',
				c: [],
				url: '',
				id:''
			}
		},
		onLoad(option) {
			_self = this
			_self.url = _self.$webUrl + "/file/getUploadFile?fileName="
			var id = option.id
			_self.id=id
			uni.request({
				url: this.$webUrl + "/sale/order/contract",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.c = res.data
					if (_self.c.parta_file_id != null ) {
						_self.idCard1 = _self.url + _self.c.parta_file_id
						_self.display=true
					}
					if (_self.c.partb_file_id != null) {
						_self.idCard2 = _self.url + _self.c.partb_file_id
						_self.display1=true
					}
				}
			})
		},
		methods: {
			formSubmit(e) {

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

			handleChange(e) {
				uni.navigateTo({
					url: '../salesPay/index?id='+_self.id,
				})
			},
		}
	}
</script>

<style>
	@import "../../../../../../common/css/contract.css";

	.grace-items .other button:nth-of-type(1) {
		boder: 1px solid #ccc;
		background-color: transparent !important;
		color: #666;
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
</style>
