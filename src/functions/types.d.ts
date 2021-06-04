type compilerType = "babel" | "typescript" | "none";
type projectType = "gamelab" | "applab";
type config = {
  compilerType: compilerType;
  projectType: projectType;
  cookie: string;
  channelId: string;
  rootPath: string;
};
export { compilerType, projectType, config };
