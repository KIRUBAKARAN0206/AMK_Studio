import os
import glob
import re

html_files = glob.glob('*.html')

socials_replacement = """            <div class="footer-socials">
                <a href="https://wa.me/916379776173" class="social-icon" aria-label="WhatsApp" target="_blank"><i class="fa-brands fa-whatsapp"></i></a>
                <a href="https://instagram.com/amf_studio_" class="social-icon" aria-label="Instagram" target="_blank"><i class="fa-brands fa-instagram"></i></a>
            </div>"""

socials_pattern = re.compile(r'<div class="footer-socials">.*?</div>', re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = socials_pattern.sub(socials_replacement, content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
