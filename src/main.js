const assets = [
  { title: 'Opening Frame', type: 'Video', duration: '00:12', accent: 'linear-gradient(135deg, #31d9ff, #5468ff)', selected: true },
  { title: 'Neon Crowd', type: 'Drone', duration: '00:08', accent: 'linear-gradient(135deg, #9b5cff, #ff4fd8)', selected: false },
  { title: 'City Lights', type: 'B-roll', duration: '00:15', accent: 'linear-gradient(135deg, #ffc857, #ff5f9e)', selected: false },
  { title: 'Ambient Audio', type: 'Audio', duration: '00:30', accent: 'linear-gradient(135deg, #55f5b2, #31d9ff)', selected: false },
];

const clips = [
  { title: 'Opening Frame', duration: '00:12', layer: 'V1' },
  { title: 'City Lights', duration: '00:15', layer: 'V1' },
  { title: 'Neon Crowd', duration: '00:08', layer: 'V2' },
  { title: 'Ambient Audio', duration: '00:30', layer: 'A1' },
];

const assetList = document.querySelector('#assetList');
const timelineTrack = document.querySelector('#timelineTrack');
const selectedTitle = document.querySelector('#selectedTitle');
const inspectorThumb = document.querySelector('#inspectorThumb');
const previewTitle = document.querySelector('.preview-overlay h2');
const previewTime = document.querySelector('.time-badge');
const playButton = document.querySelector('.icon-button.primary');
const exportButtons = document.querySelectorAll('.primary-button');

let activeTitle = 'Opening Frame';
let isPlaying = false;
let elapsed = 134;

const paletteFor = (title) => assets.find((asset) => asset.title === title)?.accent || 'linear-gradient(135deg, #31d9ff, #9b5cff)';

function selectClip(title) {
  activeTitle = title;
  const asset = assets.find((item) => item.title === title);
  selectedTitle.textContent = title;
  inspectorThumb.style.background = paletteFor(title);
  previewTitle.textContent = title === 'Opening Frame' ? 'Midnight Signal' : title;
  if (asset) asset.selected = true;
  renderAssets();
  renderTimeline();
}

function renderAssets() {
  assetList.innerHTML = '';
  assets.forEach((asset) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `asset-card ${asset.title === activeTitle ? 'selected' : ''}`;
    button.innerHTML = `
      <div class="asset-thumb" style="background:${asset.accent}"></div>
      <div class="asset-meta">
        <h3>${asset.title}</h3>
        <p>${asset.type}</p>
        <p>${asset.duration}</p>
      </div>
    `;
    button.addEventListener('click', () => selectClip(asset.title));
    assetList.appendChild(button);
  });
}

function renderTimeline() {
  timelineTrack.innerHTML = '';
  clips.forEach((clip, index) => {
    const node = document.createElement('button');
    node.type = 'button';
    node.className = `timeline-clip ${clip.title === activeTitle ? 'selected' : ''}`;
    node.style.background = `linear-gradient(135deg, ${index % 2 ? 'rgba(160,120,255,.2)' : 'rgba(104,227,255,.2)'}, rgba(255,127,227,.12))`;
    node.innerHTML = `
      <div class="clip-header"><strong>${clip.title}</strong><span class="clip-duration">${clip.duration}</span></div>
      <div class="clip-wave"><span></span></div>
      <div class="clip-footer"><span>${clip.layer}</span><span>${index === 3 ? 'WAVE' : 'AI READY'}</span></div>
    `;
    node.addEventListener('click', () => selectClip(clip.title));
    timelineTrack.appendChild(node);
  });
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `00:${minutes}:${seconds}`;
}

playButton?.addEventListener('click', () => {
  isPlaying = !isPlaying;
  playButton.textContent = isPlaying ? 'Ⅱ' : '▶';
  playButton.setAttribute('aria-label', isPlaying ? 'Pause preview' : 'Play preview');
});

document.querySelectorAll('.effect-pill').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.effect-pill').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelectorAll('.library-tools .chip, .timeline-actions .chip').forEach((button) => {
  button.addEventListener('click', () => {
    const group = button.parentElement;
    group.querySelectorAll('.chip').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
  });
});

exportButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const original = button.textContent;
    button.textContent = 'Rendering…';
    button.disabled = true;
    window.setTimeout(() => {
      button.textContent = original === 'Export' ? 'Export Ready' : 'Preview Ready';
      button.disabled = false;
    }, 900);
  });
});

window.setInterval(() => {
  if (!isPlaying) return;
  elapsed = (elapsed + 1) % 3600;
  previewTime.textContent = formatTime(elapsed);
}, 1000);

selectClip(activeTitle);
