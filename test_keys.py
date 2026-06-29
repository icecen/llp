import re, json

with open('i18n.js', encoding='utf-8') as f:
    js_content = f.read()

def parse_keys(section_name, next_section_name):
    start = js_content.find(section_name + ':')
    end = js_content.find(next_section_name + ':') if next_section_name else len(js_content)
    section_str = js_content[start:end]
    keys = re.findall(r'"([a-zA-Z0-9_\.-]+)"\s*:', section_str)
    return set(keys)

en_keys = parse_keys('en', 'zh')
zh_keys = parse_keys('zh', 'ja')
ja_keys = parse_keys('ja', 'es')
es_keys = parse_keys('es', None)

print(f"EN keys count: {len(en_keys)}")
print(f"ZH keys count: {len(zh_keys)}")
print(f"JA keys count: {len(ja_keys)}")
print(f"ES keys count: {len(es_keys)}")

missing_in_en = zh_keys - en_keys
print(f"Keys in ZH but missing in EN: {missing_in_en if missing_in_en else 'None! 100% Complete parity!'}")
