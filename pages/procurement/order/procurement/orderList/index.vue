<template>
	<view class="conainer">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop="nomove"></view>
			<view class="grace-filter ot-date " id="grace-filter-header">
				<view class="items" @tap='showOptions1'>{{orderList[orderIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
				</view>
				<view class="items icons" @tap='showOptions3'>
					<image :src="img+'adds.png'" @tap.stop="showMenu1"></image>
				</view>
				<view class="demo1" id="demo-1">
					<gracePopupMenu :show="menu1Show" :bgColor="bgColor" :top="menu1Top" v-on:hideMenu="hideMenu">
						<view>
							<view class="menus ot-menus" @tap.stop="handleSee">
								<image :src="img+'pic00.png'"></image> 临时下单
							</view>
							<view class="menus ot-menus" @tap.stop="handleAdd">
								<image :src="img+'pic01.png'"></image> 采购下单
							</view>
						</view>
					</gracePopupMenu>
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
				<!-- 筛选 start -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15upx 2%;">
								<view class="grace-bold">型号</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<picker @change="bindPickerChange" :value="genderIndex" :range="gender" name="gender">
													<text>{{gender[genderIndex]}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>
								<view class="grace-bold">时间日期</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<form @submit="formSubmit" class="grace-form grace-margin-top">
										<view class="grace-items">
											<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" />
										</view>
									</form>

								</view>
							</view>
						</scroll-view>
						<!-- 按钮  -->
						<view class='grace-filter-buttons'>
							<view>
								重置
								<button form-type='reset'>重置</button>
							</view>
							<view>
								确定
								<button form-type='submit'>确定</button>
							</view>
						</view>
					</form>
				</view>
				<!-- 筛选 end -->
			</view>
			<!-- grace filter end -->
			<graceDate :show="show1" :isTime="false" v-on:changeDate="changeDate1" v-on:closeDate="closeDate1"></graceDate>
			<view style="margin-top:51px;"></view>
			<!-- 上面是一个展位的视图 其他内容这里开始 -->
		</view>
		<view class="ot-bg"></view>
		<view class="ot-home-qx mn">
			<text></text>
			<text>统计</text>
		</view>
		<view class="grace-box-banner ot-bottom grace-border-radius-small">
			<view class="garce-items">
				<view class="line1">641533.38
					<text>元</text>
				</view>
				<view class="line2">总计</view>
			</view>
			<view class="garce-items">
				<view class="line1">78.92
					<text>吨</text>
				</view>
				<view class="line2">销量</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in procur" :key="item.id">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">订单编号:
							<text>{{item.bianhao}}</text>
						</view>
						<view class="demo7">{{item.state}}
							<view class="demo2" id="demo-btn-2">
								<image :src="img+'dian1.png'" :data-id="item.id" @tap.stop="handleMenu"></image>
								<gracePopupMenu :show="item.flag" :bgColor="bgColor" :top="menu2Top" :data-id="item.id" v-on:hideMenu="hideMenu1(item.id)">
									<view>
										<view class="menus ot-menus" @tap.stop="handleChange" :data-id="item.id">查看销售</view>
										<view class="menus ot-menus" @tap.stop="handleChange1" :data-index="item.id">关联销售</view>
									</view>
								</gracePopupMenu>
							</view>
						</view>
					</view>
				</view>
				<view class="ot-sales-ln">型号：{{item.hao}}</view>
				<view class="ot-sales-lm">
					<view class="grace-space-between">
						<view class="demo6">供应商：{{item.ying}}</view>
					</view>
				</view>
				<view class="ot-sales-ln">数量：{{item.number}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">总金额：{{item.total}}</view>
						<view class="demo7">{{item.date}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import gracePopupMenu from '../../../../../graceUI/components/gracePopupMenu.vue';
	import graceDate from '../../../../../graceUI/components/graceDate.vue'
	import common from '../../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				bgColor: '#fff',
				img: common.imageUrlPath,
				date1: '',
				show1: false,
				menu1Show: false,
				menu1Top: 44,
				filterHeight: '100px',
				//被展示的菜单
				showingIndex: 0,
				orderIndex: 0,
				orderList: ['含税', '不含税'],
				//第二个选项相关
				cateIndex: 0,
				cateList: ['状态', '已付款', '未付款', '已开票', '未开票', '已审核', '未审核', '已取消'],
				//价格排序
				priceOrder: 1,
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				dateValue: "请选择型号",
				menu2Show: null,
				menu2Top: 30,
				procur: [{
					"id": 0,
					"bianhao": 'CG-1565925044971',
					"state": '已完成',
					"hao": '3，3',
					"ying": '广州慧正智联科技有限公司',
					"number": '100',
					"total": '60000',
					"date": '2019-08-12',
					"flag": false
				}, {
					"id": 1,
					"bianhao": 'CG-1565925044971',
					"state": '已完成',
					"hao": '3，3',
					"ying": '广州慧正智联科技有限公司',
					"number": '100',
					"total": '60000',
					"date": '2019-08-12',
					"flag": false
				}, {
					"id": 2,
					"bianhao": 'CG-1565925044971',
					"state": '已完成',
					"hao": '3，3',
					"ying": '广州慧正智联科技有限公司',
					"number": '100',
					"total": '60000',
					"date": '2019-08-12',
					"flag": false
				}]
			}
		},
		created() {
			_self = this
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
		methods: {
			handleChange(e) {
				console.log(e)
				var index = e.currentTarget.dataset.id
				uni.navigateTo({
					url: '../orderDetail/index?daId=' + index,
				})
			},
			handleChange1() {
				uni.navigateTo({
					url: '../associatedSales/index',
				})
			},
			handleClick() {
				uni.navigateTo({
					url: '../orderBasic/index',
				});
			},
			bindPickerChange: function(e) {
				console.log(e);
				this.genderIndex = e.detail.value
			},
			showMenu1: function(e) {
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
			hideMenu: function(e) {
				this.menu1Show = false;
			},
			// 点击展开菜单
			handleMenu: function(e) {
				console.log(e)
				var that = this
				var id = e.currentTarget.dataset.id
				var procurs = that.procur
				for (var i in procurs) {
					if (procurs[i].id == id) {
						if (procurs[i].flag == false) { //id相等就是当前对象
							procurs[i].flag = true
							break
						} else {
							procurs[i].flag = false
							break
						}
					}
				}
				that.procur = procurs
				let view = uni.createSelectorQuery().select("#demo-2");
				view.fields({
					size: true
				}, data => {
					_self.menu2Show = true,
						_self.menu2Top = data.height
				}).exec();
				// 这里如果有了真数据  就需要循环加上flag
				// var data = res.data.data
				// for (var i in data) {
				//   data[i].flag = false
				// }
				// this.setdata({
				//   list: data
				// })
			},
			// // 关闭菜单方法
			hideMenu1: function(o) {
				var that = this
				console.log(o)
				var id = o
				var procurs = that.procur
				for (var i in procurs) {
					if (procurs[i].id == id) {
						if (procurs[i].flag == false) { //id相等就是当前对象
							procurs[i].flag = true
							break
						} else {
							procurs[i].flag = false
							break
						}
					}
				}
				that.procur = procurs
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
			showOptions99: function() {
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 99;
			},
			changeCate: function(e) {
				var tapIndex = e.target.dataset.itemid;
				this.cateIndex = tapIndex;
				this.showingIndex = 0;
			},
			formsubmit: function(e) {
				console.log(JSON.stringify(e.detail.value));
				uni.showModal({
					title: '请观察控制台',
					content: '条件以表单形式提交 ^_^'
				});
				_self.showingIndex = 0;
			},
			//重置表单
			formReset: function() {
				_self.showingIndex = 0;
			},
			closeAll: function() {
				this.showingIndex = 0;
			},
			closeDate1: function() {
				this.show1 = false;
			},
			showDate1: function() {
				this.show1 = true;
			},
			changeDate1: function(e) {
				this.date1 = e;
				this.show1 = false;
			},
			handleSee() {
				uni.navigateTo({
					url: '../temporaryOrder/index',
				});
			},
			handleAdd() {
				uni.navigateTo({
					url: '../addOrder/index',
				});
			}

		},
		components: {
			gracePopupMenu,
			graceDate
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderList.css";

	.grace-filter .items {
		display: block;
	}

	.grace-filter.ot-date .items {
		display: flex !important;
	}

	.ot-sales-lc .demo6 {
		font-size: 26upx;
	}

	.ot-sales-lc .demo7 {
		color: #ff5722;
		font-size: 24upx;
		display: flex;
	}

	.ot-sales-lc .demo7 image {
		margin-left: 20upx;
	}

	.ot-sales-ln {
		color: #646464;
		padding: 10upx 20upx;
	}

	.ot-sales-lm {
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.ot-sales-lm .demo6 {
		color: #646464;
	}

	.ot-sales-lm .demo7 {
		background-color: #ff5722;
		color: #fff;
		box-sizing: border-box;
		padding: 0upx 20upx;
		border-radius: 40upx;
		font-size: 24upx;
		line-height: 38upx;
		height: 38upx;
		margin-top: 4upx;
	}

	.ot-sales-dast .demo6 {
		color: #f63f32;
	}

	.ot-sales-dast .demo7 {
		color: #b2b2b2;
	}

	.ot-sales-dast {
		padding: 10upx 20upx;
		box-sizing: border-box;
	}

	.grace-filter .items {
		width: 29.5%;
	}

	.orderImg {
		margin-top: 15px;
	}

	.ot-color {
		color: #ff5722;
	}

	.grace-filter {
		border-bottom: 0px solid #f2f3f4;
	}

	.grace-filter .items image {
		display: block;
		margin-top: 22upx;
		width: 50upx;
		height: 50upx;
	}

	.grace-filter .icons {
		width: 7%;
	}

	.ml .input {
		width: 70%;
		outline: none;
		border: 1px solid #ccc;
		height: 30px;
		line-height: 30px;
		padding: 0px 20upx;
		margin-left: 16upx;
		box-sizing: border-box;
	}

	.grace-search {
		margin: 0px;
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

	.ot-order-btn {
		width: 100%;
		box-sizing: border-box;
		padding: 0px 60upx;
	}

	.ot-order-btn button {
		margin: 0px;
		border-radius: 40upx;
		margin-right: 25upx;
		background-color: #ff5722 !important;
	}

	.ot-order-btn button[size=mini] {
		line-height: 45upx;
		padding: 0px 15upx;
	}

	.grace-filter-options {
		top: 100upx;
	}

	.ot-home-qx {
		font-size: 30upx;
		margin-top: 20upx;
		box-sizing: border-box;
		padding: 0px 30upx;
		display: flex;
		line-height: 35upx;
		box-sizing: border-box;
	}

	.ot-home-qx.mn {
		margin-bottom: 10upx;
	}

	.ot-home-qx text:nth-of-type(1) {
		width: 6upx;
		height: 35upx;
		display: block;
		background-color: #ff5722;
		margin-right: 20upx;
	}

	.ot-home-qx text:nth-of-type(3) {
		margin-left: 30upx;
	}

	.grace-box-banner {
		padding: 12upx 0;
		padding-bottom: 0upx;
	}

	.grace-box-banner .line1 {
		color: #ff5722;
	}

	.grace-border-radius-small {
		border-radius: 0upx;
	}

	.grace-box-banner .garce-items {
		padding-bottom: 30upx;
		width: 50%;
	}

	.grace-box-banner:nth-of-type(odd) {
		padding-top: 0px;
	}

	.grace-select-tags .input {
		text-align: left;
		padding: 0upx 20upx;
	}

	/* 页面个性化样式 */

	.demo2 {
		position: relative;
	}
</style>
