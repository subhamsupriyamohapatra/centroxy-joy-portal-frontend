import type { QueryParams, ThoughtOfTheDay } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const thoughtService = {
  list: (params?: QueryParams) => moduleService.list<ThoughtOfTheDay>("thoughts", params),
  get: (id: string) => moduleService.get<ThoughtOfTheDay>("thoughts", id),
  save: (item: ThoughtOfTheDay) => moduleService.save("thoughts", item),
  remove: (id: string) => moduleService.remove("thoughts", id),
};
