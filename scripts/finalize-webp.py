from pathlib import Path
import json, zipfile
root=Path.cwd().resolve(); public=(root/'public').resolve()
rows=json.loads((root/'image-optimization-report.json').read_text())
for row in rows:
    dest=public/row['new'].lstrip('/')
    assert dest.is_file() and dest.stat().st_size==row['after'],dest
changed=[]
for p in [*list((root/'src').rglob('*.jsx')),*list((root/'src').rglob('*.js')),*list((root/'src').rglob('*.css')),root/'index.html']:
    text=p.read_text(encoding='utf-8'); updated=text
    for row in rows:
        updated=updated.replace(row['old'],row['new'])
        if p.name=='hangerProducts.js' and '/hanger cloths/' in row['old']:
            updated=updated.replace("'"+Path(row['old']).name+"'", "'"+Path(row['new']).name+"'")
    if updated!=text:
        p.write_text(updated,encoding='utf-8');changed.append(str(p.relative_to(root)))
archive=root/'image-originals.zip'
assert not archive.exists(), 'Original backup already exists; refusing to overwrite'
with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_STORED) as z:
    for row in rows:
        source=(public/row['old'].lstrip('/')).resolve()
        assert source.is_relative_to(public)
        z.write(source,source.relative_to(public).as_posix())
# Verify every archived original before removing its uncompressed public copy.
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    for row in rows:
        source=(public/row['old'].lstrip('/')).resolve()
        assert source.is_relative_to(public)
        assert z.read(source.relative_to(public).as_posix())==source.read_bytes()
    for row in rows:
        (public/row['old'].lstrip('/')).unlink()
print('Updated references:',changed)
print('Original backup:',archive)
