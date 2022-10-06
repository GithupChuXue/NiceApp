<template>
	<view class="user">
		<view class="user-header">
			<view class="image">
				<image src="../../images/squirrel.jpg"></image>
			</view>
			<view class="userinfo">
				<view class="nickName">昵称：{{$store.state.userInfo.nickname}}</view>
				<view class="account">用户名：{{$store.state.userInfo.username}}</view>
				<view class="account">邮箱：{{$store.state.userInfo.email}}</view>
				<view class="singature">签名：</view>
			</view>
		</view>
		<view class="user-content">
			<view class="works">作品</view>
			<view class="publish">点赞</view>
			<view class="publish">收藏</view>
			<view class="publish">喜欢</view>
		</view>
		<Nav></Nav>
		<button v-if="!token" v-show="scrollTop<=100" class="login" size="mini" type="warn" hover-class="button-hover"
			@click="login">请登录</button>
		<button v-if="token" v-show="scrollTop<=100" class="logout" size="mini" type="warn" hover-class="button-hover"
			@click="logout">退出登录</button>

		<button v-if="token" v-show="scrollTop<=100" class="changeUserInfo" size="mini" type="primary"
			hover-class="button-hover" @click="open">更改密码</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="更改密码" mode="input" message="成功消息" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>


	</view>
</template>

<script>
	import Nav from "../../components/nav/nav.vue";

	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue';
	import {
		mapState
	} from "vuex"

	export default {
		components: {
			Nav,
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				// 页面互动的距离
				scrollTop: 0,
				token: uni.getStorageSync("token"),
			}
		},
		onShow() {
			this.$store.dispatch("getUserInfo")
			console.log(this.$store.state.userInfo)
		},
		methods: {
			// 退出登录
			logout() {
				const token = uni.removeStorageSync("token");
				console.log(token);
			},
			login() {
				console.log("me页 去往登录页")
				uni.navigateTo({
					url: "/pages/login/login",
				})
			},
			open() {
				this.$refs.popup.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			close() {
				this.$refs.popup.close()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(newPassword) {
				this.$store.dispatch("changPassword", newPassword);
				console.log("派发了一个action", newPassword)
			},
		},
		computed: {
			userInfo() {
				this.$store.state.userInfo
			}
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			this.scrollTop = e.scrollTop;
		},
		onReachBottom: function(e) {}
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

		.login {
			position: fixed;
			background-color: #999;
			left: 75%;
			top: 90rpx;
		}

		.changeUserInfo {
			position: fixed;
			left: 10%;
			top: 90rpx;
		}

	}
</style>
