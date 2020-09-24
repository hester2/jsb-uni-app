<template>
	<view class="grace-body">
		<view class="marginTop50">
			<!-- <image src="http://static.hcoder.net/graceui/logo201908.png" mode="widthFix" style="width:120px;"></image> -->
		</view>
		<form @submit="loginNow" class="grace-form marginTop30">
			<view class="grace-items">
				<view class="grace-label">
					<picker :value="pnpre" @change="changePre" :range="pnpres" name="pn_pre" style="text-align:center;">
						<text>+{{pnpre}}</text>
					</picker>
				</view>
				<input type="number" name="pn" class="input" v-model="phoneno" placeholder="请输入手机号" />
			</view>
			<view class="grace-items grace-noborder">
				<view class="grace-label grace-center">密码</view>
				<input type="password" class="input" name="yzm" placeholder="请输入密码" />
			</view>
			<button form-type='submit' type='primary' class="grace-button marginTop30 grace-border-radius">
				登录 <text class="grace-icons icon-arrow-right"></text>
			</button>
		</form>
		<view class="grace-text grace-black9 grace-margin-top" style="text-align:right;" @tap="reg">
			还没有账号？点击注册
		</view>
	</view>
</template>
<script>
	var graceChecker = require("../../graceUI/jsTools/graceChecker.js");
	let onclick = false
	export default {
		data() {
			return {
				pnpre: '86',
				pnpres: ['86', '01', '11', '26', '520'],
				countDownTimer: null,
				phoneno: '',
				list: [],
				pwd:''
			}
		},
		created() {
			var _self = this
		},
		methods: {
			loginWithWx: function() {
				uni.showToast({
					title: "请完善登录功能",
					icon: "none"
				})
			},
			changePre: function(e) {
				this.pnpre = this.pnpres[e.detail.value];
			},
			loginNow: function(e) {
				// 表单验证
				var rule = [{
						name: "pn",
						checkType: "phoneno",
						errorMsg: "请填写正确的手机号"
					},
				];
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				// 验证通过
				if (checkRes) {
					// start
					var _self = this
					if (!onclick) {
						onclick = true;
						uni.showLoading({
							title: '加载中',
						})
					}
					_self.pwd = formData.yzm
					uni.request({
						url: this.$webUrl + '/login', 
						data: {
							name: _self.phoneno,
							pwd:_self.pwd
						},
						success: (res) => {
							let list = JSON.stringify(res.data);
								let msg = res.data.msg;
								let code = res.data.code;
								let token = res.data.token
								if(code==2){
									uni.showToast({
										title:msg,
										icon:'success'
									})
									uni.setStorage({
										key: 'phoneno',
										data: _self.phoneno,
										success: function() {
										}
									});
								
								uni.setStorage({
									key:'token',
									data:token,
									success(res){
										
									}
								})
									uni.reLaunch({
										url:'../index/index'
									})
								}
								else{
									uni.showToast({
										title:msg,
										icon:'none'
									})
								}
						},
						fail: ()=> {
							uni.removeStorage({
							    key: 'phoneno',
							    success: function (res) {
							    }
							});
							uni.showToast({
								icon: 'none',
								title: '网络异常,请稍后重试'
							});
							
						}
						// end
					})

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
			reg: function() {
				uni.navigateTo({
					url: '../register/index',
				});
			}
		},
		beforeDestroy() {
			onclick = false
			uni.hideLoading()
		}
	}
</script>
<style>
	/* uni-app 中使用 px 可以实现不同设备下字体大小一致， 并非只能使用 upx */
	page{
		background-color: #fff !important;
	}
	.login-sendmsg-btn {
		border: 1px solid #FF5722 !important;
		background: none !important;
		color: #FF5722 !important;
		width: 100%;
		height: 32px;
		line-height: 32px;
		font-size: 12px !important;
	}

	.grace-login-three {
		display: flex;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.grace-login-three view {
		width: 50px;
		height: 50px;
		line-height: 50px;
		font-size: 38px;
		color: #3688FF;
		text-align: center;
		margin: 10upx;
	}

	.marginTop50 {
		margin-top: 50px;
	}

	.marginTop30 {
		margin-top: 30px;
	}

	.grace-line-title {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		align-items: center;
	}

	.grace-line-title>.line {
		width: 50upx;
		flex: auto;
		height: 1px;
		background: #F9F9F9;
	}

	.grace-line-title>.title {
		padding: 0 80upx;
		line-height: 80upx;
	}

	.grace-border-radius {
		background-color: #FF5722;
	}

	.grace-blue {
		color: #ff5722 !important;
	}
	button{
		background-color: #FF5722 !important;
	}
</style>
