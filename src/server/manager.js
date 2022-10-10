import chalk from 'chalk'
import widget_model from '../e2aWidget/models/widget-model.js'
import widget_item from "./widget_item.js"

const manager = function (userdev) {
    const self = {
        widget: null,
        userdev,

        async parse(data) {
            self.widget = await widget_item(data, self.userdev)
        },

        async publish_widget() {
            //console.log('self.widget.pathWG',self.widget.pathWG);

            await self.checkNewVersion()
            if (self.widget.widget_info.prod == undefined) {
                self.widget.widget_info.prod = false
            }
            let widget_new = self.widget.widget_info
            await widget_model.set(self.widget.pathWG, widget_new)
            console.log(`🚀 widget ${self.widget.infoLog()} versão ${widget_new.version} PUBLICADA!`);
            await widget_model.set(self.widget.pathWGUser, widget_new.namespace + '/' + widget_new.id)
        },

        async checkNewVersion() {
            let widget_info = self.widget.widget_info 
            let widget = self.widget.widget_last
            console.log('widget.commit', widget.commit);
            console.log('widget_info.commit', widget_info.commit);
            if (widget.commit != undefined && widget.commit != widget_info.commit) {
                console.log('🔥 novo commit ' + chalk.green.bold(`[${widget.id}] [${widget.name}] ${widget_info.commit}`));
                //let backup_path = 'widgets_backup/' + widget_info.namespace + '/' + widget.id + '/' + widget.version
                await widget_model.set(self.widget.pathWGBkp, widget)
                console.log('🗃️  widget antigo ' + chalk.green.bold(`[${widget.id}] [${widget.name}] backup versão ${widget.version} armazenado`));
                widget.version++
            }

        }
    }
    return self
}

export default manager