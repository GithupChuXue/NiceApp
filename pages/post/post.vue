<template>
	<view class="post">
		<view class="post_detail">
			<view>
				<input class="title" type="text" placeholder="标题">
				<input class="body" type="text" placeholder="写点什么">
			</view>
			<view>
				<view class="tag">@某位用户</view>
				<view class="tag">#话题</view>
				<button class="upload" type="default" plain size="mini" form-type="submit">上传图片</button>
				<button class="postout" type="default" plain size="mini" form-type="submit">发布</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	@import '@/myStyle.scss';

	//页面样式
 	.post {
		vertical-align: middle;
		.post_detail{
			.title{
				border-radius: 10rpx;
				margin-top: 10rpx;
				margin-left: 50rpx;
				width: 80%;
				text-align: center;
				padding: 20rpx 0rpx;
				background-color: #FFF8DC;
			}
			.body{
				border-radius: 10rpx;
				margin-top: 20rpx;
				margin-left: 50rpx;
				width: 80%;
				height: 400rpx;
				text-align: center;
				background-color: #FFF8DC;
			}
			.tag{
				display: block;
				margin-left: 50rpx;
				margin-top: 20rpx;
				color: #EE7621;
			}
			.upload{
				float: left;
				width: 25%;
				margin-top: 20rpx;
				margin-left: 50rpx;
				padding: 10rpx 0rpx;
				background-color: #EE7621;
				border: none;
				color: #FFFFFF;

			}
			.postout{
				float: left;
				width: 25%;
				margin-top: 20rpx;
				margin-left: 150rpx;
				padding: 10rpx 0rpx;
				background-color: #EE7621;
				border: none;
				color: #FFFFFF;
			}
		}
	} 
</style>
