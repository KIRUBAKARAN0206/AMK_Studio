import os
import re

def process_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    original = content
    filename = os.path.basename(filepath)
    
    # 1. Preload specific hero images
    preload_img = None
    if filename == "index.html": preload_img = "home-bg.webp"
    elif filename == "about.html": preload_img = "about-bg.webp"
    elif filename == "contact.html": preload_img = "assets/images/portfolio/event-1.webp"
    elif filename == "portfolio.html": preload_img = "assets/images/portfolio/wedding-1.webp"
    
    if preload_img and f'<link rel="preload" href="{preload_img}"' not in content:
        preload_tag = f'\n    <link rel="preload" href="{preload_img}" as="image" fetchpriority="high">\n</head>'
        content = content.replace("</head>", preload_tag)
        
    # 2. Add loading="lazy" decoding="async" to all img tags EXCEPT preloader logo
    # We will use regex to find all img tags, and if they don't have loading="lazy", add it.
    
    def repl_img(match):
        tag = match.group(0)
        # Skip logo (since it might be LCP/preloader)
        if 'src="logo.webp"' in tag or 'src="logo.png"' in tag:
            return tag
            
        if 'loading="lazy"' not in tag:
            tag = tag.replace('<img ', '<img loading="lazy" decoding="async" ')
        return tag

    content = re.sub(r'<img [^>]+>', repl_img, content)
    
    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated HTML tags in {filename}")

if __name__ == "__main__":
    directory = r"g:\AMF Studio"
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            process_html_file(os.path.join(directory, filename))
