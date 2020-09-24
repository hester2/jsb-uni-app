<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
			uni.getStorage({
				key: 'token',
				success(res) {
					console.log(res.data)
					var data = res.data
					if (data == null) {
						uni.navigateTo({
							url: 'pages/login/index'
						})
					}
				},
				fail() {
					uni.navigateTo({
						url: 'pages/login/index'
					})
				}
			})
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "common/font/iconfont.css";
	@import "graceUI/graceIcons.css";
	@import "graceUI/graceUI.css";

	view {
		line-height: 48rpx;
	}

	image {
		width: 40rpx;
		height: 40rpx;
	}

	.contain {
		overflow: hidden;
	}

	.grace-tab-title {
		height: 92rpx;
	}

	.grace-body {
		width: 100%;
		box-sizing: border-box;
	}

	/* 时间与导航栏样式重复 */

	.grace-border-radius {
		border-radius: 10rpx !important;
	}
	button{
		font-size: 30upx !important;
	}
</style>
