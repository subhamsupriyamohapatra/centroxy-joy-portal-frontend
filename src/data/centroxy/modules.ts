import {
  Award,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Cake,
  Image,
  MessageSquareQuote,
  Newspaper,
  Quote,
} from "lucide-react";
import type {
  Banner,
  BirthdayGreeting,
  CompanyAnnouncement,
  EmployeeOfMonth,
  IndustryNews,
  ModuleConfig,
  ModuleContent,
  ModuleKey,
  NewCustomer,
  ParticipationAchievement,
  PortalSettings,
  Quote as QuoteContent,
  RecentActivity,
  ThoughtOfTheDay,
  UpcomingEvent,
} from "@/types/centroxy";

const gradients = {
  blue: "from-[#5750F1] via-[#7C3AED] to-[#06B6D4]",
  amber: "from-[#F59E0B] via-[#F97316] to-[#EF4444]",
  emerald: "from-[#10B981] via-[#14B8A6] to-[#3B82F6]",
  rose: "from-[#EC4899] via-[#F43F5E] to-[#F59E0B]",
  slate: "from-[#111827] via-[#334155] to-[#2563EB]",
  violet: "from-[#6D28D9] via-[#9333EA] to-[#DB2777]",
};

export const templateOptions = {
  thought: [
    {
      id: "minimal",
      name: "Minimal",
      description: "Clean quote-first layout with soft contrast.",
      gradient: gradients.emerald,
    },
    {
      id: "glass",
      name: "Glass",
      description: "Blurred overlay with luminous typography.",
      gradient: gradients.blue,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Balanced executive style for office displays.",
      gradient: gradients.slate,
    },
  ],
  birthday: [
    {
      id: "classic",
      name: "Classic",
      description: "Warm greeting card with portrait focus.",
      gradient: gradients.rose,
    },
    {
      id: "celebration",
      name: "Celebration",
      description: "Confetti, balloons, and bold birthday energy.",
      gradient: gradients.amber,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Polished employee recognition layout.",
      gradient: gradients.blue,
    },
    {
      id: "premium",
      name: "Premium",
      description: "Dark luxury surface with accent highlights.",
      gradient: gradients.slate,
    },
    {
      id: "modern",
      name: "Modern",
      description: "Fresh, bright and display-friendly composition.",
      gradient: gradients.emerald,
    },
  ],
  employee: [
    {
      id: "award",
      name: "Award",
      description: "Trophy-led achievement presentation.",
      gradient: gradients.amber,
    },
    {
      id: "spotlight",
      name: "Spotlight",
      description: "Photo-first recognition with stage lighting.",
      gradient: gradients.violet,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Executive announcement style.",
      gradient: gradients.blue,
    },
    {
      id: "premium",
      name: "Premium",
      description: "High-contrast premium award treatment.",
      gradient: gradients.slate,
    },
  ],
  customer: [
    {
      id: "classic",
      name: "Classic",
      description: "Simple new customer welcome.",
      gradient: gradients.emerald,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Business-first customer onboarding layout.",
      gradient: gradients.blue,
    },
    {
      id: "modern",
      name: "Modern",
      description: "Clean project announcement style.",
      gradient: gradients.violet,
    },
  ],
  announcement: [
    {
      id: "notice",
      name: "Notice",
      description: "Clear information hierarchy for updates.",
      gradient: gradients.blue,
    },
    {
      id: "banner",
      name: "Banner",
      description: "Wide visual announcement treatment.",
      gradient: gradients.emerald,
    },
    {
      id: "breaking-news",
      name: "Breaking News",
      description: "Urgent ticker-inspired layout.",
      gradient: gradients.rose,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Calm internal communication style.",
      gradient: gradients.slate,
    },
  ],
  event: [
    {
      id: "event-card",
      name: "Event Card",
      description: "Compact venue/date focused layout.",
      gradient: gradients.violet,
    },
    {
      id: "poster",
      name: "Poster",
      description: "Large title and banner-driven event poster.",
      gradient: gradients.amber,
    },
    {
      id: "timeline",
      name: "Timeline",
      description: "Schedule-friendly event presentation.",
      gradient: gradients.emerald,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Formal event invite layout.",
      gradient: gradients.blue,
    },
  ],
  participation: [
    {
      id: "achievement",
      name: "Achievement",
      description: "Employee achievement recognition.",
      gradient: gradients.amber,
    },
    {
      id: "gallery",
      name: "Gallery",
      description: "Image-led competition recap.",
      gradient: gradients.emerald,
    },
    {
      id: "award",
      name: "Award",
      description: "Award ceremony inspired layout.",
      gradient: gradients.violet,
    },
  ],
  news: [
    {
      id: "news-card",
      name: "News Card",
      description: "Readable headline and summary card.",
      gradient: gradients.blue,
    },
    {
      id: "magazine",
      name: "Magazine",
      description: "Editorial news display style.",
      gradient: gradients.rose,
    },
    {
      id: "corporate",
      name: "Corporate",
      description: "Industry update for executive audiences.",
      gradient: gradients.slate,
    },
  ],
  banner: [
    {
      id: "full",
      name: "Full Image",
      description: "Full-screen banner image with cover fit.",
      gradient: gradients.violet,
    },
  ],
  zenQuote: [
    {
      id: "emerald",
      name: "Emerald",
      description: "Fresh green gradient for inspirational quotes.",
      gradient: gradients.emerald,
    },
    {
      id: "blue",
      name: "Blue",
      description: "Deep blue gradient for thoughtful quotes.",
      gradient: gradients.blue,
    },
    {
      id: "amber",
      name: "Amber",
      description: "Warm amber gradient for energetic quotes.",
      gradient: gradients.amber,
    },
    {
      id: "rose",
      name: "Rose",
      description: "Rose pink gradient for heartfelt quotes.",
      gradient: gradients.rose,
    },
    {
      id: "slate",
      name: "Slate",
      description: "Dark slate gradient for serious quotes.",
      gradient: gradients.slate,
    },
    {
      id: "violet",
      name: "Violet",
      description: "Rich violet gradient for creative quotes.",
      gradient: gradients.violet,
    },
  ],
};

