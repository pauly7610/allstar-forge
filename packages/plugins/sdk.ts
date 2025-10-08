export interface ForgeExtension {
  id: string;
  name: string;
  version: string;
  capabilities: ("security" | "deploy" | "api" | "db")[];
  onInstall?(ctx: any): Promise<void>;
  onEvent?(event: { type: string; payload: any }): Promise<void>;
}


