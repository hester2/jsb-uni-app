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
				<view class="item">
					<view class="demo1" id="demo-1">
						<image :src="img+'adds.png'" @tap.stop="handleChange"></image>
						<gracePopupMenu :show="menu1Show" :bgColor="bgColor" :top="menu1Top" v-on:hideMenu="hideMenu">
							<view>
								<view class="menus" @tap.stop="handleSend">立即发布</view>
								<view class="menus" @tap.stop="handleAdd">添加报价</view>
								<view class="menus grace-noborder" @tap.stop="handleUpdata">更新税点</view>
							</view>
						</gracePopupMenu>
					</view>
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
			<view style="margin-top:51px;"></view>
			<!-- 上面是一个展位的视图 其他内容这里开始 -->
		</view>
		<view class="ot-bg"></view>
		<view class="ot-offer-fl">今日税点：
			<text>{{number}}</text>
			<image @tap="handleTilte" :src="img+'tishi1.png'"></image>
		</view>
		<view class="ot-offer-qn">
			<view class="grace-margin">
				<view class="grace-comments">
					<view class="items">
						<view class="body">
							<view class="header">
								<text>福联·LLDPE·7042</text>
								<text class="grace-icons" :style="{color:color}">2019-09-21</text>
							</view>
							<view class="info">
								<text>￥7550--￥7040</text>
								<text>泉港炼油厂款到发货</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-hn">
									<text @tap="handleClick">编辑</text>
									<text @tap="remove">删除</text>
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
								<text>福联·LLDPE·7042</text>
								<text class="grace-icons" :style="{color:color}">2019-09-21</text>
							</view>
							<view class="info">
								<text>￥7550--￥7040</text>
								<text>泉港炼油厂款到发货</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-hn">
									<text @tap="handleClick">编辑</text>
									<text @tap="remove">删除</text>
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
								<text>福联·LLDPE·7042</text>
								<text class="grace-icons" :style="{color:color}">2019-09-21</text>
							</view>
							<view class="info">
								<text>￥7550--￥7040</text>
								<text>泉港炼油厂款到发货</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-hn">
									<text @tap="handleClick">编辑</text>
									<text @tap="remove">删除</text>
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
								<text>福联·LLDPE·7042</text>
								<text class="grace-icons" :style="{color:color}">2019-09-21</text>
							</view>
							<view class="info">
								<text>￥7550--￥7040</text>
								<text>泉港炼油厂款到发货</text>
							</view>
							<view class="content">
								<text>35吨</text>
								<view class="ot-hn">
									<text @tap="handleClick">编辑</text>
									<text @tap="remove">删除</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<graceDialog title="温馨提示" :show="titles" :isBtns="false" v-on:closeDialog="closeDialog1">
			<view slot="content" class="content1">付款日期为空时默认为
				<text class="color1">当天</text>！蓝色表示新增，绿色表示
				<text class="color2">上涨</text>，
				<text class="color3">红色</text>表示下跌
			</view>
		</graceDialog>

		<form @submit="formOut" class="grace-form grace-margin-top">
			<graceDialog title="带有按钮的对话框" :show="pop" v-on:closeDialog="closeDialog2">
				<view slot="content" class="content">
					<view class="grace-items">
						<view class="grace-label">销售税点</view>
						<input type="number" v-model="conten" class="input" name="num" placeholder="请输入税点" />
					</view>
				</view>
				<view slot="btns">
					<view class="grace-dialog-btns">
						<view>
							<button type="primary" @tap="closeDialog">关闭</button>
						</view>
						<view>
							<button formType="submit" type="primary" style="color:#3688FF;" @tap="confirm">立即提交</button>
						</view>
					</view>
				</view>
			</graceDialog>
		</form>
	</view>
</template>

