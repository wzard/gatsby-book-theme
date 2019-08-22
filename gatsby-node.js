Object.defineProperty(Array.prototype, 'flat', {
	value: function(depth = 1) {
		return this.reduce(function(flat, toFlatten) {
			return flat.concat(Array.isArray(toFlatten) && depth > 1 ? toFlatten.flat(depth - 1) : toFlatten);
		}, []);
	}
});

// // gatsby-node.js
// exports.onCreateWebpackConfig = ({ actions }) => {
// 	actions.setWebpackConfig({
// 		resolve: {
// 			modules: [ path.resolve(__dirname, 'src'), 'node_modules' ]
// 		}
// 	});
// };

/**
 * Create Book Directories on PreBootstrap.
 */
exports.onPreBootstrap = require(`./gatsby/onPreBootstrap`);

/**
 * Modify Schema to add Book Types
 */
exports.createSchemaCustomization = require(`./gatsby/createSchemaCustomization`);

/**
 * Add Resolvers for the newly added Schema
 */
exports.createResolvers = require(`./gatsby/createResolvers`);

/**
 * Add Resolvers for the newly added Schema
 */
exports.sourceNodes = require(`./gatsby/sourceNodes`);

/**
 * Create Mdx nodes from MDX files.
 */
exports.onCreateNode = require(`./gatsby/onCreateNode`);

/**
 * Generate Book Pages
 */
exports.createPages = require(`./gatsby/createPages`);
