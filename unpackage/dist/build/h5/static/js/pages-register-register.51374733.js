(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-register-register"],{"0b3e":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{username:"",password:"",showPassword:!0,showClearIcon:!1,token:""}},methods:{changePassword:function(){this.showPassword=!this.showPassword},clearInput:function(t){this.username=t.detail.value,t.detail.value.length>0?this.showClearIcon=!0:this.showClearIcon=!1},clearIcon:function(){this.username="",this.showClearIcon=!1},isMobile:function(t){var e=/^1\d{10}$/;return e.test(t)},goRegister:function(){uni.navigateTo({url:"/pages/register/register"})},register:function(){console.log("去注册"),console.log(this.username),console.log(this.password),uni.request({url:"http://47.92.120.204:8888/user/register",data:{username:this.username,password:this.password},method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){console.log(t.data,status),200==t.data.status?(uni.showToast({title:"注册成功",mask:!0,duration:100}),uni.navigateTo({url:"/pages/login/login"})):uni.showToast({title:t.data.msg,icon:"none"})}})}}};e.default=a},"92e3":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".login-content[data-v-6bcab2ce]{padding:70px 10px 35px;text-align:center;color:#333}.login-title[data-v-6bcab2ce]{font-size:26px;font-weight:700;margin-bottom:31px}.login-content uni-input[data-v-6bcab2ce]{height:50px;background:#f8f8f8;border-radius:25px;text-align:left;padding:15px;box-sizing:border-box;font-size:15px}.iphone[data-v-6bcab2ce],\n.password[data-v-6bcab2ce],\n.test[data-v-6bcab2ce]{position:relative;margin-bottom:30px}.iphone .uni-icons[data-v-6bcab2ce],\n.password .uni-icons[data-v-6bcab2ce]{position:absolute;top:14px;right:30px}.test-btn[data-v-6bcab2ce],\n.password-btn[data-v-6bcab2ce]{color:#46595f;font-size:15px;text-align:right}.getTest[data-v-6bcab2ce]{color:#46595f;font-size:15px;width:122px;height:50px;border:1px solid #46595f;border-radius:25px;line-height:50px}.test[data-v-6bcab2ce]{display:flex;justify-content:space-between}.register-btn[data-v-6bcab2ce]{width:355px;height:45px;background:#46595f;border-radius:36px;color:#fff;font-size:20px;text-align:center;line-height:45px;position:fixed;bottom:60px}",""]),t.exports=e},9474:function(t,e,n){"use strict";n.r(e);var a=n("0b3e"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},ae2c:function(t,e,n){"use strict";n.r(e);var a=n("c1f9"),o=n("9474");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("de86");var s,r=n("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"6bcab2ce",null,!1,a["a"],s);e["default"]=c.exports},c1f9:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={uniIcons:n("342e").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"login-content"},[n("v-uni-view",{staticClass:"login-title"},[t._v("注册")]),n("v-uni-view",{staticClass:"iphone"},[n("v-uni-input",{attrs:{type:"number",placeholder:"输入手机号/用户名",value:t.username},on:{input:function(e){arguments[0]=e=t.$handleEvent(e),t.clearInput.apply(void 0,arguments)}}}),t.showClearIcon?n("uni-icons",{attrs:{type:"closeempty",color:"#808080",size:"25"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clearIcon.apply(void 0,arguments)}}}):t._e()],1),n("v-uni-view",{staticClass:"password"},[n("v-uni-input",{attrs:{placeholder:"请输入密码",password:t.showPassword},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),n("uni-icons",{attrs:{type:"eye-filled",color:"#808080",size:"25"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changePassword.apply(void 0,arguments)}}})],1),1==t.type?n("v-uni-view",{staticClass:"test"}):t._e(),n("v-uni-view",{staticClass:"register-btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.register.apply(void 0,arguments)}}},[t._v("注册")])],1)},i=[]},de86:function(t,e,n){"use strict";var a=n("ffcb"),o=n.n(a);o.a},ffcb:function(t,e,n){var a=n("92e3");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("803bfc40",a,!0,{sourceMap:!1,shadowMode:!1})}}]);