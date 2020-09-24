<template>
	<view class="">
		<scroll-view class="grace-tab-title grace-center" id="grace-tab-title" :scroll-x="false" :scroll-into-view="titleShowId">
			<view v-for="(tab, index) in tabs" :class="[tabCurrentIndex == index ? 'grace-tab-current' : '']" :id="'tabTag-'+index"
			 @tap="tabChange" :key="index">{{tab.name}}</view>
		</scroll-view>
		<swiper class="grace-tab-swiper-full" :current="swiperCurrentIndex" @change="swiperChange" :style="{height:tabHeight+'px'}">
			<!-- 循环项目 -->
			<swiper-item>
				<scroll-view class="ot-infor-mv" scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list">
						<view> 
							<checkbox-group >
								<label class="list" v-for="(item,index) in fist" :key="index" @change="checkboxChange(item)">
									<view class="ot-list">
										<view class="ot-ted-ol">
											<checkbox color="#ff5722" style="transform:scale(0.8)" :value="item.title" :checked="item.checked" />
											<view class="list_name">{{item.title}}</view>
										</view>
										<view class="cart_g_name">{{item.pro_name}}</view>
										<view class="cart_g_name">{{item.nicknames}}
											<text class="list_price">{{item.phone}}</text>
										</view>
									</view>
								</label>
							</checkbox-group>
						</view>
					</view>
					<!-- 固定底部 -->
					<view class="cont_bot">
						<checkbox-group @change="selectAlls1">
							<checkbox color="#ff5722" value="" :checked="checkedAll1" />
						</checkbox-group>
						<!-- 全选标题 -->
						<text class='sel_count_name'>全选</text>
						<!-- 提交 -->
						<label class='submit' @tap="submit1">立即提交</label>
					</view>
				</scroll-view>
			</swiper-item>
			<!-- 循环项目 -->
			<swiper-item>
				<scroll-view class="ot-infor-mv" scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
					<view class="grace-news-list">
						<!-- 列表 -->
						<view > 
							<checkbox-group >
								<label class="list" v-for="(item,index) in list" :key="index" @change="checkboxChange1(item)">
									<view class="ot-list">
										<view class="ot-ted-ol">
											<checkbox color="#ff5722" style="transform:scale(0.8)" :value="item.title" :checked="item.checked" />
											<view class="list_name">{{item.title}}</view>
										</view>
										<view class="cart_g_name">{{item.pro_name}}</view>
										<view class="cart_g_name">{{item.nicknames}}
											<text class="list_price">{{item.phone}}</text>
										</view>
									</view>
								</label>
							</checkbox-group>
						</view>
					</view>
					<!-- 固定底部 -->
					<view class="cont_bot">
						<checkbox-group @change="selectAlls">
							<checkbox color="#ff5722" :checked="checkedAll" />
						</checkbox-group>
						<!-- 全选标题 -->
						<text class='sel_count_name'>全选</text>
						<!-- 提交 -->
						<label class='submit' @tap='submit2'>立即提交</label>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import common from '../../../../common/common.js'
	import graceNav from "../../../../graceUI/components/graceNavBar.vue";
	import graceEmpty from '../../../../graceUI/components/graceEmpty.vue';
	import graceSpeaker from "../../../../graceUI/components/graceSpeaker.vue";
	var systemInfo = require('../../../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		data() {
			return {
				checkedAll: false,
				checkedAll1: false,
				tabCurrentIndex: 0,
				swiperCurrentIndex: 0,
				tabHeight: 300,
				titleShowId: 'tabTag-0',
				newsIndex: 0,
				tabs: [
					//标签名称 , 分类 id , 加载更多, 加载的页码
					{
						name: '已关联',
						id: 'yi',
						loadingType: 0,
						page: 1
					},
					{
						name: '未关联',
						id: 'wei',
						loadingType: 0,
						page: 1
					}
				],
				// 商品列表数据
				list: [{
						id: 0,
						title: '厦门市华商有限公司',
						pro_name: "158462315656465A",
						nicknames: '许建',
						phone: '12545624261',
					},
					{
						id: 1,
						title: '厦门市华商有限公司',
						pro_name: "158462315656465A",
						nicknames: '许建',
						phone: '12545624261',
					},
					{
						id: 2,
						title: '厦门市华商有限公司',
						pro_name: "158462315656465A",
						nicknames: '许建',
						phone: '12545624261',
					}
				],
				// 商品列表数据
				fist: [{
						id: 0,
						title: '厦门市慧慧有限公司',
						pro_name: "158462315656465A",
						nicknames: '许建',
						phone: '12545624261',
					},
					{
						id: 1,
						title: '厦门市洋洋有限公司',
						pro_name: "158462315656465A",
						nicknames: '许建',
						phone: '12545624261',
					},
					{
						id: 2,
						title: '厦门市呱呱有限公司',
						pro_name: "158462315656465A",
						nicknames: '许建',
						phone: '12545624261',
					}
				],

			}
		},
		onLoad: function(option) {
			//获取屏幕高度及比例
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx;
		},
		// 下拉刷新事件
		onPullDownRefresh: function() {
			// 页码重置 
			this.pages[this.swiperCurrentIndex] = 1;
			this.loadingTypes[this.swiperCurrentIndex] = 0;
		},
		created() {
			_self = this;
			_self.list.forEach(item => {
				item.checked = false;
			});
			_self.fist.forEach(item => {
				item.checked = false;
			});
		},
		methods: {
			checkboxChange1(item) {
				//console.log(item)
				let that = this;
				let box = (item.checked = !item.checked);
				//console.log(box)

			},
			selectAlls1() {
				this.checkedAll1 = !this.checkedAll1
				var fists = this.fist
				for (var i in fists) {
					if (this.checkedAll1 == true) {
						fists[i].checked = true
					} else {
						fists[i].checked = false
					}
				}
				this.fist = fists
				//console.log(this.checkedAll1)

			},
			submit1() {
				var fists = this.fist
				for (var i in fists) {
					if (fists[i].checked == true) {
						//console.log(fists[i].title)
					}
				}
			},
			// 
			checkboxChange(item) {
				//console.log(item)
				let that = this;
				let box = (item.checked = !item.checked);
				//console.log(box)
			},
			selectAlls() {
				this.checkedAll = !this.checkedAll
				var lists = this.list
				for (var i in lists) {
					if (this.checkedAll == true) {
						lists[i].checked = true
					} else {
						lists[i].checked = false
					}
				}
				this.list = lists
				//console.log(this.checkedAll)
			},
			submit2() {
				uni.showToast({
					title:'提交成功'
				})
			},

			tabChange: function(e) {
				var index = e.target.id.replace('tabTag-', '');
				this.swiperCurrentIndex = index;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			swiperChange: function(e) {
				var index = e.detail.current;
				this.tabCurrentIndex = index;
				this.titleShowId = 'tabTag-' + index;
			},
			//每个选项滚动到底部
			scrollend: function(e) {
				if (this.loadingTypes[this.swiperCurrentIndex] == 1 || this.loadingTypes[this.swiperCurrentIndex] == 2) {
					return;
				}
			}
		},
		components: {
			graceNav,
			graceEmpty,
			"grace-speaker": graceSpeaker
		}
	}
</script>

<style>
	.grace-tab-current {
		border-bottom: 4upx solid #FF5722 !important;
		color: #FF5722;
		font-weight: 700;

	}

	page {
		background-color: #eee;
	}

	.grace-tab-title {
		box-shadow: 2upx 2upx 6upx #ccc;

	}

	.grace-tab-title {
		position: fixed;
		z-index: 9999;
	}

	.grace-tab-swiper-full .ot-infor-mv {
		margin-top: 43px;
		padding-top: 5px;
	}

	.grace-tab-swiper-full {
		box-sizing: border-box;
	}

	.list {
		background-color: #fff;
		box-sizing: border-box;
	}
	
	
	.ot-list{
		background-color: #fff;
		width: 100%;
		height: auto;
		border-radius: 10upx;
		padding: 20upx 20upx;
		box-sizing: border-box;
		margin-bottom: 25upx;
	}

	.ot-ted-ol {
		display: flex;
		flex-direction: row;
		height: 55upx;
	}

	.list_name {
		margin-left: 20upx;
		font-size: 32upx;
	}

	.cart_g_name {
		color: #858585;
		margin-left: 70upx;
		margin-top: 20upx;
	}

	.list_price {
		color: #858585;
		margin-left: 30upx;
	}

	.cont_bot {
		position: fixed;
		display: flex;
		box-sizing: border-box;
		padding-left: 30upx;
		justify-content: space-between;
		bottom: 0;
		width: 100%;
		height: 104upx;
		line-height: 104upx;
		background: #fff;
		border-top: 2upx solid #ebebeb;
	}

	/* 全选ICON */

	.total-select {
		position: absolute;
		left: 30upx;
		top: 30upx;
		width: 40upx;
		height: 40upx;
	}

	/* 全选标题 */

	.sel_count_name {
		position: absolute;
		left: 90upx;
		font-size: 30upx;
		color: #333;
	}

	.submit {
		position: absolute;
		width: 274upx;
		height: 104upx;
		line-height: 104upx;
		right: 0upx;
		font-size: 30upx;
		text-align: center;
		color: #fff;
		background: linear-gradient(90deg, #FF6835 0%, #FF5722 100%);
	}

	.grace-news-list {
		padding: 25upx;
		width: 100%;
		margin-top: 0px;
		box-sizing: border-box;
	}
</style>
