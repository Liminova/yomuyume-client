import{_ as u}from"./nuxt-link.QBoXYOtL.js";import{s as v,M as f,x as s,o as y,c as g,b as _,w as b,a as e,H as o,u as t,t as i,E as l,C as h}from"./entry.ZmpWMgT3.js";import"./ripple.uo11bOlx.js";const w={class:"relative z-0"},x=e("md-ripple",{style:{"--md-ripple-hover-color":"transparent"}},null,-1),S={class:"flex size-6 items-center justify-center"},z={class:"whitespace-nowrap rounded-xl bg-[var(--md-sys-color-primary-container)] px-4 py-3"},k=v({__name:"NavEntry",props:{name:{type:String,required:!0},icon:{type:String,required:!0},target:{type:String,required:!0},count:{type:String,default:""},mouseover:{type:Function,required:!0}},setup(c){const r=c,d={container:"",icon:"text-[color:var(--md-sys-color-on-surface-variant)]",label:"text-[color:var(--md-sys-color-on-surface-variant)] font-normal"},m={container:"",icon:"text-[color:var(--md-sys-color-on-primary-container)] fa-solid font-bold",label:"text-[color:var(--md-sys-color-on-primary-container)] font-medium"},n=f(()=>h().path===r.target?m:d);return window.innerWidth<=1024&&(s.isNavDrawerLarge=!0),(a,N)=>{const p=u;return y(),g("div",w,[_(p,{to:r.target,class:"peer",onMouseover:r.mouseover},{default:b(()=>[e("div",{class:o(["relative grid h-14 items-center gap-3 self-center pl-4 pr-6",t(n).container+(("globalStore"in a?a.globalStore:t(s)).isNavDrawerLarge?" grid-cols-[1.5rem_1fr_1.5rem] rounded-[1.75rem]":" grid-cols-[1.5rem_0fr_0fr] rounded-2xl")]),style:l({transitionProperty:"border-radius, grid-template-columns",transitionDuration:"300ms",transitionTimingFunction:"cubic-bezier(0.4, 0, 0.2, 1)"})},[x,e("div",S,[e("i",{class:o(["fa-light text-xl",r.icon+" "+t(n).icon])},null,2)]),e("div",{class:o(["min-w-0 overflow-hidden whitespace-nowrap text-sm",t(n).label])},i(r.name),3),e("div",{class:o(["min-w-0 overflow-hidden",t(n).label])},i(r.count),3)],6)]),_:1},8,["to","onMouseover"]),e("div",{class:o(["pointer-events-none absolute left-[68px] top-0 flex h-full scale-90 items-center justify-center opacity-0 peer-hover:scale-100 peer-hover:opacity-100",("globalStore"in a?a.globalStore:t(s)).isNavDrawerLarge?"hidden":""]),style:l({transition:"opacity 200ms cubic-bezier(0.4, 0, 0.2, 1), transform 200ms cubic-bezier(0.4, 0, 0.2, 1)"})},[e("div",z,i(r.name),1)],6)])}}});export{k as _};
