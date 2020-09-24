<template>
	<view class="">
		<view class="ot-container-neo">
			<view class="grace-list" v-for="(item,index) in linkmans" :key="index">
				<view class="items">
					<view class="icons">
						<image :src="img+item.sex+'.png'"></image>
					</view>
					<view class="ot-contact-lm">
						<view class="body">
							<view class="title">{{item.name}}</view>
							<view class="desc"><text>{{item.phone_one}}</text> <text>{{item.phone_two}}</text></view>
						</view>
						<view class="arrow-rights" v-if="item.position==''||item.position==null?false:true">{{item.position}}</view>
					</view>
				</view>
			</view>
			<navigator url="../customerUpload/index">
				<view class="ot-xf">
					<image :src="img+'icon-xs_next.png'"></image>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import common from '../../../../common/common.js'
	var _self;
	export default{
			data(){
				return{
					img:common.imageUrlPath,
					linkmans:[],
					id:0
				}
			},
			onLoad(option){
				_self = this
				var id = option.id 
				_self.id = id
				uni.request({
					url:this.$webUrl+"/sale/getLinkmans",
					data:{id:id},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res){
						_self.linkmans = res.data
						_self.linkmans=res.data.map(item=>{
							if(item.sex=='男'){
								item.sex ='nan1'
							}
							else if(item.sex=='女'){
								item.sex ='nv2'
							}
						})
					}
				})
			},
			methods:{
				  handleClick(e){
				    wx.navigateTo({
				      url: '../customerUpload/index?id='+_self.id
				    })
				  },
			}
		}
</script>

<style>
	.ot-container-neo {
		box-sizing: border-box;
		padding: 0px 30rpx;
	}

	.arrow-rights {
		background-color: #BAB8B6;
		color: #fff;
		border-radius: 40rpx;
		padding: 0rpx 20rpx;
		line-height: 40rpx;
		height: 40rpx;
		box-sizing: border-box;
	}

	.grace-list .items {
		margin: 0px;
		box-sizing: border-box;
		padding: 20upx 0px;
	}

	.grace-list .items .body {
		width: auto;
		margin-left: 10upx;
	}

	.ot-contact-lm {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.ot-contact-lm .body .desc {
		margin-top: 7rpx;
	}

	.ot-contact-lm .body .desc text {
		color: #999;
		font-size: 28rpx;
	}

	.ot-contact-lm .body .desc text:nth-of-type(2) {
		font-size: 26rpx;
		color: #A5A7B2;
		margin-left: 15rpx;
	}

	.ot-xf {
		position: fixed;
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
