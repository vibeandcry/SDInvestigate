import { Link, useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import type { Category } from "@shared/schema";

interface SidebarProps {
  categories: Category[];
  currentCategorySlug: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    pricing: string;
    hasApi: boolean;
    isFree: boolean;
    isPremium: boolean;
  };
  onFilterChange: (filters: any) => void;
  categoryCounts?: Record<number, number>;
}

const pricingOptions = [
  { value: "", label: "All Pricing", color: "" },
  { value: "free", label: "Free", color: "bg-success" },
  { value: "freemium", label: "Freemium", color: "bg-warning" },
  { value: "premium", label: "Premium", color: "bg-primary" },
  { value: "trial", label: "Trial", color: "bg-accent" },
  { value: "subscription", label: "Subscription", color: "bg-chart-4" },
];

export default function Sidebar({
  categories,
  currentCategorySlug,
  searchQuery,
  onSearchChange,
  filters,
  onFilterChange,
  categoryCounts,
}: SidebarProps) {
  const [location] = useLocation();

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handlePricingChange = (value: string) => {
    onFilterChange({ ...filters, pricing: value });
  };

  const getCategoryPath = (slug: string) => {
    return `/directory?category=${slug}`;
  };

  return (
    <aside className="lg:w-72 flex-shrink-0 space-y-4">
      {/* Search */}
      <div className="glass-card p-4" data-onboarding="search-bar">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search OSINT tools..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="pl-10 bg-background/50 border-border focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      {/* Pricing Filter */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Pricing</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {pricingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handlePricingChange(opt.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.pricing === opt.value
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "bg-muted/50 text-muted-foreground border border-transparent hover:border-border hover:text-foreground"
              }`}
            >
              {opt.color && (
                <span className={`w-2 h-2 rounded-full ${opt.color}`} />
              )}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="glass-card p-4" data-onboarding="category-list">
        <h3 className="text-sm font-semibold text-foreground mb-3 px-2">
          Categories
        </h3>
        <nav className="space-y-0.5 max-h-[calc(100vh-20rem)] overflow-y-auto">
          {categories.map((category, index) => {
            const isActive = category.slug === currentCategorySlug;
            const count = categoryCounts?.[category.id] ?? 0;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <Link
                  href={getCategoryPath(category.slug)}
                  className={`flex items-center px-3 py-2 text-sm rounded-lg transition-all group ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground border border-transparent"
                  }`}
                >
                  <i className={`${category.icon} w-4 mr-3 text-center`}></i>
                  <span className="flex-1 truncate">{category.name}</span>
                  {count > 0 && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-medium ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
