<template>
	<view class="page">
		<view class="page__bd">
			<view class="weui-search-bar">
				<view class="weui-search-bar__form">
					<view class="weui-search-bar__box">
						<text class="weui-icon-search_in-box icons grace-icons icon-search" type="search" size="14"></text>
						<input type="text" class="weui-search-bar__input" placeholder="" v-model="inputVal" />
					</view>
				</view>

			</view>
			<view class="mg-client-sa grace-margin">
				<view class="grace-card-view" v-for="(item,index) in contact" :key="index">
					<view class="body">
						<view class="img">
							<image :src="item.photo" />
						</view>
						<view class="desc">
							<view class="title">{{item.names}}
								<text class="ot-text">{{item.gender}}</text>
							</view>
							<view class="text">{{item.phone}}</view>
							<view class="text">{{item.web}}</view>
						</view>
					</view>
					<view class="footer">
						<view class="iconfont icon-bianji" @tap='bindcz'> 编辑</view>
						<view class="iconfont icon-lajitong" @tap='bindyx'> 删除</view>
					</view>
				</view>
			</view>
			<view class=""></view>
		</view>
		<navigator url="../addContact/index">
			<view class="ot-xf">
				<image :src="img+'tianjia.png'"></image>
			</view>
		</navigator>
	</view>
</template>

<script>
	import common from "../../../common/common.js"
	export default {
		data() {
			return {
				img: common.imageUrlPath,
				inputVal: '',
				inputShowed: false,
				contact: [{
					'id': 0,
					'photo': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2768436597,2328985158&fm=26&gp=0.jpg',
					'names': '吴某某',
					'gender': '女',
					'phone': '14956789456',
					'web': '销售',
				}, {
					'id': 1,
					'photo': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2768436597,2328985158&fm=26&gp=0.jpg',
					'names': '吴某某',
					'gender': '女',
					'phone': '14956789456',
					'web': '销售',
				}, {
					'id': 2,
					'photo': 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2768436597,2328985158&fm=26&gp=0.jpg',
					'names': '吴某某',
					'gender': '女',
					'phone': '14956789456',
					'web': '销售',
				}]
			}
		},
		methods: {
			bindcz(e) {
				uni.navigateTo({
					url: '../editContact/index',
				})
			},
			bindyx(e) {
				var index = e.currentTarget.dataset.id;
				var that = this;
				uni.showModal({
					title: '提示',
					content: '确认删除？',
					success: function(sm) {
						if (sm.confirm) {
							uni.showToast({
								title: "已确认!",
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
	page {
		background-color: #eee;
	}

	.icon-lajitong:before {
		content: "\e647";
	}

	.icon-bianji:before {
		content: "\e68f";
	}


	.searchbar-result {
		margin-top: 0;
		font-size: 28upx;
	}


	.footer .iconfont {
		font-size: 30upx !important;
	}

	/* 搜索列表名称 */

	.list_name {
		position: relative;
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		border-bottom: 1upx solid #ddd;
	}

	/* 列表名称 */

	.lab_name {
		position: absolute;
		left: 30upx;
	}

	.weui-search-bar {
		margin-top: 20upx;
		margin-left: 30upx;
		background-color: #fff;
		margin-right: 30upx;
		box-sizing: border-box;
		border-radius: 10upx;
		height: 65upx;
	}

	.weui-search-bar__box {
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
	}

	.weui-search-bar__box icon {
		line-height: 94upx;
		margin-left: 20upx;
		box-sizing: border-box;
	}

	.weui-icon-search_in-box {
		display: block;
		width: 40upx;
		line-height: 64upx;
		box-sizing: border-box;
		padding: 0px 20upx;
	}

	.icon-search {
		color: #ccc;

	}

	.weui-search-bar__input {
		cursor: auto;
		display: block;
		width: 100%;
		line-height: 65upx;
		text-overflow: clip;
		overflow: hidden;
		white-space: nowrap;
		font-family: UICTFontTextStyleBody;
		padding-left: 40upx;
		height: 65upx;
	}

	.mg-client-sa.grace-margin {
		margin-top: 20upx;
	}

	.footer view:nth-of-type(1) {
		border-right: 2upx solid #eee;
		color: #FF5722;
	}

	.footer view:nth-of-type(2) {
		color: #FF5722;
	}

	.weui-icon-clear icon {
		margin-right: 20upx;
	}

	.mg-client-mj.grace-margin {
		margin: 15upx;
		margin-left: 60upx;
		color: rgba(6, 98, 218, 0.788);
	}

	.mg-client-img {
		position: fixed;
		right: 0;
	}

	.mg-client-img navigator image {
		position: fixed;
		right: 40upx;
		width: 60upx;
		height: 60upx;
		bottom: 80upx;
	}

	.ot-xf {
		position: fixed;
		right: 35upx;
		bottom: 50upx;
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

	.grace-card-view .body .img {
		margin-top: 0px;
	}

	.title .ot-text {
		margin-left: 20upx;
		color: #858585 !important;
		font-size: 30upx !important;
	}

	.grace-card-view .body .desc .title {
		font-weight: 400;
	}

	.text {
		color: #858585
	}
</style>
