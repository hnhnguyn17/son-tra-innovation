export const HeroSection = () => {
  return (
    <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
      {/* Main Headline */}
      <h1
        className="text-5xl sm:text-6xl md:text-7xl max-w-5xl font-semibold font-serif text-[#0A192F] animate-fade-rise"
        style={{ lineHeight: 1.1, letterSpacing: '-1px' }}
      >
        <span className="text-[#0077B6] italic font-normal">Hồn Biển Sơn Trà,</span>{' '}
        nơi di sản hòa nhịp{' '}
        <span className="text-[#0077B6] italic font-normal">tương lai.</span>
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg md:text-xl max-w-3xl mt-8 leading-relaxed font-light text-[#4A5568] animate-fade-rise-delay">
        Khám phá không gian kiến trúc độc đáo lấy cảm hứng từ sóng biển đại dương. Nơi lưu giữ
        nhịp đập của làng chài cổ và tôn vinh tín ngưỡng thờ Cá Ông linh thiêng của người dân Đà Nẵng.
      </p>

      {/* Hero CTA Button */}
      <div className="animate-fade-rise-delay-2">
        <button
          type="button"
          className="rounded-full px-10 py-4 text-base font-medium mt-10 tracking-wide bg-[#0A192F] text-white hover:bg-[#0077B6] hover:scale-105 shadow-xl hover:shadow-cyan-600/20 transition-all duration-300 active:scale-95 cursor-pointer"
        >
          Khám Phá Câu Chuyện
        </button>
      </div>
    </section>
  );
};
