import type { QueryParams, Quote } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const quoteService = {
  list: (params?: QueryParams) => moduleService.list<Quote>("quotes", params),
  get: (id: string) => moduleService.get<Quote>("quotes", id),
  save: (item: Quote) => moduleService.save("quotes", item),
  remove: (id: string) => moduleService.remove("quotes", id),
};