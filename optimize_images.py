import os
from PIL import Image

def optimize_images():
    directory = r"g:\AMF Studio"
    
    # Process root images
    for filename in os.listdir(directory):
        if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
            filepath = os.path.join(directory, filename)
            # Skip converting already processed ones to avoid issues
            
            try:
                img = Image.open(filepath)
                # Convert to WebP
                base_name = os.path.splitext(filename)[0]
                webp_path = os.path.join(directory, f"{base_name}.webp")
                
                # Keep original if it's the logo or maybe convert anyway
                # Save as WebP
                img.save(webp_path, "webp", optimize=True, quality=80)
                print(f"Converted {filename} to WebP -> {base_name}.webp")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

    # Process assets/images/
    assets_dir = os.path.join(directory, "assets", "images")
    if os.path.exists(assets_dir):
        for root, _, files in os.walk(assets_dir):
            for filename in files:
                if filename.endswith(".png") or filename.endswith(".jpg") or filename.endswith(".jpeg"):
                    filepath = os.path.join(root, filename)
                    try:
                        img = Image.open(filepath)
                        base_name = os.path.splitext(filename)[0]
                        webp_path = os.path.join(root, f"{base_name}.webp")
                        img.save(webp_path, "webp", optimize=True, quality=80)
                        print(f"Converted {filename} to WebP -> {base_name}.webp")
                    except Exception as e:
                        print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    optimize_images()
