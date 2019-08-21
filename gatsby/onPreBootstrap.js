const fs = require('fs-extra');
const slugify = require(`../utils/slugify.js`);
const defaultOptions = require(`../utils/default-options.js`);

module.exports = ({ reporter }, options) => {
	options = defaultOptions;
	const contentPath = options.contentPath || 'books';

	if (!fs.existsSync(contentPath)) {
		reporter.info(`creating the ${contentPath} directory`);
		fs.mkdirSync(contentPath);
		options.books.forEach((book) => {
			const bookPath = `${contentPath}/${slugify(book.name)}`;
			if (!fs.existsSync(bookPath)) {
				reporter.info(`creating the ${bookPath} directory`);
				fs.mkdirSync(bookPath);

				// Copying Example Content from src/data
				try {
					fs.copySync('src/data', bookPath);
					reporter.info(`Copied the example book to ${bookPath} directory`);
				} catch (err) {
					reporter.info(`Error copying example book to ${bookPath} directory`);
					console.log(err);
				}
			}
		});
	} else {
		options.books.forEach((book) => {
			const bookPath = `${contentPath}/${slugify(book.name)}`;
			if (!fs.existsSync(bookPath)) {
				reporter.info(`creating the ${bookPath} directory`);
				fs.mkdirSync(bookPath);

				// Copying Example Content from src/data
				try {
					fs.copySync('src/data', bookPath);
					reporter.info(`Copied the example book to ${bookPath} directory`);
				} catch (err) {
					reporter.info(`Error copying example book to ${bookPath} directory`);
					console.log(err);
				}
			}
		});
	}
};
