
export const changelog = [
  {
    version: "1.4.0",
    date: "Sept. 1, 2026",
    type: "feature" as const,
    title: "Enhanced the Prompt Library Footer and Home Page",
    description: [
      "Added links to the footer for the Prompt Library GitHub repository and email contact. Users can now easily access the source code and reach out for support or inquiries.",
      "Category Sections with Headers and Icons: Each category section in the prompt library now features a header with an icon, providing a more visually appealing and organized layout. This enhancement improves navigation and helps users quickly identify different categories of prompts.",
      "Scroll Category Indicator: Implemented a scroll category indicator that highlights the current category as users scroll through the prompt library. This feature enhances user experience by providing visual feedback on their location within the library, making it easier to navigate between categories.",
      "Smart Display Logic for Scroll Category Indicator: The scroll category indicator now intelligently hides when the user is at the top of the page or when the 'All' category is selected. This ensures that the indicator only appears when relevant, reducing visual clutter and improving overall usability.",
      "Responsive Design Enhancements: The prompt library has undergone further responsive design improvements, ensuring that the layout and functionality adapt seamlessly across various devices and screen sizes. This includes better handling of mobile views, touch interactions, and overall accessibility.",
      "Updated Prompt Card Design: The design of individual prompt cards has been refined to provide a cleaner and more modern look. This includes adjustments to spacing, typography, and interactive elements, enhancing the overall aesthetic and usability of the prompt cards.",
      "Enhanced the security vulnerabilities and improved the overall security posture of the application. This includes implementing best practices for data handling, authentication, and authorization, ensuring that user data is protected and the application remains secure against potential threats.",
    ],
  },
  {
    version: "1.3.0",
    date: "May 31, 2026",
    type: "feature" as const,
    title: "IDE Integration",
    description: [
      "Share prompts directly to v0, Claude, GitHub Copilot, and Perplexity",
      "Copy prompts as formatted markdown",
    ],
  },
  {
    version: "1.2.0",
    date: "May 28, 2026",
    type: "feature" as const,
    title: "Admin Dashboard",
    description: [
      "Full CRUD management for prompts",
      "Create, edit, and delete prompts in real-time from the admin panel",
    ],
  },
  {
    version: "1.1.0",
    date: "May 25, 2026",
    type: "improvement" as const,
    title: "Enhanced Security",
    description: [
      "Added rate limiting",
      "Input sanitization",
      "XSS protection",
      "Security headers for all API endpoints",
    ],
  },
  {
    version: "1.0.0",
    date: "May 20, 2026",
    type: "release" as const,
    title: "Initial Launch",
x    description: [
      "Launch of Prompt Library with 20+ UI prompts across 12 categories",
      "Includes search and filtering",
      "Responsive design",
    ],
  },
];