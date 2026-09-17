# SuperYvid_ed

SuperYvid_ed is a futuristic browser-based video editing studio. It gives creators a neon command center for importing local media, previewing video, arranging multiple timeline tracks, trimming and splitting clips, exploring visual effects, and preparing a multi-track export.

The interface combines a media library, real video preview, visual inspector, audio waveform track, and drag-and-drop timeline in one cinematic workspace. Uploaded videos are previewed directly in the browser using local object URLs, so media stays on the user's device during editing.

The editor includes video and audio track lanes, draggable clips, trim handles, split controls, a playhead, playback controls, waveform visualization, effect selection, and an export progress workflow. It is a front-end prototype: the export interface simulates rendering rather than encoding a final video file.

The visual style is inspired by holographic control rooms, cyberpunk production suites, and next-generation creative software. Glowing cyan, violet, and pink accents, glass panels, scanlines, and animated light create an immersive editing atmosphere without hiding the tools.

## Run locally

Install dependencies with `npm install`, then start the development server with `npm run dev`. Open the Vite URL displayed in the terminal.

## Current experience

- Import local video, audio, and image files
- Preview an uploaded video in the central player
- Drag clips between timeline positions
- Select clips for editing
- Trim the selected clip with visible handles
- Split a selected clip at the playhead
- View an audio waveform-style lane
- Manage video, overlay, and audio tracks
- Play, pause, and seek through the project
- Simulate a multi-track export with progress feedback

This is a client-side editing prototype. A future production version could add persistent projects, WebCodecs or FFmpeg rendering, captions, transitions, cloud storage, and collaborative editing.
