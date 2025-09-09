import React, { forwardRef } from 'react';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar } from 'lucide-react';

const ResumePreview = forwardRef(({ resumeData }, ref) => {
  const { personalInfo, experience, education, skills, projects, certifications } = resumeData;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  return (
    <div className="card-glass p-8 bg-white/95 backdrop-blur-sm" ref={ref} id="resume-content">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b-2 border-gradient-to-r from-blue-500 to-purple-500">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        {personalInfo.title && (
          <p className="text-xl text-gray-600 font-medium mb-4">{personalInfo.title}</p>
        )}
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <Phone className="w-4 h-4 text-green-600" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center space-x-2 bg-orange-50 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center space-x-2 bg-indigo-50 px-3 py-1 rounded-full">
              <Linkedin className="w-4 h-4 text-indigo-600" />
              <span>LinkedIn</span>
            </div>
          )}
          {personalInfo.portfolio && (
            <div className="flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
              <Globe className="w-4 h-4 text-purple-600" />
              <span>Portfolio</span>
            </div>
          )}
        </div>
        
        {personalInfo.summary && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
            <p className="text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}
      </div>

      {/* Experience Section */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">💼</span>
            </div>
            <span>Professional Experience</span>
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {exp.position}
                    </h3>
                    <p className="text-blue-600 font-semibold">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600 flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow-sm">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 leading-relaxed">
                    {exp.description.split('\n').map((line, i) => (
                      <p key={i} className="mb-1">{line}</p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary-500 pb-2">
            Education
          </h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className="text-primary-600 font-medium">{edu.institution}</p>
                    {edu.gpa && (
                      <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(edu.graduationDate)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary-500 pb-2">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="font-medium text-gray-800">{skill.name}</div>
                <div className="text-sm text-gray-600">{skill.level}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary-500 pb-2">
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {project.name}
                  </h3>
                  {project.link && (
                    <div className="text-sm text-primary-600">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Link
                    </div>
                  )}
                </div>
                {project.technologies && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Technologies:</span> {project.technologies}
                  </p>
                )}
                {project.description && (
                  <p className="text-gray-700 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications Section */}
      {certifications.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-primary-500 pb-2">
            Certifications
          </h2>
          <div className="space-y-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                  <p className="text-primary-600">{cert.issuer}</p>
                </div>
                <div className="text-sm text-gray-500 flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(cert.date)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
