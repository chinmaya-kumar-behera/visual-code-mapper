"use client";

import React, { useState } from "react";

interface CodeUploadProps {
  onProcess: (data: any) => void;
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export default function CodeUpload({ onProcess, isLoggedIn, onLoginClick }: CodeUploadProps) {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      let response;
      if (url) {
        response = await fetch("/api/upload/url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
      } else if (file) {
        const formData = new FormData();
        formData.append("file", file);
        response = await fetch("/api/upload/zip", {
          method: "POST",
          body: formData,
        });
      } else {
        setError("Please provide a GitHub repo URL or upload a ZIP file.");
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const err = await response.text();
        setError("Upload failed: " + err);
        setLoading(false);
        return;
      }

      const data = await response.json();
      onProcess(data);
    } catch (err) {
      setError("Error processing upload.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Code</h2>
      <div className="mb-4">
        <label htmlFor="url" className="block mb-1 font-medium">
          GitHub Repo URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="https://github.com/user/repo"
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="zip" className="block mb-1 font-medium">
          Or Upload ZIP File
        </label>
        <input type="file" id="zip" accept=".zip" onChange={handleFileChange} />
      </div>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Process Code"}
      </button>
      {!isLoggedIn && (
        <div className="mt-4">
          <button
            onClick={onLoginClick}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Login to Save Project
          </button>
        </div>
      )}
    </div>
  );
}
