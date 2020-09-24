<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<input  type="text" name="l.id" :value="l.id" v-show="false">
					<view class="grace-label">名称</view>
					<input type="text" class="input" name="l.name" :value="l.name" placeholder="请填写名称"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">联系姓名</view>
					<input type="text" class="input" name="l.linkman" :value="l.linkman" placeholder="请填写联系姓名"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">联系电话</view>
					<input type="text" class="input" name="l.tel" :value="l.tel" placeholder="请填写联系电话"></input>
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
					<input type="text" class="input" :value="l.address" name="l.address" placeholder="请填写联详细地址"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">座机</view>
					<input type="text" class="input" name="l.mobile" placeholder="请填写座机" :value="l.mobile"></input>
				</view>
				<view style="padding:30rpx 0;">
					<button formType="submit" type="primary" class="grace-button grace-border-radius">提交</button>
				</view>
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
				 @onConfirm="onConfirm1">
				</mpvue-city-picker>
			</form>
		</view>
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
				l:[]
			}
		},
		created() {
			_self = this;
		},
		onLoad(){
			uni.request({
				url:this.$webUrl+"/logistics/getLogistics",
				data:{phone:uni.getStorageSync("phoneno")},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					var data=res.data
					_self.cityText1=data.area
					for(var s in data){
						if(data[s]==null){
							data[s]=""
						}
					}
					_self.l=data
				}
			})
		},
		methods: {
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
			formSubmit: function(e) {
				
				var rule = [];
				var formData = e.detail.value;
				if(_self.cityText1=="请选择所在地区"){
					_self.cityText1=""
				}
				formData["l.area"]=_self.cityText1.split("-").join(",")
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url:this.$webUrl+"/logistics/updateLogistics",
						data:formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res){
							if(res.statusCode==200){
								if(res.data){
									uni.showToast({
										title:'更新成功'
									})
								}
							}
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			}
		},
		components: {
			mpvuePicker,
			mpvueCityPicker
		}
	}
</script>

<style>
	button {
		background-color: #FF5722 !important;
		border-radius: 10rpx !important;
	}

	.grace-body {
		box-sizing: border-box;
		padding: 0px 30rpx;
	}
	.grace-form .grace-items{
		border:none;
		}
</style>
