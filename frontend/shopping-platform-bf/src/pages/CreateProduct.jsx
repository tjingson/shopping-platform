import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ImageUploader from "../components/ImageUploader";

function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

   const uploadImage = async (file) => {
    try{
      const formData = new FormData();
      formData.append("image", file);

      const { data } = await API.post(
        "/products/upload",
        formData,
      );
      setImage(data.image);
      toast.success("Image uploaded");
    } catch(error) {
      console.error(error);
      toast.error("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/products", {
        name,
        price: Number(price),
        stock: Number(stock),
        description,
        category,
        image,
      });
      toast.success("Product created!");
      navigate("/products");
    } catch (error) {
      toast.error("Try again!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">

      <h1 className="text-2xl font-bold mb-4 self-center">Create Product</h1>

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

        <button 
            type = "submit"
            disabled={!name || !price || !stock || !image}
            className="bg-green-500 text-white p-2 rounded">
          {loading ? "Creating..." : "Create Product"}
        </button>

      </form>
    </div>
  );
};

export default CreateProduct;