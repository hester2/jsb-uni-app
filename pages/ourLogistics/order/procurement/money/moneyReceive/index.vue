<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="ot-home-qx mn">
				<text></text>
				<text>发票信息</text>
			</view>
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">发票号:</view>
					<view class="demo7  grace-no-scale">{{o.invoice_file_num}}</view>
				</view>
			</view>
		</view>
		<view class="ot-Dtailes-host">
			<view class="ot-home-qx mn">
				<text></text>
				<text>签收单</text>
			</view>
			<view class="grace-list hj">
				<view class="grace-idcard-items">
					<view class="grace-idcard-uper-btn">
						<view class="img">
							<image :src="img+'zanwu1.png'" />
						</view>
					</view>
					<view class="grace-idcard-preview">
						<image :src="idCard1" @tap="previewImg1"></image>
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
	import common from '../../../../../../common/common.js'
	var _self
	export default {
		data() {
			return {
				img: common.imageUrlPath,
               idCard1:'',
			   o:{},
			   id:'',
			   url: '',
			   sign_file_id:''
			   
			}
		},
		onLoad(option){
			_self=this
			_self.url = _self.$webUrl + "/file/getUploadFile?fileName="
			
					var id = option.id
					_self.id=id
					
					uni.request({
						url: this.$webUrl + "/presale/order/orderDetail",
						data: {
							id: id
						},
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							_self.o = res.data
							if (_self.o.sign_file_id != null) {
								_self.idCard1 = _self.url + _self.o.sign_file_id
								_self.display=true
							}
						}
					}) 
		},
		methods: {
			handleClick(){
				uni.navigateTo({
					url: '../moneySplit/index?id='+_self.id,
				});
			},
			previewImg1: function(e) {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0
				});
			},
		}
	}
</script>

<style>
	@import "../../../../../../common/css/orderPay.css";
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
		margin-bottom: 30upx;
	}
	
	.hj.grace-list {
		padding: 0px;
	}
	.grace-idcard-uper-btn{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 170upx;
		}
</style>
