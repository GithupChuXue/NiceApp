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
			<button @click="register">注册</button>
			<button @click="login">登录</button>
			<button @click="getUserinfo">获取用户信息</button>
			<button @click="updateUserinfo">更新信息</button>
			<button @click="updatePass">修改密码</button>
			<button @click="showall">显示所有内容</button>
			<button @click="showid">指定内容</button>
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
			register() {
				console.log("注册");
				uni.request({
					url:"http://127.0.0.1:8888/user/register",
					method:"POST",
					header: {'content-type': "application/x-www-form-urlencoded"},
					data: {
						username:"shenxin1",
						password:"1456655",
					},
					success: (res) => {
						console.log(res);
					},
				})
			},
			login(){
				console.log("登录");
				uni.request({
					url:"http://127.0.0.1:8888/user/login",
					method:"POST",
					header: {'content-type': "application/x-www-form-urlencoded"},
					data: {
						username:"shenxin",
						password:"1456655",
					},
					success: (res) => {
						console.log(res);
					},
				})
			},
			getUserinfo(){
				console.log("获取用户信息");
				uni.request({
					url:"http://127.0.0.1:8888/my/userinfo",
					method:"GET",
					header: {'Authorization':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2hlbnhpbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJzdGF0dXMiOjAsInNoYXJlIjpudWxsLCJsaWtlIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2NDc4Mjc2NywiZXhwIjoxNjY0ODE4NzY3fQ.RjvwGU1xKLLOmjUsh42p2XGQ2h144HQi1wI_kpYaRog"},
					success: (res) => {
						console.log(res);
					},
				})
			},
			updateUserinfo(){
				console.log("修改用户信息");
				uni.request({
					url:"http://127.0.0.1:8888/my/userinfo",
					method:"POST",
					header: {'content-type': "application/x-www-form-urlencoded", 'Authorization':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2hlbnhpbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJzdGF0dXMiOjAsInNoYXJlIjpudWxsLCJsaWtlIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2NDc4Mjc2NywiZXhwIjoxNjY0ODE4NzY3fQ.RjvwGU1xKLLOmjUsh42p2XGQ2h144HQi1wI_kpYaRog"},
					data: {
						nickname:"nickname",
						email:"123456789@qq.com",
					},
					success: (res) => {
						console.log(res);
					},
				})
			},
			updatePass(){
				console.log("修改用户密码");
				uni.request({
					url:"http://127.0.0.1:8888/my/updatepass",
					method:"POST",
					header: {'content-type': "application/x-www-form-urlencoded", 'Authorization':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2hlbnhpbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJzdGF0dXMiOjAsInNoYXJlIjpudWxsLCJsaWtlIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2NDc4Mjc2NywiZXhwIjoxNjY0ODE4NzY3fQ.RjvwGU1xKLLOmjUsh42p2XGQ2h144HQi1wI_kpYaRog"},
					data: {
						oldPassword: "1456655",
						newPassword: "123456789",
					},
					success: (res) => {
						console.log(res);
					},
				})
			},
			
			showall() {
				console.log("显示所有内容");
				uni.request({
					url:"http://127.0.0.1:8888/share/show",
					methods:"GET",
					header: {'content-type': "application/x-www-form-urlencoded", 'Authorization':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2hlbnhpbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJzdGF0dXMiOjAsInNoYXJlIjpudWxsLCJsaWtlIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2NDc4Mjc2NywiZXhwIjoxNjY0ODE4NzY3fQ.RjvwGU1xKLLOmjUsh42p2XGQ2h144HQi1wI_kpYaRog"},
					
					success: (res) => {
						console.log(res);
					}
				})
				
			},
			showid() {
				console.log("指定内容");
				uni.request({
					url:"http://127.0.0.1:8888/share/show/"+'14',
					methods:"GET",
					header: {'content-type': "application/x-www-form-urlencoded", 'Authorization':"bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInVzZXJuYW1lIjoic2hlbnhpbiIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJzdGF0dXMiOjAsInNoYXJlIjpudWxsLCJsaWtlIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY2NDc4Mjc2NywiZXhwIjoxNjY0ODE4NzY3fQ.RjvwGU1xKLLOmjUsh42p2XGQ2h144HQi1wI_kpYaRog"},
					success: (res) => {
						console.log(res);
					}
				})
				
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
