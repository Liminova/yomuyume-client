import{q as d,s as r}from"./entry.m8ldEEsv.js";async function u(){var t;const{data:n,status:e,error:a}=await d("/api/index/categories",{baseURL:r.instanceAddr,method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.token}`}},"$WWK86JlgMB");if(e.value==="error"){const s=(t=a.value)==null?void 0:t.data;return{status:e.value,message:s.message??"Failed to fetch categories, server doesn't give any reason.",data:[]}}const o=n.value;return{status:e.value,message:"",data:o.data}}async function l(n){var s;const{data:e,status:a,error:o}=await d("/api/index/filter",{baseURL:r.instanceAddr,method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.token}`},body:n},"$Nfu92GpsqD");if(a.value==="error"){const i=(s=o.value)==null?void 0:s.data;return{status:a.value,message:i.message??"Failed to send filter request, server doesn't give any reason.",data:[]}}const t=e.value;return{status:a.value,message:"",data:t?t.data:[]}}async function c(n){var s;const{data:e,status:a,error:o}=await d(`/api/index/title/${n}`,{baseURL:r.instanceAddr,method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${r.token}`}},"$rrYEq3C781");if(a.value==="error"){const i=(s=o.value)==null?void 0:s.data;return{status:a.value,message:i.message??"Failed to fetch title, server doesn't give any reason."}}const t=e.value;return{status:a.value,data:t}}const g={categories:u,filter:l,title:c};export{g as i};
