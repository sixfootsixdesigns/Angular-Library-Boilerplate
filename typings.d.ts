/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

/* allow markdown files to be imported in storybook */
declare module "*.md" {
  const value: string;
  export default value;
}
