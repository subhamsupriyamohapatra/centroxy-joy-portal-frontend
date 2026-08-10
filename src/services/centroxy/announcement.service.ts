import type { CompanyAnnouncement, QueryParams } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const announcementService = {
  list: (params?: QueryParams) =>
    moduleService.list<CompanyAnnouncement>("announcements", params),
  get: (id: string) => moduleService.get<CompanyAnnouncement>("announcements", id),
  save: (item: CompanyAnnouncement) => moduleService.save("announcements", item),
  remove: (id: string) => moduleService.remove("announcements", id),
};
