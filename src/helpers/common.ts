// utils.js
export const formatCurrency = (price: number | bigint) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  }
  