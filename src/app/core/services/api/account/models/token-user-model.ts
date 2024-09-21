import { TokenSecurityModel } from "./token-security-model";

export class TokenUserModel {

	constructor(model: TokenSecurityModel) {
		this.id = model.uid;
		this.email = model.email || '';
		this.roles = this.setRoles(model['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
		this.expiresAt = model.exp;
	}

	id: string;
	email: string;
	roles: string[];
	expiresAt: number;
	private setRoles(roles: any) {
		let result = [];
		if (roles && !Array.isArray(roles)) {
			result = typeof roles === 'object' ? JSON.parse(roles) : roles;
		} else {
			result = roles;
		}
		return result;
	}

	get tokenExpired() {
		if (!this.expiresAt || this.expiresAt <= new Date().getTime() / 1000) {
			return true;
		}

		return false;
	}

	get tokenDuration() {
		if (this.tokenExpired) {
			return 0;
		} else {
			const remaining = (this.expiresAt * 1000) - new Date().getTime();
			return remaining;
		}
	}
}
