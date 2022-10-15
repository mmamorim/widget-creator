import chalk from 'chalk'
import widget_model from '../e2aWidget/models/widget-model.js'
//import widget_item from "./widget_item.js"

const manager = function (userdev) {
    const self = {
        gadget: null,
        userdev,

        async parse(dataJSON, dataMD) {
            let objJSON = JSON.parse(dataJSON)
            //console.log(objJSON);
            //console.log(dataMD);
            let ok = self.checkDataJSON(objJSON)
            if (!ok) {
                self.gadget = { parseOk: false } //await widget_item(data, self.userdev)
                return false
            } else {
                self.gadget = objJSON
                self.gadget.readme = dataMD
                self.gadget.parseOk = true
            }
        },

        async publish_gadget() {
            //console.log('self.gadget', self.gadget);
            await self.checkNewVersion()
            if (self.gadget.prod == undefined) {
                self.gadget.prod = false
            }
            let path = `gadgets/${self.gadget.category}/${self.gadget.id}`
            await widget_model.set(path, self.gadget)
            // Atualizando desenvolvedor
            let path_dev = `users_devs/${self.userdev.id}/gadgets/${self.gadget.category}/${self.gadget.id}`
            //console.log(path_dev,`${self.gadget.category}|${self.gadget.id}`);
            await widget_model.set(path_dev, `${self.gadget.category}|${self.gadget.id}`)
            console.log('🚀 novo gadget ' + chalk.green.bold(`[${self.gadget.category}] [${self.gadget.id}] versão ${self.gadget.version} PUBLICADO!`));
        },

        async checkNewVersion() {
            let path = `gadgets/${self.gadget.category}/${self.gadget.id}`
            //console.log('path', path);
            let gadget_last = await widget_model.get(path)
            if (gadget_last == null) {
                console.log(`👀 gadget ${chalk.green.bold(`[${self.gadget.category}] [${self.gadget.id}] ${self.gadget.commit}`)} PRIMEIRA VERSÃO`);
                self.gadget.version = 1
                return
            } else {
                self.gadget.version = gadget_last.version
            }
            //console.log('gadget_last', gadget_last);
            if (gadget_last.commit != self.gadget.commit) {
                console.log('🔥 novo commit ' + chalk.green.bold(`[${self.gadget.category}] [${self.gadget.id}] ${self.gadget.commit}`));
                //let backup_path = 'widgets_backup/' + widget_info.namespace + '/' + widget.id + '/' + widget.version
                let backup_path = `gadgets_backup/${self.gadget.category}/${self.gadget.id}/${self.gadget.version}`
                await widget_model.set(backup_path, gadget_last)
                console.log('🗃️  gadget antigo ' + chalk.green.bold(`[${gadget_last.category}] [${gadget_last.id}] backup versão ${gadget_last.version} armazenado`));
                if(self.gadget.version == undefined) {
                    self.gadget.version = 1
                } else { 
                    self.gadget.version++
                }
            }

        },

        missingField(field, attribute_name, location) {
            if (field == undefined) {
                console.log('🙁 ' + chalk.red.bold(`informações não encontradas...`));
                console.log('🤔 ' + chalk.blue(`você adicionou o atributo [${attribute_name}] no ${location} ?`));
                return false
            }
            return true
        },

        checkDataJSON(objJSON) {
            if (!self.missingField(objJSON.id, 'id', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.category, 'category', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.name, 'name', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.commit, 'commit', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.author, 'author', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.description, 'description', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.homepage, 'homepage', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.icon, 'icon', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.main_widget, 'main_widget', 'JSON do gadget')) {
                return false
            }
            if (!self.missingField(objJSON.main_widget_namespace, 'main_widget_namespace', 'JSON do gadget')) {
                return false
            }
            console.log('👀 gadget ' + chalk.green.bold(`[${objJSON.id}] [${objJSON.name}] ok`));
            return true
        },

    }
    return self
}

export default manager