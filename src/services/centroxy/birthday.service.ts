import type { BirthdayGreeting, QueryParams } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const birthdayService = {
  list: (params?: QueryParams) => moduleService.list<BirthdayGreeting>("birthdays", params),
  get: (id: string) => moduleService.get<BirthdayGreeting>("birthdays", id),
  save: (item: BirthdayGreeting) => moduleService.save("birthdays", item),
  remove: (id: string) => moduleService.remove("birthdays", id),
};
