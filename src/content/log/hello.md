---
title: hello
tagline: how this works
date: 2026-07-28
labelColor: #a05fb0
---
Drop a `.md` file in `src/content/log/` and it shows up here — no other
changes needed.

Each file needs a small frontmatter block up top:

```
---
title: post title
tagline: short subtitle
date: YYYY-MM-DD
labelColor: #a05fb0
coverImage: /covers/log/slug.jpg
---
```

`labelColor` and `coverImage` are optional. Without a `coverImage`, the
sleeve just shows the title on a flat color — same fallback the projects
side uses.

The rest of the file is normal markdown: **bold**, *italic*, `code`,
[links](https://example.com), lists, and code blocks all work.

- built for exactly this
- nothing fancier than it needs to be
