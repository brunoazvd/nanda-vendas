import { Router } from "express";
import VendaController from "../controllers/VendaController";

const router = Router();

router.get("/api/vendas", VendaController.buscarTodasVendas);
router.get("/api/vendas/:id", VendaController.buscarVendaPorId);
router.post("/api/vendas", VendaController.cadastrarVenda);
router.put("/api/vendas/:id", VendaController.atualizarVenda);
router.delete("/api/vendas/:id", VendaController.deletarVenda);

export default router;
