require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

var { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
  siteMetadata: {
    title: `Christmas gift`,
    description: `Pick a friend for a christmas.`,
    author: `@Arkitekto`,
  },
  developMiddleware: app => {
    if (process.env.API_URL) {
      app.use(
        '/api/',
        createProxyMiddleware({
          target: process.env.API_URL || '/',
          changeOrigin: true,
          secure: false,
        })
      );
    } else {
      app.use(
        '/api/',
        createProxyMiddleware({
          target: 'http://localhost:5000',
          changeOrigin: true,
          secure: false,
          pathRewrite: {
            '/api/api' : '/api'
          }
        })
      );
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        header: true,
        anonymize: true,
        trackingId: "G-72XJ5S2RF2",
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
    resolve: `gatsby-plugin-intl`,
    options: {
      // language JSON resource path
      path: `${__dirname}/src/intl`,
      // supported language
      languages: [`en`, `pl`],
      // language file path
      defaultLanguage: `en`,
      // option to redirect to `/ko` when connecting `/`
      redirect: true,
    },
  },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
