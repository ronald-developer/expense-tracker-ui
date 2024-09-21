export interface ApiTokenConfig {
	// Identifies the resource or action
	composeUrl: (urlPath: string) => string;
	apiKey?: string;
}
