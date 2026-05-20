'use client';

export default function LiveProjectButton() {
  return (
    <button
      className="
        rounded-full px-8 py-3 sm:px-10 sm:py-3.5
        text-sm sm:text-base
        font-medium uppercase tracking-widest
        text-[#D7E2EA] border-2 border-[#D7E2EA]
        bg-transparent
        transition-all duration-300
        hover:bg-[#D7E2EA]/10
        active:scale-95
      "
    >
      Live Project
    </button>
  );
}
