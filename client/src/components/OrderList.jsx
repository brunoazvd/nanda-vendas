import { Box, Checkbox } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { updateVenda } from '@/api/vendas';
import EditIcon from '@mui/icons-material/Edit';

const OrderList = ({ rows, vendas, setVendas, ...props }) => {
  const collumns = [
    {
      field: 'id',
      headerName: '',
      width: 50,
      resizable: false,
      renderCell: (value) => {
        return (
          <Box>
            <EditIcon sx={{ mt: 1.5, opacity: 0.5, cursor: 'pointer' }} />
          </Box>
        );
      },
    },
    {
      field: 'data',
      headerName: 'Data',
      width: 120,
      resizable: false,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
    {
      field: 'categoria',
      headerName: 'Categoria',
      width: 120,
      resizable: false,
    },
    {
      field: 'produto',
      headerName: 'Produto',
      width: 200,
      flex: 1,
      resizable: false,
    },
    { field: 'cliente', headerName: 'Cliente', width: 120, resizable: false },
    { field: 'quantidade', headerName: 'Qtd', width: 50, resizable: false },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 80,
      resizable: false,
      valueFormatter: (value) => `R$ ${Number(value).toFixed(2)}`,
    },
    {
      field: 'observacao',
      headerName: 'Observação',
      width: 200,
      resizable: false,
    },
    {
      field: 'estaPedido',
      headerName: 'Pedido',
      width: 80,
      resizable: false,
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
      resizable: false,
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
