import json
import os
import urllib.request
import ssl

# --- 설정 (Settings) ---
NOTION_TOKEN = os.environ.get("NOTION_TOKEN", "")
DATABASE_ID = "33f9e743cbe480aca9b7c61be8437499"
OUTPUT_FILE = "src/data.json"
# -----------------------

HEADERS = {
    "Authorization": f"Bearer {NOTION_TOKEN}",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}
CTX = ssl._create_unverified_context()

def notion_request(url, method="GET", data=None):
    body = json.dumps(data).encode() if data else None
    req = urllib.request.Request(url, headers=HEADERS, method=method, data=body)
    with urllib.request.urlopen(req, context=CTX) as r:
        return json.loads(r.read().decode('utf-8'))

def fetch_page_content(page_id):
    """페이지 본문 블록을 마크다운 텍스트로 변환"""
    url = f"https://api.notion.com/v1/blocks/{page_id}/children"
    data = notion_request(url)
    lines = []
    for block in data.get("results", []):
        block_type = block.get("type")
        block_data = block.get(block_type, {})
        rich_texts = block_data.get("rich_text", [])
        text = "".join(t.get("plain_text", "") for t in rich_texts)

        if block_type == "paragraph":
            lines.append(text)
        elif block_type == "heading_1":
            lines.append(f"# {text}")
        elif block_type == "heading_2":
            lines.append(f"## {text}")
        elif block_type == "heading_3":
            lines.append(f"### {text}")
        elif block_type == "bulleted_list_item":
            lines.append(f"- {text}")
        elif block_type == "numbered_list_item":
            lines.append(f"1. {text}")
        elif block_type == "quote":
            lines.append(f"> {text}")
        elif block_type == "divider":
            lines.append("---")
        else:
            if text:
                lines.append(text)

    return "\n\n".join(lines)

def fetch_notion_database():
    url = f"https://api.notion.com/v1/databases/{DATABASE_ID}/query"
    data = notion_request(url, method="POST")
    movies = []

    for item in data.get("results", []):
        props = item.get("properties", {})
        title = extract_title(props.get("Title", {}) or props.get("이름", {}))
        if not title:
            continue

        info = extract_rich_text(props.get("Info", {}))
        thumbnail = extract_url(props.get("Thumbnail", {}))
        content = fetch_page_content(item["id"])
        
        # Parse info like "2024 · Denis Villeneuve"
        year_val = 0
        director_val = "Unknown"
        if "·" in info:
            parts = info.split("·")
            try:
                year_val = int(parts[0].strip())
            except ValueError:
                pass
            director_val = parts[1].strip() if len(parts) > 1 else "Unknown"
        else:
            director_val = info if info else "Unknown"

        movies.append({
            "id": item.get("id"),
            "title": title,
            "year": year_val,
            "director": director_val,
            "region": "UNKNOWN",
            "idRef": f"#AR-{item.get('id', '00000')[:5].upper()}",
            "thumbnail": thumbnail,
            "content": content
        })

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(movies, f, ensure_ascii=False, indent=2)

    print(f"성공! 총 {len(movies)}개의 영화 데이터를 {OUTPUT_FILE}로 동기화했습니다.")

def extract_title(prop):
    title_list = prop.get("title", [])
    return title_list[0].get("plain_text", "") if title_list else ""

def extract_rich_text(prop):
    return "".join(t.get("plain_text", "") for t in prop.get("rich_text", []))

def extract_url(prop):
    if prop.get("type") == "url":
        return prop.get("url", "") or ""
    return extract_rich_text(prop)

if __name__ == "__main__":
    fetch_notion_database()
