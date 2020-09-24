<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-margin-top grace-form">
			<view class="grace-items">
				<view class="grace-label">产品型号</view>
				<input type="text" class="input" :value="area+','+code" disabled name="product" />
			</view>
			<view class="grace-items">
				<view class="grace-label">客户</view>
				<input type="text" :value="info.customer_id" v-show="false" name="o.customer_id">
				<input type="text" :value="info.customer_name" class="input" disabled name="o.customer_name" />
			</view>
			<view class="grace-items">
				<view class="grace-label">付款方式</view>
				<input type="text" value="货到付款" class="input" disabled name="o.trade_type" />
			</view>
			<view class="grace-items">
				<view class="grace-label">物流方式</view>
				<input type="text" value="自提" class="input" disabled name="o.transport_type" />
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">送货地址</view>
				<input type="text" value="" class="input" name="o.transport_address" />
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">销售日期</view>
				<view class="other">
					<picker @change="bindDateChange" :value="dateValue" mode="date" name="o.sale_time" start="2018-01-01">
						<text>{{dateValue == null ? '请选择' : dateValue}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">数量(吨)</view>
				<input type="text" value="0" class="input"  name="o.num" @input="changeNum"/>
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">单价(元)</view>
				<input type="text" value="0" class="input"  name="o.price" @input="changePrice"/>
			</view>
			<view class="grace-items">
				<view class="grace-label ">金额(元)</view>
				<input type="text" :value="total_price" class="input"  disabled name="o.total_price" />
			</view>
			<button type="primary" formType="submit">立即提交</button>
		</form>
	</view>
</template>
<script>
	var _self
     export default{
		 data(){
			 return{
				 dateValue:'2019-08-12',
				 area:'',
				 code:'',
				 id:'',
				 rid:'',
				 pid:'',
				 info:[],
				 price:0,
				 num:0,
				 total_price:0,
				 sid:''
			 }
		 }, 
		 onLoad(option){
			 _self=this
			 var id=option.id
			 _self.id=option.id
			 _self.rid=option.rid
			 _self.pid=option.pid
			 _self.sid=option.sid
			 _self.area=option.area
			 _self.code=option.code
			 uni.request({
			 	url:this.$webUrl+"/logistics/resale/getIncoming",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.info = res.data
					console.log(_self.info)
				}
			 })	
		 },
		 methods:{
			 bindDateChange(e){
				this.dateValue=e.detail.value 
			 },
			 formSubmit(e){
				 var formData = e.detail.value
				 formData.id=_self.id
				 formData.sid=_self.sid
				 formData.pid=_self.pid
				 formData.rid=_self.rid
				 formData.phone=uni.getStorageSync("phoneno")
				 uni.request({
				 	url:this.$webUrl+'/logistics/resale/doIncomingAdd',
					data:formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res){
						if(res.data){
							uni.showToast({
								title:'回款成功'
							})
						}
					}
				 })
			 },
			 changePrice(e){
				 _self.price = e.detail.value
				 _self.total_price = _self.num*_self.price
			 },
			 changeNum(e){
				 _self.num = e.detail.value
				 _self.total_price = _self.num*_self.price
			 }
		 }
	 }
</script>
<style>
	.grace-body{
		width: 100%;
		box-sizing: border-box;
		padding: 0px 30upx;
	}
	.grace-form .grace-items{
		border:none
	}
    button{
		background-color: #ff5722 !important;
	}
	.ot-color{
		color: #ff5722 !important;
	}
</style>
