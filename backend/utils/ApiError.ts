class ApiError extends Error {
    statusCode: number;
    message: string;
    success: boolean;
    data?: any;
    errors?: string[];
    stack?: string | undefined;

    constructor(
        statusCode: number,
        message: string,
        data: any = null,
        errors: string[] = [],
        stack?: string | undefined
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message
        this.success = statusCode < 400;
        this.data = data;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };