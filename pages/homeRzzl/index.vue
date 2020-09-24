<template>
	<view class="container">
		<view class="ot-rzzl-fl">
			<view class="ot-rzzl-ft" style="background-image: url('http://assets.jinsubao.cn/rzzl1.png');background-size: 100% 100%;">
				<view class="ot-rzzl-fa">
					<text>融资租赁</text>
					<text>快速解决资金需求，先货后款金融方式</text>
					<text>立即申请</text>
				</view>
			</view>
			<view class="ot-rzzl-ft fp" style="background-image: url('http://assets.jinsubao.cn/rzzl2.png');background-size: 100% 100%;">
			</view>
			<view class="ot-rzzl-ft fp" style="background-image: url('http://assets.jinsubao.cn/rzzl3.png');background-size: 100% 100%;">
			</view>
			<view class="ot-rzzl-ft fp fl">
				<view class="ot-rzzl-ga" style="background-image: url('http://assets.jinsubao.cn/rzzl4.png');background-size: 100% 100%;"></view>
				<view class="ot-rzzl-fs">您申请，我帮您实现，成就企业的价值和财富梦</view>
				<view class="ot-rzzl-ho">
					<form @submit="formSubmit" class="grace-form grace-margin-top">
						<view class="grace-items">
							<view class="grace-label">企业名称：</view>
							<input type="text" class="input" name="name" placeholder="请填写您的企业名称"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">联系人：</view>
							<input type="text" class="input" name="nickname" placeholder="请填写联系人"></input>
						</view>
						<view class="grace-items">
							<view class="grace-label">联系电话：</view>
							<input type="text" class="input" name="phoneno" placeholder="请填写您的联系方式"></input>
						</view>
						<button formType="submit" type="primary" style="width:57%;">提交</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				img: common.imageUrlPath
			}
		},
		methods: {
			formSubmit: function(e) {
				wx.showToast({
					title: '请观察控制台',
					icon: 'none'
				});
				console.log(JSON.stringify(e.detail.value));
			}
		}
	}
</script>

<style>
	.ot-rzzl-fl {
		width: 100%;
		height: 100%;
		padding: 10upx 20upx;
		box-sizing: border-box;
	}

	.ot-rzzl-ft {
		margin-top: 20upx;
		width: 100%;
		height: 280upx;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		margin-bottom: 32upx;
	}

	.ot-rzzl-fa {
		display: flex;
		flex-direction: column;
		margin-left: 80upx;
	}

	.ot-rzzl-fa text {
		display: block;
		color: #fff;
	}

	.ot-rzzl-fa text:nth-of-type(1) {
		font-size: 36upx;
	}

	.ot-rzzl-fa text:nth-of-type(2) {
		font-size: 22upx;
		margin-top: 20upx;
	}

	.ot-rzzl-fa text:nth-of-type(3) {
		font-size: 24upx;
		background-color: #fff;
		width: 160upx;
		height: 50upx;
		line-height: 50upx;
		color:#2871ff;
		border-radius: 40upx;
		text-align: center;
		margin-top: 20upx;
	}

	.fp {
		box-shadow: 2upx 2upx 8upx #aeaeae;
	}

	.fl {
		padding: 0px 60upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		height: 522upx;
	}

	.ot-rzzl-ga {
		width: 100%;
		margin: 10upx 10upx;
		box-sizing: border-box;
		height: 34upx;
		margin-top: 36upx;
	}

	.ot-rzzl-fs {
		font-size: 18upx;
		color: #999;
	}

	.ot-rzzl-ho {
		width: 100%;
		margin-top: 12upx;
	}

	.grace-margin-top {
		margin: 0px;
	}

	.grace-form .grace-items {
		padding: 0px;
	}

	.grace-form .grace-items .input {
		text-align: left;
		border: 2upx solid #ccc;
		margin-left: 0px;
		padding: 2upx 6upx;
	}

	.grace-form .grace-items .grace-label {
		width: 141upx;
		font-weight: bold;
	}

	button {
		background-color: #53955e !important;
		margin-top: 20upx;
		line-height: 70upx;
		height: 70upx;
	}
</style>
