"""Convert original local raster assets to high quality WebP and report savings.
Originals are retained until the separate reference verification/archive step.
"""
from pathlib import Path
from PIL import Image, ImageOps
from concurrent.futures import ThreadPoolExecutor
import json
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
files = sorted(p for p in PUBLIC.rglob('*') if p.suffix.lower() in {'.png', '.jpg', '.jpeg'})
if not files:
    raise SystemExit('No original PNG/JPEG files remain in public; existing WebP assets are already optimized.')
for p in files:
    if p.with_suffix('.webp').exists():
        raise RuntimeError(f'Refusing to overwrite existing image: {p.with_suffix(".webp")}')

def convert(p):
    with Image.open(p) as source:
        im = ImageOps.exif_transpose(source).convert('RGBA' if 'A' in source.getbands() else 'RGB')
        dest = p.with_suffix('.webp')
        im.save(dest, 'WEBP', quality=94, method=6, exact=True, **({'icc_profile': source.info['icc_profile']} if source.info.get('icc_profile') else {}))
        with Image.open(dest) as check:
            assert check.size == im.size
            if 'A' in im.getbands():
                assert check.getchannel('A').tobytes() == im.getchannel('A').tobytes(), p
        responsive = []
        if p.parent.name == 'hanger cloths':
            folder = p.parent / 'responsive'
            folder.mkdir(exist_ok=True)
            for width in (420, 840):
                resized = im.resize((width, round(im.height * width / im.width)), Image.Resampling.LANCZOS)
                target = folder / f'{p.stem}-{width}.webp'
                resized.save(target, 'WEBP', quality=94, method=6, exact=True)
                responsive.append({'url': '/' + target.relative_to(PUBLIC).as_posix(), 'bytes': target.stat().st_size})
        return {'old': '/' + p.relative_to(PUBLIC).as_posix(), 'new': '/' + dest.relative_to(PUBLIC).as_posix(), 'before': p.stat().st_size, 'after': dest.stat().st_size, 'width': im.width, 'height': im.height, 'responsive': responsive}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(convert, files))
(ROOT / 'image-optimization-report.json').write_text(json.dumps(results, indent=2), encoding='utf-8')
print(json.dumps({'count':len(results), 'before':sum(r['before'] for r in results), 'after':sum(r['after'] for r in results), 'wardrobeBefore':sum(r['before'] for r in results if r['responsive']), 'wardrobe420':sum(r['responsive'][0]['bytes'] for r in results if r['responsive']), 'wardrobe840':sum(r['responsive'][1]['bytes'] for r in results if r['responsive'])}))
