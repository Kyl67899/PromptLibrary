Sep 1, 2026 · v1.4
feature · Security 
- Categorized prompt display with sidebar
- Added links to the footer
- Category Sections with Headers
    - Each category displays as its own section
    - Header shows: Category icon + name + prompt count
    - Visually distinct sections with gradient styling
    - Example sections: Forms, Authentication, Testimonials, Navbars, etc.
- Scroll Category Indicator
    - Fixed indicator in top-right corner
    - Shows which category you're currently viewing
    - Updates automatically as you scroll
    - Smooth fade-in/out animations
    - Only appears when viewing "All Prompts"
- Smart Display Logic
    - "All Prompts" view → Shows categorized grid with section headers
    - Specific category view → Shows paginated grid for that category
    - Search view → Shows filtered results in grid format
    - Seamlessly switches between modes
- Responsive Design
    - Desktop: 3-column grid, sidebar visible
    - Tablet: 2-column grid, adjusted layout
    - Mobile: 1-column grid, responsive sections

IDE Integration
feature
May 31, 2026 · v1.3.0

Share prompts directly to v0, Claude, GitHub Copilot, and Perplexity. Copy prompts as formatted markdown.


Admin Dashboard
feature
May 28, 2026 · v1.2.0

Full CRUD management for prompts. Create, edit, and delete prompts in real-time from the admin panel.


Enhanced Security
improvement
May 25, 2026 · v1.1.0

Added rate limiting, input sanitization, XSS protection, and security headers for all API endpoints.


Initial Launch
release
May 20, 2026 · v1.0.0

Launch of Prompt Library with 20+ UI prompts across 12 categories. Includes search, filtering, and responsive design.