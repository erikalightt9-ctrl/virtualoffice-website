import fs from "node:fs";

/**
 * Reads the pixel dimensions of a JPEG or PNG straight from its header.
 *
 * SERVER ONLY.
 *
 * Deliberately dependency-free. `sharp` would do this in one line, but it is
 * not a declared dependency of this project — it happens to be installed
 * because Next pulls it in for image optimisation. Depending on that in the
 * production build path means a Next upgrade or a clean install could break
 * the build, so the header is parsed here instead. It is about forty lines and
 * it cannot rot.
 *
 * Returns null for anything it cannot read, so callers must have a fallback.
 *
 * EXIF orientation is NOT interpreted: a photograph straight off a phone can
 * carry a rotation flag that makes these numbers transposed. Files imported
 * through scripts/import-room-photos.mjs have orientation baked in and
 * stripped, so this only matters for files dropped in by hand.
 */

export type ImageSize = { width: number; height: number };

/* SOFn markers carry the frame dimensions. C4 (huffman tables), C8 (JPEG
   extensions) and CC (arithmetic coding conditioning) are not SOF markers. */
function isStartOfFrame(marker: number): boolean {
  return (
    marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
  );
}

function readJpeg(buffer: Buffer): ImageSize | null {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    /* Segments start with 0xFF; fill bytes are legal, so skip any run of them. */
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    if (marker === 0xff) {
      offset += 1;
      continue;
    }
    /* Standalone markers carry no length field. */
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2;
      continue;
    }

    const length = buffer.readUInt16BE(offset + 2);
    if (length < 2) return null;

    if (isStartOfFrame(marker)) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }
  return null;
}

function readPng(buffer: Buffer): ImageSize | null {
  if (buffer.length < 24) return null;
  const signature = buffer.subarray(0, 8).toString("latin1");
  if (signature !== "\x89PNG\r\n\x1a\n") return null;
  if (buffer.subarray(12, 16).toString("latin1") !== "IHDR") return null;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

export function imageSize(absolutePath: string): ImageSize | null {
  let handle: number | null = null;
  try {
    handle = fs.openSync(absolutePath, "r");
    /* 64KB is well past the SOF marker on any normal photograph, and avoids
       reading a multi-megabyte file into memory just for two numbers. */
    const buffer = Buffer.alloc(65536);
    const read = fs.readSync(handle, buffer, 0, buffer.length, 0);
    const head = buffer.subarray(0, read);

    const size = readPng(head) ?? readJpeg(head);
    if (!size || !size.width || !size.height) return null;
    return size;
  } catch {
    return null;
  } finally {
    if (handle !== null) {
      try {
        fs.closeSync(handle);
      } catch {
        /* nothing useful to do if the handle will not close */
      }
    }
  }
}
