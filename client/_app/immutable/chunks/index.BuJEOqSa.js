import{n as b,s as w,r as m,a as q,i as x}from"./scheduler.BbRYtTH3.js";const a=[];function z(s,u){return{subscribe:A(s,u).subscribe}}function A(s,u=b){let t;const r=new Set;function o(n){if(q(s,n)&&(s=n,t)){const i=!a.length;for(const e of r)e[1](),a.push(e,s);if(i){for(let e=0;e<a.length;e+=2)a[e][0](a[e+1]);a.length=0}}}function f(n){o(n(s))}function l(n,i=b){const e=[n,i];return r.add(e),r.size===1&&(t=u(o,f)||b),n(s),()=>{r.delete(e),r.size===0&&t&&(t(),t=null)}}return{set:o,update:f,subscribe:l}}function E(s,u,t){const r=!Array.isArray(s),o=r?[s]:s;if(!o.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const f=u.length<2;return z(t,(l,n)=>{let i=!1;const e=[];let d=0,p=b;const y=()=>{if(d)return;p();const c=u(r?e[0]:e,l,n);f?l(c):p=x(c)?c:b},h=o.map((c,g)=>w(c,_=>{e[g]=_,d&=~(1<<g),i&&y()},()=>{d|=1<<g}));return i=!0,y(),function(){m(h),p(),i=!1}})}function S(s){return{subscribe:s.subscribe.bind(s)}}export{S as a,E as d,z as r,A as w};
