<template>
	<view class="grace-body">
		<view class="ot-menu-color">
			<view class="ot-profile-ma">
				<view class="ot-profile-left">
					<image :src="imgs" mode=""></image>
				</view>
				<view class="ot-profile-right">
					<text>{{names}}</text>
					<text>{{phoneno}}</text>
				</view>
			</view>
		</view>
		<view class="ot-bg"></view>
		<view class="grace-accordion grace-margin-top">
			<!-- 项目2 -->
			<view class="grace-accordion-items">
				<view :class="[accordionActive == 'grace-accordion-1' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
				 id="grace-accordion-1" @tap="changeAccordion">
					<text class="ot-home-qx"></text>
					<text class="ot-home-ql">主页</text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-up" v-if="accordionActive == 'grace-accordion-1'"></text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-down" v-else></text>
				</view>
				<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-1'">
					<view class="grace-list">
						<navigator class="items" url="../main/console/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-zonghekongzhitai"></view>
							<view class="body">
								<view class="title">控制台</view>
							</view>
							<!-- <view class="arrow-right"></view> -->
						</navigator>
					</view>
				</view>
			</view>
			<view class="grace-accordion-items">
				<view :class="[accordionActive == 'grace-accordion-2' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
				 id="grace-accordion-2" @tap="changeAccordion">
					<text class="ot-home-qx"></text>
					<text class="ot-home-ql">财务</text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-up" v-if="accordionActive == 'grace-accordion-2'"></text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-down" v-else></text>
				</view>
				<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-2'">
					<view class="grace-list">
						<navigator class="items" url="../financial/receivableList/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-baojia"></view>
							<view class="body">
								<view class="title">应收账款</view>
							</view>
							<!-- <view class="arrow-right"></view> -->
						</navigator>
					</view>
					<view class="grace-list">
						<navigator class="items" url="../financial/payableList/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-baojia"></view>
							<view class="body">
								<view class="title">应付账款</view>
							</view>
							<!-- <view class="arrow-right"></view> -->
						</navigator>
					</view>
				</view>
			</view>
			<view class="grace-accordion-items">
				<view :class="[accordionActive == 'grace-accordion-3' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
				 id="grace-accordion-3" @tap="changeAccordion">
					<text class="ot-home-qx"></text>
					<text class="ot-home-ql">订单管理</text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-up" v-if="accordionActive == 'grace-accordion-3'"></text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-down" v-else></text>
				</view>
				<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-3'">
					<view class="grace-list">
						<navigator class="items" url="../order/procurement/procurementList/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-dingdan1 icon-dingdan fo"></view>
							<view class="body">
								<view class="title">采购订单</view>
							</view>
							<!-- <view class="arrow-right"></view> -->
						</navigator>
					</view>
					<view class="grace-list">
						<navigator class="items" url="../order/sales/salesList/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-dingdan1 icon-dingdan fe"></view>
							<view class="body">
								<view class="title">销售订单</view>
							</view>
						</navigator>
					</view>
					<view class="grace-list">
						<navigator class="items" url="../order/money/moneyList/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-dingdan1 icon-dingdan fs"></view>
							<view class="body">
								<view class="title">预付款订单</view>
							</view>
						</navigator>
					</view>
				</view>
			</view>
			<view class="grace-accordion-items">
				<view :class="[accordionActive == 'grace-accordion-4' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
				 id="grace-accordion-4" @tap="changeAccordion">
					<text class="ot-home-qx"></text>
					<text class="ot-home-ql">报表管理</text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-up" v-if="accordionActive == 'grace-accordion-4'"></text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-down" v-else></text>
				</view>
				<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-4'">
					<view class="grace-list">
						<navigator class="items" url="../report/dailySales/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-lirun icon-baobiao"></view>
							<view class="body">
								<view class="title">每日销售报表</view>
							</view>
							<!-- <view class="arrow-right"></view> -->
						</navigator>
					</view>
					<view class="grace-list">
						<navigator class="items" url="../profits/profitsList/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-lirun icon-baobiao"></view>
							<view class="body">
								<view class="title">每日采购报表</view>
							</view>
							<!-- <view class="arrow-right"></view> -->
						</navigator>
					</view>
				</view>
			</view>
			<view class="grace-accordion-items">
				<view :class="[accordionActive == 'grace-accordion-5' ? 'grace-accordion-title grace-current' : 'grace-accordion-title']"
				 id="grace-accordion-5" @tap="changeAccordion">
					<text class="ot-home-qx"></text>
					<text class="ot-home-ql">来款管理</text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-up" v-if="accordionActive == 'grace-accordion-5'"></text>
					<text class="grace-list-imgs-arrow grace-icons icon-arrow-down" v-else></text>
				</view>
				<view class="grace-accordion-body" v-if="accordionActive == 'grace-accordion-5'">
					<view class="grace-list">
						<navigator class="items" url="../record/recordList/index" hover-class="none">
							<view class="icons grace-icons iconfont icon-gongyingshangguanli-"></view>
							<view class="body">
								<view class="title">来款记录</view>
							</view>
							<!-- <view class="arrow-right"></view> -->
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../../common/common.js'
	export default {
		data() {
			return {
				imgs: common.imgs,
				names: common.names,
				phoneno: common.phoneno,
				accordionActive: "grace-accordion-1"
			}
		},
		methods: {
			changeAccordion: function(e) {
				var accordionIndex = e.currentTarget.id;
				if (this.accordionActive == accordionIndex) {
					accordionIndex = '';
				}
				this.accordionActive = accordionIndex;
			}
		}
	}
