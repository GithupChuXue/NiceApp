import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({

	state: {
		token: uni.getStorageSync("token"),
		userInfo: {},
		List: [],
		myWorks: [],
		collectList: [],
		myLikes: [],
		myMsgs: {},
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
		//获取所有我的作品
		GetMyWorks(state, myworks) {
			state.myWorks = myworks;
		},
		// 获取所有收藏的
		GetcollectList(state, collectList) {
			state.collectList = collectList;
		},
		GetmyLikes(state, mylikes) {
			state.myLikes = mylikes;
		},
		GetmyMsgs(state, mymsgs) {
			state.myMsgs = mymsgs;
		},
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
		//读取所有我的作品
		getmyworks({
			commit
		}) {
			console.log("我发布的作品们！");
			uni.request({
				url:"http://127.0.0.1:8888/my/myshare",
				methods:"GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization':`${this.state.token}`
				},
				success(res) {
					if (res.data.status === 200) {
						console.log("我发布的作品们！");
						console.log(res.data.data);
						commit("GetMyWorks", res.data.data);
					}
				}
			})
		},
		
		// 读取所有收藏信息
		getcollectList({
			commit
		}) {
			uni.request({
				url: "http://127.0.0.1:8888/my/mycollection",
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
				success(res) {
					if (res.data.status === 200) {
						commit("GetcollectList", res.data.data)
					}
				}
			})
		},
		
		//读取所有我点赞的作品
		getmyLikes({
			commit
		}) {
			uni.request({
				url: "http://127.0.0.1:8888/my/myfavor",
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
				success(res) {
					if (res.data.status === 200) {
						commit("GetmyLikes", res.data.data)
					}
				}
			})
		},
		
		//读取消息列表
		getmsgs({
			commit
		}) {
			uni.request({
				url: "http://127.0.0.1:8888/my/mymessage",
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
				success(res) {
					if (res.data.status === 200) {
						commit("GetmyMsgs", res.data)
					}
				}
			})
		},
		
		// 获取某一个指定的内容
		getDetail({
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
						//commit("GetDetail", collectInfo)
					}
				}
			})
		},
		//更改密码
		changePassword({
			commit
		}, newPassword) {
			console.log("即将修改新密码");
			console.log(this.$password);
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
						console.log("修改成功！");
						uni.showToast({
							title: "修改密码成功",
						})
					}
				}
			})
		},
		// 更新用户信息
		updateUserInfo({
			commit
		}, ) {
			uni.request({
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
			uni.request({
				url: `http://127.0.0.1:8888/share/collect/${shareid}`, // id是内容的shareid
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
			})
		},
		//点赞内容
		getLiked({
			commit
		}, shareid) {
			uni.request({
				url: `http://127.0.0.1:8888/share/favor/${shareid}`, // id是内容的shareid
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
			})
		},
		// 获取发布信息
		getPublishInfo() {
			uni.request({
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
			uni.request({
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
			uni.request({
				url: `http://127.0.0.1:8888/comment/show/${id}`, // id为评论的id，可直接进行拼接（替换:id）
				methods: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization': `${this.state.token}`
				},
			})
		},
		//搜索包含指定字段的内容
		getResultsList({
			commit
		}, keyword) {
			uni.request({
				url: `http://127.0.0.1:8888/share/search/${keyword}`,
				method: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization':`${this.state.token}`
				},
				success: (res) => {
					if (res.data.status === 200) {
						console.log("搜索到结果:");
						console.log(res.data.data);
						//return Promise.resolve(true)
						return res.data.data
					}
				}
			});
		},
	}
})

export default store
