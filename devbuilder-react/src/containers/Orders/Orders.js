import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Orders.css';
import * as orderActions from '../../store/actions/order';
import Order from '../../components/Order/Order';

class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.token);
  }

  render() {
    return (
      <div className={classes.Orders}>
        {this.props.orders.map(order => (
          <Order
            key={order._id}
            name={order.title || 'No title'}
            description={order.description || 'No description'}
            skills={order.skills}
            remove={() => this.props.deleteOrder(order._id, this.props.token)} />
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token) => dispatch( orderActions.fetchOrders(token) ),
    deleteOrder: (id, token) => dispatch( orderActions.deleteOrder(id, token) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);