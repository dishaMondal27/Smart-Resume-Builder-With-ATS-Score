import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import ATSScorePanel from './components/ATSScorePanel';
import { generatePDF } from './utils/pdfGenerator';
import { generateWordDocument } from './utils/wordGenerator';
import { calculateATSScore } from './utils/atsScoring';

function App() {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const [atsScore, setAtsScore] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingWord, setIsGeneratingWord] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const resumeRef = useRef();

  const handleResumeDataChange = (newData) => {
    setResumeData(newData);
    // Calculate ATS score whenever resume data changes
    const score = calculateATSScore(newData);
    setAtsScore(score);
  };

  const handleDownloadPDF = async () => {
    if (!resumeRef.current) {
      toast.error('Resume preview not available');
      return;
    }

    setIsGeneratingPDF(true);
    try {
      await generatePDF(resumeRef.current, resumeData.personalInfo.fullName || 'Resume');
      toast.success('Resume downloaded successfully!');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handleDownloadWord = async () => {
    setIsGeneratingWord(true);
    try {
      await generateWordDocument(resumeData, resumeData.personalInfo.fullName || 'Resume');
      toast.success('Word document downloaded successfully!');
    } catch (error) {
      console.error('Error generating Word document:', error);
      toast.error('Failed to generate Word document. Please try again.');
    } finally {
      setIsGeneratingWord(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-indigo-50 via-white to-cyan-50'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl animate-pulse-slow ${
          isDarkMode 
            ? 'bg-gradient-to-br from-blue-600/30 to-indigo-700/30' 
            : 'bg-gradient-to-br from-blue-400/20 to-indigo-500/20'
        }`}></div>
        <div className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl animate-pulse-slow delay-1000 ${
          isDarkMode 
            ? 'bg-gradient-to-tr from-cyan-600/30 to-blue-700/30' 
            : 'bg-gradient-to-tr from-cyan-400/20 to-blue-500/20'
        }`}></div>
        <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl animate-float ${
          isDarkMode 
            ? 'bg-gradient-to-br from-purple-600/20 to-pink-700/20' 
            : 'bg-gradient-to-br from-purple-400/10 to-pink-500/10'
        }`}></div>
        <div className={`absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full blur-2xl animate-float delay-2000 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-green-600/20 to-emerald-700/20' 
            : 'bg-gradient-to-br from-green-400/10 to-emerald-500/10'
        }`}></div>
      </div>
      
      {/* Glassmorphism overlay */}
      <div className={`absolute inset-0 backdrop-blur-sm ${
        isDarkMode ? 'bg-black/20' : 'bg-white/30'
      }`}></div>
      
      <div className="relative z-10">
        <Header 
          onDownloadPDF={handleDownloadPDF} 
          onDownloadWord={handleDownloadWord}
          onToggleDarkMode={toggleDarkMode}
          isGeneratingPDF={isGeneratingPDF}
          isGeneratingWord={isGeneratingWord}
          isDarkMode={isDarkMode}
        />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                <ResumeForm 
                  resumeData={resumeData} 
                  onDataChange={handleResumeDataChange} 
                />
                <ATSScorePanel score={atsScore} />
              </div>
            </div>
            
            {/* Preview Section */}
            <div className="lg:col-span-8">
              <div className="sticky top-8">
                <ResumePreview 
                  ref={resumeRef}
                  resumeData={resumeData} 
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
