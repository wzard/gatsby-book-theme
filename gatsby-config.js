const defaultOptions = require(`./utils/default-options.js`);

const contentPath = defaultOptions.contentPath;
const books = defaultOptions.books;
const autoGenerate = defaultOptions.autoGenerate;

module.exports = ({ contentPath = contentPath, books = books, autoGenerate = autoGenerate }) => ({
	siteMetadata: {
		title: 'Primer Labs',
		siteUrl: 'https://primerlabs.io', // no trailing slash!,
		description: 'A Personalised AI tutor to help you learn better',
		author: 'PrimerLabs'
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
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
					default: require.resolve(`./src/templates/mdxPage.jsx`)
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
});
