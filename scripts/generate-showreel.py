"""Rebuild the original, silent portfolio reel. Optional authoring tool only.

Requires Python 3, Pillow, fonttools[woff], and FFmpeg on PATH.
Run from the repository root: python scripts/generate-showreel.py
The interfaces are illustrative concepts, not product recordings.
"""

from pathlib import Path
import math
import subprocess
import tempfile

from PIL import Image, ImageDraw, ImageFont
from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
WIDTH, HEIGHT, FPS = 1280, 720, 24
PAPER, INK, LIME = "#f2f2ef", "#171817", "#d8f95b"


def make_reel():
    with tempfile.TemporaryDirectory() as temp:
        font_path = Path(temp) / "display.ttf"
        font = TTFont(ROOT / "public/fonts/space-grotesk-latin.woff2")
        font.flavor = None
        font.save(font_path)

        def face(size):
            result = ImageFont.truetype(str(font_path), size)
            result.set_variation_by_axes([600])
            return result

        fonts = {size: face(size) for size in [14, 17, 19, 22, 26, 34, 48, 68, 96, 108]}

        def text(draw, xy, value, size, fill):
            draw.text(xy, value, font=fonts[size], fill=fill, spacing=0)

        def card(draw, rect, fill, radius=22, outline=None):
            draw.rounded_rectangle(rect, radius, fill=fill, outline=outline, width=1)

        def scene(index, progress):
            bg = ["#17382c", "#d8d3e9", LIME][index]
            ink = [PAPER, INK, INK][index]
            image = Image.new("RGB", (WIDTH, HEIGHT), bg)
            d = ImageDraw.Draw(image)
            d.line((54, 638, 1226, 638), fill=["#426352", "#b6afca", "#aac342"][index])
            text(d, (56, 665), "SANDHIT KARMAKAR  /  SOFTWARE ENGINEER", 14, ink)
            text(d, (1004, 665), f"PORTFOLIO  /  0{index + 1}", 14, ink)

            if index == 0:
                text(d, (56, 170), "01 / CONVERSATIONAL ANALYTICS", 17, LIME)
                text(d, (51, 209), "QueryLens", 96, PAPER)
                text(d, (51, 312), "AI.", 108, LIME)
                text(d, (56, 454), "Better questions.\nClearer answers.", 26, "#c3d2c7")
                text(d, (56, 579), "REACT   /   PYTHON   /   FASTAPI", 14, "#a9c6b5")
                x, y = 662, round(132 - 12 * math.sin(progress * math.pi))
                card(d, (x, y, 1224, y + 466), "#f5f7f2")
                text(d, (x + 28, y + 22), "QueryLens AI", 22, INK)
                text(d, (x + 28, y + 62), "YOUR DATA. A CONVERSATION AWAY.", 14, "#738075")
                card(d, (x + 28, y + 110, x + 534, y + 166), "#e8eddc", 12)
                text(d, (x + 47, y + 126), "Show me the monthly revenue trend", 19, "#304636")
                text(d, (x + 29, y + 196), "Here's the bigger picture.", 22, INK)
                for bar, value in enumerate([0.35, 0.52, 0.43, 0.67, 0.59, 0.82, 0.72, 0.97]):
                    height = 118 * value * min(1, 0.18 + progress * 3)
                    bx = x + 35 + bar * 61
                    card(d, (bx, y + 378 - height, bx + 37, y + 378), "#45664e" if bar < 7 else "#b5d955", 5)
                text(d, (x + 28, y + 409), "ILLUSTRATIVE DATA / INTERFACE CONCEPT", 14, "#687768")
            elif index == 1:
                text(d, (56, 170), "02 / AI FINANCE PLATFORM", 17, "#6a5b89")
                text(d, (51, 211), "Welth.", 108, INK)
                text(d, (56, 362), "Your money.\nA little more clarity.", 34, "#584e6c")
                text(d, (56, 579), "NEXT.JS   /   REACT   /   GEMINI AI", 14, "#625976")
                x, y = 662, round(132 - 12 * math.sin(progress * math.pi))
                card(d, (x, y, 1224, y + 466), "#f9f8fc")
                text(d, (x + 28, y + 22), "Welth", 26, INK)
                text(d, (x + 28, y + 77), "A clearer view of your finances", 17, "#827a91")
                card(d, (x + 28, y + 121, x + 534, y + 247), "#e5dff3", 15)
                text(d, (x + 48, y + 137), "YOUR MONTH, AT A GLANCE", 14, "#6d6183")
                text(d, (x + 48, y + 168), "Every expense. In focus.", 26, "#312345")
                labels = ["Shopping", "Transport", "Subscriptions"]
                for row, label in enumerate(labels):
                    ry = y + 274 + row * 41
                    text(d, (x + 29, ry), label, 17, "#524963")
                    card(d, (x + 239, ry + 7, x + 500, ry + 16), "#ece8f4", 4)
                    end = x + 239 + [197, 141, 93][row] * min(1, 0.2 + progress * 3)
                    card(d, (x + 239, ry + 7, end, ry + 16), "#9683bb", 4)
                text(d, (x + 28, y + 409), "ILLUSTRATIVE DATA / INTERFACE CONCEPT", 14, "#827a91")
            else:
                text(d, (56, 169), "FROM THE PIXELS TO THE PIPELINES.", 17, "#596b23")
                text(d, (49, 219), "THOUGHTFUL", 108, INK)
                text(d, (49, 332), "BY DESIGN.", 108, INK)
                text(d, (56, 524), "Reliable by engineering.", 34, "#465220")
            return image

        scene(0, 1).save(ROOT / "public/showreel-poster.webp", quality=88)
        command = [
            "ffmpeg", "-hide_banner", "-loglevel", "error", "-y",
            "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24",
            "-s", f"{WIDTH}x{HEIGHT}", "-r", str(FPS), "-i", "-",
            "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "23",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            str(ROOT / "public/showreel.mp4"),
        ]
        process = subprocess.Popen(command, stdin=subprocess.PIPE)
        try:
            for frame in range(FPS * 12):
                time = frame / FPS
                index = int(time // 4)
                progress = (time % 4) / 4
                image = scene(index, progress)
                if progress > 0.83:
                    blend = (progress - 0.83) / 0.17
                    blend = blend * blend * (3 - 2 * blend)
                    image = Image.blend(image, scene((index + 1) % 3, 0), blend)
                process.stdin.write(image.tobytes())
        finally:
            process.stdin.close()
        if process.wait() != 0:
            raise RuntimeError("FFmpeg could not encode the reel")
        print("Created public/showreel.mp4 and public/showreel-poster.webp")


if __name__ == "__main__":
    make_reel()
