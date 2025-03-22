<div className="flex flex-wrap gap-4">
  <Link
    href="/projects"
    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
  >
    View My Work
  </Link>
  <Link
    href="/ai-agent"
    className="bg-card border border-border hover:border-primary/50 px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center gap-2"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
    Try My AI Assistant
  </Link>
  <Link
    href="/#contact"
    className="bg-card border border-border hover:border-primary/50 px-6 py-3 rounded-lg font-medium transition-colors duration-300"
  >
    Get In Touch
  </Link>
</div>;
