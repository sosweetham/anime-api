export class IsRequiredError extends Error {
    constructor(message = "This field is required") {
        super(message);
        this.name = "IsRequiredError";
    }
}
