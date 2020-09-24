<template>
	<view class="grace-news-list">
		<view class="ot-console-fl" v-for="(item,index) in offerList" :key="index">
			<view class="ot-console-left">
				<view class="grace-space-between ot-console-ht">
					<view class="demo6 ot-right ">
						<view class="grace-space-between ot-console-ft">
							<view class="demo6 ">品名：</view>
							<view class="demo7 ">{{item.category}}</view>
						</view>
					</view>
					<view class="demo7 ">
						<view class="grace-space-between ot-console-fc">
							<view class="demo6 ">类别：</view>
							<view class="demo7 ">{{item.variety}}</view>
						</view>
					</view>
				</view>
				<view class="grace-space-between ot-console-ht">
					<view class="demo6 ot-right">
						<view class="grace-space-between ot-console-ft">
							<view class="demo6 ">产地：</view>
							<view class="demo7 ">{{item.area}}</view>
						</view>
					</view>
					<view class="demo7 ">
						<view class="grace-space-between ot-console-fc">
							<view class="demo6 ">型号：</view>
							<view class="demo7 ">{{item.CODE}}</view>
						</view>
					</view>
				</view>
				<view class="grace-space-between ot-console-ht">
					<view class="demo6 ot-right">
						<view class="grace-space-between ot-console-ft">
							<view class="demo6 ">含税：</view>
							<view class="demo7 ">{{item.tax_price}}</view>
						</view>
					</view>
					<view class="demo7 ">
						<view class="grace-space-between ot-console-fc">
							<view class="demo6 ">不含税：</view>
							<view class="demo7 ">{{item.normal_price}}</view>
						</view>
					</view>
				</view>
				<view class="grace-space-between ot-console-ht">
					<view class="demo6 ot-right">
						<view class="grace-space-between ot-console-ft">
							<view class="demo6 ">付款方式：</view>
							<view class="demo7 ">{{item.trade_type}}</view>
						</view>
					</view>
					<view class="demo7 ">
						<view class="grace-space-between ot-console-fc">
							<view class="demo6 ">物流方式：</view>
							<view class="demo7 ">{{item.transport_type}}</view>
						</view>
					</view>
				</view>
				<view class="grace-space-between ot-console-ht">
					<view class="demo6 ot-right">
						<view class="grace-space-between ot-console-ft">
							<view class="demo6 ">数量：</view>
							<view class="demo7 ">{{item.num}}</view>
						</view>
					</view>
					<view class="demo7 ">
						<view class="grace-space-between ot-console-fc gt">
							<view class="demo7 ">{{item.release_time.substring(0,10)}}</view>
						</view>

					</view>
				</view>
				<view class="grace-space-between ot-console-ht">
					<view class="demo6 ot-right">
						<view class="grace-space-between ot-console-ft">
							<view class="demo6 ">备注：</view>
							<view class="demo7 ">{{item.remark}}</view>
						</view>
					</view>
					<view class="demo7 ">
						<view class="grace-space-between ot-console-fc">
							<view class="demo7 ot-buttons">
								<button type="default" class="grace-button" @tap="handleClick(item.id)" size="mini">立即订购</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				offerList:[]
			
			}
		},
		mounted() {
			 var _self=this
			 uni.request({
			     url: this.$webUrl + '/getQuote',
			     success: (res) => {
			         //console.log(res.data)
					 _self.offerList=res.data
			     },
			     fail: (error) => {
			         uni.showToast({
			         	icon:'loading',
						title:"网络请求错误"
			         })
			     }
			 })
		},
		methods: {
			handleClick(e) {
				//console.log(e)
				var daId=e
				uni.navigateTo({
					url: '../addOrder/index?daId='+daId
				})
			}
		},
		}
</script>

<style>
	.grace-tab-title {
		position: relative;
		display: flex;
		box-shadow: 2upx 2upx 12upx #ccc;
	}

	page {
		background-color: #eee;
	}

	.imgs {
		position: absolute;
		right: 0px;
		display: block;
		top: 16upx;
		width: 50upx;
		height: 50upx;
	}

	.grace-tab-title view {
		margin: 0 50upx;
		font-size: 31upx;
	}

	.grace-tab-current {
		border-bottom: 4upx solid #ff6835 !important;
		color: #ff6835;
		font-weight: 700;
	}

	.ot-console-fl {
		background-color: #fff;
		box-sizing: border-box;
		padding: 20upx 20upx;
		border-radius: 10upx;
		margin-bottom: 25upx;
		display: flex;
		box-shadow: 1px 1px 10upx #ccc;
		flex-direction: row;
	}

	.grace-news-list {
		padding: 25upx;
		width: 100%;
		box-sizing: border-box;
	}

	.ot-console-left {
		flex: 10;
	}

	.ot-console-right {
		flex: 2;
		box-sizing: border-box;
		padding-top: 25upx;
	}

	.ot-console-right image {
		width: 28upx;
		height: 44upx;
	}

	.grace-space-between .demo7 {
		color: #858585;
	}

	.demo6 {
		color: #858585;
	}

	.grace-space-between {
		justify-content: flex-start;
	}

	.ot-console-ht {
		margin-bottom: 15upx;
		margin-top: 15upx;
		height: 52upx;
	}

	.ot-console-ft .demo6 {
		width: 141upx;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ot-console-ft .demo7 {
		width: 205upx;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ot-console-fc .demo6 {
		width: 141upx;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ot-console-fc .demo7 {
		width: 144upx;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.ot-button button {
		background-color: transparent;
		color: #4d4d4d;
		border: 1px solid #ccc;
	}

	.ot-buttons button {
		background-color: #ff5722;
		color: #fff;
		border: 1px solid #ccc;
	}

	button[size=mini] {
		display: inline-block;
		line-height: 48upx;
		font-size: 13px;
		padding: 0 10upx;
	}

	.gt .demo7 {
		width: 192upx;
	}
</style>
