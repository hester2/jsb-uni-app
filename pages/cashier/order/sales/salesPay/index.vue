<template>
	<view class="">
		<view class="grace-space">
			<button type="primary" class="grace-button btn" size="mini" @tap="handleTo">确认到账</button>
		</view>
		<view class="ot-Dtailes-host">
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
						<button type="primary" class="grace-button ot-btns" @tap="previewImg1">预览</button>
						<button type="primary" class="grace-button ot-btns" @tap="handleChange">确认</button>
					</view>
				</view>
			</view>
		</view>
		<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1" v-on:closeDate="closeDate1"></graceDate>
		<graceDialog title="信息" :show="show2" v-on:closeDialog="closeDialog2">
			<view slot="content" class="content">
				<form @submit="formSubmit" class="grace-form grace-margin-top">
					<view class="grace-items">
						<view class="grace-label">到账时间:</view>
						<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" />
					</view>
				</form>
			</view>
			<view slot="btns">
				<view class="grace-dialog-btns">
					<view>
						<button type="primary" @tap="closeDialog2">关闭</button>
					</view>
					<view>
						<button type="primary" style="color:#3688FF;" @tap="confirm2" formType="submit">确认</button>
					</view>
				</view>
			</view>
		</graceDialog>
	</view>
</template>

<script>
	import graceDate from '../../../../../graceUI/components/graceDate.vue'
	import graceDialog from '../../../../../graceUI/components/graceDialog.vue';
	export default {
		data() {
			return {
				date1: '',
				show1: false,
				idCard1: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2997502425,1125939591&fm=26&gp=0.jpg',
				show2: false,
			}
		},
		methods: {
			handleTo(e) {
				var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认到账？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认!",
								icon: "none"
							});
							// 用户点击了确定 可以调用删除方法了

							// list.splice(current, 1)

							// this.setData({
							//   list: list
							// })

						} else if (sm.cancel) {}
					}
				})
			},
			closeDate1: function() {
				this.show1 = false;
			},
			showDate1: function() {
				this.show1 = true;
			},
			changeDate1: function(e) {
				this.date1 = e;
				this.show1 = false;
			},
			previewImg1: function() {
				var _self = this
				uni.previewImage({
					urls: [_self.idCard1],
					current: 0
				});
			},
			handleChange: function() {
				this.show2 = true
			},
			closeDialog2: function() {
				this.show2 = false;
			},
			confirm2: function() {
				this.closeDialog2();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
			},
		},
		components: {
			graceDate,
			graceDialog : graceDialog
		},
	}
</script>

<style>
	@import "../../../../../common/css/orderPay.css";
</style>
