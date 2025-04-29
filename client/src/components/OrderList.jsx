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

const OrderList = ({ rows, vendas, setVendas, ...props }) => {
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
    const venda = vendas.find((v) => v.id === id);
    venda[field] = !venda[field];
    await updateVenda(id, { [field]: venda[field] });
    const updatedVendas = vendas.map((v) => {
      if (v.id === id) {
        return venda;
      }
      return v;
    });
    setVendas(updatedVendas);
  };

  return (
    <Box {...props}>
      <DataGrid rows={rows} columns={collumns} />
    </Box>
  );
};

export default OrderList;
