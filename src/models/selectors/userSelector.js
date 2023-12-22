const user = ({ userReducer }) => userReducer.user;
const token = ({ userReducer }) => userReducer.user.token;
const myOrders = ({ userReducer }) => userReducer.myOrders.results;
const statuses = ({ userReducer }) => userReducer.statuses;
const currentOrderPage = ({ userReducer }) =>
  userReducer.myOrders.pagination.currentPage;

const ordersPagination = ({ userReducer }) => userReducer.myOrders.pagination;
const orderIdVisible = ({ userReducer }) => userReducer.orderId;
const orderDetails = ({ userReducer }) => userReducer.orderDetails;

export {
  user,
  token,
  myOrders,
  statuses,
  currentOrderPage,
  ordersPagination,
  orderIdVisible,
  orderDetails,
};
