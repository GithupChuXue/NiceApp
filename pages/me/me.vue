<template>
	<view class="user">
		<view class="user-header">
			<view class="image">
				<image src="../../images/squirrel.jpg"></image>
			</view>
			<view class="userinfo">
				<view class="nickName">昵称：{{userinfo.nickname}}</view>
				<view class="account">账号：{{userinfo.username}}</view>
				<view class="singature">签名：{{userinfo.signature}}</view>
			</view>
		</view>
		<view class="user-content">
			<view class="works">作品</view>
			<view class="publish">点赞</view>
			<view class="publish">收藏</view>
			<view class="publish">喜欢</view>
		</view>
		<Nav></Nav>
		<Nav></Nav>
		<Nav></Nav>
		<Nav></Nav>
		<Nav></Nav>
		<Nav></Nav>
		<button v-show="scrollTop<=100" class="logout" size="mini" type="warn" hover-class="button-hover"
			@click="logout">退出登录</button>
	</view>
</template>

<script>
	import Nav from "../../components/nav/nav.vue";
	export default {
		components: {
			Nav
		},
		data() {
			return {
				userinfo: {
					nickname: "张三",
					username: "11223343",
					signature: "今天真是美好的一天",
				},
				// 页面互动的距离
				scrollTop: 0,
			}
		},
		methods: {
			// 退出登录
			logout() {
				const token = uni.removeStorageSync("token");
				console.log(token);
			}
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			this.scrollTop = e.scrollTop;
		},
		onReachBottom: function(e) {
			uni.request({
				url: "http://127.0.0.1:8888/my/userinfo",
				method: "GET",
				header: {
					'Authorization': `${uni.getStorageSync("token")}`
				},
				success: (res) => {
					if (res.data.status === 200) {
						console.log(res);
					}
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	.user {
		text-align: center;

		.image {
			position: relative;

			image {
				display: inline-block;
				width: 250rpx;
				height: 250rpx;
				border: 1px solid #999;
				margin-top: 100rpx;
				margin-bottom: 70rpx;
				border-radius: 50%;
			}
		}


		.userinfo {

			width: 700rpx;
			height: 300rpx;
			border-top: 8px solid #777;
			box-shadow: 0 0 5px #999;
			margin: 0 auto;
			text-align: center;
			display: flex;
			flex-direction: column;

			view {
				width: 100%;
				height: 150rpx;
				margin-left: -100rpx;
				margin-top: 25rpx;
			}
		}

		.user-content {
			width: 700rpx;
			line-height: 30px;
			border: 2px solid #999;
			margin: 0 auto;
			margin-top: 40rpx;
			display: flex;
			justify-content: space-around;
			margin-bottom: 50rpx;

			view {
				width: 50%;
			}

			view:hover {
				background-color: #999;
				color: white;
			}

			.publish {
				height: 30px;
				border-left: 1px solid #999;
			}
		}

		.logout {
			position: fixed;
			left: 75%;
			top: 90rpx;
		}
	}
</style>
