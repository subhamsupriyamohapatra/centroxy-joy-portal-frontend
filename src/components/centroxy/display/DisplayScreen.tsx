"use client";

import { DisplaySlide } from "@/components/centroxy/display/DisplaySlide";
import { displayService } from "@/services/centroxy/module-service";
import { zenquotesService } from "@/services/centroxy/zenquotes.service";
import { pexelsService } from "@/services/centroxy/pexels.service";
import { templateOptions } from "@/data/centroxy/modules";
import type { DisplaySlide as DisplaySlideType, ZenQuote } from "@/types/centroxy";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";

const zenQuoteTemplateIds = templateOptions.zenQuote.map((t) => t.id);

const MAX_QUOTE_WORDS = 12;

function countWords(text: string) {
  return (text ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function mapZenQuotesToSlides(quotes: ZenQuote[]): DisplaySlideType[] {
  return quotes
    .filter((quote) => countWords(quote.q) <= MAX_QUOTE_WORDS)
    .map((quote, index) => ({
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
  const [backgrounds, setBackgrounds] = useState<string[]>([]);

  const allQuoteSlides = useMemo(
    () => [...slides, ...zenQuoteSlides],
    [slides, zenQuoteSlides]
  );

  useEffect(() => {
    const quoteCount = allQuoteSlides.filter(
      (slide) => slide.kind === "thought" || slide.kind === "zen-quote"
    ).length;
    if (quoteCount === 0) return;

    let cancelled = false;
    pexelsService.getNatureBackgrounds(quoteCount).then((images) => {
      if (!cancelled && images.length > 0) {
        setBackgrounds(images);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [allQuoteSlides]);

  const displaySlides: DisplaySlideType[] = useMemo(() => {
    let quoteIndex = -1;
    return allQuoteSlides.map((slide) => {
      const isQuote = slide.kind === "thought" || slide.kind === "zen-quote";
      if (!isQuote || backgrounds.length === 0) return slide;
      quoteIndex += 1;
      return {
        ...slide,
        image: backgrounds[quoteIndex % backgrounds.length],
      };
    });
  }, [allQuoteSlides, backgrounds]);

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

  return (
    <main className="h-screen w-screen overflow-hidden bg-[#020617]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={displaySlides.length > 1}
        speed={900}
        autoplay={{ delay: 8000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {displaySlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <DisplaySlide slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
