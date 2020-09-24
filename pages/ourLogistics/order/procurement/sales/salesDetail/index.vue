<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
					</view>
					<view class="ot-daile-ft">
						<view class="ot-daile-yt" @tap="handleClick(0)">取消订单</view>
						<view class="ot-daile-ask" @tap="handleClick(1)">通过审核</view>
						<view class="ot-daile-mast" @tap="handleClick(2)">拒绝审核</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单号:</view>
					<view class="demo7">
						<text>{{order.order_no}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单状态:</view>
					<view class="demo7 ">
						<text class="ot-daile-mast">{{order.state}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">{{order.customer_name}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">{{order.area}},{{order.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">{{order.tax}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">数量:</view>
					<view class="demo7 ">{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">单价:</view>
					<view class="demo7  grace-no-scale">{{order.price}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">总金额:</view>
					<view class="demo7 ">{{order.total_price}}={{order.price}} *{{order.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货情况:</view>
					<view class="demo7">
						<text>{{order.num-order.remainder_num}}/{{order.num}}</text>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">付款方式:</view>
					<view class="demo7  grace-no-scale">{{order.trade_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">{{order.transport_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">收货地址:</view>
					<view class="demo7  grace-no-scale">{{order.transport_address}}</view>
				</view>

			</view>
		</view>
		<view class="ot-button">
			<button type="warn" @tap="handleClick(3)" class="grace-button">
				下一页
			</button>
		</view>
		<graceDialog :isTitle="false" :show="isEnd" closeBtnColor="#FFFFFF" v-on:closeDialog="handleClick(4)">
			<view slot="content" class="content">
				<view class="content1">拒绝理由</view>
				<view class="grace-cont">
					<textarea placeholder="请输入拒绝理由....." name="desc" @input="rrs"></textarea>
				</view>
			</view>
			<view slot="btns">
				<view class="grace-dialog-btns">
					<view><button type="primary" @tap="handleClick(4)">取消</button></view>
					<view><button type="primary" style="color:#3688FF;" @tap="handleClick(5)">确认</button></view>
				</view>
			</view>
		</graceDialog>
	</view>
</template>

<script>
	import graceDialog from '../../../../../../graceUI/components/graceDialog.vue';
	var _self
	export default {
		components: {
			graceDialog: graceDialog
		},
		data() {
			return {
				isEnd: false,
				order: [],
				rr: ''
			}
		},
		created() {
			_self = this
		},
		onLoad(option) {
			var id = option.id
			uni.request({
				url: this.$webUrl + "/sale/order/orderDetail",
				data: {
					id: id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.order = res.data
				}
			})
		},
		methods: {
			rrs(e) {
				_self.rr = e.detail.value
			},
			handleClick(o) {
				var that = this;
				switch (o) {
					case 0:
						uni.showModal({
							title: '提示',
							content: '是否取消订单',
							success: function(sm) {
								if (sm.confirm) {
									uni.request({
										url: _self.$webUrl + "/sale/order/cancelOrder",
										data: {
											id: _self.order.id
										},
										header: {
											'Access-Token': uni.getStorageSync("token")
										},
										success(res) {
											if (res.statusCode == 200) {
												var data = res.data
												if (data.update) {
													uni.showToast({
														title: '取消成功'
													})
												}
												_self.order = data.o
											}
										}
									})
								} else if (sm.cancel) {

								}
							}
						})
						break;
					case 1:
						uni.showModal({
							title: '提示',
							content: '是否确认订单',
							success: function(sm) {
								if (sm.confirm) {
									uni.request({
										url: _self.$webUrl + "/sale/order/confirmOrder",
										data: {
											id: _self.order.id
										},
										header: {
											'Access-Token': uni.getStorageSync("token")
										},
										success(res) {
											if (res.statusCode == 200) {
												if (res.data.update) {
													uni.showToast({
														title: '确认成功'
													})
												}
												_self.order = res.data.o
											}

										}
									})
								} else if (sm.cancel) {

								}
							}
						})
						break;
					case 2:
						this.isEnd = true;
						break;
					case 3:
						uni.navigateTo({
							url: '../salesInvoice/index?id=' + _self.order.id,
						});
						break;
					case 4:

						this.isEnd = false;
						break;
					case 5:
						uni.request({
							url: _self.$webUrl + "/sale/order/refuse",
							data: {
								id: _self.order.id,
								audit_reason: _self.rr
							},
							header: {
								'Access-Token': uni.getStorageSync("token")
							},
							success(res) {
								uni.showToast({
									title: res.data.msg,
									icon: 'none'
								})
								_self.order = res.data.o
							}
						})
						this.handleClick(4);
						break;
				}
			}
		}
	}
</script>

<style>
	@import "../../../../../../common/css/orderDetail.css";

	.grace-no-scale text {
		color: #FF4F4F;
	}

	.ot-daile-mast {
		display: block;
		background-color: #ff5722;
		box-sizing: border-box;
		width: 120upx;
	}

	.grace-space-between .demo7 {
		width: 560upx;
		text-align: right;
		display: flex;
		justify-content: flex-end;
	}

	.grace-dialog-btns button {
		background-color: transparent !important;
	}

	.content1 {
		font-size: 32upx;
		text-align: center;
		margin: 20upx 0px;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 30upx;
		border-bottom: 1px solid #F5F6F8;
	}

	.grace-dialog-btns {
		padding: 14upx 0;
	}

	.grace-cont {
		width: 100%;
	}

	.grace-cont textarea {
		width: 100%;
		height: 100upx;
		font-size: 28upx;
	}
</style>