</script>

<style>
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-baobiao:before {
		content: "\e60e";
	}

	.icon-kucun:before {
		content: "\e638";
	}

	.icon-shuidi:before {
		content: "\e613";
	}

	.icon-dingdan1:before {
		content: "\e608";
	}

	.icon-zonghekongzhitai:before {
		content: "\e661";
	}

	.icon-Futures_trade:before {
		content: "\e622";
	}

	.icon-chanpin:before {
		content: "\e639";
	}

	.icon-navicon-hzsp:before {
		content: "\e601";
	}

	.icon-baojia:before {
		content: "\e714";
	}

	.icon-wuliuguanli:before {
		content: "\e614";
	}

	.icon-ding_dan:before {
		content: "\e604";
	}

	.icon-baobiao1:before {
		content: "\e606";
	}

	.icon-kehuguanli:before {
		content: "\e621";
	}

	.icon-tubiao_baojia:before {
		content: "\e648";
	}

	.icon-icon_hangyezhishu:before {
		content: "\e61f";
	}

	.icon-cangkuguanli_xian:before {
		content: "\e623";
	}

	.icon-gongyingshangguanli-:before {
		content: "\e61c";
	}

	.icon-lirun:before {
		content: "\e691";
	}

	/* end */
	view,
	text {
		font-size: 32upx;
	}

	.grace-body {
		width: 100%;
		padding: 0px;
		box-sizing: border-box;
	}

	.grace-margin-top {
		margin-top: 0px;
	}

	.ot-bg {
		background-color: #eee;
		height: 20upx;
	}

	.ot-home-qx {
		width: 3px;
		height: 20px;
		display: block;
		/* background-color: #009E94; */
		margin-right: 10px;
	}

	.ot-home-ql {
		flex: 10;
	}

	.grace-accordion-title {
		justify-content: flex-start;
		padding: 0px;
		width: 100%;
		box-sizing: border-box;
		padding-right: 25upx;
		align-items: center;
	}

	.grace-list {
		box-sizing: border-box;
		padding: 0px 30upx;
	}

	.grace-list .items {
		/* border-bottom:1px solid #e0e0e0; */
	}

	.grace-list .items .body {
		margin-left: 8px;
	}

	.icon-zonghekongzhitai {
		color: #17A0FD;
		font-weight: bold;
	}

	.icon-baojia {
		color: #17A0FD;
		font-weight: bold;
	}

	.icon-tubiao-baojia {
		color: #F395A7;
		font-weight: bold;
	}

	.fo {
		color: #17A0FD;
		font-weight: bold;
	}

	.fe {
		color: #F395A7;
		font-weight: bold;
	}

	.fs {
		color: #FF634F;
		font-weight: bold;
	}

	.fx {
		color: #FCA493;
		font-weight: bold;
	}

	.icon-kucun {
		color: #957DEA;
		font-weight: bold;
	}

	.icon-navicon-hzsp {
		color: #59D8A1;
		font-weight: bold;
	}

	.icon-lirun2 {
		color: #17A0FD;
		font-weight: bold;
	}

	.icon-gongyingshangguanli- {
		color: #17A0FD;
		font-weight: bold;
	}

	.icon-kehuguanli {
		color: #F395A7;
		font-weight: bold;
	}

	.icon-chanpinguanli {
		color: #17A0FD;
		font-weight: bold;
	}

	.icon-cangkuguanli- {
		color: #17A0FD;
		font-weight: bold;
	}

	.icon-wuliuguanli {
		color: #F395A7;
		font-weight: bold;
	}

	.icon-baobiao {
		color: #17A0FD;
		font-weight: bold;
	}

	.icon-baobiao1 {
		color: #F395A7;
		font-weight: bold;
	}

	.ot-menu-color {
		background-color: #fff;
		box-sizing: border-box;
		padding: 10upx 20upx;
	}

	.ot-profile-ma {
		width: 100%;
		overflow: hidden;
		/* background-color: pink; */
		display: flex;
		flex-direction: row;
		box-sizing: border-box;
		padding: 10upx 0 10upx 20upx;
		color: #e5015a !important;
		position: relative;
		color: #fff;
	}

	.ot-profile-left {
		border-radius: 50%;
		width: 120upx;
		height: 120upx;
		overflow: hidden;
		color: #000;
	}

	.ot-profile-left image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.ot-profile-right {
		display: flex;
		flex-direction: column;
		margin-left: 25upx;
		color: #000;
		box-sizing: border-box;
		padding-top: 5upx;
	}

	.ot-profile-right text {
		font-size: 30upx;
		color: #2E2E2E;
	}

	.grace-list>.items>.body>.title {
		font-size: 30upx;
	}
</style>
