import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  private smokeParticles?: Phaser.GameObjects.Particles.ParticleEmitterManager;
  
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // Add background
    const bg = this.add.image(0, 0, 'office-bg');
    bg.setOrigin(0, 0);
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Add interactive elements
    this.createInteractiveElement('character', 0.5, 0.6, 'Contact Information', this.handleCharacterClick.bind(this));
    this.createInteractiveElement('shelf', 0.8, 0.3, 'Merchandise', this.handleShelfClick.bind(this));
    this.createInteractiveElement('noticeboard', 0.2, 0.3, 'Press & Media', this.handleNoticeboardClick.bind(this));
    this.createInteractiveElement('radio', 0.7, 0.7, 'Art Portfolio', this.handleRadioClick.bind(this));
    this.createInteractiveElement('brain', 0.3, 0.7, 'Biography', this.handleBrainClick.bind(this));

    // Add smoke effect
    this.createSmokeEffect(0.52, 0.55);

    // Add ambient lighting
    this.createAmbientLighting();
  }

  private createInteractiveElement(
    key: string,
    x: number,
    y: number,
    tooltip: string,
    callback: () => void
  ) {
    const element = this.add.image(
      this.cameras.main.width * x,
      this.cameras.main.height * y,
      key
    );
    
    element.setInteractive({ useHandCursor: true });
    
    // Hover effects
    element.on('pointerover', () => {
      this.tweens.add({
        targets: element,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 200,
        ease: 'Power2'
      });
      
      const tooltipText = this.add.text(
        element.x,
        element.y - 50,
        tooltip,
        {
          fontSize: '24px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 10, y: 5 }
        }
      ).setOrigin(0.5);
      
      element.setData('tooltip', tooltipText);
    });

    element.on('pointerout', () => {
      this.tweens.add({
        targets: element,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Power2'
      });
      
      const tooltipText = element.getData('tooltip');
      if (tooltipText) {
        tooltipText.destroy();
      }
    });

    element.on('pointerdown', callback);
  }

  private createSmokeEffect(x: number, y: number) {
    this.smokeParticles = this.add.particles('smoke');
    
    this.smokeParticles.createEmitter({
      x: this.cameras.main.width * x,
      y: this.cameras.main.height * y,
      speed: { min: 20, max: 50 },
      angle: { min: 230, max: 310 },
      scale: { start: 0.1, end: 0 },
      alpha: { start: 0.5, end: 0 },
      lifespan: 2000,
      frequency: 200
    });
  }

  private createAmbientLighting() {
    // Add subtle pulsing light effect
    const light = this.add.pointlight(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      0xffa500,
      150,
      0.1
    );

    this.tweens.add({
      targets: light,
      intensity: 0.15,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  private handleCharacterClick() {
    window.open('/contact', '_blank');
  }

  private handleShelfClick() {
    window.open('/merchandise', '_blank');
  }

  private handleNoticeboardClick() {
    window.open('/press', '_blank');
  }

  private handleRadioClick() {
    window.open('/art', '_blank');
  }

  private handleBrainClick() {
    window.open('/bio', '_blank');
  }
}