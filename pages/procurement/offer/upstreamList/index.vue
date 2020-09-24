<template>
	<view class="container">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop="nomove"></view>
			<view class="grace-filter" id="grace-filter-header">
				<view class="items" @tap='showOptions1'>{{orderList[orderIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>

				<view class="ot-home-ql"></view>
				<view class="items" @tap='changePriceOrder'>
					价格
					<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/asc.png" v-if="priceOrder == 1"></image>
					<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/desc.png" v-if="priceOrder == 2"></image>
				</view>
				<!-- 第一个选项 -->
				<view class='grace-filter-options' v-if="showingIndex == 1">
					<view v-for="(item,index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
					 @tap='changeOrder' :data-itemid="index">
						{{item}}
						<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
					</view>
				</view>
				<!-- 第二个选项 -->
				<view class='grace-filter-options' v-if="showingIndex == 2" style="max-height:150px;">
					<view :class="[index ==  cateIndex ? 'option current' : 'option']" v-for="(item, index) in cateList" :key="index"
					 @tap='changeCate' :data-itemid="index">
						{{item}}
						<text class="grace-icons icon-right" v-if="index ==  cateIndex"></text>
					</view>
				</view>
			</view>
			<!-- grace filter end -->
			<view style="margin-top:57px;"></view>
			<!-- 上面是一个展位的视图 其他内容这里开始 -->
		</view>
		<!-- <view class="ot-bg"></view> -->
		<view class="ot-offer-qn">
			<view class="grace-margin">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>福联·聚乙烯·LLDPE·7042</text>
								<text class="grace-icons">2019-08-16</text>
							</view>
							<view class="info">
								<text>￥7550</text>
								<text>款到发货 企业</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-gs">金发科技股份有限公司</view>
								<view class="ot-hn">
									<text @tap="handleOrder">立即购买</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="grace-margin">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>福联·聚乙烯·LLDPE·7042</text>
								<text class="grace-icons">2019-08-16</text>
							</view>
							<view class="info">
								<text>￥7550</text>
								<text>款到发货 个人</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-gs">金发科技股份有限公司</view>
								<view class="ot-hn">
									<text @tap="handleOrder">立即购买</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="grace-margin">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>福联·聚乙烯·LLDPE·7042</text>
								<text class="grace-icons">2019-08-16</text>
							</view>
							<view class="info">
								<text>￥7550</text>
								<text>款到发货 企业</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-gs">金发科技股份有限公司</view>
								<view class="ot-hn">
									<text @tap="handleOrder">立即购买</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="grace-margin">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>福联·聚乙烯·LLDPE·7042</text>
								<text class="grace-icons">2019-08-16</text>
							</view>
							<view class="info">
								<text>￥7550</text>
								<text>款到发货 企业</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-gs">金发科技股份有限公司</view>
								<view class="ot-hn">
									<text @tap="handleOrder">立即购买</text>
								</view>
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
				//被展示的菜单
				showingIndex: 0,
				//第一个选项相关
				orderIndex: 0,
				orderList: ['型号', '福联,1802', '福联,1100N', '茂名,2426K', '台塑,9001'],
				//第二个选项相关
				cateIndex: 0,
				cateList: ['供应商', '福建省福化工贸股份有限公司', '厦门东康塑胶制品有限公司', '金发科技股份有限公司', '厦门市耀永成贸易有限公司'],
				//价格排序
				priceOrder: 1,
				index: 1,
			}
		},
		onReady: function() {
			_self = this;
			uni.getSystemInfo({
				success: function(res) {
					var windowHeight = res.windowHeight;
					//获取头部标题高度
					uni.createSelectorQuery().select('#grace-filter-header').fields({
						size: true,
					}, function(res) {
						if (!res) {
							return;
						}
						var sHeight = (windowHeight - res.height);
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		created() {
			_self = this;
		},
		methods: {
			handleOrder() {
				uni.navigateTo({
					url: '../upstreamBuy/index',
				})
			},
			handleChange: function(e) {
				if (this.menu1Show) {
					this.menu1Show = false;
					return;
				}
				// 动态调整菜单的 top 值
				// 原理 : 获取按钮的高度 = 菜单的 top 值
				let view = uni.createSelectorQuery().select("#demo-1");
				view.fields({
					size: true
				}, data => {
					this.menu1Show = true;
					this.menu1Top = data.height;
					console.log(data);
				}).exec();
			},
			// 关闭菜单方法
			hideMenu: function() {
				this.menu1Show = false;
			},
			changeOrder: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.orderIndex = tapIndex;
				this.showingIndex = 0;
			},
			showOptions1: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 1;
			},
			showOptions2: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 2;
			},
			changeCate: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.cateIndex = tapIndex;
				this.showingIndex = 0;
			},
			//价格排序
			changePriceOrder: function() {
				if (this.priceOrder == 1) {
					this.priceOrder = 2;
				} else {
					this.priceOrder = 1;
				}
				uni.showModal({
					title: '价格排序已经切换',
					content: '对应的值保存在 priceOrder 变量中 ^_^'
				});
			},
		}
	}
</script>

<style>
	.grace-filter {
		top: 44px;
		box-shadow: 1px 1px 8upx #ccc;
	}

	.ot-bg {
		height: 10px;
		background-color: #e0e0e0;
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
		color: #999;
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

	.ot-gs {
		color: #999;
		width: 280upx;
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
		color: #009688;
	}

	.grace-comments .content .ot-hn text:nth-of-type(1) {
		background-color: #009688;
		color: #fff;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
	}

	.ot-xf {
		position: fixed;
		right: 10px;
		bottom: 20px;
		width: 60px;
		height: 60px;
		background-color: #ff5722;
		border-radius: 50%;
	}

	.ot-xf image {
		width: 30px;
		height: 30px;
		display: block;
		margin: auto;
		margin-top: 15px;
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
		margin-left: 0upx;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.grace-checked {
		background-color: #ff5722 !important;
	}

	.grace-filter .items {
		width: 33.33%;
		overflow: hidden;
	}

	.ot-offer-cn {
		display: flex;
		box-sizing: border-box;
		padding: 0PX 30upx;
		margin-top: 30upx;
		margin-bottom: 10upx;
	}

	.ot-offer-cn .grace-button {
		margin: 0px;
		margin-right: 20upx;
	}

	.ot-offer-cn .grace-button:nth-of-type(1) {
		background-color: #009688;
	}

	.ot-offer-cn .grace-button:nth-of-type(2) {
		background-color: #1e9fff;
	}

	.ot-offer-cn .grace-button:nth-of-type(3) {
		background-color: #ff5722;
	}

	button[type=primary] {
		padding: 0px 10upx;
	}

	.content .grace-margin-top {
		padding: 0px 60upx;
		box-sizing: border-box;
	}
</style>
