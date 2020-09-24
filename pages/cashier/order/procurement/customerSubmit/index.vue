<template>
	<view class="grace-body">
		<form @submit="formSubmit" class="grace-form grace-margin-top">
			<view class="grace-items">
				<view class="grace-label">产品型号</view>
				<input type="text" class="input" value="燕山,1C7A" disabled name="xinghao" />
			</view>
			<view class="grace-items">
				<view class="grace-label">客户</view>
				<input type="text" class="input" value="厦门市华商有限公司" disabled name="nickname" />
			</view>
			<view class="grace-items">
				<view class="grace-label">付款方式</view>
				<input type="text" class="input" value="货到付款" disabled name="nickname" />
			</view>
			<view class="grace-items">
				<view class="grace-label">物流方式</view>
				<input type="text" class="input" value="自提" disabled name="nickname" />
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">送货地址</view>
				<input type="text" class="input" value="厦门市思明区" name="nickname" />
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">销售日期</view>
				<view class="other">
					<picker @change="bindDateChange" :value="dateValue" mode="date" name="bd" start="2018-01-01" >
						<text>{{dateValue == null ? '请选择' : dateValue}}</text>
					</picker>
				</view>
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">数量(吨)</view>
				<input type="text" class="input" value="0" name="nickname" />
			</view>
			<view class="grace-items">
				<view class="grace-label ot-color">单价(元)</view>
				<input type="text" class="input" value="8200" name="nickname" />
			</view>
			<view class="grace-items">
				<view class="grace-label">金额(元)</view>
				<input type="text" class="input" value="0" disabled name="nickname" />
			</view>
			<button formType="submit" type="primary" style="width:100%;">提交</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dateValue: '2019-09-07'
			}
		},
		methods: {
			bindDateChange: function(e) {
				this.dateValue = e.detail.value;
			},
		}
	}
</script>

<style>
	.grace-body {
		padding: 0px 30upx;
		box-sizing: border-box;
		width: 100%;
	}
	
	.grace-form .grace-items{
		border:none
	}

	button {
		background-color: #FF5722 !important;
	}

	.ot-color {
		color: #FF5722 !important;
	}
</style>
