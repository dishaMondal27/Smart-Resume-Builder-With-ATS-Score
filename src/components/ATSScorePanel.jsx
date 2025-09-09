import React from 'react';
import { TrendingUp, CheckCircle, AlertCircle, XCircle, Target, Users, FileText } from 'lucide-react';

const ATSScorePanel = ({ score }) => {
  if (!score) {
    return (
      <div className="card-glass p-6 animate-fade-in">
        <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
          <span>ATS Score Analysis</span>
        </h3>
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-600 text-lg">Add your resume information to see ATS score</p>
          <p className="text-gray-500 text-sm mt-2">Get instant feedback on your resume's ATS compatibility</p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreIcon = (score) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertCircle;
    return XCircle;
  };

  const ScoreIcon = getScoreIcon(score.overall);

  return (
    <div className="card-glass p-6 animate-fade-in">
      <h3 className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6 flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
          <Target className="w-4 h-4 text-white" />
        </div>
        <span>ATS Score Analysis</span>
      </h3>

      {/* Overall Score */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#scoreGradient)"
              strokeWidth="3"
              strokeDasharray={`${score.overall}, 100`}
              className="transition-all duration-1000 ease-in-out"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor(score.overall)}`}>
              {score.overall}
            </span>
            <span className="text-sm text-gray-500">ATS Score</span>
          </div>
        </div>
        
        <div className="flex items-center justify-center space-x-2">
          <ScoreIcon className={`w-5 h-5 ${getScoreColor(score.overall)}`} />
          <span className="font-medium text-gray-800">
            {score.overall >= 80 ? 'Excellent' : score.overall >= 60 ? 'Good' : 'Needs Improvement'}
          </span>
        </div>
      </div>

      {/* Score Breakdown */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Score Breakdown</span>
        </h4>
        
        <div className="space-y-3">
          <ScoreItem 
            label="Contact Information" 
            score={score.breakdown.contactInfo} 
            maxScore={15}
          />
          <ScoreItem 
            label="Professional Summary" 
            score={score.breakdown.summary} 
            maxScore={15}
          />
          <ScoreItem 
            label="Work Experience" 
            score={score.breakdown.experience} 
            maxScore={25}
          />
          <ScoreItem 
            label="Education" 
            score={score.breakdown.education} 
            maxScore={15}
          />
          <ScoreItem 
            label="Skills" 
            score={score.breakdown.skills} 
            maxScore={20}
          />
          <ScoreItem 
            label="Additional Sections" 
            score={score.breakdown.additional} 
            maxScore={10}
          />
        </div>
      </div>

      {/* Recommendations */}
      {score.recommendations && score.recommendations.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-medium text-gray-800 mb-3 flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Recommendations</span>
          </h4>
          <ul className="space-y-2">
            {score.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2 text-sm">
                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ScoreItem = ({ label, score, maxScore }) => {
  const percentage = (score / maxScore) * 100;
  
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-500">{score}/{maxScore}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ATSScorePanel;
