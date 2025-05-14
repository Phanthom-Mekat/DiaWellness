import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { 
  Upload, 
  File, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  Loader2, 
  Calendar,
  FileText,
  Tag
} from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';

export default function DiagnosisReport() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [reportDetails, setReportDetails] = useState({
    date: '',
    type: '',
    doctor: '',
    description: ''
  });

  const reportTypes = [
    'Blood Test',
    'X-Ray',
    'MRI Scan',
    'CT Scan',
    'Ultrasound',
    'ECG',
    'Pathology',
    'Other'
  ];

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxSize: 10485760, // 10MB
    maxFiles: 5,
  });

  const removeFile = (index) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      toast.error('Please upload at least one file');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      
      // Add files to FormData
      files.forEach(file => {
        formData.append('files', file.file);
      });
      
      // Add report details
      formData.append('date', reportDetails.date);
      formData.append('type', reportDetails.type);
      formData.append('doctor', reportDetails.doctor);
      formData.append('description', reportDetails.description);
      formData.append('patientId', '100000'); // Replace with actual patient ID from auth/session

      // Update progress for each file
      const config = {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setFiles(prev => prev.map(f => ({ ...f, progress })));
        },
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };

      // Send request to backend
      const response = await axios.post(
        'http://localhost:5000/api/reports/upload',
        formData,
        config
      );

      // Update file statuses
      setFiles(prev => prev.map(f => ({ ...f, status: 'completed' })));
      toast.success('Reports uploaded successfully!');
      
      // Reset form after successful upload
      setReportDetails({
        date: '',
        type: '',
        doctor: '',
        description: ''
      });
      setFiles([]);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.error || 'Failed to upload reports');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:py-6 sm:px-4 md:py-8 md:px-6">
      <div className="max-w-xl md:max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 sm:px-5 sm:py-4 bg-blue-500">
            <h1 className="text-xl sm:text-2xl font-bold text-white">Upload Medical Reports</h1>
            <p className="text-blue-100 text-xs sm:text-sm mt-1">
              Upload your diagnosis reports, test results, or medical documents
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-3 sm:p-4 md:p-6">
            {/* Report Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Report Date
                </label>
                <input
                  type="date"
                  value={reportDetails.date}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Report Type
                </label>
                <select
                  value={reportDetails.type}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  required
                >
                  <option value="">Select type</option>
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Doctor's Name
                </label>
                <input
                  type="text"
                  value={reportDetails.doctor}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, doctor: e.target.value }))}
                  placeholder="Enter doctor's name"
                  className="w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Description
                </label>
                <input
                  type="text"
                  value={reportDetails.description}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the report"
                  className="w-full rounded border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* File Upload Area */}
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded p-4 sm:p-6 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}`}
            >
              <input {...getInputProps()} />
              <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500 mx-auto mb-2 sm:mb-3" />
              <p className="text-sm text-gray-600">
                {isDragActive ? (
                  'Drop your files here...'
                ) : (
                  <>
                    Drag & drop files, or <span className="text-blue-500">browse</span>
                  </>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supported: PDF, PNG, JPG (max 10MB)
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 sm:p-3 rounded">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <File className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
                      <div className="truncate max-w-xs">
                        <p className="text-xs sm:text-sm font-medium text-gray-700 truncate">
                          {file.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center ml-2 sm:ml-4">
                      {file.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                      ) : file.progress > 0 ? (
                        <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div
                            className="bg-blue-500 h-1.5 sm:h-2 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-4 sm:mt-6">
              <button
                type="submit"
                disabled={uploading || files.length === 0}
                className="w-full sm:w-auto sm:float-right px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Upload Reports
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}