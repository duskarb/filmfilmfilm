// Cloudflare Worker — Notion API proxy for GitHub Pages deployment
// Deploy: https://dash.cloudflare.com → Workers → New Worker → paste this script
// Add secret: Settings → Variables → NOTION_TOKEN = secret_xxx
// Set Access-Control-Allow-Origin to your actual GitHub Pages domain

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Notion-Version',
        },
      });
    }

    const url = new URL(request.url);
    const notionPath = url.pathname.replace('/notion-proxy', '');
    const notionUrl = `https://api.notion.com${notionPath}${url.search}`;

    const response = await fetch(notionUrl, {
      method: request.method,
      headers: {
        Authorization: `Bearer ${env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(request.method) ? null : request.body,
    });

    const body = await response.text();

    return new Response(body, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Content-Type': 'application/json',
      },
    });
  },
};
