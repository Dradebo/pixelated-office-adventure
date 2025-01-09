import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // Add background with proper scaling
    const bg = this.add.image(0, 0, 'office-bg');
    bg.setOrigin(0, 0);
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Add interactive elements with proper scaling
    const scale = Math.min(this.cameras.main.width / 1920, this.cameras.main.height / 1080);
    
    this.createInteractiveElement('character', 0.5, 0.6, 'Contact Information', this.handleCharacterClick.bind(this), scale);
    this.createInteractiveElement('shelf', 0.8, 0.3, 'Merchandise', this.handleShelfClick.bind(this), scale);
    this.createInteractiveElement('noticeboard', 0.2, 0.3, 'Press & Media', this.handleNoticeboardClick.bind(this), scale);
    this.createInteractiveElement('radio', 0.7, 0.7, 'Art Portfolio', this.handleRadioClick.bind(this), scale);
    this.createInteractiveElement('brain', 0.3, 0.7, 'Biography', this.handleBrainClick.bind(this), scale);

    // Add ambient lighting
    this.createAmbientLighting();
  }

  private createInteractiveElement(
    key: string,
    x: number,
    y: number,
    tooltip: string,
    callback: () => void,
    scale: number
  ) {
    const element = this.add.image(
      this.cameras.main.width * x,
      this.cameras.main.height * y,
      key
    );
    
    element.setScale(scale);
    element.setInteractive({ useHandCursor: true });
    
    // Hover effects
    element.on('pointerover', () => {
      this.tweens.add({
        targets: element,
        scaleX: scale * 1.1,
        scaleY: scale * 1.1,
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
        scaleX: scale,
        scaleY: scale,
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

  private createAmbientLighting() {
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