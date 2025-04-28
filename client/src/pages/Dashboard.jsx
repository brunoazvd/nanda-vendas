import { Typography, Stack, Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container sx={{ py: 2, position: 'relative' }}>
      <Stack gap={2} direction="row">
        <Stack gap={1} direction="row" sx={{ mr: 'auto' }}>
          <img src="favicon.png" alt="logo" style={{ width: 32 }} />
          <Typography textAlign="center" variant="h1">
            NandinhaVendas
          </Typography>
        </Stack>
        <Typography textAlign="center" variant="subtitle1">
          Nova Venda
        </Typography>
      </Stack>
    </Container>
  );
};

export default Dashboard;
