const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ]
})

module.exports = { chainWebpack: config => { config.plugin('html').tap(args => { args[0].title = 'Cartostrófico - 2023'; return args; }); } }