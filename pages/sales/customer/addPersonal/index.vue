<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">客户名称</view>
					<input type="text" class="input" placeholder="请输入客户名称" name="v.name" />
				</view>
				<view class="grace-items">
					<view class="grace-label">客户来源</view>
					<view class="other">
						<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="v.source">
							<text>{{gender[genderIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">所在地区</view>
					<view @click="cityPicker1" class="other" name="v.area">
						{{cityText1}}
						<text class="grace-icons icon-arrow-right"></text>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">联系人</view>
					<input type="text" class="input" placeholder="请输入联系人" name="v.linkman" />
				</view>
				<view class="grace-items">
					<view class="grace-label">手机号码</view>
					<input type="text" class="input" placeholder="请输入手机号码" name="v.tel" />
				</view>
				<view class="grace-items">
					<view class="grace-label">联系地址</view>
					<input type="text" class="input" placeholder="请输入联系地址" name="v.address" />
				</view>
				<view class="grace-items">
					<view class="grace-label">选择分组</view>
					<view class="grace-label-x">
						<checkbox-group name="category"  >
							<label class="radio" v-for="(item,index) in category" :key="index">
								<checkbox style="transform:scale(0.8)" color="#ff5722" :value="item.id+''" :checked="index === 'current'"></checkbox>{{item.name}}
							</label>
						</checkbox-group>
					</view>
				</view>
				<view style="padding:22upx 0upx;">
					<button formType="submit" type="primary" style="width:100%;">提交</button>
				</view>
				<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker1" :pickerValueDefault="cityPickerValueDefault1"
				 @onConfirm="onConfirm1">
				</mpvue-city-picker>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	import mpvuePicker from '../../../../graceUI/threeComponents/mpvuePicker.vue';
	import mpvueCityPicker from '../../../../graceUI/threeComponents/mpvueCityPicker.vue';
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				genderIndex: 0,
				gender: ['请选择', '客户介绍', '电话来访'],
				dateValue: null,
				themeColor: '#007AFF', //颜色
				cityText1: "请选择所在地区", //文本
				cityPickerValueDefault1: [0, 0, 1], //默认选项
				city1: null ,//客户选择城市后保存的城市数据
				category:[]
			}
		},
		created() {
			_self = this
			uni.request({
				url:this.$webUrl+"/sale/findCategory",
				data:{phone:uni.getStorageSync("phoneno")},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					var data = res.data
					//console.log(data)
					_self.category = data
				}
			})
		},
		methods: {
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [
					{
						name: "v.name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "姓名不能为空"
					},
					{
						name: "v.source",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请选择客户来源"
					},
					{
						name: "v.linkman",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入联系人"
					},
					{
						name: "v.tel",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请输入手机号码"
					},
					{
						name: "v.address",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入联系地址"
					},
	
				];
				//进行表单检查
				//console.log(e)
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				formData["v.source"] = _self.gender[_self.genderIndex]
				formData["v.area"] = _self.cityText1.split("-").join(",")
				if (checkRes) {
					// uni.navigateBack({
					// 	delta: 1,
					// }); //返回上一页面
					uni.request({
						url:this.$webUrl+"/sale/addCustomer",
						data:formData,
						header: {
							'Access-Token': uni.getStorageSync("token"),
							'content-type':'multipart/form-data'
						},
						success(res) {
							if(res.data){
									uni.showToast({
										title: "验证通过!",
										icon: "none"
									});
									uni.navigateTo({
										url:'../customerList/index'
									})
							}
						}
					})
					//console.log(JSON.stringify(formData));
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
				//console.log(cityText1, cityValue1, cityCode1);
				this.cityText1 = cityText1;
				this.cityPickerValueDefault1 = cityValue1;
				this.city1 = e;
			},
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
	}
	
	.grace-form .grace-items{
		border:none;
		align-items: flex-start;
	}
	
	.grace-form uni-radio-group, .grace-form uni-checkbox-group{
		justify-content: flex-end;
	}

	.grace-body {
		box-sizing: border-box;
		padding: 0px 30upx;
	}
	checkbox-group{
		min-width: 520upx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	checkbox-group label{
		width: 45%;
		display: flex;
		justify-content: flex-start;
	}
</style>
