import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # In CSS, replace background-image: url('...png/jpg') with .webp
    if filepath.endswith('.css'):
        content = re.sub(r"url\(['\"]?(.*?)\.(png|jpg|jpeg)['\"]?\)", r"url('\1.webp')", content, flags=re.IGNORECASE)
    
    elif filepath.endswith('.html'):
        # Replace src="...png/jpg" with src="...webp"
        content = re.sub(r'src=["\']([^"\']+)\.(png|jpg|jpeg)["\']', r'src="\1.webp"', content, flags=re.IGNORECASE)
        # Also inline style background images
        content = re.sub(r"url\(['\"]?([^'\"]+)\.(png|jpg|jpeg)['\"]?\)", r"url('\1.webp')", content, flags=re.IGNORECASE)
        
        # We need to add loading="lazy" decoding="async" for <img> tags that don't have it, unless they are hero/preloader.
        # But for now, we just ensure webp replacements. I will manually inject preload where needed.
        
        # Replace the unsplash url in about.html with a local placeholder to avoid third party dependencies as requested
        content = re.sub(r'src="https://images.unsplash.com[^"]+"', r'src="assets/images/portfolio/edit-1.webp"', content)
        content = re.sub(r"this\.src='event-bg\.png'", r"this.src='event-bg.webp'", content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

if __name__ == "__main__":
    directory = r"g:\AMF Studio"
    for root, _, files in os.walk(directory):
        if "node_modules" in root or ".git" in root or "assets" in root:
            continue
        for f in files:
            if f.endswith('.html') or f.endswith('.css'):
                process_file(os.path.join(root, f))
