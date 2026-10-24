import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  Heart,
  ExternalLink,
  Star,
  Users,
  Info,
  Shield,
  Code,
  AlertTriangle,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Tool } from "@shared/schema";

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
  "data-onboarding"?: string;
  index?: number;
}

export default function ToolCard({
  tool,
  onClick,
  "data-onboarding": dataOnboarding,
  index = 0,
}: ToolCardProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: favorites = [] } = useQuery<number[]>({
    queryKey: ["/api/favorites"],
  });

  const isFavorite = favorites.includes(tool.id);

  const addFavoriteMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/favorites", { toolId: tool.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({ title: "Added to favorites", description: `${tool.name} added to your favorites.` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to add tool to favorites.", variant: "destructive" });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", `/api/favorites/${tool.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({ title: "Removed from favorites", description: `${tool.name} removed from your favorites.` });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to remove tool from favorites.", variant: "destructive" });
    },
  });

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) removeFavoriteMutation.mutate();
    else addFavoriteMutation.mutate();
  };

  const handleOpenTool = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const handleReportBrokenLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Report Submitted",
      description: `Thank you for reporting a broken link for ${tool.name}. Our team will review it.`,
    });
  };

  const getPricingBadgeClass = (pricing: string) => {
    switch (pricing) {
      case "free":
        return "pricing-badge pricing-free";
      case "freemium":
        return "pricing-badge pricing-freemium";
      case "premium":
        return "pricing-badge pricing-premium";
      case "trial":
        return "pricing-badge pricing-trial";
      case "subscription":
        return "pricing-badge pricing-subscription";
      default:
        return "pricing-badge bg-muted text-muted-foreground border border-border";
    }
  };

  const formatUserCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  const formatRating = (rating: number) => (rating / 10).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      data-onboarding={dataOnboarding}
      className="glass-card p-5 cursor-pointer group relative"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl glass border-border flex items-center justify-center group-hover:scale-110 group-hover:border-primary/30 transition-all">
            <i className={`${tool.iconType} ${tool.iconName} text-lg text-primary`}></i>
          </div>
          <div>
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className={getPricingBadgeClass(tool.pricing)}>
                {tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)}
              </span>
              {tool.isOfficial && (
                <span className="feature-badge feature-official">
                  <Shield className="w-3 h-3" />
                  Official
                </span>
              )}
              {tool.hasApi && (
                <span className="feature-badge feature-api">
                  <Code className="w-3 h-3" />
                  API
                </span>
              )}
            </div>
          </div>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              className={`p-1 h-8 w-8 ${
                isFavorite
                  ? "text-error hover:text-error"
                  : "text-muted-foreground hover:text-error"
              }`}
              disabled={addFavoriteMutation.isPending || removeFavoriteMutation.isPending}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">{isFavorite ? "Remove from favorites" : "Add to favorites"}</p>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
        {tool.description}
      </p>

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tool.tags.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {tool.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-muted-foreground">
              +{tool.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Bottom row */}
      <div className="flex items-center justify-between pt-4 border-t border-border/50">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-warning fill-current" />
            {formatRating(tool.rating)}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {formatUserCount(tool.userCount)}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleReportBrokenLink}
                className="flex items-center text-warning hover:text-warning/80 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p className="text-xs">Report broken link</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleOpenTool}
          className="text-primary hover:text-primary/80 text-sm font-medium p-0 h-auto group/btn"
        >
          Visit
          <ExternalLink className="w-3 h-3 ml-1 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
