import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
    Font,
    Link
} from "@react-pdf/renderer";

import { jobPostObj, categoryObj, genderObj, preferenceObj, marksTypeObj, preferenceRankObj, paymentStatusObj } from "@/lib/helpers/type-object";
import type { ApplicationSchema } from "@/lib/schemas/application.schema";

// Register emoji fallback
Font.registerEmojiSource({
    format: "png",
    url: "https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/",
});

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 10,
        fontFamily: "Helvetica",
        backgroundColor: "#ffffff",
        lineHeight: 1.4,
        display: "flex",
        flexDirection: "column",
        height: "100%", // Full page height
    },
    header: {
        backgroundColor: "#1e40af",
        color: "white",
        padding: 15,
        textAlign: "center",
        borderRadius: 6,
        marginBottom: 15,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 3,
    },
    headerSubtitle: {
        fontSize: 10,
    },
    section: {
        backgroundColor: "#f9fafb",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: 12,
        marginBottom: 12,
    },
    sectionHeader: {
        backgroundColor: "#374151",
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        padding: 8,
        marginBottom: 8,
        borderRadius: 4,
        textAlign: "center",
    },
    row: {
        marginBottom: 4,
    },
    label: {
        fontWeight: "bold",
        color: "#1f2937",
        fontSize: 9,
    },
    value: {
        fontSize: 10,
        color: "#374151",
    },
    subheading: {
        marginTop: 8,
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 4,
        paddingBottom: 3,
        borderBottom: "1px solid #d1d5db",
        color: "#111827",
    },
    twoColumnRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 10,
        marginBottom: 4,
    },
    column: {
        width: "48%",
    },
    addressBlock: {
        backgroundColor: "#ffffff",
        padding: 8,
        border: "1px solid #d1d5db",
        borderRadius: 4,
        marginBottom: 4,
    },
    educationCard: {
        backgroundColor: "#ffffff",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: 8,
        marginBottom: 8,
    },
    // Documents page specific styles
    documentsPage: {
        padding: 20,
        fontSize: 10,
        fontFamily: "Helvetica",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
        height: "100%",
    },
    documentsContainer: {
        backgroundColor: "#f9fafb",
        border: "2px solid #d1d5db",
        borderRadius: 8,
        padding: 20,
        height: "70%", // 70% of page height
        display: "flex",
        flexDirection: "column",
    },
    documentsHeader: {
        backgroundColor: "#374151",
        color: "white",
        fontSize: 14,
        fontWeight: "bold",
        padding: 12,
        marginBottom: 15,
        borderRadius: 6,
        textAlign: "center",
    },
    documentsGrid: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "flex-start",
        gap: 15,
        flex: 1, // Take remaining space in container
    },
    documentItem: {
        width: "48%", // Exactly 48% to fit 2 per row with gap
        alignItems: "center",
        border: "2px solid #d1d5db",
        borderRadius: 8,
        padding: 15,
        backgroundColor: "#ffffff",
        marginBottom: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 200, // Consistent minimum height for all items
    },
    documentLabel: {
        fontSize: 11,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 10,
        textAlign: "center",
        height: 20, // Fixed height for consistent label spacing
    },
    image: {
        width: "100%", // Full width of container
        height: 140, // Fixed height for consistency
        objectFit: "contain", // Changed from "cover" to "contain" to prevent cropping
        borderRadius: 6,
        border: "2px solid #d1d5db",
        maxWidth: 180, // Max width constraint
        backgroundColor: "#f9fafb", // Background color for letterboxing effect
    },
    footer: {
        height: "20%", // 20% of page height
        backgroundColor: "#f9fafb",
        border: "2px solid #d1d5db",
        borderRadius: 8,
        padding: 15,
        marginTop: "10%", // 10% gap between documents and footer
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    footerTitle: {
        fontSize: 12,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 8,
    },
    footerText: {
        fontSize: 10,
        color: "#6b7280",
        marginBottom: 4,
    },
    footerSubtext: {
        fontSize: 9,
        color: "#9ca3af",
    },
    compactSection: {
        backgroundColor: "#f9fafb",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
    },
    placeholderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
    },
    placeholderText: {
        fontSize: 14,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 15,
        fontWeight: "bold",
    },
    placeholderSubtext: {
        fontSize: 11,
        color: "#9ca3af",
        textAlign: "center",
        marginBottom: 6,
    },
    placeholderItem: {
        width: "48%",
        alignItems: "center",
        border: "2px dashed #d1d5db",
        borderRadius: 8,
        padding: 15,
        backgroundColor: "#f8fafc",
        marginBottom: 15,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: 200, // Same height as documentItem for consistency
    },
    placeholderBox: {
        width: "100%",
        height: 140,
        backgroundColor: "#e5e7eb",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        border: "2px dashed #9ca3af",
        maxWidth: 180,
        display: "flex", // Ensure flex display for centering
    },
    placeholderBoxText: {
        fontSize: 10,
        color: "#9ca3af",
        fontWeight: "bold",
        textAlign: "center",
    },
    paymentContainer: {
        backgroundColor: "#f9fafb",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
    },
    submissionContainer: {
        backgroundColor: "#f9fafb",
        border: "1px solid #d1d5db",
        borderRadius: 6,
        padding: 10,
        marginBottom: 10,
    },
});

