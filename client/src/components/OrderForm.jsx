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
} from '@mui/material';
import { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// {
//   Form Fields (shown attributes)
//   "categoria": "MaisFit", -- dropdown menu (OK)
//   "produto": "Doce de Leite", --  text field (OK)
//   "cliente": "Milena", -- text field (OK)
//   "quantidade": 1, -- number field (+, - buttons) (OK)
//   "preco": "50", -- number field (2 decimals) (OK)
//   "observacao": "", -- text field (OK)
//   "data": "2025-04-11T12:33:42.546Z", -- datepicker, defaults to today

//   Hidden Attributes
//   "id": 1
//   "estaPedido": false,
//   "estaPago": false,
//   "createdAt": "2025-04-28T22:38:01.199Z",
//   "updatedAt": "2025-04-28T22:38:01.199Z"
// }

const categorias = ['DeMillus', 'Tupperware', 'MaisFit'];

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

const OrderForm = ({ order = null, setVendas, ...props }) => {
  const [formData, setFormData] = useState(getStateObject(order));
  const [initialState, setInitialState] = useState(getStateObject(order));
  const mode = order ? 'edit' : 'new';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'new') {
      console.log('New Order');
    } else {
      console.log('Edit Order');
    }
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
          <Button variant="contained" size="large" type="submit">
            Salvar
          </Button>
        </Stack>
      )}
    </Paper>
  );
};

export default OrderForm;
