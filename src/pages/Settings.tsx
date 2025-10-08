import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, 
  DollarSign, 
  FileText, 
  Users,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Settings as SettingsIcon
} from "lucide-react";

export default function Settings() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold">Platform Settings</h2>
          <p className="text-muted-foreground mt-1">
            Configure governance, policies, security, and cost management
          </p>
        </div>

        <Tabs defaultValue="governance" className="space-y-6">
          <TabsList>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="cost">Cost Management</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>

          <TabsContent value="governance" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <DashboardCard 
                title="Compliance Framework" 
                description="SOC 2 & NIST alignment tracking"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">SOC 2 Type II</p>
                        <p className="text-xs text-muted-foreground">Last audit: 2 months ago</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Compliant
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">NIST 800-53</p>
                        <p className="text-xs text-muted-foreground">142/142 controls met</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      Compliant
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium">GDPR</p>
                        <p className="text-xs text-muted-foreground">3 items need attention</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                      Review Required
                    </Badge>
                  </div>

                  <Button className="w-full" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Compliance Report
                  </Button>
                </div>
              </DashboardCard>

              <DashboardCard 
                title="Audit Trail Configuration" 
                description="Logging and retention policies"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automated Audit Logging</p>
                      <p className="text-xs text-muted-foreground">All API calls and changes tracked</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Log Retention</p>
                      <p className="text-xs text-muted-foreground">Current: 90 days</p>
                    </div>
                    <Input className="w-24 text-right" defaultValue="90" type="number" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compliance Exports</p>
                      <p className="text-xs text-muted-foreground">Auto-generate monthly reports</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Last 30 Days</p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-2 bg-muted rounded">
                        <p className="text-muted-foreground">Events Logged</p>
                        <p className="font-bold">1,247,832</p>
                      </div>
                      <div className="p-2 bg-muted rounded">
                        <p className="text-muted-foreground">Reports Generated</p>
                        <p className="font-bold">24</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <DashboardCard 
                title="Security Scanning" 
                description="Automated vulnerability detection"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SAST (CodeQL)</p>
                      <p className="text-xs text-muted-foreground">Static code analysis</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Dependency Scanning</p>
                      <p className="text-xs text-muted-foreground">Dependabot integration</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Secrets Detection</p>
                      <p className="text-xs text-muted-foreground">Pre-commit scanning</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Container Scanning</p>
                      <p className="text-xs text-muted-foreground">Image vulnerability checks</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="text-2xl font-bold text-green-600">0</p>
                        <p className="text-xs text-muted-foreground">Critical</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-yellow-600">3</p>
                        <p className="text-xs text-muted-foreground">High</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Medium</p>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard 
                title="Access Control" 
                description="Zero-trust security configuration"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SSO Enforcement</p>
                      <p className="text-xs text-muted-foreground">Okta integration</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">MFA Required</p>
                      <p className="text-xs text-muted-foreground">For all production access</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Secrets Rotation</p>
                      <p className="text-xs text-muted-foreground">Automatic every 90 days</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="border-t pt-4">
                    <Button className="w-full" variant="outline">
                      <Lock className="h-4 w-4 mr-2" />
                      Manage User Roles
                    </Button>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>

          <TabsContent value="cost" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <DashboardCard 
                title="Budget Configuration" 
                description="Set monthly spending limits and alerts"
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Global Monthly Budget</label>
                    <Input 
                      type="number" 
                      defaultValue="150000" 
                      className="mt-2"
                      prefix="$"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Current spend: $127,450 (85%)
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-3">Alert Thresholds</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Warning (80%)</span>
                        <Switch checked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Critical (95%)</span>
                        <Switch checked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Auto-scale limit</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>

              <DashboardCard 
                title="Cost Optimization" 
                description="Automated savings recommendations"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Idle Resource Cleanup</p>
                      <p className="text-xs text-muted-foreground">Auto-delete after 7 days</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Rightsizing</p>
                      <p className="text-xs text-muted-foreground">ML-based recommendations</p>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Reserved Capacity</p>
                      <p className="text-xs text-muted-foreground">Purchase recommendations</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Potential Monthly Savings</span>
                      <span className="text-xl font-bold text-green-600">$18,450</span>
                    </div>
                    <Button className="w-full" size="sm">
                      <DollarSign className="h-4 w-4 mr-2" />
                      View Recommendations
                    </Button>
                  </div>
                </div>
              </DashboardCard>
            </div>
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <DashboardCard 
              title="Policy-as-Code" 
              description="Automated policy enforcement with OPA/Gatekeeper"
            >
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Container Security Policy</p>
                        <p className="text-xs text-muted-foreground">Enforces non-root users, no privileged containers</p>
                      </div>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Resource Limits Policy</p>
                        <p className="text-xs text-muted-foreground">Requires CPU/memory limits on all pods</p>
                      </div>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Image Registry Policy</p>
                        <p className="text-xs text-muted-foreground">Only allow approved registries</p>
                      </div>
                    </div>
                    <Switch checked />
                  </div>

                  <div className="flex items-start justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Network Policy Enforcement</p>
                        <p className="text-xs text-muted-foreground">3 violations in last 24h</p>
                      </div>
                    </div>
                    <Switch checked />
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-muted-foreground">Active Policies</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">1,247</p>
                      <p className="text-xs text-muted-foreground">Enforced</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">12</p>
                      <p className="text-xs text-muted-foreground">Violations</p>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    Configure Policies
                  </Button>
                </div>
              </div>
            </DashboardCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
