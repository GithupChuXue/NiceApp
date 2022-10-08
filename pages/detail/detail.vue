<template>
	
	<view class="detail">
		
		<!-- 内容展示区域 -->
		<view class="content">
				<view class="uni-note">{{content.publisher}} {{content.time |myFilter}}</view>
			
				<view class="imgShared">
					<image :src="require(`../../api/image/${content.img}`)"></image>
				</view>
				
				<view class="textShared">{{content.text}}</view>
		</view>
			
		<!-- 评论展示区域 -->
		<view class="comments">
			<uni-list>
				<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
				<uni-list-item direction="column" v-for="item in comments" :key="item.commentid">
					<!-- 通过header插槽定义列表的标题 -->
					<template v-slot:header>
						<view class="uni-note">{{item.userid}}</view>
					</template>
					<!-- 通过body插槽定义列表内容显示 -->
					<template v-slot:body>
						<view class="uni-list-box">
							<view class="uni-content">
								<view class="uni-title-sub uni-ellipsis-2">{{item.commenttext}}</view>
							</view>	
						</view>
					</template>
					<!-- 同步footer插槽定义列表底部的显示效果 -->
					<template v-slot:footer>
						<view class="uni-footer">
							<text class="uni-footer-text">删除</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<!-- 通过loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
			<!-- <uni-load-more v-if="loading || options.status === 'noMore'" :status="options.status" /> -->
			<uni-load-more :status="status" :icon-size="10" :content-text="contentText" v-if="this.status!='more'"/>
		</view>

	</view>
</template>

<script>
	//引入uni组件
	import uniList from '@/uni_modules/uni-list/components/uni-list/uni-list.vue';
	import uniListItem from '@/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue';
	import uniLoadMore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue';
	import read from '../../services/read.js';	
	
	export default {
		
		components:{
			uniList,
			uniListItem,
			uniLoadMore
		},
		
		data() {
			return {
				id : 0,
				content: {},
				comments: [],
				status: "more",
				contentText: {
					contentdown: "更多精彩",
					contentrefesh: "加载中",
					contentnomore: "暂无新消息提醒"
				}
			}
		},
		
		methods: {
			ThumbsUp(id, index) {
				this.$refs.popup_thumbsup[index].open()
			},
			// 
			Collect(id, index) {
				// 派发收藏的action
				this.$store.dispatch("getStar", id)
				this.$refs.popup_collect[index].open();
			},
			Comment(id, index) {
				this.$refs.inputDialog[index].open()
			},
			confirm(value) {
				console.log(value);
			},
			Share(id, index) {
				this.$refs.share[index].open()
			},
		},
		
		onLoad (option) {
			this.id = option.id;
			uni.request({
				url: `http://127.0.0.1:8888/share/show/${this.id}`,
				method: "GET",
				header: {
					'content-type': "application/x-www-form-urlencoded",
					'Authorization':`${this.$store.state.token}`
				},
				success: (res) => {
					if (res.data.status === 200) {
						console.log("打开详情页:");
						console.log(res.data);
						this.content = res.data.shareData;
						this.comments = res.data.commentData;
					}
				}
			});
		},
		
		//下拉刷新回调函数
		onPullDownRefresh() {
			console.log("上拉刷新");
		},
		
		//上拉加载回调函数
		onReachBottom() {
			console.log("上拉加载");
		}
	}
	
	

</script>

<style lang="scss">
	@import '@/myStyle.scss';
	
	//页面样式
	
 	.detail {
		vertical-align: middle;
		//预览区
		.show {
			width: 100%;
			background-color: #c6c6c6;
		}
	} 
</style>