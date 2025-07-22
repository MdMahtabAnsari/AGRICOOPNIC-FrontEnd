import { Outlet } from 'react-router-dom';
import { Header } from './header';

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Outlet />
    </div>
  );
}
