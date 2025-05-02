export class KvsConfig {
    kvsHost: string;
    kvsPort: number;
    constructor(kvsHost?: string, kvsPort?: string) {
        if (!kvsPort) {
            throw new Error("KVS port is required");
        }
        if (Number.parseInt(kvsPort) < 1 || Number.parseInt(kvsPort) > 65535) {
            throw new RangeError(
                "KVS port must be a number between 1 and 65535",
            );
        }
        this.kvsPort = Number.parseInt(kvsPort);
        if (!kvsHost) {
            throw new Error("KVS host is required");
        }
        this.kvsHost = kvsHost;
    }
}
