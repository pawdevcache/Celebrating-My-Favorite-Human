/* ============================================================
   EDIT EVERYTHING HERE.
   This is the only file you need to touch to personalize the site.
   Change the words, the dates, the image links — the pages will
   update themselves. Nothing else needs editing.
   ============================================================ */

/* ---------- THE BASICS ---------- */
export const him = {
  name: 'Hansika',                   // <- his name
  nickname: 'My Superman',           // shown on the home page as "To My Superman —"
  nickname2: 'Sudu Patiya',          // shown on the cricket scoreboard, like a player's nickname
  birthday: '2026-11-13',            // YYYY-MM-DD — his next birthday
  turningAge: 27,                    // the age he's turning — this is his "score"
  birthYear: 1999,                   // <- the year he was born (powers the "balls faced" count)
  city: 'Melbourne',                 // where he is
}

export const her = {
  name: 'Hiruni',                    // <- your name
  city: 'Sri Lanka',                 // where you are
  name2: 'Sudu Nona',                    
}

/* Distance between you two — used on the Long Distance page. */
export const distance = {
  km: 8227,                          // great-circle distance, southern Sri Lanka -> Melbourne
  milesLabel: '5,112 miles',
  hoursApart: 5.5,                   // Melbourne is 5.5 hrs ahead of Sri Lanka in November
  nextMeetup: '2027-12-20',          // YYYY-MM-DD — leave '' to hide this counter
  nextMeetupLabel: 'the day I finally get to hug you again',
}

