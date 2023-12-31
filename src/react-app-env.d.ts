/// <reference types="react-scripts" />

declare module "*.pdf" {
    const content: any;
    export default content;
}

declare module "*.md" {
    const value: string;
    export default value;
}