import { IApiError } from "@/types/apiError";
import { Statuses } from "@/types/statuses";

export class ApiError extends Error {
    status: number;
    errors: Record<string, unknown>;  
    constructor({ message, status, errors = {}}: IApiError) {
        super(message);

        this.status = status;
        this.errors = errors;
    }

    static badRequest(message: string , errors: Record<string, unknown>) {
        return new ApiError({
            message,
            errors,
            status: Statuses.BAD_REGUET
        })
    }
    static unathorized(errors: Record<string, unknown>) {
        return new ApiError({
            message: 'unauthorized user',
            errors,
            status: Statuses.UNATHORIZED
        })
    }
    static notFound(errors: Record<string, unknown>) {
        return new ApiError({
            message: 'not found',
            errors,
            status: Statuses.NOT_FOUND
        })
    }
}
