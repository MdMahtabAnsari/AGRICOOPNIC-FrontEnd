import { Briefcase } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { logout, isUserLoggedIn } from '@/lib/api/auth';
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkUserLoggedIn = useCallback(async () => {
    const result = await isUserLoggedIn();
    if (result.status === "success") {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn, location]);

  const handleLogout = useCallback(async () => {
    const result = await logout();
    if (result.status === "success") {
      setIsLoggedIn(false);
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <header className="border-b sticky top-0 z-50 bg-background">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8" />
          <NavLink to="/" className="text-xl font-bold text-primary hover:text-primary/80">
            AGRICOOPNIC
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              variant="ghost"
              className='cursor-pointer'
            >
              <LogOut className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
