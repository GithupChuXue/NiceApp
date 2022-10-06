<template>
	<view class="post">
		<view class="post_detail">
			<view>
				<input class="title" type="text" placeholder="标题" v-model="title">
				<input class="body" type="text" placeholder="写点什么" v-model="content">
			</view>
			<view>
				<view class="tag">@某位用户</view>
				<view class="tag">#话题</view>
				<button class="upload" type="default" plain size="mini" form-type="submit"
					@click="getImage">上传图片</button>
				<button class="postout" type="default" plain size="mini" form-type="submit"
					@click="uploadeShare">发布</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				content: '',
				imagePaths: '',
			}
		},
		methods: {
			// // 上传图片
			getImage() {
				console.log("拿取图片")
				uni.chooseImage({
					count: 3,
					sizeType: "original",
					success: (res) => {
						this.imagePaths = res.tempFilePaths
						console.log(res) //取到图像
						console.log('成功取出图像')
					}
				})
			},
			// 发布内容
			uploadeShare() {
				console.log("上传内容");
				uni.uploadFile({
					url: 'http://127.0.0.1:8888/share/upload', // 接口地址
					file: this.imagePaths[0], //选取图像序列中的第一张，后端是一张一张传
					name: this.title, // name：必须为img
					fileType: 'image', //类型为image
					header: {
						'Authorization': `${this.$store.token}`
					},
					method: "POST",
					formData: {
						'title': this.title, //内容的文字标题
						'text': this.content, // 分享的文字内容
					},
					success: (res) => {
						console.log(res.data); //res为发布成功的提示
					}
				});
			},

		},
	}
</script>

<style lang="scss">
	@import '@/myStyle.scss';

	//页面样式
	.post {
		vertical-align: middle;

		.post_detail {
			.title {
				border-radius: 10rpx;
				margin-top: 10rpx;
				margin-left: 50rpx;
				width: 80%;
				text-align: center;
				padding: 20rpx 0rpx;
				background-color: #FFF8DC;
			}

			.body {
				border-radius: 10rpx;
				margin-top: 20rpx;
				margin-left: 50rpx;
				width: 80%;
				height: 400rpx;
				text-align: center;
				background-color: #FFF8DC;
			}

			.tag {
				display: block;
				margin-left: 50rpx;
				margin-top: 20rpx;
				color: #EE7621;
			}

			.upload {
				float: left;
				width: 25%;
				margin-top: 20rpx;
				margin-left: 50rpx;
				padding: 10rpx 0rpx;
				background-color: #EE7621;
				border: none;
				color: #FFFFFF;

			}

			.postout {
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
