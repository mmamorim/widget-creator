import { parseComponent } from 'vue-sfc-parser'
import chalk from 'chalk'
import widget_model from '../e2aWidget/models/widget-model.js'

const widget_item = async function (data, userdev) {

    const self = {
        widget_info: {},
        widget_last: {},
        template: '',
        script: '',
        userdev,
        parseOk: false,
        pathWG: 'widgets/',
        pathWGUser: 'users_devs/',
        pathWGBkp: 'widgets_backup/',

        parse(data) {
            const res = parseComponent(data)
            //console.log(res.styles);
            //return
            if (res.template == null) {
                console.log('🙁 ' + chalk.red.bold(`erro ao interpretar template...`));
                return
            }
            let template = res.template.content.trim()
            //console.log(template)
            if (res.script != null) {
                //console.log(res.script.content)
                let tokens = res.script.content.split('export default')
                let script = tokens[1].trim()

                //console.log(script);
                try {
                    let func = new Function('widget,wg', `return ` + script)
                    let scriptObj = func()
                    //console.log('scriptObj', scriptObj);
                    let widget_info = self.getWidgetInfo(scriptObj)
                    if (widget_info == null) {
                        console.log('🙁 ' + chalk.red.bold(`não foi possível a publicação...`));
                        return
                    }
                    self.widget_info = widget_info
                    self.template = template
                    self.script = script
                    self.parseOk = true
                    //listener.publish_widget(widget_info, template, script)
                } catch (e) {
                    console.log('🙁 ' + chalk.red.bold(`Ohh não! script com erro...`));
                    console.log(chalk.blue(e.name) + ': ' + chalk.red(e.message));
                }
            } else {
                console.log('🙁 ' + chalk.red.bold(`erro ao interpretar script...`));
            }
        },

        getWidgetInfo(scriptObj) {
            let widget_info = scriptObj.widget
            if (widget_info == undefined) {
                console.log('🙁 ' + chalk.red.bold(`informações do widget não encontradas...`));
                console.log('🤔 ' + chalk.blue(`você adicionou o atributo [widget] no component?`));
                return null
            }
            if (widget_info.name == undefined) {
                console.log('🙁 ' + chalk.red.bold(`nome do widget não encontrado...`));
                console.log('🤔 ' + chalk.blue(`você adicionou o atributo [name] p/ o widget?`));
                return null
            }
            if (widget_info.id == undefined) {
                console.log('🙁 ' + chalk.red.bold(`id do widget não encontrado...`));
                console.log('🤔 ' + chalk.blue(`você adicionou o atributo [id] p/ o widget?`));
                return null
            }
            if (widget_info.namespace == undefined) {
                console.log('🙁 ' + chalk.red.bold(`namespace do widget não encontrado...`));
                console.log('🤔 ' + chalk.blue(`você adicionou o atributo [namespace] p/ o widget?`));
                return null
            }
            if (widget_info.commit == undefined) {
                console.log('🙁 ' + chalk.red.bold(`commit do widget não encontrado...`));
                console.log('🤔 ' + chalk.blue(`você adicionou o atributo [commit] p/ o widget?`));
                return null
            }
            console.log('👀 widget ' + chalk.green.bold(`[${widget_info.id}] [${widget_info.name}] encontrado...`));
            return widget_info
        },

        async checkFirstVersion() {
            let widget = await widget_model.get(self.pathWG)
            if(widget == null) {
                console.log(`👀 widget ${self.infoLog()} PRIMEIRA VERSÃO`);
                self.widget_info.devs = {}
                self.widget_info.devs[self.userdev.id] = self.userdev
            } else {
                console.log(`👀 widget ${self.infoLog()} ${widget.version} ENCONTRADA`);
                self.widget_info.devs = widget.devs
                self.widget_info.devs[self.userdev.id] = self.userdev
                self.widget_last = widget
            }
        },

        infoLog() {
            let wg = self.widget_info
            return chalk.green.bold(`[🏷️ NS:${wg.namespace}] [🪪 ID:${wg.id}] [NAME:${wg.name}]`)
        }
    }
    self.parse(data)
    if (self.parseOk) {
        self.pathWG = self.pathWG + self.widget_info.namespace + '/' + self.widget_info.id
        self.pathWGUser = self.pathWGUser + self.userdev.id+'/'+self.widget_info.id
        self.pathWGBkp = self.pathWGBkp + self.widget_info.namespace + '/' + self.widget_info.id + '/' + self.widget_info.version
        await self.checkFirstVersion()
    } else {
        self.pathWG = self.pathWG + 'no-id'
        self.pathWGUser = self.pathWGUser + 'no-id'
        self.pathWGBkp = self.pathWGBkp + 'no-id'
    }
    return self
}

export default widget_item