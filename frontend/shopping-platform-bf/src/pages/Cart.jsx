function Cart() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    API.get("/cart").then((res) => {
      setCart(res.data.items);
    });
  }, []);

  return (
    <div className="max-w-4xl mx-auto">

      <h1 className="text-2xl font-bold mb-6">
        Your Cart
      </h1>

      {cart.map((item) => (
        <div key={item.product._id}>
          {item.product.name} — {item.quantity}
        </div>
      ))}

    </div>
  );
}