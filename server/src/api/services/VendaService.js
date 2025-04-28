import prisma from "../../database/index.js";

class VendaService {
  constructor() {
    this.prisma = prisma;
  }

  async getAll() {
    try {
      const vendas = await this.prisma.venda.findMany();
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
      });
      return createdVenda;
    } catch (error) {
      throw new Error(`Erro ao criar venda: ${error.message}`);
    }
  }

  async update(id, venda) {
    try {
      const updatedVenda = await this.prisma.venda.update({
        where: {
          id,
        },
        data: venda,
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
