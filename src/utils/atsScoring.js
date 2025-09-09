// ATS Scoring Algorithm
export const calculateATSScore = (resumeData) => {
  if (!resumeData) return null;

  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;
  
  let score = {
    overall: 0,
    breakdown: {
      contactInfo: 0,
      summary: 0,
      experience: 0,
      education: 0,
      skills: 0,
      additional: 0
    },
    recommendations: []
  };

  // Contact Information Scoring (15 points max)
  let contactScore = 0;
  if (personalInfo.fullName && personalInfo.fullName.trim()) contactScore += 3;
  if (personalInfo.email && isValidEmail(personalInfo.email)) contactScore += 3;
  if (personalInfo.phone && personalInfo.phone.trim()) contactScore += 3;
  if (personalInfo.location && personalInfo.location.trim()) contactScore += 2;
  if (personalInfo.linkedin && personalInfo.linkedin.trim()) contactScore += 2;
  if (personalInfo.portfolio && personalInfo.portfolio.trim()) contactScore += 2;
  score.breakdown.contactInfo = contactScore;

  // Professional Summary Scoring (15 points max)
  let summaryScore = 0;
  if (personalInfo.summary && personalInfo.summary.trim()) {
    const wordCount = personalInfo.summary.trim().split(/\s+/).length;
    if (wordCount >= 30) summaryScore += 15;
    else if (wordCount >= 20) summaryScore += 12;
    else if (wordCount >= 10) summaryScore += 8;
    else summaryScore += 4;
  }
  score.breakdown.summary = summaryScore;

  // Work Experience Scoring (25 points max)
  let experienceScore = 0;
  if (experience && experience.length > 0) {
    experienceScore += Math.min(experience.length * 5, 15); // Up to 15 points for multiple experiences
    
    experience.forEach(exp => {
      if (exp.company && exp.company.trim()) experienceScore += 1;
      if (exp.position && exp.position.trim()) experienceScore += 1;
      if (exp.startDate) experienceScore += 1;
      if (exp.description && exp.description.trim().split(/\s+/).length >= 20) experienceScore += 2;
    });
    
    experienceScore = Math.min(experienceScore, 25);
  }
  score.breakdown.experience = experienceScore;

  // Education Scoring (15 points max)
  let educationScore = 0;
  if (education && education.length > 0) {
    educationScore += Math.min(education.length * 3, 9); // Up to 9 points for multiple degrees
    
    education.forEach(edu => {
      if (edu.institution && edu.institution.trim()) educationScore += 1;
      if (edu.degree && edu.degree.trim()) educationScore += 2;
      if (edu.field && edu.field.trim()) educationScore += 1;
      if (edu.graduationDate) educationScore += 1;
    });
    
    educationScore = Math.min(educationScore, 15);
  }
  score.breakdown.education = educationScore;

  // Skills Scoring (20 points max)
  let skillsScore = 0;
  if (skills && skills.length > 0) {
    skillsScore += Math.min(skills.length * 2, 16); // Up to 16 points for multiple skills
    
    // Bonus for skill variety and quality
    const skillNames = skills.map(skill => skill.name.toLowerCase());
    const hasHardSkills = skillNames.some(skill => 
      skill.includes('programming') || skill.includes('development') || 
      skill.includes('database') || skill.includes('framework') ||
      skill.includes('javascript') || skill.includes('python') ||
      skill.includes('java') || skill.includes('sql')
    );
    const hasSoftSkills = skillNames.some(skill => 
      skill.includes('communication') || skill.includes('leadership') || 
      skill.includes('teamwork') || skill.includes('management')
    );
    
    if (hasHardSkills) skillsScore += 2;
    if (hasSoftSkills) skillsScore += 2;
    
    skillsScore = Math.min(skillsScore, 20);
  }
  score.breakdown.skills = skillsScore;

  // Additional Sections Scoring (10 points max)
  let additionalScore = 0;
  if (projects && projects.length > 0) {
    additionalScore += Math.min(projects.length * 2, 6);
  }
  if (certifications && certifications.length > 0) {
    additionalScore += Math.min(certifications.length * 2, 4);
  }
  score.breakdown.additional = Math.min(additionalScore, 10);

  // Calculate overall score
  score.overall = Math.round(
    score.breakdown.contactInfo + 
    score.breakdown.summary + 
    score.breakdown.experience + 
    score.breakdown.education + 
    score.breakdown.skills + 
    score.breakdown.additional
  );

  // Generate recommendations
  score.recommendations = generateRecommendations(score, resumeData);

  return score;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const generateRecommendations = (score, resumeData) => {
  const recommendations = [];
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;

  // Contact Information recommendations
  if (score.breakdown.contactInfo < 12) {
    if (!personalInfo.email || !isValidEmail(personalInfo.email)) {
      recommendations.push('Add a professional email address');
    }
    if (!personalInfo.phone) {
      recommendations.push('Include your phone number');
    }
    if (!personalInfo.linkedin) {
      recommendations.push('Add your LinkedIn profile URL');
    }
    if (!personalInfo.location) {
      recommendations.push('Include your location (city, state)');
    }
  }

  // Summary recommendations
  if (score.breakdown.summary < 10) {
    if (!personalInfo.summary) {
      recommendations.push('Add a professional summary to introduce yourself');
    } else {
      const wordCount = personalInfo.summary.trim().split(/\s+/).length;
      if (wordCount < 20) {
        recommendations.push('Expand your professional summary (aim for 30-50 words)');
      }
    }
  }

  // Experience recommendations
  if (score.breakdown.experience < 15) {
    if (!experience || experience.length === 0) {
      recommendations.push('Add your work experience');
    } else {
      recommendations.push('Provide more detailed job descriptions with quantifiable achievements');
    }
  }

  // Education recommendations
  if (score.breakdown.education < 10) {
    if (!education || education.length === 0) {
      recommendations.push('Add your educational background');
    } else {
      recommendations.push('Include more details about your education (field of study, graduation date)');
    }
  }

  // Skills recommendations
  if (score.breakdown.skills < 15) {
    if (!skills || skills.length === 0) {
      recommendations.push('Add relevant skills to your resume');
    } else if (skills.length < 5) {
      recommendations.push('Add more skills to showcase your expertise');
    }
  }

  // Additional sections recommendations
  if (score.breakdown.additional < 5) {
    if (!projects || projects.length === 0) {
      recommendations.push('Consider adding relevant projects to demonstrate your abilities');
    }
    if (!certifications || certifications.length === 0) {
      recommendations.push('Include any relevant certifications or training');
    }
  }

  // General recommendations based on overall score
  if (score.overall < 60) {
    recommendations.push('Focus on adding more detailed content to improve ATS compatibility');
  } else if (score.overall < 80) {
    recommendations.push('Consider adding keywords relevant to your target job position');
  }

  return recommendations.slice(0, 5); // Limit to top 5 recommendations
};
