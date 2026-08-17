"""
Widen the hero banner so object-cover crops MARGIN instead of DESIGN.

The hero band runs from about 2.0:1 (1440x900) to 2.7:1 (ultrawide). The
artwork is 2.0:1 — the narrowest shape in that range — so every window wider
than that scales it to fill the width and trims the overflow off the top and
bottom. The logo sits at the top edge and the phone strip at the bottom, so
that trim goes straight through the design: 6% on a 1080p screen, 17% on the
client's window, 27% on an ultrawide.

Fix without touching the design: make the IMAGE wider than the widest box.
Then cover scales by height instead, and the overflow comes off the left and
right — which is padding we added, not artwork.

  target 2.72:1 -> 887 * 2.72 = 2413px wide -> 320px of padding each side

  box 2.72 : exact fit, padding fully visible
  box 2.40 : trims 12% of width = 145px/side  (inside the 320px padding)
  box 2.12 : trims 22% of width = 265px/side  (inside the 320px padding)
  box 2.00 : trims 26% of width = 320px/side  (exactly the padding)

So the design survives intact at every desktop shape, and the padding is only
visible on the very widest ones.

The padding is a mirrored copy of the edge under a heavy blur. Mirroring alone
would duplicate the cow on the left and the goat on the right; the blur pushes
both into unreadable bokeh that reads as depth of field. It is a stopgap — the
right answer is artwork drawn at 2.33:1 with its own margins.
"""
import os
from PIL import Image, ImageFilter, ImageEnhance

SRC = "public/images/hero-banner-wide.webp"
DST = "public/images/hero-banner-wide.webp"
TARGET_ASPECT = 2.72
BLUR = 34
MAX_BYTES = 460_000


def widen(src, dst):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    total = round(h * TARGET_ASPECT)
    pad = (total - w) // 2
    if pad <= 0:
        print("already wide enough")
        return

    out = Image.new("RGB", (w + pad * 2, h))
    out.paste(im, (pad, 0))

    # Left: mirror the leftmost `pad` columns, blur, darken slightly so the
    # eye reads it as background rather than as a second subject.
    left = im.crop((0, 0, pad, h)).transpose(Image.FLIP_LEFT_RIGHT)
    left = left.filter(ImageFilter.GaussianBlur(BLUR))
    left = ImageEnhance.Brightness(left).enhance(0.94)
    out.paste(left, (0, 0))

    right = im.crop((w - pad, 0, w, h)).transpose(Image.FLIP_LEFT_RIGHT)
    right = right.filter(ImageFilter.GaussianBlur(BLUR))
    right = ImageEnhance.Brightness(right).enhance(0.94)
    out.paste(right, (w + pad, 0))

    for q in (86, 82, 78, 74, 70):
        out.save(dst, "WEBP", quality=q, method=6)
        if os.path.getsize(dst) <= MAX_BYTES:
            break
    print(f"{dst}  {out.size[0]}x{out.size[1]}  "
          f"({out.size[0]/out.size[1]:.2f}:1)  "
          f"{os.path.getsize(dst)//1024} KB  q={q}  pad={pad}px/side")


if __name__ == "__main__":
    widen(SRC, DST)
