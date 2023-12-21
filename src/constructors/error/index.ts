import { IApiError } from "@/types/apiError";
import status from 'http-status';

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
            status: status.BAD_REQUEST
        })
    }

    static notModified(errors: Record<string, unknown>) {
        return new ApiError({
            message: status[304],
            errors,
            status: status.BAD_REQUEST
        })
    }

    static unathorized(errors: Record<string, unknown>) {
        return new ApiError({
            message: status[401],
            errors,
            status: status.UNAUTHORIZED
        })
    }

    static notFound(errors: Record<string, unknown>) {
        return new ApiError({
            message: status[404],
            errors,
            status: status.NOT_FOUND
        })
    }

    static unProcessableEntity(errors: Record<string, unknown>) {
        return new ApiError({
            message: status[403],
            errors,
            status: status.UNPROCESSABLE_ENTITY
        })
    }
}
