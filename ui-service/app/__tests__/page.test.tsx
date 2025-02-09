import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../page';

// Mock the fetch function globally
global.fetch = jest.fn() as jest.Mock;

describe('Home component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  test('renders correctly', () => {
    render(<Home />);
    expect(screen.getByText('Object Detection using YOLO (v11)')).toBeInTheDocument();
    expect(screen.getByText('Drag & drop an image here, or click to select one')).toBeInTheDocument();
    expect(screen.getByText('Detect')).toBeInTheDocument();
  });

  test('shows error if no file is selected', async () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Detect'));
    expect(await screen.findByText('Please select a file before uploading.')).toBeInTheDocument();
  });

  test('shows error for invalid file type', async () => {
    render(<Home />);
    const input = screen.getByLabelText('Upload your image via file manager');
    const file = new File(['test'], 'test.txt', { type: 'text/plain' });
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByText('Please select a valid image file (JPEG, PNG).')).toBeInTheDocument();
  });

  test('shows error for large file size', async () => {
    render(<Home />);
    const input = screen.getByLabelText('Upload your image via file manager');
    const file = new File(['a'.repeat(3 * 1024 * 1024)], 'large-image.jpg', { type: 'image/jpeg' }); // 3MB file
    fireEvent.change(input, { target: { files: [file] } });
    expect(await screen.findByText('File size should not exceed 2MB.')).toBeInTheDocument();
  });

  test('handles successful file upload', async () => {
    // Mock the fetch response for a successful upload
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ object: 'dog', confidence: 0.95 }],
        image: 'base64EncodedImageString'
      }),
    });

    render(<Home />);
    const input = screen.getByLabelText('Upload your image via file manager');
    const file = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByText('Detect'));

    expect(await screen.findByText('File uploaded successfully!')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/predict', expect.objectContaining({
      method: 'POST',
      body: expect.any(FormData),
    }));
  });

  test('handles failed file upload', async () => {
    // Mock the fetch response for a failed upload
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async() => ({
        detail: 'Failed to upload the file'
      }),
    });

    render(<Home />);
    const input = screen.getByLabelText('Upload your image via file manager');
    const file = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByText('Detect'));

    expect(await screen.findByText('Error uploading the file: Failed to upload the file')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/predict', expect.objectContaining({
      method: 'POST',
      body: expect.any(FormData),
    }));
  });

  test('clears error message on valid file selection', async () => {
    render(<Home />);
    fireEvent.click(screen.getByText('Detect'));
    expect(await screen.findByText('Please select a file before uploading.')).toBeInTheDocument();

    const input = screen.getByLabelText('Upload your image via file manager');
    const file = new File(['image'], 'image.jpg', { type: 'image/jpeg' });
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.queryByText('Please select a file before uploading.')).not.toBeInTheDocument();
  });
});
