import chokidar from 'chokidar'
import appRoot from 'app-root-path'
import chalk from 'chalk'
import { readFileSync, existsSync } from 'fs'
import manager from './manager-gadgets.js'
import sharp from 'sharp'

const server = {
    cfg_gadgets: '',
    path: appRoot.path + "/",
    user_dev: {},

    init(config) {
        //console.log('config',config);
        server.cfg_gadgets = config.gadgets_folder
        server.path = server.path + server.cfg_gadgets
        server.user_dev = config.user_dev

        const watcher = chokidar.watch(server.path, {
            persistent: true
        });
        watcher.on('change', (path, stats) => {
            let path_names = path.split(`/${server.cfg_gadgets}/`)
            //console.log(path_names)
            server.fileChange(path, path_names[1], stats.size)
        })
        console.log('📡 ' + chalk.green.bold(`escutando por GADGETS na pasta `) + server.cfg_gadgets);
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

        let pathJSON = ''
        let pathMD = ''
        let dotPosition = path.lastIndexOf(".")
        let extension = path.substr(dotPosition)
        //console.log('extension',extension);
        if (extension == '.json') {
            //console.log('json alterado');
            pathJSON = path
            pathMD = path.substr(0, dotPosition) + '.md'
        } else {
            //console.log('md alterado');
            pathJSON = path.substr(0, dotPosition) + '.json'
            pathMD = path
        }
        //console.log('pathJSON',pathJSON);
        //console.log('pathMD',pathMD);
        let dataJSON = await server.read(pathJSON)
        let dataMD = await server.read(pathMD)
        //console.log("dataJSON", dataJSON);
        //console.log("dataMD", dataMD);

        let m = manager(server.user_dev)
        await m.parse(dataJSON, dataMD)
        if (m.gadget.parseOk) {
            //console.log('parse ok');
            let data_icon = await server.loadIcon(m.gadget, path)
            if (!data_icon) {
                console.log('🙁 ' + chalk.red.bold(`GADGET com problemas...`));
            } else {
                m.gadget.icon = data_icon
            }
            await m.publish_gadget()
            console.log('📡 ' + chalk.green.bold(`escutando por GADGETS na pasta `) + server.cfg_gadgets);
        } else {
            console.log('🙁 ' + chalk.red.bold(`GADGET parse error...`));
        }
    },

    async loadIcon(gadget, path) {
        let slash_position = path.lastIndexOf("/")
        let path_folder = path.substr(0, slash_position)
        //console.log('path_folder', path_folder);
        //console.log('gadget.icon', gadget.icon);
        if (gadget.icon.charAt(0) == '@') {
            let icon_file_name = gadget.icon.substr(1)
            //console.log('icon_file_name', icon_file_name);
            let file_path = path_folder + '/' + icon_file_name
            let exist = await existsSync(file_path)
            if (exist) {
                let image = await sharp(file_path)
                const metadata = await image.metadata()
                //console.log('metadata',metadata);
                let size_prefer = 64
                if(metadata.width != size_prefer || metadata.height != size_prefer) {
                    console.log('📸 ' + chalk.red.bold(`Tamanho da imagem do icone diferente de ${size_prefer}x${size_prefer}...`)+' redimensionando...');
                }
                let img_new = image.resize(size_prefer, size_prefer)
                let img_buffer = await img_new.toBuffer()
                let img_base64 = img_buffer.toString('base64')
                //let image = await sharp('./artes/logo.svg')
                console.log('📸 ' + chalk.green.bold(`Imagem do icone gerada: ${img_base64.length} bytes`)+ ' ✔️');
                //console.log(img_base64);
                //console.log(img_base64.length);
                let data_uri_prefix = 'data:image/' + metadata.format + ';base64,'
                let data = data_uri_prefix + img_base64
                //console.log('data', data);
                return data
            } else {
                console.log('🙁 ' + chalk.red.bold(`imagem do icone `) + icon_file_name + chalk.red.bold(' não encontrada'));
                return false
            }
        }
        return gadget.icon
    }
}

export default server