export type Category =
  | "all"
  | "forms"
  | "auth"
  | "testimonials"
  | "navbars"
  | "stats"
  | "blog"
  | "faq"
  | "hero"
  | "pricing"
  | "footer"
  | "features";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  category: Exclude<Category, "all">;
  prompt: string;
  image: string;
}

export const categories: { id: Category; label: string; icon: string }[] = [
  { id: "all", label: "All Prompts", icon: "grid" },
  { id: "forms", label: "Forms", icon: "form" },
  { id: "auth", label: "Authentication", icon: "lock" },
  { id: "testimonials", label: "Testimonials", icon: "quote" },
  { id: "navbars", label: "Navbars", icon: "menu" },
  { id: "stats", label: "Stats Bars", icon: "chart" },
  { id: "blog", label: "Blog", icon: "file" },
  { id: "faq", label: "FAQ", icon: "help" },
  { id: "hero", label: "Hero Sections", icon: "star" },
  { id: "pricing", label: "Pricing", icon: "dollar" },
  { id: "footer", label: "Footer", icon: "footer" },
  { id: "features", label: "Features", icon: "sparkles" },
];

export const prompts: Prompt[] = [
  {
    id: "1",
    title: "Contact Form",
    description: "A clean contact form with validation and success states",
    category: "forms",
    prompt:
      "Create a modern contact form with name, email, subject, and message fields. Include client-side validation, loading states, and a success message after submission. Use a clean, minimal design with proper spacing.",
    image: "/previews/contact-form.png",
  },
  {
    id: "2",
    title: "Newsletter Signup",
    description: "Simple email capture form with inline validation",
    category: "forms",
    prompt:
      "Build a newsletter signup form with email input and submit button. Add inline validation for email format, a loading spinner during submission, and animated success feedback.",
    image: "/previews/newsletter-signup.png",
  },
  {
    id: "3",
    title: "Login Form",
    description: "Secure login form with remember me and forgot password",
    category: "auth",
    prompt:
      "Create a login form with email and password fields, remember me checkbox, forgot password link, and social login buttons for Google and GitHub. Include proper validation and error handling.",
    image: "/previews/login-form.png",
  },
  {
    id: "4",
    title: "Registration Form",
    description: "Multi-step registration with progress indicator",
    category: "auth",
    prompt:
      "Build a multi-step registration form with account details, profile information, and preferences. Include a progress indicator, back/next buttons, and form validation at each step.",
    image: "/previews/registration-form.png",
  },
  {
    id: "5",
    title: "Testimonial Cards",
    description: "Grid of customer testimonials with ratings",
    category: "testimonials",
    prompt:
      "Create a testimonial section with a grid of cards showing customer quotes, names, titles, company logos, and star ratings. Include hover effects and responsive layout.",
    image: "/previews/testimonial-cards.png",
  },
  {
    id: "6",
    title: "Testimonial Carousel",
    description: "Sliding carousel of testimonials with autoplay",
    category: "testimonials",
    prompt:
      "Build a testimonial carousel that auto-rotates through customer reviews. Include navigation dots, prev/next arrows, and smooth transitions. Show customer photo, quote, and attribution.",
    image: "/previews/testimonial-carousel.png",
  },
  {
    id: "7",
    title: "Sticky Navbar",
    description: "Fixed navigation with scroll effects",
    category: "navbars",
    prompt:
      "Create a sticky navbar that changes background on scroll. Include logo, navigation links, dropdown menus, and a CTA button. Make it fully responsive with a mobile hamburger menu.",
    image: "/previews/sticky-navbar.png",
  },
  {
    id: "8",
    title: "Mega Menu Navbar",
    description: "Navigation with expandable mega menu dropdowns",
    category: "navbars",
    prompt:
      "Build a navbar with mega menu dropdowns that show categorized links, featured content, and images. Include smooth animations and keyboard navigation support.",
    image: "/previews/mega-menu.png",
  },
  {
    id: "9",
    title: "Stats Counter",
    description: "Animated statistics with counting animation",
    category: "stats",
    prompt:
      "Create a stats bar showing key metrics like users, downloads, and revenue. Add counting animation that triggers when the section scrolls into view. Use icons and clean typography.",
    image: "/previews/stats-counter.png",
  },
  {
    id: "10",
    title: "Company Metrics",
    description: "Dashboard-style company statistics display",
    category: "stats",
    prompt:
      "Build a company metrics section showing growth statistics, user counts, and performance indicators. Include mini charts, percentage changes, and comparison to previous periods.",
    image: "/previews/company-metrics.png",
  },
  {
    id: "11",
    title: "Blog Card Grid",
    description: "Responsive grid of blog post cards",
    category: "blog",
    prompt:
      "Create a blog section with cards showing featured image, category tag, title, excerpt, author avatar, and publish date. Include hover effects and responsive grid layout.",
    image: "/previews/blog-cards.png",
  },
  {
    id: "12",
    title: "Featured Article",
    description: "Large featured post with sidebar articles",
    category: "blog",
    prompt:
      "Build a blog layout with one large featured article and a sidebar of smaller recent posts. Include category badges, read time estimates, and author information.",
    image: "/previews/featured-article.png",
  },
  {
    id: "13",
    title: "Accordion FAQ",
    description: "Expandable FAQ with smooth animations",
    category: "faq",
    prompt:
      "Create an FAQ section with accordion-style questions that expand to show answers. Include smooth height animations, plus/minus icons, and keyboard accessibility.",
    image: "/previews/accordion-faq.png",
  },
  {
    id: "14",
    title: "Two-Column FAQ",
    description: "FAQ layout with categories in two columns",
    category: "faq",
    prompt:
      "Build a two-column FAQ layout with questions grouped by category. Include search functionality, category filtering, and expandable answers.",
    image: "/previews/two-column-faq.png",
  },
  {
    id: "15",
    title: "Hero with Video",
    description: "Hero section with background video",
    category: "hero",
    prompt:
      "Create a hero section with a looping background video, overlay gradient, headline, subtext, and dual CTA buttons. Ensure the video is optimized and has a fallback image.",
    image: "/previews/hero-video.png",
  },
  {
    id: "16",
    title: "Split Hero",
    description: "Hero with image on one side, content on other",
    category: "hero",
    prompt:
      "Build a split-screen hero with compelling copy, CTA buttons, and trust badges on one side, and a product screenshot or illustration on the other. Make it responsive.",
    image: "/previews/split-hero.png",
  },
  {
    id: "17",
    title: "Pricing Cards",
    description: "Three-tier pricing with feature comparison",
    category: "pricing",
    prompt:
      "Create a pricing section with three tiers (Basic, Pro, Enterprise). Include feature lists with checkmarks, popular plan highlight, monthly/yearly toggle, and CTA buttons.",
    image: "/previews/pricing-cards.png",
  },
  {
    id: "18",
    title: "Pricing Table",
    description: "Detailed pricing comparison table",
    category: "pricing",
    prompt:
      "Build a pricing comparison table showing all features across different plans. Include tooltips for feature explanations, sticky headers, and highlighted recommended plan.",
    image: "/previews/pricing-table.png",
  },
  {
    id: "19",
    title: "Simple Footer",
    description: "Clean footer with links and social icons",
    category: "footer",
    prompt:
      "Create a footer with logo, navigation links organized by category, social media icons, and copyright notice. Include newsletter signup and responsive layout.",
    image: "/previews/simple-footer.png",
  },
  {
    id: "20",
    title: "Feature Bento Grid",
    description: "Bento-style feature showcase",
    category: "features",
    prompt:
      "Build a bento grid layout showcasing product features with varied card sizes. Include icons, titles, descriptions, and subtle hover animations. Make it visually interesting.",
    image: "/previews/bento-grid.png",
  },
  {
    id: "21",
    title: "Feature List",
    description: "Icon-based feature list with descriptions",
    category: "features",
    prompt:
      "Create a features section with a grid of cards, each containing an icon, title, and description. Include hover effects and ensure the layout works on all screen sizes.",
    image: "/previews/feature-list.png",
  },
  {
    id: "22",
    title: "OTP Verification",
    description: "One-time password input with auto-focus",
    category: "auth",
    prompt:
      "Create an OTP verification form with individual input boxes for each digit. Include auto-focus to next input, paste support, resend code timer, and validation feedback.",
    image: "/previews/otp-verification.png",
  },
  {
    id: "23",
    title: "Password Reset",
    description: "Password reset flow with email verification",
    category: "auth",
    prompt:
      "Build a password reset flow with email input step and new password step. Include password strength indicator, confirmation field, and success message.",
    image: "/previews/password-reset.png",
  },
  {
    id: "24",
    title: "Survey Form",
    description: "Multi-question survey with progress",
    category: "forms",
    prompt:
      "Create a survey form with multiple question types (radio, checkbox, scale, text). Include progress indicator, skip option, and review page before submission.",
    image: "/previews/survey-form.png",
  },
];
