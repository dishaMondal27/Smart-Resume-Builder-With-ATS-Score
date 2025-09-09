import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

export const generateWordDocument = async (resumeData, filename = 'resume') => {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;

  // Create document sections
  const sections = [];

  // Header with personal information
  if (personalInfo.fullName) {
    sections.push(
      new Paragraph({
        text: personalInfo.fullName,
        heading: HeadingLevel.TITLE,
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      })
    );
  }

  // Contact information
  const contactInfo = [];
  if (personalInfo.email) contactInfo.push(personalInfo.email);
  if (personalInfo.phone) contactInfo.push(personalInfo.phone);
  if (personalInfo.location) contactInfo.push(personalInfo.location);
  if (personalInfo.linkedin) contactInfo.push('LinkedIn Profile');
  if (personalInfo.portfolio) contactInfo.push('Portfolio Website');

  if (contactInfo.length > 0) {
    sections.push(
      new Paragraph({
        children: [
          new TextRun({
            text: contactInfo.join(' | '),
            size: 20,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      })
    );
  }

  // Professional Summary
  if (personalInfo.summary) {
    sections.push(
      new Paragraph({
        text: 'PROFESSIONAL SUMMARY',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );
    sections.push(
      new Paragraph({
        text: personalInfo.summary,
        spacing: { after: 200 },
      })
    );
  }

  // Work Experience
  if (experience && experience.length > 0) {
    sections.push(
      new Paragraph({
        text: 'PROFESSIONAL EXPERIENCE',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );

    experience.forEach((exp) => {
      if (exp.position && exp.company) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.position,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 100 },
          })
        );
        
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: exp.company,
                italics: true,
                size: 22,
              }),
              new TextRun({
                text: ` | ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}`,
                size: 20,
              }),
            ],
          })
        );

        if (exp.description) {
          sections.push(
            new Paragraph({
              text: exp.description,
              spacing: { after: 100 },
            })
          );
        }
      }
    });
  }

  // Education
  if (education && education.length > 0) {
    sections.push(
      new Paragraph({
        text: 'EDUCATION',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );

    education.forEach((edu) => {
      if (edu.degree && edu.institution) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 100 },
          })
        );
        
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: edu.institution,
                italics: true,
                size: 22,
              }),
              new TextRun({
                text: ` | ${formatDate(edu.graduationDate)}`,
                size: 20,
              }),
            ],
          })
        );

        if (edu.gpa) {
          sections.push(
            new Paragraph({
              text: `GPA: ${edu.gpa}`,
              spacing: { after: 100 },
            })
          );
        }
      }
    });
  }

  // Skills
  if (skills && skills.length > 0) {
    sections.push(
      new Paragraph({
        text: 'SKILLS',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );

    const skillsText = skills.map(skill => `${skill.name} (${skill.level})`).join(', ');
    sections.push(
      new Paragraph({
        text: skillsText,
        spacing: { after: 200 },
      })
    );
  }

  // Projects
  if (projects && projects.length > 0) {
    sections.push(
      new Paragraph({
        text: 'PROJECTS',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );

    projects.forEach((project) => {
      if (project.name) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: project.name,
                bold: true,
                size: 24,
              }),
            ],
            spacing: { before: 100 },
          })
        );

        if (project.technologies) {
          sections.push(
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Technologies: ',
                  bold: true,
                }),
                new TextRun({
                  text: project.technologies,
                }),
              ],
            })
          );
        }

        if (project.description) {
          sections.push(
            new Paragraph({
              text: project.description,
              spacing: { after: 100 },
            })
          );
        }
      }
    });
  }

  // Certifications
  if (certifications && certifications.length > 0) {
    sections.push(
      new Paragraph({
        text: 'CERTIFICATIONS',
        heading: HeadingLevel.HEADING_1,
        spacing: { before: 200, after: 100 },
      })
    );

    certifications.forEach((cert) => {
      if (cert.name) {
        sections.push(
          new Paragraph({
            children: [
              new TextRun({
                text: cert.name,
                bold: true,
                size: 24,
              }),
              new TextRun({
                text: ` - ${cert.issuer}`,
                italics: true,
                size: 22,
              }),
              new TextRun({
                text: ` | ${formatDate(cert.date)}`,
                size: 20,
              }),
            ],
            spacing: { before: 50, after: 50 },
          })
        );
      }
    });
  }

  // Create the document
  const doc = new Document({
    sections: [{
      properties: {},
      children: sections,
    }],
  });

  // Generate and download the document
  try {
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${filename}.docx`);
  } catch (error) {
    console.error('Error generating Word document:', error);
    throw error;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};
