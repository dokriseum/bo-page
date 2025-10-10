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
    
    url_pattern = r'https?://[^\s\)\]<>]+'
    urls = re.findall(url_pattern, content)
    
    return list(set(urls))

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
