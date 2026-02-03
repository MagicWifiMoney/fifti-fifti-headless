const https = require('https');
const fs = require('fs');

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function exportWordPress() {
  const baseUrl = 'https://fifti-fifti.net/wp-json/wp/v2';
  const data = {
    posts: [],
    pages: [],
    categories: [],
    tags: []
  };

  console.log('Fetching posts...');
  let page = 1;
  let hasMore = true;
  
  while (hasMore) {
    try {
      const posts = await fetchJSON(`${baseUrl}/posts?per_page=100&page=${page}`);
      
      if (posts.length === 0) {
        hasMore = false;
      } else {
        data.posts.push(...posts);
        console.log(`Fetched ${posts.length} posts (page ${page})`);
        page++;
      }
    } catch (e) {
      hasMore = false;
    }
  }

  console.log('Fetching pages...');
  data.pages = await fetchJSON(`${baseUrl}/pages?per_page=100`);

  console.log('Fetching categories...');
  data.categories = await fetchJSON(`${baseUrl}/categories?per_page=100`);

  console.log('Fetching tags...');
  data.tags = await fetchJSON(`${baseUrl}/tags?per_page=100`);

  console.log('\nExport Summary:');
  console.log(`- Posts: ${data.posts.length}`);
  console.log(`- Pages: ${data.pages.length}`);
  console.log(`- Categories: ${data.categories.length}`);
  console.log(`- Tags: ${data.tags.length}`);

  fs.writeFileSync('wordpress-export.json', JSON.stringify(data, null, 2));
  console.log('\nExported to wordpress-export.json');
}

exportWordPress().catch(console.error);
