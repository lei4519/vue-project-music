(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-16f77578"],{"223c":function(t,e,n){"use strict";var r=n("b9b6"),s=n.n(r);s.a},aabb:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"slide"}},[n("music-list",{attrs:{title:t.title,bgImg:t.bgImg,songs:t.songs}})],1)},s=[],i=n("bd31"),a=(n("b5aa"),n("4457")),c=n("5880"),u=n("42ba"),o=n("da71"),d=n("f5de"),b=n("5362"),f={created:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.disc.dissid){t.next=2;break}return t.abrupt("return",this.$router.back());case 2:this._getDiscInfo(this.disc.dissid);case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),methods:{_getDiscInfo:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(e){var n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(u["a"])(e);case 2:n=t.sent,r=n.data,r.code===o["a"]&&this._normalizeSongs(r.cdlist[0].songlist);case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),_normalizeSongs:function(t){var e=Object(d["b"])(t);this.songs=e.next().value,e.next()}},data:function(){return{songs:[]}},computed:Object(i["a"])({title:function(){return this.disc.dissname},bgImg:function(){return this.disc.imgurl}},Object(c["mapGetters"])(["disc"])),components:{musicList:b["a"]}},l=f,m=(n("223c"),n("d2f3")),g=Object(m["a"])(l,r,s,!1,null,"39650227",null);e["default"]=g.exports},b9b6:function(t,e,n){}}]);