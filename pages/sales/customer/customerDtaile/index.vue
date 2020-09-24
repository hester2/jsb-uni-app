<template>
	<view class="ot-Dtailes-host">
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
				<input type="text" v-show="false" :value="c.id" name="c.id">
				<view class="grace-items">
					<view class="grace-label">客户名称</view>
					<input type="text" class="input" name="c.name" :value="c.name" />
				</view>
				<view class="grace-items">
					<view class="grace-label">客户类型</view>
					<input type="text" class="input" name="c.type" :value="c.type" />
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
					<input type="text" class="input" name="c.address" placeholder="请填写联详细地址" :value="c.address"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">客户来源</view>
					<input type="text" class="input" name="c.source" :value="c.source" />
				</view>
				<view class="grace-items">
					<view class="grace-label">联系人</view>
					<input type="text" class="input" name="c.linkman" :value="c.linkman" />
				</view>
				<view class="grace-items">
					<view class="grace-label">手机号码</view>
					<input type="text" class="input" name="c.mobile" :value="c.mobile" />
				</view>
				<view class="ot-button-fl">
					<button formType="submit" type="primary" size="mini">提交</button>
					<button @tap="handleClick" type="primary" size="mini">下一步</button>
				</view>
			</form>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
		 @onConfirm="onConfirm1">
		</mpvue-city-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				themeColor: '#007AFF', //颜色
				cityText1: "请选择所在地区", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null, //客户选择城市后保存的城市数据
				c: []
			}
		},
		created() {
			_self = this;
		},
		onLoad(option) {
			var id = option.id
			uni.request({
				url: this.$webUrl + "/sale/findCustomer",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.c = res.data
					_self.cityText1 = res.data.area.split(",").join("-")
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				var _self = this;
				var formData = e.detail.value;
				formData["c.area"] = _self.cityText1.split("-").join(",")
				uni.request({
					url: this.$webUrl + "/sale/updateCustomer",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						if (res.data) {
							uni.showToast({
								title: "更新成功"
							})
						}
					}
				})
			},
			cityPicker1: function() {
				this.$refs.mpvueCityPicker1.show();
			},
			onConfirm1(e) {
				var cityText1 = e.label;
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
			handleClick(e) {
				uni.navigateTo({
					url: '../customerInvoice/index?id=' + _self.c.id
				})
			},
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	page {
		background-color: #eee;
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
		margin-bottom: 0upx;
	}

	.hj.grace-list {
		padding: 0px;
	}

	.ot-Dtailes-host {
		margin: 20upx 20upx;
		background-color: #fff;
		padding: 0px 20upx;
		border-radius: 10upx;
	}

	button {
		background-color: #fe5722 !important;
	}

	.ot-submit-img {
		display: flex;
		flex-direction: row;
		justify-content: flex-start !important;
	}

	.ot-submit-img view {
		margin-right: 30upx;
		line-height: 60upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
		color: #fff;
		background-color: #fe5722 !important;
	}

	.grace-idcard-preview image {
		width: 25%;
	}

	.grace-form .grace-items .grace-label {
		width: 140upx;
	}

	.grace-form .grace-items {
		border: none;
		padding: 10upx 0px;
	}

	.ot-button-fl {
		width: 100%;
		right: 0px;
		background-color: #fff;
		display: flex;
		box-sizing: border-box;
		padding: 20upx 0upx;
		justify-content: space-between;
	}

	.ot-button-fl button {
		padding: 0px;
	}

	.ot-button-fl button:nth-of-type(1) {
		background-color: #fe5722 !important;
		border: 2upx solid #fe5722;
		margin: 0px;
		width: 26%;
		height: 60upx;
		line-height: 60upx;
		box-sizing: border-box;
	}

	.ot-button-fl button:nth-of-type(2) {
		background-color: transparent !important;
		border: 2upx solid #fe5722;
		color: #fe5722;
		margin: 0;
		height: 60upx;
		line-height: 60upx;
		width: 26%;
		box-sizing: border-box;
	}

	button[size=mini] {
		line-height: 70upx;
	}

	.grace-form .grace-items .clien.other {
		margin-left: 0px;
		padding-left: 0px;
	}

	.grace-form textarea {
		font-size: 30upx;
	}

	.grace-margin-top {
		margin: 0px;
	}
</style>
