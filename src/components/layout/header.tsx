import { Briefcase } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { NavLink } from 'react-router-dom';
export function Header() {
  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8" />
            <NavLink to="/" className="text-xl font-bold text-primary hover:text-primary/80">
                Agora
            </NavLink>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
}
