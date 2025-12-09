import { Cloud, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className=" mx-0 h-16 items-center flex justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Cloud className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-purple-500 bg-clip-text text-transparent">
            ClimateRisk Explorer
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Globe className="h-4 w-4" />
          <span>Powered by Open-Meteo</span>
        </div>
      </div>
    </header>
  );
}