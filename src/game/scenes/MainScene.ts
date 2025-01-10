import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  create() {
    // Add background and scale it to fit the screen
    const bg = this.add.image(0, 0, 'office-bg');
    bg.setOrigin(0, 0);
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Create interactive elements with specific positions
    const elements = [
      { key: 'character', x: 0.5, y: 0.5, tooltip: 'Contact Information', link: '/contact', scale: 0.8 },
      { key: 'shelf', x: 0.4, y: 0.35, tooltip: 'Merchandise', link: '/merchandise', scale: 0.8 },
      { key: 'noticeboard', x: 0.25, y: 0.35, tooltip: 'Press & Media', link: '/press', scale: 0.8 },
      { key: 'radio', x: 0.68, y: 0.5, tooltip: 'Art Portfolio', link: '/art', scale: 0.8 },
      { key: 'brain', x: 0.6, y: 0.5, tooltip: 'Biography', link: '/bio', scale: 0.8 }
    ];

    elements.forEach(({ key, x, y, tooltip, link, scale }) => {
      this.createInteractiveElement(key, x, y, tooltip, () => {
        window.open(link, '_blank');
      }, scale);
    });
  }

  private createInteractiveElement(
    key: string,
    x: number,
    y: number,
    tooltip: string,
    callback: () => void,
    customScale: number
  ) {
    const element = this.add.image(
      this.cameras.main.width * x,
      this.cameras.main.height * y,
      key
    );
    
    // Set interactive properties
    element.setInteractive({ useHandCursor: true });
    
    // Scale the element appropriately
    const baseScale = Math.min(
      this.cameras.main.width / 1920,
      this.cameras.main.height / 1080
    ) * customScale;
    element.setScale(baseScale);
    
    // Add hover effects
    element.on('pointerover', () => {
      this.tweens.add({
        targets: element,
        scaleX: baseScale * 1.1,
        scaleY: baseScale * 1.1,
        duration: 200,
        ease: 'Power2'
      });
      
      const tooltipText = this.add.text(
        element.x,
        element.y - element.displayHeight / 2 - 20,
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
        scaleX: baseScale,
        scaleY: baseScale,
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
}