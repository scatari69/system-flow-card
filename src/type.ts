export type SystemElementDef = {
  invert?: boolean;
  override?: boolean;
  value?: string;
  unit?: string;
  icon?: string;
  color?: string;
  extra?: string | {
    main?: string,
    left?: string,
    right?: string
  };
}

export type ElementDef = Omit<SystemElementDef, "value"> & {
  value: string | {
    toSystem?: string;
    fromSystem?: string;
  };
  position: "top" | "left" | "bottom" | "right" | "middle";
  fill?: string;
  invert?: boolean;
  exclude?: boolean;
};

export type CalculatedElementDef = ElementDef & {
  extra?: undefined | {
    main?: string,
    left?: string,
    right?: string
  },
  display?: string | number;
  calculations: {
    toSystem: number,
    fromSystem: number | null,
    systemTotal: number
  },
};