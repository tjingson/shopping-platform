import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUploader from "../components/ImageUploader";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const fetchProduct = async () => {
    try {
      const res = await API.get("/products");
      const product = res.data.find((p) => p._id === id);

      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setDesc(product.description);
      setCategory(product.category);
      setImage(product.image);
      setPreview(`http://localhost:3001${product.image}`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const uploadImage = async (file) => {

    const formData = new FormData();
    formData.append("image", file);

    const { data } = await API.post(
      "/products/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    setImage(data.image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/products/${id}`, {
        name,
        price,
        stock,
        description,
        category,
        image
      });

      toast.success("Product updated!");

      navigate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <ImageUploader
          preview={preview}
          setPreview={setPreview}
          uploadImage={uploadImage}
        />

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

        <button className="bg-blue-500 text-white p-2 rounded">
          Update Product
        </button>

      </form>
    </div>
  );
};

export default EditProduct;