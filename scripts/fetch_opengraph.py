#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import json
import re
from pathlib import Path
from urllib.parse import urlparse

def extract_urls_from_markdown(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    og_link_pattern = r'\{\{<\s*og-link\s+url="([^"]+)"\s*>\}\}'
    urls = re.findall(og_link_pattern, content)
    
    return list(set(urls))

def get_image_score(img_url, width, height):
    if not width or not height:
        return 0
    try:
        w = int(width)
        h = int(height)
    except (ValueError, TypeError):
        return 0
    if w < 20 or h < 20 or w > 2999 or h > 2999:
        return 0
    
    aspect_ratio = w / h if h > 0 else 0
    if aspect_ratio < 0.5 or aspect_ratio > 3:
        return 0
    
    ideal_ratios = [16/9, 9/16, 4/3, 3/4, 1/1, 3/2, 2/3]
    ratio_score = min([abs(aspect_ratio - ratio) for ratio in ideal_ratios])
    
    size_score = min(w * h / 1000000, 10)
    return size_score / (1 + ratio_score)

def find_fallback_image(soup, base_url):
    candidates = []
    
    for img in soup.find_all('img'):
        src = img.get('src') or img.get('data-src')
        if not src:
            continue
        
        if src.startswith('//'):
            src = 'https:' + src
        elif src.startswith('/'):
            from urllib.parse import urljoin
            src = urljoin(base_url, src)
        elif not src.startswith('http'):
            continue
        
        if any(keyword in src.lower() for keyword in ['tracking', 'pixel', 'analytics', 'beacon', '1x1', 'spacer']):
            continue
        
        width = img.get('width')
        height = img.get('height')
        
        score = get_image_score(src, width, height)
        
        if score > 0:
            candidates.append({
                'url': src,
                'score': score,
                'width': width,
                'height': height,
                'alt': img.get('alt', '')
            })

    if candidates:
        best = sorted(candidates, key=lambda x: x['score'], reverse=True)[0]
        return best['url'], best.get('alt', '')
    
    return None, None

def get_opengraph_tags(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        og_data = {
            'url': url,
            'domain': urlparse(url).netloc
        }
        
        for tag in soup.find_all('meta'):
            prop = tag.get('property', '')
            if prop.startswith('og:'):
                og_data[prop.replace('og:', '')] = tag.get('content', '')
        
        if not og_data.get('image'):
            fallback_img, fallback_alt = find_fallback_image(soup, url)
            if fallback_img:
                og_data['image'] = fallback_img
                if fallback_alt:
                    og_data['image:alt'] = fallback_alt
        
        if not og_data.get('title'):
            title_tag = soup.find('title')
            if title_tag:
                og_data['title'] = title_tag.string
        
        if not og_data.get('description'):
            desc_tag = soup.find('meta', attrs={'name': 'description'})
            if desc_tag:
                og_data['description'] = desc_tag.get('content', '')
        
        return og_data
        
    except Exception as e:
        print(f"Error fetching {url}: {str(e)}")
        return None

def main():
    project_root = Path(__file__).parent.parent
    netzwerk_file = project_root / 'content' / 'netzwerk.md'
    output_file = project_root / 'data' / 'opengraph.json'
    
    print("Extracting URLs from netzwerk.md...")
    urls = extract_urls_from_markdown(netzwerk_file)
    print(f"Found {len(urls)} URLs")
    
    opengraph_data = {}
    
    for url in urls:
        print(f"Fetching OpenGraph data for: {url}")
        og_data = get_opengraph_tags(url)
        if og_data:
            opengraph_data[url] = og_data
    
    output_file.parent.mkdir(parents=True, exist_ok=True)
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(opengraph_data, f, indent=2, ensure_ascii=False)
    
    print(f"\nOpenGraph data saved to: {output_file}")
    print(f"Total entries: {len(opengraph_data)}")

if __name__ == '__main__':
    main()
