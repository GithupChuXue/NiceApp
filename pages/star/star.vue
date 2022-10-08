<template>

	<view class="index">

		<!-- 搜索栏 -->
		<!-- <view class="search">
			<table>
				<input class="ipt" type="text" placeholder="搜索感兴趣的内容吧">
				<button class="enter_btn" type="default" plain size="mini" form-type="submit">搜索</button>
			</table>
		</view> -->
		<uni-search-bar @confirm="search" @input="input" placeholder="搜索感兴趣的内容吧"></uni-search-bar>

		<!-- 预览展示区域 -->
		<view class="show">
			<uni-list>
				<!-- to 属性携带参数跳转详情页面，当前只为参考 -->
				<uni-list-item direction="column" v-for="(item,index) in collectList" :key="item.shareid">
					<!-- 通过header插槽定义列表的标题 -->
					<template v-slot:header>
						<view class="uni-note">{{item.publisher}} {{item.time |myFilter}}</view>
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
					<!-- 同步footer插槽定义列表底部的显示效果 -->
					<template v-slot:footer>
						<view class="uni-footer">
							<text class="uni-footer-text" @click="ThumbsUp(item.shareid, index)">点赞</text>
							<uni-popup ref="popup_thumbsup" type="center">点赞！</uni-popup>
							
							<text class="uni-footer-text" @click="Collect(item.shareid, index)">收藏</text>
							<uni-popup ref="popup_collect" type="center">收藏！</uni-popup>
							
							<text class="uni-footer-text" @click="Comment(item.shareid, index)">评论</text>
							<uni-popup ref="inputDialog" type="dialog">
								<uni-popup-dialog type="center" mode="input" @confirm="confirm">
								</uni-popup-dialog>
							</uni-popup>
							
							<text class="uni-footer-text" @click="Share(item.shareid, index)">分享</text>
							<uni-popup ref="share" type="share" safeArea backgroundColor="#fff">
								<uni-popup-share title="分享到" @select="select">
								</uni-popup-share>
							</uni-popup>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<!-- <uni-load-more :status="status" :icon-size="10" :content-text="contentText" v-if="this.status!='more'" /> -->
		</view>

	</view>
</template>

<script>
	//引入uni组件
	import uniList from '@/uni_modules/uni-list/components/uni-list/uni-list.vue';
	import uniListItem from '@/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue';
	import uniLoadMore from '@/uni_modules/uni-load-more/components/uni-load-more/uni-load-more.vue';
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue';
	import uniPopupShare from '@/uni_modules/uni-popup/components/uni-popup-share/uni-popup-share.vue';
	import uniSearchBar from '@/uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.vue';

	export default {

		components: {
			uniList,
			uniListItem,
			uniLoadMore,
			uniPopup,
			uniPopupDialog,
			uniPopupShare,
			uniSearchBar
		},

		data() {
			return {}
		},

		methods: {
			search(val) {
				console.log(val)
			},
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
		computed: {
			collectList() {
				return this.$store.state.collectList;
			}
		},
		mounted() {
			this.$store.dispatch("getcollectList");
			// this.$store.dispatch("getcollectInfo");
		},
		onShow() {

			this.$store.dispatch("getcollectList");
			// this.$store.dispatch("getcollectInfo");
		},
		//下拉刷新回调函数
		// onPullDownRefresh() {
		// 	console.log("上拉刷新");
		// },

		//上拉加载回调函数
		onReachBottom() {}
	}
</script>

<style lang="scss">
	@import '@/myStyle.scss';

	//页面样式

	.index {
		vertical-align: middle;

		//搜索栏
		.search {
			vertical-align: middle;

			.ipt {
				float: left;
				border: 1rpx solid #c6c6c6;
				border-radius: 5rpx;
				margin-top: 10rpx;
				margin-left: 50rpx;
				width: 60%;
				height: 20rpx;
			}

			.enter_btn {}
		}

		//预览区
		.show {
			width: 100%;
			background-color: #c6c6c6;
		}
	}
</style>
