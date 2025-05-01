import { IsRequiredError } from "./errors";

export class SmtpConfig {
    smtpHost: string;
    smtpPort: number;
    smtpUser: string;
    smtpPass: string;

    constructor(
        smtpHost?: string,
        smtpPort?: string,
        smtpUser?: string,
        smtpPass?: string,
    ) {
        if (!smtpHost) {
            throw new IsRequiredError("SMTP host is required");
        }
        this.smtpHost = smtpHost;
        if (!smtpPort) {
            throw new IsRequiredError("SMTP port is required");
        }
        if (
            Number.parseInt(smtpPort) < 1 ||
            Number.parseInt(smtpPort) > 65535
        ) {
            throw new RangeError(
                "SMTP port must be a number between 1 and 65535",
            );
        }
        this.smtpPort = Number.parseInt(smtpPort);
        if (!smtpUser) {
            throw new IsRequiredError("SMTP user is required");
        }
        this.smtpUser = smtpUser;
        if (!smtpPass) {
            throw new IsRequiredError("SMTP password is required");
        }
        this.smtpPass = smtpPass;
    }
}
