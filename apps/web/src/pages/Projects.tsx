import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface Project { id: string; name: string }

export default function Projects() {
	const qc = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ["projects"],
		queryFn: () => api.get<{ projects: Project[] }>(endpoints.projects.list()),
	});

	const createMutation = useMutation({
		mutationFn: (body: { name: string; template: string; environment: string; team?: string }) =>
			api.post<{ workflowId: string }>(endpoints.projects.create(), body),
		onSuccess: () => {
			toast.success("Project creation started");
			qc.invalidateQueries({ queryKey: ["projects"] });
		},
		onError: (err: unknown) => toast.error((err as Error).message),
	});

	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [template, setTemplate] = useState("starter-api");
	const [environment, setEnvironment] = useState("dev");

	return (
		<div className="grid gap-4">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Projects</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>Create project</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>New Project</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 py-2">
							<div className="grid gap-2">
								<Label htmlFor="name">Name</Label>
								<Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="template">Template</Label>
								<Input id="template" value={template} onChange={(e) => setTemplate(e.target.value)} />
							</div>
							<div className="grid gap-2">
								<Label htmlFor="environment">Environment</Label>
								<Input id="environment" value={environment} onChange={(e) => setEnvironment(e.target.value)} />
							</div>
						</div>
						<DialogFooter>
							<Button
								onClick={() =>
									createMutation.mutate({ name, template, environment }, { onSuccess: () => setOpen(false) })
								}
								disabled={createMutation.isPending || !name}
							>
								Create
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>

			{isLoading ? (
				<p>Loading...</p>
			) : (
				<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
					{data?.projects?.map((p) => (
						<Link key={p.id} to={`/projects/${p.id}`}>
							<Card>
								<CardHeader>
									<CardTitle>{p.name}</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-sm text-muted-foreground">ID: {p.id}</div>
								</CardContent>
							</Card>
						</Link>
					))}
				</div>
			)}
		</div>
	);
}
