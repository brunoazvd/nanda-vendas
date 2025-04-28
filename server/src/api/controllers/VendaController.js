import VendaService from "../services/VendaService.js";

export default {
  async buscarTodasVendas(req, res) {
    try {
      const vendas = await VendaService.getAll();
      res.status(200).json(vendas);
    } catch (err) {
      res.status(400).json({ error: true, message: err.message });
    }
  },

  async buscarVendaPorId(req, res) {
    try {
      const venda = await VendaService.getById(Number(req.params.id));
      res.status(200).json(venda);
    } catch (err) {
      res.status(400).json({ error: true, message: err.message });
    }
  },

  async cadastrarVenda(req, res) {
    try {
      const venda = await VendaService.create(req.body);
      res.status(200).json(venda);
    } catch (err) {
      res.status(400).json({ error: true, message: err.message });
    }
  },

  async atualizarVenda(req, res) {
    try {
      const venda = await VendaService.update(Number(req.params.id), req.body);
      res.status(200).json(venda);
    } catch (err) {
      res.status(400).json({ error: true, message: err.message });
    }
  },

  async deletarVenda(req, res) {
    try {
      await VendaService.delete(Number(req.params.id));
      res.status(200).json({ message: "Venda deletada com sucesso!" });
    } catch (err) {
      res.status(400).json({ error: true, message: err.message });
    }
  },
};
