const alertMessage = ({ alertReducer }) => alertReducer.message;
const alertType = ({ alertReducer }) => alertReducer.type;
const alertShow = ({ alertReducer }) => alertReducer.show;

export { alertMessage, alertType, alertShow };
