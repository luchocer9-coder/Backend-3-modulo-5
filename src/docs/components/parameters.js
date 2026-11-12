export const parameters = {
  IdParam: {
    name: 'id',
    in: 'path',
    required: true,
    description: 'Id de MongoDB (24 caracteres hexadecimales)',
    schema: { type: 'string', example: '6af38d8e956809dfdcdde832' },
  },
  QtyParam: {
    name: 'qty',
    in: 'query',
    required: false,
    description:
      'Cantidad de registros a generar: un entero entre 1 y 100. Si no se envía, se usan 5. Un negativo da NEGATIVE_MOCK_QTY y cualquier otro valor fuera de rango da INVALID_MOCK_QTY',
    schema: { type: 'integer', default: 5, example: 5 },
  },
};
