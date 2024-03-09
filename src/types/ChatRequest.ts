type ChatRequest = {
    model: string;
    messages: { role: string; content: string }[];
    temperature: number;
}

export default ChatRequest;
