/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://kunftmarketplace.io',
  generateRobotsTxt: true, // (optional)
  exclude: ['/profilte', '/admin/*'],
  transform: async (config, path) => {
    // only create changefreq along with path
    // returning partial properties will result in generation of XML field with only returned values.

    if (path.startsWith('/collections')) {
      // This returns `path` & `changefreq`. Hence it will result in the generation of XML field with `path` and  `changefreq` properties only.
      return {
        loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
        changefreq: 'weekly',
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: config.alternateRefs ?? [],
      }
    }

    // Use default transformation for all other cases
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: 'yearly',
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    }
  },
  // ...other options
}

module.exports = config
