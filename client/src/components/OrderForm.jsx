import { useState } from 'react';
import dayjs from 'dayjs';

import {
  Paper,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import { createVenda, updateVenda, deleteVenda } from '@/api/vendas';

const categorias = ['DeMillus', 'Tupperware', 'MaisFit'];

const ordenarPorData = (arr) => {
  return [...arr].sort((a, b) => new Date(b.data) - new Date(a.data));
};

const getStateObject = (order) => {
  return order
    ? {
        ...order,
        data: dayjs(order.data),
      }
    : {
        categoria: '',
        produto: '',
        cliente: '',
        quantidade: 1,
        preco: '',
        observacao: '',
        data: dayjs(new Date()),
      };
};

const OrderForm = ({ order = null, setVendas, handleCloseModal, ...props }) => {
  const [formData, setFormData] = useState(getStateObject(order));
  const [initialState, setInitialState] = useState(getStateObject(order));
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const mode = order ? 'edit' : 'new';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode === 'new') {
      const novaVenda = await createVenda(formData);
      setVendas((prev) => ordenarPorData([...prev, novaVenda]));
      handleCloseModal();
    } else {
      const changes = Object.keys(initialState).reduce((acc, key) => {
        if (initialState[key] !== formData[key]) {
          acc[key] = formData[key];
        }
        return acc;
      }, {});
      if (Object.keys(changes).length === 0) return;
      const vendaAtualizada = await updateVenda(order.id, changes);
      setVendas((prev) =>
        ordenarPorData(
          prev.map((venda) =>
            venda.id === order.id ? vendaAtualizada : venda,
          ),
        ),
      );
      handleCloseModal();
    }
  };

  const handleDeleteVenda = async () => {
    await deleteVenda(order.id);
    setVendas((prev) => prev.filter((venda) => venda.id !== order.id));
    handleCloseModal();
  };

  return (
    <Paper
      variant="elevation"
      elevation={4}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '400px',
        maxWidth: '700px',
        p: 3,
        m: 0,
      }}
    >
      <Typography variant="h2" mb={3} align="center">
        {order ? 'Editar Pedido' : 'Novo Pedido'}
      </Typography>
      {formData && (
        <Stack
          component="form"
          direction="column"
          spacing={2}
          onSubmit={handleSubmit}
        >
          <FormControl>
            <InputLabel>Categoria *</InputLabel>
            <Select
              id="categoria"
              label="Categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              fullWidth
              required
            >
              {categorias.map((categoria, index) => (
                <MenuItem key={index} value={categoria}>
                  {categoria}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="produto"
            label="Produto"
            name="produto"
            value={formData.produto}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="cliente"
            label="Cliente"
            name="cliente"
            value={formData.cliente}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="observacao"
            label="Observação"
            name="observacao"
            value={formData.observacao}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="preco"
            label="Preço"
            name="preco"
            type="number"
            value={formData.preco}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            id="quantidade"
            label="Quantidade"
            name="quantidade"
            type="number"
            value={formData.quantidade}
            onChange={handleChange}
            fullWidth
            required
          />
          <DatePicker
            label="Data"
            value={formData.data}
            onChange={(value) => {
              setFormData((prev) => ({
                ...prev,
                data: dayjs(value),
              }));
            }}
            id="data"
          />
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              startIcon={<SaveIcon />}
            >
              Salvar
            </Button>
            {mode === 'edit' && (
              <Button
                variant="contained"
                color="error"
                size="large"
                type="button"
                fullWidth
                onClick={() => setIsDialogOpen(true)}
                startIcon={<DeleteIcon />}
              >
                Excluir
              </Button>
            )}
          </Stack>
        </Stack>
      )}
      {mode === 'edit' && (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
          <Stack p={3} spacing={2}>
            <Typography variant="h2">Você tem certeza disso?</Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setIsDialogOpen(false)}
              >
                Não, voltar
              </Button>
              <Button
                variant="contained"
                color="error"
                fullWidth
                onClick={handleDeleteVenda}
              >
                Sim, excluir
              </Button>
            </Stack>
          </Stack>
        </Dialog>
      )}
    </Paper>
  );
};

export default OrderForm;
