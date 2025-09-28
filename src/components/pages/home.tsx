import { Button } from '@/components/ui/button';
import { Briefcase, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isUserLoggedIn } from '@/lib/api/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { getFormStatus } from '@/lib/api/formSubmit';
import { useCallback } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const HomePage = () => {
  const navigate = useNavigate();
  const [userLoggedInStatus, setUserLoggedInStatus] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);


  const checkUserLoggedIn = useCallback(async () => {
    setLoading(true);
    const response = await isUserLoggedIn();
    if (response.status === "success") {
      setUserLoggedInStatus(true);
    } else {
      setUserLoggedInStatus(false);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkUserLoggedIn();
  }, [checkUserLoggedIn]);


  const handleApplyClick = () => {
    if (userLoggedInStatus && formSubmitted) {
      navigate('/application/details');
    } else if (userLoggedInStatus) {
      navigate('/application');
    } else {
      navigate('/signin');
    }
  };

  const fetchFormStatus = useCallback(async () => {
    const response = await getFormStatus();
    if (response.status === "success") {
      setFormSubmitted(true);
    } else {
      setFormSubmitted(false);
    }
  }, []);

  useEffect(() => {
    fetchFormStatus();
  }, [fetchFormStatus]);

  if (loading) {
    return <HomePageSkeleton />;
  }

  return (
    <>
      {/* Application Extension Notice */}


      {/* Hero Section */}
      <section className="bg-primary/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-extrabold mb-6 text-primary">AGRICOOPNIC</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover exciting career opportunities at AGRICOOPNIC. Click below to apply for current job openings and start your journey with us!
          </p>
          <Button
            className='cursor-pointer'
            onClick={handleApplyClick}
          >
            {userLoggedInStatus && formSubmitted ? "View Application" : userLoggedInStatus ? "Apply Now" : "Sign In to Apply"}
            <Briefcase className="ml-2 h-4 w-4 inline-block" />
          </Button>
        </div>
      </section>
      <Alert>
        <Info />
        <AlertDescription className="text-sm md:text-base">
          <strong>Important Update:</strong> The application closing date has been extended to 8th October. This extension has been provided due to website maintenance issues that prevented some applicants from completing the form. We encourage all applicants to fill and submit their forms at the earliest to avoid last-minute inconvenience.
        </AlertDescription>
      </Alert>
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
    </>
  );
};


export function HomePageSkeleton() {
  return (
    <>
     

      <section className="bg-primary/5 py-16 mb-12">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-10 w-64 mb-6 mx-auto" />
          <Skeleton className="h-6 w-full max-w-xl mb-8 mx-auto" />
          <Skeleton className="h-12 w-48 mx-auto" />
        </div>
      </section>
       {/* Alert Skeleton */}
      <div className="mx-4 mt-4 mb-6 p-4 border rounded-lg">
        <div className="flex items-start space-x-3">
          <Skeleton className="h-4 w-4 mt-0.5" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <Skeleton className="h-8 w-48 mb-4 mx-auto" />
          <Skeleton className="h-6 w-full max-w-xl mx-auto" />
        </div>
      </main>
    </>
  );
}