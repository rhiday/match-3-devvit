// Sound effects manager
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private masterVolume: number = 0.7;
  private enabled: boolean = true;

  loadSound(name: string, path: string) {
    const audio = new Audio(path);
    audio.preload = 'auto';
    // Log loading for debugging
    audio.addEventListener('error', () => {
      console.error(`Failed to load sound: ${name} from ${path}`);
    });
    audio.addEventListener('canplaythrough', () => {
      console.log(`Sound loaded: ${name}`);
    });
    this.sounds.set(name, audio);
  }

  play(name: string, volume = 1.0) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(name);
    if (sound) {
      // Clone the audio to allow overlapping plays
      const audioClone = sound.cloneNode() as HTMLAudioElement;
      audioClone.volume = volume * this.masterVolume;
      audioClone.play().catch(err => {
        console.error(`Failed to play sound ${name}:`, err);
        console.log('Note: Browser might be blocking autoplay. User interaction required.');
      });
    } else {
      console.warn(`Sound not found: ${name}`);
    }
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

// Create singleton instance
export const soundManager = new SoundManager();

// Load sounds (they're at root level in dist, not in /assets/)
soundManager.loadSound('pop', '/pop.ogg');
soundManager.loadSound('plop', '/Plop.ogg');
