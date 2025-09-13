export interface GenerateContentRequest {
    prompt: string;
}

export interface GenerateContentResponse {
    loading: boolean;
    response?: string;
    error?: string;
}

export interface GeminiRequest {
    prompt: string;
}

export interface GeminiResponse {
    candidates?: Array<{ content: string }>;
    [key: string]: any;
}