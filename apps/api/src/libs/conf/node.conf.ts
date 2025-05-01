import { IsRequiredError } from "./errors";

export class NodeConfig {
    nodeEnv: "development" | "production" | "test";
    constructor(nodeEnv?: string) {
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
    }
}
