export default {
  mixed: {
    default: '${path} es invalido',
    required: '${path} es un campo requerido',
    oneOf: '${path} debe contener uno de los siguientes valores: ${values}',
    notOneOf:
      '${path} no debe contener uno de los siguientes valores: ${values}'
  },
  string: {
    length: '${path} debe contener exactamente ${length} caracteres',
    min: '${path} debe tener al menos ${min} caracteres',
    max: '${path} debe tener como máximo ${max} characters',
    matches: '${path} debe conincidir con la siguiente serie: "${regex}"',
    email: '${path} debe contener un correo valido',
    url: '${path} debe contener una URL valida',
    trim: '${path} debe contener un string trimmed',
    lowercase: '${path} debe ser un string en minusculas',
    uppercase: '${path} debe ser un string en mayusculas'
  },
  number: {
    min: '${path} debe ser mayor o igual a ${min}',
    max: '${path} debe ser menor o igual a ${max}',
    lessThan: '${path} debe ser menor que ${less}',
    moreThan: '${path} debe ser mayor que ${more}',
    notEqual: '${path} no debe ser igual a ${notEqual}',
    positive: '${path} debe ser un número positivo',
    negative: '${path} debe ser un número negativo',
    integer: '${path} debe ser un entero'
  },
  date: {
    min: '${path} campo debe ser mayor que ${min}',
    max: '${path} campo debe ser menor a ${max}'
  },
  object: {
    noUnknown:
      '${path} campo no puede tener llaves no especificadas dentro del objeto'
  },
  array: {
    min: '${path} campo debe contener al menos ${min} items',
    max: '${path} campo debe contener como máximo ${max} items'
  }
};
