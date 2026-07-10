import os
import glob
import re

html_files = glob.glob('*.html')

quick_links_replacement = """                <ul class="footer-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="portfolio.html">Portfolio</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>"""

services_replacement = """                <ul class="footer-links">
                    <li><a href="services.html">Brand Ad Shoot</a></li>
                    <li><a href="services.html">Event Coverage</a></li>
                    <li><a href="services.html">Wedding Function</a></li>
                </ul>"""

quick_links_pattern = re.compile(r'<h3>Quick Links</h3>\s*<ul class="footer-links">.*?</ul>', re.DOTALL)
services_pattern = re.compile(r'<h3>Our Services</h3>\s*<ul class="footer-links">.*?</ul>', re.DOTALL)

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = quick_links_pattern.sub('<h3>Quick Links</h3>\n' + quick_links_replacement, content)
    new_content = services_pattern.sub('<h3>Our Services</h3>\n' + services_replacement, new_content)
    
    if new_content != content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file}")
