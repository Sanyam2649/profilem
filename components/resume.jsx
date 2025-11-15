import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

// -----------------------------------------------------
// Utility Formatting
// -----------------------------------------------------
const formatDate = (d) =>
  d ? new Date(d).toLocaleString("default", { month: "short", year: "numeric" }) : "";

const dateRange = (s, e) => {
  if (!s) return "";
  return `${formatDate(s)} – ${e ? formatDate(e) : "Present"}`;
};

// -----------------------------------------------------
// Styles (ModernCV-ish, ATS-friendly, pixel aligned)
// -----------------------------------------------------
const styles = StyleSheet.create({
  page: {
    padding: 16,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#111",
    lineHeight: 1.16,
  },

  name: {
  fontSize: 24,
  fontWeight: 700,
  textAlign: "center",
  marginBottom: 6,    // ⬅ Add spacing here
},
role: {
  fontSize: 11.5,
  textAlign: "center",
  marginTop: 4,       // ⬅ Optional: increase if you want even more gap
  marginBottom: 6,
},

  contactLine: { fontSize: 10, textAlign: "center", marginBottom: 14 },

  // SECTIONS
  section: { marginTop: 14 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  rule: { height: 1, backgroundColor: "#000", marginBottom: 6 },

  // CONTENT BLOCKS
  block: { marginBottom: 10 },
  blockHeader: { flexDirection: "row", justifyContent: "space-between" },
  blockHeaderLeft: { fontSize: 11, fontWeight: 700 },
  blockHeaderRight: { fontSize: 10, color: "#444" },
  blockHeaderRole: {
    fontSize: 10,
    fontStyle: "italic",
    marginTop: 1,
    marginBottom: 2,
  },
  bullet: {
    marginLeft: 10,
    fontSize: 10.5,
    marginBottom: 1.5,
  },
  
  skillRow: {
  flexDirection: "row",
  marginBottom: 2,
  flexWrap: "wrap",
},

skillCategoryInline: {
  fontSize: 10.5,
  fontWeight: 700,
  marginRight: 4,
},

skillListInline: {
  fontSize: 10,
  flexShrink: 1,
},


  // SKILLS
  skillCategory: { fontSize: 11, fontWeight: 700, marginTop: 4 },
  skillList: { fontSize: 10, marginBottom: 2 },

  // SUMMARY
  summaryText: { fontSize: 10.5, marginBottom: 4 },
});


// -----------------------------------------------------
// PDF Component
// -----------------------------------------------------
export default function ResumePDF({ profile }) {
  if (!profile) return null;

  // Latest role
  const lastRole =
    profile?.experience?.length > 0
      ? profile.experience[profile.experience.length - 1].position
      : "Full Stack Developer";

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* ----------------------------------------------------- */}
        {/* HEADER */}
        {/* ----------------------------------------------------- */}
        <Text style={styles.name}>{profile.name}</Text>
  
        <Text style={styles.role}>{lastRole}</Text>

        <Text style={styles.contactLine}>
          {profile.phone ? `${profile.phone} | ` : ""}
          {profile.email ? `${profile.email} | ` : ""}
          {profile.github ? `${profile.github} | ` : ""}
          {profile.linkedin ? `${profile.linkedin}` : ""}
        </Text>


        {/* ----------------------------------------------------- */}
        {/* SUMMARY  (NEW SECTION) */}
        {/* ----------------------------------------------------- */}
        {profile.bio && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <View style={styles.rule} />

            <Text style={styles.summaryText}>{profile.bio}</Text>
          </View>
        )}


        {/* ----------------------------------------------------- */}
        {/* EXPERIENCE */}
        {/* ----------------------------------------------------- */}
        {profile.experience?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            <View style={styles.rule} />

            {profile.experience.map((exp, i) => (
              <View key={i} style={styles.block}>
                <View style={styles.blockHeader}>
                  <Text style={styles.blockHeaderLeft}>{exp.company}</Text>
                  <Text style={styles.blockHeaderRight}>
                    {dateRange(exp.startDate, exp.endDate)}
                  </Text>
                </View>

                <Text style={styles.blockHeaderRole}>
                  {exp.position}
                  {exp.location ? ` — ${exp.location}` : ""}
                </Text>
                
                    {exp.technologies?.length > 0 && (
                  <Text style={styles.skillList}>
                    <Text style={{ fontWeight: 700 }}>Tech: </Text>
                    {exp.technologies.join(", ")}
                  </Text>
                )}

                {(exp.responsibilities || []).map((item, idx) => (
                  <Text key={idx} style={styles.bullet}>• {item}</Text>
                ))}

              </View>
            ))}
          </View>
        )}
        {profile.projects?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Projects</Text>
            <View style={styles.rule} />

           {profile.projects.map((proj, i) => (
  <View key={i} style={styles.block}>
    
    {/* Header */}
    <View style={styles.blockHeader}>
      <Text style={styles.blockHeaderLeft}>{proj.name}</Text>
      <Text style={styles.blockHeaderRight}>
        {dateRange(proj.startDate, proj.endDate)}
      </Text>
    </View>

    {/* Links Row */}
    {(proj.link || proj.github) && (
      <View style={{ flexDirection: "row", marginBottom: 3 }}>
        {proj.link && (
          <Text style={{ fontSize: 9, color: "#2563eb", marginRight: 10 }}>
            <a href={proj.link}>Live</a>
          </Text>
        )}
        {proj.github && (
          <Text style={{ fontSize: 9, color: "#2563eb" }}>
            <a href={proj.github}>Github</a>
          </Text>
        )}
      </View>
    )}

    {/* Tech Stack */}
    {proj.technologies?.length > 0 && (
      <Text style={styles.skillList}>
        <Text style={{ fontWeight: 700 }}>Tech: </Text>
        {proj.technologies.join(", ")}
      </Text>
    )}

    {/* Description */}
    <Text style={{ fontSize: 10, marginBottom: 2 }}>
      {proj.description}
    </Text>
  </View>
))}

          </View>
        )}
        
        {profile.education?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.rule} />

            {profile.education.map((edu, i) => (
              <View key={i} style={styles.block}>
                <View style={styles.blockHeader}>
                  <Text style={styles.blockHeaderLeft}>{edu.institution}</Text>
                  <Text style={styles.blockHeaderRight}>
                    {dateRange(edu.startDate, edu.endDate)}
                  </Text>
                </View>

                <Text style={styles.blockHeaderRole}>
                  {edu.degree} — {edu.fieldOfStudy}
                </Text>

                {edu.grade && (
                  <Text style={{ fontSize: 10 }}>Grade: {edu.grade}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {profile.skills?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.rule} />

            {Object.entries(
              profile.skills.reduce((acc, s) => {
                const cat = s.category || "Other";
                if (!acc[cat]) acc[cat] = [];
                acc[cat].push(s.name);
                return acc;
              }, {})
            ).map(([category, list], i) => (
            <View key={i} style={styles.skillRow}>
  <Text style={styles.skillCategoryInline}>{category}: </Text>
  <Text style={styles.skillListInline}>{list.join(", ")}</Text>
</View>

            ))}
          </View>
        )}

        {profile.certification?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            <View style={styles.rule} />

            {profile.certification.map((c, i) => (
              <Text key={i} style={styles.bullet}>• {c}</Text>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}
