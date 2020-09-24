<template>
	<view class="">
		<view class="status_bar"></view>
		<view class="gd-console-fo">
			<view class=" gd-console-fs icons grace-icons icon-arrow-left grace-white" @tap="goback"></view>
			<view class="gd-console-fe">客户下单</view>
			<view class="gd-console-fr">
			</view>
		</view>
		<view class="ot-Dtailes-host">
			<view class="grace-body">
				<form @submit="formSubmit" class="grace-form grace-margin-top">
					<view class="grace-items">
						<view class="grace-label">产品型号</view>
						<input type="text" disabled class="input" name="com" :value="product" />
					</view>
					<view class="grace-items">
						<view class="grace-label">客户名称</view>
						<input type="text" class="input" name="ein" :value="order.name" />
					</view>
					<view class="grace-items">
						<view class="grace-label">付款方式</view>
						<view class="other">
							<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
								<text>{{gender[genderIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">送货地址</view>
						<input type="text" class="input" name="where" :value="order.address" />
					</view>
					<view class="grace-items">
						<view class="grace-label">含税单价</view>
						<input type="text" disabled class="input" name="tax" :value="order.tax_price" />
					</view>
					<view class="grace-items">
						<view class="grace-label">物流方式</view>
						<view class="other">
							<picker @change="bindLogisticsChange" :value="logisticsIndex" :range="logistics" name="logistics">
								<text>{{logistics[logisticsIndex]}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">日期</view>
						<view class="other">
							<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2018-01-01" end="2022-01-01">
								<text>{{dateValue == null ? '请选择' : dateValue}}</text>
							</picker>
						</view>
					</view>
					<view class="grace-items">
						<view class="grace-label">数量</view>
						<input type="text" class="input" name="number" placeholder="请输入数量" />
					</view>
					<view style="padding:22upx 0;">
						<button formType="submit" type="primary" style="width:100%;">立即提交</button>
					</view>
				</form>
			</view>
		</view>

	</view>
</template>

<script>
	var graceChecker = require("../../../graceUI/jsTools/graceChecker.js");
	var _self;
	export default {
		data() {
			return {
				genderIndex: 0,
				gender: ['货到付款', '款到发货', '赊销方式'],
				dateValue: null,
				logisticsIndex: 0,
				logistics: ['自提', '配送'],
				daId: 0,
				phoneno:0,
				order:[],
				product:''
			}
		},
		onLoad(option) {
			_self = this
			//console.log(option.daId)
			_self.daId = option.daId
		},
		mounted() {
			uni.getStorage({
				key: 'phoneno',
				success: function(res) {
					_self.phoneno=res.data
				}
			})
			uni.request({
				url: this.$webUrl + '/customer/addOrder',
				data: {
					id: _self.daId,
					phone:_self.phoneno
				},
				header:{'Access-Token':uni.getStorageSync("token")},
				success: (res) => {
					_self.order=res.data
					_self.product=res.data.area+","+res.data.category+","+res.data.code
				},
				fail: (error) => {
					uni.showToast({
						icon: 'loading',
						title: "网络请求错误"
					})
				}
			})
		},
		methods: {
			goback() {
				this.$router.go(-1)
			},
			bindPickerChange: function(e) {
				//console.log(e);
				this.genderIndex = e.detail.value
			},
			bindLogisticsChange: function(e) {
				//console.log(e);
				this.logisticsIndex = e.detail.value
			},
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
			formSubmit: function(e) {
				//定义表单规则\
				_self = this;
				var rule = [{
					name: "number",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请输入数量"
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
					formData["phone"] = _self.phoneno;
					formData["quoteId"] = _self.daId;
					uni.request({
					    url: this.$webUrl + '/customer/doAddOrder',
						data:formData,
						header:{'Access-Token':uni.getStorageSync("token")},
					    success: (res) => {
					        //console.log(formData)
							uni.hideToast()
							uni.navigateTo({
								url: '../myOrder/index',
							});
					    },
					    fail: (error) => {
					        //console.log(error)
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
	.grace-form .grace-items {
		border: none
	}
	
	.status_bar {
	    height: var(--status-bar-height);
	    width: 100%;
	    background-color: #ff5722;
	}

	.gd-console-fo {
		height: 88upx;
		line-height: 88upx;
		background-color: #ff5722;
		display: flex;
		box-sizing: border-box;
		padding: 0px 20rpx;
		/* padding-top: 40upx; */
	}

	.gd-console-fs {
		flex: 1;
		color: #fff;
		line-height: 88upx;
		font-size: 45upx;
	}

	.gd-console-fe {
		flex: 10;
		color: #fff;
		text-align: center;
		line-height: 88upx;
		font-size: 34upx;
	}

	.gd-console-fr {
		flex: 1;
	}

	.gd-console-fr image {
		width: 45upx;
		height: 45upx;
		display: block;
		margin-top: 6upx;
		margin-right: 8upx;
	}

	.ot-Dtailes-host {
		background-color: #fff;
		padding: 0px 20upx;
		border-radius: 10upx;
	}

	.grace-form .grace-items .clien.other {
		margin-left: 0px;
		padding-left: 0px;
	}

	.grace-form textarea {
		font-size: 30upx;
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
</style>
