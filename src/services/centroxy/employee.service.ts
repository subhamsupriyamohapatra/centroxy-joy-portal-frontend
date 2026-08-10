import type { EmployeeOfMonth, QueryParams } from "@/types/centroxy";
import { moduleService } from "./module-service";

export const employeeService = {
  list: (params?: QueryParams) => moduleService.list<EmployeeOfMonth>("employees", params),
  get: (id: string) => moduleService.get<EmployeeOfMonth>("employees", id),
  save: (item: EmployeeOfMonth) => moduleService.save("employees", item),
  remove: (id: string) => moduleService.remove("employees", id),
};
