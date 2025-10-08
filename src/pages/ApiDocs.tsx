import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Code2, 
  Key,
  Copy,
  ExternalLink,
  BookOpen,
  Zap
} from "lucide-react";

const apiEndpoints = [
  {
    id: 1,
    method: "POST",
    path: "/api/v1/projects",
    description: "Create a new project with specified configuration",
    category: "Projects",
    authenticated: true
  },
  {
    id: 2,
    method: "GET",
    path: "/api/v1/projects/{id}",
    description: "Retrieve project details and current status",
    category: "Projects",
    authenticated: true
  },
  {
    id: 3,
    method: "POST",
    path: "/api/v1/deployments",
    description: "Trigger a deployment for a specific project",
    category: "Deployments",
    authenticated: true
  },
  {
    id: 4,
    method: "GET",
    path: "/api/v1/monitoring/metrics",
    description: "Fetch monitoring metrics for specified time range",
    category: "Monitoring",
    authenticated: true
  },
  {
    id: 5,
    method: "POST",
    path: "/api/v1/environments",
    description: "Provision a new environment with custom configuration",
    category: "Environments",
    authenticated: true
  },
  {
    id: 6,
    method: "GET",
    path: "/api/v1/catalog/services",
    description: "List all available services in the catalog",
    category: "Catalog",
    authenticated: false
  }
];

const codeExamples = {
  curl: `curl -X POST https://api.allstate-platform.com/v1/projects \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "analytics-ml-prod",
    "template": "ml-pipeline",
    "environment": "production"
  }'`,
  
  python: `import requests

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

data = {
    "name": "analytics-ml-prod",
    "template": "ml-pipeline",
    "environment": "production"
}

response = requests.post(
    "https://api.allstate-platform.com/v1/projects",
    headers=headers,
    json=data
)

print(response.json())`,

  javascript: `const response = await fetch(
  'https://api.allstate-platform.com/v1/projects',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'analytics-ml-prod',
      template: 'ml-pipeline',
      environment: 'production'
    })
  }
);

const data = await response.json();
console.log(data);`
};

const getMethodColor = (method: string) => {
  switch (method) {
    case "GET":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "POST":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "PUT":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "DELETE":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function ApiDocs() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">API Documentation</h2>
            <p className="text-muted-foreground mt-1">
              Comprehensive API reference for platform automation and integration
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Full Documentation
            </Button>
            <Button>
              <Key className="mr-2 h-4 w-4" />
              Get API Key
            </Button>
          </div>
        </div>

        {/* Quick Start */}
        <DashboardCard
          title="Quick Start"
          description="Get started with the Allstate Platform API in minutes"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Get your API key</h4>
                <p className="text-sm text-muted-foreground">
                  Generate an API key from Settings → API Keys
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Make your first request</h4>
                <p className="text-sm text-muted-foreground">
                  Use the examples below to make authenticated API calls
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Explore endpoints</h4>
                <p className="text-sm text-muted-foreground">
                  Browse all available endpoints and their parameters below
                </p>
              </div>
            </div>
          </div>
        </DashboardCard>

        {/* Code Examples */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Code Examples</h3>
          <DashboardCard title="Create a Project" description="Example API call to create a new project">
            <Tabs defaultValue="curl">
              <TabsList>
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              </TabsList>
              {Object.entries(codeExamples).map(([lang, code]) => (
                <TabsContent key={lang} value={lang}>
                  <div className="relative">
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{code}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </DashboardCard>
        </div>

        {/* API Endpoints */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">API Endpoints</h3>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search endpoints..."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-3">
            {apiEndpoints.map((endpoint) => (
              <DashboardCard
                key={endpoint.id}
                title=""
                description=""
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className={getMethodColor(endpoint.method)}>
                        {endpoint.method}
                      </Badge>
                      <code className="text-sm font-mono">{endpoint.path}</code>
                      {endpoint.authenticated && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Key className="h-3 w-3" />
                          Auth required
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {endpoint.description}
                    </p>
                    <Badge variant="outline">{endpoint.category}</Badge>
                  </div>
                  <Button variant="outline" size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </DashboardCard>
            ))}
          </div>
        </div>

        {/* Rate Limits */}
        <DashboardCard
          title="Rate Limits"
          description="Understanding API rate limits and quotas"
        >
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Standard Tier</span>
              <span className="font-medium">1,000 requests/hour</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-muted-foreground">Professional Tier</span>
              <span className="font-medium">10,000 requests/hour</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">Enterprise Tier</span>
              <span className="font-medium">Unlimited</span>
            </div>
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Zap className="mr-2 h-4 w-4" />
            Upgrade Tier
          </Button>
        </DashboardCard>
      </div>
    </AppLayout>
  );
}
