interface MarqueeTextProps {
  text: string;
  className?: string;
  reverse?: boolean;
  dark?: boolean;
}

export default function MarqueeText({
  text,
  className = '',
  reverse = false,
  dark = false,
}: MarqueeTextProps) {
  const repeatedText = `${text} `.repeat(8);

  return (
    <div
      className={`overflow-hidden py-6 md:py-8 ${
        dark ? 'bg-chocolate text-cream' : 'bg-cream text-chocolate'
      } ${className}`}
      aria-hidden="true"
    >
      <div
        className={`marquee-track ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
      >
        <span className="font-display text-[clamp(1.5rem,3vw,3rem)] font-bold whitespace-nowrap tracking-wide">
          {repeatedText}
        </span>
        <span className="font-display text-[clamp(1.5rem,3vw,3rem)] font-bold whitespace-nowrap tracking-wide">
          {repeatedText}
        </span>
      </div>
    </div>
  );
}