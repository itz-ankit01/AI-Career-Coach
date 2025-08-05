// components/resume/ResumePDF.jsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Link,
} from "@react-pdf/renderer";

// Enhanced styles with better typography and layout
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
    lineHeight: 1.6,
  },
  
  // Header styles
  header: {
    textAlign: "center",
    marginBottom: 25,
    borderBottom: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 15,
  },
  
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#1e293b",
    letterSpacing: 1,
  },
  
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 8,
  },
  
  contactItem: {
    marginHorizontal: 8,
    fontSize: 10,
    color: "#475569",
    marginBottom: 3,
  },
  
  // Section styles
  section: {
    marginBottom: 20,
  },
  
  sectionHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e293b",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottom: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 4,
  },
  
  // Summary and skills styles
  summaryText: {
    marginBottom: 6,
    lineHeight: 1.5,
    color: "#374151",
    textAlign: "justify",
  },
  
  skillsText: {
    marginBottom: 6,
    lineHeight: 1.5,
    color: "#374151",
  },
  
  // Entry styles (experience, education, projects)
  entryContainer: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeft: 2,
    borderLeftColor: "#e2e8f0",
  },
  
  entryTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#1e293b",
  },
  
  entryOrganization: {
    fontSize: 12,
    marginBottom: 3,
    color: "#2563eb",
    fontWeight: "bold",
  },
  
  entryDate: {
    fontSize: 10,
    marginBottom: 6,
    color: "#6b7280",
    fontStyle: "italic",
  },
  
  entryDescription: {
    marginBottom: 4,
    lineHeight: 1.4,
    color: "#374151",
    textAlign: "justify",
  },
  
  // Utility styles
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 8,
  },
  
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 3,
  },
  
  bullet: {
    width: 8,
    fontSize: 12,
    color: "#2563eb",
  },
  
  bulletText: {
    flex: 1,
    fontSize: 11,
    color: "#374151",
    lineHeight: 1.4,
  },
});

export default function ResumePDF({ formValues, user }) {
  const { summary, skills, experience, education, projects, contactInfo } =
    formValues;

  const contactParts = [];
  if (contactInfo?.email) contactParts.push(`📧 ${contactInfo.email}`);
  if (contactInfo?.mobile) contactParts.push(`📱 ${contactInfo.mobile}`);
  if (contactInfo?.linkedin)
    contactParts.push(`💼 ${contactInfo.linkedin}`);
  if (contactInfo?.twitter)
    contactParts.push(`🐦 ${contactInfo.twitter}`);

  const renderEntries = (entries) =>
    entries?.map((entry, idx) => (
      <View key={idx} style={styles.entryContainer}>
        <Text style={styles.entryTitle}>
          {entry.title || entry.name}
        </Text>
        
        {entry.organization && (
          <Text style={styles.entryOrganization}>
            {entry.organization}
          </Text>
        )}
        
        {(entry.startDate || entry.endDate) && (
          <Text style={styles.entryDate}>
            {entry.startDate && entry.endDate
              ? `${entry.startDate} - ${entry.endDate}`
              : entry.startDate
              ? `${entry.startDate} - Present`
              : entry.endDate}
          </Text>
        )}
        
        {entry.description && (
          <View>
            {entry.description.split('\n').map((line, lineIdx) => {
              if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
                return (
                  <View key={lineIdx} style={styles.bulletPoint}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      {line.replace(/^[•\-]\s*/, '').trim()}
                    </Text>
                  </View>
                );
              }
              return (
                <Text key={lineIdx} style={styles.entryDescription}>
                  {line}
                </Text>
              );
            })}
          </View>
        )}
        
        {idx < entries.length - 1 && <View style={styles.divider} />}
      </View>
    ));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.name}>
            {user?.fullName || "Your Name"}
          </Text>

          {contactParts.length > 0 && (
            <View style={styles.contact}>
              {contactParts.map((part, i) => (
                <Text key={i} style={styles.contactItem}>
                  {part}
                  {i < contactParts.length - 1 && " | "}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Professional Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Professional Summary</Text>
            <Text style={styles.summaryText}>{summary}</Text>
          </View>
        )}

        {/* Skills */}
        {skills && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Skills & Technologies</Text>
            <Text style={styles.skillsText}>{skills}</Text>
          </View>
        )}

        {/* Work Experience */}
        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Work Experience</Text>
            {renderEntries(experience)}
          </View>
        )}

        {/* Education */}
        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Education</Text>
            {renderEntries(education)}
          </View>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Projects</Text>
            {renderEntries(projects)}
          </View>
        )}
      </Page>
    </Document>
  );
}