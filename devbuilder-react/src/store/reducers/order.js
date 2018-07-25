import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch( action.type ) {
    case actionTypes.ORDER_INIT:
      return {
        ...state,
        purchased: false
      }
    case actionTypes.ORDER_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat( action.order )
      }
    case actionTypes.ORDER_FAIL: 
      return {
        ...state,
        loading: false
      }
    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      }
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      }
    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false
      }
    case actionTypes.DELETE_ORDER_START:
    return {
      ...state,
      loading: true
    }
    case actionTypes.DELETE_ORDER_SUCCESS: 
      const newOrders = state.orders.filter(order => order._id !== action.id);
      return {
        ...state,
        loading: false,
        orders: newOrders

      }
    case actionTypes.DELETE_ORDER_FAIL: 
      return {
        ...state,
        loading: false
      }
    default:
      return state;
  }
};

export default reducer;