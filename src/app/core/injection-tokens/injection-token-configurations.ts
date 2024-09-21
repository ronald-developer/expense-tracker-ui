import { InjectionToken } from "@angular/core";
import { ApiTokenConfig } from "./api-token-config";
import { TokenStorageConfig } from "./token-storage-config";

export const APP_API_URL_CFG = new InjectionToken<ApiTokenConfig>('APP_API_URL_CFG');
export const TOKEN_STORAGE_CFG = new InjectionToken<TokenStorageConfig>('TOKEN_STORAGE_CFG');
