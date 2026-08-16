/**
 * Course Repository
 * Abstracts data access for educational content
 * Currently uses mock data — swap implementation for real API
 */

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string; // e.g., "4 hours"
  modules: Module[];
  thumbnailUrl?: string;
  instructor: string;
  rating: number;
  enrolledCount: number;
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  duration: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: "video" | "article" | "quiz" | "exercise";
  duration: string;
  content?: string;
  videoUrl?: string;
  isCompleted: boolean;
  resources: Resource[];
}

export interface Resource {
  title: string;
  url: string;
  type: "link" | "pdf" | "template";
}

export interface SearchQuery {
  query?: string;
  category?: string;
  level?: "beginner" | "intermediate" | "advanced";
  tags?: string[];
  limit?: number;
  offset?: number;
}

export interface SearchResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
  nextOffset?: number;
}

// Mock course data
const MOCK_COURSES: Course[] = [
  {
    id: "course-001",
    title: "Personal Finance Fundamentals",
    description: "Master budgeting, saving, and building emergency funds. Build a solid financial foundation.",
    category: "finance",
    level: "beginner",
    duration: "4 hours",
    instructor: "Sarah Chen",
    rating: 4.8,
    enrolledCount: 12450,
    tags: ["budgeting", "saving", "emergency-fund", "debt-management"],
    prerequisites: [],
    learningOutcomes: [
      "Create and maintain a monthly budget",
      "Build a 3-6 month emergency fund",
      "Understand and manage debt effectively",
    ],
    modules: [
      {
        id: "mod-001",
        title: "Understanding Your Money",
        description: "Track income and expenses",
        order: 1,
        duration: "1 hour",
        lessons: [
          { id: "les-001", title: "Income Sources & Tracking", type: "video", duration: "15 min", isCompleted: false, resources: [] },
          { id: "les-002", title: "Expense Categories", type: "article", duration: "10 min", isCompleted: false, resources: [] },
          { id: "les-003", title: "Quiz: Know Your Numbers", type: "quiz", duration: "5 min", isCompleted: false, resources: [] },
        ],
      },
      {
        id: "mod-002",
        title: "Budgeting Systems",
        description: "Choose the right budget for your lifestyle",
        order: 2,
        duration: "1.5 hours",
        lessons: [
          { id: "les-004", title: "50/30/20 Rule", type: "video", duration: "20 min", isCompleted: false, resources: [] },
          { id: "les-005", title: "Zero-Based Budgeting", type: "article", duration: "15 min", isCompleted: false, resources: [] },
          { id: "les-006", title: "Budget Template Exercise", type: "exercise", duration: "30 min", isCompleted: false, resources: [{ title: "Budget Template", url: "#", type: "template" }] },
        ],
      },
    ],
  },
  {
    id: "course-002",
    title: "Introduction to Freelancing",
    description: "Start earning with skills you already have. Build a freelance career from scratch.",
    category: "business",
    level: "beginner",
    duration: "6 hours",
    instructor: "Marcus Johnson",
    rating: 4.9,
    enrolledCount: 8930,
    tags: ["freelancing", "upwork", "fiverr", "client-acquisition"],
    prerequisites: [],
    learningOutcomes: [
      "Identify your marketable skills",
      "Create a winning freelancer profile",
      "Land your first 3 clients",
    ],
    modules: [
      {
        id: "mod-003",
        title: "Finding Your Niche",
        description: "Discover what you can sell",
        order: 1,
        duration: "1.5 hours",
        lessons: [
          { id: "les-007", title: "Skill Inventory Assessment", type: "exercise", duration: "30 min", isCompleted: false, resources: [] },
          { id: "les-008", title: "Market Research Basics", type: "video", duration: "25 min", isCompleted: false, resources: [] },
        ],
      },
    ],
  },
  {
    id: "course-003",
    title: "Small Business Launchpad",
    description: "From idea to first customer — a complete roadmap for launching your business.",
    category: "business",
    level: "intermediate",
    duration: "8 hours",
    instructor: "Amara Okafor",
    rating: 4.7,
    enrolledCount: 5620,
    tags: ["startup", "business-model", "mvp", "customer-validation"],
    prerequisites: ["Introduction to Freelancing"],
    learningOutcomes: [
      "Validate your business idea",
      "Build a minimum viable product",
      "Acquire your first paying customers",
    ],
    modules: [],
  },
  {
    id: "course-004",
    title: "Investing for Beginners",
    description: "Understand stocks, bonds, and building a portfolio that grows with you.",
    category: "finance",
    level: "beginner",
    duration: "5 hours",
    instructor: "David Park",
    rating: 4.6,
    enrolledCount: 15200,
    tags: ["investing", "stocks", "bonds", "portfolio"],
    prerequisites: ["Personal Finance Fundamentals"],
    learningOutcomes: [
      "Understand different asset classes",
      "Build a diversified portfolio",
      "Set up your first investment account",
    ],
    modules: [],
  },
  {
    id: "course-005",
    title: "Digital Marketing Mastery",
    description: "Grow any business with modern marketing strategies. SEO, social, and paid ads.",
    category: "skills",
    level: "advanced",
    duration: "10 hours",
    instructor: "Lisa Wong",
    rating: 4.9,
    enrolledCount: 6780,
    tags: ["marketing", "seo", "social-media", "paid-ads"],
    prerequisites: ["Small Business Launchpad"],
    learningOutcomes: [
      "Create a complete marketing strategy",
      "Run profitable ad campaigns",
      "Measure and optimize marketing ROI",
    ],
    modules: [],
  },
];

class CourseRepository {
  private courses: Course[] = MOCK_COURSES;

  async search(query: SearchQuery): Promise<SearchResult<Course>> {
    let results = [...this.courses];

    if (query.query) {
      const q = query.query.toLowerCase();
      results = results.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (query.category) {
      results = results.filter((c) => c.category === query.category);
    }

    if (query.level) {
      results = results.filter((c) => c.level === query.level);
    }

    if (query.tags && query.tags.length > 0) {
      results = results.filter((c) => query.tags!.some((t) => c.tags.includes(t)));
    }

    const offset = query.offset || 0;
    const limit = query.limit || 10;
    const paginated = results.slice(offset, offset + limit);

    return {
      items: paginated,
      total: results.length,
      hasMore: offset + limit < results.length,
      nextOffset: offset + limit < results.length ? offset + limit : undefined,
    };
  }

  async getById(id: string): Promise<Course | null> {
    return this.courses.find((c) => c.id === id) || null;
  }

  async getModules(courseId: string): Promise<Module[]> {
    const course = await this.getById(courseId);
    return course?.modules || [];
  }

  async getLesson(courseId: string, moduleId: string, lessonId: string): Promise<Lesson | null> {
    const course = await this.getById(courseId);
    if (!course) return null;
    const module = course.modules.find((m) => m.id === moduleId);
    if (!module) return null;
    return module.lessons.find((l) => l.id === lessonId) || null;
  }

  async getRecommendations(_userId: string, limit: number = 4): Promise<Course[]> {
    // In production, this would use user history and ML recommendations
    return this.courses.slice(0, limit);
  }

  async getByCategory(category: string): Promise<Course[]> {
    return this.courses.filter((c) => c.category === category);
  }

  async getTrending(): Promise<Course[]> {
    return [...this.courses].sort((a, b) => b.enrolledCount - a.enrolledCount).slice(0, 3);
  }
}

export const courseRepository = new CourseRepository();
// export type { Course, Module, Lesson, Resource };
