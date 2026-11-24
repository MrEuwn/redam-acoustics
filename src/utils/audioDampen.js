/**
 * Gesture-gated Web Audio API room-noise dampening simulator.
 * Never auto-plays on load; only boots when explicitly clicked by the user.
 */
class RoomDampenAudio {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.lowpass = null;
    this.midPeak = null;
    this.humGain = null;
    this.nodes = [];
    this.active = false;
  }

  start(dampened = false) {
    if (typeof window === 'undefined') return false;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return false;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stopNodesOnly();

    // Generate soft pink-ish room ambiance buffer (2s seamless loop)
    const sampleRate = this.ctx.sampleRate;
    const bufferLength = sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferLength, sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < bufferLength; i += 1) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.029;
      b1 = 0.985 * b1 + white * 0.032;
      b2 = 0.95 * b2 + white * 0.048;
      data[i] = (b0 + b1 + b2 + white * 0.04) * 0.45;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Gentle low HVAC hum (112 Hz)
    const hum = this.ctx.createOscillator();
    hum.type = 'sine';
    hum.frequency.value = 112;

    this.humGain = this.ctx.createGain();
    this.humGain.gain.value = dampened ? 0.004 : 0.028;

    // Mid-band reflective glass chatter resonance (1150 Hz)
    this.midPeak = this.ctx.createBiquadFilter();
    this.midPeak.type = 'peaking';
    this.midPeak.frequency.value = 1150;
    this.midPeak.Q.value = 1.4;
    this.midPeak.gain.value = dampened ? -10 : 7;

    // Lowpass acoustic baffle sweep
    this.lowpass = this.ctx.createBiquadFilter();
    this.lowpass.type = 'lowpass';
    this.lowpass.frequency.value = dampened ? 360 : 3400;
    this.lowpass.Q.value = 0.7;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(
      dampened ? 0.035 : 0.095,
      this.ctx.currentTime + 0.35
    );

    noise.connect(this.midPeak);
    this.midPeak.connect(this.lowpass);
    this.lowpass.connect(this.masterGain);

    hum.connect(this.humGain);
    this.humGain.connect(this.masterGain);

    this.masterGain.connect(this.ctx.destination);

    noise.start();
    hum.start();

    this.nodes = [noise, hum];
    this.active = true;
    return true;
  }

  setDampened(dampened) {
    if (!this.active || !this.ctx || !this.lowpass || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.lowpass.frequency.cancelScheduledValues(now);
    this.lowpass.frequency.setTargetAtTime(dampened ? 340 : 3400, now, 0.14);

    this.midPeak.gain.cancelScheduledValues(now);
    this.midPeak.gain.setTargetAtTime(dampened ? -10 : 7, now, 0.14);

    this.humGain.gain.cancelScheduledValues(now);
    this.humGain.gain.setTargetAtTime(dampened ? 0.003 : 0.028, now, 0.16);

    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(dampened ? 0.032 : 0.095, now, 0.16);
  }

  stopNodesOnly() {
    this.nodes.forEach((n) => {
      try {
        n.stop();
        n.disconnect();
      } catch {
        // Ignore already stopped source
      }
    });
    this.nodes = [];
  }

  stop() {
    if (!this.active) return;
    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.06);
      setTimeout(() => {
        this.stopNodesOnly();
      }, 180);
    } else {
      this.stopNodesOnly();
    }
    this.active = false;
  }
}

export const roomDampenAudio = new RoomDampenAudio();
