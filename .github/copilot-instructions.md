# GitHub Copilot Instructions for Resume Builder

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a modern resume builder website built with React and Tailwind CSS that includes ATS (Applicant Tracking System) score analysis functionality.

## Key Technologies
- React 18 with Vite for fast development
- Tailwind CSS for styling
- html2canvas and jsPDF for PDF generation
- Lucide React for icons
- React Toastify for notifications

## Code Style Guidelines
- Use functional components with React hooks
- Follow Tailwind CSS utility-first approach
- Use meaningful component and variable names
- Implement responsive design patterns
- Use proper TypeScript/JSDoc comments where applicable

## Component Structure
- Components are organized in `/src/components/`
- Utilities are in `/src/utils/`
- Each component should be self-contained and reusable
- Use proper prop validation and default values

## ATS Scoring Logic
The ATS scoring algorithm evaluates resumes based on:
- Contact information completeness (15 points)
- Professional summary quality (15 points)
- Work experience details (25 points)
- Education information (15 points)
- Skills variety and relevance (20 points)
- Additional sections like projects and certifications (10 points)

## UI/UX Principles
- Modern, clean design with good contrast
- Intuitive form navigation
- Real-time preview updates
- Responsive layout for all screen sizes
- Accessible design patterns

## When suggesting code improvements:
1. Prioritize user experience and accessibility
2. Ensure mobile responsiveness
3. Maintain consistent styling with Tailwind classes
4. Consider ATS optimization best practices
5. Follow React best practices and performance optimization
