export class ClientConfig {
    clientHost: string;
    constructor(clientHost?: string) {
        if (!clientHost) {
            throw new Error("Client host is required");
        }
        this.clientHost = clientHost;
    }
}
