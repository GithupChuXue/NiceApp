<template>
	<view class="user">
		<view class="user-header">
			<view class="image">
				<image :src="require('../../images/squirrel.jpg')"></image>
			</view>
			<view class="userinfo">
				<view class="nickName">昵称：{{userInfo.nickname || ""}}</view>
				<view class="account">用户名：{{userInfo.username || ""}}</view>
				<view class="account">邮箱：{{userInfo.email || ""}}</view>
				<view class="singature">签名：{{userInfo.email || ""}}</view>
			</view>
		</view>
		<view class="user-content">
			<view class="item" @click="show_works">作品</view>
			<view class="item" @click="show_likes">点赞</view>
			<view class="item" @click="show_stars">收藏</view>
		</view>
		
		<button v-if="!token" v-show="scrollTop<=100" class="login" size="mini" type="warn" hover-class="button-hover"
			@click="login">请登录</button>
		<button v-if="token" v-show="scrollTop<=100" class="logout" size="mini" type="warn" hover-class="button-hover"
			@click="logout">退出登录</button>

		<button v-if="token" v-show="scrollTop<=100" class="changeUserInfo" size="mini" type="primary"
			hover-class="button-hover" @click="open">修改个人信息</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog title="更改密码" mode="input" message="成功消息" :duration="2000" :before-close="true"
				@close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
		
		<uni-list>
			<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
			<uni-list-item direction="column" v-for="(item,index) in mine" :key="item.shareid">
				<!-- 通过header插槽定义列表的标题 -->
				<template v-slot:header>
					<view class="uni-note">{{item.publisher}} {{item.time}}</view>
				</template>
				<!-- 通过body插槽定义列表内容显示 -->
				<template v-slot:body>
					<view class="uni-list-box">
						<view class="uni-content">
							<view class="uni-title-sub uni-ellipsis-2">{{item.title}}</view>
						</view>
						<view class="uni-thumb">
							<!-- 当前判断长度只为简单判断类型，实际业务中，根据逻辑直接渲染即可 -->
							<image :src="require(`../../api/image/${item.img}`)" mode="aspectFill"></image>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>

	</view>
</template>

<script>
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue';
	import {
		mapState
	} from "vuex"

	export default {
		components: {
			uniPopup,
			uniPopupDialog,
		},
		data() {
			return {
				// 页面互动的距离
				scrollTop: 0,
				token: uni.getStorageSync("token"),
				showWhat: "myWorks"
			}
		},
		methods: {
			// 退出登录
			logout() {
				console.log('退出')
				console.log('token:', this.token)
				const token = uni.removeStorageSync("token");
				if(!token){
					uni.navigateTo({
						url:"/pages/login/login"
					})
				}
				// console.log('token:', token)
			},
			login() {
				console.log("me页 去往登录页")
				uni.navigateTo({
					url: "/pages/login/login",
				})
			},
			open() {
				uni.navigateTo({
					url: "/pages/change_UserInfo/change_UserInfo"
				})
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
			show_works() {
				this.showWhat="myWorks";
				//this.$store.dispatch("getmyworks");
				console.log("显示我的作品！");
				console.log(this.$store.state.myWorks);
			},
			show_likes() {
				this.showWhat="myLikes";
				console.log("显示我的点赞！");
			}, 
			show_stars() {
				this.showWhat="collectList";
				//this.$store.dispatch("getcollectList");
				console.log("显示收藏内容！");
				console.log(this.$store.state.collectList);
			}
		},
		computed: {
			userInfo() {
				return this.$store.state.userInfo
			},
			mine() {
				console.log("mine:")
				console.log(this.showWhat);
				console.log(this.$store.state[this.showWhat])
				return this.$store.state[this.showWhat]
			}
		},
		onPageScroll: function(e) { //nvue暂不支持滚动监听，可用bindingx代替
			this.scrollTop = e.scrollTop;
		},
		onReachBottom: function(e) {},
		onShow(){
			this.$store.dispatch("getUserInfo");
			this.$store.dispatch("getcollectList");
			this.$store.dispatch("getmyworks");
			this.$store.dispatch("getmyLikes");
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

			.item {
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
