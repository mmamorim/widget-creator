import e from"chalk";import o from"chokidar";import i from"app-root-path";import{readFileSync as n,writeFileSync as t}from"fs";import{initializeApp as s}from"firebase/app";import{getDatabase as l,get as d,onValue as a,set as r,ref as c}from"firebase/database";import g from"crypto-js";import{parseComponent as p}from"vue-sfc-parser";const u=l(s(function(){const e=g.enc.Utf8.parse("hf8685nfhfhjs9h8"),o=g.enc.Utf8.parse("hf8685nfhfhjs9h8"),i=g.AES.decrypt("nQcXOmRHFeJxZtK8z0vg6mw+56NosLs/8I9POQWFEBs5ZJzqraJEe+9S6xaW8eHpNubzsmX+5qvFciisOtgvu57msPSmcPy3wnRYPzRbKDen30JgAaY6uzufSp+tZBeeMEDLVBJwPu/vSLd7qJdw3ofJ4uiIACAPiuKcg5k//ox3n1elzqwdMpBgsLkIhvo8YFnGWVGHr52t8inxEY28w6JV6RLOe95+6lwQoy94998FQNKyHg08GHCxaDXLb2gPwpgIHj8fS/SJAjxE8UTPBS8r+4IL3RH3HseQLHW4pkFW0aCtlwjPtKsziGIMTFcjQhIVxw648OC7MCaXTfuvUszpdboCWEH6SYCa1xgluKzgASnhDZJbU65mV0sqnGh8NFRxcrzU6eCGNKIyfS61b+6vfJD1NnsBhHXnwiCHewqavymbBWyl3Wt31UptpM4kVH7WLoZohbH509x5KMqJtg==",e,{keySize:16,iv:o,mode:g.mode.ECB,padding:g.pad.Pkcs7});return JSON.parse(i.toString(g.enc.Utf8))}(),"users-rtdb")),f=e=>c(u,"/dev/"+e);var w={rdb:u,rdbref:f,get:async e=>(await d(f(e))).val(),onValue(e,o){a(f(e),e=>{o(e.val())})},async set(e,o){await r(f(e),o)}};const m={cfg_widgets:"",path:i.path+"/",user_dev:{},init(i){m.cfg_widgets=i.widgets_folder,m.path=m.path+m.cfg_widgets,m.user_dev=i.user_dev,o.watch(m.path,{persistent:!0}).on("change",(e,o)=>{let i=e.split(`/${m.cfg_widgets}/`);m.fileChange(e,i[1],o.size)}),console.log("📡 "+e.green.bold("escutando por widgets na pasta ")+m.cfg_widgets)},async read(e){try{return n(e,{encoding:"utf8"})}catch(o){"ENOENT"==o.code?console.log(`[${e}] não encontrado!`):console.log(`[${e}] ERRO desconhecido!`)}},async fileChange(o,i,n){console.log("👀 "+e.blue.bold("Opa! percebi algo...")),console.log("👀 "+e.green.bold(`[${i}] alterado...`));let t=await m.read(o),s=function(o){const i={widget:null,userdev:m.user_dev,async parse(o){i.widget=await async function(o,i){const n={widget_info:{},widget_last:{},template:"",script:"",userdev:i,parseOk:!1,pathWG:"widgets/",pathWGUser:"users_devs/",pathWGBkp:"widgets_backup/",parse(o){const i=p(o);if(null==i.template)return void console.log("🙁 "+e.red.bold("erro ao interpretar template..."));let t=i.template.content.trim();if(null!=i.script){let o=i.script.content.split("export default")[1].trim();try{let i=new Function("widget,wg","return "+o)(),s=n.getWidgetInfo(i);if(null==s)return void console.log("🙁 "+e.red.bold("não foi possível a publicação..."));n.widget_info=s,n.template=t,n.script=o,n.parseOk=!0}catch(o){console.log("🙁 "+e.red.bold("Ohh não! script com erro...")),console.log(e.blue(o.name)+": "+e.red(o.message))}}else console.log("🙁 "+e.red.bold("erro ao interpretar script..."))},getWidgetInfo(o){let i=o.widget;return null==i?(console.log("🙁 "+e.red.bold("informações do widget não encontradas...")),console.log("🤔 "+e.blue("você adicionou o atributo [widget] no component?")),null):null==i.name?(console.log("🙁 "+e.red.bold("nome do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [name] p/ o widget?")),null):null==i.id?(console.log("🙁 "+e.red.bold("id do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [id] p/ o widget?")),null):null==i.namespace?(console.log("🙁 "+e.red.bold("namespace do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [namespace] p/ o widget?")),null):null==i.commit?(console.log("🙁 "+e.red.bold("commit do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [commit] p/ o widget?")),null):(console.log("👀 widget "+e.green.bold(`[${i.id}] [${i.name}] encontrado...`)),i)},async checkFirstVersion(){let e=await w.get(n.pathWG);null==e?(console.log(`👀 widget ${n.infoLog()} PRIMEIRA VERSÃO`),n.widget_info.devs={},n.widget_info.devs[n.userdev.id]=n.userdev):(console.log(`👀 widget ${n.infoLog()} ${e.version} ENCONTRADA`),n.widget_info.devs=e.devs,n.widget_info.devs[n.userdev.id]=n.userdev,n.widget_last=e)},infoLog(){let o=n.widget_info;return e.green.bold(`[🏷️ NS:${o.namespace}] [🪪 ID:${o.id}] [NAME:${o.name}]`)}};return n.parse(o),n.parseOk?(n.pathWG=n.pathWG+n.widget_info.namespace+"/"+n.widget_info.id,n.pathWGUser=n.pathWGUser+n.userdev.id+"/"+n.widget_info.id,n.pathWGBkp=n.pathWGBkp+n.widget_info.namespace+"/"+n.widget_info.id+"/"+n.widget_info.version,await n.checkFirstVersion()):(n.pathWG=n.pathWG+"no-id",n.pathWGUser=n.pathWGUser+"no-id",n.pathWGBkp=n.pathWGBkp+"no-id"),n}(o,i.userdev)},async publish_widget(){await i.checkNewVersion(),null==i.widget.widget_info.prod&&(i.widget.widget_info.prod=!1);let e=i.widget.widget_info;e.template=i.widget.template,e.script=i.widget.script,await w.set(i.widget.pathWG,e),console.log(`🚀 widget ${i.widget.infoLog()} versão ${e.version} PUBLICADA!`),await w.set(i.widget.pathWGUser,e.namespace+"/"+e.id)},async checkNewVersion(){let o=i.widget.widget_info,n=i.widget.widget_last;null!=n.commit&&n.commit!=o.commit&&(console.log("🔥 novo commit "+e.green.bold(`[${n.id}] [${n.name}] ${o.commit}`)),await w.set(i.widget.pathWGBkp,n),console.log("🗃️  widget antigo "+e.green.bold(`[${n.id}] [${n.name}] backup versão ${n.version} armazenado`)),n.version++)}};return i}();await s.parse(t),s.widget.parseOk&&(console.log("parse ok"),await s.publish_widget(),console.log("📡 "+e.green.bold("escutando por widgets na pasta ")+m.cfg_widgets))}},v={prefix:"",user_dev:"",set_config:!1,config:void 0,setPrefix(e){v.prefix=e},missingField:(o,i,n)=>null!=o||(console.log("🙁 "+e.red.bold("informações não encontradas...")),console.log("🤔 "+e.blue(`você adicionou o atributo [${i}] no ${n} ?`)),!1),setConfig(e){v.set_config=!0,v.missingField(e.user_dev,"user_dev","config.json")&&v.missingField(e.user_dev.id,"user_dev.id","config.json")&&v.missingField(e.user_dev.name,"user_dev.name","config.json")&&(v.config=e,v.user_dev=e.user_dev)},splash(){console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱"),console.log(`  🟥🔷 ${v.prefix} widget`),console.log("  {}🟪 CREATOR (v 1.0)"),console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱"),console.log(e.yellow.bold(`👨‍💻 Olá ${v.user_dev.name}!`))},init(){if(!v.set_config)return console.log("🙁 "+e.red.bold("config não inicializado...")),void console.log("🤔 "+e.blue("você chamou setConfig() ?"));v.splash(),m.init(v.config)}},b={prefix:"",user_dev:"",set_config:!1,config:void 0,setPrefix(e){b.prefix=e},missingField:(o,i,n)=>null!=o||(console.log("🙁 "+e.red.bold("informações não encontradas...")),console.log("🤔 "+e.blue(`você adicionou o atributo [${i}] no ${n} ?`)),!1),setConfig(e){b.set_config=!0,b.missingField(e.user_dev,"user_dev","config.json")&&b.missingField(e.user_dev.id,"user_dev.id","config.json")&&b.missingField(e.user_dev.name,"user_dev.name","config.json")&&(b.config=e,b.user_dev=e.user_dev)},splash(){console.log("〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️"),console.log(`  🟥🔷 ${b.prefix} widget`),console.log("  {}🟪 CLONE (v 1.0)"),console.log("〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️"),console.log(e.yellow.bold(`👨‍💻 Olá ${b.user_dev.name}!`))},async init(o,i){if(!b.set_config)return console.log("🙁 "+e.red.bold("config não inicializado...")),void console.log("🤔 "+e.blue("você chamou setConfig() ?"));b.splash();let n=e.green.bold(`[🏷️ NS:${o}] [🪪 ID:${i}]`);console.log("👀 procurando widget "+n);let s=`widgets/${o}/${i}`,l=await w.get(s);if(null==l)console.log("🙁 "+e.red.bold("não encontrado..."));else{console.log("👍 "+e.green.bold("achei")),console.log("💫 "+e.blue("clonando em na pasta ")+b.config.widgets_folder);let o="<template>\n\t"+l.template+"\n</template>";o=o+"\n<script>\nexport default "+l.script+"\n<\/script>";let i=b.config.widgets_folder+"/"+l.id+".vue";await t(i,o),console.log("💫 "+e.blue("arquivo ")+l.id+".vue"+e.green.bold(" salvo com sucesso!"))}}};export{b as clone,v as creator};
//# sourceMappingURL=widget-creator.modern.js.map