/* ---------- IMAGES ----------
   These are placeholders right now. To use real photos:
   1. Drop your photos into the  public/images/  folder
   2. Change the link below to  '/images/your-photo.jpg'
   Example:  hero: '/images/us-at-the-beach.jpg'
--------------------------------- */
const ph = (seed, w = 900, h = 1200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

export const images = {
  hero: '/images/little%20him.jpg',  // real image — lives in public/images/ (%20 = the space in the filename)
  heroAlt: 'Hansika as a little boy in a party hat, smiling behind a keyboard',
  letter: '/images/us.png',          // real image — lives in public/images/
  letterAlt: 'A collage of photos of Hansika and Hiruni together',
  distanceHer: ph('her-side', 800, 800),
  distanceHim: ph('his-side', 800, 800),
}

/* ---------- HOME PAGE ---------- */
export const home = {
  greeting: 'Happy Birthday',
  subtitle:
    'You are one whole year older, still one year ahead of me, and somehow still the best thing that has ever happened to my ordinary days.',
  scrollHint: 'there is more, keep going',
  /* The handwritten line under the polaroid */
  caption: 'birthday boy, before he knew me 🥹❤️',
  /* The three little stat cards under the countdown */
  stats: [
    { value: '1st', label: 'birthday together' },
    { value: '365', label: 'days of you being my person' },
    { value: '∞', label: 'birthdays I want to steal from you' },
  ],
}

/* ---------- "NOT OUT" — the cricket bit on the home page ----------
   In cricket a batter who is still batting is "not out". So his age is
   his score, and he is still at the crease. The numbers below are worked
   out automatically from `him` — you do not need to update them.
------------------------------------------------------------------- */
export const notOut = {
  eyebrow: 'Still at the crease',
  /* Printed on the back of the batter's shirt. Set to '' to leave it blank. */
  shirtNumber: 8,
  /* {age} is swapped for his age automatically. */
  lead: 'You have been batting for {age} years and you are still not out. Long may it continue.',
  ballsFacedLabel: 'Balls faced',
  ballsFacedNote: 'one for every day you have been alive',
  sixesLabel: 'Sixes',
  strikeRateLabel: 'Strike rate',
  strikeRateValue: '100',
  strikeRateNote: 'never once missed a good morning text',
  /* The bat-and-ball game */
  playHint: 'go on — middle it',
  playHintAfter: 'again?',
  sixShout: 'SIX!',
  /* Six balls make an over. Six sixes make 36 — the perfect over. */
  overLabel: 'This over',
  overShout: '36 OFF THE OVER',
  overNote: 'Six sixes in six balls. Someone go and check on the bowler.',
  sixLines: [
    'That is out of the ground.',
    'Straight over long-on.',
    'Someone go and find that ball.',
    'Into the car park.',
    'He has not missed one yet.',
    'That is going all the way to Sri Lanka.',
  ],
  footer: 'Keep batting, Hansika. I am watching every single ball.',
}

/* ---------- OUR STORY (timeline) ---------- */
export const story = {
  intro:
    'Every love story is beautiful, but ours is my favorite. Here is the short version the long version is still being written.',
  chapters: [
    {
      date: 'The Beginning',
      title: 'The first message',
      text: 'I did not know that one notification was going to rearrange my whole life. I read it, I typed something back, and that was that.',
      emoji: '💬',
    },
    {
      date: 'A few weeks in',
      title: 'The first call that never ended',
      text: 'We said "just five minutes" and then watched the sun come up. I remember exactly how tired and exactly how happy I was.',
      emoji: '📞',
    },
    {
      date: 'The first meeting',
      title: 'Seeing you in real life',
      text: 'You were taller, you were softer, you were real. I forgot every single thing I had planned to say.',
      emoji: '🫂',
    },
    {
      date: 'Somewhere in between',
      title: 'The night shift confessions',
      text: 'You come home tired, but somehow you’re still the same kind and caring person I love.',
      emoji: '🌙',
    },
    {
      date: 'Today',
      title: 'Your birthday',
      text: 'I am not there to hold the cake. So I built you this instead every page of it is a place I would rather be standing next to you.',
      emoji: '🎂',
    },
    {
      date: 'Next',
      title: 'The rest of it',
      text: 'Every birthday after this one. I have already reserved them all.',
      emoji: '♾️',
    },
  ],
}

/* ---------- REASONS I LOVE YOU (flip cards) ----------
   Click a card and it flips over. Add or remove freely —
   the grid handles any number. Keep them short and specific.
------------------------------------------------------- */
export const reasons = [
  {
    front: 'The way you care',
    back: 'You spend your days caring for others, but somehow you always find a little extra care for me.',
  },
  {
    front: 'Your hands',
    back: 'I love the way your hands make me feel safe, whether you’re holding mine or pulling me a little closer.',
  },
  {
    front: 'Your laugh',
    back: 'It is loud, it is a little ridiculous, and I would sit through any bad joke to hear it again.',
  },
  {
    front: 'You never make me feel far',
    back: 'There are eight thousand kilometres and five and a half hours between us, and you still make me feel like you are in the next room.',
  },
  {
    front: 'The night shifts',
    back: 'Surviving a whole night shift and still having enough energy to deal with me? Honestly, impressive.',
  },
  {
    front: 'How you talk about 	Formula 1',
    back: 'I did not know a single thing about Formula 1 when we met. Now I am counting down to every Grand Prix. I know your favorite driver and cheer for them too.',
  },
  {
    front: 'Your patience',
    back: 'For listening to all my random thoughts, putting up with my moods, and still choosing me every single time.',
  },
  {
    front: 'You are honest',
    back: 'Even when it would be easier not to be. I never have to wonder where I stand with you.',
  },
  {
    front: 'The good morning texts',
    back: 'I love knowing that somewhere between waking up and starting your day, you think of me.',
  },
  {
    front: 'You are my person',
    back: 'Not the romantic version. The practical version. The one I want to tell everything to, first, always.',
  },
  {
    front: 'You believe in me',
    back: 'Having someone who believes in me as much as you do is one of the greatest gifts you’ve given me.',
  },
  {
    front: 'Just the beginning',
    back: 'One birthday down, and hopefully so many more where I get to celebrate you, love you, and remind you how special you are.',
  },
]

/* ---------- LONG DISTANCE PAGE ---------- */
export const longDistance = {
  intro:
    'The hardest page to write and the one I mean the most.',
  body: [
    'I am not there today. I hate that. I wanted to be the first face you saw and the one holding the cake and the one who got to watch you make the wish.',
    'So I did the only thing I could do from here. I took every place I would rather be standing and I turned it into a page.',
    'Distance is just a number. It is a big, annoying, expensive number but it is only a number. What it is not is a reason. It has never once been a reason.',
    'One day this page will be a story we tell. "There was a year we were apart on your birthday." One year out of all of them. I can live with that ratio.',
  ],
  /* Small things that close the gap */
  bridges: [
    {
      emoji: '📞',
      title: 'Every night',
      text: 'Your night is my afternoon. We find the hour anyway, every single day.',
      image: '/images/every-night.jpg',
      imageAlt: 'A video call screenshot: Hansika asleep on his pillow while Hiruni is still on the call',
      /* This one is a tall phone screenshot, so it gets a phone-shaped frame,
         positioned to keep both her little window and his face in view. */
      imageAspect: '9 / 17',
      imageFocus: '50% 45%',
    },
    {
      emoji: '🎧',
      title: 'Same song',
      text: 'Press play at the same second and pretend we are in the same room.',
      /* Paste any YouTube link here — a youtu.be share link or a normal
         youtube.com/watch link both work. Leave '' to hide the player. */
      youtube: 'https://youtu.be/dB2GMQYTXGU',
      songLabel: 'Me Hitha Sanasa — Uvindu Ayshcharya',
    },
    {
      emoji: '📷',
      title: 'Same sky',
      text: 'You get the sunset five and a half hours before me. You always send it.',
      /* A photo shown in this card. Leave '' to hide it. */
      image: '/images/same-sky.jpg',
      imageAlt: 'Hansika and Hiruni in sunglasses under a wooden shade, blue sky behind them',
    },
    {
      emoji: '✈️',
      title: 'The next ticket',
      text: 'Already thinking about it. Always already thinking about it.',
      image: '/images/air.jpg',
      imageAlt: 'A boarding pass with a plane on it',
      /* The ticket is a wide strip in the middle of a square image, so the
         frame is cropped to the ticket's own shape. */
      imageAspect: '12 / 5',
      imageFocus: '50% 49%',
    },
  ],
}

/* ---------- THE BIRTHDAY LETTER ---------- */
export const letter = {
  heading: 'A letter, because I cannot be there to say it',
  /* Each string is a paragraph. Add as many as you want. */
  paragraphs: [
    'My love,',
    'Happy birthday. I have started this letter about nine times and deleted it about eight, because there is no version of it that is big enough.',
    'This is our first birthday together and I am spending it looking at a screen. That is not how I wanted it. But here is what I keep coming back to: I get to have a first birthday with you at all. A year ago I did not know you. Now I cannot remember what my day looked like before you were in it.',
    'You spend your whole life taking care of people. You come off a shift with nothing left and you still ask about my day first. I hope today someone takes care of you for a change and I hope that one day, every year, that someone is me.',
    'You are a year older than me and you will never let me forget it. Fine. Be older. Be wiser. Keep being the one who knows what to do when I do not.',
    'Go eat too much cake. Go watch your race. Go tell everyone about cricket until they beg you to stop. Be completely, loudly happy today you have earned every bit of it.',
    'මං ආදරෙයි. More than the distance, more than the time, more than I know how to say in a paragraph.',
    'See you soon. Really soon.',
  ],
  signoff: 'Yours, always',
  ps: 'P.S. — I built this whole thing myself. Every page. Because you deserved more than a text.',
}

/* ---------- THE CAKE ---------- */
export const cake = {
  intro:
    'I could not be there to hold it, so I built you one. Tap each candle to blow it out all of them and then make your wish.',
  /* How many candles sit on the cake. */
  candles: 8,
  litHint: 'tap the flames to blow them out',
  lastCandleHint: 'one left...',
  /* Shown on the darkened cake once every candle is out. */
  darkLine: 'you cannot hear me, but I am singing too.',
  /* Shown once every candle is out, before he types his wish. */
  wishPrompt: 'Now close your eyes and make a wish.',
  wishHelp:
    'Type it here if you want. It saves only on your own device I will never see it. That is rather the point of a wish.',
  wishPlaceholder: 'I wish...',
  wishButton: 'Make the wish',
  /* Shown after he submits. */
  wishDone: 'Wish made.',
  wishDoneNote:
    'Do not tell anyone what it was or it will not come true. Those are the rules. I did not make them.',
  /* Her note under the cake. */
  fromHer:
    'I would give anything to be the one holding this in front of you right now. Next year I will be.',
  relightLabel: 'Light them again',
}

/* ---------- GALLERY ----------
   The images live in  public/images/  — to add more, drop the file in
   that folder and add a line here. `caption` shows on hover and under
   the full-screen viewer. `alt` is read aloud by screen readers.
------------------------------------------------------------------ */
export const gallery = [
  /* ---- Us, for real ---- */
  {
    src: '/images/us-fairy-lights.jpg',
    caption: 'Laughing so hard the camera could not keep up. My favourite blurry photo of all time.',
    alt: 'Hiruni and Hansika laughing in a night-time selfie under string lights',
  },
  {
    src: '/images/us-palm-shade.jpg',
    caption: 'Sun on my face, you right behind me. I would stay in this second forever.',
    alt: 'Hansika and Hiruni in sunglasses sitting together under a wooden shade with palm trees',
  },
  {
    src: '/images/us-squish.jpg',
    caption: 'You holding my face like it belongs to you. It does.',
    alt: 'Hansika holding Hiruni\'s cheeks as they lean in close',
  },
  {
    src: '/images/us-beach-socks.jpg',
    caption: 'Two pairs of socks, one ocean, nowhere else to be. A perfect day looks like this.',
    alt: 'Their legs side by side under a beachside table, the sea and a bottle of ginger beer beyond',
  },
  {
    src: '/images/us-pizza-shock.jpg',
    caption: 'Whatever was on that screen, we were shocked about it together. That is the whole point of you.',
    alt: 'Hiruni and Hansika making matching shocked faces at a phone over pizza',
  },
  {
    src: '/images/us-upside-down.jpg',
    caption: 'Every angle, even upside down, the answer is still you.',
    alt: 'Hiruni resting her chin on top of Hansika\'s head, photographed from below as he smiles',
  },

  /* ---- The Tangled ones ---- */
  {
    src: '/images/g1-lanterns.jpg',
    caption: 'One day this. Real sky, real you, no screen in the way.',
    alt: 'Rapunzel and Flynn sitting together by candlelight under a crescent moon',
  },
  {
    src: '/images/g2-picnic.jpg',
    caption: 'Doing absolutely nothing together. Top of my list.',
    alt: 'Rapunzel and Flynn lying on a picnic blanket in a forest clearing',
  },
  {
    src: '/images/g3-forest.jpg',
    caption: 'Me, thinking about you. Which is most of the day, honestly.',
    alt: 'Rapunzel looking up through sunlit trees',
  },
  {
    src: '/images/g4-rose.jpg',
    caption: 'Dressed up with nowhere to be but your call.',
    alt: 'Rapunzel holding a white rose by candlelight',
  },
  {
    src: '/images/g5-eyes.jpg',
    caption: 'The way you look at me. Even through a phone. Even from there.',
    alt: 'Close-ups of Flynn and Rapunzel looking at each other',
  },
  {
    src: '/images/g6-dancing.jpg',
    caption: 'How I feel when your name lights up my phone.',
    alt: 'Rapunzel dancing and spinning in a field of flowers',
  },
  {
    src: '/images/g7-pascal.jpg',
    caption: 'Us. Someday. Same frame, same country, same everything.',
    alt: 'Rapunzel and Flynn smiling down at the camera with Pascal',
  },
]

/* ---------- FOOTER ---------- */
export const footer = {
  line: 'Built with a lot of love and slightly too much caffeine.',
}
