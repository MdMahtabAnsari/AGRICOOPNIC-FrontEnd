import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { format } from "date-fns";

import { jobPostObj, categoryObj} from "../pages/basic-information";
import { preferenceObj } from "../pages/document-and-center-form";
import { marksTypeObj } from "../pages/education-detail-form";
import { genderObj } from "../pages/family-address-form";
import type { BasicInformationSchema } from "@/lib/schemas/pages/basicInformation.schema";
import type { FamilyAndAddressSchema } from "@/lib/schemas/pages/familyAndAddress.schema";
import type { EducationDetailsSchema } from "@/lib/schemas/pages/educationDetails.schema";
import type { DocumentAndCenterSchema } from "@/lib/schemas/pages/document-and-prefrence-schema";
import type { JobPostResponseSchema } from "@/lib/schemas/api-response/jobPost.schema";

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
});

export const ReviewPDFDocument = ({
  basicInformation,
  familyAndAddress,
  educationDetails,
  documentAndCenter,
  jobPost,
}: {
    basicInformation: BasicInformationSchema;
    familyAndAddress: FamilyAndAddressSchema;
    educationDetails: EducationDetailsSchema;
    documentAndCenter: DocumentAndCenterSchema;
    jobPost: JobPostResponseSchema;
}) => (
  <Document>
    {/* Single Page with all content */}
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📄 Application Documents</Text>
      </View>

      {/* Basic Info - Compact */}
      <View style={styles.compactSection}>
        <Text style={styles.sectionHeader}>Basic Information</Text>
        <View style={styles.twoColumnRow}>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text style={styles.label}>Name: <Text style={styles.value}>{basicInformation?.user?.name || "N/A"}</Text></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone: <Text style={styles.value}>{basicInformation?.user?.phone || "N/A"}</Text></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Job Post: <Text style={styles.value}>{jobPostObj[basicInformation?.jobPost?.name as keyof typeof jobPostObj] || "N/A"}</Text></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Application No: <Text style={styles.value}>{jobPost?.applicationNo || "N/A"}</Text></Text>
            </View>
          </View>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text style={styles.label}>Email: <Text style={styles.value}>{basicInformation?.user?.email || "N/A"}</Text></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Aadhaar: <Text style={styles.value}>{basicInformation?.user?.aadhaar || "N/A"}</Text></Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Category: <Text style={styles.value}>{categoryObj[basicInformation?.category?.categoryType as keyof typeof categoryObj] || "N/A"}</Text></Text>
            </View>
          </View>
        </View>
      </View>

      {/* Family & Personal - Compact */}
      <View style={styles.compactSection}>
        <Text style={styles.sectionHeader}>Family & Personal Details</Text>
        <View style={styles.twoColumnRow}>
          <View style={styles.column}>
            <Text style={styles.label}>Father: <Text style={styles.value}>{familyAndAddress?.family?.fatherName || "N/A"}</Text></Text>
            <Text style={styles.label}>DOB: <Text style={styles.value}>
              {familyAndAddress?.personalDetails?.dateOfBirth
                ? format(new Date(familyAndAddress.personalDetails.dateOfBirth), "dd/MM/yyyy")
                : "N/A"}
            </Text></Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Mother: <Text style={styles.value}>{familyAndAddress?.family?.motherName || "N/A"}</Text></Text>
            <Text style={styles.label}>Gender: <Text style={styles.value}>{genderObj[familyAndAddress?.personalDetails?.gender as keyof typeof genderObj] || "N/A"}</Text></Text>
          </View>
        </View>
        
        <Text style={styles.subheading}>Addresses</Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Permanent: </Text>
          {familyAndAddress?.permanentAddress?.addressLine || "N/A"}, {familyAndAddress?.permanentAddress?.city || "N/A"}, {familyAndAddress?.permanentAddress?.state || "N/A"} - {familyAndAddress?.permanentAddress?.pinCode || "N/A"}
        </Text>
        <Text style={styles.value}>
          <Text style={styles.label}>Correspondence: </Text>
          {familyAndAddress?.correspondenceAddress?.addressLine || "N/A"}, {familyAndAddress?.correspondenceAddress?.city || "N/A"}, {familyAndAddress?.correspondenceAddress?.state || "N/A"} - {familyAndAddress?.correspondenceAddress?.pinCode || "N/A"}
        </Text>
      </View>

      {/* Exam Center - Compact */}
      <View style={styles.compactSection}>
        <Text style={styles.sectionHeader}>Exam Centers</Text>
        <Text style={styles.label}>1st Choice: <Text style={styles.value}>{preferenceObj[documentAndCenter?.preference1?.examCenterName as keyof typeof preferenceObj] || "N/A"}</Text></Text>
        <Text style={styles.label}>2nd Choice: <Text style={styles.value}>{preferenceObj[documentAndCenter?.preference2?.examCenterName as keyof typeof preferenceObj] || "N/A"}</Text></Text>
      </View>

      {/* Education - Compact */}
      <View style={styles.compactSection}>
        <Text style={styles.sectionHeader}>Educational Qualifications</Text>
        {["10th", "12th", "Graduation"].map((key) => {
          let data;
          if (key === "10th") {
            data = educationDetails?._10th;
          } else if (key === "12th") {
            data = educationDetails?._12th;
          } else if (key === "Graduation") {
            data = educationDetails?.graduation;
          }
          if (!data) return null;

          return (
            <View key={key} style={{ marginBottom: 6 }}>
              <Text style={styles.subheading}>{key}</Text>
              <View style={styles.twoColumnRow}>
                <View style={styles.column}>
                  <Text style={styles.label}>{key === "10th" || key === "12th" ? "School: " : "College: "}<Text style={styles.value}>{data?.institution || "N/A"}</Text></Text>
                  <Text style={styles.label}>{key === "10th" || key === "12th" ? "Board: " : "University: "}<Text style={styles.value}>{data?.boardOrUniversity || "N/A"}</Text></Text>
                  {key === "Graduation" || key === "12th" && (
                    <Text style={styles.label}>{key === "12th" ? "Stream: " : "Specialization: "}<Text style={styles.value}>{data?.subjectOrSpecialization || "N/A"}</Text></Text>
                  )}
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Marks Type: <Text style={styles.value}>{marksTypeObj[data?.marksType as keyof typeof marksTypeObj] || "N/A"}</Text></Text>
                  <Text style={styles.label}>Marks: <Text style={styles.value}>{data?.marks || "N/A"}</Text></Text>
                  <Text style={styles.label}>Year: <Text style={styles.value}>{data?.yearOfPassing || "N/A"}</Text></Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </Page>

    {/* Second Page: Documents (70%) + Footer (20%) */}
    <Page size="A4" style={styles.documentsPage}>
      {/* Documents Container - Exactly 70% of page */}
      <View style={styles.documentsContainer}>
        <Text style={styles.sectionHeader}>📄 Uploaded Documents</Text>
        
        {/* Documents Grid - 2 columns, flex-wrap */}
        <View style={styles.documentsGrid}>
          {(["photo", "signature", "aadhaarFront", "aadhaarBack"] as const).map((key) => {
            const url = documentAndCenter?.[key]?.url;
            const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

            if (!url) {
              // Show placeholder for missing documents
              return (
                <View key={key} style={styles.placeholderItem}>
                  <Text style={styles.documentLabel}>{label}</Text>
                  <View style={styles.placeholderBox}>
                    <Text style={styles.placeholderBoxText}>Not Uploaded</Text>
                  </View>
                </View>
              );
            }

            return (
              <View key={key} style={styles.documentItem}>
                <Text style={styles.documentLabel}>{label}</Text>
                <Image src={url} style={styles.image} />
              </View>
            );
          })}
        </View>

        {/* Show placeholder when no documents at all */}
        {!documentAndCenter || !(["photo", "signature", "aadhaarFront", "aadhaarBack"] as const).some(key => 
          documentAndCenter[key]?.url
        ) ? (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>📁 No Documents Uploaded Yet</Text>
            <Text style={styles.placeholderSubtext}>Please upload the required documents:</Text>
            <Text style={styles.placeholderSubtext}>• Passport Photo • Signature</Text>
            <Text style={styles.placeholderSubtext}>• Aadhaar Front • Aadhaar Back</Text>
          </View>
        ) : null}
      </View>

      {/* Footer - Exactly 20% of page */}
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>📋 Application Summary Complete</Text>
        <Text style={styles.footerText}>
          Generated on {format(new Date(), "dd MMMM yyyy 'at' hh:mm a")}
        </Text>
        <Text style={styles.footerSubtext}>
          This is a system generated document | Please verify all information
        </Text>
      </View>
    </Page>
  </Document>
);