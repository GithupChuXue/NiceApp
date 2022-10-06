<template>

	<view class="index">

		<!-- 预览展示区域 -->
		<view class="show">
			<uni-list>
				<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
				<uni-list-item direction="column" v-for="item in content" :key="item.id"
					:to="'/pages/detail/detail?id='+item.id">
					<!-- 通过header插槽定义列表的标题 -->
					<template v-slot:header>
						<view class="uni-note">{{item.user}} {{item.pub_time}}</view>
					</template>
					<!-- 通过body插槽定义列表内容显示 -->
					<template v-slot:body>
						<view class="uni-list-box">
							<view class="uni-content">
								<view class="uni-title-sub uni-ellipsis-2">{{item.excerpt}}</view>
							</view>
						</view>
					</template>
					<!-- 同步footer插槽定义列表底部的显示效果 -->
					<template v-slot:footer>
						<view class="uni-footer">
							<text class="uni-footer-text">回复</text>
							<text class="uni-footer-text">删除</text>
							<text class="uni-footer-text">此人不再提醒</text>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<!-- 通过loadMore 组件实现上拉加载效果，如需自定义显示内容，可参考：https://ext.dcloud.net.cn/plugin?id=29 -->
			<!-- <uni-load-more v-if="loading || options.status === 'noMore'" :status="options.status" /> -->
			<uni-load-more :status="status" :icon-size="10" :content-text="contentText" v-if="this.status!='more'" />
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

		components: {
			uniList,
			uniListItem,
			uniLoadMore
		},

		data() {
			return {
				content: read.read_local("../static/data_test/data_local_message.json"),
				status: "more",
				contentText: {
					contentdown: "更多精彩",
					contentrefesh: "加载中",
					contentnomore: "暂无新消息提醒"
				}
			}
		},

		methods: {

		},

		//下拉刷新回调函数
		onPullDownRefresh() {
			console.log("上拉刷新");
			this.content = read.read_local("../static/data_test/data_local_message.json");
			console.log("上拉刷新已完成");
		},

		//上拉加载回调函数
		onReachBottom() {
			console.log("上拉加载");
			var temp = read.read_local("../static/data_test/data_local_message.json");
			if (temp) {
				this.status = "loading";
				this.content = this.content.concat(temp);
			} else {
				this.status = "noMore";
				console.log("没有新内容了");
			}
			console.log("上拉加载已完成");
		}
	}
</script>

<style lang="scss">
	@import '@/myStyle.scss';

	//页面样式

	.index {
		vertical-align: middle;

		//预览区
		.show {
			width: 100%;
			background-color: #c6c6c6;
		}
	}
</style>
