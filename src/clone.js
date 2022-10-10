import clone from './clone/clone.js'

clone.setPrefix('E2A')

clone.setConfig({
    user_dev: {
        id: '18374109840',
        name: 'Marcelo'
    },
    widgets_folder: 'widgets',
    gadgets_folder: 'gadgets',
})

const namespace = 'testes2'
const id = 'WG-TESTE'

clone.init(namespace,id).then(() => {
    process.exit(1);
})