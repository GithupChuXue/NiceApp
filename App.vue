<script>
	import read from './services/read.js';
	
	export default {
		onLaunch: function() {
			console.log("App Launch");
			read.refresh();
			console.log("重置了读取位置索引");
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
