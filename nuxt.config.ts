
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  devModules: [
    '@nuxtjs/tailwindcss'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: 'https://connpass.com/api/v1/event/',
      pathRewrite: {
        '^/api' : '/'
        }
      }
  },
  /*
  ** Global CSS
  */
  css: [
    'normalize.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Build configuration
  */
  build: {
  }
}
