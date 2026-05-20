'use client';

export default function ContactButton() {
  return (
    <button
      className="
        relative rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
        text-xs sm:text-sm md:text-base
        font-medium uppercase tracking-widest
        text-white
        overflow-hidden
        transition-all duration-200
        hover:shadow-lg
        active:scale-95
      "
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: `
          0px 4px 4px rgba(181, 1, 167, 0.25),
          inset 4px 4px 12px #7721B1,
          0 0 0 2px #FFFFFF
        `,
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </button>
  );
}
