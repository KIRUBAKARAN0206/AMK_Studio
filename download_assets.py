import os
import urllib.request
import time

directories = [
    "assets/images/portfolio",
    "assets/images/behind-the-scenes",
    "assets/images/videos",
    "assets/images/clients"
]

for d in directories:
    os.makedirs(os.path.join(r"g:\AMF Studio", d), exist_ok=True)

images = {
    # Portfolio
    "assets/images/portfolio/wedding-1.jpg": "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/pre-wedding-1.jpg": "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/brand-1.jpg": "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/event-1.jpg": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/fashion-1.jpg": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/product-1.jpg": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/audio-1.jpg": "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/edit-1.jpg": "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/edit-2.jpg": "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=800&auto=format&fit=crop",
    "assets/images/portfolio/wedding-2.jpg": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop",
    
    # BTS
    "assets/images/behind-the-scenes/bts-1.jpg": "https://images.unsplash.com/photo-1582255269786-db933f25b399?q=80&w=800&auto=format&fit=crop",
    "assets/images/behind-the-scenes/bts-2.jpg": "https://images.unsplash.com/photo-1519781423456-eef416801948?q=80&w=800&auto=format&fit=crop",
    "assets/images/behind-the-scenes/bts-3.jpg": "https://images.unsplash.com/photo-1586940733560-6ffc1f01de98?q=80&w=800&auto=format&fit=crop",
    
    # Videos
    "assets/images/videos/video-thumb-1.jpg": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    "assets/images/videos/video-thumb-2.jpg": "https://images.unsplash.com/photo-1601287955541-0dc5bdcb4555?q=80&w=800&auto=format&fit=crop",
    "assets/images/videos/video-thumb-3.jpg": "https://images.unsplash.com/photo-1534067783941-51c568d29876?q=80&w=800&auto=format&fit=crop"
}

opener = urllib.request.build_opener()
opener.addheaders = [('User-agent', 'Mozilla/5.0')]
urllib.request.install_opener(opener)

for path, url in images.items():
    full_path = os.path.join(r"g:\AMF Studio", path)
    if not os.path.exists(full_path):
        try:
            print(f"Downloading {path}...")
            urllib.request.urlretrieve(url, full_path)
            time.sleep(0.5) # prevent rate limit
        except Exception as e:
            print(f"Failed to download {path}: {e}")
    else:
        print(f"Skipping {path}, already exists.")

print("Done downloading assets.")
