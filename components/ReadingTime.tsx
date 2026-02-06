interface ReadingTimeProps {
  content: string;
}

export default function ReadingTime({ content }: ReadingTimeProps) {
  // Calculate reading time (average reading speed: 200 words per minute)
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);

  return (
    <span className="flex items-center gap-1 text-gray-600">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {minutes} min read
    </span>
  );
}
