<template>
	<view class="">
		<view class="ot-Dtailes-host">
		  <view class="grace-list hj">
		    <view class="grace-body">
		      <form @submit="formSubmit" class="grace-form grace-margin-top">
		        <view class="grace-items ot-dtaile-fo">
		          <view class="grace-label">开票公司</view>
		          <input type="text" class="input" name="kaipiao" value="" disabled/>
		        </view>
		        <view class="grace-items ot-dtaile-fo">
		          <view class="grace-label">税号</view>
		          <input type="text" class="input" name="shuihao" value="" disabled/>
		        </view>
		        <view class="grace-items ot-dtaile-fo">
		          <view class="grace-label">联系人</view>
		          <input type="text" class="input" name="name" value="" disabled/>
		        </view>
		        <view class="grace-items ot-dtaile-fo">
		          <view class="grace-label">电话</view>
		          <input type="text" class="input" name="phone" value="" disabled/>
		        </view>
		        <view class="grace-items ot-dtaile-fo">
		          <view class="grace-label">开户行</view>
		          <input type="text" class="input" name="kaihu" value="" disabled/>
		        </view>
		        <view class="grace-items ot-dtaile-fo">
		          <view class="grace-label">账号</view>
		          <input type="text" class="input" name="" value="" disabled/>
		        </view>
		        <view class="grace-items grace-noborder">
		          <view class="grace-label">收件地址</view>
		          <input type="text" class="input" value="" name="address" disabled></input>
		        </view>
		        <view class="grace-items grace-noborder">
		          <view class="clien other">
		            <textarea placeholder="请输入开票要求内容..." disabled name="desc"></textarea>
		          </view>
		        </view>
					<view style="padding:22upx 0;">
						<button  @tap="handleClick" type="primary">下一步</button>
					</view>
		      </form>
		    </view>
		  </view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			  handleClick() {
			    uni.navigateTo({
			      url: '../salesContract/index'
			    })
			  },
		}
	}
</script>

<style>
	@import "../../../../../common/css/orderInvoice.css";
</style>
