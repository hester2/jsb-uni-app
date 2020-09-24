<template>
	<view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 600px;" :latitude="latitude" :longitude="longitude" :markers="covers">
					<!-- <cover-view class="test" @tap="fr">点击获取当前位置{{address}}</cover-view> -->
				</map>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '',
					callout: {
						content: '北京',
						color: '#000',
						bgColor: '#fff',
						textAlign: 'left',
						display: 'ALWAYS'

					}
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: ''
				}],
				address: '',
			}
		},
		created() {

		},
		methods: {
			fr() {
				// H5：无 GPS 模块的 PC 设备使用 Chrome 浏览器的时候，位置信息是连接谷歌服务器获取的，国内用户可能获取位置信息失败。
				uni.getLocation({
					type: 'wgs84',
					// geocode:true,//把返回结果传递给 <map>
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						console.log(res.address)
						this.address = res.address
					}
				});

			}
		}
	}
</script>
