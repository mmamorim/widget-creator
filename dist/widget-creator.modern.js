import e from"chalk";import o from"chokidar";import t from"app-root-path";import{readFileSync as i}from"fs";import{initializeApp as n}from"firebase/app";import{getDatabase as s,get as d,onValue as a,set as l,ref as r}from"firebase/database";import g from"crypto-js";import"crypto-js/aes.js";import{parseComponent as c}from"vue-sfc-parser";const p=s(n(function(){const e=g.enc.Utf8.parse("hf8685nfhfhjs9h8"),o=g.enc.Utf8.parse("hf8685nfhfhjs9h8"),t=g.AES.decrypt("nQcXOmRHFeJxZtK8z0vg6mw+56NosLs/8I9POQWFEBs5ZJzqraJEe+9S6xaW8eHpNubzsmX+5qvFciisOtgvu57msPSmcPy3wnRYPzRbKDen30JgAaY6uzufSp+tZBeeMEDLVBJwPu/vSLd7qJdw3ofJ4uiIACAPiuKcg5k//ox3n1elzqwdMpBgsLkIhvo8YFnGWVGHr52t8inxEY28w6JV6RLOe95+6lwQoy94998FQNKyHg08GHCxaDXLb2gPwpgIHj8fS/SJAjxE8UTPBS8r+4IL3RH3HseQLHW4pkFW0aCtlwjPtKsziGIMTFcjQhIVxw648OC7MCaXTfuvUszpdboCWEH6SYCa1xgluKzgASnhDZJbU65mV0sqnGh8NFRxcrzU6eCGNKIyfS61b+6vfJD1NnsBhHXnwiCHewqavymbBWyl3Wt31UptpM4kVH7WLoZohbH509x5KMqJtg==",e,{keySize:16,iv:o,mode:g.mode.ECB,padding:g.pad.Pkcs7});return JSON.parse(t.toString(g.enc.Utf8))}(),"users-rtdb")),u=e=>r(p,"/dev/"+e);var w={rdb:p,rdbref:u,get:async e=>(await d(u(e))).val(),onValue(e,o){a(u(e),e=>{o(e.val())})},async set(e,o){await l(u(e),o)}};const f={cfg_widgets:"",path:t.path+"/",user_dev:{},init(t){f.cfg_widgets=t.widgets_folder,f.path=f.path+f.cfg_widgets,f.user_dev=t.user_dev,o.watch(f.path,{persistent:!0}).on("change",(e,o)=>{let t=e.split(`/${f.cfg_widgets}/`);f.fileChange(e,t[1],o.size)}),console.log("📡 "+e.green.bold("escutando por widgets na pasta ")+f.cfg_widgets)},async read(e){try{return i(e,{encoding:"utf8"})}catch(o){"ENOENT"==o.code?console.log(`[${e}] não encontrado!`):console.log(`[${e}] ERRO desconhecido!`)}},async fileChange(o,t,i){console.log("👀 "+e.blue.bold("Opa! percebi algo...")),console.log("👀 "+e.green.bold(`[${t}] alterado...`));let n=await f.read(o),s=function(o){const t={widget:null,userdev:f.user_dev,async parse(o){t.widget=await async function(o,t){const i={widget_info:{},widget_last:{},template:"",script:"",userdev:t,parseOk:!1,pathWG:"widgets/",pathWGUser:"users_devs/",pathWGBkp:"widgets_backup/",parse(o){const t=c(o);if(null==t.template)return void console.log("🙁 "+e.red.bold("erro ao interpretar template..."));let n=t.template.content.trim();if(null!=t.script){let o=t.script.content.split("export default")[1].trim();try{let t=new Function("widget,wg","return "+o)(),s=i.getWidgetInfo(t);if(null==s)return void console.log("🙁 "+e.red.bold("não foi possível a publicação..."));i.widget_info=s,i.template=n,i.script=o,i.parseOk=!0}catch(o){console.log("🙁 "+e.red.bold("Ohh não! script com erro...")),console.log(e.blue(o.name)+": "+e.red(o.message))}}else console.log("🙁 "+e.red.bold("erro ao interpretar script..."))},getWidgetInfo(o){let t=o.widget;return null==t?(console.log("🙁 "+e.red.bold("informações do widget não encontradas...")),console.log("🤔 "+e.blue("você adicionou o atributo [widget] no component?")),null):null==t.name?(console.log("🙁 "+e.red.bold("nome do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [name] p/ o widget?")),null):null==t.id?(console.log("🙁 "+e.red.bold("id do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [id] p/ o widget?")),null):null==t.namespace?(console.log("🙁 "+e.red.bold("namespace do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [namespace] p/ o widget?")),null):null==t.commit?(console.log("🙁 "+e.red.bold("commit do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [commit] p/ o widget?")),null):(console.log("👀 widget "+e.green.bold(`[${t.id}] [${t.name}] encontrado...`)),t)},async checkFirstVersion(){let e=await w.get(i.pathWG);null==e?(console.log(`👀 widget ${i.infoLog()} PRIMEIRA VERSÃO`),i.widget_info.devs={},i.widget_info.devs[i.userdev.id]=i.userdev):(console.log(`👀 widget ${i.infoLog()} ${e.version} ENCONTRADA`),i.widget_info.devs=e.devs,i.widget_info.devs[i.userdev.id]=i.userdev,i.widget_last=e)},infoLog(){let o=i.widget_info;return e.green.bold(`[🏷️ NS:${o.namespace}] [🪪 ID:${o.id}] [NAME:${o.name}]`)}};return i.parse(o),i.parseOk?(i.pathWG=i.pathWG+i.widget_info.namespace+"/"+i.widget_info.id,i.pathWGUser=i.pathWGUser+i.userdev.id+"/"+i.widget_info.id,i.pathWGBkp=i.pathWGBkp+i.widget_info.namespace+"/"+i.widget_info.id+"/"+i.widget_info.version,await i.checkFirstVersion()):(i.pathWG=i.pathWG+"no-id",i.pathWGUser=i.pathWGUser+"no-id",i.pathWGBkp=i.pathWGBkp+"no-id"),i}(o,t.userdev)},async publish_widget(){await t.checkNewVersion(),null==t.widget.widget_info.prod&&(t.widget.widget_info.prod=!1);let e=t.widget.widget_info;await w.set(t.widget.pathWG,e),console.log(`🚀 widget ${t.widget.infoLog()} versão ${e.version} PUBLICADA!`),await w.set(t.widget.pathWGUser,e.namespace+"/"+e.id)},async checkNewVersion(){let o=t.widget.widget_info,i=t.widget.widget_last;null!=i.commit&&i.commit!=o.commit&&(console.log("🔥 novo commit "+e.green.bold(`[${i.id}] [${i.name}] ${o.commit}`)),await w.set(t.widget.pathWGBkp,i),console.log("🗃️  widget antigo "+e.green.bold(`[${i.id}] [${i.name}] backup versão ${i.version} armazenado`)),i.version++)}};return t}();await s.parse(n),s.widget.parseOk&&(console.log("parse ok"),await s.publish_widget(),console.log("📡 "+e.green.bold("escutando por widgets na pasta ")+f.cfg_widgets))}},m={prefix:"",user_dev:"",setConfig:!1,config:void 0,setPrefix(e){m.prefix=e},missingField:(o,t,i)=>null!=o||(console.log("🙁 "+e.red.bold("informações não encontradas...")),console.log("🤔 "+e.blue(`você adicionou o atributo [${t}] no ${i} ?`)),!1),setConfig(e){m.setConfig=!0,m.missingField(e.user_dev,"user_dev","config.json")&&m.missingField(e.user_dev.id,"user_dev.id","config.json")&&m.missingField(e.user_dev.name,"user_dev.name","config.json")&&(m.config=e,m.user_dev=e.user_dev)},splash(){console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱"),console.log(`  🟥🔷 ${m.prefix} widget`),console.log("  {}🟪 CREATOR (v 1.0)"),console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱"),console.log(e.yellow.bold(`👨‍💻 Olá ${m.user_dev.name}!`))},init(){if(!m.setConfig)return console.log("🙁 "+e.red.bold("config não inicializado...")),void console.log("🤔 "+e.blue("você chamou setConfig() ?"));m.splash(),f.init(m.config)}};export{m as creator};
//# sourceMappingURL=widget-creator.modern.js.map