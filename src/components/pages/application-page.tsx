import { ApplicationDetails, ApplicationDetailsSkeleton } from '@/components/application';
import { getUserApplication } from '@/lib/api/application';
import { useEffect, useState, useCallback } from 'react';
import type { ApplicationSchema } from '@/lib/schemas/application.schema';
import { toast } from 'sonner';
import { ResourceNotFound } from '@/components/resource-not-found';
import { isUserLoggedIn } from "@/lib/api/auth"
import { useNavigate } from "react-router-dom";

export function ApplicationPage() {
    const [applicationData, setApplicationData] = useState<ApplicationSchema | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [notFound, setNotFound] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkUserLoggedIn = useCallback(async () => {
        const response = await isUserLoggedIn();
        if (response.status !== "success") {
            navigate("/");
        }
    }, [navigate]);

    useEffect(() => {
        checkUserLoggedIn();
    }, [checkUserLoggedIn]);

    const fetchApplicationData = useCallback(async () => {
        setLoading(true);
        const response = await getUserApplication();
        if (response.status === "success") {
            setApplicationData(response.data);
        } else {
            if (response.statusCode === 404) {
                setNotFound(true);
            }
            else {
                toast.error(response.message || "Failed to fetch application data");
            }
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchApplicationData();
    }, [fetchApplicationData]);

    

    if (loading) {
        return <ApplicationDetailsSkeleton />;
    }

    if (notFound) {
        return <ResourceNotFound message='Application not found' />;
    }

    return (
        applicationData && <ApplicationDetails data={applicationData} />
    );
}