export const moduleConfigs: ModuleConfig[] = [
  {
    key: "thoughts",
    title: "Thought of the Day",
    singular: "Thought",
    description: "Publish daily quotes and motivational slides.",
    basePath: "/admin/thoughts",
    icon: Quote,
    imageField: "backgroundImage",
    primaryField: "quote",
    secondaryField: "author",
    dateField: "startDate",
    defaultTemplate: "minimal",
    templates: [],
    fields: [
      {
        name: "quote",
        label: "Choose a Quote",
        type: "quote",
        required: true,
      },
      { name: "author", label: "Author", type: "text" },
      { name: "backgroundImage", label: "Background Image", type: "image" },
      { name: "startDate", label: "Start Date", type: "date", required: true, futureOnly: true },
      { name: "endDate", label: "End Date", type: "date", required: true, futureOnly: true },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "quotes",
    title: "Quotations",
    singular: "Quotation",
    description: "Manage the quotation library used for thought of the day.",
    basePath: "/admin/quotes",
    icon: MessageSquareQuote,
    imageField: "image",
    primaryField: "quote",
    secondaryField: "author",
    showPreview: false,
    templates: [],
    fields: [
      {
        name: "quote",
        label: "Quotation",
        type: "textarea",
        required: true,
      },
      { name: "author", label: "Author", type: "text" },
    ],
  },
  {
    key: "birthdays",
    title: "Birthday Greetings",
    singular: "Birthday Greeting",
    description: "Schedule employee birthday signage.",
    basePath: "/admin/birthdays",
    icon: Cake,
    imageField: "employeePhoto",
    primaryField: "employeeName",
    secondaryField: "department",
    dateField: "birthdayDate",
    templates: templateOptions.birthday,
    fields: [
      { name: "employeeName", label: "Employee Name", type: "text", required: true },
      { name: "employeePhoto", label: "Employee Photo", type: "image" },
      { name: "department", label: "Department", type: "text" },
      { name: "designation", label: "Designation", type: "text" },
      { name: "greetingMessage", label: "Greeting Message", type: "textarea" },
      { name: "birthdayDate", label: "Birthday Date", type: "date" },
      { name: "backgroundTheme", label: "Background Theme", type: "text" },
      { name: "scheduleDate", label: "Schedule Date", type: "date", futureOnly: true },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "employees",
    title: "Employee of the Month",
    singular: "Employee of the Month",
    description: "Highlight monthly employee achievements.",
    basePath: "/admin/employees",
    icon: Award,
    imageField: "photo",
    primaryField: "employeeName",
    secondaryField: "achievement",
    dateField: "month",
    templates: templateOptions.employee,
    fields: [
      { name: "employeeName", label: "Employee Name", type: "employee", required: true },
      { name: "photo", label: "Photo", type: "image" },
      { name: "achievement", label: "Achievement", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "month", label: "Month", type: "text" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "customers",
    title: "New Customer",
    singular: "Customer",
    description: "Announce newly onboarded customers.",
    basePath: "/admin/customers",
    icon: BriefcaseBusiness,
    imageField: "companyLogo",
    primaryField: "companyName",
    secondaryField: "projectName",
    templates: templateOptions.customer,
    fields: [
      { name: "companyName", label: "Company Name", type: "text", required: true },
      { name: "companyLogo", label: "Company Logo", type: "image" },
      { name: "projectName", label: "Project Name", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "announcements",
    title: "Company Announcements",
    singular: "Announcement",
    description: "Publish company notices and priority updates.",
    basePath: "/admin/announcements",
    icon: Bell,
    imageField: "bannerImage",
    primaryField: "title",
    secondaryField: "priority",
    dateField: "publishDate",
    templates: templateOptions.announcement,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "bannerImage", label: "Banner Image", type: "image" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "priority",
        label: "Priority",
        type: "select",
        options: ["low", "medium", "high", "critical"],
      },
      { name: "publishDate", label: "Publish Date", type: "date", futureOnly: true },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "events",
    title: "Upcoming Events",
    singular: "Event",
    description: "Create event slides for internal display.",
    basePath: "/admin/events",
    icon: CalendarDays,
    imageField: "banner",
    primaryField: "title",
    secondaryField: "venue",
    dateField: "date",
    templates: templateOptions.event,
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "banner", label: "Banner", type: "image" },
      { name: "venue", label: "Venue", type: "text" },
      { name: "date", label: "Date", type: "date", futureOnly: true },
      { name: "time", label: "Time", type: "time" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "participation",
    title: "Participation & Achievements",
    singular: "Achievement",
    description: "Celebrate competition participation and wins.",
    basePath: "/admin/participation",
    icon: BadgeCheck,
    imageField: "photo",
    primaryField: "employee",
    secondaryField: "competition",
    templates: templateOptions.participation,
    fields: [
      { name: "employee", label: "Employee", type: "text", required: true },
      { name: "competition", label: "Competition", type: "text" },
      { name: "achievement", label: "Achievement", type: "textarea" },
      { name: "photo", label: "Photo", type: "image" },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "news",
    title: "Industry News",
    singular: "Industry News",
    description: "Curate industry updates for the display screen.",
    basePath: "/admin/news",
    icon: Newspaper,
    imageField: "thumbnail",
    primaryField: "headline",
    secondaryField: "source",
    dateField: "publishDate",
    templates: templateOptions.news,
    fields: [
      { name: "headline", label: "Headline", type: "text", required: true },
      { name: "thumbnail", label: "Thumbnail", type: "image" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "source", label: "Source", type: "text" },
      { name: "publishDate", label: "Publish Date", type: "date", futureOnly: true },
      { name: "status", label: "Status", type: "status" },
    ],
  },
  {
    key: "banners",
    title: "Banners",
    singular: "Banner",
    description: "Upload full-screen banner images for the display screen.",
    basePath: "/admin/banners",
    icon: Image,
    imageField: "image",
    primaryField: "image",
    secondaryField: "status",
    templates: templateOptions.banner,
    fields: [
      { name: "image", label: "Banner Image", type: "image", required: true },
      { name: "status", label: "Status", type: "status" },
    ],
  },
];

const baseMeta = {
  createdAt: "2026-07-25",
  updatedAt: "2026-07-31",
} as const;

export const thoughts: ThoughtOfTheDay[] = [
  {
    id: "thought-1",
    title: "Build With Joy",
    quote: "Great products are shaped by small decisions made with care.",
    author: "Centroxy Leadership",
    backgroundImage: "/images/cover/cover-01.png",
    startDate: "2026-07-31",
    endDate: "2026-08-01",
    status: "published",
    template: "glass",
    image: "/images/cover/cover-01.png",
    ...baseMeta,
  },
];

export const birthdays: BirthdayGreeting[] = [
  {
    id: "birthday-1",
    employeeName: "Ananya Rao",
    employeePhoto: "/images/user/user-01.png",
    department: "Product",
    designation: "UX Designer",
    greetingMessage: "Wishing you a bright year full of wins and wonderful moments.",
    birthdayDate: "2026-07-31",
    backgroundTheme: "Celebration Gold",
    scheduleDate: "2026-07-31",
    status: "published",
    template: "celebration",
    image: "/images/user/user-01.png",
    ...baseMeta,
  },
];

export const employees: EmployeeOfMonth[] = [
  {
    id: "employee-1",
    employeeName: "Rahul Mehta",
    photo: "/images/user/user-02.png",
    achievement: "Customer Delivery Excellence",
    description: "Led a complex delivery with precision, empathy, and strong team collaboration.",
    month: "July 2026",
    status: "published",
    template: "award",
    image: "/images/user/user-02.png",
    ...baseMeta,
  },
];

export const customers: NewCustomer[] = [
  {
    id: "customer-1",
    companyName: "Northstar Retail",
    companyLogo: "/images/product/product-01.png",
    projectName: "Omnichannel Portal",
    description: "A new customer partnership focused on modern retail workflows.",
    status: "published",
    template: "modern",
    image: "/images/product/product-01.png",
    ...baseMeta,
  },
];

export const announcements: CompanyAnnouncement[] = [
  {
    id: "announcement-1",
    title: "Quarterly Town Hall",
    bannerImage: "/images/illustration/illustration-01.svg",
    description: "Join the leadership team for business updates and upcoming priorities.",
    priority: "high",
    publishDate: "2026-08-02",
    status: "published",
    template: "banner",
    image: "/images/illustration/illustration-01.svg",
    ...baseMeta,
  },
];

export const events: UpcomingEvent[] = [
  {
    id: "event-1",
    title: "Design Systems Workshop",
    banner: "/images/task/task-01.jpg",
    venue: "Innovation Hub",
    date: "2026-08-05",
    time: "15:30",
    description: "A practical workshop on reusable UI patterns and scalable product design.",
    status: "scheduled",
    template: "event-card",
    image: "/images/task/task-01.jpg",
    ...baseMeta,
  },
];

export const participation: ParticipationAchievement[] = [
  {
    id: "participation-1",
    employee: "Neha Sharma",
    competition: "Tech Innovation League",
    achievement: "Won first place for an automation prototype.",
    photo: "/images/team/team-01.png",
    status: "published",
    template: "award",
    image: "/images/team/team-01.png",
    ...baseMeta,
  },
];

export const news: IndustryNews[] = [
  {
    id: "news-1",
    headline: "AI Workflows Are Reshaping Enterprise Operations",
    thumbnail: "/images/product/product-thumb.png",
    description: "Teams are adopting assisted workflows to speed up decisions and reduce repetitive work.",
    source: "Industry Desk",
    publishDate: "2026-07-30",
    status: "published",
    template: "magazine",
    image: "/images/product/product-thumb.png",
    ...baseMeta,
  },
];

export const banners: Banner[] = [
  {
    id: "banner-1",
    image: "/images/cover/cover-01.png",
    status: "published",
    template: "full",
    ...baseMeta,
  },
];

export const contentByModule: Record<ModuleKey, ModuleContent[]> = {
  thoughts,
  quotes: [],
  birthdays,
  employees,
  customers,
  announcements,
  events,
  participation,
  news,
  banners,
};

export const portalSettings: PortalSettings = {
  companyLogo: "/images/logo/logo.svg",
  companyName: "Centroxy",
  slideDuration: 8,
  theme: "corporate",
  backgroundMusic: "",
  displayResolution: "1920x1080",
  animationSpeed: "normal",
};

export const recentActivity: RecentActivity[] = [
  {
    id: "activity-1",
    action: "Published birthday greeting",
    module: "Birthday Greetings",
    timestamp: "Today, 10:20 AM",
    status: "published",
  },
  {
    id: "activity-2",
    action: "Scheduled upcoming event",
    module: "Upcoming Events",
    timestamp: "Today, 09:42 AM",
    status: "scheduled",
  },
  {
    id: "activity-3",
    action: "Updated customer slide",
    module: "New Customer",
    timestamp: "Yesterday, 05:18 PM",
    status: "draft",
  },
];

export function getModuleConfig(key: ModuleKey) {
  return moduleConfigs.find((module) => module.key === key);
}
