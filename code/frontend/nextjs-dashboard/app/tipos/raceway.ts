// ─── Depósitos ────────────────────────────────────────────────────────────────

export type Deposito = {
  nivel: number;
  sensor_minimo: boolean;
  sensor_maximo: boolean;
  valvula_vaciado: boolean;
  valvula_llenado: boolean;
};

export type Estado = {
  motor: {
    encendido: boolean;
    forward: boolean;
  };
  dep_raceway: Deposito;
  dep_cultivo:  Deposito;
  dep_cosecha:  Deposito;
};

// ─── Time Settings ────────────────────────────────────────────────────────────

export type DepositoTiempos = {
  valvula_llenado: number;
  valvula_vaciado: number;
};

export type TimeSettings = {
  dep_raceway: DepositoTiempos;
  dep_cultivo:  DepositoTiempos;
  dep_cosecha:  DepositoTiempos;
};

// ─── Tarjetas de control ──────────────────────────────────────────────────────

export type FuncionMotor = {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  accion: string;
  color: string;
  hoverColor: string;
  btnColor: string;
  onClick: () => Promise<void>;
};

export type FuncionOverview = {
  id: number;
  titulo: string;
  utilidad: string;
  aplicaciones: string[];
  icono: string;
  gradiente: string;
  acento: string;
  tag: string;
};

export type StatItem = {
  valor: string;
  label: string;
};

export type NivelItem = {
  label: string;
  nivel: number;
  color: string;
};

export type MetricFileName =
  | 'detailed_df_t.json'
  | 'detailed_df_t1_ext.json'
  | 'detailed_df_t1.json';