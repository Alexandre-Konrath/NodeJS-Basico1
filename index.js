const express = require("express")
const server = express(); // fez a requisição e esta iniciando como servidor

// req // requisição =  pega os parametros de consulta e de rota
server.use(express.json())

let customers = [
  { id: 1, nome: "google", site: "https://google.com" },
  { id: 2, nome: "youtube", site: "https://youtube.com" },
  { id: 3, nome: "twitch", site: "https://thaisa.com" },
  { id: 4, nome: "github", site: "https://github.com" }
]

server.get("/customers", (req, res) => {
  return res.json(customers) // retorna todos os customers
})

server.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id) // resgatar o parametro id, e usar o parseInt para transformar de strig para numerico
  const customer = customers.find(item => item.id === id) // busca o primeiro item do array
  const status = customer ? 200 : 404

  return res.status(status).json(customer)
})

server.post("/customers", (req, res) => {
  const { nome, site } = req.body // req.body = conteudo da mensagem = json
  const id = customers[customers.length - 1].id + 1 // ultimo customers, id dele e somar mais 1

  const newCustomer = { id, nome, site } // novo customer
  customers.push(newCustomer)

  return res.status(201).json(newCustomer)
})

server.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id) // recuperar o id
  const { nome, site } = req.body // recuperar os parametros

  const index = customers.findIndex(item => item.id === id) // retorna o index do array
  const status = index >= 0 ? 200 : 404

  if (index >= 0) {
    customers[index] = { id: parseInt(id), nome, site } // construir um novo objeto passando nome, site
  }

  return res.status(status).json(customers[index]) // retorna o customer q realizou a atualização
})

server.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id) // receber o id e localizar o index

  const index = customers.findIndex(item => item.id === id)
  const status = index >= 0 ? 200 : 404

  if (index >= 0) {
    customers.splice(index, 1)// remove um objeto em uma posição específica e a quantidade = 1
  }

  return res.status(status).json()
})


server.listen(3000)
