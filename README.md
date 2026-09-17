const assets = [
  {
    title: 'Opening Frame',
    type: 'Video',
    duration: '00:12',
    accent: 'linear-gradient(135deg, rgba(104,227,255,0.9), rgba(120,166,255,0.7))',
    selected: true,
  },
  {
    title: 'Neon Crowd',
    type: 'Drone',
    duration: '00:08',
    accent: 'linear-gradient(135deg, rgba(160,120,255,0.9), rgba(255,127,227,0.75))',
    selected: false,
  },
  {
    title: 'City Lights',
    type: 'B-roll',
    duration: '00:15',
    accent: 'linear-gradient(135deg, rgba(255,213,125,0.85), rgba(255,127,227,0.65))',
    selected: false,
  },
  {
    title: 'Ambient Audio',
    type: 'Audio',
    duration: '00:30',
    accent: 'linear-gradient(135deg, rgba(150,247,195,0.8), rgba(104,227,255,0.7))',
    selected: false,
  }
];

const timelineClips = [
  { title: 'Opening Frame', duration: '00:12', selected: true },
  { title: 'City Lights', duration: '00:15', selected: false },
  { title: 'Neon Crowd', duration: '00:08', selected: false },
  { title: 'Ambient Audio', duration: '00:30', selected: false },
];

const assetList = document.getElementById('assetList');
const timelineTrack = document.getElementById('timelineTrack');
const selectedTitle = document.getElementById('selectedTitle');
const inspectorThumb = document.getElementById('inspectorThumb');

function renderAssets() {
  assetList.innerHTML = '';

  assets.forEach((asset) => {
    const item = document.createElement('button');
    item.className = `asset-card ${asset.selected ? 'selected' : ''}`;
    item.type = 'button';
    item.innerHTML = `
      <div class="asset-thumb" style="background:${asset.accent};"></div>
      <div class="asset-meta">
        <h3>${asset.title}</h3>
        <p>${asset.type}</p>
        <p>${asset.duration}</p>
      </div>
    `;

    item.addEventListener('click', () => {
      assets.forEach((a) => (a.selected = false));
      asset.selected = true;
      selectedTitle.textContent = asset.title;
      inspectorThumb.style.background = asset.accent;
      renderAssets();
      renderTimeline();
    });

    assetList.appendChild(item);
  });
}

function renderTimeline() {
  timelineTrack.innerHTML = '';

  timelineClips.forEach((clip) => {
    const node = document.createElement('div');
    const isSelected = clip.title === selectedTitle.textContent;
    node.className = `timeline-clip ${isSelected ? 'selected' : ''}`;

    const palette = {
      'Opening Frame': 'linear-gradient(135deg, rgba(104,227,255,0.22), rgba(120,166,255,0.26))',
      'City Lights': 'linear-gradient(135deg, rgba(255,213,125,0.2), rgba(255,127,227,0.18))',
      'Neon Crowd': 'linear-gradient(135deg, rgba(160,120,255,0.18), rgba(255,127,227,0.18))',
      'Ambient Audio': 'linear-gradient(135deg, rgba(150,247,195,0.16), rgba(104,227,255,0.2))',
    };

    node.style.background = palette[clip.title] || 'linear-gradient(135deg, rgba(104,227,255,0.18), rgba(160,120,255,0.18))';
    node.innerHTML = `
      <div class="clip-header">
        <strong>${clip.title}</strong>
        <span class="clip-duration">${clip.duration}</span>
      </div>
      <div class="clip-wave"><span></span></div>
      <div class="clip-footer">
        <span>Layer 01</span>
        <span>AI</span>
      </div>
    `;

    node.addEventListener('click', () => {
      selectedTitle.textContent = clip.title;
      inspectorThumb.style.background =
        palette[clip.title] || 'linear-gradient(135deg, rgba(104,227,255,0.8), rgba(160,120,255,0.8))';
      renderAssets();
      renderTimeline();
    });

    timelineTrack.appendChild(node);
  });
}

renderAssets();
renderTimeline();

const effectButtons = document.querySelectorAll('.effect-pill');
effectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    effectButtons.forEach((b) => b.classList.remove('active'));
    button.classList.add('active');
  });
});
