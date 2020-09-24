<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					
					<input type="text" v-show="false" name="o.related_order_id" :value="info.id">
					<view class="grace-label">客户名称</view>
					<input type="text" class="input" :value="info.customer_name" name="" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">供应商</view>
					<input type="text" class="input" :value="info.supplier_name" name="" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">型号</view>
					<input type="text" class="input" :value="info.area+','+info.code" name="product" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">吨数</view>
					<input type="text" class="input" :value="info.related_num" name="o.num" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">仓库地址</view>
					<input type="text" class="input" :value="info.from_address" name="o.from_address" disabled />
				</view>
				<view class="grace-items">
					<view class="grace-label">送货地址</view>
					<input type="text" class="input" :value="info.to_address" name="o.to_address" disabled />
				</view>

				<view class="grace-items">
					<view class="grace-label">装货地区</view>
					<view @click="cityPicker1" class="other">
						{{cityText1}}
						<text class="grace-icons icon-arrow-right"></text>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">卸货地区</view>
					<view @click="cityPicker2" class="other">
						{{cityText2}}
						<text class="grace-icons icon-arrow-right"></text>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">运费</view>
					<input type="text" class="input" placeholder="请输入运费" name="o.freight"/>
				</view>
				<view class="grace-items">
					<view class="grace-label">附加费</view>
					<input type="text" class="input" placeholder="请输入附加费" name="o.additional"/>
				</view>
				<view style="padding:22rpx 0;">
					<button formType="submit" type="primary" style="width:100%;">提交</button>
				</view>
			</form>
		</view>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
		 @onConfirm="onConfirm1">
		</mpvue-city-picker>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker2" :pickerValueDefault="cityPickerValueDefault2"
		 @onConfirm="onConfirm2">
		</mpvue-city-picker>
	</view>
</template>

<script>
	var graceChecker = require("../../../../../graceUI/jsTools/graceChecker.js");
	import mpvuePicker from '../../../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				themeColor: '#007AFF', //颜色
				cityText1: "请选择所在地区", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null, //客户选择城市后保存的城市数据
				cityText2: "请选择所在地区", //文本
				cityPickerValueDefault2: [0, 0, 1], //默认选项
				city2: null, //客户选择城市后保存的城市数据
				info:{},
				type:''
			}
		},
		onLoad: function(option) {
			_self = this;
			var id = option.id
			var type =option.type
			_self.type=type
			uni.request({
				url:this.$webUrl+"/logistics/order/pushOrder",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					console.log(res.data)
					_self.info=res.data
				}
			})
		},
		methods: {
			formSubmit: function(e) {
				if (this.city1 == null) {
					uni.showToast({
						title: "请选择地区",
						icon: "none"
					});
					return false;
				}
				var rule = [];
				var formData = e.detail.value;
				formData["o.from_area"]=_self.cityText1.split("-").join(","); //此处以保存用户城市代码为例
				formData["o.to_area"]=_self.cityText2.split("-").join(","); //此处以保存用户城市代码为例
				formData["o.area"]=formData.product.split(",")[0]
				formData["o.code"]=formData.product.split(",")[1]
				formData["o.order_type"]=_self.type
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url:this.$webUrl+"/logistics/order/doPushOrder",
						data:formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res){
							if(res.data){
								uni.showToast({
									title:'推送成功'
								})
							}
						}
					})
					uni.navigateBack({
						delta:1
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			cityPicker1: function() {
				this.$refs.mpvueCityPicker1.show();
			},
			onConfirm1(e) {
				var cityText1 = e.label;
				var cityValue1 = e.value;
				var cityCode1 = e.cityCode;
				console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
			cityPicker2: function() {
				this.$refs.mpvueCityPicker2.show();
			},
			onConfirm2(e) {
				var cityText2 = e.label;
				var cityValue2 = e.value;
				var cityCode2 = e.cityCode;
				console.log(cityText2, cityValue2, cityCode2);
				this.cityText2 = cityText2;
				this.cityPickerValueDefault2 = cityValue2;
				this.city2 = e;
			},
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	.grace-body {
		box-sizing: border-box;
		padding: 0px 30rpx;
	}

	button {
		background-color: #FF5722 !important;
	}
	.grace-form .grace-items{
		border:none !important;
	}
</style>
