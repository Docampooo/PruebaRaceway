from fastapi import WebSocket
from datetime import datetime
from typing import List
import asyncio
import random


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.broadcast_task = None

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        print(f"Cliente conectado. Total: {len(self.active_connections)}")
        
      
    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        print(f"Cliente desconectado. Total: {len(self.active_connections)}")
        
        if len(self.active_connections) == 0 and self.broadcast_task:
            self.broadcast_task.cancel()
            self.broadcast_task = None