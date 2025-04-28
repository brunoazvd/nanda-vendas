import { useState } from 'react';
import { Typography, Stack, Container, Tab, Box, Chip } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import OrderList from '@/components/OrderList';

const Dashboard = () => {
  const [currentTab, setCurrentTab] = useState('1');

  return (
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
          onClick={() => console.log('hello world')}
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
            <Tab label="Vendas Abertas" value="1" />
            <Tab label="Histórico de Vendas" value="2" />
          </TabList>
          <TabPanel value="1">
            <OrderList text="VENDAS ABERTAS TAB" />
          </TabPanel>
          <TabPanel value="2">
            <OrderList text="HISTÓRICO DE VENDAS TAB" />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default Dashboard;
