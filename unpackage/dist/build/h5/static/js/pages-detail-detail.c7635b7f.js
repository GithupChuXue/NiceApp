(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-detail-detail"],{"10b8":function(t,n,a){var e=a("24fb");n=e(!1),n.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.uni-flex[data-v-4f813ad8], .uni-flex-row[data-v-4f813ad8], .uni-media-box[data-v-4f813ad8], .uni-footer[data-v-4f813ad8], .uni-flex-column[data-v-4f813ad8], .uni-list-box[data-v-4f813ad8], .uni-content[data-v-4f813ad8]{display:flex}.uni-flex-row[data-v-4f813ad8], .uni-media-box[data-v-4f813ad8], .uni-footer[data-v-4f813ad8]{flex-direction:row;box-sizing:border-box}.uni-flex-column[data-v-4f813ad8], .uni-list-box[data-v-4f813ad8], .uni-content[data-v-4f813ad8]{flex-direction:column}.uni-color-gary[data-v-4f813ad8]{color:#3b4144}\r\n/* 标题 */.uni-title[data-v-4f813ad8]{display:flex;margin-bottom:8px;font-size:16;font-weight:700;color:#3b4144}.uni-title-sub[data-v-4f813ad8]{display:flex;font-size:14px;font-weight:500;color:#3b4144}\r\n/* 描述 额外文本 */.uni-note[data-v-4f813ad8]{margin-top:10px;color:#999;font-size:12px}\r\n/* 列表内容 */.uni-list-box[data-v-4f813ad8]{flex:1;margin-top:10px}\r\n/* 略缩图 */.uni-thumb[data-v-4f813ad8]{flex-shrink:0;margin-right:10px;width:125px;height:75px;border-radius:6px;overflow:hidden;border:1px #f5f5f5 solid}.uni-thumb uni-image[data-v-4f813ad8]{width:100%;height:100%}.uni-media-box[data-v-4f813ad8]{border-radius:6px;overflow:hidden}.uni-media-box .uni-thumb[data-v-4f813ad8]{margin:0;margin-left:4px;flex-shrink:1;width:33%;border-radius:0}.uni-media-box .uni-thumb[data-v-4f813ad8]:first-child{margin:0}\r\n/* 内容 */.uni-content[data-v-4f813ad8]{justify-content:space-between}\r\n/* 列表footer */.uni-footer[data-v-4f813ad8]{justify-content:space-between;margin-top:12px}.uni-footer-text[data-v-4f813ad8]{font-size:12px;color:#999;margin-left:5px}\r\n/* 标签 */.uni-tag[data-v-4f813ad8]{flex-shrink:0;padding:0 5px;border:1px #c8c7cc solid;margin-right:5px;border-radius:3px;background:#f8f8f8;color:#333;font-size:12px}\r\n/* 链接 */.uni-link[data-v-4f813ad8]{margin-left:10px;color:#333;text-decoration:underline}.index[data-v-4f813ad8]{vertical-align:middle}.index .show[data-v-4f813ad8]{width:100%;background-color:#c6c6c6}',""]),t.exports=n},"1ccb":function(t,n,a){"use strict";a.r(n);var e=a("4c2b"),i=a.n(e);for(var o in e)"default"!==o&&function(t){a.d(n,t,(function(){return e[t]}))}(o);n["default"]=i.a},"2ff9":function(t,n,a){var e=a("10b8");e.__esModule&&(e=e.default),"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var i=a("4f06").default;i("84bdd714",e,!0,{sourceMap:!1,shadowMode:!1})},"4c2b":function(t,n,a){"use strict";var e=a("4ea4");a("99af"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e(a("12e3")),o=e(a("fd02")),d=e(a("dcac")),r=e(a("51b6")),s={components:{uniList:i.default,uniListItem:o.default,uniLoadMore:d.default},data:function(){return{id:0,content:r.default.read_local("../static/data_test/data_local_message.json"),status:"more",contentText:{contentdown:"更多精彩",contentrefesh:"加载中",contentnomore:"暂无新消息提醒"}}},methods:{getDetailContent:function(){var t=this.$myRequest({url:"../static/data_test/data_local_detail.json"+this.id});this.log(t)}},onLoad:function(t){this.id=option.id,this.getDetailContent()},onPullDownRefresh:function(){console.log("上拉刷新"),this.content=r.default.read_local("../static/data_test/data_local_message.json"),console.log("上拉刷新已完成")},onReachBottom:function(){console.log("上拉加载");var t=r.default.read_local("../static/data_test/data_local_message.json");t?(this.status="loading",this.content=this.content.concat(t)):(this.status="noMore",console.log("没有新内容了")),console.log("上拉加载已完成")}};n.default=s},5305:function(t,n,a){"use strict";a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return o})),a.d(n,"a",(function(){return e}));var e={uniList:a("12e3").default,uniListItem:a("fd02").default,uniLoadMore:a("dcac").default},i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("v-uni-view",{staticClass:"index"},[a("v-uni-view",{staticClass:"post"},[a("v-uni-view")],1),a("v-uni-view",{staticClass:"show"},[a("uni-list",t._l(t.content,(function(n){return a("uni-list-item",{key:n.id,attrs:{direction:"column",to:"/pages/detail/detail?id="+n.id},scopedSlots:t._u([{key:"header",fn:function(){return[a("v-uni-view",{staticClass:"uni-note"},[t._v(t._s(n.user)+"    "+t._s(n.pub_time))])]},proxy:!0},{key:"body",fn:function(){return[a("v-uni-view",{staticClass:"uni-list-box"},[a("v-uni-view",{staticClass:"uni-content"},[a("v-uni-view",{staticClass:"uni-title-sub uni-ellipsis-2"},[t._v(t._s(n.excerpt))])],1)],1)]},proxy:!0},{key:"footer",fn:function(){return[a("v-uni-view",{staticClass:"uni-footer"},[a("v-uni-text",{staticClass:"uni-footer-text"},[t._v("回复")]),a("v-uni-text",{staticClass:"uni-footer-text"},[t._v("删除")]),a("v-uni-text",{staticClass:"uni-footer-text"},[t._v("此人不再提醒")])],1)]},proxy:!0}],null,!0)})})),1),"more"!=this.status?a("uni-load-more",{attrs:{status:t.status,"icon-size":10,"content-text":t.contentText}}):t._e()],1)],1)},o=[]},e9fd:function(t,n,a){"use strict";var e=a("2ff9"),i=a.n(e);i.a},f4bf:function(t,n,a){"use strict";a.r(n);var e=a("5305"),i=a("1ccb");for(var o in i)"default"!==o&&function(t){a.d(n,t,(function(){return i[t]}))}(o);a("e9fd");var d,r=a("f0c5"),s=Object(r["a"])(i["default"],e["b"],e["c"],!1,null,"4f813ad8",null,!1,e["a"],d);n["default"]=s.exports}}]);