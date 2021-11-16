function loadPosts(success, failure, posts) {
  const post = { title: 'Static post added as part of posts/load call', content: '' };
  posts.batchInsert(Array(10000).fill(post))
    .then(success)
    .catch((error) => failure({
      message: 'Failed to load posts',
      status: 500,
      raw: JSON.stringify(error)
    }));
}

module.exports = loadPosts;
