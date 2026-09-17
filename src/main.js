* {
  box-sizing: border-box;
}

:root {
  --bg: #070b17;
  --bg-strong: #0d1326;
  --panel: rgba(15, 20, 35, 0.68);
  --panel-strong: rgba(19, 26, 45, 0.94);
  --panel-alt: rgba(10, 14, 27, 0.9);
  --line: rgba(138, 155, 255, 0.18);
  --line-strong: rgba(135, 225, 255, 0.45);
  --text: #edf4ff;
  --muted: #9aa8c4;
  --cyan: #68e3ff;
  --blue: #78a6ff;
  --purple: #a078ff;
  --pink: #ff7fe3;
  --green: #96f7c3;
  --gold: #ffd57d;
  --shadow: rgba(4, 8, 16, 0.78);
}

html, body {
  margin: 0;
  min-height: 100%;
  font-family: 'Inter', sans-serif;
  background:
    radial-gradient(circle at top left, rgba(120, 166, 255, 0.18), transparent 24%),
    radial-gradient(circle at top right, rgba(160, 120, 255, 0.22), transparent 30%),
    radial-gradient(circle at bottom center, rgba(104, 227, 255, 0.12), transparent 35%),
    linear-gradient(180deg, #050913 0%, #090e1a 38%, #070b14 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  position: relative;
}

button,
input {
  font: inherit;
}

.holo-backdrop {
  position: fixed;
  inset: -10% -10% auto -10%;
  height: 80vh;
  pointer-events: none;
  filter: blur(20px);
  opacity: 0.8;
}

.orb {
  position: absolute;
  border-radius: 50%;
  display: block;
  animation: drift 18s ease-in-out infinite alternate;
}

.orb-1 {
  width: 420px;
  height: 420px;
  left: 8%;
  top: 12%;
  background: radial-gradient(circle at 30% 30%, rgba(104,227,255,0.9), rgba(104,227,255,0.22) 32%, transparent 65%);
}

.orb-2 {
  width: 460px;
  height: 460px;
  right: 6%;
  top: 8%;
  background: radial-gradient(circle at 30% 30%, rgba(160,120,255,0.9), rgba(160,120,255,0.22) 30%, transparent 70%);
  animation-delay: 1.5s;
}

.orb-3 {
  width: 520px;
  height: 520px;
  right: 28%;
  bottom: -18%;
  background: radial-gradient(circle at 50% 35%, rgba(255,127,227,0.78), rgba(255,127,227,0.2) 32%, transparent 70%);
  animation-delay: 3s;
}

@keyframes drift {
  0% { transform: translate3d(0,0,0) scale(1); }
  100% { transform: translate3d(20px,-24px,0) scale(1.08); }
}

.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px);
  background-size: 34px 34px;
  mask-image: radial-gradient(circle at center, black 52%, transparent 100%);
  pointer-events: none;
}

.scanlines {
  position: fixed;
  inset: 0;
  background: repeating-linear-gradient(
    180deg,
    rgba(255,255,255,0.025),
    rgba(255,255,255,0.025) 1px,
    transparent 2px,
    transparent 4px
  );
  pointer-events: none;
  opacity: 0.45;
}

.app-shell {
  position: relative;
  z-index: 1;
  width: min(1540px, calc(100vw - 28px));
  height: min(920px, calc(100vh - 28px));
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.panel {
  background: linear-gradient(180deg, rgba(15, 20, 35, 0.78), rgba(11, 14, 28, 0.72));
  border: 1px solid var(--line);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.34), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 24px rgba(104, 227, 255, 0.06);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  padding: 18px 20px;
  border-radius: 22px;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-mark {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(104, 227, 255, 0.28), rgba(160, 120, 255, 0.32));
  border: 1px solid var(--line-strong);
  font-weight: 800;
  letter-spacing: 0.08em;
  box-shadow: 0 0 30px rgba(104, 227, 255, 0.22), inset 0 0 18px rgba(255,255,255,0.09);
}

.topbar h1 {
  margin: 3px 0 0;
  font-size: clamp(1.2rem, 1.8vw, 2rem);
  letter-spacing: 0.04em;
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 10px;
  font-weight: 600;
}

.eyebrow.tiny {
  letter-spacing: 0.12em;
  font-size: 8px;
}

.topbar-center {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  justify-content: center;
  flex-wrap: wrap;
}

