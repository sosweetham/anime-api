import { IsRequiredError } from "./errors";

export class NodeConfig {
    nodeEnv: "development" | "production" | "test";
    platform: "container" | "host";
    port: number;
    constructor(nodeEnv?: string, platform?: string, port?: string) {
        if (!nodeEnv) {
            throw new IsRequiredError("Node environment is required");
        }
        if (
            nodeEnv !== "development" &&
            nodeEnv !== "production" &&
            nodeEnv !== "test"
        ) {
            throw new RangeError(
                "Node environment must be development, production or test",
            );
        }
        this.nodeEnv = nodeEnv as "development" | "production" | "test";
        if (!platform || platform === "") {
            throw new IsRequiredError("Platform is required");
        }
        this.platform = platform as "container" | "host";
        if (!port) {
            throw new IsRequiredError("Port is required");
        }
        if (Number.parseInt(port) < 1 || Number.parseInt(port) > 65535) {
            throw new RangeError("Port must be a number between 1 and 65535");
        }
        this.port = Number.parseInt(port);
    }
}
