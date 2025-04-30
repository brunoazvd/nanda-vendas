import { useState, useEffect } from 'react';
import {
  Typography,
  Stack,
  Container,
  Tab,
  Box,
  Chip,
  Modal,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import OrderList from '@/components/OrderList';
import OrderForm from '@/components/OrderForm';

import { getVendas } from '@/api/vendas';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('vendas_abertas');
  const [vendas, setVendas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchVendas() {
      console.log('fetching');
      const vs = await getVendas();
      setVendas(vs);
    }

    fetchVendas();
  }, []);

  return (
    <>
      <Container sx={{ py: 2, position: 'relative' }}>
        <Stack gap={2} direction="row" sx={{ mb: 3 }}>
          <Stack gap={1} direction="row" sx={{ mr: 'auto' }}>
            <img src="favicon.png" alt="logo" style={{ width: 32 }} />
            <Typography textAlign="center" variant="h1">
              NandinhaVendas
            </Typography>
          </Stack>
          <Chip
            icon={<AddIcon />}
            label="Nova Venda"
            size="medium"
            onClick={handleOpenModal}
            color="primary"
            sx={{
              fontSize: 16,
              borderWidth: 3,
            }}
          ></Chip>
        </Stack>
        <Box>
          <TabContext value={currentTab}>
            <TabList onChange={(e, value) => setCurrentTab(value)}>
              <Tab label="Vendas Abertas" value="vendas_abertas" />
              <Tab label="Histórico de Vendas" value="historico_vendas" />
            </TabList>
            <TabPanel value="vendas_abertas">
              <OrderList
                rows={vendas.filter(
                  (v) => v.estaPedido === false || v.estaPago === false,
                )}
                vendas={vendas}
                setVendas={setVendas}
              />
            </TabPanel>
            <TabPanel value="historico_vendas">
              <OrderList
                rows={vendas.filter(
                  (v) => v.estaPedido === true && v.estaPago === true,
                )}
                vendas={vendas}
                setVendas={setVendas}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </Container>
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box>
          <OrderForm setVendas={setVendas} />
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
