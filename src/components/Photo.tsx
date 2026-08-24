import Image from "next/image";
import fs from "node:fs";
import path from "node:path";

/**
 * Renders a real photograph from /public/photos if the file exists, and a
 * clearly-labelled placeholder if it does not.
 *
 * TO ADD THE REAL PHOTOGRAPHS:
 *   Drop the image files into  public/photos/  using these names:
 *     reception.jpg, conference-a.jpg, conference-b.jpg, conference-c.jpg,
 *     workstations.jpg, meeting-room.jpg, focus-room.jpg, tea-room.jpg,
 *     building.jpg, floor.jpg
 *   Nothing else needs changing — the placeholders disappear on their own.
 */

type Props = {
  /** File name inside /public/photos, e.g. "reception.jpg". */
  file: string;
  alt: string;
  caption?: string;
  /** Aspect ratio class, e.g. "aspect-[4/3]". */
  ratio?: string;
  priority?: boolean;
  className?: string;
};

function photoExists(file: string): boolean {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "photos", file));
  } catch {
    return false;
  }
}

export default function Photo({
  file,
  alt,
  caption,
  ratio = "aspect-[4/3]",
  priority = false,
  className = "",
}: Props) {
  const exists = photoExists(file);

  return (
    <figure className={className}>
      <div
        className={`relative ${ratio} w-full overflow-hidden bg-surface-2 border border-rule`}
      >
        {exists ? (
          <Image
            src={`/photos/${file}`}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center">
            <span className="label text-body-faint">Photograph</span>
            <span className="font-display text-sm font-semibold text-body-soft">
              {alt}
            </span>
            <span className="font-mono text-[0.65rem] text-body-faint">
              public/photos/{file}
            </span>
          </div>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-2 text-[0.85rem] text-body-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
