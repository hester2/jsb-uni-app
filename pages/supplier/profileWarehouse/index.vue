<template>
	<view class="container">
		<view class="ot-home-qx mn">
			<text></text>
			<text>我的仓库</text>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-offer-qn">
			<view class="grace-margin" v-for="(item,index) in warehouse" :key="item.id">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>{{item.names}}</text>
								<text class="grace-icons">{{item.state}}</text>
							</view>
							<view class="info">
								<text>{{item.adress}}</text>
								<text>{{item.detaile}}</text>
							</view>
							<view class="content">
								<text>{{item.phone}}</text>
								<view class="ot-hn">
									<text :data-id="item.id" @tap="handleClick">编辑</text>
									<text :data-id="item.id" @tap="handleBled">启用</text>
									<text :data-id="item.id" @tap="handleDisable">禁用</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<navigator url="../addWarehouse/index">
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
				warehouse: [{
						'id': 0,
						'names': '金塑在线',
						'adress': '北京市通州区',
						'state': '已禁用',
						'detaile': '梨园南小街',
						'phone': '13545064261',
					},
					{
						'id': 1,
						'names': '金塑在线',
						'adress': '北京市通州区',
						'state': '已禁用',
						'detaile': '梨园南小街',
						'phone': '13545064261',
					},
					{
						'id': 2,
						'names': '金塑在线',
						'adress': '北京市通州区',
						'state': '已禁用',
						'detaile': '梨园南小街',
						'phone': '13545064261',
					},
					{
						'id': 3,
						'names': '金塑在线',
						'adress': '北京市通州区',
						'state': '已禁用',
						'detaile': '梨园南小街',
						'phone': '13545064261',
					},
					{
						'id': 4,
						'names': '金塑在线',
						'adress': '北京市通州区',
						'state': '已禁用',
						'detaile': '梨园南小街',
						'phone': '13545064261',
					}
				]
			}
		},
		methods: {
			handleClick: function(e) {
				var index = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../editWarehouse/index?daId=' + index
				})
			},
			handleBled(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				var warehouses = that.warehouse
				wx.showModal({
					title: '提示',
					content: '真的要启用吗',
					success: function(sm) {
						if (sm.confirm) {
							for (var i in warehouses) {
								if (warehouses[i].id == id) {
									warehouses[i].state = '已启用'
									// console.log(warehouses[i].state)
								}
							}
							that.warehouse= warehouses
							uni.showToast({ //成功以后再去调用这个，提示调用成功
								title: "已启用!",
								icon: "none"
							});
						} else if (sm.cancel) {}
					}
				})
			},
			handleDisable(e) {
				var that = this;
				var id = e.currentTarget.dataset.id;
				var warehouses = that.warehouse
				uni.showModal({
					title: '提示',
					content: '真的要禁用吗',
					success: function(sm) {
						if (sm.confirm) {
							for (var i in warehouses) {
								if (warehouses[i].id == id) {
									warehouses[i].state = '已禁用'
									console.log(warehouses[i].state)
								}
							}
							that.warehouse= warehouses
							uni.showToast({ //成功以后再去调用这个，提示调用成功
								title: "已禁用!",
								icon: "none"
							});
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
		height: 91px;
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
		font-size: 14px;
	}

	.grace-comments .header text.grace-icons {
		color: red;
		font-size: 14px;
	}

	.grace-comments .info text:nth-of-type(1) {
		color: #999;
		font-size: 14px;
		width: 172upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.grace-comments .info text:nth-of-type(2) {
		margin-right: 343upx;
		font-size: 14px;
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
		color: #999;
	}

	.grace-comments .content .ot-hn text:nth-of-type(1) {
		background-color: #009688;
		color: #fff;
		box-sizing: border-box;
		padding: 5upx 15upx;
		border-radius: 20upx;
		margin-right: 20upx;
		font-size: 24upx;
	}

	.grace-comments .content .ot-hn text:nth-of-type(2) {
		background-color: #1e9fff;
		color: #fff;
		padding: 5upx 15upx;
		border-radius: 20upx;
		margin-right: 20upx;
		font-size: 24upx;
	}

	.grace-comments .content .ot-hn text:nth-of-type(3) {
		background-color: #ff5722;
		color: #fff;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
	}

	.ot-xf {
		position: fixed;
		right: 10px;
		bottom: 20px;
		width: 72upx;
		height: 72upx;
		background-color: #ff5722;
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
		height: 30px;
		line-height: 30px;
	}

	.ml .input {
		width: 100%;
		background-color: transparent;
		background: transparent;
		height: 30px;
		padding-left: 10px;
	}

	.ml.grace-search-in {
		border-radius: 0upx;
		background-color: transparent;
		margin: 0px;
	}

	.grace-margin-top {
		margin-top: 0px;
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
		background-color: #ff5722 !important;
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
