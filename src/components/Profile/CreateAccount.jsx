"use client";

import { useState, useEffect } from "react";
import { MapPin, Phone, Home, ImagePlus, X, Trash2, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ProductFormModal from "./UpdateProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
export default function FarmerProfile() {
  const navigate = useNavigate();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDeleteIndex, setProductToDeleteIndex] = useState(null);
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=150&width=150"
  );
  const [productIdToBeUpdate, setProductIdToBeUpdate] = useState(null);
  const [tempProfileImage, setTempProfileImage] = useState(null); // new
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // new
  const [fetchProduct, setFetchProducts] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isProductEditing, setIsProductEditing] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [newProductImagePreview, setNewProductImagePreview] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    image: null,
  });
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    image: null,
  });
  const [currentUser, setCurrentUser] = useState(null);

  const [farmerDetails, setFarmerDetails] = useState({
    name: "Farmer Name",
    phone: "0300-1234567",
    location: "Lahore, Pakistan",
    cropType: "organic",
  });

  const rawUser = localStorage.getItem("currentUser");
  const userObj = JSON.parse(rawUser);
  const userId = userObj._id;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${baseURL}/products`, {
          withCredentials: true,
        });
        const allProducts = response.data.data.docs;
        setFetchProducts(allProducts);

        if (currentUser?._id) {
          const userProducts = allProducts.filter(
            (product) => product.owner === currentUser._id
          );
          setProducts(userProducts);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, [fetchProduct, currentUser]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("currentUser");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfileImage(reader.result); // show preview before confirming
        setShowConfirmPopup(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("category", newProduct.category);
      formData.append("price", newProduct.price);
      formData.append("quantity", newProduct.quantity);
      formData.append("image", newProduct.image);
      console.log("This is form Data ", formData);
      const response = await axios.post(`${baseURL}/products`, formData, {
        withCredentials: true, // if your backend uses cookies
      });

      const savedProduct = response.data.data || {}; // adjust according to your backend response

      // Reset form
      setNewProduct({
        name: "",
        description: "",
        category: "",
        price: "",
        quantity: "",
        image: null,
      });
      setNewProductImagePreview(null);

      toast.success("Product created successfully!");
    } catch (err) {
      toast.error("Failed to create product. Please try again.");
    }
  };
  const handleDelete = (productId) => {
    setProductToDeleteIndex(productId);
    setShowDeleteModal(true);
  };
  const handleChange = (field, value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`${baseURL}/products/${productToDeleteIndex}`, {
        withCredentials: true,
      });

      // Remove product from state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productToDeleteIndex)
      );

      setShowDeleteModal(false);
      setProductToDeleteIndex(null);
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Error deleting product. Try again. ", error);
    }
  };
  const handleProductImageChange = (file) => {
    if (!file) return;

    setProduct((prev) => ({
      ...prev,
      image: file,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (productId) => {
    const prod = products.find((p) => p._id === productId);
    if (!prod) return;

    setProduct({
      name: prod.title,
      description: prod.description,
      category: prod.category,
      price: prod.price,
      quantity: prod.quantity,
      image: null, // let modal handle preview
    });
    setProductIdToBeUpdate(productId);
    setImagePreview(prod.imageFile?.url || null);
    setIsProductEditing(true); // open the modal
  };

  useEffect(() => {
    if (productIdToBeUpdate !== null) {
      console.log("Updated productIdToBeUpdate:", productIdToBeUpdate);
    }
  }, [productIdToBeUpdate]);
  const handleFarmerDetailsChange = (field, value) => {
    setFarmerDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const toggleEditForm = async () => {
    if (isEditing) {
      try {
        await axios.patch(
          `${baseURL}/users/profile`,
          {
            fullName: farmerDetails.name,
            phone: farmerDetails.phone,
            address: farmerDetails.location,
            cropType: farmerDetails.cropType,
          },
          {
            withCredentials: true,
          }
        );
        localStorage.setItem("currentUser", JSON.stringify(farmerDetails));
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error("Failed to update profile. ", err);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleProfileImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file); // make sure the key matches the multer field name

    try {
      const response = await axios.patch(`${baseURL}/users/avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      const uploadedImageUrl = response.data?.data?.avatar;

      if (uploadedImageUrl) {
        setProfileImage(uploadedImageUrl);
        localStorage.setItem("profileImage_" + userId, uploadedImageUrl);
        toast.success("Profile image updated!");
      } else {
        setProfileImage("/placeholder.svg?height=150&width=150");
      }
    } catch (err) {
      toast.error("Error uploading profile image. Try again. ", err);
    }
  };
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/users/current-user`, {
          withCredentials: true,
        });
        const userData = response.data.data; // adjust if your backend returns differently
        setCurrentUser(userData);
        console.log("Current user data from API:", userData);
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    fetchCurrentUser();
  }, [currentUser]);
  const handleNewProductChange = (field, value) => {
    setNewProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleNewProductImageChange = (file) => {
    if (!file) return;
    setNewProduct((prev) => ({
      ...prev,
      image: file,
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProductImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 gap-6 p-6 mx-auto bg-gray-100 md:grid-cols-2 dark:bg-gray-900">
      {/* Farmer Profile */}
      <div className="w-full max-w-2xl p-6 mx-auto transition-shadow bg-white shadow-lg rounded-xl md:p-10 hover:shadow-xl dark:bg-gray-500 dark:text-black">
        <h1 className="mb-4 text-xl font-bold text-center text-green-800 sm:text-2xl dark:text-black">
          My Profile
        </h1>
        {currentUser ? (
          <>
            <div className="flex flex-col items-center space-y-4">
              <img
                src={currentUser.avatar}
                alt="Farmer"
                className="object-cover w-24 h-24 bg-gray-300 rounded-full"
              />

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageChange}
              />

              <button
                type="button"
                onClick={() =>
                  document.getElementById("profile-upload").click()
                }
                className="w-full px-6 py-2 text-sm text-white bg-gray-600 rounded-md sm:w-auto hover:bg-gray-500 sm:text-base"
              >
                Upload Profile Pic
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileImage("/placeholder.svg?height=150&width=150");
                  localStorage.removeItem("profileImage_" + userId);
                }}
                className="w-full px-6 py-2 text-sm text-white bg-red-800 rounded-md sm:w-auto hover:bg-red-700 sm:text-base"
              >
                Delete Profile Pic
              </button>

              <h2 className="mt-2 text-lg font-semibold text-gray-800 sm:text-xl dark:text-black">
                {currentUser.fullName}
              </h2>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600 sm:text-base">
              <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-md hover:bg-slate-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600">
                <MapPin className="w-5 h-5 text-green-500" />
                <span>{currentUser.address}</span>
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-md hover:bg-slate-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600">
                <Phone className="w-5 h-5 text-blue-500" />
                <span>{currentUser.phone}</span>
              </div>
              <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-md hover:bg-slate-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-600">
                <Home className="w-5 h-5 text-yellow-500" />
                <span>{currentUser.cropType}</span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600 dark:text-white">
            Loading profile...
          </p>
        )}
        <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:justify-between">
          <button
            onClick={toggleEditForm}
            className="w-full px-4 py-2 text-sm text-white bg-green-700 rounded-md sm:w-auto hover:bg-green-600 sm:text-base"
          >
            Edit Profile
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("currentUser");
              window.location.href = "/logout";
            }}
            className="w-full px-4 py-2 text-sm text-white bg-red-600 rounded-md sm:w-auto hover:bg-red-700 sm:text-base"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative p-6 bg-white rounded-lg shadow-xl shadow-white w-96 dark:bg-gray-800 dark:text-white">
            <button
              onClick={toggleEditForm}
              className="absolute p-2 text-white bg-red-500 rounded-full top-2 right-2"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="mb-4 text-lg font-semibold">Edit Farmer Details</h2>
            <form className="space-y-4">
              {["name", "phone", "location"].map((field) => (
                <div key={field} className="space-y-2">
                  <label className="font-medium">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    value={farmerDetails[field]}
                    onChange={(e) =>
                      handleFarmerDetailsChange(field, e.target.value)
                    }
                    className="w-full p-2 border rounded-md dark:bg-gray-500"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label className="font-medium">Crop Type</label>
                <select
                  value={farmerDetails.cropType}
                  onChange={(e) =>
                    handleFarmerDetailsChange("cropType", e.target.value)
                  }
                  className="w-full p-2 border rounded-md dark:bg-gray-500"
                >
                  <option value="organic">Organic</option>
                  <option value="inorganic">Inorganic</option>
                </select>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={toggleEditForm}
                  className="w-full py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Form */}
      <div className="w-full max-w-2xl p-4 mx-auto bg-white rounded-lg shadow-md sm:p-6 dark:bg-gray-500">
        <h2 className="mb-4 text-lg font-semibold text-center sm:text-xl">
          {editingIndex !== null ? "Edit Product" : "Post a New Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Product Name</label>
            <input
              value={newProduct.name}
              onChange={(e) => handleNewProductChange("name", e.target.value)}
              placeholder="Enter product name"
              required
              className="w-full p-2 border rounded-md dark:bg-gray-200"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={newProduct.description}
              onChange={(e) =>
                handleNewProductChange("description", e.target.value)
              }
              placeholder="Write description about product"
              required
              className="w-full h-24 p-2 border rounded-md resize-none dark:bg-gray-200"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Category</label>
            <select
              value={newProduct.category}
              onChange={(e) =>
                handleNewProductChange("category", e.target.value)
              }
              className="w-full p-2 border rounded-md dark:bg-gray-200"
              required
            >
              <option value="">Select a category</option>
              <option value="Crop">Crop</option>
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-sm font-medium">Price (PKR)</label>
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  handleNewProductChange("price", e.target.value)
                }
                placeholder="0.00"
                min="0"
                required
                className="w-full p-2 border rounded-md dark:bg-gray-200"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Quantity (kg)</label>
              <input
                type="number"
                value={newProduct.quantity}
                onChange={(e) =>
                  handleNewProductChange("quantity", e.target.value)
                }
                placeholder="0"
                min="0"
                required
                className="w-full p-2 border rounded-md dark:bg-gray-200"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Product Image</label>
            {newProductImagePreview ? (
              <div className="relative w-full h-48 overflow-hidden border rounded-md">
                <img
                  src={newProductImagePreview}
                  alt="Product preview"
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  className="absolute p-1 text-white bg-red-500 rounded-full top-2 right-2"
                  onClick={() => setNewProductImagePreview(null)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 border border-dashed rounded-md dark:bg-gray-700">
                <ImagePlus className="w-10 h-10 mb-2 text-gray-400" />
                <p className="mb-2 text-sm text-center text-gray-500">
                  Tap to upload or drag & drop
                </p>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleNewProductImageChange(e.target.files?.[0] || null)
                  }
                  className="hidden"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-sm text-white bg-green-800 rounded-md dark:bg-green-700 hover:bg-green-700 dark:hover:bg-green-600"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  Select Image
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 sm:text-base"
          >
            Post Product
          </button>
        </form>
      </div>

      {/*posted products*/}
      {/* posted products */}
      <div className="max-w-[1500px] mx-auto bg-white shadow-lg rounded-xl p-4 sm:p-6 hover:shadow-xl transition-shadow dark:bg-gray-500">
        <h2 className="mb-4 text-lg font-semibold text-center text-gray-800 sm:text-xl dark:text-white">
          Posted Products
        </h2>
        {products.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300">
            No products posted yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:w-[1250px] sm:w-full">
            {products.map((prod) => (
              <div
                key={prod._id}
                className="relative flex flex-col items-center p-3 border rounded-lg shadow-sm cursor-pointer sm:p-4 hover:bg-slate-100 dark:hover:bg-gray-600"
              >
                {prod.imageFile.url && (
                  <img
                    src={prod.imageFile.url}
                    alt={prod.title}
                    className="object-cover w-full mb-2 rounded-md h-28 sm:h-40"
                  />
                )}
                <h3 className="text-sm font-medium text-center text-gray-800 sm:text-base dark:text-white">
                  {prod.title}
                </h3>
                <p className="text-xs text-center text-gray-600 sm:text-sm dark:text-gray-300">
                  {prod.description}
                </p>
                <p className="text-xs text-center text-gray-700 sm:text-sm dark:text-gray-200">
                  Category: {prod.category}
                </p>
                <p className="text-xs text-center text-gray-700 sm:text-sm dark:text-gray-200">
                  Price: {prod.price} PKR
                </p>
                <p className="text-xs text-center text-gray-700 sm:text-sm dark:text-gray-200">
                  Qty: {prod.quantity} kg
                </p>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(prod._id)}
                  className="absolute p-1 text-white bg-yellow-500 rounded-full top-1 left-1 hover:bg-yellow-600 dark:text-black"
                  title="Edit product"
                >
                  <Edit className="w-3 h-3" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(prod._id)}
                  className="absolute p-1 text-white bg-red-500 rounded-full top-1 right-1 hover:bg-red-600"
                  title="Delete product"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-lg font-semibold">Delete Product</h2>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmPopup && tempProfileImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:text-white">
            <h2 className="mb-4 text-lg font-semibold text-center">
              Confirm Profile Picture
            </h2>
            <img
              src={tempProfileImage}
              alt="Preview"
              className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
            />
            <p className="mb-4 text-center text-gray-600 dark:text-gray-300">
              Do you want to use this picture as your profile image?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setProfileImage(tempProfileImage);
                  localStorage.setItem(
                    "profileImage_" + userId,
                    tempProfileImage
                  );
                  setShowConfirmPopup(false);
                  setTempProfileImage(null);
                }}
                className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowConfirmPopup(false);
                  setTempProfileImage(null);
                }}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isProductEditing && (
        <ProductFormModal
          product={product}
          productId={productIdToBeUpdate}
          imagePreview={imagePreview}
          onClose={() => setIsProductEditing(false)}
          onChange={handleChange}
          onImageChange={handleProductImageChange}
          isProductEditing={true}
        />
      )}
    </div>
  );
}
