import React, { useState } from 'react';
import { Plus, Trash2, User, Briefcase, GraduationCap, Code, FolderOpen, Award, Star, Rocket, Mail, Phone, MapPin, Globe, FileText } from 'lucide-react';

const ResumeForm = ({ resumeData, onDataChange }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const updatePersonalInfo = (field, value) => {
    onDataChange({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value
      }
    });
  };

  const addItem = (section) => {
    const newItem = getNewItemTemplate(section);
    onDataChange({
      ...resumeData,
      [section]: [...resumeData[section], newItem]
    });
  };

  const updateItem = (section, index, field, value) => {
    const updatedItems = [...resumeData[section]];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onDataChange({
      ...resumeData,
      [section]: updatedItems
    });
  };

  const removeItem = (section, index) => {
    const updatedItems = resumeData[section].filter((_, i) => i !== index);
    onDataChange({
      ...resumeData,
      [section]: updatedItems
    });
  };

  const getNewItemTemplate = (section) => {
    switch (section) {
      case 'experience':
        return {
          company: '',
          position: '',
          startDate: '',
          endDate: '',
          description: '',
          current: false
        };
      case 'education':
        return {
          institution: '',
          degree: '',
          field: '',
          graduationDate: '',
          gpa: ''
        };
      case 'skills':
        return { name: '', level: 'Intermediate' };
      case 'projects':
        return {
          name: '',
          description: '',
          technologies: '',
          link: ''
        };
      case 'certifications':
        return {
          name: '',
          issuer: '',
          date: '',
          link: ''
        };
      default:
        return {};
    }
  };

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'certifications', label: 'Certifications', icon: Award },
  ];

  return (
    <div className="card p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-2">
          Build Your Resume
        </h2>
        <p className="text-gray-600">Create a professional, ATS-optimized resume</p>
      </div>
      
      {/* Section Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`section-tab ${
                activeSection === section.id
                  ? 'section-tab-active'
                  : 'section-tab-inactive'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Section Content */}
      <div className="space-y-6">
        {activeSection === 'personal' && (
          <PersonalInfoSection 
            data={resumeData.personalInfo} 
            onUpdate={updatePersonalInfo} 
          />
        )}
        
        {activeSection === 'experience' && (
          <ExperienceSection 
            data={resumeData.experience}
            onAdd={() => addItem('experience')}
            onUpdate={(index, field, value) => updateItem('experience', index, field, value)}
            onRemove={(index) => removeItem('experience', index)}
          />
        )}
        
        {activeSection === 'education' && (
          <EducationSection 
            data={resumeData.education}
            onAdd={() => addItem('education')}
            onUpdate={(index, field, value) => updateItem('education', index, field, value)}
            onRemove={(index) => removeItem('education', index)}
          />
        )}
        
        {activeSection === 'skills' && (
          <SkillsSection 
            data={resumeData.skills}
            onAdd={() => addItem('skills')}
            onUpdate={(index, field, value) => updateItem('skills', index, field, value)}
            onRemove={(index) => removeItem('skills', index)}
          />
        )}
        
        {activeSection === 'projects' && (
          <ProjectsSection 
            data={resumeData.projects}
            onAdd={() => addItem('projects')}
            onUpdate={(index, field, value) => updateItem('projects', index, field, value)}
            onRemove={(index) => removeItem('projects', index)}
          />
        )}
        
        {activeSection === 'certifications' && (
          <CertificationsSection 
            data={resumeData.certifications}
            onAdd={() => addItem('certifications')}
            onUpdate={(index, field, value) => updateItem('certifications', index, field, value)}
            onRemove={(index) => removeItem('certifications', index)}
          />
        )}
      </div>
    </div>
  );
};

