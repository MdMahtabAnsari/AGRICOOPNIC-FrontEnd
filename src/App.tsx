import {ApplicationFormPage} from './components/pages/application-form'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage,HomePageSkeleton } from './components/pages/home';
import { ApplicationFormPageSkeleton } from './components/pages/application-form';
import { Suspense } from 'react';
import { SignupForm } from './components/pages/signup';
import {SignInForm} from './components/pages/signin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Suspense fallback={<HomePageSkeleton />}><HomePage /></Suspense>} />
        <Route path="/application" element={<Suspense fallback={<ApplicationFormPageSkeleton />}><ApplicationFormPage /></Suspense>} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );

}