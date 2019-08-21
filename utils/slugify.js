module.exports = (str) => {
	const slug = str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
	return slug;
};
