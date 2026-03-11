//Funcinoes de confirmacion de la API en python

import { Estado } from '@/app/tipos/raceway';

const BASE_URL = 'http://localhost:8000';
// const BASE_URL = 'http://localhost:3333'

export async function fetchEstado(): Promise<Estado> {

  const res = await fetch(`${BASE_URL}/datos`);
  if (!res.ok) throw new Error('Error al obtener el estado');

  return res.json();
}

export async function fase(estado: boolean, direccion: boolean): Promise<void> {

  const response = await fetch(`${BASE_URL}/${estado}?direccion=${direccion}`, { method: 'POST' });
  if (!response.ok) throw new Error(`No se pudo hacer la tarea`);
}

export async function toggleValvula(valvula: string, abrir: boolean): Promise<void> {
  const res = await fetch(`${BASE_URL}/${valvula}/${abrir ? 'open' : 'close'}`, { method: 'POST' });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail ?? 'Error al accionar valvula');
  }
}