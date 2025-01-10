import InteractiveScene from '../components/InteractiveScene';

const Index = () => {
  return (
    <div className="w-full h-screen bg-background">
      <div className="absolute top-4 left-4 z-10 text-sm text-muted-foreground">
        Move your cursor over objects to interact
      </div>
      <InteractiveScene />
    </div>
  );
};

export default Index;