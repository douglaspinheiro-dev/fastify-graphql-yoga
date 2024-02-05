module.exports = {
  formataPaginacao: (registros, fim) => {
    let fimDaLista = false
    if (registros.length < fim) {
      fimDaLista = true
    }
    return {
      fim: fimDaLista,
      registros
    }
  },
  formataCamposFiltro: (object) => {
    object = JSON.parse(object)

    let query = ' '

    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const value = object[key]
        query = query + ` AND ${key} = ${value} `
      }
    }
    return query
  }
}
