import{q as o,s as a}from"./entry.RtCUPSiZ.js";async function u(){const{data:s,status:t}=await o("/api/utils/status",{baseURL:a.instanceAddr,method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.token}`}},"$TpyOn6gA9R");return{data:s.value,status:t.value}}async function d(){var e;const{data:s,status:t,error:n}=await o("/api/utils/tags",{baseURL:a.instanceAddr,method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.token}`}},"$Gr2Trs8YUH");if(t.value==="error"){const r=(e=n.value)==null?void 0:e.data;return{tags:[],message:r.message??"Failed to fetch tags, server doesn't give any reason."}}return{tags:s.value.tags,message:""}}async function l(){var e;const{data:s,status:t,error:n}=await o("/api/utils/ssim_eval",{baseURL:a.instanceAddr,method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a.token}`}},"$7QT14wwdAw");if(t.value==="error"){const r=(e=n.value)==null?void 0:e.data;return{data:{titleA:{id:"",title:"",desc:"",tags:[],blurhash:"",width:0,height:0,format:""},titleB:{id:"",title:"",desc:"",tags:[],blurhash:"",width:0,height:0,format:""},ssim:0},status:t.value,message:r.message??"Failed to fetch ssim eval, server doesn't give any reason."}}const i=s.value;return{data:{titleA:i.title_a,titleB:i.title_b,ssim:i.ssim},status:t.value,message:""}}const h={status:u,tags:d,ssimEval:l};export{h as u};
