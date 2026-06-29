import re

content = open('i18n.js', encoding='utf-8').read()

# Parse language blocks accurately
blocks = {}
current_lang = None
lines = content.splitlines()
for line in lines:
    line_str = line.strip()
    if line_str in ['en: {', 'zh: {', 'ja: {', 'es: {']:
        current_lang = line_str.split(':')[0]
        blocks[current_lang] = {}
    elif current_lang and line_str == '},':
        current_lang = None
    elif current_lang and ':' in line_str:
        parts = line_str.split(':', 1)
        k = parts[0].strip().strip('"').strip("'")
        v = parts[1].strip().rstrip(',').strip('"').strip("'")
        blocks[current_lang][k] = v

print("Languages parsed:", list(blocks.keys()))
for lang, keys in blocks.items():
    print(f"{lang}: {len(keys)} keys")

all_keys = set()
for lang in blocks:
    all_keys.update(blocks[lang].keys())

missing_count = 0
for k in sorted(all_keys):
    missing = [lang for lang in blocks if k not in blocks[lang]]
    if missing:
        print(f"Key '{k}' missing in: {missing}")
        missing_count += 1

if missing_count == 0:
    print("ALL KEYS COMPLETE ACROSS ALL LANGUAGES!")
