module.exports = {
  devServer: {
    port: process.env.VUE_APP_PORT,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  // css: {
  //   loaderOptions: {
  //     sass: {
  //       prependData: '@import "@/assets/styles/colors.scss";'
  //     }
  //   }
  // },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      display: 'landscape',
      background_color: '#42B883',
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: './src/registerServiceWorker.js',
    },
  },
  runtimeCompiler: true,
};
