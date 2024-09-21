export class PostRefreshTokenRequest {
	constructor(public token: string, public refreshToken: string) { }
}
