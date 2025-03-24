import { useState, useEffect } from "react";
import { FaCloudUploadAlt, FaTrash, FaSearch, FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Tesseract from "tesseract.js"; // Import Tesseract.js for OCR
import React from "react";

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recognizedText, setRecognizedText] = useState(""); // Store extracted text
  const [products, setProducts] = useState([]); // Store products from Firebase
  const [user, setUser] = useState(null);
  const [progress, setProgress] = useState(0); // Track progress of text extraction
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/login");
      } else {
        setUser(currentUser);
      }
    });

    // Fetch products from Firebase
    fetch("https://pharmhub-87fa3-default-rtdb.firebaseio.com/skincare.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const productList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
          setProducts(productList);
        }
      })
      .catch((err) => console.error("Error fetching products:", err));

    return () => unsubscribe();
  }, [navigate]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    validateFile(uploadedFile);
  };

  const validateFile = (uploadedFile) => {
    if (!uploadedFile) return;

    const allowedTypes = ["image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(uploadedFile.type)) {
      setError("Only JPG and PNG files are allowed.");
      setFile(null);
      return;
    }

    if (uploadedFile.size > maxSize) {
      setError("File size must be less than 5MB.");
      setFile(null);
      return;
    }

    setError("");
    setFile(uploadedFile);
    extractText(uploadedFile); // Extract text from the uploaded image
  };

  const extractText = async (imageFile) => {
    setUploading(true);
    setProgress(0); // Reset progress

    try {
      const { data: { text } } = await Tesseract.recognize(imageFile, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.floor(m.progress * 100)); // Update progress
          }
        },
      });
      setRecognizedText(text); // Store extracted text
    } catch (error) {
      setError("Error extracting text from the image.");
    }
    setUploading(false);
  };

  const handleRemove = () => {
    setFile(null);
    setError("");
    setSuccess(false);
    setRecognizedText("");
    setProgress(0); // Reset progress
  };

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setSuccess(false);

    // Match recognized text with product names
    const matchedProducts = products.filter((product) =>
      recognizedText.toLowerCase().includes(product.product_name.toLowerCase())
    );

    setTimeout(() => {
      setUploading(false);
      setSuccess(true);

      // Navigate to results page with matched products or "Not Available" message
      if (matchedProducts.length > 0) {
        navigate("/prescription-medicine", { state: { products: matchedProducts } });
      } else {
        navigate("/prescription-medicine", { state: { products: [] } });
      }
    }, 2000);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-blue-50 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Upload Your Prescription
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Upload a clear image of your prescription, and we'll help you find the medicines you need.
        </p>

        {/* File Upload Section */}
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-lg p-8 cursor-pointer hover:bg-green-50 transition-colors duration-300">
          <FaCloudUploadAlt size={60} className="text-green-500 mb-4" />
          <p className="text-lg text-gray-700 font-semibold mb-2">
            Drag & drop or click to upload
          </p>
          <p className="text-sm text-gray-500">Supports JPG and PNG files (max 5MB)</p>
          <input
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        </label>

        {/* Error Message */}
        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Uploaded File Preview */}
        {file && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between">
            <span className="text-gray-700">{file.name}</span>
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
            >
              <FaTrash size={18} />
            </button>
          </div>
        )}

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-6">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Extracting text... {progress}%</p>
          </div>
        )}

        {/* Extracted Text Preview */}
        {recognizedText && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-semibold text-gray-700 mb-2">Detected Medicines:</h3>
            <p className="text-gray-600 text-sm">{recognizedText}</p>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`mt-8 w-full flex items-center justify-center bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 ${
            !file || uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {uploading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </span>
          ) : (
            <span className="flex items-center">
              <FaSearch className="mr-2" />
              Upload & Search
            </span>
          )}
        </button>

        {/* Success Message */}
        {success && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm flex items-center">
            <FaCheckCircle className="mr-2" />
            ✅ Prescription uploaded! Redirecting to results...
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionUpload;