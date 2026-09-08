// ============================================================================
// TRAINING VIDEO LIBRARY — the only file you edit to change the video hub.
//
// Everything on /videos is driven from here: the categories, the cards, the
// search index and each video's own page. To add a movement:
//
//   1. Copy one of the entries in `videos` below.
//   2. Give it a `slug` — that becomes its URL: /videos/<slug>. Never change a
//      slug once you've sent it to an athlete; the old link would 404.
//   3. Set `source` to the video's provider + id (see SOURCES below).
//   4. Pick a `category` from CATEGORIES and add a few `tags` — tags are
//      invisible on the page but searchable, so put the words an athlete would
//      actually type in there (including the ones you'd never put in a title:
//      "rfess", "band", "groin", "yoga").
//
// Entries with `source: null` haven't been filmed yet. They render a "not filmed
// yet" card, and while any of them are left the whole hub is noindex and shows a
// banner saying so — so an unfinished library can't quietly go live. Give every
// entry a real source (or delete it) and both disappear on their own.
//
// One entry per movement, not per workout. These are the clips Jonathan links an
// athlete to when a session calls for a specific exercise.
// ============================================================================

/**
 * Where a video is hosted.
 *
 * SOURCES — the `id` is the short code in the share URL, not the whole URL:
 *   youtube  https://youtu.be/`dQw4w9WgXcQ`  →  { provider: "youtube", id: "dQw4w9WgXcQ" }
 *   vimeo    https://vimeo.com/`123456789`   →  { provider: "vimeo",   id: "123456789" }
 *
 * `null` means not filmed yet.
 */
export type VideoSource =
  | { provider: "youtube"; id: string }
  | { provider: "vimeo"; id: string }
  | null;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export type TrainingVideo = {
  /** URL segment — /videos/<slug>. Permanent once shared. */
  slug: string;
  title: string;
  /** One or two sentences. Shown on the card and on the video's own page. */
  blurb: string;
  category: CategoryId;
  /** Searchable but not displayed. Synonyms and plain-language words go here. */
  tags: readonly string[];
  /**
   * What the movement needs, in plain words — "Resistance band",
   * "Dumbbells (optional)". Shown on the video's page and searchable, so
   * "band" finds everything that uses one. Omit for bodyweight-only.
   */
  equipment?: string;
  /** Runtime as m:ss. Omit until the video exists — don't guess. */
  duration?: string;
  source: VideoSource;
  /**
   * Optional still image, from `public/images/videos/`. Leave it off and
   * YouTube's own thumbnail is used; Vimeo and unfilmed entries fall back to
   * generated artwork, since Vimeo has no thumbnail URL you can build from an id.
   */
  poster?: string;
};

/**
 * The filter buttons, in the order they appear. `id` is what a video's
 * `category` points at and what shows up in the URL (?category=…), so treat it
 * as permanent; `label` is free to reword.
 *
 * Four buckets, split by what the movement is for rather than by body part —
 * an athlete sent here by a session plan is looking for "the strength one" or
 * "the stretch", and a movement can hit several body parts at once. Body parts
 * are handled by tags instead, so searching "glutes" or "hips" crosses all four.
 */
export const CATEGORIES = [
  { id: "strength", label: "Strength" },
  { id: "core", label: "Core & trunk" },
  { id: "mobility", label: "Mobility" },
  { id: "stretches", label: "Stretches" },
] as const;

/**
 * The library — Jonathan's first batch of movements. The list is real; none of
 * them are filmed yet, which is what `source: null` means and why the hub is
 * still hidden from search.
 *
 * Titles use the most widely-recognised name for each movement, with the names
 * an athlete might search instead kept in `tags`. Blurbs describe what each clip
 * will cover — they're a first draft for Jonathan to reword, not his own words.
 */
export const videos: readonly TrainingVideo[] = [
  // ---- Strength ----------------------------------------------------------
  {
    slug: "squat",
    title: "Squat",
    blurb:
      "The pattern most of the rest is built on. Foot position, depth, and keeping the weight through the whole foot.",
    category: "strength",
    tags: [
      "squat", "bodyweight squat", "air squat", "goblet squat", "quads",
      "glutes", "knees", "band", "banded", "resistance band", "legs",
    ],
    equipment: "Dumbbell, kettlebell or band (optional)",
    source: null,
  },
  {
    slug: "bulgarian-split-squat",
    title: "Bulgarian split squat",
    blurb:
      "Back foot raised, one leg doing the work. Setup, how far forward to stand, and the torso position that keeps it honest.",
    category: "strength",
    tags: [
      "bulgarian split squat", "rear foot elevated split squat", "rfess",
      "split squat", "single leg", "one leg", "unilateral", "quads", "glutes",
      "lunge", "dumbbell",
    ],
    equipment: "A bench, chair or step; dumbbells optional",
    source: null,
  },
  {
    slug: "atg-split-squat",
    title: "ATG split squat",
    blurb:
      "The long-stride, full-depth split squat. How far to reach the front foot, how low to go, and where to start if the range isn't there yet.",
    category: "strength",
    tags: [
      "atg split squat", "atg", "knees over toes", "kot", "deep split squat",
      "split squat", "quads", "knee", "vmo", "single leg", "unilateral",
    ],
    source: null,
  },
  {
    slug: "forward-walking-lunge",
    title: "Forward walking lunge",
    blurb:
      "Stepping through the lunge rather than returning to the start. Stride length, where the front knee tracks, and staying tall between steps.",
    category: "strength",
    tags: [
      "forward walking lunge", "walking lunge", "forward lunge", "lunges",
      "lunge", "quads", "glutes", "single leg", "dumbbell",
    ],
    equipment: "Dumbbells (optional)",
    source: null,
  },
  {
    slug: "reverse-walking-lunge",
    title: "Reverse walking lunge",
    blurb:
      "The same walk, stepping backwards. Where the load shifts compared with the forward version, and why the step back takes more control.",
    category: "strength",
    tags: [
      "reverse walking lunge", "backward walking lunge", "backward lunge",
      "reverse lunge", "walking lunge", "lunges", "lunge", "glutes",
      "hamstrings", "single leg", "dumbbell",
    ],
    equipment: "Dumbbells (optional)",
    source: null,
  },
  {
    slug: "glute-bridge",
    title: "Glute bridge",
    blurb:
      "Both feet down, hips to full extension. Foot placement, and what to change if you feel it in your hamstrings or your lower back instead.",
    category: "strength",
    tags: [
      "glute bridge", "bridge", "hip bridge", "hip thrust", "glutes",
      "hip extension", "band", "banded", "resistance band", "floor",
    ],
    equipment: "Resistance band (optional, above the knees)",
    source: null,
  },
  {
    slug: "single-leg-glute-bridge",
    title: "Single-leg glute bridge",
    blurb:
      "The same movement on one leg. Keeping the hips level and the ribs down instead of arching to get higher.",
    category: "strength",
    tags: [
      "single leg glute bridge", "one leg glute bridge", "single leg bridge",
      "hip bridge", "glutes", "hip extension", "single leg", "unilateral",
      "band", "banded", "resistance band",
    ],
    equipment: "Resistance band (optional)",
    source: null,
  },
  {
    slug: "banded-lateral-walk",
    title: "Banded lateral walk",
    blurb:
      "Sideways steps against a band. Where to put the band, how low to stay, and keeping the steps deliberate rather than bouncing along.",
    category: "strength",
    tags: [
      "banded lateral walk", "lateral band walk", "band walk", "crab walk",
      "monster walk", "side steps", "glute med", "glute medius", "hips",
      "band", "banded", "resistance band",
    ],
    equipment: "Resistance band",
    source: null,
  },
  {
    slug: "single-leg-romanian-deadlift",
    title: "Single-leg Romanian deadlift",
    blurb:
      "Hinging on one leg. Hips square, spine long, and how to stop it turning into a balance test instead of a hamstring exercise.",
    category: "strength",
    tags: [
      "single leg romanian deadlift", "single leg rdl", "slrdl", "sldl",
      "romanian deadlift", "deadlift", "hinge", "hamstrings", "glutes",
      "balance", "single leg", "unilateral", "dumbbell", "kettlebell",
    ],
    equipment: "Dumbbell or kettlebell (optional)",
    source: null,
  },
  {
    slug: "single-leg-calf-raise",
    title: "Single-leg calf raise",
    blurb:
      "One leg, through the whole range at both ends. Where most people quietly cut it short, and how to load it once bodyweight is easy.",
    category: "strength",
    tags: [
      "single leg calf raise", "one leg calf raise", "calf raise", "heel raise",
      "calves", "calf", "soleus", "gastroc", "achilles", "ankle",
      "single leg", "unilateral",
    ],
    equipment: "A step or kerb (optional)",
    source: null,
  },
  {
    slug: "single-leg-hip-flexor-hold",
    title: "Single-leg hip flexor hold",
    blurb:
      "One leg held up under tension from the hip flexor. Position, height, and how long to hold it for.",
    category: "strength",
    tags: [
      "single leg hip flexor hold", "hip flexor hold", "hip flexor raise",
      "hip flexor", "psoas", "isometric", "hold", "march", "single leg",
      "band", "banded", "resistance band",
    ],
    equipment: "Resistance band (optional)",
    source: null,
  },

  // ---- Core & trunk ------------------------------------------------------
  {
    slug: "side-plank",
    title: "Side plank",
    blurb:
      "Stacked, straight, and held. Elbow position, hip height, and what to drop back to when it starts to sag.",
    category: "core",
    tags: [
      "side plank", "plank", "core", "trunk", "obliques", "lateral",
      "isometric", "hold", "bodyweight",
    ],
    source: null,
  },
  {
    slug: "copenhagen-plank-raise",
    title: "Copenhagen plank raise",
    blurb:
      "Side plank with the top leg supported and the bottom leg lifting to meet it. The easier versions to build from first.",
    category: "core",
    tags: [
      "copenhagen plank raise", "copenhagen plank", "copenhagen side plank",
      "copenhagen", "adductor", "adductors", "groin", "side plank", "hip",
      "core", "isometric",
    ],
    equipment: "A bench, chair or sofa",
    source: null,
  },
  {
    slug: "bird-dog",
    title: "Bird-dog",
    blurb:
      "Opposite arm and leg from all fours, without the hips rolling. Slower and through less range than most people use.",
    category: "core",
    tags: [
      "bird dog", "birddog", "quadruped", "core", "trunk", "anti-rotation",
      "back", "lower back", "stability", "bodyweight",
    ],
    source: null,
  },

  // ---- Mobility ----------------------------------------------------------
  {
    slug: "leg-swings",
    title: "Leg swings",
    blurb:
      "Front-to-back and side-to-side. What to hold on to, how far to swing, and how many before it stops doing anything.",
    category: "mobility",
    tags: [
      "leg swings", "leg swing", "forward leg swings", "lateral leg swings",
      "side to side", "dynamic stretch", "dynamic warm up", "warm up",
      "hips", "hamstrings", "before a run",
    ],
    equipment: "Something to hold on to",
    source: null,
  },
  {
    slug: "90-90-hip-switches",
    title: "90/90 hip switches",
    blurb:
      "Seated, rotating between the two 90/90 positions. Internal and external rotation, and where to stop rather than force it.",
    category: "mobility",
    tags: [
      "90/90 hip switches", "90 90", "ninety ninety", "hip switch",
      "hip rotation", "internal rotation", "external rotation", "hips",
      "mobility", "seated", "floor",
    ],
    source: null,
  },
  {
    slug: "rocking-frog-stretch",
    title: "Rocking frog stretch",
    blurb:
      "Knees wide, rocking back and forward instead of holding still. How wide to set up and where the limit is.",
    category: "mobility",
    tags: [
      "rocking frog stretch", "frog stretch", "frog pose", "frog rocks",
      "adductors", "adductor", "groin", "hips", "mobility", "floor",
    ],
    source: null,
  },

  // ---- Stretches ---------------------------------------------------------
  {
    slug: "head-to-knee-forward-bend",
    title: "Head-to-knee forward bend",
    blurb:
      "Seated with one leg out, folding over it. Where the fold should come from, and what to do when the hamstring locks up early.",
    category: "stretches",
    tags: [
      "head to knee forward bend", "janu sirsasana", "seated forward bend",
      "seated hamstring stretch", "hamstring", "hamstrings", "lower back",
      "yoga", "static stretch", "stretch", "seated", "after a run",
    ],
    source: null,
  },
  {
    slug: "lizard-stretch",
    title: "Lizard stretch",
    blurb:
      "Deep lunge with the hands inside the front foot, plus the shallower versions to work back from.",
    category: "stretches",
    tags: [
      "lizard stretch", "lizard pose", "utthan pristhasana", "hip opener",
      "hip flexor", "hips", "groin", "adductor", "yoga", "static stretch",
      "stretch", "after a run",
    ],
    source: null,
  },
  {
    slug: "standing-quad-stretch",
    title: "Standing quad stretch",
    blurb:
      "Heel towards the backside, standing. Keeping the hips square and the knee under you rather than drifting behind.",
    category: "stretches",
    tags: [
      "standing quad stretch", "quad stretch", "quadriceps", "quads",
      "hip flexor", "standing", "balance", "static stretch", "stretch",
      "after a run",
    ],
    source: null,
  },
  {
    slug: "reclined-figure-4-stretch",
    title: "Reclined figure-4 stretch",
    blurb:
      "On your back, ankle across the opposite thigh. Where to pull from, and what to change if the hip pinches instead of stretching.",
    category: "stretches",
    tags: [
      "reclined figure 4 stretch", "figure 4", "supine figure 4",
      "reclined pigeon", "eye of the needle", "piriformis", "glute stretch",
      "glutes", "hip", "hips", "itb", "yoga", "static stretch", "stretch",
      "after a run",
    ],
    source: null,
  },
];

// ---------------------------------------------------------------------------
// Derived helpers. Nothing below needs editing to add a video.
// ---------------------------------------------------------------------------

/** A movement that's listed but not filmed yet. */
export function isUnfilmed(video: TrainingVideo): boolean {
  return video.source === null;
}

/**
 * True while any entry is still unfilmed. Drives the banner on the hub and the
 * `noindex` on both routes, so a half-filled library can't get indexed or be
 * mistaken for finished. Fill in every `source` and it flips by itself.
 */
export const libraryHasUnfilmed = videos.some(isUnfilmed);

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}

export function getVideo(slug: string): TrainingVideo | undefined {
  return videos.find((v) => v.slug === slug);
}

/** Categories that actually have videos in them, in CATEGORIES order. */
export function usedCategories() {
  return CATEGORIES.filter((c) => videos.some((v) => v.category === c.id));
}

/** The player URL for an embed. */
export function embedUrl(source: NonNullable<VideoSource>): string {
  if (source.provider === "youtube") {
    // youtube-nocookie + rel=0: no tracking cookie until playback, and the
    // end screen stays on Jonathan's own videos rather than suggesting others.
    return `https://www.youtube-nocookie.com/embed/${source.id}?rel=0&modestbranding=1`;
  }
  return `https://player.vimeo.com/video/${source.id}?dnt=1`;
}

/**
 * Thumbnail for a card, or null to fall back to the generated artwork.
 * YouTube exposes a predictable still; Vimeo needs an API call, so give those
 * entries a local `poster` if you want a picture on the card.
 */
export function thumbnailUrl(video: TrainingVideo): string | null {
  if (video.poster) return video.poster;
  if (video.source?.provider === "youtube") {
    return `https://i.ytimg.com/vi/${video.source.id}/hqdefault.jpg`;
  }
  return null;
}

/**
 * The text a search matches against. Tags and equipment are in here but tags are
 * never rendered, which is what lets "rfess", "groin" or "band" find the right
 * movement.
 */
function haystack(video: TrainingVideo): string {
  return [
    video.title,
    video.blurb,
    categoryLabel(video.category),
    video.equipment ?? "",
    ...video.tags,
  ]
    .join(" ")
    .toLowerCase();
}

/**
 * Filter by category + free text. Every word in the query has to appear
 * somewhere (AND, not OR) — with a library this size, narrowing as you type is
 * more useful than ranking, and it needs no scoring to explain.
 */
export function filterVideos(
  query: string,
  category: CategoryId | "all",
): readonly TrainingVideo[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return videos.filter((video) => {
    if (category !== "all" && video.category !== category) return false;
    if (!words.length) return true;
    const text = haystack(video);
    return words.every((word) => text.includes(word));
  });
}
