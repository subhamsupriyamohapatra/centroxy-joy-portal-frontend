"use client";

import { DisplaySlide } from "@/components/centroxy/display/DisplaySlide";
import { LogoAccess } from "@/components/centroxy/display/LogoAccess";
import { displayService } from "@/services/centroxy/module-service";
import type { DisplaySlide as DisplaySlideType } from "@/types/centroxy";
import { useEffect, useState, useCallback } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

export function DisplayScreen() {
  const [slides, setSlides] = useState<DisplaySlideType[]>([]);

  const fetchSlides = useCallback(() => {
    displayService.getSlides().then((response) => {
      if (response.data && response.data.length > 0) {
        setSlides(response.data);
      }
    }).catch(() => {
      // Ignore network errors on kiosk mode
    });
  }, []);

  useEffect(() => {
    fetchSlides();

    // Polling fallback to keep display updated every 30s
    const interval = setInterval(fetchSlides, 30000);
    return () => clearInterval(interval);
  }, [fetchSlides]);

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#020617]">
      <LogoAccess />
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={slides.length > 1}
        speed={900}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <DisplaySlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
