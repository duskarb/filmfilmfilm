/// <reference types="vite/client" />
const NOTION_BASE = (import.meta.env.VITE_NOTION_PROXY_BASE as string | undefined) ?? '/api/notion';

type RichText = {
  type: 'text';
  text: { content: string; link: null };
};

type NotionBlock =
  | { object: 'block'; type: 'paragraph'; paragraph: { rich_text: RichText[] } }
  | { object: 'block'; type: 'heading_1'; heading_1: { rich_text: RichText[] } }
  | { object: 'block'; type: 'heading_2'; heading_2: { rich_text: RichText[] } }
  | { object: 'block'; type: 'heading_3'; heading_3: { rich_text: RichText[] } }
  | { object: 'block'; type: 'bulleted_list_item'; bulleted_list_item: { rich_text: RichText[] } }
  | { object: 'block'; type: 'numbered_list_item'; numbered_list_item: { rich_text: RichText[] } }
  | { object: 'block'; type: 'quote'; quote: { rich_text: RichText[] } }
  | { object: 'block'; type: 'divider'; divider: Record<string, never> };

function makeRichText(content: string): RichText[] {
  return [{ type: 'text', text: { content, link: null } }];
}

function makeBlock(type: string, content: string): NotionBlock {
  if (type === 'divider') {
    return { object: 'block', type: 'divider', divider: {} } as NotionBlock;
  }
  return {
    object: 'block',
    type,
    [type]: { rich_text: makeRichText(content) },
  } as NotionBlock;
}

export function markdownToNotionBlocks(markdown: string): NotionBlock[] {
  const lines = markdown.split('\n');
  const blocks: NotionBlock[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;

    if (trimmed === '---') {
      blocks.push(makeBlock('divider', ''));
    } else if (trimmed.startsWith('### ')) {
      blocks.push(makeBlock('heading_3', trimmed.slice(4)));
    } else if (trimmed.startsWith('## ')) {
      blocks.push(makeBlock('heading_2', trimmed.slice(3)));
    } else if (trimmed.startsWith('# ')) {
      blocks.push(makeBlock('heading_1', trimmed.slice(2)));
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      blocks.push(makeBlock('bulleted_list_item', trimmed.slice(2)));
    } else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push(makeBlock('numbered_list_item', trimmed.replace(/^\d+\.\s/, '')));
    } else if (trimmed.startsWith('> ')) {
      blocks.push(makeBlock('quote', trimmed.slice(2)));
    } else {
      blocks.push(makeBlock('paragraph', trimmed));
    }
  }

  return blocks;
}

async function notionFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${NOTION_BASE}/v1${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Notion-Version': '2022-06-28',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`Notion API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

async function getChildBlockIds(pageId: string): Promise<string[]> {
  const data = await notionFetch(`/blocks/${pageId}/children`);
  return ((data.results ?? []) as { id: string }[]).map((b) => b.id);
}

async function deleteBlock(blockId: string): Promise<void> {
  await notionFetch(`/blocks/${blockId}`, { method: 'DELETE' });
}

async function appendBlocks(pageId: string, blocks: NotionBlock[]): Promise<void> {
  await notionFetch(`/blocks/${pageId}/children`, {
    method: 'PATCH',
    body: JSON.stringify({ children: blocks }),
  });
}

export async function updatePageContent(pageId: string, markdown: string): Promise<void> {
  const existingIds = await getChildBlockIds(pageId);

  for (const id of existingIds) {
    await deleteBlock(id);
  }

  const newBlocks = markdownToNotionBlocks(markdown);
  if (newBlocks.length === 0) return;

  const CHUNK_SIZE = 100;
  for (let i = 0; i < newBlocks.length; i += CHUNK_SIZE) {
    await appendBlocks(pageId, newBlocks.slice(i, i + CHUNK_SIZE));
  }
}
