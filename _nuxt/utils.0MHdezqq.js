import{q as n,s as t}from"./entry.m8ldEEsv.js";async function i(){const{data:a,status:s}=await n("/api/utils/status",{baseURL:t.instanceAddr,method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.token}`}},"$TpyOn6gA9R");return{data:a.value,status:s.value}}async function u(){var e;const{data:a,status:s,error:o}=await n("/api/utils/tags",{baseURL:t.instanceAddr,method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.token}`}},"$Gr2Trs8YUH");if(s.value==="error"){const r=(e=o.value)==null?void 0:e.data;return{tags:[],message:r.message??"Failed to fetch tags, server doesn't give any reason."}}return{tags:a.value.tags,message:""}}const l={status:i,tags:u};export{l as u};
