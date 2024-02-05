
module.exports = class ExisteRegistro extends Error {
  constructor(message) {
    super(message, '423');

    Object.defineProperty(this, 'name', { value: 'ExisteRegistro' });
  }
}
