import{_ as C}from"./Snackbar._rY2p4u1.js";import{_ as A}from"./ItemCard.vue.9-iH4Ssm.js";import{_ as R}from"./nuxt-link.ezVaplPp.js";import{x as $,r as o,C as b,D as I,o as m,c as d,b as l,u as r,w as g,a as B,F as h,E as U,G as H,H as P}from"./entry.m8ldEEsv.js";import{f as z}from"./ImagePoly.vue._PWujVlH.js";import{i as E}from"./index.MbaAhOHO.js";import{i as F}from"./imageAutoResizer.4aADZEuP.js";import{_ as M}from"./NavDrawerWrapper.vue.aAefHY2k.js";import"./Toggle.yySRDatQ.js";import"./NavDrawer.vue.nGup6tte.js";import"./NavEntry.vue.QrAUCc7-.js";import"./ripple.uo11bOlx.js";import"./ThemeToggle.EpPTxDbS.js";import"./changeTheme.l_0xQP93.js";import"./TopBar.vue.7F2K_c4K.js";import"./FilterBar.vue.Ts51sOIL.js";import"./LogoAndTitle.32tXdLSN.js";import"./NavToggleIcon.bzZzuElv.js";import"./UserAvatar.vue.OizyKnrX.js";const re=$({__name:"[id]",setup(N){const p=o(null),c=o(200),v=t=>c.value=t,u=o(5),y=t=>u.value=t,_=o(16),s=b().params.id,k=Array.isArray(s)?s[0]:s,i=o(""),f=o([]);return(async()=>{const{data:t,message:a,status:n}=await E.filter({category_ids:[k]});if(n==="error"){i.value=a;return}f.value=t})(),I(()=>{F(p,v,y,_.value,3,4)}),(t,a)=>{const n=C,w=A,x=R;return m(),d(h,null,[l(n,{message:r(i),onClose:a[0]||(a[0]=e=>i.value="")},null,8,["message"]),l(M,null,{default:g(()=>[B("div",{ref_key:"imageContainerRef",ref:p,class:"my-3 grid px-6 lg:mt-0 lg:pl-0 lg:pr-3",style:H({gridTemplateColumns:`repeat(${r(u)}, 1fr)`,gap:`${r(_)}px`})},[(m(!0),d(h,null,U(r(f),e=>(m(),P(x,{key:e.id,to:`/title/${e.id}`},{default:g(()=>[l(w,{title:e.title,author:e.author??"Unknown","title-id":e.id,"cover-height":r(c),cover:{width:e.width,height:e.height,blurhash:e.blurhash,format:e.format,src:("fileApiUrl"in t?t.fileApiUrl:r(z)).thumbnail(e.id)}},null,8,["title","author","title-id","cover-height","cover"])]),_:2},1032,["to"]))),128))],4)]),_:1})],64)}}});export{re as default};
