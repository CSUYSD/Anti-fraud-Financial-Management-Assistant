import { useRef, useCallback,useEffect } from 'react';

export function useSSE(onMessageCallback) {
    const sseSourceRef = useRef(null);

    // 建立 SSE 连接
    const connectSSE = useCallback((sessionId, prompt) => {
        if (sseSourceRef.current) {
            sseSourceRef.current.close();
        }

        // 创建新的 SSE 连接
        const params = new URLSearchParams({ prompt, sessionId });
        sseSourceRef.current = new EventSource(`/message/chat/stream/history?${params.toString()}`);

        // 处理接收到的消息
        sseSourceRef.current.onmessage = (event) => {
            const messagePart = event.data;
            if (onMessageCallback) {
                onMessageCallback(messagePart);
            }
        };

        sseSourceRef.current.onerror = () => {
            console.error('SSE connection error');
            sseSourceRef.current.close(); // 出现错误时关闭连接
        };
    }, [onMessageCallback]);

    // 关闭 SSE 连接
    const closeSSE = useCallback(() => {
        if (sseSourceRef.current) {
            sseSourceRef.current.close();
        }
    }, []);

    return { connectSSE, closeSSE };
}
