<template>
	<view class="">
		<view class="ot-f">
			<!-- grace filter start -->
			<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop="nomove"></view>
			<view class="grace-filter ot-date " id="grace-filter-header">
				<view class="items" @tap='showOptions2'>{{cateList[cateIndex]}}
					<text class="grace-icons icon-arrow-down"></text>
				</view>
				<view class="items" @tap='showOptions99'>筛选
					<text class="grace-icons icon-filter"></text>
				</view>
				<view class=" ot-right">
					<view class="demo1" id="demo-1">
						<image :src="img+'adds.png'" @tap.stop="showMenu1" class="image"></image>
						<!-- gracePopupMenu 组件外层定位必须为 position:relative;  -->
						<gracePopupMenu :show="menu1Show" :top="menu1Top" v-on:hideMenu="hideMenu">
							<view>
								<view class="menus ot-menus" @tap.stop="handleChange">
									添加
								</view>
							</view>
						</gracePopupMenu>
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
								<view class="grace-bold">来款日期</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<input type="text" class="input" name="startDate" :disabled="true" :value="date1" @tap="showDate1" />
								</view>
								<view class="grace-bold">客户</view>
								<view style='padding:20upx 0;' class="grace-select-tags">
									<view class="grace-search">
										<view class="grace-search-in ml">
											<view class="input">
												<input type="text" name="kehu" placeholder="请输入客户名称" />
											</view>
										</view>
									</view>
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
			<view style="margin-top:51px;"></view>
			<!-- 上面是一个展位的视图 其他内容这里开始 -->
		</view>
		<view class="ot-bg"></view>
		<view class="ot-sales-la">
			<view class="ot-sales-lx" @tap="handleClick" v-for="(item,index) in paragraph" :key="index">
				<image class="ot-image" :src="img+'qian.png'"></image>
				<view class="ot-sales-lc">
					<view class="grace-space-between">
						<view class="demo6">客户:{{item.customer}}</view>
						<view class="demo7">{{item.state}}
							<view class="demo1" id="demo-2">
								<image :src="img+'dian1.png'" :data-id="item.id" @tap.stop="handlePop"></image>
								<gracePopupMenu :show="item.flag" :top="menu2Top" :data-id="item.id" v-on:hideMenu="hideMenu1(item.id)">
									<view>
										<view class="menus ot-menus" @tap.stop="handleEdit" :data-id="item.id">编辑</view>
										<view class="menus ot-menus" @tap.stop="handleDel" :data-index="item.id">删除</view>
									</view>
								</gracePopupMenu>
							</view>
						</view>
					</view>
				</view>
				<view class="ot-sales-ln">产地/型号：{{item.address}}/{{item.pro}}</view>
				<view class="ot-sales-ln">银行：{{item.yinhang}}</view>
				<view class="ot-sales-ln">数量：{{item.num}}</view>
				<view class="ot-sales-ln">单价：{{item.price}}</view>
				<view class="ot-sales-dast">
					<view class="grace-space-between">
						<view class="demo6">来款金额：{{item.price}}</view>
						<view class="demo7">{{item.time}}</view>
					</view>
				</view>
			</view>
		</view>
		<graceDate :show="isShow1" :isTime="false" v-on:changeDate="changeDate1" v-on:closeDate="closeDate1"></graceDate>
	</view>
</template>

