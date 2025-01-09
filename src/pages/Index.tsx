import { useEffect, useRef } from 'react';
import { Game } from 'phaser';
import { gameConfig } from '../game/config';

const Index = () => {
  const gameRef = useRef<Game | null>(null);

  useEffect(() => {
    if (!gameRef.current) {
      gameRef.current = new Game({
        ...gameConfig,
        parent: 'game-container',
      });
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return (
    <div id="game-container" className="w-full h-screen bg-background">
      <div className="absolute top-4 left-4 z-10 text-sm text-muted-foreground">
        Move your cursor over objects to interact
      </div>
    </div>
  );
};

export default Index;