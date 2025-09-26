import { ApplicationFormPage } from '@/components/pages/application-form';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, HomePageSkeleton } from '@/components/pages/home';
import { ApplicationFormPageSkeleton } from '@/components/pages/application-form';
import { Suspense } from 'react';
import { SignupForm } from '@/components/pages/signup';
import { SignInForm } from '@/components/pages/signin';
import { AboutPage } from '@/components/pages/about';
import { ContactPage } from '@/components/pages/contact';
import { PrivacyPolicyPage } from '@/components/pages/privacy-policy';
import { NotFoundPage } from '@/components/pages/not-found';
import { Layout } from '@/components/layout/layout';
import { TermsAndConditionsPage } from '@/components/pages/terms-and-conditions';
import { RefundPolicyPage } from '@/components/pages/refund-policy';
import { ForgotPasswordPage } from '@/components/pages/forgot-password';
import {ApplicationPage} from '@/components/pages/application-page';
import { ApplicationDetailsSkeleton } from '@/components/application';
import { AutoSubmitForm } from '@/components/pages/auto-submit';
import { ShippingAndDeliveryPolicyPage } from '@/components/pages/shippind-and-delivery-policy';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Suspense fallback={<HomePageSkeleton />}><HomePage /></Suspense>} />
          <Route path="application" element={<Suspense fallback={<ApplicationFormPageSkeleton />}><ApplicationFormPage /></Suspense>} />
          <Route path="application/details" element={<Suspense fallback={<ApplicationDetailsSkeleton />}><ApplicationPage /></Suspense>} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="refund-policy" element={<RefundPolicyPage />} />
          <Route path="application/auto-submit" element={<AutoSubmitForm />} />
          <Route path="shipping-and-delivery-policy" element={<ShippingAndDeliveryPolicyPage />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="signin" element={<SignInForm />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}