export const ApplicationPDF = ({
    data
}: {
    data: ApplicationSchema;
}) => (
    <Document>
        {/* First Page: Basic Info, Family, Exam Centers, Education */}
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>AGRICOOPNIC</Text>
            </View>

            {/* Basic Info - Compact */}
            <View style={styles.compactSection}>
                <Text style={styles.sectionHeader}>Basic Information</Text>
                <View style={styles.twoColumnRow}>
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Name: <Text style={styles.value}>{data.name}</Text></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Phone: <Text style={styles.value}>{data.phone}</Text></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Job Post: <Text style={styles.value}>{jobPostObj[data.jobPost.name]}</Text></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Application No: <Text style={styles.value}>{data.jobPost.applicationNo}</Text></Text>
                        </View>
                    </View>
                    <View style={styles.column}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Email: <Text style={styles.value}>{data.email}</Text></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Aadhaar: <Text style={styles.value}>{data.aadhaar}</Text></Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Category: <Text style={styles.value}>{categoryObj[data.category.categoryType]}</Text></Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Family & Personal - Compact */}
            <View style={styles.compactSection}>
                <Text style={styles.sectionHeader}>Family & Personal Details</Text>
                <View style={styles.twoColumnRow}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Father: <Text style={styles.value}>{data.family.fatherName}</Text></Text>
                        <Text style={styles.label}>DOB: <Text style={styles.value}>
                            {new Date(data.personalDetail.dateOfBirth).toLocaleDateString(
                                "en-IN",
                                {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    formatMatcher: 'best fit'
                                }
                            )}
                        </Text></Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Mother: <Text style={styles.value}>{data.family.motherName}</Text></Text>
                        <Text style={styles.label}>Gender: <Text style={styles.value}>{genderObj[data.personalDetail.gender]}</Text></Text>
                    </View>
                </View>

                <Text style={styles.subheading}>Addresses</Text>
                <Text style={styles.value}>
                    <Text style={styles.label}>Permanent: </Text>
                    {data.address.find((address => address.addressType === 'PERMANENT'))?.addressLine || "N/A"}, {data.address.find((address => address.addressType === 'PERMANENT'))?.city || "N/A"}, {data.address.find((address => address.addressType === 'PERMANENT'))?.state || "N/A"} - {data.address.find((address => address.addressType === 'PERMANENT'))?.pinCode || "N/A"}
                </Text>
                <Text style={styles.value}>
                    <Text style={styles.label}>Correspondence: </Text>
                    {data.address.find((address => address.addressType === 'CORRESPONDENCE'))?.addressLine || "N/A"}, {data.address.find((address => address.addressType === 'CORRESPONDENCE'))?.city || "N/A"}, {data.address.find((address => address.addressType === 'CORRESPONDENCE'))?.state || "N/A"} - {data.address.find((address => address.addressType === 'CORRESPONDENCE'))?.pinCode || "N/A"}
                </Text>
            </View>

            {/* Exam Center - Compact */}
            <View style={styles.compactSection}>
                <Text style={styles.sectionHeader}>Exam Centers</Text>
                {data.examinationPreferences
                    .sort((a, b) => a.preferenceType.localeCompare(b.preferenceType))
                    .map(pref => (
                        <View key={pref.id}>
                            <Text style={styles.label}>{preferenceRankObj[pref.preferenceType]}: <Text style={styles.value}>{preferenceObj[pref.examCenterName]}</Text></Text>
                        </View>
                    ))}
            </View>

            {/* Education - Compact */}
            <View style={styles.compactSection}>
                <Text style={styles.sectionHeader}>Educational Qualifications</Text>
                {data.education.map((educationDetails) => {
                    if (educationDetails.qualification === "MATRICULATION") {
                        return (
                            <View key={educationDetails.id} style={{ marginBottom: 6 }}>
                                <Text style={styles.subheading}>10th</Text>
                                <View style={styles.twoColumnRow}>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>School: <Text style={styles.value}>{educationDetails.institution}</Text></Text>
                                        <Text style={styles.label}>Board: <Text style={styles.value}>{educationDetails.boardOrUniversity}</Text></Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>Marks Type: <Text style={styles.value}>{marksTypeObj[educationDetails.marksType]}</Text></Text>
                                        <Text style={styles.label}>Marks: <Text style={styles.value}>{educationDetails.marks}</Text></Text>
                                        <Text style={styles.label}>Year: <Text style={styles.value}>{educationDetails.yearOfPassing}</Text></Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }
                    if (educationDetails.qualification === "INTERMEDIATE_OR_DIPLOMA") {
                        return (
                            <View key={educationDetails.id} style={{ marginBottom: 6 }}>
                                <Text style={styles.subheading}>12th/Diploma</Text>
                                <View style={styles.twoColumnRow}>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>School/College: <Text style={styles.value}>{educationDetails.institution}</Text></Text>
                                        <Text style={styles.label}>Board/University: <Text style={styles.value}>{educationDetails.boardOrUniversity}</Text></Text>
                                        <Text style={styles.label}>Stream: <Text style={styles.value}>{educationDetails.subjectOrSpecialization}</Text></Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>Marks Type: <Text style={styles.value}>{marksTypeObj[educationDetails.marksType]}</Text></Text>
                                        <Text style={styles.label}>Marks: <Text style={styles.value}>{educationDetails.marks}</Text></Text>
                                        <Text style={styles.label}>Year: <Text style={styles.value}>{educationDetails.yearOfPassing}</Text></Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }
                    if (educationDetails.qualification === "GRADUATION") {
                        return (
                            <View key={educationDetails.id} style={{ marginBottom: 6 }}>
                                <Text style={styles.subheading}>Graduation</Text>
                                <View style={styles.twoColumnRow}>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>College: <Text style={styles.value}>{educationDetails.institution}</Text></Text>
                                        <Text style={styles.label}>University: <Text style={styles.value}>{educationDetails.boardOrUniversity}</Text></Text>
                                        <Text style={styles.label}>Specialization: <Text style={styles.value}>{educationDetails.subjectOrSpecialization}</Text></Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>Marks Type: <Text style={styles.value}>{marksTypeObj[educationDetails.marksType]}</Text></Text>
                                        <Text style={styles.label}>Marks: <Text style={styles.value}>{educationDetails.marks}</Text></Text>
                                        <Text style={styles.label}>Year: <Text style={styles.value}>{educationDetails.yearOfPassing}</Text></Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }
                    return null;
                })}
            </View>
        </Page>

        {/* Second Page: Documents (70%) + Footer (20%) */}
        <Page size="A4" style={styles.documentsPage}>
            {/* payment Container */}
            <View key={data.payment.id} style={styles.paymentContainer}>
                <Text style={styles.sectionHeader}>Payment Details</Text>
                <View style={styles.twoColumnRow}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Order ID: <Text style={styles.value}>{data.payment.orderId}</Text></Text>
                        <Text style={styles.label}>Payment ID: <Text style={styles.value}>{data.payment.paymentId}</Text></Text>
                        <Text style={styles.label}>Payment Date & Time: <Text style={styles.value}>{new Date(data.payment.createdAt).toLocaleTimeString(
                            "en-IN",
                            {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                formatMatcher: 'best fit'
                            }
                        )}</Text></Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Total Amount (in Rupees): <Text style={styles.value}>{data.payment.amount}</Text></Text>
                        <Text style={styles.label}>Payment Status: <Text style={styles.value}>{paymentStatusObj[data.payment.paymentStatus]}</Text></Text>
                    </View>
                </View>
            </View>
            {/* submission Container */}
            <View style={styles.submissionContainer}>
                <Text style={styles.sectionHeader}>Application Summary</Text>
                <Text style={styles.label}>Submitted on: <Text style={styles.value}>{new Date(data.formSubmitted.submissionDate).toLocaleTimeString("en-IN", {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    formatMatcher: 'best fit'
                })}</Text></Text>
                <Text style={styles.label}>Application Status: <Text style={styles.value}>{data.formSubmitted.status ? "Submitted" : "Not Submitted"}</Text></Text>
            </View>
            {/* Documents Container - Exactly 70% of page */}
            <View style={styles.documentsContainer}>
                <Text style={styles.sectionHeader}>Uploaded Documents</Text>

                {/* Documents Grid - 2 columns, flex-wrap */}
                <View style={styles.documentsGrid}>
                    {data.documents.map((document) => {
                        const url = document.url;
                        const label = document.documentType;

                        if (!url) {
                            // Show placeholder for missing documents
                            return (
                                <View key={document.id} style={styles.placeholderItem}>
                                    <Text style={styles.documentLabel}>{label}</Text>
                                    <View style={styles.placeholderBox}>
                                        <Text style={styles.placeholderBoxText}>Not Uploaded</Text>
                                    </View>
                                </View>
                            );
                        }

                        return (
                            <View key={document.id} style={styles.documentItem}>
                                <Text style={styles.documentLabel}>{label}</Text>
                                <Link src={url} style={{ textDecoration: "none" }}>
                                    <Image src={url} style={styles.image} />
                                </Link>
                            </View>
                        );
                    })}
                </View>
            </View>
        </Page>
    </Document>
);