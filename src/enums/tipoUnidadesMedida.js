export const tipoUnidadMedidas = {
  Unidad: 0,
  Par: 1,
  Docena: 2,
  Gramo: 3,
  Kilogramo: 4,
  Litro: 5,
  Milimetro: 6,
  Centimetro: 7,
  Metro: 8,
  MetroCuadrado: 9,
  CentimetroCuadrado: 10,
};

export const unidadesCompatibles = {
  Unidad: ["Unidad"],
  Par: ["Par"],
  Docena: ["Docena"],
  Gramo: ["Gramo", "Kilogramo"],
  Kilogramo: ["Kilogramo", "Gramo"],
  Litro: ["Litro"],
  Milimetro: ["Milimetro", "Centimetro", "Metro"],
  Centimetro: ["Milimetro", "Centimetro", "Metro"],
  Metro: ["Milimetro", "Centimetro", "Metro"],
  MetroCuadrado: ["MetroCuadrado", "CentimetroCuadrado"],
  CentimetroCuadrado: ["MetroCuadrado", "CentimetroCuadrado"],
};

export const factoresConversion = {
  Kilogramo: {
    Kilogramo: 1,
    Gramo: 1000,
  },
  Gramo: {
    Gramo: 1,
    Kilogramo: 1 / 1000,
  },
  Milimetro: {
    Milimetro: 1,
    Centimetro: 1 / 10,
    Metro: 1 / 1000,
  },
  Centimetro: {
    Centimetro: 1,
    Milimetro: 10,
    Metro: 1 / 100,
  },
  Metro: {
    Metro: 1,
    Milimetro: 1000,
    Centimetro: 100,
  },
  MetroCuadrado: {
    MetroCuadrado: 1,
    CentimetroCuadrado: 10000,
  },
  CentimetroCuadrado: {
    CentimetroCuadrado: 1,
    MetroCuadrado: 1 / 10000,
  },
  Unidad: {
    Unidad: 1,
  },
  Par: {
    Par: 1,
  },
  Docena: {
    Docena: 1,
  },
  Litro: {
    Litro: 1,
  },
};
