
export const transformCartonDetails = (carton) => {
  return {
    id: carton.CARTON_ID,
    length: carton.LEN,
    width: carton.WIDTH,
    height: carton.HEIGHT,
  };
};


export const transformAddressDetails = (address) => {
  return {
    id: address.address_id,
    line1: address.ADDRESS_LINE1,
    line2: address.ADDRESS_LINE2,
    city: address.CITY,
    state: address.STATE,
    pincode: address.PINCODE,
    country: address.COUNTRY,

  };
};

export const transformOrderHeaderDetails = (order) => {
  return {
    orderId: order.ORDER_ID,
    customerId: order.CUSTOMER_ID,
    orderDate: order.ORDER_DATE,
    // status: order.ORDER_STATUS,
    paymentMode: order.PAYMENT_MODE,
    // paymentDate: order.PAYMENT_DATE,
    // shipmentDate: order.ORDER_SHIPMENT_DATE,
    // shipperId: order.SHIPPER_ID
  };
};

export const transformOrderItemsDetails = (order) => {
  return {
    orderId: order.ORDER_ID,
    productId: order.PRODUCT_ID,
    Quantity: order.PRODUCT_QUANTITY
  };
};

export const transformCustomerDetails = (customer) => {
  return {
    customerId: customer.CUSTOMER_ID,
    firstName: customer.CUSTOMER_FNAME,
    lastName: customer.CUSTOMER_LNAME,
    email: customer.CUSTOMER_EMAIL,
    phone: customer.CUSTOMER_PHONE,
    addressId: customer.ADDRESS_ID,
    creationDate: customer.CUSTOMER_CREATION_DATE,
    username: customer.CUSTOMER_USERNAME,
    gender: customer.CUSTOMER_GENDER
  };
};

export const transformProductDetails = (product) => {
  return {
    id: product.PRODUCT_ID,
    description: product.PRODUCT_DESC,
    productCode: product.PRODUCT_CLASS_CODE,
    price: product.PRODUCT_PRICE,
    availableQuantity: product.PRODUCT_QUANTITY_AVAIL,
    length: product.LEN,
    width: product.WIDTH,
    height: product.HEIGHT,
    weight: product.WEIGHT,
    category: product.PRODUCT_CLASS_DESC
  }
}