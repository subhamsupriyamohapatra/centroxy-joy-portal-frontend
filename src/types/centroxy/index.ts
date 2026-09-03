import type { LucideIcon } from "lucide-react";

export type PublishStatus = "draft" | "scheduled" | "published" | "archived";

export type ModuleKey =
  | "thoughts"
  | "birthdays"
  | "employees"
  | "customers"
  | "announcements"
  | "events"
  | "participation"
  | "news"
  | "banners";

export type SlideKind =
  | "welcome"
  | "thought"
  | "birthday"
  | "employee"
  | "customer"
  | "announcement"
  | "event"
  | "participation"
  | "news"
  | "banner"
  | "thank-you"
  | "zen-quote";

export type TemplateOption = {
  id: string;
  name: string;
  description: string;
  gradient: string;
};

export type BaseContent = {
  id: string;
  status: PublishStatus;
  template: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
};

export type ThoughtTemplate = "minimal" | "glass" | "corporate";

export interface ThoughtOfTheDay extends BaseContent {
  title: string;
  quote: string;
  author: string;
  backgroundImage: string;
  startDate: string;
  endDate: string;
  template: ThoughtTemplate;
}

export type BirthdayTemplate =
  | "classic"
  | "celebration"
  | "corporate"
  | "premium"
  | "modern";

export interface BirthdayGreeting extends BaseContent {
  employeeName: string;
  employeePhoto: string;
  department: string;
  designation: string;
  greetingMessage: string;
  birthdayDate: string;
  backgroundTheme: string;
  scheduleDate: string;
  template: BirthdayTemplate;
}

export type EmployeeTemplate = "award" | "spotlight" | "corporate" | "premium";

export interface EmployeeOfMonth extends BaseContent {
  employeeName: string;
  photo: string;
  achievement: string;
  description: string;
  month: string;
  template: EmployeeTemplate;
}

export type CustomerTemplate = "classic" | "corporate" | "modern";

export interface NewCustomer extends BaseContent {
  companyName: string;
  companyLogo: string;
  projectName: string;
  description: string;
  template: CustomerTemplate;
}

export type AnnouncementTemplate =
  | "notice"
  | "banner"
  | "breaking-news"
  | "corporate";

export interface CompanyAnnouncement extends BaseContent {
  title: string;
  bannerImage: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  publishDate: string;
  template: AnnouncementTemplate;
}

export type EventTemplate = "event-card" | "poster" | "timeline" | "corporate";

export interface UpcomingEvent extends BaseContent {
  title: string;
  banner: string;
  venue: string;
  date: string;
  time: string;
  description: string;
  template: EventTemplate;
}

export type ParticipationTemplate = "achievement" | "gallery" | "award";

export interface ParticipationAchievement extends BaseContent {
  employee: string;
  competition: string;
  achievement: string;
  photo: string;
  template: ParticipationTemplate;
}

export type NewsTemplate = "news-card" | "magazine" | "corporate";

export interface IndustryNews extends BaseContent {
  headline: string;
  thumbnail: string;
  description: string;
  source: string;
  publishDate: string;
  template: NewsTemplate;
}

export interface Banner extends BaseContent {
  image: string;
}

export type ModuleContent =
  | ThoughtOfTheDay
  | BirthdayGreeting
  | EmployeeOfMonth
  | NewCustomer
  | CompanyAnnouncement
  | UpcomingEvent
  | ParticipationAchievement
  | IndustryNews
  | Banner;

export type ModuleConfig = {
  key: ModuleKey;
  title: string;
  singular: string;
  description: string;
  basePath: string;
  icon: LucideIcon;
  imageField: string;
  primaryField: string;
  secondaryField: string;
  dateField?: string;
  defaultTemplate?: string;
  templates: TemplateOption[];
  fields: ModuleField[];
};

export type ModuleField = {
  name: string;
  label: string;
  type:
    | "text"
    | "textarea"
    | "date"
    | "time"
    | "select"
    | "image"
    | "status"
    | "employee";
  options?: string[];
  required?: boolean;
  futureOnly?: boolean;
};

export type PaginatedResult<T> = {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages?: number;
};

export type QueryParams = {
  search?: string;
  status?: PublishStatus | "all";
  page?: number;
  pageSize?: number;
};

export type DashboardSummary = {
  label: string;
  value: string;
  helper: string;
  gradient: string;
  icon: LucideIcon;
  href?: string;
};

export type RecentActivity = {
  id: string;
  action: string;
  module: string;
  timestamp: string;
  status: PublishStatus;
};

export type PortalSettings = {
  companyLogo: string;
  companyName: string;
  slideDuration: number;
  theme: "light" | "dark" | "corporate" | "celebration";
  backgroundMusic: string;
  displayResolution: "1920x1080" | "3840x2160" | "1366x768" | "custom";
  animationSpeed: "slow" | "normal" | "fast";
};

export type DisplaySlide = {
  id: string;
  kind: SlideKind;
  title: string;
  subtitle?: string;
  body?: string;
  image?: string;
  badge?: string;
  template?: string;
};

export type ZenQuote = {
  q: string;
  a: string;
  c: string;
  h: string;
};

export type ApiResponse<T> = {
  data: T;
  message: string;
};
