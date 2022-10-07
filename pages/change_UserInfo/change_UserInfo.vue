<template>
	<uni-list>
		<view class="changeUserInfo">
			<uni-section class="mb-10" title="修改密码" @click="changePassword"></uni-section>
			<uni-popup ref="inputPassword" type="dialog">
				<uni-popup-dialog type="center" mode="input" @confirm="confirmPassword" title="修改密码">
				</uni-popup-dialog>
			</uni-popup>
			
			<uni-section class="mb-10" title="修改昵称" @click="changeNickname"></uni-section>
			<uni-popup ref="inputNickname" type="dialog">
				<uni-popup-dialog type="center" mode="input" @confirm="confirmNickname" title="修改昵称">
				</uni-popup-dialog>
			</uni-popup>
			
			<uni-section class="mb-10" title="修改邮箱" @click="changeEmail"></uni-section>
			<uni-popup ref="inputEmail" type="dialog">
				<uni-popup-dialog type="center" mode="input" @confirm="confirmEmail" title="修改邮箱">
				</uni-popup-dialog>
			</uni-popup>
			
			<uni-section class="mb-10" title="修改签名" @click="changeSignature"></uni-section>
			<uni-popup ref="inputSignature" type="dialog">
				<uni-popup-dialog type="center" mode="input" @confirm="confirmSignature" title="修改签名">
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</uni-list>
</template>

<script>
	import uniPopup from '@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue';
	import uniPopupDialog from '@/uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.vue';
	import uniSection from '@/uni_modules/uni-section/components/uni-section/uni-section.vue';
	
	export default {
		components: {
			uniPopup,
			uniPopupDialog,
			uniSection
		},
		data() {
			return {
				
			}
		},
		methods: {
			changePassword(){
				this.$refs.inputPassword.open()
			},
			changeNickname(){
				this.$refs.inputNickname.open()
			},
			changeEmail(){
				this.$refs.inputEmail.open()
			},
			changeSignature(){
				this.$refs.inputSignature.open()
			},
			
			confirmPassword(Password_changed){
				console.log(Password_changed)
			},
			confirmNickname(Nickname_changed){
				console.log(Nickname_changed)
			},
			confirmEmail(Email_changed){
				console.log(Email_changed)
			},
			confirmSignature(Signature_changed){
				console.log(Signature_changed)
			}
		}
	}
</script>

<style lang="scss">
	.changeUserInfo{
		flex-direction: column;
		/* #ifdef H5 */
		height: calc(100vh - 44px);
		/* #endif */
		/* #ifndef H5 */
		height: 100vh;
		/* #endif */
		flex: 1;
		background-color:#c9c9c9;
	}
	.mb-10{
		margin-bottom: 10px;
	}
</style>
