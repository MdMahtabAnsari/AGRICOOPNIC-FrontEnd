
import { Button } from '@/components/ui/button';
import { Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { isUserLoggedIn } from '@/lib/api/auth';
import { Skeleton } from '@/components/ui/skeleton';

export const HomePage = () => {
  const navigate = useNavigate();
  const [userLoggedInStatus, setUserLoggedInStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const checkUserLoggedIn = async () => {
    setLoading(true);
    const response = await isUserLoggedIn();
    if (response.status === "success") {
      setUserLoggedInStatus(true);
    } else {
      setUserLoggedInStatus(false);
    }
    setLoading(false);
  };

  const handleApplyClick = () => {
    if (userLoggedInStatus) {
      navigate('/application');
    } else {
      navigate('/signin');
    }
  };

 if( loading) {
    return <HomePageSkeleton />;
  }
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-8 w-8" />
            <h1 className="text-2xl font-bold">Agora</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-primary/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 text-primary">Agora Job Openings</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover exciting career opportunities at JobAgora. Click below to apply for current job openings and start your journey with us!
          </p>
          <Button 
            className='cursor-pointer'
            onClick={handleApplyClick}
          >
            {userLoggedInStatus ? "Apply Now" : "Sign In to Apply"}
            <Briefcase className="ml-2 h-4 w-4 inline-block" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us build the future of job searching. We're looking for passionate individuals 
            who want to make a real impact on people's careers.
          </p>
        </div>
      </main>
    </div>
  )
}


export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b sticky top-0 z-50 bg-background">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </header>

      <section className="bg-primary/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-64 mb-6" />
          <Skeleton className="h-6 w-full max-w-xl mb-8" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto" />
        </div>
      </main>
    </div>
  );
}