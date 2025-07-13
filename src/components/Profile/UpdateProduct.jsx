// components/ProductFormModal.js

import React from "react";
import { X, ImagePlus } from "lucide-react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const baseURL = import.meta.env.REACT_APP_BACKEND_BASE_URL;
export default function ProductFormModal({
  product,
  productId,
  imagePreview,
  onClose,
  onChange,
  onImageChange,
  onSubmit,
  isEditing,
}) {
  //   e.preventDefault();
  //   console.log("Thi i product update form id", productId);

  //   try {
  //     const formData = new FormData();
  //     formData.append("title", product.name);
  //     formData.append("description", product.description);
  //     formData.append("category", product.category);
  //     formData.append("price", product.price);
  //     formData.append("quantity", product.quantity);

  //     if (imagePreview && typeof imagePreview !== "string") {
  //       formData.append("image", imagePreview);
  //     }
  //     console.log("Updating product with ID:", productId);
  //     await axios.patch(
  //       `http://localhost:3000/api/v1/products/${productId}`,
  //       formData,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     onClose();
  //   } catch (error) {
  //     console.error("Update product failed:", error);
  //   }
  // };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", product.name);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("price", product.price);
      formData.append("quantity", product.quantity);

      // ✅ Properly append image file (if present)
      if (product.image && typeof product.image !== "string") {
        formData.append("image", product.image);
      }

      await axios.patch(`${baseURL}/products/${productId}`, formData, {
        withCredentials: true,
      });

      onClose();
      toast.success("Product Updated!");
    } catch (error) {
      toast.error("Update product failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <button
          onClick={onClose}
          aria-label="Close Modal"
          title="Close"
          className="absolute p-2 text-white transition bg-red-600 rounded-full top-3 right-3 hover:bg-red-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="mb-4 text-lg font-semibold text-center text-gray-800 dark:text-white">
          Edit Product
        </h2>

        <form onSubmit={handleUpdateProduct} className="space-y-4">
          <label className="font-semibold text-gray-800">Edit Name</label>
          <input
            value={product.name}
            onChange={(e) => onChange("name", e.target.value)}
            placeholder="Product Name"
            required
            className="w-full p-2 border rounded-md dark:bg-gray-200"
          />
          <label className="font-semibold text-gray-800">
            Edit Description
          </label>
          <textarea
            value={product.description}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="Description"
            required
            className="w-full h-24 p-2 border rounded-md resize-none dark:bg-gray-200"
          />
          <label className="font-semibold text-gray-800">Edit Category</label>
          <select
            value={product.category}
            onChange={(e) => onChange("category", e.target.value)}
            className="w-full p-2 border rounded-md dark:bg-gray-200"
            required
          >
            <option value="">Select Category</option>
            <option value="Crop">Crop</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
          </select>

          <div className="flex gap-4">
            <label className="font-semibold text-gray-800">Edit Price</label>
            <input
              type="number"
              value={product.price}
              onChange={(e) => onChange("price", e.target.value)}
              placeholder="Price"
              min="0"
              required
              className="w-full p-2 border rounded-md dark:bg-gray-200"
            />
            <label className="font-semibold text-gray-800">Edit Quantity</label>
            <input
              type="number"
              value={product.quantity}
              onChange={(e) => onChange("quantity", e.target.value)}
              placeholder="Quantity"
              min="0"
              required
              className="w-full p-2 border rounded-md dark:bg-gray-200"
            />
          </div>

          {imagePreview ? (
            <div className="relative h-40 overflow-hidden border rounded-md">
              <img
                src={
                  typeof imagePreview === "string"
                    ? imagePreview
                    : URL.createObjectURL(imagePreview)
                }
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2"
                onClick={() => onImageChange(null)}
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-2 left-2">
                <input
                  type="file"
                  accept="image/*"
                  id="changeImageInput"
                  onChange={(e) => onImageChange(e.target.files?.[0] || null)}
                  className="hidden"
                />
                <button
                  type="button"
                  className="px-2 py-1 text-xs text-white bg-yellow-500 rounded hover:bg-yellow-600"
                  onClick={() =>
                    document.getElementById("changeImageInput")?.click()
                  }
                >
                  Change Image
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md dark:bg-gray-700">
              <ImagePlus className="w-10 h-10 mb-2 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                onChange={(e) => onImageChange(e.target.files?.[0] || null)}
                className="hidden"
              />
              <button
                type="button"
                className="px-4 py-2 text-sm text-white bg-green-800 rounded-md hover:bg-green-700"
                onClick={() => document.getElementById("imageUpload")?.click()}
              >
                Upload Image
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Update Product{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