.project-pill,
.chip,
.effect-pill,
.ghost-button,
.primary-button,
.icon-button,
.upload-btn {
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
  color: var(--text);
  transition: 0.18s ease;
}

.project-pill,
.chip,
.effect-pill {
  padding: 8px 12px;
  font-size: 12px;
}

.chip.active,
.effect-pill.active,
.project-pill.active {
  background: linear-gradient(135deg, rgba(104, 227, 255, 0.14), rgba(160, 120, 255, 0.15));
  border-color: rgba(104, 227, 255, 0.45);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 18px rgba(104, 227, 255, 0.12);
}

.topbar-actions {
  display: flex;
  gap: 10px;
}

.ghost-button,
.primary-button,
.icon-button,
.upload-btn {
  cursor: pointer;
}

.ghost-button,
.icon-button {
  padding: 9px 12px;
}

.primary-button {
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(104, 227, 255, 0.22), rgba(160, 120, 255, 0.22));
  border-color: rgba(104, 227, 255, 0.54);
  font-weight: 700;
  box-shadow: 0 0 18px rgba(104,227,255,0.15);
}

.primary-button.full {
  width: 100%;
  margin-top: 12px;
}

.upload-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 11px 12px;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  background: linear-gradient(135deg, rgba(104,227,255,0.16), rgba(160,120,255,0.14));
  border-color: rgba(104,227,255,0.45);
}

#mediaUpload {
  display: none;
}

.workspace {
  flex: 1;
  display: grid;
  grid-template-columns: 270px 1fr 300px;
  gap: 18px;
  min-height: 0;
}

.sidebar {
  border-radius: 24px;
  padding: 16px;
  overflow: hidden;
}

.left-sidebar,
.right-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.compact {
  gap: 10px;
}

.section-label {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
}

.library-tools,
.timeline-actions,
.effect-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.asset-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding-right: 4px;
}

.asset-card {
  border-radius: 16px;
  padding: 10px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
  display: grid;
  grid-template-columns: 82px 1fr;
  gap: 10px;
  cursor: pointer;
  transition: 0.2s ease;
}

.asset-card:hover,
.asset-card.selected {
  border-color: rgba(104, 227, 255, 0.42);
  background: rgba(104, 227, 255, 0.05);
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03);
}

.asset-thumb {
  height: 70px;
  width: 100%;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(104,227,255,0.8), rgba(160,120,255,0.8));
  box-shadow: inset 0 1px 20px rgba(255,255,255,0.15);
  position: relative;
  overflow: hidden;
}

.asset-thumb::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent, rgba(8,11,18,0.42));
}

.asset-meta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
}

.asset-meta h3 {
  margin: 0;
  font-size: 0.92rem;
}

.asset-meta p {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
}

.studio {
  border-radius: 28px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.studio-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
}

.playback-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 11px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
}

.dot.live {
  background: var(--green);
  box-shadow: 0 0 16px rgba(150,247,195,0.8);
}

.transport-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon-button {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  font-size: 18px;
}

.icon-button.primary {
  background: linear-gradient(135deg, rgba(104,227,255,0.18), rgba(160,120,255,0.18));
  border-color: rgba(104,227,255,0.5);
}

.preview-area {
  flex: 1;
  padding: 18px;
  min-height: 0;
}

.preview-stage {
  position: relative;
  height: 100%;
  min-height: 320px;
  border-radius: 26px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.08);
  background:
    radial-gradient(circle at 30% 25%, rgba(104,227,255,0.18), transparent 18%),
    radial-gradient(circle at 75% 18%, rgba(255,127,227,0.22), transparent 20%),
    linear-gradient(142deg, #060d1d 0%, #0d1830 38%, #070d12 100%);
  box-shadow: inset 0 20px 70px rgba(255,255,255,0.04), inset 0 -30px 50px rgba(0,0,0,0.5), 0 0 30px rgba(104,227,255,0.08);
}

#previewVideo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.25s ease;
  background: rgba(7,11,23,0.7);
}

#previewVideo.has-source {
  opacity: 1;
}

.screen-glow {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(104,227,255,0.12), transparent 35%, rgba(160,120,255,0.12)),
    radial-gradient(circle at center, rgba(255,255,255,0.08), transparent 52%);
}

