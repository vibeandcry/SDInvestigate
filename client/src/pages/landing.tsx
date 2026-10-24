import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Search,
  Shield,
  Zap,
  Globe,
  Lock,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Eye,
  Database,
  Code2,
  Users,
  CheckCircle2,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import type { Category } from "@shared/schema";

interface LandingPageProps {
  toolCount: number;
  categoryCount: number;
}

export default function LandingPage({ toolCount, categoryCount }: LandingPageProps) {
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const features = [
    {
      icon: Search,
      title: "Comprehensive Search",
      description: "Find the right OSINT tool from hundreds of curated resources across every investigation category.",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Verified & Trusted",
      description: "Every tool is reviewed and categorized by intelligence professionals. Official sources are clearly marked.",
      color: "text-accent",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Filter by pricing, platform, and features. Export your results instantly in multiple formats.",
      color: "text-warning",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Tools spanning social media, domains, email, geolocation, and more — covering every digital footprint.",
      color: "text-chart-4",
    },
  ];

  const stats = [
    { label: "Tools Listed", value: toolCount, icon: Database },
    { label: "Categories", value: categoryCount, icon: Globe },
    { label: "Free Tools", value: "70%", icon: CheckCircle2 },
    { label: "Regularly Updated", value: "Weekly", icon: TrendingUp },
  ];

  const showcaseCategories = categories.slice(0, 6);

  return (
    <div className="min-h-screen animated-gradient-bg">
      {/* Hero Section */}
      <section className="relative overflow-hidden mesh-gradient">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/15 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass border border-primary/20"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                The open-source intelligence tool directory
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]">
              Find the right{" "}
              <span className="gradient-text">OSINT tool</span>
              <br />
              for every investigation
            </h1>

            <p className="mt-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              A curated, categorized directory of open-source intelligence tools —
              from social media analysis to domain reconnaissance, email
              verification to geolocation tracking.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/directory">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-all glow-primary text-base px-8 h-14"
                >
                  Browse All Tools
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/directory">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass border-border hover:border-primary/40 text-base px-8 h-14"
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Explore Categories
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div key={i} className="glass-card p-6 text-center">
                <stat.icon className="w-6 h-6 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tight"
            >
              Built for <span className="gradient-text">investigators</span>
            </motion.h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to discover, evaluate, and use OSINT tools effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 group"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl glass border-border flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tight"
            >
              Explore by <span className="gradient-text">category</span>
            </motion.h2>
            <p className="mt-4 text-muted-foreground text-lg">
              {categoryCount} categories covering the full OSINT landscape
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {showcaseCategories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link href={`/directory?category=${cat.slug}`}>
                  <div className="glass-card p-5 text-center group cursor-pointer hover:scale-105 transition-transform">
                    <div
                      className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3"
                      style={{ background: `hsl(var(--primary) / 0.1)` }}
                    >
                      <i className={`${cat.icon} text-xl text-primary`}></i>
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {cat.name}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/directory">
              <Button
                variant="outline"
                size="lg"
                className="glass border-border hover:border-primary/40"
              >
                View All Categories
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold tracking-tight"
            >
              How it <span className="gradient-text">works</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", icon: Search, title: "Browse & Filter", desc: "Search across hundreds of tools by name, category, pricing, or platform." },
              { num: "02", icon: Eye, title: "Compare & Evaluate", desc: "View detailed tool pages with screenshots, features, pricing tags, and how-to guides." },
              { num: "03", icon: Zap, title: "Export & Act", desc: "Export your filtered results and start investigating with the right tools in hand." },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-5xl font-bold text-primary/20 mb-4">{step.num}</div>
                <step.icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 text-center relative overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/15 rounded-full blur-[80px]" />

            <div className="relative">
              <Lock className="w-10 h-10 text-primary mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Start your investigation today
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Access the full directory of verified OSINT tools. Free to browse, no account required.
              </p>
              <Link href="/directory">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 glow-primary text-base px-8 h-14"
                >
                  Enter the Directory
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Search className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-foreground">S&D Intel Investigator</div>
                <div className="text-xs text-muted-foreground">OSINT Tool Directory</div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {toolCount} tools
              </span>
              <span className="flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                Open Source
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Verified
              </span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            Built for the OSINT community. Use responsibly and in accordance with applicable laws.
          </div>
        </div>
      </footer>
    </div>
  );
}
