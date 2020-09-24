<template>
	<view class="">
		<view class="grace-body">
			<form @submit="formSubmit" class="grace-form grace-margin-top">
				<view class="grace-items">
					<view class="grace-label">运费</view>
					<input type="text" name="o.id" :value="v.id" v-show="false">
					<input type="text" name="sid" :value="l.sale_order_id" v-show="false">
					<input type="text" name="logisticsOrderId" :value="l.id" v-show="false">
					<input type="text" class="input" name="o.freight" placeholder="请输入运费" :value="v.freight" />
				</view>
				<view class="grace-items">
					<view class="grace-label">附加费</view>
					<input type="text" class="input" name="o.surcharge" placeholder="请输入附加费" :value="v.surcharge" />
				</view>
				<view class="grace-items">
					<view class="grace-label">物流公司</view>
					<view class="other">
						<picker @change="bindLogisticsChange" :value="logisticsIndex" :range="logistics" :range-key="'name'" name="logistics">
							<text>{{logistics[logisticsIndex].name}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">选择车辆</view>
					<view class="other">
						<picker @change="bindCarChange" :value="carIndex" :range="car" name="car" :range-key="'plate_no'">
							<text>{{car[carIndex].plate_no}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">选择司机</view>
					<view class="<oth></oth>er">
						<picker @change="bindDriverChange" :value="driverIndex" :range="driver" name="driver" :range-key="'name'">
							<text>{{driver[driverIndex].name}}</text>
						</picker>
					</view>
				</view>
				<view class="grace-items">
					<view class="grace-label">物流单号</view>
					<input type="text" class="input" name="o.logisticsFileNum" placeholder="请输入物流单号" :value="v.logistics_file_num" />
				</view>
				<view class="grace-items">
					<view class="grace-label">中石油/中石化单号</view>
					<input type="text" class="input" name="o.psNum" placeholder="请输入中石油/中石化单号" :value="v.ps_num" />
				</view>
				<view style="padding:22rpx 0;">
					<button formType="submit" type="primary" style="width:100%;">完成发货</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	var graceChecker = require("../../../../../graceUI/jsTools/graceChecker.js");
	var _self
	export default {
		data() {
			return {
				logisticsIndex: 0,
				logistics: [{
					name: '请选择'
				}],
				carIndex: 0,
				car: [{
					plate_no: "请选择"
				}],
				driverIndex: 0,
				driver: [{
					name: "请选择"
				}],
				carTmp: [{
					plate_no: "请选择"
				}],
				driverTmp: [{
					name: "请选择"
				}],
				v: [],
				rid: '',
				type: '',
				id: '',
				l: []
			}
		},
		onLoad(option) {

			_self = this
			_self.rid = option.rid
			_self.type = option.type
			_self.id = option.id
			uni.request({
				url: this.$webUrl + "/logistics/order/logisticsList",
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					_self.logistics = _self.logistics.concat(res.data)
				}
			})
			uni.request({
				url: this.$webUrl + "/logistics/order/delivery",
				data: {
					rid: _self.rid,
					type: _self.type,
					id: _self.id
				},
				header: {
					'Access-Token': uni.getStorageSync("token")
				},
				success(res) {
					var v = res.data.v
					var l = res.data.l
					for (var s in v) {
						if (v[s] == null) {
							v[s] = ""
						}
					}
					for (var s in l) {
						if (l[s] == null) {
							l[s] = ""
						}
					}
					_self.v = v
					_self.l = l
				}
			})
		},
		methods: {
			bindLogisticsChange: function(e) {
				this.logisticsIndex = e.detail.value
				var id = _self.logistics[_self.logisticsIndex].id
				uni.request({
					url: this.$webUrl + "/logistics/order/carList",
					data: {
						id: id
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.car = _self.carTmp.concat(res.data)
					}
				})
				uni.request({
					url: this.$webUrl + "/logistics/order/driverList",
					data: {
						id: id
					},
					header: {
						'Access-Token': uni.getStorageSync("token")
					},
					success(res) {
						_self.driver = _self.driverTmp.concat(res.data)
					}
				})

			},
			bindCarChange: function(e) {
				console.log(e);
				this.carIndex = e.detail.value
			},
			bindDriverChange: function(e) {
				console.log(e);
				this.driverIndex = e.detail.value
			},
			formSubmit: function(e) {
				//定义表单规则
				var rule = [{
					name: "logistics",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请选择物流公司"
				},{
					name: "car",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请选择车辆"
				},{
					name: "driver",
					checkType: "notnull",
					checkRule: "",
					errorMsg: "请选择司机"
				}]
				//进行表单检查
				var formData = e.detail.value;
				formData.type = _self.type
				var checkRes = graceChecker.check(formData, rule);
				formData["o.logisticsId"] = _self.logistics[_self.logisticsIndex].id
				formData["o.driverId"] = _self.driver[_self.driverIndex].id
				formData["o.plateNo"] = _self.car[_self.carIndex].plate_no
				if (checkRes) {
					this.$router.go(-1)
					uni.request({
						url: this.$webUrl + "/logistics/order/doDelivery",
						data: formData,
						header: {
							'Access-Token': uni.getStorageSync("token")
						},
						success(res) {
							if (res.data) {
								uni.showToast({
									title: '发货成功'
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
				}
			},
		}
	}
</script>

<style>
	.grace-body {
		box-sizing: border-box;
		padding: 0px 30rpx;
	}

	button {
		background-color: #FF5722 !important;
	}

	.grace-form .grace-items .grace-label {
		width: 236rpx;
	}

	.grace-form .grace-items {
		border: none;
	}
</style>
