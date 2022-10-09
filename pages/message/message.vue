<template>

	<view class="message">
		<!-- 消息类别选择区 -->
		<view class="message-content">
			<view class="choice" @click="show_comments">我收到的评论</view>
			<view class="choice" @click="show_liked">我收到的点赞</view>
		</view>

		<!-- 预览展示区域 -->
		<view class="show">
			<uni-list>
				<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
				<uni-list-item direction="column" v-for="item in msgs" :key="item.userid">
					<!-- 通过header插槽定义列表的标题 -->
					<template v-slot:header>
						<view class="uni-note">{{item.username}}</view>
						<view class="uni-note" v-if="this.showWhat==='favor'"> 点赞了！</view>
					</template>
					<!-- 通过body插槽定义列表内容显示 -->
					<template v-slot:body>
						<view class="uni-list-box">
							<view class="uni-content">
								<view class="uni-title-sub uni-ellipsis-2" v-if="this.showWhat==='comment'">{{item.commenttext}}</view>
							</view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>

		</view>

	</view>
</template>

<script>
	//引入uni组件
	import uniList from '@/uni_modules/uni-list/components/uni-list/uni-list.vue';
	import uniListItem from '@/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue';
	import uniLoadMore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue';

	export default {

		components: {
			uniList,
			uniListItem,
			uniLoadMore
		},

		data() {
			return {
				showWhat: "comment",
			}
		},

		methods: {
			show_comments(){
				this.showWhat="comment";
				console.log("显示我收到的评论！");
			},
			show_liked(){
				this.showWhat="favor";
				console.log("显示我收到的点赞！");
			}
		},
		
		computed: {
			msgs() {
				console.log("msgs:")	
				console.log(this.$store.state.myMsgs);
				console.log(this.showWhat);
				return this.$store.state.myMsgs[this.showWhat];
			},
		},
		
		onShow(){
			this.$store.dispatch("getmsgs");
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

<style lang="scss" scoped>

	//页面样式
	.message {
		.message-content {
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

			.choice {
				height: 30px;
				border-left: 1px solid #999;
			}
		}
		
	}
</style>
