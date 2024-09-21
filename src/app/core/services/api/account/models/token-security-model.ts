export interface TokenSecurityModel {
	sub: string;
	jti: string;
	email: string;
	"http://schemas.xmlsoap.org/ws/2005/05/identity/claims/system": string; // to which app this token for
	uid: string;
	"http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
	exp: number;
	iss: string;
	aud: string;
}
