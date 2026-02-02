import { Badge } from "@mui/material";
import { 
  MessageSquare, 
  Target, 
  Zap, 
  Shield, 
  BarChart3, 
  Code2,
  Bell,
  Users,
  GitBranch
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: "Real-time Route-Specific Messages",
      description: "Instantly notify users about updates, warnings, or feature changes, scoped to the exact route they're on — no page reload needed.",
      badge: "Core"
    },
    {
      icon: Zap,
      title: "Plug-and-Play SDK",
      description: "Developers just install the package, provide a project key, and they’re live in minutes.",
      badge: "Core"
    },
    {
      icon: MessageSquare,
      title: "Dynamic Context-Aware Messaging",
      description: "Messages appear and disappear based on the route, providing context-aware notifications with smooth animations.",
      badge: "UX"
    },
    {
      icon: Code2,
      title: "Route Wildcards Support",
      description: "Show messages for groups of routes using simple wildcard patterns. Real-time updates via Supabase channels.",
      badge: "DX"
    }
  ];


  return (
    <section className="py-24 bg-background" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Everything you need for
            <br />
            <span className="text-foreground bg-gradient-primary bg-clip-text">
              seamless status communication
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From route wildcards to instant updates, Notified provides all the tools
            you need for contextual user communication.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant cursor-pointer group">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-3 rounded-lg bg-gradient-primary/10 group-hover:bg-gradient-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  {/*<Badge badgeContent={feature.badge} className="text-xs text-white" />*/}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;