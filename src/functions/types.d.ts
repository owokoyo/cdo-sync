type compilerType = "babel" | "typescript" | "none";
type projectType = "gamelab" | "applab";
type config = {
  compilerType: compilerType;
  projectType: projectType;
  cookie: string;
  channelId: string;
  rootPath: string;
};
type library = {
  code?: string
  name: string;
  channelId: string
  description: string
  versionId: string
  source: string
  functions: string[]
  dropletConfig: { category: string, comment: string, func: string, type: "either" }[]
}
export { compilerType, projectType, config, library };