.data-grid {
  position: absolute;
  inset: 10% 12%;
  border-radius: 22px;
  background-image:
    linear-gradient(rgba(104,227,255,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(104,227,255,0.06) 1px, transparent 1px);
  background-size: 22px 22px;
  border: 1px solid rgba(104,227,255,0.09);
}

.preview-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.04), transparent 16%, transparent 84%, rgba(0,0,0,0.28));
}

.focus-ring {
  position: absolute;
  inset: 17% 14%;
  border-radius: 32px;
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 0 0 1px rgba(104,227,255,0.08), 0 0 24px rgba(104,227,255,0.12), inset 0 0 18px rgba(104,227,255,0.08);
}

.preview-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding: 26px 28px;
}

.preview-overlay h2 {
  margin: 6px 0 0;
  font-size: clamp(1.4rem, 2vw, 2.8rem);
  letter-spacing: 0.04em;
}

.time-badge {
  align-self: flex-start;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(7, 11, 23, 0.56);
  border: 1px solid rgba(255,255,255,0.06);
  color: var(--gold);
  font-weight: 700;
  letter-spacing: 0.08em;
}

.preview-vignette {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7,11,23,0.05), rgba(7,11,23,0.36));
}

.timeline-panel {
  border-top: 1px solid var(--line);
  background: rgba(8, 12, 24, 0.72);
  padding: 16px 18px 18px;
}

.timeline-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.timeline-ruler {
  display: grid;
  grid-template-columns: repeat(7, minmax(70px, 1fr));
  gap: 10px;
  font-size: 11px;
  color: var(--muted);
  padding: 0 6px 8px;
}

.timeline-track {
  display: grid;
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  gap: 14px;
  min-height: 120px;
  padding-top: 12px;
}

.timeline-clip {
  position: relative;
  min-height: 100px;
  border-radius: 18px;
  padding: 12px;
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(135deg, rgba(104,227,255,0.14), rgba(160,120,255,0.12));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
}

.timeline-clip.dragging {
  opacity: 0.55;
}

.timeline-clip::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.06), transparent 60%);
}

.timeline-clip.selected {
  border-color: rgba(104,227,255,0.55);
  box-shadow: 0 0 0 1px rgba(104,227,255,0.22), 0 0 24px rgba(104,227,255,0.12);
}

.clip-header,
.clip-footer {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.timeline-clip strong {
  letter-spacing: 0.04em;
}

.clip-duration {
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}

.clip-wave {
  position: relative;
  z-index: 1;
  height: 28px;
  border-radius: 12px;
  background: linear-gradient(90deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03));
  overflow: hidden;
}

.clip-wave span {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.46),
    rgba(255,255,255,0.46) 2px,
    transparent 2px,
    transparent 6px
  );
  opacity: 0.8;
}

.right-sidebar {
  gap: 16px;
}

.inspector-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
  padding: 8px 10px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(255,255,255,0.02);
}

.clip-thumb {
  width: 68px;
  height: 68px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(104,227,255,0.9), rgba(160,120,255,0.78));
  border: 1px solid rgba(255,255,255,0.08);
  box-shadow: inset 0 1px 16px rgba(255,255,255,0.18);
}

.inspector-card h3 {
  margin: 4px 0 0;
  font-size: 1rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 8px;
}

.control-group label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

input[type='range'] {
  width: 100%;
  accent-color: var(--cyan);
}

.effects-panel,
.export-box {
  border-top: 1px solid var(--line);
  padding-top: 12px;
}

.effect-grid {
  margin-top: 10px;
}

.effect-pill {
  cursor: pointer;
}

.export-stats {
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.export-stats div {
  border-radius: 12px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.02);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: var(--muted);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.export-stats strong {
  color: var(--text);
  font-size: 12px;
  letter-spacing: 0.04em;
  text-transform: none;
}

.progress-wrap {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.progress-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--muted);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.progress-bar {
  width: 100%;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--line);
}

#progressFill {
  width: 0%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--cyan), var(--purple), var(--pink));
  box-shadow: 0 0 18px rgba(104,227,255, 0.3);
  transition: width 0.25s ease;
}

@media (max-width: 1100px) {
  body {
    overflow: auto;
  }

  .app-shell {
    height: auto;
    padding: 14px 0 32px;
  }

  .workspace {
    grid-template-columns: 1fr;
  }

  .timeline-track {
    grid-template-columns: 1fr;
  }
}
