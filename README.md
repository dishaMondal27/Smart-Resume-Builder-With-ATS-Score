# ResumeBuilder Pro

A modern, ATS-optimized resume builder built with React and Tailwind CSS. Create professional resumes with real-time ATS score analysis and instant PDF download.

## ✨ Features

- **Real-time Resume Preview**: See your resume update as you type
- **ATS Score Analysis**: Get instant feedback on your resume's ATS compatibility
- **Professional Templates**: Clean, modern design optimized for readability
- **PDF & Word Export**: Download your resume as high-quality PDF or Word document
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Sections**: Personal info, experience, education, skills, projects, and certifications
- **Smart Recommendations**: Get personalized tips to improve your resume score

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository or download the project files
2. Navigate to the project directory:
   ```bash
   cd resumebuilder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and visit `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **html2canvas** - HTML to canvas conversion for PDF generation
- **jsPDF** - PDF generation library
- **docx** - Word document generation library
- **file-saver** - File download utility
- **React Toastify** - Toast notifications

## 📋 ATS Scoring Algorithm

The application evaluates resumes based on the following criteria:

- **Contact Information (15 points)**: Name, email, phone, location, LinkedIn, portfolio
- **Professional Summary (15 points)**: Quality and length of summary
- **Work Experience (25 points)**: Job details, descriptions, and achievements
- **Education (15 points)**: Educational background and qualifications
- **Skills (20 points)**: Technical and soft skills variety
- **Additional Sections (10 points)**: Projects, certifications, and extras

## 🎨 Features Overview

### Form Sections
- **Personal Information**: Contact details and professional summary
- **Work Experience**: Job history with detailed descriptions
- **Education**: Academic background and qualifications
- **Skills**: Technical and soft skills with proficiency levels
- **Projects**: Personal or professional projects
- **Certifications**: Professional certifications and training

### ATS Optimization
- Real-time score calculation
- Detailed breakdown by section
- Actionable recommendations
- Industry best practices integration

### Export & Download
- High-quality PDF generation
- Professional Word document export
- Optimized for ATS systems
- Print-ready formatting
- Professional layout

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile devices (320px - 767px)

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Future Enhancements

- Multiple resume templates
- Resume import from LinkedIn
- Advanced ATS keyword analysis
- Resume sharing and collaboration
- Job matching based on resume content
- Integration with job boards

## 📞 Support

If you have any questions or need help with the application, please feel free to open an issue or contact the development team.

---

**Happy Resume Building! 🎉**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
