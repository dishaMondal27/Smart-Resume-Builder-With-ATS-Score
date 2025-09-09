import React from 'react';
import { Download, FileText, Zap, FileDown, Sun, Moon } from 'lucide-react';

const Header = ({ onDownloadPDF, onDownloadWord, onToggleDarkMode, isGeneratingPDF, isGeneratingWord, isDarkMode }) => {
  return (
    <header className={`backdrop-blur-md shadow-xl border-b sticky top-0 z-50 transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gray-900/80 border-gray-700/30' 
        : 'bg-white/80 border-white/20'
    }`}>
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg animate-glow">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-3xl font-bold bg-clip-text text-transparent transition-all duration-500 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-white via-blue-200 to-purple-200' 
                  : 'bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800'
              }`}>
                ResumeBuilder Pro
              </h1>
              <p className={`text-sm font-medium transition-colors duration-500 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Build ATS-optimized resumes instantly ✨
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`hidden md:flex items-center space-x-2 border px-4 py-2 rounded-full shadow-sm transition-colors duration-500 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-700' 
                : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'
            }`}>
              <Zap className={`w-4 h-4 ${isDarkMode ? 'text-green-300' : 'text-green-600'}`} />
              <span className={`text-sm font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>ATS Optimized</span>
            </div>
            
            <button
              onClick={onDownloadWord}
              disabled={isGeneratingWord}
              className={`group relative overflow-hidden border-2 font-medium py-2.5 px-5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-600 hover:border-blue-400 text-gray-200 hover:text-blue-300' 
                  : 'bg-white border-gray-200 hover:border-blue-300 text-gray-700 hover:text-blue-700'
              } ${isGeneratingWord ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-blue-900/30 to-indigo-900/30' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50'
              }`}></div>
              <div className="relative flex items-center space-x-2">
                <FileDown className="w-4 h-4" />
                <span>{isGeneratingWord ? 'Generating...' : 'Download Word'}</span>
              </div>
            </button>
            
            <button
              onClick={onDownloadPDF}
              disabled={isGeneratingPDF}
              className={`group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2.5 px-5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                isGeneratingPDF ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>{isGeneratingPDF ? 'Generating...' : 'Download PDF'}</span>
              </div>
            </button>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`group relative overflow-hidden p-3 rounded-xl transition-all duration-500 shadow-lg hover:shadow-xl hover:scale-110 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
              }`}
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-white animate-pulse" />
                ) : (
                  <Moon className="w-5 h-5 text-white animate-pulse" />
                )}
              </div>
              {/* Unique orbital animation */}
              <div className={`absolute inset-0 rounded-xl ${isDarkMode ? 'animate-pulse' : 'animate-glow'}`}>
                <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/60 rounded-full animate-ping delay-1000"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
