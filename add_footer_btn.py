import glob

files = glob.glob('*.html')

button_html = """        <div class="footer-booking-btn" style="text-align: center; margin-bottom: 25px; width: 100%;">
            <a href="booking.html" class="btn-primary" style="display: inline-block;">Book Session</a>
        </div>
        <div class="footer-bottom">"""

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already added
    if 'footer-booking-btn' not in content:
        new_content = content.replace('<div class="footer-bottom">', button_html)
        if new_content != content:
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
