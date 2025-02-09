"use client";
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './page.module.css';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [detectedImage, setDetectedImage] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const image_valid = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png'];

    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG).');
      setSelectedFile(null);
      setMessage(null);
      return false;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      setError('File size should not exceed 2MB.');
      setSelectedFile(null);
      setMessage(null);
      return false;
    }

    setSelectedFile(file);
    setError(null);
    setMessage(null);
    return true;
  };

  const display_image = (file: File): void => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setDetectedImage(null);  // Clear the detected image when a new image is uploaded
    };
    reader.readAsDataURL(file);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (image_valid(file)) {
      display_image(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (image_valid(file)) {
        display_image(file);
      }
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (!selectedFile) {
      setError('Please select a file before uploading.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        //setSelectedFile(null);  // Clear the selected file if there's an error
        throw new Error(errorResponse.detail || 'Failed to upload the file.');
      }

      const data = await response.json();
      console.log('Response Data:', data);

      setMessage('File uploaded successfully!');
      setResults(JSON.parse(data.results));
      setDetectedImage(`data:image/png;base64,${btoa(data.image)}`);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setError('Error uploading the file: ' + error.message);
        setResults(null);
        //setImage(null);
        setDetectedImage(null);
        setLoading(false);
      }
    }
  };

  const openFullscreenImage = (img: string): void => {
    setFullscreenImage(img);
  };

  const closeFullscreenImage = (): void => {
    setFullscreenImage(null);
  };

  return (
    <div className={styles.container}>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} aria-label="Drag and drop an image here, or click to select one" />
        {image ? (
          <div className={styles.imagePreview}>
            <img src={image} alt="Selected" />
          </div>
        ) : (
          <p>Drag & drop an image here, or click to select one</p>
        )}
      </div>
      <input
        type="file"
        className={styles.fileInput}
        onChange={handleFileChange}
        aria-label="Upload your image via file manager"
      />
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleUpload}>
          Detect
        </button>
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {message && <div className={styles.message}>{message}</div>}
      {results && (
        <div className={styles.resultsContainer}>
          {detectedImage && (
            <div className={styles.detectedImageContainer} onClick={() => openFullscreenImage(detectedImage)}>
              <img src={detectedImage} alt="Detected objects" className={styles.detectedImage} />
            </div>
          )}
          <div className={styles.results}>
            <h2>Detection Results:</h2>
            <div className={styles.resultsBox}>
              <pre>{JSON.stringify(results, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
      {fullscreenImage && (
        <div className={styles.fullscreenModal} onClick={closeFullscreenImage}>
          <div className={styles.fullscreenContent}>
            <span className={styles.closeButton} onClick={closeFullscreenImage}>&times;</span>
            <img src={fullscreenImage} alt="Fullscreen" className={styles.fullscreenImage} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
