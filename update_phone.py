import os
import glob

# Files to process
files = glob.glob('*.html') + glob.glob('*.js')

replacements = {
    "63797 76173": "78128 64905",
    "6379776173": "7812864905",
}

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
        
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
        
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
