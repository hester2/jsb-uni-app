<template>
	<view class="">
		<view class="weui-search-bar">
			<view class="weui-search-bar__form">
				<view class="weui-search-bar__box">
					<icon class="weui-icon-search_in-box" type="search" size="14"></icon>
					<input type="text" class="weui-search-bar__input" placeholder="" v-model="vinput"/>
				</view>
			</view>
		</view>
		<view class="ot-edit-of">
			<view class="ot-host-fl" v-for="(item,index) in customer" :key="index">
				<view class="grace-space-between">
					<view class="demo6 ot-size">客户：{{item.customer}}</view>
					<view class="demo7 ">
						<image :src="img+'add0.png'" :data-id="item.id" @tap="handleClick"></image>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">联系人/电话：{{item.names}}/{{item.phone}}</view>
				</view>
				<view class="grace-space-between ot-edit-sart">
					<view class="demo6">客户来源：{{item.laiyuan}}</view>
					<view class="ot-edit-col">类型：{{item.type}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import common from "../../../../common/common.js"
	export default{
		data(){
			return{
				img:common.imageUrlPath,
				    customer:[
				      {
				        'id':0,
				        'customer':'厦门市华商有限公司',
				        'names':'许建',
				        'phone':'13545064278',
				        'laiyuan':'客户介绍',
				        'type':'企业'
				      }, {
				        'id':1,
				        'customer': '厦门市华商有限公司',
				        'names': '许建',
				        'phone': '13545064278',
				        'laiyuan': '客户介绍',
				        'type': '企业'
				      }, {
				        'id': 2,
				        'customer': '厦门市华商有限公司',
				        'names': '许建',
				        'phone': '13545064278',
				        'laiyuan': '客户介绍',
				        'type': '企业'
				      }
				    ]
			}
		},
		methods:{
			  handleClick(e) {
			    uni.navigateTo({
			      url: '../addDtaile/index',
			    })
			  },
		}
	}
</script>

<style>
	page{
	  background-color: #eee;
	}
	.weui-search-bar {
	  background-color: #fff;
	  margin: 25upx 30upx;
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
	  line-height: 64upx;
	  margin-left: 20upx;
	  box-sizing: border-box;
	}
	
	.weui-search-bar__input{
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
	.ot-edit-of{
	  box-sizing: border-box;
	  padding: 0px 30upx;
	
	}
	.ot-host-fl{
	  box-sizing: border-box;
	  padding: 5upx 20upx;
	  background-color: #fff;
	  margin-bottom: 25upx;
	  border-radius: 10upx;
	  box-shadow: 2upx 2upx 12upx #ccc;
	}
	.grace-space-between{
		height: 50upx;
		line-height: 50upx;
	  margin: 15upx 0px;
	}
	.grace-space-between .demo6{
	  color: #414040;
	}
	.ot-size{
	  font-size: 31upx;
	}
	.grace-space-between .demo7 image{
	  width: 50upx;
	  height: 50upx;
	}
	.ot-edit-sart{
	  justify-content: flex-start;
	}
	.ot-edit-col{
	  margin-left: 147upx;
	  color: #414040;
	}
</style>
