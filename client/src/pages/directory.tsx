import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import ToolCard from "@/components/tool-card";
import ExportModal from "@/components/export-modal";
import ToolDetailModal from "@/components/tool-detail-modal";
import { HelpBubble, useHelpBubble } from "@/components/help-bubble";
import { OnboardingTrigger, HelpButton } from "@/components/onboarding-trigger";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { onboardingSteps } from "@/lib/onboarding-steps";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import type { Category, Tool, UserOnboarding } from "@shared/schema";

export default function Directory() {
  const [location, setLocation] = useLocation();

  // Parse category from URL query
  const urlParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );
  const categorySlug = urlParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    pricing: "",
    hasApi: false,
    isFree: false,
    isPremium: false,
  });
  const [sortBy, setSortBy] = useState("relevance");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const toolsPerPage = 9;

  const {
    currentStep,
    isOnboarding,
    startOnboarding,
    nextStep,
    skipOnboarding,
    completeOnboarding,
  } = useHelpBubble();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: currentCategory } = useQuery<Category>({
    queryKey: [`/api/categories/${categorySlug}`],
    enabled: !!categorySlug,
  });

  // Fetch all tools to compute counts
  const { data: allToolsData = [] } = useQuery<Tool[]>({
    queryKey: ["/api/tools", {}],
  });

  const buildFilters = () => {
    const filters: Record<string, unknown> = {};
    if (currentCategory) filters.categoryId = currentCategory.id;
    if (searchQuery.trim()) filters.search = searchQuery.trim();
    if (selectedFilters.pricing) filters.pricing = selectedFilters.pricing;
    if (selectedFilters.hasApi) filters.hasApi = true;
    return filters;
  };

  const { data: filteredTools = [], isLoading } = useQuery<Tool[]>({
    queryKey: ["/api/tools", buildFilters()],
  });

  const { data: onboardingData } = useQuery<UserOnboarding>({
    queryKey: ["/api/onboarding"],
  });

  // Compute category counts
  const categoryCounts: Record<number, number> = {};
  allToolsData.forEach((tool) => {
    categoryCounts[tool.categoryId] = (categoryCounts[tool.categoryId] || 0) + 1;
  });

  // Sort and paginate
  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
        return b.rating - a.rating;
      case "recent":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedTools.length / toolsPerPage);
  const startIndex = (currentPage - 1) * toolsPerPage;
  const endIndex = startIndex + toolsPerPage;
  const currentTools = sortedTools.slice(startIndex, endIndex);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleFilterChange = (filters: typeof selectedFilters) => {
    setSelectedFilters(filters);
    setCurrentPage(1);
  };

  const handleExport = () => setIsExportModalOpen(true);
  const handleToolClick = (tool: Tool) => setSelectedTool(tool);
  const handleSortChange = (value: string) => setSortBy(value);

  const totalToolsCount = allToolsData.length;

  if (isLoading) {
    return (
      <div className="min-h-screen animated-gradient-bg">
        <Header toolCount={0} onExport={handleExport} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground animate-pulse">Loading tools...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-gradient-bg">
      <HelpBubble
        steps={onboardingSteps}
        currentStep={currentStep}
        onStepChange={(step) => {
          if (step) apiRequest("POST", `/api/onboarding/${step}`);
          nextStep(step);
        }}
        onComplete={() => {
          apiRequest("POST", "/api/onboarding/complete");
          completeOnboarding();
        }}
        onSkip={() => {
          apiRequest("POST", "/api/onboarding/complete");
          skipOnboarding();
        }}
      />
      <OnboardingTrigger
        onStartOnboarding={() => startOnboarding("welcome")}
        isVisible={!onboardingData?.completedOnboarding && !isOnboarding}
      />
      <HelpButton onStartOnboarding={() => startOnboarding("welcome")} />

      <Header
        toolCount={totalToolsCount}
        onExport={handleExport}
        onNavigateHome={() => setLocation("/")}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            {currentCategory?.name || "OSINT Tool Directory"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentCategory?.description ||
              "Browse the full collection of verified open-source intelligence tools"}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          <Sidebar
            categories={categories}
            currentCategorySlug={categorySlug}
            searchQuery={searchQuery}
            onSearchChange={handleSearch}
            filters={selectedFilters}
            onFilterChange={handleFilterChange}
            categoryCounts={categoryCounts}
          />

          <main className="flex-1">
            {/* Results header */}
            <div className="glass-card p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{sortedTools.length}</span> tools found
                </span>
              </div>
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Sort by Relevance</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                  <SelectItem value="rating">Sort by Rating</SelectItem>
                  <SelectItem value="recent">Sort by Recent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tools grid */}
            {currentTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {currentTools.map((tool, index) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onClick={() => handleToolClick(tool)}
                    index={index}
                    data-onboarding={index === 0 ? "tool-card" : undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card p-16 text-center">
                <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No tools found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No tools match "${searchQuery}". Try a different search.`
                    : "No tools available in this category."}
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="glass-card p-4 mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}–{Math.min(endIndex, sortedTools.length)} of{" "}
                  {sortedTools.length}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="glass border-border"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {isExportModalOpen && (
        <ExportModal
          toolCount={sortedTools.length}
          onClose={() => setIsExportModalOpen(false)}
          filters={buildFilters()}
        />
      )}

      {selectedTool && (
        <ToolDetailModal
          tool={selectedTool}
          category={currentCategory}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </div>
  );
}
