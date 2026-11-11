(function () {
  'use strict';
  var INK = '#1B365D';

  var WORDS = [
    { id: 'sunny',  label: 'Sunny',  line: 'It is sunny.',  tint: '#FFE9A8' },
    { id: 'rainy',  label: 'Rainy',  line: 'It is rainy.',  tint: '#CDE4FF' },
    { id: 'windy',  label: 'Windy',  line: 'It is windy.',  tint: '#D5F1E3' },
    { id: 'foggy',  label: 'Foggy',  line: 'It is foggy.',  tint: '#E4E9F1' },
    { id: 'cloudy', label: 'Cloudy', line: 'It is cloudy.', tint: '#DCE8F7' }
  ];
  var byId = {};
  WORDS.forEach(function (w) { byId[w.id] = w; });

  /* ---------- Pictures (inline SVG, sticker style) ---------- */
  var FACES = {
    happy: '<circle cx="-14" cy="8" r="4.5" fill="' + INK + '"/><circle cx="14" cy="8" r="4.5" fill="' + INK + '"/>' +
           '<circle cx="-27" cy="18" r="5.5" fill="#FF9DB0" opacity=".85"/><circle cx="27" cy="18" r="5.5" fill="#FF9DB0" opacity=".85"/>' +
           '<path d="M-9 17 Q0 28 9 17" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>',
    blow:  '<circle cx="-14" cy="8" r="4.5" fill="' + INK + '"/><circle cx="14" cy="8" r="4.5" fill="' + INK + '"/>' +
           '<circle cx="-27" cy="18" r="5.5" fill="#FF9DB0" opacity=".85"/><circle cx="27" cy="18" r="5.5" fill="#FF9DB0" opacity=".85"/>' +
           '<ellipse cx="0" cy="22" rx="5" ry="6.5" fill="' + INK + '"/>',
    grump: '<circle cx="-14" cy="10" r="4.5" fill="' + INK + '"/><circle cx="14" cy="10" r="4.5" fill="' + INK + '"/>' +
           '<path d="M-23 -1 L-8 4 M23 -1 L8 4" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
           '<path d="M-8 26 Q0 19 8 26" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>'
  };
  FACES.sleepy = '<path d="M-20 9 Q-14 15 -8 9 M8 9 Q14 15 20 9" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="-27" cy="19" r="5.5" fill="#FF9DB0" opacity=".85"/><circle cx="27" cy="19" r="5.5" fill="#FF9DB0" opacity=".85"/>' +
    '<path d="M-6 21 Q0 26 6 21" fill="none" stroke="' + INK + '" stroke-width="4" stroke-linecap="round"/>';
  var CLOUD_SHAPES =
    '<circle cx="-42" cy="12" r="24"/><circle cx="-12" cy="-8" r="32"/><circle cx="24" cy="-2" r="26"/>' +
    '<circle cx="46" cy="14" r="22"/><rect x="-42" y="12" width="88" height="24"/>';

  function cloud(cx, cy, s, fill, face) {
    return '<g transform="translate(' + cx + ' ' + cy + ') scale(' + s + ')">' +
      '<g fill="' + INK + '" stroke="' + INK + '" stroke-width="10" stroke-linejoin="round">' + CLOUD_SHAPES + '</g>' +
      '<g fill="' + fill + '">' + CLOUD_SHAPES + '</g>' +
      (face ? FACES[face] : '') + '</g>';
  }
  function drop(x, y, i) {
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="drop" style="--i:' + i + '">' +
      '<path d="M0 -10 C 8 2 9 10 0 10 C -9 10 -8 2 0 -10 Z" fill="#3E9BFF" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/></g></g>';
  }
  function flake(x, y, i) {
    var d = 'M0 -10V10M-8.7 -5L8.7 5M-8.7 5L8.7 -5';
    return '<g transform="translate(' + x + ' ' + y + ')"><g class="flake" style="--i:' + i + '">' +
      '<path d="' + d + '" stroke="' + INK + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
      '<path d="' + d + '" stroke="#BFE3FF" stroke-width="4" stroke-linecap="round" fill="none"/></g></g>';
  }
  function rays() {
    var s = '', k, a, c, n, pts;
    for (var pass = 0; pass < 2; pass++) {
      for (k = 0; k < 8; k++) {
        a = k * Math.PI / 4; c = Math.cos(a); n = Math.sin(a);
        pts = 'x1="' + (100 + 56 * c).toFixed(1) + '" y1="' + (100 + 56 * n).toFixed(1) +
              '" x2="' + (100 + 78 * c).toFixed(1) + '" y2="' + (100 + 78 * n).toFixed(1) + '"';
        s += '<line ' + pts + ' stroke="' + (pass === 0 ? INK : '#FF9F1C') + '" stroke-width="' + (pass === 0 ? 17 : 10) + '" stroke-linecap="round"/>';
      }
    }
    return s;
  }

  var ART = {
    sunny: function () {
      return '<g class="rays">' + rays() + '</g>' +
        '<g class="sunbody"><circle cx="100" cy="100" r="42" fill="#FFC93C" stroke="' + INK + '" stroke-width="5"/>' +
        '<g transform="translate(100 92)">' + FACES.happy + '</g></g>';
    },
    foggy: function () {
      var bands = [[28, 118, 132], [58, 140, 118], [38, 162, 108]], s = cloud(100, 64, 1, '#DCE4EF', 'sleepy'), i;
      for (i = 0; i < 3; i++) {
        s += '<g class="mist" style="--i:' + i + '"><rect x="' + bands[i][0] + '" y="' + bands[i][1] + '" width="' + bands[i][2] +
          '" height="15" rx="7.5" fill="#FFFFFF" stroke="' + INK + '" stroke-width="4"/></g>';
      }
      return s;
    },
    rainy: function () {
      var xs = [52, 76, 100, 124, 148], ys = [128, 146, 130, 148, 132], s = cloud(100, 64, 1, '#B9C9DE', 'happy'), i;
      for (i = 0; i < 5; i++) s += drop(xs[i], ys[i], i);
      return s;
    },
    windy: function () {
      var lines = [
        'M102 84 H148 a12 12 0 1 0 -12 -12',
        'M102 106 H172 a14 14 0 1 1 -14 14',
        'M102 128 H138 a9 9 0 1 1 -9 9'
      ], s = cloud(55, 100, 0.62, '#EAF3FC', 'blow'), i;
      for (i = 0; i < 3; i++) {
        s += '<g class="wl" style="--i:' + i + '"><path d="' + lines[i] + '" fill="none" stroke="' + INK + '" stroke-width="6" stroke-linecap="round"/></g>';
      }
      s += '<g transform="translate(112 160)"><g class="leaf">' +
        '<path d="M0 0 C 10 -14 26 -12 30 -4 C 22 8 8 10 0 0 Z" fill="#3DB97A" stroke="' + INK + '" stroke-width="3" stroke-linejoin="round"/>' +
        '<path d="M3 1 L24 -5" stroke="' + INK + '" stroke-width="2.5" stroke-linecap="round"/></g></g>';
      return s;
    },
    cloudy: function () {
      return '<g class="cl-small">' + cloud(150, 62, 0.55, '#D6E3F2') + '</g>' +
        '<g class="cl-small">' + cloud(46, 58, 0.42, '#D6E3F2') + '</g>' +
        '<g class="cl-big">' + cloud(97, 112, 1.05, '#FFFFFF', 'happy') + '</g>';
    }
  };
  function artSvg(id, decorative) {
    return '<svg class="art" viewBox="0 0 200 200" ' + (decorative ? 'aria-hidden="true"' : 'role="img" aria-label="' + byId[id].label + '"') + ' focusable="false">' + ART[id]() + '</svg>';
  }
  function heroSvg() {
    return '<svg class="art" viewBox="0 0 240 200" aria-hidden="true" focusable="false">' +
      '<g transform="translate(-6 -14) scale(.95)">' + ART.sunny() + '</g>' +
      '<g class="cl-big">' + cloud(150, 140, 0.9, '#FFFFFF', 'happy') + '</g></svg>';
  }

  var ICON = {
    speaker: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 010 6M18.5 6.5a8 8 0 010 11"/></svg>',
    muted:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>'
  };
  var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>';

  /* ---------- Sound (made in the browser, no files) ---------- */
  var ctx = null, master = null, noiseBuf = null, muted = false;

  function ensureAudio() {
    if (muted) return null;
    try {
      if (!ctx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return null;
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.85;
        master.connect(ctx.destination);
        var len = ctx.sampleRate * 2;
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        var d = noiseBuf.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === 'suspended') ctx.resume();
      return ctx;
    } catch (e) { return null; }
  }
  function tone(freq, t0, dur, o) {
    o = o || {};
    var osc = ctx.createOscillator(), g = ctx.createGain(), peak = o.gain || 0.2, att = o.attack || 0.01;
    osc.type = o.type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(o.slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(peak, t0 + att);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g); g.connect(master);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  }
  function noise(t0, dur, o) {
    var src = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = noiseBuf; src.loop = true;
    f.type = o.filter; f.Q.value = o.q || 1;
    f.frequency.setValueAtTime(o.f, t0);
    if (o.f2) f.frequency.exponentialRampToValueAtTime(o.f2, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.linearRampToValueAtTime(o.gain, t0 + (o.attack || 0.05));
    g.gain.linearRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t0); src.stop(t0 + dur + 0.05);
  }
  var SOUNDS = {
    sunny: function (t) {
      [523.25, 659.25, 783.99, 1046.5].forEach(function (f, i) { tone(f, t + i * 0.14, 0.55, { type: 'triangle', gain: 0.22 }); });
      tone(1567.98, t + 0.56, 0.7, { gain: 0.1 });
    },
    foggy: function (t) {
      tone(185, t, 1.3, { gain: 0.22, attack: 0.35 }); tone(370, t, 1.3, { gain: 0.05, attack: 0.35 });
      tone(155.56, t + 1, 1.6, { gain: 0.22, attack: 0.35 }); tone(311.1, t + 1, 1.6, { gain: 0.05, attack: 0.35 });
      noise(t, 2.6, { filter: 'lowpass', f: 500, q: 0.7, gain: 0.05, attack: 0.6 });
    },
    rainy: function (t) {
      noise(t, 2, { filter: 'highpass', f: 2500, q: 0.5, gain: 0.16, attack: 0.2 });
      for (var i = 0; i < 14; i++) tone(900 + Math.random() * 900, t + Math.random() * 1.8, 0.09, { gain: 0.12 });
    },
    windy: function (t) {
      noise(t, 2.2, { filter: 'bandpass', f: 250, f2: 1100, q: 2.5, gain: 0.55, attack: 0.9 });
      noise(t + 0.8, 1.5, { filter: 'bandpass', f: 900, f2: 300, q: 2.5, gain: 0.4, attack: 0.5 });
    },
    cloudy: function (t) {
      [261.63, 329.63, 392].forEach(function (f, i) { tone(f, t + i * 0.12, 1.6, { gain: 0.16, attack: 0.3 }); });
    }
  };
  function ding(t) { tone(880, t, 0.25, { type: 'triangle', gain: 0.22 }); tone(1318.5, t + 0.12, 0.4, { type: 'triangle', gain: 0.22 }); }

  /* ---------- Voice: recorded soft female voice clips ---------- */
  var clips = {}, voiceTimer = null, voiceToken = 0, voiceNow = null, CLIP_KEYS = [];
  WORDS.forEach(function (w) { CLIP_KEYS.push('word-' + w.id, 'line-' + w.id); });
  CLIP_KEYS.push('what-is-this', 'try-again', 'great-job', 'weather-words');

  var voiceSet = 'kid';
  try { var vs = localStorage.getItem('ww-voice'); if (vs === 'kid' || vs === 'teacher') voiceSet = vs; } catch (e) {}

  function clipSrc(key) {
    return (window.VOICE_DATA && window.VOICE_DATA[voiceSet + '/' + key]) || ('audio/' + voiceSet + '-' + key + '.mp3');
  }
  function getClip(key) {
    var ck = voiceSet + '/' + key;
    if (!clips[ck]) {
      try { clips[ck] = new Audio(clipSrc(key)); clips[ck].preload = 'auto'; } catch (e) { return null; }
    }
    return clips[ck];
  }
  function stopSpeech() {
    clearTimeout(voiceTimer);
    voiceToken++;
    if (voiceNow) { try { voiceNow.pause(); voiceNow.currentTime = 0; } catch (e) {} voiceNow = null; }
  }
  function playSeq(keys, token) {
    if (token !== voiceToken || !keys.length) return;
    var a = getClip(keys.shift());
    if (!a) return;
    voiceNow = a;
    a.onended = function () { setTimeout(function () { playSeq(keys, token); }, 180); };
    try { a.currentTime = 0; } catch (e) {}
    var pr = a.play();
    if (pr && pr.catch) pr.catch(function () {});
  }
  function say(keys, delay) {
    if (muted) return;
    stopSpeech();
    var token = voiceToken;
    voiceTimer = setTimeout(function () { playSeq(keys.slice(), token); }, 60 + (delay || 0));
  }
  function playWeather(id) {
    var c = ensureAudio();
    if (c) SOUNDS[id](c.currentTime + 0.05);
    say(['word-' + id]);
  }
  function correctFx(id) {
    var c = ensureAudio();
    if (c) { var t = c.currentTime + 0.05; ding(t); SOUNDS[id](t + 0.35); }
    say(['word-' + id, 'line-' + id], 400);
  }
  function wrongFx() {
    var c = ensureAudio();
    if (c) tone(330, c.currentTime + 0.02, 0.22, { gain: 0.2, slideTo: 230 });
    say(['try-again'], 200);
  }
  function cheerFx() {
    var c = ensureAudio();
    if (c) { var t = c.currentTime + 0.05; [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5].forEach(function (f, i) { tone(f, t + i * 0.13, 0.4, { type: 'triangle', gain: 0.2 }); }); }
    say(['great-job'], 200);
  }

  /* ---------- App ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var state = { order: [], idx: 0, done: 0, locked: false, current: null };
  var learnTimer = null, heroTimer = null;

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function show(name) {
    ['home', 'learn', 'play', 'done'].forEach(function (s) { $(s).hidden = (s !== name); });
    $('backBtn').hidden = (name === 'home');
    window.scrollTo(0, 0);
  }
  function setMuteIcon() {
    $('muteBtn').innerHTML = muted ? ICON.muted : ICON.speaker;
    $('muteBtn').setAttribute('aria-pressed', muted ? 'true' : 'false');
    $('muteBtn').setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
  }

  function setVoiceLabel() {
    var kid = voiceSet === 'kid';
    $('voiceBtn').textContent = kid ? 'Kid voice' : 'Teacher voice';
    $('voiceBtn').setAttribute('aria-label', (kid ? 'Kid voice' : 'Teacher voice') + '. Tap to change the voice.');
  }

  function renderHome() { $('hero').innerHTML = heroSvg(); }

  function renderLearn() {
    $('lgrid').innerHTML = WORDS.map(function (w) {
      return '<button class="lcard" data-action="learncard" data-id="' + w.id + '" aria-label="' + w.label + '">' +
        artSvg(w.id, true) + '<span class="word">' + w.label + '</span></button>';
    }).join('');
  }

  function renderProgress() {
    var h = '';
    for (var i = 0; i < state.order.length; i++) {
      h += '<span class="pstar' + (i < state.done ? ' on' : '') + (i === state.idx ? ' cur' : '') + '">' + STAR + '</span>';
    }
    $('progress').innerHTML = h;
    $('progress').setAttribute('aria-label', 'Question ' + (state.idx + 1) + ' of ' + state.order.length);
  }

  function renderQuestion() {
    var w = state.order[state.idx];
    state.current = w; state.locked = false;
    $('nextBtn').hidden = true;
    var type = state.idx % 2 === 0 ? 'find' : 'name';
    var others = shuffle(WORDS.filter(function (x) { return x.id !== w.id; })).slice(0, 2);
    var opts = shuffle([w].concat(others)), html;
    if (type === 'find') {
      html = '<p class="prompt" role="status">Tap the picture.</p>' +
        '<div class="wordbox"><span class="bigword">' + w.label + '</span>' +
        '<button class="icon-btn" data-action="say" aria-label="Hear the word">' + ICON.speaker + '</button></div>' +
        '<div class="choices pics">' + opts.map(function (o) {
          return '<button class="choice pic" data-action="choice" data-id="' + o.id + '" aria-label="' + o.label + '">' + artSvg(o.id, true) + '</button>';
        }).join('') + '</div>';
      say(['word-' + w.id], 250);
    } else {
      html = '<p class="prompt" role="status">What is this?</p>' +
        '<div class="stage">' + artSvg(w.id, true) + '</div>' +
        '<div class="choices words">' + opts.map(function (o) {
          return '<button class="btn choice" data-action="choice" data-id="' + o.id + '">' + o.label + '</button>';
        }).join('') + '</div>';
      say(['what-is-this'], 250);
    }
    $('qcard').innerHTML = html;
    renderProgress();
  }

  function winHtml(w) {
    var colors = ['#FFC93C', '#3DB97A', '#FF8A5B', '#3E9BFF'], sparks = '', n;
    for (n = 0; n < 12; n++) {
      sparks += '<i class="spark" style="--n:' + n + ';--a:' + (n * 30) + 'deg;--d:' + (110 + (n % 3) * 22) + 'px;--c:' + colors[n % 4] + '"></i>';
    }
    return '<p class="prompt good" role="status">Yes! Great job!</p>' +
      '<div class="win go" style="--tint:' + w.tint + '">' + sparks +
      '<div class="win-art">' + artSvg(w.id, true) + '</div>' +
      '<p class="bigword">' + w.label + '</p><p class="sentence">' + w.line + '</p></div>';
  }

  function answer(id, btn) {
    if (state.locked) return;
    var w = state.current;
    if (id === w.id) {
      state.locked = true; state.done++;
      $('qcard').innerHTML = winHtml(w);
      renderProgress();
      $('nextBtn').textContent = (state.idx === state.order.length - 1) ? 'Finish' : 'Next';
      $('nextBtn').hidden = false;
      correctFx(w.id);
      setTimeout(function () { try { $('nextBtn').focus({ preventScroll: true }); } catch (e) {} }, 400);
    } else {
      btn.classList.add('nope'); btn.disabled = true;
      var p = $('qcard').querySelector('.prompt');
      if (p) { p.textContent = 'Try again!'; p.classList.add('oops'); }
      wrongFx();
    }
  }

  function finish() {
    var s = '', g = '', i;
    for (i = 0; i < WORDS.length; i++) s += '<span style="--i:' + i + '">' + STAR + '</span>';
    $('fstars').innerHTML = s;
    $('doneTag').textContent = 'You know ' + WORDS.length + ' weather words.';
    WORDS.forEach(function (w) { g += '<div class="fcell">' + artSvg(w.id, true) + w.label + '</div>'; });
    $('fgrid').innerHTML = g;
    show('done');
    cheerFx();
  }

  function startPlay() {
    state.order = shuffle(WORDS); state.idx = 0; state.done = 0;
    show('play');
    renderQuestion();
  }

  function goHome() {
    stopSpeech();
    clearTimeout(learnTimer);
    show('home');
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) return;
    var a = el.getAttribute('data-action'), id = el.getAttribute('data-id');
    if (a === 'play') startPlay();
    else if (a === 'learn') { renderLearn(); show('learn'); }
    else if (a === 'home') goHome();
    else if (a === 'next') { state.idx++; if (state.idx >= state.order.length) finish(); else renderQuestion(); }
    else if (a === 'say') say(['word-' + state.current.id]);
    else if (a === 'choice') answer(id, el);
    else if (a === 'mute') { muted = !muted; if (muted) stopSpeech(); setMuteIcon(); }
    else if (a === 'voice') {
      voiceSet = voiceSet === 'kid' ? 'teacher' : 'kid';
      try { localStorage.setItem('ww-voice', voiceSet); } catch (e) {}
      setVoiceLabel();
      CLIP_KEYS.forEach(getClip);
      say(['weather-words']);
    }
    else if (a === 'learncard') {
      var open = document.querySelectorAll('.lcard.go');
      for (var i = 0; i < open.length; i++) open[i].classList.remove('go');
      el.classList.add('go');
      playWeather(id);
      clearTimeout(learnTimer);
      learnTimer = setTimeout(function () { el.classList.remove('go'); }, 3000);
    }
    else if (a === 'hero') {
      el.classList.add('go');
      var c = ensureAudio();
      if (c) SOUNDS.sunny(c.currentTime + 0.05);
      say(['weather-words']);
      clearTimeout(heroTimer);
      heroTimer = setTimeout(function () { el.classList.remove('go'); }, 3000);
    }
  });

  setMuteIcon();
  renderHome();
  setVoiceLabel();
  CLIP_KEYS.forEach(getClip);
})();
