"""Build the complete-interface reference PDF and verify/render both exports."""
from pathlib import Path
import json
import sys
import re

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.tools' / 'pdf-tooling'))
import pymupdf as fitz

WORK = ROOT / '.qa' / 'pdf-export'
OUT = ROOT / 'exports'
manifest = json.loads((WORK / 'capture-manifest.json').read_text(encoding='utf-8'))
reference = fitz.open()
outline = []
for index, shot in enumerate(manifest['shots']):
    image = WORK / shot['full']
    pix = fitz.Pixmap(str(image))
    width, margin = 595.276, 22
    height = (width - margin * 2) * pix.height / pix.width
    page = reference.new_page(width=width, height=height + 62)
    page.draw_rect(page.rect, color=None, fill=(.95, .96, .91))
    # The original screenshot includes the real Vietnamese page heading.
    label = f'VNSCAPE / WEBSITE SNAPSHOT / {index + 1:02d}'
    page.insert_text((margin, 20), label, fontsize=9, color=(.18, .32, .23))
    page.insert_image(fitz.Rect(margin, 31, width - margin, height + 31), filename=str(image))
    page.insert_text((margin, height + 49), shot['url'], fontsize=8, color=(.18, .36, .25))
    page.insert_link({'kind':fitz.LINK_URI, 'from':fitz.Rect(margin,height+38,width-margin,height+54), 'uri':shot['url']})
    outline.append([1, shot['title'], index + 1])
reference.set_toc(outline)
reference.set_metadata({'title':'VNScape - Complete website interface reference', 'author':'VNScape', 'subject':'Actual website screenshots. Long pages preserve the full interface; animations remain on the live website.'})
reference_path = OUT / 'VNScape-GiaoDien-DayDu.pdf'
reference.save(reference_path, garbage=4, deflate=True)
reference.close()

report_path = OUT / 'VNScape-HoSoWebsite-DuThi.pdf'
report = fitz.open(report_path)
assert len(report) == manifest['pageCount'], f'Unexpected page count: {len(report)}'
text = '\n'.join(page.get_text() for page in report)
assert 'VNScape' in text and 'NXBGDVN' in text
assert '\ufffd' not in text, 'Broken Unicode replacement character in PDF'
links = [link.get('uri','') for page in report for link in page.get_links()]
assert any('vnscape-bio.pages.dev' in url for url in links)
assert sum('sachdientu.nxbgd.vn' in url for url in links) >= 7
for page in report:
    assert abs(page.rect.width - 841.89) < 1 and abs(page.rect.height - 595.28) < 1
    assert len(page.get_text().strip()) > 120
    for block in page.get_text('dict')['blocks']:
        if block['type'] != 0:
            continue
        for line in block['lines']:
            for span in line['spans']:
                assert span['bbox'][0] >= -1 and span['bbox'][2] <= page.rect.width + 1
                assert span['bbox'][1] >= -1 and span['bbox'][3] <= page.rect.height + 1

preview_dir = WORK / 'rendered'
preview_dir.mkdir(exist_ok=True)
for index in [0,2,5,9,13,len(report)-1]:
    report[index].get_pixmap(matrix=fitz.Matrix(1.35,1.35),alpha=False).save(str(preview_dir / f'page-{index+1:02d}.png'))
# Contact sheet for reviewing every PDF page, rendered from the PDF itself.
from PIL import Image, ImageOps, ImageDraw
thumbs=[]
for i, page in enumerate(report):
    pix = page.get_pixmap(matrix=fitz.Matrix(.55,.55),alpha=False)
    thumb = Image.frombytes('RGB',(pix.width,pix.height),pix.samples)
    tile = Image.new('RGB',(480,365),'white')
    tile.paste(thumb,((480-thumb.width)//2,20))
    ImageDraw.Draw(tile).text((14,344),f'{i+1:02d}',fill='#294e39')
    thumbs.append(tile)
sheet=Image.new('RGB',(480*4,365*((len(thumbs)+3)//4)),'#dbe6d1')
for i,tile in enumerate(thumbs):
    sheet.paste(tile,((i%4)*480,(i//4)*365))
sheet.save(WORK / 'pdf-contact-sheet.jpg',quality=92)
summary={'main':{'file':report_path.name,'pages':len(report),'bytes':report_path.stat().st_size,'format':'A4 landscape','clickableLinks':len(links)},'reference':{'file':reference_path.name,'pages':len(manifest['shots']),'bytes':reference_path.stat().st_size,'format':'Long pages / complete website captures'},'website':manifest['productionUrl'],'exportDate':manifest['date'],'validation':'All pages rendered; Vietnamese text and official textbook links verified.'}
(OUT / 'VNScape-PDF-Info.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(summary,ensure_ascii=True,indent=2))
