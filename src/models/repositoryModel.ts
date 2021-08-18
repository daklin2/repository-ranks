export enum Languages {
  JAVA_SCRIPT = "javascript",
  TYPE_SCRIPT = "typescript",
  JAVA = "java",
  SCALA = "scala",
  RUBY = "ruby",
  PYTHON= "python",
  ALL = "",
}

export interface RepositoryModel {
  login: string;
  avatarUrl: string;
  stars: number;
  repositoryUrl: string;
}