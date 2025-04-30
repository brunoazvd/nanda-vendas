import { Paper, Typography } from '@mui/material';
import { useState } from 'react';

// {
//   Form Fields (shown attributes)
//   "categoria": "MaisFit", -- dropdown menu
//   "produto": "Doce de Leite", --  text field
//   "cliente": "Milena", -- text field
//   "quantidade": 1, -- number field (+, - buttons)
//   "preco": "50", -- number field (2 decimals)
//   "observacao": "", -- text field
//   "data": "2025-04-11T12:33:42.546Z", -- datepicker, defaults to today

//   Hidden Attributes
//   "id": 1
//   "estaPedido": false,
//   "estaPago": false,
//   "createdAt": "2025-04-28T22:38:01.199Z",
//   "updatedAt": "2025-04-28T22:38:01.199Z"
// }

const emptyOrder = {
  categoria: '',
  produto: '',
  cliente: '',
  quantidade: null,
  preco: null,
  observacao: '',
  data: '',
};

const OrderForm = ({ order = null, ...props }) => {
  const [formData, setFormData] = useState(order || emptyOrder);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      <Typography variant="h2">OrderForm</Typography>
    </Paper>
  );
};

export default OrderForm;
