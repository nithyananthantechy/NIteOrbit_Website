import os
import re
import glob

components = glob.glob('src/components/*.tsx')

css_content = []

for filepath in components:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    matches = list(re.finditer(r'style=\{\{([^}]+)\}\}', content))
    if not matches:
        continue
        
    filename = os.path.basename(filepath).replace('.tsx', '').lower()
    
    new_content = content
    offset = 0
    
    for idx, match in enumerate(matches):
        style_content = match.group(1).strip()
        if '$' in style_content or '?' in style_content or '=>' in style_content or '`' in style_content:
            continue
            
        class_name = f"{filename}-style-{idx+1}"
        
        props = [p.strip() for p in style_content.split(',')]
        css_props = []
        for prop in props:
            if not prop: continue
            if ':' not in prop: continue
            k, v = prop.split(':', 1)
            k = k.strip()
            v = v.strip().strip("'").strip('"')
            k = re.sub(r'([A-Z])', r'-\1', k).lower()
            css_props.append(f"  {k}: {v};")
            
        css_rules = f".{class_name} {{\n" + "\n".join(css_props) + "\n}\n"
        css_content.append(css_rules)
        
        # Replace in file content
        # we need to find if there is a className attribute near the style attribute.
        # This is tricky with Regex.
        # But wait, we can just replace `style={{...}}` with `className="{class_name}"`.
        # If there's an existing className="abc", we will have two className attributes which is invalid in JSX!
        # So we MUST merge them.
        pass

# Since doing this safely is complex in a short script, I will NOT do it.
