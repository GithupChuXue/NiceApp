<template>
	<view>
		<view class="content">
			<view class="item">内容</view>
			<view class="outer">
				<image mode="widthFix" src="../../images/beauty.webp"></image>
			</view>
			<view class="inner">
				<view class="inner-item">
					<uni-icons type="hand-up-filled"></uni-icons>
					点赞
				</view>
				<view class="inner-item">
					<uni-icons type="more"></uni-icons>
					评论
				</view>
				<view class="inner-item">
					<uni-icons type="heart-filled"></uni-icons>
					收藏
				</view>

				<view class="inner-item">
					<uni-icons type="redo"></uni-icons>
					转发
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		name: "nav",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
		width: 730rpx;
		height: 400rpx;
		border: 2px solid #999;
		margin: 30rpx auto;
		text-align: center;
		display: flex;
		flex-direction: column;

		.item {
			margin: 20rpx 0;
		}

		.outer {
			width: 200rpx;
			height: 180rpx;
			margin: 0 auto;
			border: #999 1px solid;

			image {
				margin: 0 auto;
				display: inline-block;
				width: 100%;
			}
		}

		.inner {
			position: relative;
			display: flex;
			justify-content: space-around;
			top: 70rpx;

		}
	}
</style>
