import Phaser from 'phaser';

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // Update image paths to match the correct location
    this.load.setBaseURL(window.location.origin);
    
    // Load assets with explicit paths
    this.load.image('office-bg', '/assets/office-bg.png');
    this.load.image('character', '/assets/character.png');
    this.load.image('shelf', '/assets/shelf.png');
    this.load.image('noticeboard', '/assets/noticeboard.png');
    this.load.image('radio', '/assets/radio.png');
    this.load.image('brain', '/assets/brain.png');
    this.load.image('smoke', '/assets/smoke.png');

    // Loading bar
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 4, height / 2 - 30, width / 2, 50);
    
    const loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
      font: '20px monospace',
      color: '#ffffff'
    });
    loadingText.setOrigin(0.5, 0.5);
    
    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(width / 4 + 10, height / 2 - 20, (width / 2 - 20) * value, 30);
    });
    
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      this.scene.start('MainScene');
    });
  }
}