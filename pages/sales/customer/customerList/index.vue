<template>
	<view class="">
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :scroll-top="scrollTop" :style="{height:600+'px'}">
			<view class="ot-cus-container">
				<view class="grace-search" id="grace-filter-header">
					<view class="grace-search-in">
						<view class="icons grace-icons icon-search"></view>
						<view class="input">
							<input type="search" @tap="handleChange(0)" placeholder="关键字" @input="handleInput" />
						</view>
					</view>
				</view>
				<view class="ot-cus-gk">
					<view class="ot-cus-fl">全部客户</view>
					<view class="ot-cus-ft">
						<view @tap='showOptions99'>筛选
							<text class="grace-icons icon-filter"></text>
						</view>
						<view @tap.stop="showMenu1">添加
							<image :src="img+'sanjiao1.png'"></image>
						</view>
					</view>

				</view>
				<view class="demo1" id="demo-1">
					<gracePopupMenu :show="menu1Show" :top="menu1Top" v-on:hideMenu="hideMenu">
						<view>
							<view class="menus ot-menus" @tap.stop="handleChange(1)">
								<image :src="img+'h5-group3.png'"></image>添加分组
							</view>
							<view class="menus ot-menus" @tap.stop="handleChange(2)">
								<image :src="img+'h5-group2.png'"></image>添加个人
							</view>
							<view class="menus ot-menus" @tap.stop="handleChange(3)">
								<image :src="img+'h5-group1.png'"></image>添加企业
							</view>
						</view>
					</gracePopupMenu>
				</view>
				<!-- 筛选 start -->
				<view class='grace-filter-options' :style="{'width':'100%', 'height':filterHeight, 'padding':'0'}" @tap.stop=""
				 @touchmove.stop="" v-if="showingIndex == 99">
					<form @submit='formsubmit' @reset='formReset'>
						<scroll-view scroll-y="true" :style="{'height':filterHeight}">
							<view style="width:96%; padding:15upx 2%;">

								<view class="ot-sales-lr">
									<view class="grace-bold">客户分组</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="handleGender" :value="genderIndex" :data-id="gender[genderIndex].id" :range="gender"
												 :range-key="'name'" name="gender">
													<text>{{gender[genderIndex].name}}</text>
												</picker>
											</view>
										</view>
									</view>
								</view>

								<view class="ot-sales-lr">
									<view class="grace-bold">客户类型</view>
									<view class="grace-search">
										<view class="grace-search-in">
											<view class="input">
												<picker @change="handleSpecies" :value="speciesIndex" :range="species" name="species">
													<text>{{species[speciesIndex]}}</text>
												</picker>
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
				<view class="ot-cus-fb" v-for="(item,index) in customer" :key="index" v-if="hidelo">
					<view class="grace-list">
						<view class="items">
							<view class="icons">
								<image :src="img+'infor2.png'"></image>
							</view>
							<view class="body">
								<view class="title fg">{{item.name}}</view>
							</view>
							<view class="demo1" id="demo-2">
								<view class="arrow-rights" :data-name="item" @tap.stop="showMenu2(item)">
									<image :src="img+'dian1.png'"></image>
								</view>
								<gracePopupMenu :show="item.flag" :top="menu2Top" :data-name="item" v-on:hideMenu="hideMenu1(item)">
									<view>
										<view class="menus ot-menus" @tap.stop="handleDel" :data-id="item.id">删除客户</view>
										<view class="menus ot-menus grace-noborder" @tap.stop="handleActiva" :data-id="item.id">激活客户</view>
										<view class="menus ot-menus grace-noborder" @tap.stop="handleChange(6,item.id)">关联客户</view>
										<view class="menus ot-menus grace-noborder" @tap.stop="handleChange(7)">分组</view>
										<view class="menus ot-menus grace-noborder" @tap.stop="handleClick(item.id)">查看</view>
									</view>
								</gracePopupMenu>
							</view>
						</view>
					</view>
					<view class=" grace-list">
						<view class="items">
							<view class="icons"></view>
							<view class="body ot-cus-fc ">
								<view class="title hf">{{item.linkman}}</view>
								<text class="title hl">{{item.tel}}</text>
							</view>
						</view>
					</view>
					<view class="grace-lists ">
						<view class="icons "></view>
						<view class="body ot-cus-fc ">
							<view class="title hf">{{item.type}}</view>
							<view class="title hl">{{item.address}}</view>
						</view>
					</view>
					<view class="grace-list ">
						<view class="items ">
							<view class="icons "></view>
							<view class="body ot-cus-fc ">
								<view class="title ">{{item.area}}</view>
							</view>
						</view>
					</view>
				</view>
				<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
			</view>
			<form @submit="formOut" class="grace-form grace-margin-top">
				<graceDialog :isTitle="false" :show="pop" closeBtnColor="#FFFFFF" v-on:closeDialog="closeDialog3">
					<view slot="content" class="content">
						<view class="ot-cus-center">分组</view>
						<view class="grace-items">
							<view class="grace-label">客户分组</view>
							<view class="other">
								<picker @change="handleGroup" :value="groupIndex" :range="group" name="group">
									<text>{{group[groupIndex]}}</text>
								</picker>
							</view>
						</view>
					</view>
					<view slot="btns">
						<view class="grace-dialog-btns">
							<view>
								<button type="primary" @tap="closeDialog3">取消</button>
							</view>
							<view>
								<button formType="submit" type="primary" style="color:#3688FF;" @tap="handlePop">确认</button>
							</view>
						</view>
					</view>
				</graceDialog>
			</form>
			<form @submit="forment" class="grace-form grace-margin-top">
				<graceDialog :isTitle="false" :show="pop1" closeBtnColor="#FFFFFF" v-on:closeDialog="handleChange(4)">
					<view slot="content" class="content">
						<view class="ot-cus-center">分组</view>
						<view class="grace-items">
							<view class="grace-label">分组名称</view>
							<input type="text" class="input" name="names" placeholder="分组名称" />
						</view>
					</view>
					<view slot="btns">
						<view class="grace-dialog-btns">
							<view>
								<button type="primary" @tap="handleChange(4)">取消</button>
							</view>
							<view>
								<button formType="submit" type="primary" style="color:#3688FF;" @tap="handleChange(5)">确认</button>
							</view>
						</view>
					</view>
				</graceDialog>
			</form>
		</scroll-view>
		<view class="to-top" @click="goTop">
			<image :src="img+'icon-top.png'" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import gracePopupMenu from '../../../../graceUI/components/gracePopupMenu.vue';
	import graceDialog from '../../../../graceUI/components/graceDialog.vue';
	import graceLoading from "../../../../graceUI/components/graceLoading.vue";
	import common from '../../../../common/common.js'
	var _self;
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				hidelo: true,
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				showingIndex: 0,
				menu1Show: false,
				menu1Top: 30,
				menu2Show: false,
				menu2Top: 30,
				genderIndex: 0,
				gender: ['请选择', '电话', '介绍'],
				speciesIndex: 0,
				species: ['请选择', '个人', '企业'],
				pop: false,
				pop1: false,
				groupIndex: 0,
				group: ['请选择', '电话', '介绍'],
				customer: [],
				menus: [],
				page: 1,
				categoryId: 0,
				type: '',
				filterHeight: '100px',
				loadingText: ['正在加载.....'],
				loadingTypes: 0,
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
						var sHeight = (windowHeight - res.height - 40);
						// //console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		created() {
			var _self = this
			uni.request({
				url: this.$webUrl + "/sale/findCategory",
				data: {
					phone: uni.getStorageSync("phoneno"),
				},
				header: {
					
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var data = res.data
					_self.gender = data
				}
			})
		},
		mounted() {
			_self = this
			uni.request({
				url: this.$webUrl + "/sale/getCustomers",
				data: {
					phone: uni.getStorageSync("phoneno")
				},
				header: {
					'Access-Token': uni.getStorageSync("token"),
				},
				success(res) {
					var data = res.data
					_self.customer = res.data.map(item => {
						item.flag = false
						return item
					})
					if (data.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (res.data.length > 0 && res.data.length < 15) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['已加载全部']
							_self.loadings = ''
						}, 500)
					}
				}
			})
		},
		methods: {
			handleInput(e) {
				var s = e.detail.value
				uni.request({
					url: this.$webUrl + "/sale/getCustomers",
					data: {
						phone: uni.getStorageSync("phoneno"),
						cname: s
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.customer = res.data.map(item => {
							item.flag = false
							return item
						})
						if (_self.customer.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (res.data.length > 0 && res.data.length < 15) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
			},
			handleChange(o, e) {
				switch (o) {
					case 0:
						_self.hidelo = true
						_self.showingIndex = 0
						break;
					case 1:
						this.pop1 = true;
						this.showMenu1()
						break;
					case 2:
						uni.navigateTo({
							url: '../addPersonal/index',
						})
						this.showMenu1()
						break;
					case 3:
						uni.navigateTo({
							url: '../addEnterprise/index'
						})
						this.showMenu1()
						break;

					case 4:
						this.getList()
						this.pop1 = false
						break;
					case 5:
						this.handleChange(4);
						break;
					case 6:
						this.getList()
						console.log(e)
						uni.navigateTo({
							url: '../addAssociated/index'
						})
						break;
					case 7:
						this.getList()
						this.pop = true
						break;
				}
			},
			handleClick(e){
				this.getList()
				uni.navigateTo({
					url: '../customerDtaile/index?id=' + e
				})
			},
			handleGender(e) {
				console.log(e)
				this.genderIndex = e.detail.value
			},
			handleSpecies(e) {
				this.speciesIndex = e.detail.value
			},
			handleGroup(e) {
				this.groupIndex = e.detail.value
			},
			closeDialog3: function() {
				this.pop = false;
			},
			handlePop: function() {
				this.closeDialog3();
			},
			showOptions99: function() {
				this.hidelo = false
				if (this.showingIndex != 0) {
					this.showingIndex = 0;
					return;
				}
				this.showingIndex = 99;
			},
			handleGroupadd: function() {
				this.pop1 = true
			},
			showMenu1: function(e) {
				if (this.menu1Show) {
					this.menu1Show = false;
					return;
				}
				let view = uni.createSelectorQuery().select("#demo-1");
				view.fields({
					size: true
				}, data => {
					this.menu1Show = true;
					this.menu1Top = data.height;
					//console.log(data);
				}).exec();
			},
			// 关闭菜单方法
			hideMenu: function() {
				this.menu1Show = false;
			},
			showMenu2: function(o) {
				_self.menus = o
				_self.menus.flag = !_self.menus.flag
				return
				let view = uni.createSelectorQuery().select("#demo-2");
				view.fields({
					size: true
				}, data => {
					_self.menus.flag = true;
					this.menu2Top = data.height;
					//console.log(data);
				}).exec();
			},

			hideMenu1: function(o) {
				//console.log(o)
				_self.menus = o
				this.getList()

			},
			getList() {
				_self.menus.flag = !_self.menus.flag
				let view = uni.createSelectorQuery().select("#demo-2");
				view.fields({
					size: true
				}, data => {
					_self.menus.flag = false;
					this.menu2Top = data.height;
				}).exec();
			},
			scrollend(e) {
				var _self = this
				_self.page++;
				this.loadingType = 1;
				uni.request({
					url: this.$webUrl + "/sale/getCustomers",
					data: {
						page: _self.page,
						phone: uni.getStorageSync("phoneno"),
						categoryId: _self.categoryId,
						type: _self.type
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.customer = _self.customer.concat(
							res.data.map(item => {
								item.flag = false
								return item
							})
						)
						_self.loadingType = 0;
						_self.loadingText = ['正在加载.....']
						var data = res.data
						var timer;
						clearTimeout(_self.timer)
						if (data.length == 0) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
				this.old.scrollTop = e.timeStamp
			},
			goTop: function(e) {
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
			},
			formOut(e) {
				console.log(e.detail.value)
			},
			forment: function(e) {
				var formData = e.detail.value
				formData.phone = uni.getStorageSync("phoneno")
				uni.request({
					url: this.$webUrl + "/sale/addCategory",
					data: formData,
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						if (res.data) {
							uni.showToast({
								title: '添加成功'
							})
						}
					}
				})
			},
			//提交条件
			formsubmit: function(e) {
				var _self = this
				_self.categoryId = _self.gender[_self.genderIndex].id
				_self.type = _self.species[_self.speciesIndex]
				if (_self.type == "请选择") {
					_self.type = ""
				}
				uni.request({
					url: this.$webUrl + "/sale/getCustomers",
					data: {
						categoryId: _self.categoryId,
						type: _self.type,
						phone: uni.getStorageSync("phoneno")

					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.customer = res.data.map(item => {
							item.flag = false
							return item
						})
						_self.hidelo = true
						_self.showingIndex = 0;
						if (res.data.length == 0) {
							_self.loadingText = ['暂无订单']
							_self.loadings = ''
						}
						var timer;
						clearTimeout(_self.timer)
						if (res.data.length > 0 && res.data.length < 10) {
							_self.timer = setTimeout(function() {
								_self.loadingText = ['已加载全部']
								_self.loadings = ''
							}, 500)
						}
					}
				})
			},
			//重置表单
			formReset: function() {
				_self.hidelo = true
				_self.showingIndex = 0;
			},
			handleDel(e) {
				this.getList()
				var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认取消!",
								icon: "none"
							});

						} else if (sm.cancel) {}
					}
				})
				this.hideMenu();
			},
			handleActiva(e) {
				this.getList()
				var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认激活？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认取消!",
								icon: "none"
							});

						} else if (sm.cancel) {}
					}
				})
			},
		},
		components: {
			gracePopupMenu,
			graceDialog: graceDialog,
			graceLoading,
		}
	}
