const defaultOptions = require(`./utils/default-options.js`);

module.exports = {
	plugins: [
		'gatsby-plugin-theme-ui',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'books',
				path: defaultOptions.contentPath
			}
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [ '.mdx', '.md' ],
				defaultLayouts: {
					default: require.resolve(`./src/templates/frontPage.jsx`)
				},
				gatsbyRemarkPlugins: [
					{
						resolve: `gatsby-remark-prismjs`,
						options: {}
					},
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 1035
						}
					}
				],
				plugins: [ `gatsby-remark-images` ],
				remarkPlugins: [ require('remark-math'), require('remark-html-katex'), require('remark-slug') ]
			}
		}
	]
};
