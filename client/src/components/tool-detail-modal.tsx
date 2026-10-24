import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Share,
  ExternalLink,
  Star,
  Users,
  Check,
  X,
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Tool, Category } from "@shared/schema";

interface ToolDetailModalProps {
  tool: Tool;
  category?: Category;
  onClose: () => void;
}

export default function ToolDetailModal({
  tool,
  category,
  onClose,
}: ToolDetailModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get favorites
  const { data: favorites = [] } = useQuery<number[]>({
    queryKey: ["/api/favorites"],
  });

  const isFavorite = favorites.includes(tool.id);

  // Add favorite mutation
  const addFavoriteMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/favorites", { toolId: tool.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Added to favorites",
        description: `${tool.name} has been added to your favorites.`,
      });
    },
  });

  // Remove favorite mutation
  const removeFavoriteMutation = useMutation({
    mutationFn: () => apiRequest("DELETE", `/api/favorites/${tool.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/favorites"] });
      toast({
        title: "Removed from favorites",
        description: `${tool.name} has been removed from your favorites.`,
      });
    },
  });

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const handleShareTool = () => {
    if (navigator.share) {
      navigator.share({
        title: tool.name,
        text: tool.description,
        url: tool.url,
      });
    } else {
      navigator.clipboard.writeText(tool.url);
      toast({
        title: "Link copied",
        description: "Tool link has been copied to clipboard.",
      });
    }
  };

  const handleOpenTool = () => {
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  const formatRating = (rating: number) => {
    return (rating / 10).toFixed(1);
  };

  const formatUserCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+`;
    }
    return count.toString();
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case "free":
        return "bg-success/15 text-success border border-success/30";
      case "freemium":
        return "bg-warning/15 text-warning border border-warning/30";
      case "premium":
        return "bg-primary/15 text-primary border border-primary/30";
      case "trial":
        return "bg-accent/15 text-accent border border-accent/30";
      case "subscription":
        return "bg-chart-4/15 text-chart-4 border border-chart-4/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getUseCaseColor = (color?: string) => {
    switch (color) {
      case "blue":
        return "bg-primary/10 border border-primary/20";
      case "green":
        return "bg-accent/10 border border-accent/20";
      case "purple":
        return "bg-chart-4/10 border border-chart-4/20";
      case "orange":
        return "bg-warning/10 border border-warning/20";
      default:
        return "bg-muted/50 border border-border";
    }
  };

  const getUseCaseTextColor = (color?: string) => {
    switch (color) {
      case "blue":
        return "text-primary";
      case "green":
        return "text-accent";
      case "purple":
        return "text-chart-4";
      case "orange":
        return "text-warning";
      default:
        return "text-foreground";
    }
  };

  const getUseCaseDescColor = (color?: string) => {
    switch (color) {
      case "blue":
        return "text-primary/70";
      case "green":
        return "text-accent/70";
      case "purple":
        return "text-chart-4/70";
      case "orange":
        return "text-warning/70";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-screen overflow-y-auto glass-strong border-border">
        <div className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 bg-${tool.iconColor}-100 rounded-xl flex items-center justify-center`}
              >
                <i
                  className={`${tool.iconType} ${tool.iconName} text-${tool.iconColor}-600 text-xl`}
                ></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">
                  {tool.name}
                </h2>
                <p className="text-muted-foreground">
                  {category?.name || "OSINT Tool"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {tool.fullDescription || tool.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Pricing</div>
                <div className="text-lg font-semibold text-foreground">
                  <Badge className={getPricingColor(tool.pricing)}>
                    {tool.pricing.charAt(0).toUpperCase() +
                      tool.pricing.slice(1)}
                  </Badge>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Platform</div>
                <div className="text-lg font-semibold text-foreground capitalize">
                  {tool.platform}
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Rating</div>
                <div className="text-lg font-semibold text-foreground flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
                  {formatRating(tool.rating)}/5
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Users</div>
                <div className="text-lg font-semibold text-foreground">
                  {formatUserCount(tool.userCount)}
                </div>
              </div>
            </div>

            {tool.features && tool.features.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-muted-foreground"
                    >
                      <Check className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {tool.useCases && tool.useCases.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Investigation Use Cases
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {tool.useCases.map((useCase, index) => (
                    <div
                      key={index}
                      className={`rounded-lg p-3 ${getUseCaseColor(useCase.color)}`}
                    >
                      <div
                        className={`font-medium ${getUseCaseTextColor(useCase.color)}`}
                      >
                        {useCase.title}
                      </div>
                      <div
                        className={`text-sm mt-1 ${getUseCaseDescColor(useCase.color)}`}
                      >
                        {useCase.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tool.tags && tool.tags.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-muted/30 px-6 py-4 rounded-b-xl flex justify-between items-center border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFavoriteClick}
              disabled={
                addFavoriteMutation.isPending ||
                removeFavoriteMutation.isPending
              }
              className="flex items-center space-x-2"
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-current text-error" : "text-muted-foreground"}`}
              />
              <span>
                {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShareTool}
              className="flex items-center space-x-2 text-slate-600 hover:text-blue-500"
            >
              <Share className="w-4 h-4" />
              <span>Share Tool</span>
            </Button>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="glass border-border">
              Close
            </Button>
            <Button
              onClick={handleOpenTool}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open Tool
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
