const $ = (selector) => document.querySelector(selector);
const assets = [
  { id: 'opening', name: 'Opening Frame', type: 'Video', duration: 12, track: 'V1', color: 'linear-gradient(135deg,#31d9ff,#5468ff)', url: '' },
  { id: 'city', name: 'City Lights', type: 'Video', duration: 15, track: 'V1', color: 'linear-gradient(135deg,#ffc857,#ff5f9e)', url: '' },
  { id: 'crowd', name: 'Neon Crowd', type: 'Video', duration: 8, track: 'V2', color: 'linear-gradient(135deg,#9b5cff,#ff4fd8)', url: '' },
  { id: 'audio', name: 'Ambient Audio', type: 'Audio', duration: 30, track: 'A1', color: 'linear-gradient(135deg,#55f5b2,#31d9ff)', url: '' },
];
let clips = assets.map((asset, index) => ({ ...asset, uid: `${asset.id}-${index}`, start: index * 4, trimStart: 0, trimEnd: asset.duration }));
let selectedId = clips[0].uid;
let playing = false;
let playhead = 0;
let renderTimer;

const assetList = $('#assetList');
const tracks = $('#tracks');
const preview = $('#previewVideo');
const fallback = $('.fallback');

function selected() { return clips.find((clip) => clip.uid === selectedId) || clips[0]; }
function formatTime(seconds) { const h = Math.floor(seconds / 3600).toString().padStart(2,'0'); const m = Math.floor(seconds / 60 % 60).toString().padStart(2,'0'); const s = Math.floor(seconds % 60).toString().padStart(2,'0'); return `${h}:${m}:${s}`; }
function durationLabel(seconds) { return `00:${Math.max(0, Math.floor(seconds)).toString().padStart(2,'0')}`; }
function selectClip(uid) { selectedId = uid; const clip = selected(); $('#selectedName').textContent = clip.name; $('#selectedMeta').textContent = `${clip.type} · ${clip.track}`; $('#selectedThumb').style.background = clip.color; $('#previewTitle').textContent = clip.name; if (clip.url && clip.type === 'Video') { preview.src = clip.url; preview.classList.add('visible'); fallback.classList.add('hidden'); } render(); }
function renderAssets() { assetList.innerHTML = ''; $('#assetCount').textContent = String(assets.length).padStart(2,'0'); assets.forEach((asset) => { const el = document.createElement('button'); el.className = `asset ${selected().id === asset.id ? 'active' : ''}`; el.innerHTML = `<i style="background:${asset.color}"></i><span><b>${asset.name}</b><small>${asset.type} · ${durationLabel(asset.duration)}</small></span>`; el.onclick = () => { const existing = clips.find((clip) => clip.id === asset.id); if (existing) selectClip(existing.uid); }; assetList.appendChild(el); }); }
function waveform() { return Array.from({ length: 54 }, (_, i) => `<i style="height:${12 + ((i * 29) % 68)}%"></i>`).join(''); }
function renderTracks() { const groups = ['V2','V1','A1']; tracks.innerHTML = ''; groups.forEach((track) => { const row = document.createElement('div'); row.className = `track-row ${track === 'A1' ? 'audio-row' : ''}`; row.innerHTML = `<div class="track-name"><b>${track}</b><small>${track === 'A1' ? 'AUDIO' : 'VIDEO'}</small></div><div class="lane" data-track="${track}"></div>`; tracks.appendChild(row); const lane = row.querySelector('.lane'); clips.filter((clip) => clip.track === track).forEach((clip) => { const card = document.createElement('button'); card.className = `clip ${clip.uid === selectedId ? 'selected' : ''}`; card.draggable = true; card.style.left = `${clip.start / 40 * 100}%`; card.style.width = `${Math.max(11, (clip.trimEnd - clip.trimStart) / 40 * 100)}%`; card.style.background = clip.color; card.innerHTML = `<span class="handle left"></span><b>${clip.name}</b><small>${durationLabel(clip.trimEnd - clip.trimStart)}</small><span class="wave">${track === 'A1' ? waveform() : ''}</span><span class="handle right"></span>`; card.onclick = () => selectClip(clip.uid); card.ondragstart = (event) => { event.dataTransfer.setData('text/plain', clip.uid); card.classList.add('dragging'); }; card.ondragend = () => card.classList.remove('dragging'); card.ondragover = (event) => event.preventDefault(); card.ondrop = (event) => { event.preventDefault(); reorder(event.dataTransfer.getData('text/plain'), clip.uid); }; lane.appendChild(card); }); }); }
function reorder(fromId, toId) { const from = clips.find((clip) => clip.uid === fromId); const to = clips.find((clip) => clip.uid === toId); if (!from || !to || from.uid === to.uid) return; const fromIndex = clips.indexOf(from); const toIndex = clips.indexOf(to); clips.splice(fromIndex, 1); clips.splice(toIndex, 0, from); clips.forEach((clip, index) => { clip.start = index * 4; }); $('#timelineMessage').textContent = 'Track order updated'; render(); }
function render() { renderAssets(); renderTracks(); $('#timecode').textContent = formatTime(playhead); }
function trimSelected() { const clip = selected(); if (!clip) return; if (clip.trimEnd - clip.trimStart > 3) clip.trimEnd -= 1; $('#timelineMessage').textContent = `${clip.name} trimmed`; render(); }
function splitSelected() { const clip = selected(); if (!clip || clip.trimEnd - clip.trimStart < 2) return; const midpoint = clip.trimStart + (clip.trimEnd - clip.trimStart) / 2; const second = { ...clip, uid: `${clip.uid}-split`, name: `${clip.name} / B`, trimStart: midpoint, start: clip.start + (midpoint - clip.trimStart) }; clip.trimEnd = midpoint; clips.splice(clips.indexOf(clip) + 1, 0, second); $('#timelineMessage').textContent = 'Clip split at playhead'; render(); }
function deleteSelected() { if (clips.length <= 1) return; clips = clips.filter((clip) => clip.uid !== selectedId); selectedId = clips[0].uid; render(); }
function renderExport(button) { clearInterval(renderTimer); let percent = 0; button.disabled = true; button.textContent = 'Rendering tracks…'; renderTimer = setInterval(() => { percent = Math.min(100, percent + 5); $('#renderBar').style.width = `${percent}%`; $('#renderPercent').textContent = `${percent}%`; if (percent === 100) { clearInterval(renderTimer); button.disabled = false; button.textContent = 'Export complete'; $('#projectStatus').textContent = 'Multi-track render ready'; } }, 100); }

