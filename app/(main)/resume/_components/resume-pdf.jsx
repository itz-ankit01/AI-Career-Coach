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

// Optional: define custom styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  contact: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  contactItem: {
    marginHorizontal: 5,
  },
  text: {
    marginBottom: 4,
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
      <View key={idx} style={styles.section}>
        <Text style={styles.text}>{entry.title || entry.name}</Text>
        {entry.organization && (
          <Text style={styles.text}>{entry.organization}</Text>
        )}
        {entry.description && (
          <Text style={styles.text}>{entry.description}</Text>
        )}
      </View>
    ));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
            marginBottom: 10,
          }}
        >
          {user?.fullName}
        </Text>

        {contactParts.length > 0 && (
          <View style={styles.contact}>
            {contactParts.map((part, i) => (
              <Text key={i} style={styles.contactItem}>
                {part}
              </Text>
            ))}
          </View>
        )}

        {summary && (
          <View style={styles.section}>
            <Text style={styles.heading}>Professional Summary</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        {skills && (
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            <Text style={styles.text}>{skills}</Text>
          </View>
        )}

        {experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Work Experience</Text>
            {renderEntries(experience)}
          </View>
        )}

        {education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {renderEntries(education)}
          </View>
        )}

        {projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Projects</Text>
            {renderEntries(projects)}
          </View>
        )}
      </Page>
    </Document>
  );
}
