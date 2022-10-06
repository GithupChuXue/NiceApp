import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({

	state: {
		token: uni.getStorageSync("token"),
		userInfo: {},
		List: [],
		conllectList: [],
		conllectInfo: [],

	},
	mutations: {
		//获取用户信息
		GetUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		},
		// 读取所有内容
		GetAllinInfo(state, List) {
			state.List = List;
		},
		// 获取所有收藏的
		GetConllectList(state, conllectList) {
			state.conllectList = conllectList;
		},
		// 获取收藏的详细信息
		GetConllecInfo(state, conllectInfo) {
			state.conllectInfo = conllectInfo;
			console.log("state中的conllectInfo", state.conllectInfo);
		}

	},
	actions: {
		// 获取用户信息
		getUserInfo({
			commit
		}) {
			uni.request({
				url: "http://127.0.0.1:8888/my/userinfo",
				method: "GET",
				header: {
					'Authorization': `${this.state.token}`,
				},
				success: (res) => {
					if (res.data.status === 200) {
						commit("GetUserInfo", res.data.data);
					}
				}
			})
		},
		// 读取所有在线内容
		getAllinInfo({
			commit
		}) {
			uni.request({
				url: "http://127.0.0.1:8888/share/show",
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
				success(res) {
					if (res.data.status === 200) {
						commit("GetAllinInfo", res.data.data)
					}
				}
			});


		},

		// 读取所有收藏信息
		getConllectList({
			commit
		}) {
			uni.request({
				url: "http://127.0.0.1:8888/my/mycollection",
				methods: "GET",
				header: {
					//'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
				success(res) {
					if (res.data.status === 200) {
						commit("GetConllectList", res.data.data)
					}
				}
			})
		},
		// 获取全部收藏的内容
		getConllectInfo({
			commit
		}) {
			let conllectInfo = [];

			this.state.conllectList.forEach((item) => {
				if (item.shareid) {
					uni.request({
						url: `http://127.0.0.1:8888/share/show/${item.shareid}`,
						methods: "GET",
						header: {
							'content-type': "application/x-www-form-urlencoded",
							'Authorization': `${this.state.token}`
						},
						success(res) {
							if (res.data.status === 200) {
								conllectInfo.push(res.data.data);
								// console.log(conllectInfo)
							}
						}
					})
				}

			});
			commit("GetConllecInfo", conllectInfo)
		},
		//更改密码
		changPassword({
			commit
		}, newPassword) {
			uni.request({
				url: "http://127.0.0.1:8888/my/updatepass",
				method: "POST",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
				data: {
					oldPassword: this.$password,
					newPassword: newPassword,
				},
				success(res) {
					if (res.data.status === 200) {
						uni.showToast({
							title: "修改密码成功",
						})
					}
				}
			})
		},
		// 更新用户信息

		updateUserInfo() {
			uni.requset({
				url: "http://127.0.0.1:8888/my/userinfo",
				method: "POST",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`,
				},
				data: {
					nickname: "nickname",
					email: "123456789@qq.com",
				},
			})

		},
		// 收藏内容
		getStar({
			commit
		}, shareid) {
			uni.requset({
				url: `http://127.0.0.1:8888/share/collect/${shareid}`, // id是内容的shareid
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
			})
		},

		// 获取发布信息

		getPublishInfo() {
			uni.requset({
				url: "http://127.0.0.1:8888/my/myshare",
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
			})
		},
	}
})

export default store
