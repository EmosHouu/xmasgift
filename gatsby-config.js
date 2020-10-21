require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  developMiddleware: app => {
    if (process.env.API_URL) {
      app.use(
        '/api',
        createProxyMiddleware({
          target: process.env.API_URL || '/',
          changeOrigin: true,
          secure: false,
        })
      );
    } else {
      app.use(
        '/api',
        createProxyMiddleware({
          target: '/',
          changeOrigin: true,
          secure: false,
          router: {
            'localhost:8000': 'http://localhost:5000'
          }
        })
      );
    }
  },
  plugins: [
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
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
