#!/usr/bin/env python3
import re
import datetime
import os

filepath = os.path.join(os.path.dirname(__file__), 'index.html')
if not os.path.exists(filepath):
    exit(0)

with open(filepath, 'r', encoding='utf-8') as f:
    html = f.read()

now_str = datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

new_html = re.sub(
    r"const APP_LAST_MODIFIED = '[^']+';",
    f"const APP_LAST_MODIFIED = '{now_str}';",
    html
)

if html != new_html:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    # Add the modified file to the commit
    os.system(f'git add "{filepath}"')
