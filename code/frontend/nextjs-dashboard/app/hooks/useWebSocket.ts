//Toda la gestion de uso de webSockets con la api intermedia

'use client';

import { useEffect, useState } from 'react';
import { Estado } from '@/app/tipos/raceway';

export function useWebSocket(url: string) {

  const [estado, setEstado] = useState<Estado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ultimaActualizacion, setUltimaActualizacion] = useState<string>('');

  useEffect(() => {
    let ws: WebSocket;
    let intentos = 0;
    let cancelado = false;

    const conectar = () => {
      if (cancelado) return;

      ws = new WebSocket(url);

      ws.onopen = () => {
        setError(null);
        intentos = 0;
      };

      ws.onmessage = (event) => {
        const datos = JSON.parse(event.data);
        setEstado(datos);
        setUltimaActualizacion(new Date().toLocaleTimeString());
      };

      ws.onerror = () => setError('Sin conexion con la API');

      ws.onclose = () => {
        if (cancelado) return;
        intentos++;
        const espera = Math.min(1000 * intentos, 10000);
        setError(`Conexion cerrada. Reconectando en ${espera / 1000}s...`);
        setTimeout(conectar, espera);
      };
    };

    conectar();

    return () => {
      cancelado = true;
      ws?.close();
    };
  }, [url]);

  return { estado, error, ultimaActualizacion };
}