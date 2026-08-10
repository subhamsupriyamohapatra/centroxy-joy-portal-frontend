import type { IndustryNews, QueryParams } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const newsService = {
  list: (params?: QueryParams) => moduleService.list<IndustryNews>("news", params),
  get: (id: string) => moduleService.get<IndustryNews>("news", id),
  save: (item: IndustryNews) => moduleService.save("news", item),
  remove: (id: string) => moduleService.remove("news", id),
};
