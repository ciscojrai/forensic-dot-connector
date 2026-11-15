export interface BuildConfig {
  windowConfig?: {
    width?: number;
    height?: number;
    title?: string;
  };
  getIgnoreFolder?: (patterns: unknown) => unknown;
  langPath?: string;
}
export class UgosViteBuilder {
  constructor(config: BuildConfig);
  pluginEntry(options?: unknown): any[];
}
