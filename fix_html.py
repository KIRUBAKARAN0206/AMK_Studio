import os
import re

def fix_html_issues():
    directory = r"g:\AMF Studio"
    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix double quotes inside onerror
            content = content.replace('this.src="event-bg.webp";', "this.src='event-bg.webp';")

            # Add type="module" to local scripts
            content = re.sub(r'<script src="((?!http)[^"]+\.js)"></script>', r'<script type="module" src="\1"></script>', content)

            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed {filename}")

if __name__ == "__main__":
    fix_html_issues()
