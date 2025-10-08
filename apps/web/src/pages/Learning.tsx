import { AppLayout } from "@/components/AppLayout";
import { DashboardCard } from "@/components/DashboardCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Video, 
  Award,
  Clock,
  Users,
  CheckCircle2,
  PlayCircle,
  FileText
} from "lucide-react";

const learningPaths = [
  {
    id: 1,
    title: "Platform Fundamentals",
    description: "Master the core concepts and workflows of the Allstate Analytics Platform",
    level: "Beginner",
    duration: "2 hours",
    modules: 8,
    completed: 5,
    progress: 62,
    icon: BookOpen,
    certification: true
  },
  {
    id: 2,
    title: "Security & Compliance",
    description: "Learn security best practices, compliance requirements, and policy enforcement",
    level: "Intermediate",
    duration: "3 hours",
    modules: 12,
    completed: 0,
    progress: 0,
    icon: Award,
    certification: true
  },
  {
    id: 3,
    title: "Advanced CI/CD Pipelines",
    description: "Build sophisticated deployment pipelines with automated testing and rollback",
    level: "Advanced",
    duration: "4 hours",
    modules: 10,
    completed: 10,
    progress: 100,
    icon: CheckCircle2,
    certification: true
  }
];

const tutorials = [
  {
    id: 1,
    title: "Quick Start: Deploy Your First Project",
    type: "Video",
    duration: "15 min",
    views: 1243,
    icon: Video
  },
  {
    id: 2,
    title: "Setting Up Row-Level Security",
    type: "Guide",
    duration: "20 min",
    views: 892,
    icon: FileText
  },
  {
    id: 3,
    title: "Cost Optimization Best Practices",
    type: "Video",
    duration: "25 min",
    views: 756,
    icon: Video
  },
  {
    id: 4,
    title: "Implementing DORA Metrics",
    type: "Guide",
    duration: "30 min",
    views: 634,
    icon: FileText
  }
];

const certifications = [
  {
    id: 1,
    title: "Platform Developer Certification",
    description: "Demonstrate proficiency in core platform capabilities",
    earned: true,
    date: "2024-12-15"
  },
  {
    id: 2,
    title: "Security Architect Certification",
    description: "Validate expertise in security and compliance",
    earned: false,
    date: null
  },
  {
    id: 3,
    title: "Platform Expert Certification",
    description: "Master-level certification for advanced platform usage",
    earned: false,
    date: null
  }
];

export default function Learning() {
  return (
    <AppLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-3xl font-bold">Learning Hub</h2>
          <p className="text-muted-foreground mt-1">
            Accelerate your skills with curated learning paths and certifications
          </p>
        </div>

        <Tabs defaultValue="paths" className="space-y-6">
          <TabsList>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
          </TabsList>

          {/* Learning Paths */}
          <TabsContent value="paths" className="space-y-6">
            <div className="grid gap-6">
              {learningPaths.map((path) => (
                <DashboardCard
                  key={path.id}
                  title={path.title}
                  description={path.description}
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 flex-wrap">
                      <Badge variant="outline">{path.level}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {path.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        {path.modules} modules
                      </div>
                      {path.certification && (
                        <div className="flex items-center gap-2 text-sm">
                          <Award className="h-4 w-4 text-primary" />
                          <span className="text-primary">Certification Available</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{path.completed}/{path.modules} modules</span>
                      </div>
                      <Progress value={path.progress} />
                    </div>

                    <div className="flex gap-2 pt-2">
                      {path.progress === 0 ? (
                        <Button>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Start Learning
                        </Button>
                      ) : path.progress === 100 ? (
                        <Button variant="outline">
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Completed
                        </Button>
                      ) : (
                        <Button>
                          Continue Learning
                        </Button>
                      )}
                      <Button variant="outline">View Details</Button>
                    </div>
                  </div>
                </DashboardCard>
              ))}
            </div>
          </TabsContent>

          {/* Tutorials */}
          <TabsContent value="tutorials" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {tutorials.map((tutorial) => (
                <DashboardCard
                  key={tutorial.id}
                  title={tutorial.title}
                  description=""
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{tutorial.type}</Badge>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {tutorial.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {tutorial.views} views
                      </div>
                    </div>
                    <Button className="w-full">
                      {tutorial.type === "Video" ? (
                        <>
                          <Video className="mr-2 h-4 w-4" />
                          Watch Tutorial
                        </>
                      ) : (
                        <>
                          <FileText className="mr-2 h-4 w-4" />
                          Read Guide
                        </>
                      )}
                    </Button>
                  </div>
                </DashboardCard>
              ))}
            </div>
          </TabsContent>

          {/* Certifications */}
          <TabsContent value="certifications" className="space-y-6">
            <div className="grid gap-6">
              {certifications.map((cert) => (
                <DashboardCard
                  key={cert.id}
                  title={cert.title}
                  description={cert.description}
                >
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      {cert.earned ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span className="text-sm font-medium text-green-600">
                            Earned on {cert.date}
                          </span>
                        </div>
                      ) : (
                        <Badge variant="outline">Not Earned</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {cert.earned ? (
                        <>
                          <Button variant="outline" size="sm">View Certificate</Button>
                          <Button variant="outline" size="sm">Share</Button>
                        </>
                      ) : (
                        <Button size="sm">Start Certification Path</Button>
                      )}
                    </div>
                  </div>
                </DashboardCard>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
