import prisma from "../../database/index.js";

class VendaService {
  constructor() {
    this.prisma = prisma;
  }

  vendaSelect = {
    id: true,
    categoria: true,
    produto: true,
    cliente: true,
    quantidade: true,
    preco: true,
    observacao: true,
    estaPedido: true,
    estaPago: true,
    data: true,
  };

  async getAll() {
    try {
      const vendas = await this.prisma.venda.findMany({
        select: this.vendaSelect,
        orderBy: {
          data: "desc",
        },
      });
      return vendas;
    } catch (error) {
      throw new Error(`Erro ao buscar vendas: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const venda = await this.prisma.venda.findUnique({
        where: {
          id,
        },
        select: this.vendaSelect,
      });
      return venda;
    } catch (error) {
      throw new Error(`Erro ao buscar venda: ${error.message}`);
    }
  }

  async create(venda) {
    try {
      const createdVenda = await this.prisma.venda.create({
        data: venda,
        select: this.vendaSelect,
      });
      return createdVenda;
    } catch (error) {
      throw new Error(`Erro ao criar venda: ${error.message}`);
    }
  }

  async update(id, updates) {
    try {
      const updatedVenda = await this.prisma.venda.update({
        where: {
          id,
        },
        data: updates,
        select: this.vendaSelect,
      });
      return updatedVenda;
    } catch (error) {
      throw new Error(`Erro ao atualizar venda: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      await this.prisma.venda.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(`Erro ao deletar venda: ${error.message}`);
    }
  }
}

const service = new VendaService();

export default service;
