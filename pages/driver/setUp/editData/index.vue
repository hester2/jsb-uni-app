<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<input type="text" :value="d.id" v-show="false" name="d.id">
					<view class="grace-label">姓名</view>
					<input type="text" class="input" name="d.name" :value="d.name" placeholder="请填写姓名"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">身份证号</view>
					<input type="text" class="input" name="d.card_no" :value="d.card_no" placeholder="请填写身份证号"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">手机号码</view>
					<input type="text" class="input" name="d.tel" :value="d.tel" placeholder="请填写手机号码"></input>
				</view>
				<view class="grace-items grace-noborder">
					<view class="grace-label">车牌号</view>
					<input type="text" class="input" :value="d.plate_no" name="d.plate_no" placeholder="请填写车牌号"></input>
				</view>
				<view class="grace-items">
					<view class="grace-label">物流公司</view>
					<view class="other">
						<picker @change="bindLogisticsChange" :value="logisticsIndex" :range="logistics" :range-key="'name'" name="d.logistics_id">
							<text>{{logisticsName}}</text>
						</picker>
					</view>
				</view>
				<view style="padding:30rpx 0;">
					<button formType="submit" type="primary" class="grace-button grace-border-radius">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var _self;
	var graceChecker = require("../../../../graceUI/jsTools/graceChecker.js");
	
	export default {
		data() {
			return {
				logisticsIndex: 0,
				logistics: [{name:'请选择物流公司'}],
				d:{},
				logisticsName:''
			}
		},
		created() {
			_self = this;
		},
		onLoad(){
			uni.request({
				url:this.$webUrl+"/driver/getDriver",
				data:{phone:uni.getStorageSync("phoneno")},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					var data=res.data
					for(var s in data){
						if(data[s]==null){
							data[s]=""
						}
					}
					_self.d=data
					_self.logisticsName=data.logistics_name
				}
			})
			uni.request({
				url:this.$webUrl+"/driver/findAllLogistics",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.logistics = _self.logistics.concat(res.data)
				}
			})
		},
		methods: {
			bindLogisticsChange: function(e) {
				console.log(e);
				this.logisticsIndex = e.detail.value
				_self.logisticsName=_self.logistics[_self.logisticsIndex].name
			},
			formSubmit: function(e) {
				var rule = []
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url:_self.$webUrl+"/logistics/updateDriver",
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
