<template>
	<view class="">
		<view class="grace-body" v-for="(item,index) in car" :key="index">
			<view class="grace-card-view">
				<view class="body" @tap="handleClick(item.id)">
					<view class="img">
						<image :src="photo" />
					</view>
					<view class="desc">
						<view class="title">{{item.owner_name}}
						</view>
						<view class="text">{{item.plate_no}}/{{item.cart_type}}</view>
						<view class="text">{{item.vin}}</view>
					</view>
					<view class="arrow-right">
						<image :src="img+'aright.png'"></image>
					</view>
				</view>
				<view class="footer">
					<view class="grace-icons iconfont icon-bianji" :data-id="item.id" @tap="handleEdit(item.id)">编辑</view>
					<view class="grace-icons iconfont icon-lajitong" :data-id='item.id' @tap="handleDel(item.id)">删除</view>
				</view>
			</view>
		</view>
		<view class="ot-xf">
			<navigator url="../addCar/index">
				<image :src="img+'tianjia.png'"></image>
			</navigator>
		</view>
		<!-- 判断车辆为空 -->
		<graceLoading :show='isEnd' :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
		<view v-if="car==null?true:false" class="grace-null">
			<telNull titleName="暂无车辆信息"></telNull>
		</view>
	</view>
</template>

<script>
	var _self
	import common from "../../../../common/common.js"
	import telNull from "../../../../components/telNull.vue";
	import graceLoading from "../../../../graceUI/components/graceLoading.vue";
	export default {
		components: {
			telNull,
			graceLoading,
		},
		data() {
			return {
				img: common.imageUrlPath,
				photo: 'http://assets.jinsubao.cn/dache.png',
				car: [],
				loadings:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
				isEnd:true
			}
		},
		onLoad(){
			_self=this
			uni.request({
				url:this.$webUrl+"/logistics/carList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				data:{phone:uni.getStorageSync("phoneno")},
				success(res) {
					_self.car =res.data
					console.log(res.data)
					setInterval(timer)
					var timer =setTimeout(function(){
						_self.isEnd=false
						_self.loadingText=['']
					},1000)
				}
			})
		},
		methods: {
			handleDel(e) {
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: function(sm) {
						if (sm.confirm) {
							uni.request({
								url:_self.$webUrl+"/logistics/deleteCar",
								data:{id:e,phone:uni.getStorageSync("phoneno")},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res) {
									if(res.data.delete){
										_self.car=res.data.list
										uni.showToast({
											title:'删除成功'
										})
									}
								}
							})
						} else if (sm.cancel) {}
					}
				})
			},
			handleEdit(e) {
				uni.navigateTo({
					url: '../editCar/index?id='+e,
				})
			},
			handleClick(e) {
				uni.navigateTo({
					url: '../carDtaile/index?id='+e,
				})
			},
		},
	}
</script>

<style>
	.icon-bianji:before {
		content: "\e621";
		font-size: 34upx;
	}

	.icon-lajitong:before {
		content: "\e615";
		font-size: 34upx;
	}

	.grace-null {
		height: 100%;
		width: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.grace-card-view {
		box-shadow: 0px 0px 10rpx #ccc;
	}

	.grace-card-view .body .img image {
		background-color: #E7E7E7;
		border-radius: 50%;
		height: 110rpx;
		width: 110rpx;
	}

	.grace-card-view .body .img {
		width: 110rpx;
		height: 110rpx;
	}

	.desc .text {
		color: #666;
	}

	.ot-xf {
		position: fixed;
		z-index: 99999;
		right: 35rpx;
		bottom: 88rpx;
		width: 72rpx;
		height: 72rpx;
		background-color: #FF5722;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ot-xf image {
		width: 45rpx;
		height: 45rpx;
		display: block;
	}

	.grace-card-view .body .desc {
		margin-right: 0px;
		margin-left: 40rpx;
		width: 90%;
	}

	.arrow-right {
		width: 10%;
		position: relative;
	}

	.arrow-right image {
		position: absolute;
		right: 0px;
		top: 50%;
		transform: translateY(-50%)
	}
</style>
