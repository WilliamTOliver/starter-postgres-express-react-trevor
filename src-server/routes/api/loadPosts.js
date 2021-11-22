module.exports = (posts) => posts.batchInsert(Array(10000).fill({ title: 'Static post added as part of posts/load call', content: '' }));
