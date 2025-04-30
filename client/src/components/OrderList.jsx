import { Box, Checkbox, Modal } from '@mui/material';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { updateVenda } from '@/api/vendas';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import OrderForm from './OrderForm';

const OrderList = ({ rows, vendas, setVendas, ...props }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const collumns = [
    {
      field: 'id',
      headerName: '',
      width: 50,
      resizable: false,
      renderCell: (value) => {
        return (
          <Box>
            <EditIcon
              sx={{ mt: 1.5, ml: 0.25, opacity: 0.5, cursor: 'pointer' }}
              onClick={() => {
                setModalContent(
                  <OrderForm
                    setVendas={setVendas}
                    order={value.row}
                    handleCloseModal={handleCloseModal}
                  />,
                );
                handleOpenModal();
              }}
            />
          </Box>
        );
      },
    },
    {
      field: 'produto',
      headerName: 'Produto',
      width: 200,
      flex: 1,
      resizable: false,
    },
    { field: 'cliente', headerName: 'Cliente', width: 120, resizable: false },
    {
      field: 'preco',
      headerName: 'Preço',
      width: 80,
      resizable: false,
      valueFormatter: (value) => `R$ ${Number(value).toFixed(2)}`,
    },
    { field: 'quantidade', headerName: 'Qtd', width: 50, resizable: false },
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
    {
      field: 'categoria',
      headerName: 'Categoria',
      width: 120,
      resizable: false,
    },
    {
      field: 'data',
      headerName: 'Data',
      width: 120,
      resizable: false,
      valueFormatter: (value) => new Date(value).toLocaleDateString(),
    },
  ];

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
    <>
      <Box {...props}>
        <DataGrid
          rows={rows}
          columns={collumns}
          disableRowSelectionOnClick
          sx={{
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
              {
                outline: 'none',
              },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: 'none',
              },
          }}
        />
      </Box>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box>{modalContent}</Box>
      </Modal>
    </>
  );
};

export default OrderList;
