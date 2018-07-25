import * as actionTypes from './actionTypes';
import axios from 'axios';

export const orderInit = () => {
  return {
      type: actionTypes.ORDER_INIT
  };
};

const orderStart = () => {
  return {
      type: actionTypes.ORDER_START
  };
};

const orderSuccess = (order) => {
  return  {
    type: actionTypes.ORDER_SUCCESS,
    order: order
  }
}

const orderFail = (error) => {
  return  {
    type: actionTypes.ORDER_FAIL,
    error: error
  }
}

export const addOrder = (order, token) => {
  return dispatch => {
    dispatch( orderStart() );
    axios.post(`http://localhost:3000/order?token=${token}`, order)
      .then(response => {
        dispatch( orderSuccess(response.data) );
      })
      .catch(error => {
        dispatch( orderFail(error) );
      })
  }
}

const fetchOrdersStart = () => {
  return {
      type: actionTypes.FETCH_ORDERS_START
  };
};

const fetchOrdersSuccess = (orders) => {
  return  {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
  }
}

const fetchOrdersFail = (error) => {
  return  {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error
  }
}

export const fetchOrders = (token) => {
  return dispatch => {
    dispatch( fetchOrdersStart() );
    axios.get(`http://localhost:3000/order?token=${token}`)
      .then(response => {
        dispatch( fetchOrdersSuccess(response.data) );
      })
      .catch(error => {
        dispatch( fetchOrdersFail(error) );
      })
  }
}

const deleteOrderStart = () => {
  return {
    type: actionTypes.DELETE_ORDER_START
  }
}

const deleteOrderSuccess = (id) => {
  return {
    type: actionTypes.DELETE_ORDER_SUCCESS,
    id: id
  }
}

const deleteOrderFail = (error) => {
  return {
    type: actionTypes.DELETE_ORDER_FAIL,
    error: error
  }
}

export const deleteOrder = (id, token) => {
  return dispatch => {
    dispatch( deleteOrderStart() );
    axios.delete(`http://localhost:3000/order/${id}?token=${token}`)
      .then(response => {
        dispatch( deleteOrderSuccess(id) );
      })
      .catch(error => {
        dispatch( deleteOrderFail(error) );
      })
  }
}