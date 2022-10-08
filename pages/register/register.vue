<template>
	<view class="login-content">
		<view class="login-title">
			注册
		</view>
		<view class="iphone">
			<input type="number" placeholder="输入手机号/用户名" :value="username" @input="clearInput" />
			<uni-icons type="closeempty" color="#808080" size="25" v-if="showClearIcon" @click="clearIcon"></uni-icons>
		</view>

		<view class="password">
			<!-- <input type="password" placeholder="输入密码" /> 要显示密码就不要设置type="password"-->
			<input placeholder="请输入密码" v-model="password" :password="showPassword" />
			<uni-icons type="eye-filled" color="#808080" size="25" @click="changePassword"></uni-icons>
		</view>
		<view class="test" v-if="type==1">
		</view>

		<view class="register-btn" @click="register">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: '', //手机号码
				password: '', //密码
				showPassword: true, //是否显示密码
				showClearIcon: false, //是否显示清除按钮
				token: '',
			}
		},

		methods: {
			// 显示隐藏密码
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			// 判断是否显示清除按钮
			clearInput: function(event) {
				this.username = event.detail.value;
				if (event.detail.value.length > 0) {
					this.showClearIcon = true;
				} else {
					this.showClearIcon = false;
				}
			},
			// 清除内容/隐藏按钮
			clearIcon: function() {
				this.username = '';
				this.showClearIcon = false;
			},
			// 下面是可以封装起来引入的部分
			// 判断是否是正确的手机号码
			isMobile(str) {
				let reg = /^1\d{10}$/;
				return reg.test(str)
			},
			// 去往注册页
			goRegister() {
				uni.navigateTo({
					url: "/pages/register/register",
				})
			},
			register() {
				console.log("去注册");
				console.log(this.username);
				console.log(this.password);
				uni.request({
					url: "http://47.92.120.204:8888/user/register",
					data: {
						username: this.username,
						password: this.password,

					},
					method: "POST",
					header: {
						'content-type': "application/x-www-form-urlencoded"
					},
					success: res => {
						console.log(res.data, status);
						if (res.data.status == 200) { //注册成功就执行下面这些代码
							uni.showToast({ //显示注册成功
								title: '注册成功',
								mask: true,
								duration: 100
							})
							uni.navigateTo({ //注册成功跳转登录页面
								url: '/pages/login/login',
							})

						} else {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
						}
					}
				})
			}
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

	.register-btn {
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
