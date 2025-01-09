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
      { key: 'character', x: 0.5, y: 0.5, tooltip: 'Contact Information', link: '/contact' },
      { key: 'shelf', x: 0.8, y: 0.3, tooltip: 'Merchandise', link: '/merchandise' },
      { key: 'noticeboard', x: 0.2, y: 0.3, tooltip: 'Press & Media', link: '/press' },
      { key: 'radio', x: 0.7, y: 0.7, tooltip: 'Art Portfolio', link: '/art' },
      { key: 'brain', x: 0.3, y: 0.7, tooltip: 'Biography', link: '/bio' }
    ];

    elements.forEach(({ key, x, y, tooltip, link }) => {
      this.createInteractiveElement(key, x, y, tooltip, () => {
        window.open(link, '_blank');
      });
    });
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
    
    // Set interactive properties
    element.setInteractive({ useHandCursor: true });
    
    // Scale the element appropriately
    const scale = Math.min(
      this.cameras.main.width / 1920,
      this.cameras.main.height / 1080
    ) * 0.5; // Adjust this multiplier as needed
    element.setScale(scale);
    
    // Add hover effects
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
}