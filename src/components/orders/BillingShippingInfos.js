import React from 'react';

const BillingShippingInfos = ({ options }) => (
  <>
    <div className="billing-shipping-box">
      <h3>Πληροφορίες πληρωμής</h3>
      <div className="order-infos">
        <div className="order-info">
          <span>Όνομα: </span>
          <strong>{options?.billing?.firstName}</strong>
        </div>
        <div className="order-info">
          <span>Επίθετο: </span>
          <strong>{options?.billing?.lastName}</strong>
        </div>
        <div className="order-info">
          <span>Διεύθυνση: </span>
          <strong>
            {options?.billing?.address}, {options?.billing?.postCode}
          </strong>
        </div>
        <div className="order-info">
          <span>Τηλέφωνο: </span>
          <strong>{options?.billing?.phone}</strong>
        </div>
      </div>
    </div>
    <div className="billing-shipping-box">
      <h3>Πληροφορίες αποστολής</h3>
      <div className="order-infos">
        <div className="order-info">
          <span>Όνομα: </span>
          <strong>{options?.shipping?.firstName}</strong>
        </div>
        <div className="order-info">
          <span>Επίθετο: </span>
          <strong>{options?.shipping?.lastName}</strong>
        </div>
        <div className="order-info">
          <span>Διεύθυνση: </span>
          <strong>
            {options?.shipping?.address}, {options?.shipping?.postCode}
          </strong>
        </div>
        <div className="order-info">
          <span>Τηλέφωνο: </span>
          <strong>{options?.shipping?.phone}</strong>
        </div>
      </div>
    </div>
  </>
);

export default BillingShippingInfos;
