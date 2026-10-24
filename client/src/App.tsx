import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import LandingPage from "@/pages/landing";
import Directory from "@/pages/directory";
import NotFound from "@/pages/not-found";
import { useQuery } from "@tanstack/react-query";
import type { Category, Tool } from "@shared/schema";

function LandingWithStats() {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  const { data: tools = [] } = useQuery<Tool[]>({
    queryKey: ["/api/tools", {}],
  });
  return (
    <LandingPage toolCount={tools.length} categoryCount={categories.length} />
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingWithStats} />
      <Route path="/directory" component={Directory} />
      <Route path="/directory/:slug" component={Directory} />
      <Route path="/category/:slug" component={Directory} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
