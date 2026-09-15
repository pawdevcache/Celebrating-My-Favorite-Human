PUT YOUR REAL PHOTOS IN THIS FOLDER.

Right now the site uses placeholder images from the internet.
When you have the real ones:

1. Copy your photos into this folder (this exact folder).
   Example:  public/images/us-first-meeting.jpg

2. Open  src/data/site.js

3. Find the `images` section near the top and the `gallery` list lower down,
   and change the links to point at your file, starting with /images/

   Before:  hero: ph('bday-hero', 1400, 1600),
   After:   hero: '/images/us-first-meeting.jpg',

   Before:  { src: ph('g1', 800, 1000), caption: '...' },
   After:   { src: '/images/g1.jpg', caption: '...' },

That's it. Nothing else needs changing.

Tip: keep photos under about 500KB each so the site stays fast.
