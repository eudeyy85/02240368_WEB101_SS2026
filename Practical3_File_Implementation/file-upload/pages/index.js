import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm();

  const validateFile = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG, and PDF files are allowed.";
    }
    if (file.size > maxSize) {
      return "File size must be less than 5MB.";
    }
    return true;
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      const validation = validateFile(file);
      if (validation !== true) {
        setError("file", { type: "manual", message: validation });
        return;
      }
      clearErrors("file");
      setUploadedFile(file);
      setValue("file", file);
    },
    [setValue, setError, clearErrors]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const onSubmit = async () => {
    if (!uploadedFile) {
      setError("file", { type: "manual", message: "Please select a file." });
      return;
    }
    const formData = new FormData();
    formData.append("file", uploadedFile);
    try {
      setUploadStatus("");
      setUploadProgress(0);
      const response = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percent);
        },
      });
      setUploadStatus(`success:${response.data.message} — ${response.data.filename}`);
    } catch (error) {
      setUploadStatus("error:Upload failed. Please try again.");
    }
  };

  const isSuccess = uploadStatus.startsWith("success:");
  const isError = uploadStatus.startsWith("error:");
  const statusMessage = uploadStatus.replace(/^(success|error):/, "");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📁 File Upload
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
              ${isDragActive
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50"
              }`}
          >
            <input {...getInputProps()} />
            <div className="text-4xl mb-3">
              {uploadedFile ? "📄" : "☁️"}
            </div>
            {uploadedFile ? (
              <div>
                <p className="font-semibold text-gray-700">{uploadedFile.name}</p>
                <p className="text-sm text-gray-400 mt-1">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            ) : isDragActive ? (
              <p className="text-blue-500 font-medium">Drop the file here...</p>
            ) : (
              <div>
                <p className="text-gray-600">
                  Drag & drop a file here, or{" "}
                  <span className="text-blue-500 font-semibold">click to browse</span>
                </p>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-3">
              Allowed: JPG, PNG, PDF · Max size: 5MB
            </p>
          </div>

          {errors.file && (
            <p className="text-red-500 text-sm -mt-2">
              ⚠️ {errors.file.message}
            </p>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {uploadStatus && (
            <div
              className={`text-sm text-center font-medium px-4 py-3 rounded-lg
                ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
            >
              {isSuccess ? "✅" : "❌"} {statusMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-xl transition-colors duration-200"
          >
            Upload File
          </button>

        </form>
      </div>
    </div>
  );
}