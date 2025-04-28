import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categorias = ["Tupperware", "DeMillus", "MaisFit"];
const clientes = [
  "Flavia",
  "Bruno",
  "Tatiane",
  "Cláudia",
  "Larissa",
  "Julia",
  "Helena",
  "Evelyn",
  "Milena",
];
const produtos = {
  Tupperware: [
    { nome: "Tigela Maravilhosa 1L", preco: 59.9 },
    { nome: "Tigela Maravilhosa 750ml", preco: 49.9 },
    { nome: "Garrafa Eco 500ml", preco: 37.9 },
    { nome: "Jeitosinho 800ml", preco: 29.9 },
    { nome: "Criativa 14L", preco: 149.9 },
    { nome: "Jarra Murano 2L", preco: 119.9 },
    { nome: "Tupper Caixa Sal 1.3kg", preco: 41.9 },
    { nome: "Tupper Caixa Feijão Floral 2kg", preco: 72.9 },
    { nome: "Potinho Floral 140ml", preco: 20.9 },
    { nome: "Tigela Mini Cristalwave 390ml", preco: 55.9 },
  ],
  DeMillus: [
    { nome: "Sutiã Greece", preco: 62.99 },
    { nome: "Fio-dental Greece", preco: 19.99 },
    { nome: "Sutiã Atlante", preco: 58.99 },
    { nome: "Calça Clássica Atlante", preco: 29.99 },
    { nome: "Sutiã Candy Baby", preco: 52.99 },
    { nome: "Sutiã Top Lover", preco: 72.99 },
    { nome: "Fio-dental Lover", preco: 25.99 },
    { nome: "Fio-dental Lucilla", preco: 34.99 },
    { nome: "Fio-dental Desejo", preco: 25.99 },
  ],
  MaisFit: [
    { nome: "Doce de Leite", preco: 50.0 },
    { nome: "Brigadeiro Zero", preco: 42.0 },
    { nome: "Cookies and Cream", preco: 42.0 },
    { nome: "Banoffee", preco: 42.0 },
    { nome: "Bombomelo", preco: 42.0 },
    { nome: "Bombom Crocante", preco: 42.0 },
    { nome: "Bombolate", preco: 42.0 },
    { nome: "Choco Trio", preco: 42.0 },
    { nome: "Pudim de Leite Condens.", preco: 42.0 },
  ],
};

const observacoes = {
  Tupperware: [""],
  DeMillus: [
    "Cor: Carmim 05 / Tamanho M",
    "Cor: Branco 20",
    "Cor: Branco 20 / Tamanho G",
    "Cor: Preto 27 / Tamanho P",
    "Cor: Prata 75 / Tamanho M",
    "Cor: Bege / Tamanho G",
  ],
  MaisFit: [""],
};

const getRandomProduto = (categoria) => {
  return produtos[categoria][
    Math.floor(Math.random() * produtos[categoria].length)
  ];
};

const trintaDiasEmMs = 30 * 24 * 60 * 60 * 1000;

async function main() {
  for (let i = 0; i < 20; i++) {
    const c = categorias[Math.floor(Math.random() * categorias.length)];
    const p = getRandomProduto(c);
    const estaPedido = Math.random() > 0.35; // 0.77
    const estaEntregueChance = estaPedido ? Math.random() : 0;
    const estaPagoChance =
      estaPedido && estaEntregueChance > 0.5 ? Math.random() : 0;

    await prisma.venda.create({
      data: {
        categoria: c,
        produto: p.nome,
        cliente: clientes[Math.floor(Math.random() * clientes.length)],
        quantidade: 1,
        preco: p.preco,
        observacao:
          observacoes[c][Math.floor(Math.random() * observacoes[c].length)],
        estaPedido: estaPedido,
        estaEntregue: estaEntregueChance > 0.5,
        estaPago: estaPagoChance > 0.3,
        data: new Date(Date.now() - Math.floor(Math.random() * trintaDiasEmMs)),
      },
    });
  }
}

main()
  .then(() => {
    console.log("Seed concluída!");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
