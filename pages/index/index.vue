<template>
	<view class="home">
		<!-- 顶部轮播区 -->
		<swiper indicator-dots circular autoplay>
			<swiper-item>
				<uni-dateformat :date="timer" class="date" style="color:aqua;font-size: 60rpx;"></uni-dateformat>
			</swiper-item>
			<swiper-item>
				<image src="../../images/squirrel.jpg" scaleToFill></image>
			</swiper-item>
			<swiper-item>
				<image src="../../images/rabbit.jpg" scaleToFill></image>
			</swiper-item>

		</swiper>
		<!-- 中部区域 -->
		<view class="center">
			<view id="1" class="center-item">模块1</view>
			<view id="2" class="center-item">模块2</view>
		</view>
		<view class="footer">

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: " ",
			}
		},
		onLoad() {

		},
		created() {
			var nt = this.getTime();
			console.log(nt);
		},
		methods: {
			getTime() {
				setInterval(() => {
					this.timer = Date.now()
				}, -1000)
			},

		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 400rpx;
			border: 1px #3a4c52 solid;
			border-radius: 30rpx;
			box-shadow: 0 0 5px #3a4c52;
			margin-top: 10px;

			swiper-item {
				text-align: center;
				line-height: 400rpx;

				uni-dateformat {
					font-size: 100px;
					color: #b8ecf9;
				}
			}

			image {
				width: 100%;
			}


		}

		.center {
			width: 730rpx;
			height: 300rpx;
			border: 1px #b8ecf9;
			box-shaow: solid;
			margin: 30rpx 10rpx auto;
			border-radius: 30rpx;
			box-shadow: 0 0 10px #3a4c52;
			z-index: 999;
			display: flex;
			justify-content: space-around;

			.center-item {
				width: 300rpx;
				height: 250rpx;
				margin-top: 15px;
				border: 2px solid #3a4c52;
				text-align: center;
				line-height: 250rpx;
				box-shadow: 0 0 10px #3a4c52;
				border-radius: 40px;
			}

			.content-item {
				color: #b8ecf9;
				box-shadow: 0 0 10px #b8ecf9;
			}

		}

	}
</style>
