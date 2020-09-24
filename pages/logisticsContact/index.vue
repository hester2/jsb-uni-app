<template>
	<view class="conainer">
		<view class="ot-contact-qd">
			<text>服务热线</text>
			<text>物流合作/ 其它服务咨询等问题处理 </text>
			<text>{{phone}}</text>
			<button type="primary" @tap="handleChange">立即拨打</button>
		</view>
		<view class="ot-contact-qd">
			<text>客服QQ</text>
			<text>补充资料/变更账户信息等问题处理 </text>
			<text>263969605</text>
			<button type="primary" @tap="handleClick">复制</button>
		</view>
	</view>
</template>

<script>
	import icanH5Api from '../../common/js_sdk/ican-H5Api/ican-H5Api.js'
	var _self
	export default {
		data() {
			return {
				phone: '0592-5801773',
			}
		},
		created() {
			_self=this
		},
		methods: {
			handleClick() {
				uni.setClipboardData({
					data: '263969605',
					success: function(data) {
						uni.getClipboardData({
							success: function(res) {
								console.log(res.data)
								uni.showToast({
									icon: 'success',
									title: '复制成功'
								})
							},
							fail: function(err) {},
							complete: function(res) {}
						})
					},
					fail: function(err) {},
					complete: function(res) {}
				})
			},
			handleChange() {
				uni.makePhoneCall({
				    phoneNumber: _self.phone 
				});
			}

		}
	}
</script>

<style>
	page {
		background-color: #eee;
	}

	.conainer {
		box-sizing: border-box;
		padding: 0upx 40upx;
	}

	.ot-contact-qd {
		background-color: #fff;
		border-radius: 15upx;
		box-sizing: border-box;
		padding: 50upx 20upx;
		margin-top: 40upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.ot-contact-qd text:nth-of-type(1) {
		color: #ff5722;
		font-size: 32upx;
	}

	.ot-contact-qd text:nth-of-type(2) {
		font-size: 26upx;
		margin-top: 20upx;
	}

	.ot-contact-qd text:nth-of-type(3) {
		font-size: 26upx;
		margin-top: 20upx;
	}

	.ot-contact-qd button {
		background-image: linear-gradient(to left, #FF9571, #ff5722);
		line-height: 70upx;
		height: 70upx;
		width: 90%;
		border-radius: 40upx;
		margin-top: 30upx;
	}
</style>
