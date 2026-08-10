import type { QueryParams, UpcomingEvent } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const eventService = {
  list: (params?: QueryParams) => moduleService.list<UpcomingEvent>("events", params),
  get: (id: string) => moduleService.get<UpcomingEvent>("events", id),
  save: (item: UpcomingEvent) => moduleService.save("events", item),
  remove: (id: string) => moduleService.remove("events", id),
};
