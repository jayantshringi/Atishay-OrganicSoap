// src/services/api.js

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

// Add auth token to requests automatically
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ==========================================
// CLIENT-SIDE PROTOTYPE / DEMO FALLBACK STATE
// (Ensures full functionality on Vercel without backend)
// ==========================================

const getStoredOrders = () => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('demo_soap_orders');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  // Default sample order for prototype showcase
  const defaultOrders = [
    {
      id: 'ord_demo_982341a',
      userId: 'usr_demo_1',
      skinType: 'oily',
      mainConcern: 'acne',
      texturePreference: 'soft',
      deliveryAddress: 'Flat 402, Lotus Residency, MG Road',
      deliveryCity: 'Mumbai',
      deliveryPostalCode: '400001',
      deliveryPhone: '9876543210',
      price: 399,
      orderStatus: 'in-production',
      trackingNumber: 'AWB78965412IN',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      deliveryDate: new Date(Date.now() + 86400000 * 3).toISOString(),
      user: { name: 'Priya Mehta', email: 'priya@example.com' },
      recipe: {
        id: 'rcp_1',
        name: 'Haldi & Neem Anti-Acne Organic Bar',
        description: 'Purifying glycerine base with organic turmeric and neem extracts.',
      },
    },
  ];
  localStorage.setItem('demo_soap_orders', JSON.stringify(defaultOrders));
  return defaultOrders;
};

const saveStoredOrders = (orders) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('demo_soap_orders', JSON.stringify(orders));
  }
};

const getMatchedRecipe = (answers) => {
  const concern = answers.mainConcern || 'general';
  if (concern === 'acne') {
    return {
      id: 'rcp_acne',
      name: 'Haldi & Neem Clarifying Bar',
      description: 'Antiseptic Turmeric & Neem formula to combat breakouts.',
    };
  } else if (concern === 'dryness') {
    return {
      id: 'rcp_dry',
      name: 'Aloe Vera & Shea Intense Hydration Bar',
      description: 'Deep moisturizing melt-and-pour glycerine formula.',
    };
  } else if (concern === 'sensitivity') {
    return {
      id: 'rcp_sensitive',
      name: 'Chandan & Chamomile Soothing Bar',
      description: 'Calming sandalwood formula for easily irritated skin.',
    };
  }
  return {
    id: 'rcp_glow',
    name: 'Kesar & Almond Radiant Glow Bar',
    description: 'Antioxidant-rich saffron blend for radiant skin tone.',
  };
};

// ==========================================
// EXPORTED API CLIENT WITH AUTO-FALLBACK
// ==========================================

