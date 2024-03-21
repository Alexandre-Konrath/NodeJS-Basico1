const express = require("express")
const server = express(); // fez a requisição e esta iniciando como servidor

// req // requisição =  pega os parametros de consulta e de rota
server.get("/hello", (req, res) => {
  const { nome, idade } = req.query

  return res.json({
    message: `Olá ${nome} tudo bem`,
    idade: idade
  })
})

server.get("/hello/:nome", (req, res) => {
  const nome = req.params.nome

  return res.json({
    message: `Olá ${nome} tudo bem`
  })
})

server.listen(3000)
