<template>
	<view class="">
		<view class="ot-Dtailes-host" v-for="(item,index) in vs" :key="index">
			<view class="ot-home-qx mn">
				<text></text>
				<text>支付信息</text>
			</view>
			<view class="grace-list hj">
				<view class="grace-space-between">
					<view class="demo6">出款金额:</view>
					<view class="demo7  grace-no-scale">{{item.price}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">出款日期:</view>
					<view class="demo7  grace-no-scale">{{item.create_time}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">状态:</view>
					<view class="demo7  grace-no-scale">{{item.state}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">操作:</view>
					<view class="demo7  grace-no-scale">
						<button type="primary" class="grace-button ot-pay-btn" size="mini" @tap="previewImg1(item.file_id)">预览</button>
						<button type="primary" class="grace-button ot-pay-bth" size="mini" @tap="handleDel(item.id)">删除</button>
					</view>
				</view>
			</view>
		</view>
		<view class="grace-null" v-if="vs.length==0?true:false">
			<telNull titleName="暂无支付信息"></telNull>
		</view>
	</view>
</template>

<script>
	import telNull from "../../../../../components/telNull.vue"
	var _self
	export default {
		components:{
			telNull
		},
		data() {
			return {
               idCard1:'',
			   vs:[]
			}
		},
		onLoad(option){
			var id = option.id
			_self =this
			uni.request({
				url:this.$webUrl+"/logistics/supVouchers",
				data:{id:id},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					console.log(res.data)
					_self.vs = res.data
				}
			})
		},
		methods: {
			handleDel(e) {
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: function(sm) {
						if (sm.confirm) {
							uni.request({
								url:_self.$webUrl+"/logistics/deleteSupVoucher",
								data:{id:e},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res){
										uni.showToast({
											title:res.data
										})
								}
							})
						} else if (sm.cancel) {}
					}
				})
			},
			previewImg1: function(e) {
				var _self = this
				uni.previewImage({
					urls: [_self.$webUrl+"/file/getUploadFile?fileName="+e],
					current: 0
				});
			},
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderPay.css";
	.grace-null {
		height: 600upx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
