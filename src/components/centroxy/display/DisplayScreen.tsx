"use client";

import { DisplaySlide } from "@/components/centroxy/display/DisplaySlide";
import { displayService } from "@/services/centroxy/module-service";
import { zenquotesService } from "@/services/centroxy/zenquotes.service";
import { templateOptions } from "@/data/centroxy/modules";
import type { DisplaySlide as DisplaySlideType, ZenQuote } from "@/types/centroxy";
import { useEffect, useState, useCallback } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const zenQuoteTemplateIds = templateOptions.zenQuote.map((t) => t.id);

function mapZenQuotesToSlides(quotes: ZenQuote[]): DisplaySlideType[] {
  return quotes.map((quote, index) => ({
    id: `zenq-${index}`,
    kind: "zen-quote",
    title: quote.q,
    subtitle: `— ${quote.a}`,
    badge: "Quote of the Day",
    template: zenQuoteTemplateIds[index % zenQuoteTemplateIds.length],
  }));
}

export function DisplayScreen() {
  const [slides, setSlides] = useState<DisplaySlideType[]>([]);
  const [zenQuoteSlides, setZenQuoteSlides] = useState<DisplaySlideType[]>([]);

  const fetchSlides = useCallback(() => {
    displayService.getSlides().then((response) => {
      if (response.data && response.data.length > 0) {
        setSlides(response.data);
      }
    }).catch(() => {
      // Ignore network errors on kiosk mode
    });
  }, []);

  const fetchZenQuotes = useCallback(() => {
    zenquotesService.getQuotes().then((quotes) => {
      if (quotes.length > 0) {
        setZenQuoteSlides(mapZenQuotesToSlides(quotes));
      }
    }).catch(() => {
      // Ignore errors on kiosk mode
    });
  }, []);

  useEffect(() => {
    fetchSlides();
    fetchZenQuotes();

    // Polling fallback to keep display updated every 30s
    const interval = setInterval(() => {
      fetchSlides();
      fetchZenQuotes();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchSlides, fetchZenQuotes]);

  const allSlides = [...slides, ...zenQuoteSlides];

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#020617]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={allSlides.length > 1}
        speed={900}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {allSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <DisplaySlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
