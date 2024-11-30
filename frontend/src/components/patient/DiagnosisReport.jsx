import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ToastContainer, toast } from 'react-toastify';
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

    // Simulate file upload with progress
    const uploadPromises = files.map((file, index) => {
      return new Promise((resolve) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setFiles(prev => {
            const newFiles = [...prev];
            newFiles[index] = { ...newFiles[index], progress };
            return newFiles;
          });

          if (progress >= 100) {
            clearInterval(interval);
            setFiles(prev => {
              const newFiles = [...prev];
              newFiles[index] = { ...newFiles[index], status: 'completed' };
              return newFiles;
            });
            resolve();
          }
        }, 300);
      });
    });

    await Promise.all(uploadPromises);
    setUploading(false);
    toast.success('Reports uploaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 bg-blue-500">
            <h1 className="text-2xl font-bold text-white">Upload Medical Reports</h1>
            <p className="text-purple-100 mt-1">
              Upload your diagnosis reports, test results, or medical documents
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Report Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Report Date
                </label>
                <input
                  type="date"
                  value={reportDetails.date}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Report Type
                </label>
                <select
                  value={reportDetails.type}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, type: e.target.value }))}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {reportTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Tag className="w-4 h-4 mr-2" />
                  Doctor's Name
                </label>
                <input
                  type="text"
                  value={reportDetails.doctor}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, doctor: e.target.value }))}
                  placeholder="Enter doctor's name"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Description
                </label>
                <input
                  type="text"
                  value={reportDetails.description}
                  onChange={(e) => setReportDetails(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Brief description of the report"
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* File Upload Area */}
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'}`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <p className="text-gray-600">
                {isDragActive ? (
                  'Drop your files here...'
                ) : (
                  <>
                    Drag & drop your files here, or <span className="text-purple-500">browse</span>
                  </>
                )}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: PDF, PNG, JPG (max 10MB)
              </p>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="mt-6 space-y-4">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <File className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {file.file.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(file.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {file.status === 'completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : file.progress > 0 ? (
                        <div className="w-24 bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-purple-500 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={uploading || files.length === 0}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
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