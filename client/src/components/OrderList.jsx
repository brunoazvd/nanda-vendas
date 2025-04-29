import { Box, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { updateVenda } from '@/api/vendas';

// {
//   "id": 12,
//   "categoria": "MaisFit",
//   "produto": "Doce de Leite",
//   "cliente": "Milena",
//   "quantidade": 1,
//   "preco": "50",
//   "observacao": "",
//   "estaPedido": false,
//   "estaEntregue": false,
//   "estaPago": false,
//   "data": "2025-04-11T12:33:42.546Z",
//   "createdAt": "2025-04-28T22:38:01.199Z",
//   "updatedAt": "2025-04-28T22:38:01.199Z"
// }

const OrderList = ({ orders, setOrders, ...props }) => {
  const collumns = [
    {
      field: 'data',
      headerName: 'Data',
      width: 120,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    { field: 'categoria', headerName: 'Categoria', width: 120 },
    { field: 'produto', headerName: 'Produto', width: 200 },
    { field: 'cliente', headerName: 'Cliente', width: 120 },
    { field: 'quantidade', headerName: 'Qtd', width: 50 },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 80,
      valueFormatter: (value) => `R$ ${Number(value).toFixed(2)}`,
    },
    { field: 'observacao', headerName: 'Observação', width: 200 },
    {
      field: 'estaPedido',
      headerName: 'Pedido',
      width: 80,
      renderCell: (value) => (
        <Checkbox
          checked={value.row.estaPedido}
          onClick={(e) => {
            updateBooleanValue(value.row.id, value.field);
          }}
        />
      ),
    },
    {
      field: 'estaPago',
      headerName: 'Pago',
      width: 80,
      renderCell: (value) => (
        <Checkbox
          checked={value.row.estaPago}
          onClick={(e) => {
            updateBooleanValue(value.row.id, value.field);
          }}
        />
      ),
    },
  ];

  const updateBooleanValue = async (id, field) => {
    const order = orders.find((order) => order.id === id);
    order[field] = !order[field];
    await updateVenda(id, { [field]: order[field] });
    const updatedOrders = orders.map((o) => {
      if (o.id === id) {
        return order;
      }
      return o;
    });
    setOrders(updatedOrders);
  };

  return (
    <Box {...props}>
      <DataGrid rows={orders} columns={collumns} />
    </Box>
  );
};

export default OrderList;