<script>
	import gracePopupMenu from '../../../../graceUI/components/gracePopupMenu.vue';
	import graceDate from '../../../../graceUI/components/graceDate.vue'
	import common from '../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				date1: '点击选择',
				isShow1: false,
				menu1Show: false,
				menu1Top: 44,
				//被展示的菜单
				showingIndex: 0,
				//第二个选项相关
				cateIndex: 0,
				cateList: ['全部', '已关联', '未关联', '已取消'],
				genderIndex: 0,
				gender: ['请选择型号', 'SP1520,泰国', '中景,V30G'],
				dateValue: "请选择",
				menu2Show: false,
				menu2Top: 30,
				paragraph: [{
					'id': 0,
					'customer': '厦门市易购塑料有限公司',
					'state': '已关联',
					'address': '大庆',
					'pro': '6097',
					'yinhang': '民生',
					'num': '10',
					'unit': '7170',
					'price': '600000',
					'time': '2019-08-16',
					'flag': false
				}, {
					'id': 2,
					'customer': '厦门市易购塑料有限公司',
					'state': '已关联',
					'address': '大庆',
					'pro': '6097',
					'yinhang': '民生',
					'num': '10',
					'unit': '7170',
					'price': '600000',
					'time': '2019-08-16',
					'flag': false
				}, {
					'id': 3,
					'customer': '厦门市易购塑料有限公司',
					'state': '已关联',
					'address': '大庆',
					'pro': '6097',
					'yinhang': '民生',
					'num': '10',
					'unit': '7170',
					'price': '600000',
					'time': '2019-08-16',
					'flag': false
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
			handleChange() {
				uni.navigateTo({
					url: '../addCustomer/index',
				})
				this.hideMenu();
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
			handlePop: function(e) {
				// debugger
				var id = e.currentTarget.dataset.id
				var that = this
				var paragraphs = that.paragraph
				for (var i in paragraphs) {
					if (paragraphs[i].id == id) {
						if (paragraphs[i].flag == false) {
							paragraphs[i].flag = true
							break;
						} else {
							paragraphs[i].flag = false
							break;
						}
					}
				}
				that.paragraphs = paragraphs
			},
			// 关闭菜单方法
			hideMenu1: function(e) {
				var id = e
				var that = this
				var paragraphs = that.paragraph
				for (var i in paragraphs) {
					if (paragraphs[i].id == id) {
						if (paragraphs[i].flag == false) {
							paragraphs[i].flag = true
							break;
						} else {
							paragraphs[i].flag = false
							break;
						}
					}
				}
				that.paragraph = paragraphs
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
				this.isShow1 = false;
			},
			showDate1: function() {
				this.isShow1 = true;
			},
			changeDate1: function(e) {
				this.date1 = e;
				this.isShow1 = false;
			},
			handleEdit(e) {
				uni.navigateTo({
					url: '../editCustomer/index',
				})
			},
			handleDel(e) {
				var index = e.currentTarget.dataset.id;
				var that = this;
				this.hideMenu();
				uni.showModal({
					title: '提示',
					content: '确认取消订单',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认取消!",
								icon: "none"
							});
							// 用户点击了确定 可以调用删除方法了

							// list.splice(current, 1)

							// this.setData({
							//   list: list
							// })

						} else if (sm.cancel) {}
					}
				})
			},
		},
		components: {
			gracePopupMenu,
			graceDate
		}
	}
</script>

<style>
	@import "../../../../common/css/orderList.css";

	.ot-sales-lc .demo7 {
		display: flex;
	}

	.ot-order-btn {
		width: 100%;
		box-sizing: border-box;
		padding: 0px 60upx;
	}
	
	.ot-sales-lc .demo7 image{
		margin-left: 20upx;
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

	.input {
		width: 30%;
		border: 1px solid #ccc;
		margin: 0px 20upx;
		box-sizing: border-box;
		padding: 0px 20upx;
	}

	.grace-search input {
		width: 100%;
		height: 100%;
		padding: 0px;
	}
	
	.ml .input{
		padding-left: 25upx;
		margin: 0px;
		box-sizing: border-box;
	}
	
	.input picker{
		width: 100%;
		}
		
		.grace-select-tags .input{
			height: 58upx;
			font-size: 28upx;
			width: 78%;
			text-align: left;
		}
		

	.grace-select-tags {
		display: flex;
	}

	.grace-filter-options {
		top: 100upx;
	}

	.grace-filter .items {
		width: 50.5%;
	}

	.ot-right {
		width: 25% !important;
		display: flex;
		justify-content: center;
		margin-left: 20upx;
	}

	.ot-right image {
		width: 50upx;
		height: 50upx;
		margin-top: 25upx;
	}

	.demo1 {
		position: relative;
	}

	.menus {
		line-height: 60upx;
		font-size: 28upx;
		border: none;
		margin-left: 30upx;
		text-align: left;
		color: #000;
	}
</style>
