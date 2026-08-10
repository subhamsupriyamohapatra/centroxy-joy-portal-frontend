import type { NewCustomer, QueryParams } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const customerService = {
  list: (params?: QueryParams) => moduleService.list<NewCustomer>("customers", params),
  get: (id: string) => moduleService.get<NewCustomer>("customers", id),
  save: (item: NewCustomer) => moduleService.save("customers", item),
  remove: (id: string) => moduleService.remove("customers", id),
};
