import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await api.get("/products");
      const product = res.data.find((p) => p._id === id);

      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDesc(product.description);
      setCategory(product.category);
      setImage(product.image);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/products/${id}`, {
        name,
        price,
        stock,
        description,
        category,
        image
      });

      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          type="text"
          placeholder="Product Name"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stock"
          className="border p-2 rounded"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="text"
          placeholder="image"
          className="border p-2 rounded"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button className="bg-blue-500 text-white p-2 rounded">
          Update Product
        </button>

      </form>
    </div>
  );
};

export default EditProduct;