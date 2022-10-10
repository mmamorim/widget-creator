import chokidar from 'chokidar'
import appRoot from 'app-root-path'
import chalk from 'chalk'
import { readFileSync } from 'fs'
import manager from './manager.js'

const server = {
    cfg_widgets: '',
    path: appRoot.path + "/",
    user_dev: {}, 

    init(config) {
        console.log('config',config);
        server.cfg_widgets = config.widgets_folder
        server.path = server.path + server.cfg_widgets
        server.user_dev = config.user_dev

        const watcher = chokidar.watch(server.path, {
            persistent: true
        });
        watcher
            .on('change', (path, stats) => {
                let path_names = path.split(`/${server.cfg_widgets}/`)
                //console.log(path_names)
                server.fileChange(path, path_names[1], stats.size)
            })
            console.log('📡 ' + chalk.green.bold(`escutando por widgets na pasta `)+server.cfg_widgets);        
    },

    async read(filePath) {
        try {
            let data = readFileSync(filePath, { encoding: 'utf8' })
            return data
        } catch (error) {
            if (error.code == 'ENOENT') {
                console.log(`[${filePath}] não encontrado!`);
            } else {
                console.log(`[${filePath}] ERRO desconhecido!`);
            }
        }
    },

    async fileChange(path, fileName, size) {
        //console.log({path,fileName,size});
        console.log('👀 ' + chalk.blue.bold(`Opa! percebi algo...`));
        console.log('👀 ' + chalk.green.bold(`[${fileName}] alterado...`));
        let data = await server.read(path)
        //console.log("data", data);
        let m = manager(server.user_dev) 
        await m.parse(data)
        if(m.widget.parseOk) {
            console.log('parse ok');
            //console.log('m.widget',m.widget.widget_info);
            await m.publish_widget()
            console.log('📡 ' + chalk.green.bold(`escutando por widgets na pasta `) + server.cfg_widgets);
        }
    }

}

export default server