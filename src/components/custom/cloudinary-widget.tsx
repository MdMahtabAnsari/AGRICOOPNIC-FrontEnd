import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ImageUp, Loader } from 'lucide-react';

declare global {
    interface Window {
        cloudinary?: any;
    }
}

interface CloudinaryUploadWidgetProps {
    onUpload: (info: any) => void;
    buttonText?: string;
    disabled?: boolean;
    className?: string;
    maxFileSize?: number;
    allowedFormats?: string[];
    folder?: string;
    multiple?: boolean;
    showAdvancedOptions?: boolean;
    cropping?: boolean;
    sources?: string[];
    publicId?: string;
}

export const CloudinaryUploadWidget = ({
    onUpload,
    buttonText = "Upload Image",
    disabled = false,
    className = "mt-4",
    maxFileSize = 2000000,
    allowedFormats = ["png", "jpg", "jpeg", "gif", "webp"],
    folder = "uploads",
    multiple = false,
    showAdvancedOptions = false,
    cropping = false,
    sources = ["local"],
    publicId = `photo_${Date.now()}`
}: CloudinaryUploadWidgetProps) => {
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const widgetRef = useRef<any>(null);

    useEffect(() => {
        if (window.cloudinary) {
            setIsScriptLoaded(true);
            return;
        }

        const scriptId = "cloudinary-widget-script";
        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
            script.async = true;
            script.onload = () => setIsScriptLoaded(true);
            document.body.appendChild(script);
        } else {
            // If script exists but not loaded yet, wait for it
            const checkCloudinary = () => {
                if (window.cloudinary) {
                    setIsScriptLoaded(true);
                } else {
                    setTimeout(checkCloudinary, 100);
                }
            };
            checkCloudinary();
        }
    }, []);

    useEffect(() => {
        if (!isScriptLoaded || !window.cloudinary) return;

        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dqdqxg7pf",
                uploadPreset: "profile_pic",
                sources: sources,
                multiple: multiple,
                maxFileSize: maxFileSize,
                resourceType: "image",
                folder: folder,
                clientAllowedFormats: allowedFormats,
                cropping: cropping,
                showAdvancedOptions: showAdvancedOptions,
                showCompletedButton: true,
                showUploadMoreButton: false,
                autoMinimize: false,
                publicId: publicId
            },
            (error: any, result: any) => {
                if (!error && result.event === "success") {
                    onUpload(result.info);
                }
            }
        );

        widgetRef.current = widget;

        return () => {
            if (widgetRef.current) {
                widgetRef.current.destroy();
                widgetRef.current = null;
            }
        };
    }, [
        onUpload,
        isScriptLoaded,
        maxFileSize,
        allowedFormats,
        folder,
        multiple,
        showAdvancedOptions,
        cropping,
        sources,
        publicId
    ]);

    const openWidget = () => {
        if (widgetRef.current) {
            widgetRef.current.open();
        }
    };

    return (
        <Button
            onClick={openWidget}
            className={className}
            disabled={!isScriptLoaded || disabled}
            type="button"
        >
            {isScriptLoaded ? (
                <>
                    <ImageUp className="mr-2" />
                    {buttonText}
                </>
            ) : (
                <>
                    <Loader className="mr-2 animate-spin" />
                    Loading...
                </>
            )}
        </Button>
    );
};