// Personal Info Section Component
const PersonalInfoSection = ({ data, onUpdate }) => (
  <div className="space-y-6">
    <div className="text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
      <p className="text-sm text-gray-600">Tell us about yourself</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Full Name"
        value={data.fullName}
        onChange={(e) => onUpdate('fullName', e.target.value)}
        className="input-field"
      />
      <input
        type="email"
        placeholder="Email Address"
        value={data.email}
        onChange={(e) => onUpdate('email', e.target.value)}
        className="input-field"
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={data.phone}
        onChange={(e) => onUpdate('phone', e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="Location"
        value={data.location}
        onChange={(e) => onUpdate('location', e.target.value)}
        className="input-field"
      />
      <input
        type="url"
        placeholder="LinkedIn Profile"
        value={data.linkedin}
        onChange={(e) => onUpdate('linkedin', e.target.value)}
        className="input-field"
      />
      <input
        type="url"
        placeholder="Portfolio Website"
        value={data.portfolio}
        onChange={(e) => onUpdate('portfolio', e.target.value)}
        className="input-field"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
      <textarea
        placeholder="Write a compelling summary of your professional background and key achievements..."
        value={data.summary}
        onChange={(e) => onUpdate('summary', e.target.value)}
        rows={4}
        className="textarea-field"
      />
    </div>
  </div>
);

// Experience Section Component
const ExperienceSection = ({ data, onAdd, onUpdate, onRemove }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Work Experience</h3>
        <p className="text-sm text-gray-600">Add your professional experience</p>
      </div>
      <button onClick={onAdd} className="btn-primary flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Add Experience</span>
      </button>
    </div>
    
    {data.map((item, index) => (
      <div key={index} className="card-glass p-6 space-y-4 animate-fade-in">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            <span>Experience {index + 1}</span>
          </h4>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Company Name"
            value={item.company}
            onChange={(e) => onUpdate(index, 'company', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Position"
            value={item.position}
            onChange={(e) => onUpdate(index, 'position', e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            placeholder="Start Date"
            value={item.startDate}
            onChange={(e) => onUpdate(index, 'startDate', e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            placeholder="End Date"
            value={item.endDate}
            onChange={(e) => onUpdate(index, 'endDate', e.target.value)}
            className="input-field"
            disabled={item.current}
          />
        </div>
        
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={item.current}
            onChange={(e) => onUpdate(index, 'current', e.target.checked)}
          />
          <span className="text-sm text-gray-600">Currently working here</span>
        </label>
        
        <textarea
          placeholder="Job Description & Achievements"
          value={item.description}
          onChange={(e) => onUpdate(index, 'description', e.target.value)}
          rows={3}
          className="textarea-field"
        />
      </div>
    ))}
  </div>
);

// Education Section Component
const EducationSection = ({ data, onAdd, onUpdate, onRemove }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">Education</h3>
        <p className="text-sm text-gray-600">Add your educational qualifications</p>
      </div>
      <button onClick={onAdd} className="btn-primary flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Add Education</span>
      </button>
    </div>
    
    {data.map((item, index) => (
      <div key={index} className="card-glass p-6 space-y-4 animate-fade-in">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-purple-600" />
            <span>Education {index + 1}</span>
          </h4>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Institution Name"
            value={item.institution}
            onChange={(e) => onUpdate(index, 'institution', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Degree"
            value={item.degree}
            onChange={(e) => onUpdate(index, 'degree', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Field of Study"
            value={item.field}
            onChange={(e) => onUpdate(index, 'field', e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            placeholder="Graduation Date"
            value={item.graduationDate}
            onChange={(e) => onUpdate(index, 'graduationDate', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="GPA (Optional)"
            value={item.gpa}
            onChange={(e) => onUpdate(index, 'gpa', e.target.value)}
            className="input-field"
          />
        </div>
      </div>
    ))}
  </div>
);

// Skills Section Component
const SkillsSection = ({ data, onAdd, onUpdate, onRemove }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <Code className="w-5 h-5 text-green-600" />
          <span>Skills</span>
        </h3>
        <p className="text-sm text-gray-600">Add your technical and professional skills</p>
      </div>
      <button onClick={onAdd} className="btn-primary flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Add Skill</span>
      </button>
    </div>
    
    {data.map((item, index) => (
      <div key={index} className="card-glass p-6 animate-fade-in">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>Skill {index + 1}</span>
          </h4>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Skill Name"
            value={item.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            className="input-field"
          />
          <select
            value={item.level}
            onChange={(e) => onUpdate(index, 'level', e.target.value)}
            className="input-field"
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
        </div>
      </div>
    ))}
  </div>
);

// Projects Section Component
const ProjectsSection = ({ data, onAdd, onUpdate, onRemove }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 flex items-center space-x-2">
          <FolderOpen className="w-5 h-5 text-orange-600" />
          <span>Projects</span>
        </h3>
        <p className="text-sm text-gray-600">Showcase your notable projects</p>
      </div>
      <button onClick={onAdd} className="btn-primary flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Add Project</span>
      </button>
    </div>
    
    {data.map((item, index) => (
      <div key={index} className="card-glass p-6 space-y-4 animate-fade-in">
        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-gray-800 flex items-center space-x-2">
            <Rocket className="w-4 h-4 text-indigo-600" />
            <span>Project {index + 1}</span>
          </h4>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700 hover:scale-110 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Project Name"
            value={item.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            className="input-field"
          />
          <input
            type="url"
            placeholder="Project Link"
            value={item.link}
            onChange={(e) => onUpdate(index, 'link', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Technologies Used"
            value={item.technologies}
            onChange={(e) => onUpdate(index, 'technologies', e.target.value)}
            className="input-field md:col-span-2"
          />
        </div>
        
        <textarea
          placeholder="Project Description"
          value={item.description}
          onChange={(e) => onUpdate(index, 'description', e.target.value)}
          rows={3}
          className="textarea-field"
        />
      </div>
    ))}
  </div>
);

// Certifications Section Component
const CertificationsSection = ({ data, onAdd, onUpdate, onRemove }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-800">Certifications</h3>
      <button onClick={onAdd} className="btn-primary flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Add Certification</span>
      </button>
    </div>
    
    {data.map((item, index) => (
      <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-gray-800">Certification {index + 1}</h4>
          <button
            onClick={() => onRemove(index)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Certification Name"
            value={item.name}
            onChange={(e) => onUpdate(index, 'name', e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Issuing Organization"
            value={item.issuer}
            onChange={(e) => onUpdate(index, 'issuer', e.target.value)}
            className="input-field"
          />
          <input
            type="date"
            placeholder="Issue Date"
            value={item.date}
            onChange={(e) => onUpdate(index, 'date', e.target.value)}
            className="input-field"
          />
          <input
            type="url"
            placeholder="Verification Link"
            value={item.link}
            onChange={(e) => onUpdate(index, 'link', e.target.value)}
            className="input-field"
          />
        </div>
      </div>
    ))}
  </div>
);

export default ResumeForm;