<script>
	import gracePopupMenu from '../../../../graceUI/components/gracePopupMenu.vue';
	import graceDialog from '../../../../graceUI/components/graceDialog.vue';
	import common from '../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				bgColor: '#fff',
				date1: '',
				show1: false,
				menu1Show: false,
				menu1Top: 44,
				//被展示的菜单
				showingIndex: 0,
				//第一个选项相关
				orderIndex: 0,
				orderList: ['是否含税价', '含税', '不含税'],
				//第二个选项相关
				cateIndex: 0,
				cateList: ['品名', '聚乙烯', '聚丙烯', '聚苯乙烯', 'ABS'],
				pop: false,
				titles: false,
				number: 0.923,
				input: 0,
				color: '#ccc',
				conten: ''
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
			this.handleSelect()
		},
		methods: {
			handleSelect() {
				if (this.orderIndex == 1) {
					console.log('含税')
				} else if (this.orderIndex == 2) {
					console.log('不含税')
				} else if (this.orderIndex == 0) {
					console.log('是否含税')
				}
			},
			handleUpdata: function() {
				this.hideMenu()
				this.pop = true
			},
			handleTilte: function() {
				this.titles = true
			},
			closeDialog1: function() {
				this.titles = false
			},
			closeDialog: function() {
				this.pop = false
			},
			confirm: function() {
				this.closeDialog();
				uni.showToast({
					title: "您点击了确认按钮",
					icon: "none"
				});
				console.log(this.conten)
				var input = this.conten
				this.number = input
			},
			handleAdd() {
				this.hideMenu()
				uni.navigateTo({
					url: '../addOfferList/index',
				})
			},
			handleClick: function() {
				uni.navigateTo({
					url: '../editOfferList/index',
				})
			},
			handleSend() {
				this.hideMenu()
				var that = this;
				uni.showModal({
					title: '提示',
					content: '真的发布吗？',
					success: function(sm) {
						if (sm.confirm) {
							// 用户点击了确定 可以调用删除方法了

							// list.splice(current, 1)

							// this.setData({
							//   list: list
							// })

						} else if (sm.cancel) {}
					}
				})
			},
			remove: function(e) {
				console.log(e)
				// var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '真的删除么',
					success: function(sm) {
						if (sm.confirm) {
							// 用户点击了确定 可以调用删除方法了

							// list.splice(current, 1)

							// this.setData({
							//   list: list
							// })

						} else if (sm.cancel) {}
					}
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
		},
		components: {
			gracePopupMenu,
			graceDialog: graceDialog
		}
	}
</script>

<style>
	.grace-filter {
		top: 44px;
	}

	.ot-bg {
		height: 20upx;
		background-color: #e0e0e0;
	}

	.orderImg {
		margin-top: 30upx;
	}

	.ot-offer-qn {
		width: 100%;
		height: 100%;
	}

	.ot-offer-qn .grace-margin:nth-of-type(1) {
		border-top: 0px solid #ccc;
	}

	.ot-offer-qn .grace-margin {
		margin: 0px;
		width: 100%;
		padding: 0px 30upx;
		box-sizing: border-box;
		border-top: 2upx solid #ccc;
	}

	.ot-offer-qn .grace-margin:last-of-type {
		border-bottom: 2upx solid #ccc;
	}

	.ot-offer-qn .grace-comments {
		padding: 0px;
	}

	.ot-offer-qn .grace-comments .items {
		margin: 0px 0px;
	}

	.grace-comments .header text {
		color: #ff5722;
		font-size: 32upx;
	}

	.grace-comments .header text.grace-icons {
		color: #999;
		font-size: 28upx;
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
		padding: 0px;
	}

	.grace-comments .content text {
		font-size: 28upx;
	}

	.grace-comments .content text:nth-of-type(1) {
		color: #009688;
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
		background-color: #ff5722;
		color: #fff;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
	}

	.ot-xf {
		position: fixed;
		right: 20upx;
		bottom: 40upx;
		width: 120upx;
		height: 120upx;
		background-color: #ff5722;
		border-radius: 50%;
	}

	.ot-xf image {
		width: 60upx;
		height: 60upx;
		display: block;
		margin: auto;
		margin-top: 30upx;
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
		width: 40.33%;
	}

	.grace-filter .item {
		width: 19.7%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.ot-offer-cn {
		position: relative;
		display: flex;
		box-sizing: border-box;
		padding: 0upx 30upx;
		margin-top: 15upx;
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

	.content1 {
		box-sizing: border-box;
		padding: 30upx 50upx;
		color: #292929;
		padding-top: 0px;
	}

	.color1 {
		color: #ff5722;
	}

	.color2 {
		color: #5fb878;
	}

	.color3 {
		color: #dc143c;
	}

	.ot-offer-fl {
		color: #999;
		box-sizing: border-box;
		padding: 10upx 30upx;
		padding-top: 10upx;
		position: relative;
	}

	.ot-offer-fl text {
		color: #ff5722;
		font-size: 33upx;
	}

	.ot-offer-fl image {
		position: absolute;
		right: 25upx;
		top: 15upx;
		width: 35upx;
		height: 35upx;
	}

	.grace-form .content {
		box-sizing: border-box;
		padding: 0px 30upx;
	}

	.demo1 {
		position: relative;
	}

	.demo1 image {
		width: 50upx;
		height: 50upx;
	}

	.menus {
		line-height: 65upx;
		font-size: 30upx;
		color: #2B2B2B;
		margin-left: 30upx;
		text-align: left;
	}
</style>
