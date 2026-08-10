import type { ParticipationAchievement, QueryParams } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const participationService = {
  list: (params?: QueryParams) =>
    moduleService.list<ParticipationAchievement>("participation", params),
  get: (id: string) => moduleService.get<ParticipationAchievement>("participation", id),
  save: (item: ParticipationAchievement) => moduleService.save("participation", item),
  remove: (id: string) => moduleService.remove("participation", id),
};
