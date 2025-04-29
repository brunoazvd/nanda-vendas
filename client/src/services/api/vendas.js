import api from './index.js';

export const getVendas = async () => {
  const response = await api.get('/api/vendas');
  return response.data;
};

export const getVendaById = async (id) => {
  const response = await api.get(`/api/vendas/${id}`);
  return response.data;
};

export const createVenda = async (venda) => {
  const response = await api.post('/api/vendas', venda);
  return response.data;
};

export const updateVenda = async (id, updates) => {
  const response = await api.put(`/api/vendas/${id}`, updates);
  console.log(response.data);
  return response.data;
};

export const deleteVenda = async (id) => {
  const response = await api.delete(`/api/vendas/${id}`);
  return response.data;
};
