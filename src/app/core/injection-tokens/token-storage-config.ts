import { TokenModel } from "../services/api/account/models/token-model";

export interface TokenStorageConfig {
	retrieve: () => Promise<TokenModel>;
	store: (value: TokenModel | null) => Promise<TokenModel | null>;
}
