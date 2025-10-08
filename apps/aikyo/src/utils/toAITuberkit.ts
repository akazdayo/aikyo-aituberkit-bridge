import WebSocket from "ws";

interface AITuberkitBridge {
    send: (data: string) => void;
    close: () => void;
    onMessage: (callback: (data: string) => void) => void;
}