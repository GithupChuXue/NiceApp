<template>
	<view>
		<view class="content">
			<view class="content-item">
				<view class="uni-common-mt">
					<view class="uni-form-item uni-column">
						<input class="uni-input" @input="onKeyInput" placeholder="新增计划" />
						<button size="mini" type="primary">添加</button>
					</view>
				</view>
			</view>
			<view class="content-item item" v-show="false">
				<h2 style="color:#FA8072;">
					<uni-icons type="list" size="20" color="#FA8072"></uni-icons>
					<text>未完成计划</text>
				</h2>
				<view></view>
			</view>
			<view class="content-item item" v-show="false">
				<h2 style="color:#b8ecf9;">
					<uni-icons type="list" size="20" color="#b8ecf9"></uni-icons>
					<text> 已完成计划</text>
				</h2>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				focus: false,
				inputValue: [],
			}
		},
		methods: {
			onKeyInput: function(event) {
				this.inputValue.unshift(event.target.value);
			},
		}
	}
</script>

<style lang="scss">
	.content {
		width: 730rpx;
		margin: 30rpx 10rpx auto;
		display: flex;
		flex-direction: column;
		justify-content: space-around;

		.content-item {
			width: 690rpx;
			height: 400rpx;
			margin-top: 85rpx;
			line-height: 400rpx;
			text-align: center;
		}

		.content-item:first-child {
			width: 85%;
			height: 70rpx;
			margin: 0 auto;
			border: 1px solid #999;
			border-radius: 10rpx;
			line-height: 70rpx;
			text-align: center;

			.uni-form-item input {
				display: flexbox;
				height: 70rpx;
				line-height: 70rpx;
			}

			.uni-form-item input:hover {
				outline: none;
				color: rgba(82, 168, 236, 0.8);
				border-color: rgba(82, 168, 236, 0.8);
				box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 10px rgba(82, 168, 236, 0.6);
			}
		}

		.item {
			border-top: 2px solid #666;

			h2 {
				margin-top: -230rpx;
				margin-left: -470rpx;
				font-size: 35rpx;
				color: #999;
				margin-bottom: 15rpx;

				text {
					margin-top: 10rpx;
				}
			}

		}
	}
</style>
