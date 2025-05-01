import { IsRequiredError } from "./errors";

export class DbConfig {
    dbUrl: URL;
    dbNamespace: string;
    dbDatabase: string;
    dbUsername: string;
    dbPassword: string;
    constructor(
        dbUrl?: URL | string,
        dbNamespace?: string,
        dbDatabase?: string,
        dbUsername?: string,
        dbPassword?: string,
    ) {
        if (!dbUrl) {
            throw new IsRequiredError("Database URL is required");
        }
        if (typeof dbUrl === "string") {
            try {
                this.dbUrl = new URL(dbUrl);
            } catch (e) {
                throw new IsRequiredError("Invalid database URL");
            }
        } else {
            this.dbUrl = dbUrl;
        }
        if (!dbNamespace) {
            throw new IsRequiredError("Database namespace is required");
        }
        this.dbNamespace = dbNamespace;
        if (!dbDatabase) {
            throw new IsRequiredError("Database name is required");
        }
        this.dbDatabase = dbDatabase;
        if (!dbUsername) {
            throw new IsRequiredError("Database username is required");
        }
        this.dbUsername = dbUsername;
        if (!dbPassword) {
            throw new IsRequiredError("Database password is required");
        }
        this.dbPassword = dbPassword;
    }
}