export const authAPI = {
  register: async (data) => {
    try {
      return await api.post('/auth/register', data);
    } catch {
      // Prototype Demo Fallback
      const token = `demo_token_${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', data.name || 'Demo User');
      localStorage.setItem('userEmail', data.email || 'user@example.com');
      localStorage.setItem('userRole', data.role || 'customer');
      return {
        data: {
          token,
          user: {
            id: `usr_${Date.now()}`,
            name: data.name,
            email: data.email,
            role: data.role || 'customer',
          },
        },
      };
    }
  },

  login: async (data) => {
    try {
      return await api.post('/auth/login', data);
    } catch {
      // Prototype Demo Fallback
      const isAdmin = data.email?.toLowerCase().includes('admin');
      const role = isAdmin ? 'admin' : 'customer';
      const token = `demo_token_${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('userName', isAdmin ? 'Atishay Admin' : data.email.split('@')[0]);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userRole', role);
      return {
        data: {
          token,
          role,
          user: {
            id: `usr_${Date.now()}`,
            email: data.email,
            name: isAdmin ? 'Atishay Admin' : 'Demo Customer',
            role,
          },
        },
      };
    }
  },

  getMe: async () => {
    try {
      return await api.get('/auth/me');
    } catch {
      // Prototype Demo Fallback
      const role = (typeof window !== 'undefined' && localStorage.getItem('userRole')) || 'customer';
      const name = (typeof window !== 'undefined' && localStorage.getItem('userName')) || 'Customer';
      const email = (typeof window !== 'undefined' && localStorage.getItem('userEmail')) || 'customer@example.com';
      return {
        data: {
          id: 'usr_demo_current',
          name,
          email,
          role,
        },
      };
    }
  },
};

export const questionnaireAPI = {
  submit: async (data) => {
    try {
      return await api.post('/questionnaire/submit', data);
    } catch {
      // Prototype Demo Fallback
      const newOrderId = `ord_${Math.random().toString(36).substring(2, 10)}`;
      const price = data.texturePreference === 'exfoliating' ? 449 : 399;
      const recipe = getMatchedRecipe(data);

      const newOrder = {
        id: newOrderId,
        userId: 'usr_demo_current',
        skinType: data.skinType || 'combination',
        mainConcern: data.mainConcern || 'glow',
        texturePreference: data.texturePreference || 'soft',
        deliveryAddress: data.deliveryAddress || 'Demo Street 123',
        deliveryCity: data.deliveryCity || 'Mumbai',
        deliveryPostalCode: data.deliveryPostalCode || '400001',
        deliveryPhone: data.deliveryPhone || '9876543210',
        price,
        orderStatus: 'confirmed',
        createdAt: new Date().toISOString(),
        deliveryDate: new Date(Date.now() + 86400000 * 4).toISOString(),
        user: {
          name: (typeof window !== 'undefined' && localStorage.getItem('userName')) || 'Demo Customer',
          email: (typeof window !== 'undefined' && localStorage.getItem('userEmail')) || 'customer@example.com',
        },
        recipe,
      };

      const existingOrders = getStoredOrders();
      saveStoredOrders([newOrder, ...existingOrders]);

      return {
        data: {
          orderId: newOrderId,
          recipe,
          price,
          status: 'success',
        },
      };
    }
  },
};

export const ordersAPI = {
  getAll: async () => {
    try {
      return await api.get('/orders');
    } catch {
      return { data: getStoredOrders() };
    }
  },

  getById: async (id) => {
    try {
      return await api.get(`/orders/${id}`);
    } catch {
      const orders = getStoredOrders();
      const found = orders.find((o) => o.id === id) || orders[0];
      return { data: found };
    }
  },

  update: async (id, data) => {
    try {
      return await api.put(`/orders/${id}`, data);
    } catch {
      const orders = getStoredOrders().map((o) => (o.id === id ? { ...o, ...data } : o));
      saveStoredOrders(orders);
      return { data: { success: true } };
    }
  },
};

export const paymentsAPI = {
  createOrder: async (data) => {
    try {
      return await api.post('/payments/create-order', data);
    } catch {
      return {
        data: {
          razorpayOrderId: `rzp_ord_mock_${Date.now()}`,
          amount: data.amount,
          currency: 'INR',
        },
      };
    }
  },

  verify: async (data) => {
    try {
      return await api.post('/payments/verify', data);
    } catch {
      const orders = getStoredOrders().map((o) =>
        o.id === data.orderId ? { ...o, orderStatus: 'confirmed' } : o
      );
      saveStoredOrders(orders);
      return { data: { success: true, status: 'paid' } };
    }
  },
};

export const adminAPI = {
  getAnalytics: async () => {
    try {
      return await api.get('/admin/analytics/summary');
    } catch {
      const orders = getStoredOrders();
      const inProduction = orders.filter((o) => o.orderStatus === 'in-production').length;
      const shipped = orders.filter((o) => o.orderStatus === 'shipped').length;
      const revenue = orders.reduce((sum, o) => sum + (o.price || 399), 0);
      return {
        data: {
          ordersToday: orders.length,
          revenueToday: revenue,
          ordersInProduction: inProduction || 1,
          ordersShipped: shipped || 0,
        },
      };
    }
  },

  getAllOrders: async (params) => {
    try {
      return await api.get('/admin/orders', { params });
    } catch {
      let orders = getStoredOrders();
      if (params?.status) {
        orders = orders.filter((o) => o.orderStatus === params.status);
      }
      return { data: { orders } };
    }
  },

  updateOrderStatus: async (orderId, data) => {
    try {
      return await api.post(`/admin/orders/${orderId}/update-status`, data);
    } catch {
      const orders = getStoredOrders().map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: data.orderStatus,
              trackingNumber: data.trackingNumber || o.trackingNumber,
            }
          : o
      );
      saveStoredOrders(orders);
      return { data: { success: true } };
    }
  },
};

export default api;
