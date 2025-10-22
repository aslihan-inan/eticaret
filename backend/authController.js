// Minimal örnek, test verisi döndürür
export const getProducts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;

  const totalProducts = 36;
  const products = Array.from({ length: totalProducts }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: Math.floor(Math.random() * 100),
    imageUrl: "https://via.placeholder.com/150",
  }));

  const start = (page - 1) * limit;
  const paginated = products.slice(start, start + limit);

  res.json({
    products: paginated,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
  });
};
