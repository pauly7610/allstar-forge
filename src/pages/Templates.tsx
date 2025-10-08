import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  FileCode2, 
  Download, 
  Star,
  Shield,
  Database,
  Sparkles,
  TrendingUp
} from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Insurance Claims ML Pipeline",
    description: "End-to-end ML pipeline for automated claims processing with fraud detection, NLP analysis, and compliance tracking",
    category: "Machine Learning",
    icon: Sparkles,
    downloads: 142,
    rating: 4.8,
    features: ["Auto-scaling", "SOC 2 Compliant", "CI/CD Ready", "Cost Optimized"],
    estimatedCost: "$8-12k/mo"
  },
  {
    id: 2,
    name: "Customer Analytics Platform",
    description: "Real-time customer segmentation and behavioral analysis with GDPR-compliant data handling and visualization",
    category: "Analytics",
    icon: TrendingUp,
    downloads: 98,
    rating: 4.6,
    features: ["Real-time Processing", "Privacy Controls", "Dashboard Included", "Multi-source Integration"],
    estimatedCost: "$5-8k/mo"
  },
  {
    id: 3,
    name: "Secure Data Lake",
    description: "Enterprise data lake with row-level security, audit logging, and automated compliance reporting for financial services",
    category: "Data Engineering",
    icon: Database,
    downloads: 87,
    rating: 4.9,
    features: ["RLS Enabled", "Audit Trails", "Encryption at Rest", "NIST Compliant"],
    estimatedCost: "$10-15k/mo"
  },
  {
    id: 4,
    name: "Risk Assessment API",
    description: "Microservices architecture for real-time risk scoring with A/B testing framework and performance monitoring",
    category: "API Services",
    icon: Shield,
    downloads: 76,
    rating: 4.7,
    features: ["Load Balanced", "Zero-trust Auth", "Observability Built-in", "Blue-Green Deploy"],
    estimatedCost: "$6-9k/mo"
  },
  {
    id: 5,
    name: "Compliance Monitoring System",
    description: "Automated compliance tracking and reporting system with policy-as-code enforcement and audit trail generation",
    category: "Governance",
    icon: FileCode2,
    downloads: 54,
    rating: 4.5,
    features: ["Policy Automation", "SOC 2 & NIST Ready", "Continuous Scanning", "Automated Remediation"],
    estimatedCost: "$4-6k/mo"
  },
  {
    id: 6,
    name: "AI-Powered Chatbot Platform",
    description: "Customer service chatbot with NLU, sentiment analysis, and integration to CRM systems",
    category: "AI/ML",
    icon: Sparkles,
    downloads: 121,
    rating: 4.8,
    features: ["Multi-language", "Analytics Dashboard", "CRM Integration", "24/7 Availability"],
    estimatedCost: "$7-11k/mo"
  }
];

const categories = ["All", "Machine Learning", "Analytics", "Data Engineering", "API Services", "Governance", "AI/ML"];

export default function Templates() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold">Template Marketplace</h2>
          <p className="text-muted-foreground mt-1">
            Industry-specific blueprints with cost estimation and compliance built-in
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <DashboardCard
              key={template.id}
              title={template.name}
              description={template.description}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{template.downloads}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{template.rating}</span>
                  </div>
                  <Badge variant="outline">{template.category}</Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {template.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <div className="border-t pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Estimated Cost</p>
                    <p className="text-sm font-semibold">{template.estimatedCost}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                    <Button size="sm">
                      Use Template
                    </Button>
                  </div>
                </div>
              </div>
            </DashboardCard>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
