import chalk from 'chalk'
import widget_model from '../e2aWidget/models/widget-model.js'
import { writeFileSync } from 'fs'

const clone = {
    prefix: '',
    user_dev: '',
    set_config: false,
    config: undefined,

    setPrefix(prefix) {
        clone.prefix = prefix
    },

    missingField(field, attribute_name, location) {
        if (field == undefined) {
            console.log('🙁 ' + chalk.red.bold(`informações não encontradas...`));
            console.log('🤔 ' + chalk.blue(`você adicionou o atributo [${attribute_name}] no ${location} ?`));
            return false
        } 
        return true
    },

    setConfig(config) {
        clone.set_config = true
        if(!clone.missingField(config.user_dev,'user_dev','config.json')) {
            return
        }
        if(!clone.missingField(config.user_dev.id,'user_dev.id','config.json')) {
            return
        }
        if(!clone.missingField(config.user_dev.name,'user_dev.name','config.json')) {
            return
        }
        clone.config = config
        clone.user_dev = config.user_dev
    },

    splash() {
        console.log("〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️");
        console.log(`  🟥🔷 ${clone.prefix} widget`);
        console.log("  {}🟪 CLONE (v 1.0)");
        console.log("〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️〰️");

        console.log(chalk.yellow.bold(`👨‍💻 Olá ${clone.user_dev.name}!`));
    },

    async init(namespace,id) {
        if(!clone.set_config) {
            console.log('🙁 ' + chalk.red.bold(`config não inicializado...`));
            console.log('🤔 ' + chalk.blue(`você chamou setConfig() ?`));
            return
        }
        clone.splash()
        let wg_info = chalk.green.bold(`[🏷️ NS:${namespace}] [🪪 ID:${id}]`)
        console.log('👀 procurando widget ' + wg_info);

        let path = `widgets/${namespace}/${id}`
        let widget = await widget_model.get(path)
        if(widget == null) {
            console.log('🙁 ' + chalk.red.bold(`não encontrado...`));
        } else {
            console.log('👍 ' + chalk.green.bold(`achei`));
            console.log('💫 ' + chalk.blue(`clonando em na pasta `)+clone.config.widgets_folder);
            //console.log('widget',widget);        
            let content = "<template>\n\t"+widget.template+"\n</template>"
            content = content + "\n<script>\nexport default "+widget.script+"\n</script>"
            let file_path = clone.config.widgets_folder+'/'+widget.id+'.vue'
            await writeFileSync(file_path,content)
            console.log('💫 ' + chalk.blue(`arquivo `)+widget.id+'.vue' + chalk.green.bold(` salvo com sucesso!`));
        }

        
        //server.init(creator.config)
    }
}


export default clone