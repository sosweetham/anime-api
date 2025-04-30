export class CloudflareConfig {
    turnstileSecretKey: string;
    constructor(turnstileSecretKey?: string) {
        if (!turnstileSecretKey) {
            throw new Error("Turnstile secret key is required");
        }
        this.turnstileSecretKey = turnstileSecretKey;
    }
}
