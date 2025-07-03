/**
 * Parses and formats error messages from API responses
 */
export async function parseApiError(response: Response, fallbackMessage: string): Promise<string> {
    try {
        const errorData = await response.json()
        console.log('Error response:', errorData) // Debug log

        // Handle Zod validation errors from API
        if (errorData.details && Array.isArray(errorData.details)) {
            const validationErrors = errorData.details
                .map((err: { path?: string[]; message: string }) => {
                    const fieldName = err.path?.join('.') || 'field'
                    return `${fieldName}: ${err.message}`
                })
                .join(', ')
            return validationErrors
        }

        // Try other possible error message fields
        return (
            errorData.message ||
            errorData.error ||
            (errorData.details && typeof errorData.details === 'string' ? errorData.details : JSON.stringify(errorData.details)) ||
            fallbackMessage
        )
    } catch (parseError) {
        console.error('Failed to parse error response:', parseError)
        return `${fallbackMessage} (${response.status})`
    }
}

/**
 * Formats error messages for display to users
 */
export function formatErrorMessage(error: unknown, fallbackMessage: string): string {
    if (error instanceof Error) {
        return error.message
    }
    return fallbackMessage
}
