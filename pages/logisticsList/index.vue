<template>
	<view class="container">
		<view class="grace-shade grace-shade-black" v-if="showingIndex > 0" @tap.stop="closeAll" @touchmove.stop=""></view>
		<view class="grace-filter" id="grace-filter-header">
			<view class="items" @tap.stop='showOptions1'>{{orderList[orderIndex]}}
				<text class="grace-icons icon-arrow-down"></text>
			</view>
			<view class="items" @tap.stop='changePriceOrder'>
				价格
				<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/asc.png" mode="widthFix" v-if="priceOrder == 1"></image>
				<image class="orderImg" src="https://staticimgs.oss-cn-beijing.aliyuncs.com/desc.png" mode="widthFix" v-if="priceOrder == 2"></image>
			</view>
			<view class='grace-filter-options' style="max-height:200px;" v-if="showingIndex == 1">
				<view v-for="(item, index) in orderList" :key="index" :class="[index ==  orderIndex ? 'option current' : 'option']"
				 @tap='changeOrder' :data-itemid="index">
					{{item}}<text class="grace-icons icon-right" v-if="index ==  orderIndex"></text>
				</view>
			</view>
		</view>
		<!-- grace filter end -->
		<view style="margin-top:51px;"></view>
		<view class="ot-bg"></view>
		<scroll-view scroll-y="true" @scrolltolower="scrollend" :style="{height:tabHeight+'px'}">
			<view class="ot-logistics-gf">
				<view class="grace-margin" v-for="(item,index) in o" :key="index">
					<view class="grace-comments">
						<view class="items">
							<view class="body">
								<view class="header">
									<text>{{item.from_area}}->{{item.to_area}}</text>
									<text class="grace-icons">{{item.release_date}}</text>
								</view>
								<view class="info">
									<text>运费:{{item.freight}}</text>
									<text>{{item.area}} · {{item.code}}</text>
								</view>
								<view class="content">
									<text>{{item.num}}吨</text>
									<view class="ot-hold-fl">
										<view @tap.stop="handleDg(item.id)">接单</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<graceLoading :loadings="loadings" :loadingType="loadingTypes" :loadingText="loadingText"></graceLoading>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import graceLoading from "../../graceUI/components/graceLoading.vue";
	var systemInfo = require('../../graceUI/jsTools/systemInfo.js');
	var _self;
	export default {
		components: {
			graceLoading,
		},
		data() {
			return {
				showingIndex: 0,
				orderIndex: 0,
				orderList: ['全部'],
				priceOrder: 1,
				filterHeight: '100px',
				loadings: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=331756826,2323021699&fm=26&gp=0.jpg',
				loadingTypes: 0,
				loadingText: ['正在加载.....'],
				tabHeight: '300',
				o: '',
				page: 1,
				roles:''
			}
		},
		created() {
			_self = this
		},
		onLoad() {
			_self = this
			var system = systemInfo.info();
			this.tabHeight = system.windowHeight - system.iPhoneXBottomHeightPx - uni.upx2px(110);
			uni.request({
				url: this.$webUrl + "/logisticsOrderDataTable",
				data: {
					page: _self.page
				},
				success(res) {
					var data = res.data
					data.map(item => {
						if (item.freight == null) {
							item.freight = 0
						}
						item.from_area=item.from_area.split(',').slice(0,2).join('-')
						item.to_area=item.to_area.split(',').slice(0,2).join('-')
					})
					_self.o = data
					if (data.length == 0) {
						_self.loadingText = ['暂无订单']
						_self.loadings = ''
					}
					var timer;
					clearTimeout(_self.timer)
					if (data.length > 0 && data.length < 15) {
						_self.timer = setTimeout(function() {
							_self.loadingText = ['']
							_self.loadings = ''
						}, 500)
					}
				}
			})
			uni.request({
				url:_self.$webUrl+"/user/getRoles",
				data:{phone:uni.getStorageSync("phoneno")},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res){
					_self.roles=res.data
				}
			})
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
						var sHeight = (windowHeight - res.height - 5);
						console.log(windowHeight, sHeight);
						_self.filterHeight = sHeight + 'px';
					}).exec();
				}
			});
		},
		methods: {
			handleDg(e) {
				uni.showModal({
					title: '提示',
					content: '是否确认接单？',
					success: function(sm) {
						if (sm.confirm) {
							var phone = uni.getStorageSync('phoneno')
							var roles = _self.roles
							if (phone == null) {
								uni.showToast({
									title: '请先登录',
									icon: 'none'
								})
								return
							}
							if (roles != '51' & roles != '5' & roles != '50') {
								uni.showToast({
									title: '你不是司机或物流',
									icon: 'none'
								})
								return
							}
							uni.request({
								url: _self.$webUrl + "/driver/subscribe",
								data: {
									id: e,
									phone: uni.getStorageSync('phoneno')
								},
								header: {
									'Access-Token': uni.getStorageSync("token")
								},
								success(res) {
									var data = res.data
									if (data.code == 0) {
										uni.showToast({
											title: data.msg
										})
									} else {
										uni.showToast({
											title: data.msg,
											icon: 'none'
										})
									}
								}
							})
						} else if (sm.cancel) {

						}
					}
				})
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
			changePriceOrder: function() {
				if (this.priceOrder == 1) {
					this.priceOrder = 2;
				} else {
					this.priceOrder = 1;
				}
				uni.showModal({
					
				});
			},
			scrollend() {
				_self.page++;
				this.loadingType = 1;
				uni.request({
					url: this.$webUrl + "/logisticsOrderDataTable",
					data: {
						page: _self.page
					},
					success(res) {
						var data = res.data
						data.map(item => {
							if (item.freight == null) {
								item.freight = 0
							}
							item.from_area=item.from_area.split(',').slice(0,2).join('-')
							item.to_area=item.to_area.split(',').slice(0,2).join('-')
						})
						_self.o = _self.o.concat(data)
						
						_self.loadingText = ['正在加载.....']
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
			}
		}
	}
</script>

<style>
	.grace-filter {
		top: 44px;
	}

	.orderImg {
		width: 28px;
		height: 28px;
		margin-top: 11px;
	}

	.ot-bg {
		height: 20upx;
		background-color: #eee;
	}

	.grace-filter .items {
		width: 50%;
	}

	.ot-logistics-gf {
		width: 100%;
		height: auto;
		margin-top: 10upx;
		box-sizing: border-box;
	}

	.ot-logistics-gf .grace-margin {
		margin: 0px;
		width: 100%;
		height: 170upx;
		padding: 0px 30upx;
		box-sizing: border-box;
		border-bottom: 1px solid #f5f6f8;
	}


	.ot-logistics-gf .grace-comments {
		padding: 0px;
	}

	.ot-logistics-gf .grace-comments .items {
		margin: 0px 0px;
		padding: 0px;
	}

	.grace-comments .header text {
		color: #ff5722;
		font-size: 30upx;
	}

	.grace-comments .header text:nth-of-type(1) {
		height: 50upx;
		line-height: 50upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.grace-comments .header text.grace-icons {
		color: #ccc;
		height: 50upx;
		line-height: 50upx;
		width: 160upx;
		text-align: right;
		font-size: 26upx;
	}

	.grace-comments .info {
		justify-content: flex-start;
	}

	.grace-comments .info text:nth-of-type(1) {
		color: red;
		font-size: 28upx;
		width: 42%;
	}

	.grace-comments .info text:nth-of-type(2) {
		font-size: 28upx;
		text-align: right;
		width: 30%;
	}

	.grace-comments .content {
		display: flex;
		flex-wrap: nowrap;
		align-items: center;
		line-height: 1.5em;
		justify-content: space-between;
		margin-bottom: 0px;
	}

	.grace-comments .content text {
		font-size: 28upx;
	}

	.grace-comments .content view {
		font-size: 28upx;
	}

	.grace-comments .content view:nth-of-type(1) {
		color: #999999;
	}

	.grace-comments .content .ot-hold-fl {
		display: flex;
		justify-content: flex-end;
	}

	.grace-comments .content .ot-hold-fl view:nth-of-type(1) {
		background-color: #FF5722;
		color: #fff;
		box-sizing: border-box;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
		line-height: 17px;
		height: 20px;
	}

	.grace-comments .content .ot-hold-fl view:nth-of-type(2) {
		background-color: #FF5722;
		color: #fff;
		box-sizing: border-box;
		padding: 5upx 15upx;
		border-radius: 20upx;
		font-size: 24upx;
		line-height: 17px;
		height: 20px;
	}
</style>