</script>

<style>
	.ot-sales-lr {
		display: flex;
		box-sizing: border-box;
		padding: 18upx 25upx;
		border-bottom: 1px solid #eee;
	}

	.ot-sales-lr .grace-items .input {
		text-align: right;
		color: #666;
		font-size: 28upx;
		margin-right: 0px;
	}

	.grace-search {
		margin: 0px;
	}

	.ot-sales-lr .grace-items {
		width: 80%;
	}

	.grace-bold {
		width: 20%;
	}

	.grace-form .grace-items .input {
		text-align: right;
		width: 70%;
		height: 60upx;
		padding: 0px 20upx;
		box-sizing: border-box;
	}

	.ot-sales-lr .grace-search-in>.input {
		text-align: right;
		color: #666;
		margin-right: 0px;
	}

	.ot-cus-container {
		box-sizing: border-box;
		padding: 20upx 30upx;
	}

	.to-top {
		width: 70upx;
		height: 70upx;
		border-radius: 50%;
		background-color: #ff5722;
		position: fixed;
		right: 23upx;
		bottom: 300upx;
		z-index: 9999;
		box-shadow: 0px 3px 5px 3px #FF9B79;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.to-top image {
		width: 36upx;
		height: auto;
	}

	page {
		background-color: #eee;
	}

	.grace-search {
		background-color: #fff;
		padding: 0px;
		border-radius: 10upx;
		margin: 0px;
		width: 100%;
	}

	.ot-cus-gk {
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		box-sizing: border-box;
		padding: 25upx 25upx;
		margin-top: 20upx;
		border-radius: 8upx;
		margin-bottom: 20upx;
	}

	.ot-cus-fl {
		font-size: 33upx;
		color: #272727;
	}

	.ot-cus-ft {
		border-radius: 40upx;
		padding: 10upx 10upx;
		box-sizing: border-box;
		border: 1px solid #5e5e5e;
		display: flex;
	}

	.ot-cus-ft view {
		padding: 0px 30upx;
		box-sizing: border-box;
		height: 35upx;
		color: #272727;
		line-height: 35upx;
	}

	.ot-cus-ft view:nth-of-type(2) {
		border-left: 1px solid #ccc;
		box-sizing: border-box;
		display: flex;
		padding: 0px 20upx;
	}

	.ot-cus-ft view:nth-of-type(2) image {
		margin-top: -4upx;
	}

	.ot-cus-ft view:nth-of-type(1) text {
		margin-left: 4upx;
	}

	.demo1 {
		position: relative;
	}

	.menus {
		line-height: 65upx;
		font-size: 28upx;
		border-bottom: 1upx solid #e8e8e8;
		margin-left: 30upx;
		text-align: left;
	}

	.ot-menus {
		color: #000;
		border: 0px solid #000;
		display: flex;
	}

	.ot-menus image {
		font-weight: bold;
		margin-top: 15upx;
		margin-right: 20upx;
		line-height: 90upx;
	}

	.grace-popup-menu {
		right: 50upx !important;
	}

	.ml .input {
		width: 70%;
		outline: none;
		border: 1px solid #ccc;
		height: 60upx;
		line-height: 60upx;
		padding: 0px 20upx;
		margin-left: 16upx;
		box-sizing: border-box;
	}

	.ml.grace-search-in {
		border-radius: 0upx;
		background-color: transparent;
		margin: 0px;
	}

	.ot-cus-fb {
		background-color: #fff;
		border-radius: 10upx;
		box-sizing: border-box;
		padding: 18upx 20upx;
		margin-bottom: 30upx;
		box-shadow: 2upx 2upx 12upx #ccc;
	}

	.grace-list {
		padding: 0px;
	}

	.grace-list .items .icons image {
		width: 60upx;
		height: 60upx;
	}

	.grace-list .items .icons {
		width: 60upx;
		height: 60upx;
	}

	.grace-list .items .body {
		margin-left: 0upx;
		display: flex;
		flex-direction: row;
	}

	.arrow-rights {
		margin-top: 0upx;
	}

	.grace-list .items .body {
		padding: 0px;
	}

	.grace-list .items {
		margin: 0px;
	}

	.ot-cus-fc {
		display: flex;
		margin-left: 10upx !important;
	}

	.grace-list .items .ot-cus-fc .title {
		justify-content: flex-start;
		width: auto;
		overflow: hidden;
		color: #858585;
	}

	.grace-lists .ot-cus-fc .title.hf {
		width: 100upx;
		height: 60upx;
		overflow: hidden;
		color: #858585;
		font-size: 26upx;
	}

	.grace-list .items .ot-cus-fc .title.hf {
		width: auto;
		height: 60upx;
		overflow: hidden;
	}

	.fg {
		margin-left: 10upx;
	}

	.grace-lists {
		display: flex;
	}

	.grace-lists .icons {
		width: 60upx;
		height: 60upx;
	}

	.grace-lists .ot-cus-fc .title.hl {
		color: #858585;
		font-size: 26upx;
		width: 436upx;
		height: 60upx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	.grace-list .ot-cus-fc .title.hl {
		width: auto;
		height: 60upx;
	}

	.content {
		box-sizing: border-box;
		padding: 20upx 40upx;
	}

	.ot-cus-center {
		text-align: center;
	}
</style>
