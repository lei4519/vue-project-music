(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2465e972"],{"648e1":function(t,n,e){"use strict";var a=e("ad7c"),s=e.n(a);s.a},6688:function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{ref:"rank",staticClass:"rank"},[e("scroll",{ref:"scroll",staticClass:"rank-content",attrs:{data:t.rankList}},[e("ul",{staticClass:"rank-list"},t._l(t.rankList,function(n,a){return e("li",{key:a,staticClass:"item",on:{click:function(e){return t.selectRank(n)}}},[e("div",{staticClass:"avatar"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:n.picUrl,expression:"item.picUrl"}],attrs:{width:"100",height:"100"}})]),e("ul",{staticClass:"song-list"},t._l(n.songList,function(n,a){return e("li",{key:n.id,staticClass:"song-name"},[e("span",[t._v(t._s(a+1)+".")]),e("span",[t._v(t._s(n.songname+" - "+n.singername)+".")])])}),0)])}),0)]),t.rankList.length?t._e():e("loading"),e("router-view")],1)},s=[],r=(e("b5aa"),e("4457")),i=e("bd31"),c=e("77a5"),o=e("da71"),l=e("e9fc"),u=e("1cb8"),f=e("5880"),p=e("510f"),d={mixins:[p["b"]],data:function(){return{rankList:[]}},created:function(){this._getRankList()},methods:Object(i["a"])({handelPlayList:function(t){var n=t.length?"60px":"";this.$refs.rank.style.bottom=n,this.$refs.scroll.refresh()},_getRankList:function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(){var n;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(c["b"])();case 3:n=t.sent,n.code===o["a"]&&(this.rankList=n.data.topList),t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.error(t.t0);case 10:case"end":return t.stop()}},t,this,[[0,7]])}));function n(){return t.apply(this,arguments)}return n}(),selectRank:function(t){this.$router.push({path:"/rank/".concat(t.id)}),this.setRank(t)}},Object(f["mapMutations"])({setRank:"SET_RANK"})),components:{Scroll:l["a"],Loading:u["a"]}},h=d,k=(e("648e1"),e("d2f3")),b=Object(k["a"])(h,a,s,!1,null,"5fba82b6",null);n["default"]=b.exports},"77a5":function(t,n,e){"use strict";e.d(n,"b",function(){return c}),e.d(n,"a",function(){return o});var a=e("ab01"),s=e.n(a),r=e("da71"),i=e("5693");function c(){var t="https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg",n=s()({},r["b"],{uin:0,needNewCode:1,platform:"h5"});return Object(i["a"])(t,n,r["c"])}function o(t){var n="https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg",e=s()({},r["b"],{topid:t,needNewCode:1,uin:0,tpl:3,page:"detail",type:"top",platform:"h5"});return Object(i["a"])(n,e,r["c"])}},ad7c:function(t,n,e){}}]);