$('#mediaInput').onchange = (event) => { [...event.target.files].forEach((file, index) => { const type = file.type.startsWith('audio') ? 'Audio' : file.type.startsWith('video') ? 'Video' : 'Image'; const asset = { id: `local-${Date.now()}-${index}`, name: file.name.replace(/\.[^/.]+$/, ''), type, duration: 10, track: type === 'Audio' ? 'A1' : 'V1', color: type === 'Audio' ? 'linear-gradient(135deg,#55f5b2,#31d9ff)' : 'linear-gradient(135deg,#31d9ff,#9b5cff)', url: URL.createObjectURL(file) }; assets.unshift(asset); const clip = { ...asset, uid: `${asset.id}-clip`, start: 0, trimStart: 0, trimEnd: 10 }; clips.unshift(clip); selectedId = clip.uid; }); selectClip(selectedId); };
$('#playBtn').onclick = () => { playing = !playing; $('#playBtn').textContent = playing ? 'Ⅱ' : '▶'; if (playing && preview.src) preview.play().catch(() => {}); else preview.pause(); };
$('#backBtn').onclick = () => { playhead = Math.max(0, playhead - 5); render(); };
$('#forwardBtn').onclick = () => { playhead += 5; render(); };
$('#trimBtn').onclick = trimSelected;
$('#splitBtn').onclick = splitSelected;
$('#deleteBtn').onclick = deleteSelected;
$('#renderBtn').onclick = (event) => renderExport(event.currentTarget);
$('#exportBtn').onclick = (event) => renderExport(event.currentTarget);
preview.ontimeupdate = () => { playhead = preview.currentTime; render(); };
window.setInterval(() => { if (playing && !preview.src) { playhead = (playhead + 1) % 40; render(); } }, 1000);
document.querySelectorAll('.fx').forEach((button) => button.onclick = () => { document.querySelectorAll('.fx').forEach((item) => item.classList.remove('active')); button.classList.add('active'); });
render();
