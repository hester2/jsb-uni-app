<template>
	<view class="conainer">
		<view class="grace-margin">
			<navigator class="number" url="../editData/index" hover-class="none">修改资料
				<text class="icons grace-icons icon-arrow-right icon-rg"></text>
			</navigator>
			<navigator class="number" url="../../../dataPasword/index" hover-class="none">修改密码
				<text class="icons grace-icons icon-arrow-right icon-rg"></text>
			</navigator>
			<div class="number" url="" hover-class="none" @tap="bindflile">退出
				<text class="icons grace-icons icon-arrow-right icon-rg"></text>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			bindflile: function() {
				var userId = this.$token
				var _self = this
				uni.showModal({
					title: '提示',
					content: '请确认是否退出',
					success: function(res) {
						if (res.confirm) {
							uni.getStorage({
								key: 'phoneno',
								success: function(res) {
									uni.removeStorage({
										key: 'phoneno',
										success: function() {
											console.log(' 移除成功')
											this.$token = null
											console.log(this.$token)
										}
									})
								}
							})
							uni.reLaunch({
								url: '../../../customer/myHome/index'
							})

						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},

		}
	}
</script>

<style>
	.number {
		width: 100%;
		height: 110upx;
		line-height: 110upx;
		vertical-align: middle;
		position: relative;
		color: #3b3b3b;
		font-size: 16px;
		border-bottom: 1px solid #ccc;
	}

	.grace-margin {
		margin-top: 0px;
	}

	.number::before {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 2upx;
		transform: scaleY(0.5);
	}
</style>
