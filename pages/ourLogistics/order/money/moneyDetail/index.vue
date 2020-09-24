<template>
	<view class="">
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">基础信息</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单号:</view>
					<view class="demo7  grace-no-scale">{{info_sal.order_no}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">产品型号:</view>
					<view class="demo7  grace-no-scale">{{info_sal.area}},{{info_sal.code}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">订单类型:</view>
					<view class="demo7  grace-no-scale">{{info_sal.tax}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">单价:</view>
					<view class="demo7  grace-no-scale">{{info_sal.price}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">总金额:</view>
					<view class="demo7  grace-no-scale">{{info_r!=null?info_r.related_num*info_sal.price:info_sal.num*info_sal.price}}={{info_sal.price}} *{{info_r!=null?info_r.related_num:info_sal.num}}</view>
				</view>
			</view>
		</view>
		
		<view class="ot-Dtailes-host">
			<view class="grace-list hj">
				<view class="items">
					<view class="icons grace-icons iconfont icon-dingdan"></view>
					<view class="body">
						<view class="title">其它信息</view>
					</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">客户:</view>
					<view class="demo7  grace-no-scale">{{info_sal.customer_name}},</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">配货情况:</view>
					<view class="demo7  grace-no-scale"> {{info_r!=null?info_r.related_num:(info_sal.num-info_sal.remainder_num)}}/{{info_r!=null?info_r.related_num:info_sal.num}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">付款方式:</view>
					<view class="demo7  grace-no-scale">{{info_sal.trade_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">物流方式:</view>
					<view class="demo7  grace-no-scale">{{info_l!=null?info_l.transport_type:info_sal.transport_type}}</view>
				</view>
				<view class="grace-space-between">
					<view class="demo6">收货地址:</view>
					<view class="demo7  grace-no-scale">{{info_sal.transport_address}}</view>
			</view>
				</view>
		</view>
		<view class="ot-button">
			<button type="warn" @tap="handleClick" class="grace-button">
				下一步
			</button>
		</view>
	</view>
</template>

<script>
			var _self
	export default{

		data(){
			return{
				info:[],
				info_sal:[],
				info_r:[],
				info_l:[],
				rid:'',
				t:''
			}
		},
		onLoad(option) {
			_self = this
			var id = option.id
			_self.rid = id
			var t = option.t
			_self.t = t
			uni.request({
				url:this.$webUrl+"/logistics/preDetail",
				data:{id:id,t:t},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.info=res.data
					_self.info_sal=res.data.sal
					_self.info_r=res.data.r
					_self.info_l=res.data.l
				}
			})
		},
		methods:{
			handleClick(){
				uni.navigateTo({
					url: '../moneyLogistics/index?id='+_self.rid+"&t="+_self.t,
				});
			}
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderDetail.css";
</style>
