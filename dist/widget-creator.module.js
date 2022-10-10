import e from"chalk";import o from"chokidar";import n from"app-root-path";import{readFileSync as t}from"fs";import{initializeApp as i}from"firebase/app";import{getDatabase as r,get as s,onValue as c,set as d,ref as l}from"firebase/database";import a from"crypto-js";import"crypto-js/aes.js";import{parseComponent as g}from"vue-sfc-parser";var u,f,p,m,v=r(i((u=a.enc.Utf8.parse("hf8685nfhfhjs9h8"),f=a.enc.Utf8.parse("hf8685nfhfhjs9h8"),p=a.AES.decrypt("nQcXOmRHFeJxZtK8z0vg6mw+56NosLs/8I9POQWFEBs5ZJzqraJEe+9S6xaW8eHpNubzsmX+5qvFciisOtgvu57msPSmcPy3wnRYPzRbKDen30JgAaY6uzufSp+tZBeeMEDLVBJwPu/vSLd7qJdw3ofJ4uiIACAPiuKcg5k//ox3n1elzqwdMpBgsLkIhvo8YFnGWVGHr52t8inxEY28w6JV6RLOe95+6lwQoy94998FQNKyHg08GHCxaDXLb2gPwpgIHj8fS/SJAjxE8UTPBS8r+4IL3RH3HseQLHW4pkFW0aCtlwjPtKsziGIMTFcjQhIVxw648OC7MCaXTfuvUszpdboCWEH6SYCa1xgluKzgASnhDZJbU65mV0sqnGh8NFRxcrzU6eCGNKIyfS61b+6vfJD1NnsBhHXnwiCHewqavymbBWyl3Wt31UptpM4kVH7WLoZohbH509x5KMqJtg==",u,{keySize:16,iv:f,mode:a.mode.ECB,padding:a.pad.Pkcs7}),JSON.parse(p.toString(a.enc.Utf8))),"users-rtdb")),h=function(e){return l(v,"/dev/"+e)},w=function(e,o){try{return Promise.resolve(d(h(e),o)).then(function(){})}catch(e){return Promise.reject(e)}},b={cfg_widgets:"",path:n.path+"/",user_dev:{},init:function(n){console.log("config",n),b.cfg_widgets=n.widgets_folder,b.path=b.path+b.cfg_widgets,b.user_dev=n.user_dev,o.watch(b.path,{persistent:!0}).on("change",function(e,o){var n=e.split("/"+b.cfg_widgets+"/");b.fileChange(e,n[1],o.size)}),console.log("📡 "+e.green.bold("escutando por widgets na pasta ")+b.cfg_widgets)},read:function(e){try{try{var o=t(e,{encoding:"utf8"});return Promise.resolve(o)}catch(o){"ENOENT"==o.code?console.log("["+e+"] não encontrado!"):console.log("["+e+"] ERRO desconhecido!")}return Promise.resolve()}catch(e){return Promise.reject(e)}},fileChange:function(o,n,t){try{return console.log("👀 "+e.blue.bold("Opa! percebi algo...")),console.log("👀 "+e.green.bold("["+n+"] alterado...")),Promise.resolve(b.read(o)).then(function(o){var n,t=(n={widget:null,userdev:b.user_dev,parse:function(o){try{return Promise.resolve(function(o,n){try{var t={widget_info:{},widget_last:{},template:"",script:"",userdev:n,parseOk:!1,pathWG:"widgets/",pathWGUser:"users_devs/",pathWGBkp:"widgets_backup/",parse:function(o){var n=g(o);if(null!=n.template){var i=n.template.content.trim();if(null!=n.script){var r=n.script.content.split("export default")[1].trim();try{var s=new Function("widget,wg","return "+r)(),c=t.getWidgetInfo(s);if(null==c)return void console.log("🙁 "+e.red.bold("não foi possível a publicação..."));t.widget_info=c,t.template=i,t.script=r,t.parseOk=!0}catch(o){console.log("🙁 "+e.red.bold("Ohh não! script com erro...")),console.log(e.blue(o.name)+": "+e.red(o.message))}}else console.log("🙁 "+e.red.bold("erro ao interpretar script..."))}else console.log("🙁 "+e.red.bold("erro ao interpretar template..."))},getWidgetInfo:function(o){var n=o.widget;return null==n?(console.log("🙁 "+e.red.bold("informações do widget não encontradas...")),console.log("🤔 "+e.blue("você adicionou o atributo [widget] no component?")),null):null==n.name?(console.log("🙁 "+e.red.bold("nome do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [name] p/ o widget?")),null):null==n.id?(console.log("🙁 "+e.red.bold("id do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [id] p/ o widget?")),null):null==n.namespace?(console.log("🙁 "+e.red.bold("namespace do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [namespace] p/ o widget?")),null):null==n.commit?(console.log("🙁 "+e.red.bold("commit do widget não encontrado...")),console.log("🤔 "+e.blue("você adicionou o atributo [commit] p/ o widget?")),null):(console.log("👀 widget "+e.green.bold("["+n.id+"] ["+n.name+"] encontrado...")),n)},checkFirstVersion:function(){try{return Promise.resolve(function(e){try{return Promise.resolve(s(h(e))).then(function(e){return e.val()})}catch(e){return Promise.reject(e)}}(t.pathWG)).then(function(e){null==e?(console.log("👀 widget "+t.infoLog()+" PRIMEIRA VERSÃO"),t.widget_info.devs={},t.widget_info.devs[t.userdev.id]=t.userdev):(console.log("👀 widget "+t.infoLog()+" "+e.version+" ENCONTRADA"),t.widget_info.devs=e.devs,t.widget_info.devs[t.userdev.id]=t.userdev,t.widget_last=e)})}catch(e){return Promise.reject(e)}},infoLog:function(){var o=t.widget_info;return e.green.bold("[🏷️ NS:"+o.namespace+"] [🪪 ID:"+o.id+"] [NAME:"+o.name+"]")}};t.parse(o);var i=function(){if(t.parseOk)return t.pathWG=t.pathWG+t.widget_info.namespace+"/"+t.widget_info.id,t.pathWGUser=t.pathWGUser+t.userdev.id+"/"+t.widget_info.id,t.pathWGBkp=t.pathWGBkp+t.widget_info.namespace+"/"+t.widget_info.id+"/"+t.widget_info.version,Promise.resolve(t.checkFirstVersion()).then(function(){});t.pathWG=t.pathWG+"no-id",t.pathWGUser=t.pathWGUser+"no-id",t.pathWGBkp=t.pathWGBkp+"no-id"}();return Promise.resolve(i&&i.then?i.then(function(){return t}):t)}catch(e){return Promise.reject(e)}}(o,n.userdev)).then(function(e){n.widget=e})}catch(e){return Promise.reject(e)}},publish_widget:function(){try{return Promise.resolve(n.checkNewVersion()).then(function(){null==n.widget.widget_info.prod&&(n.widget.widget_info.prod=!1);var e=n.widget.widget_info;return Promise.resolve(w(n.widget.pathWG,e)).then(function(){return console.log("🚀 widget "+n.widget.infoLog()+" versão "+e.version+" PUBLICADA!"),Promise.resolve(w(n.widget.pathWGUser,e.namespace+"/"+e.id)).then(function(){})})})}catch(e){return Promise.reject(e)}},checkNewVersion:function(){try{var o=n.widget.widget_info,t=n.widget.widget_last;console.log("widget.commit",t.commit),console.log("widget_info.commit",o.commit);var i=function(){if(null!=t.commit&&t.commit!=o.commit)return console.log("🔥 novo commit "+e.green.bold("["+t.id+"] ["+t.name+"] "+o.commit)),Promise.resolve(w(n.widget.pathWGBkp,t)).then(function(){console.log("🗃️  widget antigo "+e.green.bold("["+t.id+"] ["+t.name+"] backup versão "+t.version+" armazenado")),t.version++})}();return Promise.resolve(i&&i.then?i.then(function(){}):void 0)}catch(e){return Promise.reject(e)}}},n);return Promise.resolve(t.parse(o)).then(function(){var o=function(){if(t.widget.parseOk)return console.log("parse ok"),Promise.resolve(t.publish_widget()).then(function(){console.log("📡 "+e.green.bold("escutando por widgets na pasta ")+b.cfg_widgets)})}();if(o&&o.then)return o.then(function(){})})})}catch(e){return Promise.reject(e)}}},_=((m={prefix:"",user_dev:"",setConfig:!1,config:void 0,setPrefix:function(e){_.prefix=e},missingField:function(o,n,t){return null!=o||(console.log("🙁 "+e.red.bold("informações não encontradas...")),console.log("🤔 "+e.blue("você adicionou o atributo ["+n+"] no "+t+" ?")),!1)}}).setConfig=function(e){_.setConfig=!0,_.missingField(e.user_dev,"user_dev","config.json")&&_.missingField(e.user_dev.id,"user_dev.id","config.json")&&_.missingField(e.user_dev.name,"user_dev.name","config.json")&&(_.config=e,_.user_dev=e.user_dev)},m.splash=function(){console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱"),console.log("  🟥🔷 "+_.prefix+" widget"),console.log("  {}🟪 CREATOR (v 1.0)"),console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱"),console.log(e.yellow.bold("👨‍💻 Olá "+_.user_dev.name+"!"))},m.init=function(){if(!_.setConfig)return console.log("🙁 "+e.red.bold("config não inicializado...")),void console.log("🤔 "+e.blue("você chamou setConfig() ?"));_.splash(),b.init(_.config)},m);export{_ as creator};
//# sourceMappingURL=widget-creator.module.js.map
