import{d as V,r as _,c as g,a as d,o as y,b as f,e as s,f as r,g as n,w as k,F as x,_ as h}from"./index-5218a1a2.js";const j=V({__name:"CurrencyExchange",emits:["likeClick"],setup(C,{emit:a}){const e=_({jpy:0}),m=_({clear(){e.jpy=0,a("likeClick")}}),l={ntd:.21,usd:.00675},i=g({get:()=>e.jpy*l.ntd,set:t=>e.jpy=t/l.ntd}),c=g({get:()=>e.jpy*l.usd,set:t=>e.jpy=t/l.usd});return(t,o)=>{const p=d("el-input-number"),v=d("el-button");return y(),f(x,null,[s("ul",null,[s("li",null,[r("台幣："),n(p,{modelValue:i.value,"onUpdate:modelValue":o[0]||(o[0]=u=>i.value=u),min:0,"controls-position":"right",size:"large",precision:"2"},null,8,["modelValue"])]),s("li",null,[r("日幣："),n(p,{modelValue:e.jpy,"onUpdate:modelValue":o[1]||(o[1]=u=>e.jpy=u),min:0,"controls-position":"right",size:"large",precision:"2"},null,8,["modelValue"])]),s("li",null,[r("美金："),n(p,{modelValue:c.value,"onUpdate:modelValue":o[2]||(o[2]=u=>c.value=u),min:0,"controls-position":"right",size:"large",precision:"2"},null,8,["modelValue"])])]),n(v,{onClick:m.clear},{default:k(()=>[r("重置")]),_:1},8,["onClick"])],64)}}});const b=h(j,[["__scopeId","data-v-bfd76aae"]]),E=s("h1",null,"匯率計算機",-1),U=s("span",null,"觸發EMIT重置欄位",-1),B=V({__name:"ExchangeRatePage",setup(C){const a=_({hello:!1}),e={test(){a.hello=!0}};return(m,l)=>{const i=d("el-divider"),c=d("el-dialog");return y(),f(x,null,[E,n(i),n(b,{onLikeClick:e.test},null,8,["onLikeClick"]),n(c,{modelValue:a.hello,"onUpdate:modelValue":l[0]||(l[0]=t=>a.hello=t),title:"提示訊息"},{default:k(()=>[U]),_:1},8,["modelValue"])],64)}}});export{B as default};
