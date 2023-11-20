export interface IApiError {
    message: string, 
    status: number, 
    errors: Record<string, unknown> 
}
