<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="ot-home-qx mn">
				<text></text>
				<text>支付信息</text>
			</view>
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">出款金额:</view>
					<view class="demo7  grace-no-scale">680000.00</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">出款日期:</view>
					<view class="demo7  grace-no-scale">2019-08-17</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7  grace-no-scale">已到账</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">操作:</view>
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button ot-pay-btn" size="mini" @tap="previewImg1">预览</button>
						<button type="primary" class="grace-button ot-pay-bth" size="mini" @tap="handleDel">删除</button>
					</view>
				</view>
			</view>
		</view>
		<view class="ot-Dtailes-host">
			<view class="ot-home-qx mn">
				<text></text>
				<text>上传签收单</text>
			</view>
			<view class="grace-list hj">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn">
						<view class="img">
							<image :src="img+'zanwu1.png'" />
						</view>
						<view class="text">我方上传的合同</view>
					</view>
					<view class="grace-idcard-preview" v-if="display1">
						<image :src="idCard2" @tap="previewImg2"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="ot-button">
			<button type="warn" @tap="handleClick" class="grace-button">
				下一页
			</button>
		</view>
	</view>
</template>

<script>
	import common from "../../../../../common/common.js"
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				idCard1: '',
				idCard2: 'http://192.168.101.7:8080/file/download?filepath=e2fd2459-3087-4c4a-b03e-0060ff2bba09.jpg',
				display1: 'block',
			}
		},
		methods:{
			  previewImg1: function () {
			    var _self = this
			    uni.previewImage({
			      urls: [_self.idCard1],
				  current:0
			    });
			  },
			  previewImg2: function () {
			    var _self = this
			    uni.previewImage({
			      urls: [_self.idCard2],
				  current:0
			    });
			  },
			  handleClick() {
			    uni.navigateTo({
			      url: '../moneySplit/index',
			    })
			  },
			  
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderPay.css";
</style>
