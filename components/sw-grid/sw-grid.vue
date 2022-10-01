<template>
<view class="sw-grid-wrap">
	<view class="grid-wrap" v-for="(list, i) in gridList" :key="i">
		<view class="grid-title">{{list.title}}</view>
		<view class="grid-item-box"  >
			<view class="grid-item"
				v-for="(item, index) in list.subList" 
				:key="index" hover-class="hover" 
				:style="'width:calc(100% / '+column+')'"
				:class="{'no-border-right':(index+1)%column==0,'no-border-top':index+1>column, 'no-border-bottom':noBorderBottom(i,index), 'no-border':!border}"
				@tap="jump(item.url, index, item)"
			>
				<image :src="item.src" ></image>
				<view class="name">{{item.name}}</view>
			</view>
		</view>
	</view>
</view>
</template>

<script>

export default {
	props:{
		gridList :{
			type: Array
		},
		column:{
			type: Number,
			default: 4
		},
		border:{
			type: Boolean,
			default:true
		}
	},
	data () {
		return {}
	},
	methods : {
		//最后一行-取消底部边框
		noBorderBottom ( i, index ) {
			let len = this.gridList[i].subList.length
			let row = parseInt(len/this.column)
			if(len % this.column === 0){
				return index+1 > (row-1) * this.column
			}
			return index+1 > row * this.column
		},
		//跳转
		jump( url, index, item ) {
			//如果是点击类型的，那么就直接返回当前点击的数据以及索引回去
			if(item.type === 'click'){
				const obj = {
					item,index
				}
				this.$emit('tapGrid', obj)
				return
			}
			uni.navigateTo({
				url
			})
		}
	}
	
};
</script>

<style scoped lang="scss">
.grid-wrap{
	width: 96%;margin-left: 2%;background: #fff;border-radius: 20upx;box-shadow: 0 0 5upx 2upx #efefef;margin-top: 15upx;font-size: 28upx;
	.grid-title{
		color: #666;padding: 15upx 2%;font-size: 34upx;width: 96%;
	}
	
	.grid-item-box{
		display: flex;align-items: center;flex-wrap: wrap;
		.grid-item{
			text-align: center;padding: 35upx 0;width: calc(100% / 3);box-sizing: border-box;
			border-right: .5upx solid #ccc;border-top: .5upx solid #ccc;border-bottom: .5upx solid #ccc;
			image{width:70upx;height: 70upx;}
		}
		.hover{background: #efefef;}
		.no-border-right{border-right: none;}
		.no-border-bottom{border-bottom:none}
		.no-border-top{border-top:none}
		.no-border{border:none !important}
	}
}
</style>

