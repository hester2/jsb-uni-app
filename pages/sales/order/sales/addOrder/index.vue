<template>
	<view class="ot-Dtailes-host">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<input type="text" v-bind:value="c.salesman_id" name="salesman_id" v-show="false">
				<input type= "text" v-bind:value = "c.customer_id" name="customer_id" v-show="false">
				<input type= "text" v-bind:value = "c.quote_id" name="quote_id" v-show="false">	
				<view class="grace-items">
					<view class="grace-label">产品型号</view>
					<input type="text" class="input" name="product"  v-bind:value="c.category+','+c.area+','+c.code"/>
				</view>
				<view class="grace-items">
					<view class="grace-label">客户类型</view>
					<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="" disabled="true">
						<text>{{gender[genderIndex]}}</text>
					</picker>
				</view>
				<view class="grace-items">
					<view class="grace-label">客户名称</view>
					<picker @change="bindPickerChange" :value="rangeIndex" :range="range" name="" disabled="true">
						<text>{{c.customer_name}}</text>
					</picker>
				</view>
				<view class="grace-items">
					<view class="grace-label">付款方式</view>
					<view class="other">
						<picker @change="bindPickerChange" :value="rangeIndex" :range="range" name="trade_type">
							<text>{{range[rangeIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">含税价</view>
					<input type="text" class="input" name="price" v-bind:value="c.tax_price" />
				</view>
				<view class="grace-items">
					<view class="grace-label">送货地址</view>
					<input type="text" class="input" name="transport_address" v-bind:value="c.address"  />
				</view>
				<view class="grace-items">
					<view class="grace-label">物流方式</view>
					<view class="other">
						<picker @change="bindLogisticsChange" :value="logisticsIndex" :range="logistics" name="transport_type">
							<text>{{logistics[logisticsIndex]}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">数量</view>
					<input type="text" class="input" name="num" placeholder="请输入数量" />
				</view>
				<view style="padding:22upx 0;">
					<button formType="submit"  type="primary" style="width:100%;">立即提交</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var  graceChecker = require("../../../../../graceUI/jsTools/graceChecker.js");
	var  date = require("../../../../../graceUI/jsTools/date.js");
	import DateFormat from "../../../../../common/DateFormat.js";
	export default {
		data() {
			return {
				genderIndex: 0,
				gender: ['企业', '个人'],
				range:['货到付款','款到发货','赊销方式'],
				rangeIndex:0,
				dateValue: "请选择",
				logisticsIndex: 0,
				logistics: ['自提', '配送'],
				daId:'',
				cId:'',
				c:[]
			}
		},
		onLoad(option) {
			var _self = this
			 _self.daId = option.daId
			 _self.cId = option.cId
			 var phone;
			 uni.getStorage({
			 	key:'phoneno',
				success(res) {
					phone = res.data
				}
			 })
			uni.request({
				url:this.$webUrl+"/sale/addOrder",
				data:{daId:_self.daId,cId:_self.cId,phone:phone},
				header:{'Access-Token':uni.getStorageSync("token")},
				success(res){
					var data = res.data
					_self.c = data
					if(data.customer_type=='企业'){
						_self.genderIndex = 0
					}
					else if(data.customer_type=='个人'){
						_self.genderIndex = 1
					}
				}
			})
		},
		methods: {
			bindPickerChange: function(e) {
				this.rangeIndex= e.detail.value
			},
			bindLogisticsChange: function(e) {
				this.logisticsIndex= e.detail.value
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
					name: "num",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请输入数量"
				}];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				var _self = this
				formData.total_price = formData.num*formData.price
				var formatStr=new DateFormat()
				formData.sale_time = formatStr.toString('yyyy-mm-dd hh:ff:ss')
				formData.state = "已下单"
				formData.salesman_name = _self.c.salesman_name
				formData.remainder_num = formData.num
				formData.customer_name = _self.c.customer_name
				if(_self.genderIndex==0){
					formData.tax = '含税'
				}
				else if(_self.genderIndex==1){
					formData.tax = '不含'
				}
				if(_self.rangeIndex=="0"){
					formData.trade_type = "货到付款"
				}
				else if(_self.rangeIndex=="1"){
					formData.trade_type = "款到发货"
				}
				else if(_self.rangeindex=="2"){
					formData.trade_type = "赊销方式"
				}
				if(_self.logisticsIndex=="0"){
					formData.transport_type = "自提"
				}
				else if(_self.logisticsIndex=="1"){
					formData.transport_type = "配送"
				}
				// //console.log(JSON.stringify(formData))
				if (checkRes) {
					uni.request({
						url:this.$webUrl+"/sale/doAddOrder",
						data:formData,
						header:{'Access-Token':uni.getStorageSync("token")},
						success(res) {
							var data =res.data;
							if(data){
								if(_self.genderIndex==0){
							uni.navigateTo({
								url:'../salesList/index'
							})		
								}
								
							else if(_self.genderIndex==1){
								uni.navigateTo({
									url:'../../money/moneyList/index'
								})		
							}
							}
						}
					})
					uni.showToast({
						title: "验证通过!",
						icon: "none"
					});
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
	page {
		background-color: #eee;
	}

	.ot-Dtailes-host {
		margin: 35upx 20upx;
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
