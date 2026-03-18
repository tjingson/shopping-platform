export const toNumber = (val) => Number(val || 0);

export const formatRupiah = (num) =>
  Number(num || 0).toLocaleString("id-ID");