<template>
	<view class="login-content">
		<view class="login-title">
			登录
		</view>
		<view class="iphone">
			<input type="number" placeholder="输入手机号/用户名" :value="username" @input="clearInput" />
			<uni-icons type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
		</view>

		<view class="password">
			<input placeholder="请输入密码" v-model="passsword" :password="showPassword" />
			<uni-icons type="eye-filled" color="#808080" size="25" @click="changePassword"></uni-icons>
		</view>
		<view class="footer">
			<navigator class="register-btn" url="/pages/register/register">没账号去注册</navigator>
		</view>
		<view class="login-btn" @click="Login">登录</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '', //手机号码
				passsword: '', //密码
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮
				token: '',

			}
		},

		methods: {
			// 显示隐藏密码
			changePassword() {
				this.showPassword = !this.showPassword;
			},
			// 判断是否显示清除按钮
			clearInput(event) {
				this.username = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 清除内容/隐藏按钮
			clearIcon() {
				this.username = '';
				this.showClearIcon = false;
			},
			// 切换登录的方式
			setLoginType(type) {
				this.type = type
			},
			// 密码登录
			Login() {
				let that = this
				//用户名不为空
				if (!that.username) {
					uni.showToast({
						title: '用户名不能为空',
						icon: 'none'
					})
					return false
				}
				// 当使用密码登录并且未输入密码时
				if (that.type == 2 && !that.passsword) {
					uni.showToast({
						title: '请输入密码',
						icon: 'none'
					})
					return false
				}
				uni.request({
					url: "http://47.92.120.204:8888/user/login",
					method: 'POST', // 请求方法
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					data: {
						username: that.username,
						password: that.passsword
					}, //发送的数据
					success: (res) => {
						if (res.data.status === 200) {
							//存储token
							that.token = res.data.token;
							// 将输入的密码存储起来 用于修改密码
							this.$passsword = that.passsword;
							uni.setStorageSync('token', that.token); // 将登录信息以token的方式存在硬盘中
							uni.switchTab({
								url: "/pages/index/index",
							})
							setTimeout(() => {
								uni.showToast({
									title: '登录成功',
									icon: 'none'
								})
							}, 50)

						} else {
							uni.showToast({
								title: '登录失败',
								icon: 'none'
							})
						}
					}
				})
			},
			// 下面是可以封装起来引入的部分
			// 判断是否是正确的手机号码
		},
		// 去往注册页
		goRegister() {
			uni.redirectTo({
				url: "/pages/register/register",
			})
		}
	}
</script>

<style scoped>
	.login-content {
		padding: 70px 10px 35px;
		text-align: center;
		color: #333333;
	}

	.login-title {
		font-size: 26px;
		font-weight: bold;
		margin-bottom: 31px;
	}

	.login-content input {
		height: 50px;
		background: #F8F8F8;
		border-radius: 25px;
		text-align: left;
		padding: 15px;
		box-sizing: border-box;
		font-size: 15px;
	}

	.iphone,
	.password,
	.test {
		position: relative;
		margin-bottom: 30px;
	}

	.iphone .uni-icons,
	.password .uni-icons {
		position: absolute;
		top: 14px;
		right: 30px;
	}

	.test-btn,
	.password-btn {
		color: #46595f;
		font-size: 15px;
		text-align: right;
	}

	.footer {
		top: -15px;
		display: flex;
		justify-content: space-between;
	}

	.register-btn {
		margin-left: 20px;
		text-align: left;
		color: #46595f;

	}


	.getTest {
		color: #46595f;
		font-size: 15px;
		width: 122px;
		height: 50px;
		border: 1px solid #46595f;
		border-radius: 25px;
		line-height: 50px;
	}

	.test {
		display: flex;
		justify-content: space-between;
	}

	.login-btn {
		width: 355px;
		height: 45px;
		background: #46595f;
		border-radius: 36px;
		color: #fff;
		font-size: 20px;
		text-align: center;
		line-height: 45px;
		position: fixed;
		bottom: 60px;
	}
</style>
