import { cleanup } from "../scripts";

export const handleSigInt = () => {
    console.log("Received SIGINT, cleaning up...");
    cleanup();
};

export const handleSigTerm = () => {
    console.log("Received SIGTERM, cleaning up...");
    cleanup();
};

export const handleExit = () => {
    console.log("Exiting, cleaning up...");
    cleanup();
};
