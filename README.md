# The Castle That Remembers

An explorable, hand-painted 3D castle where every keepsake holds a memory.
Walk the halls, find a keepsake, and whisper a memory to it. The castle keeps
it safe - and whispers it back to you whenever you return.

Built for the **Manycore / Aholo Global AI Hackathon 2026**. Every 3D prop in
the castle was generated with **Lux3D** (image-to-3D, Hand Painted style,
Standard / Mesh model / PBR materials).

## Play

Open `index.html` from any static host (or the deployed URL). Click to look
around, **WASD** to walk, **Shift** to hurry, **E** to touch a keepsake.

Eight keepsakes remember: the brass lantern, the music box, the picture frame,
the old iron key, the porcelain teacup, the grandfather clock, the treasure
chest, and the hand mirror. Touch one and whisper - your memory is sealed in
your own browser (localStorage), never uploaded. Touch it again and it whispers
back. If no microphone is available, you can write the memory instead and the
castle reads it back in its own voice (Web Speech API).

## Rooms

Great Hall - Library - Tower Bedroom - Kitchen - Courtyard, plus 25
Lux3D-generated props in a consistent hand-painted style.

## Tech

- Zero-build static site: plain HTML + ES modules
- [three.js](https://threejs.org) r160 (vendored locally in `vendor/`, no CDN
  dependency at runtime)
- GLTFLoader for the 25 Lux3D-generated `.glb` props
- MediaRecorder API for whisper capture (Web Speech API fallback)
- localStorage for memory persistence - all data stays on the visitor's device

## Asset pipeline

1. Text-to-image prompts (Hand Painted style) for each prop
2. Lux3D image-to-3D: Standard edition, Mesh model, 100K faces (200K for hero
   pieces), PBR materials
3. Downloaded as `.glb` and placed into the castle layout in `main.js`

## Run locally

Any static file server works (ES modules need http, not file://):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Privacy

Memories never leave the browser. They are stored in localStorage on the
visitor's device and can be cleared by clearing site data.
