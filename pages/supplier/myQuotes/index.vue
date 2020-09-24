<template>
	<view class="container">
		<view class="ot-home-qx mn">
			<text></text>
			<text>我的报价</text>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-offer-qn">
			<view class="grace-margin" v-for="(item,index) in offerList" :key="index">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>{{item.names}}·{{item.leibie}}·{{item.address}}-{{item.pro}}</text>
								<text class="grace-icons">{{item.time}}</text>
							</view>
							<view class="info">
								<text>￥{{item.unit}}</text>
								<text>{{item.pay}}{{item.logistics}}</text>
							</view>
							<view class="content">
								<text>{{item.num}}吨</text>
								<view class="ot-hn">
									<text :data-id="item.id" @tap="handleClick">编辑</text>
									<text :data-id="item.id" @tap="remove">删除</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<navigator url="../addQuotation/index">
			<view class="ot-xf">
				<image :src="img+'add1.png'"></image>
			</view>
		</navigator>
	</view>
</template>

<script>
	import common from '../../../common/common.js'
	export default {
		data() {
			return {
				img:common.imageUrlPath,
				index: 1,
				offerList: [{
					'id': 0,
					'names': '聚乙烯',
					'leibie': 'LDPE',
					'address': '福联',
					'pro': '1C7A',
					'num': '10',
					'unit': '7500',
					'pay': '货到付款',
					'logistics': '自提',
					'time': '2019-09-28'
				}, {
					'id': 1,
					'names': '聚乙烯',
					'leibie': 'LDPE',
					'address': '福联',
					'pro': '1C7A',
					'num': '10',
					'unit': '7500',
					'pay': '货到付款',
					'logistics': '自提',
					'time': '2019-09-28'
				}, {
					'id': 2,
					'names': '聚乙烯',
					'leibie': 'LDPE',
					'address': '福联',
					'pro': '1C7A',
					'num': '10',
					'unit': '7500',
					'pay': '货到付款',
					'logistics': '自提',
					'time': '2019-09-28'
				}, {
					'id': 3,
					'names': '聚乙烯',
					'leibie': 'LDPE',
					'address': '福联',
					'pro': '1C7A',
					'num': '10',
					'unit': '7500',
					'pay': '货到付款',
					'logistics': '自提',
					'time': '2019-09-28'
				}]
			}
		},
		methods: {
			handleClick: function() {
				uni.navigateTo({
					url: '../editQuotation/index',
				})
			},
			remove: function(e) {
				console.log( e.currentTarget.dataset.id)
				var index = e.currentTarget.dataset.id;
				console.log('fff')
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					success: function(sm) {
						if (sm.confirm) {

						} else if (sm.cancel) {}
					}
				})
			},
		}
	}
</script>

<style>
	.ot-bg {
		height: 10px;
		background-color: #eee;
	}

	.orderImg {
		margin-top: 15px;
	}

	.ot-offer-qn {
		width: 100%;
		height: 100%;
		margin-top: 10px;
	}

	.ot-offer-qn .grace-margin:nth-of-type(1) {
		border-top: 0px solid #ccc;
	}

	.ot-offer-qn .grace-margin {
		margin: 0px;
		width: 100%;
		height: 193upx;
		padding: 0px 15px;
		box-sizing: border-box;
		border-top: 1px solid #ccc;
	}

	.ot-offer-qn .grace-margin:last-of-type {
		border-bottom: 1px solid #ccc;
	}

	.ot-offer-qn .grace-comments {
		padding: 0px;
	}

	.ot-offer-qn .grace-comments .items {
		margin: 0px 0px;
	}

	.grace-comments .header text {
		color: #ff5722;
		font-size: 16px;
	}

	.grace-comments .header text.grace-icons {
		color: #ccc;
		font-size: 14px;
	}

	.grace-comments .info text:nth-of-type(1) {
		color: red;
		font-size: 28upx;
	}

	.grace-comments .info text:nth-of-type(2) {
		margin-right: 96upx;
		font-size: 28upx;
		width: 360upx;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;

	}

	.grace-comments .info {
		margin-top: 10upx;
	}

	.grace-comments .content {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		line-height: 1.5em;
		justify-content: space-between;
		margin-top: 10upx;
	}

	.grace-comments .content text {
		font-size: 14px;
	}

	.grace-comments .content text:nth-of-type(1) {
		color:#999;
	}

	.grace-comments .content .ot-hn text:nth-of-type(1) {
		background-color: #ff5722;
		color: #fff;
		box-sizing: border-box;
		padding: 5upx 15upx;
		border-radius: 20upx;
		margin-right: 20upx;
		font-size: 24upx;
	}

	.grace-comments .content .ot-hn text:nth-of-type(2) {
		background-color: #FF5722;
		color: #fff;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
	}

	.ot-xf {
		position: fixed;
		right: 20upx;
		bottom: 20upx;
		width: 72upx;
		height: 72upx;
		background-color: #FF5722;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ot-xf image {
		width: 36upx;
		height: 36upx;
		display: block;
	}

	.ml input {
		width: 70%;
		outline: none;
		border: 1px solid #ccc;
		height: 60upx;
		line-height: 60upx;

	}

	.ml .input {
		width: 100%;
		background-color: transparent;
		background: transparent;
		height: 60upx;
		padding-left: 20upx;
	}

	.ml.grace-search-in {
		border-radius: 0upx;
		background-color: transparent;
		margin: 0px;
	}

	.grace-margin-top {
		margin-top: 0px
	}

	.grace-form .grace-items .input {
		text-align: left;
		width: 70%;
		border: 1px solid #ccc;
		margin-left: 23upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.grace-checked {
		background-color: #FF5722 !important;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 20upx;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 20upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 7upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}
</style>
