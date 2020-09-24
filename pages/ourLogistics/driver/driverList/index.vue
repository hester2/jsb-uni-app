<template>
	<view class="">
		<view class="grace-body" v-for="(item,index) in driver" :key="index">
			<view class="grace-card-view">
				<view class="body">
					<view class="img">
						<image :src="photo" />
					</view>
					<view class="desc">
						<view class="title">{{item.name}}
							<text>详细信息</text>
						</view>
						<view class="text">{{item.tel}}</view>
						<view class="text">{{item.card_no}}</view>
					</view>
				</view>
				<view class="footer">
					<view class="grace-icons iconfont icon-bianji" @tap="handleEdit(item.id)">编辑</view>
					<view class="grace-icons iconfont icon-lajitong" :data-id='index' @tap="handleDel(item.id)">删除</view>
				</view>
			</view>
		</view>
		<view class="ot-xf">
			<navigator url="../addDriver/index">
				<image :src="img+'tianjia.png'"></image>
			</navigator>
		</view>
		<!-- 判断司机为空 -->
		<graceLoading :show='isEnd' :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
		<view class="grace-null" v-if="driver==null?true:false">
			<telNull titleName="暂无司机信息"></telNull>
		</view>
	</view>
</template>

<script>
	var _self;
	import common from "../../../../common/common.js"
	import telNull from "../../../../components/telNull.vue";
	import graceLoading from "../../../../graceUI/components/graceLoading.vue";
	export default {
		components: {
			telNull,
			graceLoading
		},
		data() {
			return {
				img: common.imageUrlPath,
				photo:'http://assets.jinsubao.cn/nan1.png',
				driver: [],
				isEnd:true,
				loadings:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes:0,
				loadingText:['正在加载.....']
			}
		},
		onLoad(option){
			_self=this
			uni.request({
				url:this.$webUrl+"/logistics/driverList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				data:{phone:uni.getStorageSync("phoneno")},
				success(res){
					_self.driver=res.data
					var timer=setTimeout(function(){
						_self.isEnd=false
						_self.loadingText=['']
					},1000)
				}
			})
		},
		methods: {
			handleDel(e) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success(sm) {
						if (sm.confirm) {
						uni.request({
							url:_self.$webUrl+"/logistics/deleteDriver",
							data:{id:e,phone:uni.getStorageSync("phoneno")},
							header: {
								'Access-Token': uni.getStorageSync("token")
							},
							success(res) {
								if(res.data.delete){
									uni.showToast({
										title:'删除成功'
									})
									_self.driver=res.data.list
								}
							}
						})
						} else if (sm.cancel) {

						}
					}
				})
			},
			handleEdit(e) {
				uni.navigateTo({
					url: '../editDriver/index?id='+e,
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

	.grace-card-view {
		box-shadow: 0px 0px 10rpx #ccc;
	}

	.grace-card-view .body .img image {
		/* background-color: #E7E7E7; */
		border-radius: 50%;
		height: 110rpx;
		width: 110rpx;
	}
	
	.grace-null{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 100%;
		height: 100%;
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
</style>
