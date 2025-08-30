// components/pdf/DownloadButton.tsx
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReviewPDFDocument } from "@/components/pdf/review-pdf";
import { useBasicInformationStore } from "@/store/basic-information-store";
import { useFamilyAndAddressStore } from "@/store/family-address-store";
import { useEducationDetailsStore10Th, useEducationDetailsStore12Th, useEducationDetailsStoreGraduation } from "@/store/education-details-store";
import { useDocumentAndCenterStore } from "@/store/document-and-center-store";
import { getJobPost } from "@/lib/api/job-post";
import type { JobPostResponseSchema } from "@/lib/schemas/api-response/jobPost.schema";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useCallback } from "react";
import { Loader, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export function DownloadPDFButton() {
  const basic = useBasicInformationStore((s) => s.basicInformation);
  const family = useFamilyAndAddressStore((s) => s.familyAndAddress);
  const education10Th = useEducationDetailsStore10Th((s) => s.educationDetails);
  const education12Th = useEducationDetailsStore12Th((s) => s.educationDetails);
  const educationGraduation = useEducationDetailsStoreGraduation((s) => s.educationDetails);
  const education = basic?.jobPost.name === "MTS" ? education10Th : (basic?.jobPost.name === "SUPERVISOR" || basic?.jobPost.name === "CLERK" || basic?.jobPost.name === "FIELD_OFFICER") ? education12Th : educationGraduation;
  const document = useDocumentAndCenterStore((s) => s.documentAndCenter);
  const [jobPost, setJobPost] = useState<JobPostResponseSchema | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // 1 second

  const fetchJobPost = useCallback(async (attempt = 0) => {
    setLoading(true);
    setError(false);

    try {
      const response = await getJobPost();
      if (response.status === "success") {
        setJobPost(response.data);
        setRetryCount(0);
        setError(false);
      } else {
        throw new Error(response.message || "Failed to fetch job post");
      }
    } catch (err) {
      console.error("Error fetching job post:", err);

      if (attempt < MAX_RETRIES) {
        const nextAttempt = attempt + 1;
        setRetryCount(nextAttempt);
        toast.error(`Failed to fetch job post. Retrying... (${nextAttempt}/${MAX_RETRIES})`);

        setTimeout(() => {
          fetchJobPost(nextAttempt);
        }, RETRY_DELAY * nextAttempt); // Exponential backoff
      } else {
        setError(true);
        toast.error("Failed to fetch job post after multiple attempts. Please try again manually.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = () => {
    setRetryCount(0);
    fetchJobPost(0);
  };

  useEffect(() => {
    fetchJobPost(0);
  }, [fetchJobPost]);

  if (!basic || !family || !education || !document) {
    return <Button disabled>Loading form data...</Button>;
  }

  if (loading) {
    return (
      <Button disabled className="w-full">
        <Loader className="mr-2 h-4 w-4 animate-spin" />
        {retryCount > 0 ? `Retrying... (${retryCount}/${MAX_RETRIES})` : "Loading..."}
      </Button>
    );
  }

  if (error || !jobPost) {
    return (
      <Button onClick={handleRetry} variant="outline" className="w-full">
        <RefreshCw className="mr-2 h-4 w-4" />
        Retry Loading Job Post
      </Button>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <ReviewPDFDocument
          basicInformation={basic}
          familyAndAddress={family}
          educationDetails={education}
          documentAndCenter={document}
          jobPost={jobPost}
        />
      }
      fileName="job-application.pdf"
    >
      {({ loading }) => (
        <Button disabled={loading} className="w-full cursor-pointer">
          {loading ? "Generating PDF..." : "Download PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}

export function DownloadPDFButtonSkeleton() {
  return (
    <div className="flex items-center justify-center">
      <Skeleton className="w-full h-10" />
    </div>
  );
}