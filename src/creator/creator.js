import chalk from 'chalk'
import server from "../server/server.js"

const creator = {
    prefix: '',
    user_dev: '',
    set_config: false,
    config: undefined,

    setPrefix(prefix) {
        creator.prefix = prefix
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
        creator.set_config = true
        if(!creator.missingField(config.user_dev,'user_dev','config.json')) {
            return
        }
        if(!creator.missingField(config.user_dev.id,'user_dev.id','config.json')) {
            return
        }
        if(!creator.missingField(config.user_dev.name,'user_dev.name','config.json')) {
            return
        }
        creator.config = config
        creator.user_dev = config.user_dev
    },

    splash() {
        console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱");
        console.log(`  🟥🔷 ${creator.prefix} widget`);
        console.log("  {}🟪 CREATOR (v 1.0)");
        console.log("🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱🧱");

        console.log(chalk.yellow.bold(`👨‍💻 Olá ${creator.user_dev.name}!`));
    },

    init() {
        if(!creator.set_config) {
            console.log('🙁 ' + chalk.red.bold(`config não inicializado...`));
            console.log('🤔 ' + chalk.blue(`você chamou setConfig() ?`));
            return
        }
        creator.splash()
        server.init(creator.config)
    }
}

export default creator