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
		// 获取某一个指定的内容
		getConllectInfo({
			commit
		}, config) {
			uni.request({
				url: `http://127.0.0.1:8888/share/show/${config.id}`,
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
				success(res) {
					if (res.data.status === 200) {
						commit("GetConllecInfo", conllectInfo)
					}
				}
			})
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
		// 发布评论
		PublishComments({
			commit
		}, config) {
			uni.requset({
				url: "http://127.0.0.1:8888/comment/upload",
				methods: "POST",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`,
				},
				data: {
					commentid: config.commentid, // 若对评论进行评论，其为对象评论的commentid；若对内容share进行评论，该参数为0。
					shareid: config.shareid, // 目标评论所在的内容或目标内容的shareid。
					commenttext: config.commenttext //评论内容
				},
			})
		},
		// 获取某一个评论的详细信息
		getCommentsInfo({
			commit
		}, id) {
			uni.requset({
				url: `http://127.0.0.1:8888/comment/show/${id}`, // id为评论的id，可直接进行拼接（替换:id）
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
