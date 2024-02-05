const preparaPermissoes = function (permissoes, grupoUsuario) {
  const novasPermissoes = []
  for (const key in permissoes) {
    const permissaoPadrao = {}
    permissaoPadrao.abrir = 0
    permissaoPadrao.inserir = 0
    permissaoPadrao.alterarProprio = 0
    permissaoPadrao.alterarOutros = 0
    permissaoPadrao.excluirProprio = 0
    permissaoPadrao.excluirOutros = 0
    permissaoPadrao.relatorios = 0
    permissaoPadrao.codigo = key
    permissaoPadrao.grupoUsuario = grupoUsuario

    if (permissoes[key]) {
      permissoes[key].forEach(chave => {
        permissaoPadrao[chave] = 1
      })
      novasPermissoes.push(permissaoPadrao)
    }
  }

  return novasPermissoes
}
module.exports = function () {
  return preparaPermissoes
}
