import React, { useState } from 'react';
import {
  Box, Typography, Paper, Button, Grid, Card, CardContent,
  CircularProgress, Divider, Alert
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const MRIAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{prediction: string, confidence: number} | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('patient_id', 'PT-001'); // Mock patient ID for now

    try {
      const response = await fetch('http://localhost:8080/api/v1/mri/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze MRI');
      }

      const data = await response.json();
      setResult({
        prediction: data.prediction_label || 'Unknown',
        confidence: data.confidence || 0.95
      });
    } catch (err) {
      setError('Error connecting to the analysis service. Please ensure the backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>MRI Analysis</Typography>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 4, textAlign: 'center', border: '2px dashed rgba(0,0,0,0.1)', bgcolor: 'rgba(0,0,0,0.01)' }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="mri-upload-input"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="mri-upload-input">
              <Box sx={{ cursor: 'pointer', mb: 2 }}>
                {preview ? (
                  <Box component="img" src={preview} sx={{ width: '100%', maxHeight: 300, borderRadius: 2, objectFit: 'contain' }} />
                ) : (
                  <Box sx={{ py: 8 }}>
                    <CloudUploadIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2, opacity: 0.5 }} />
                    <Typography variant="h6">Drag and drop or click to upload MRI</Typography>
                    <Typography variant="body2" color="textSecondary">Supported formats: JPG, PNG, DICOM</Typography>
                  </Box>
                )}
              </Box>
              <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                {preview ? 'Change Image' : 'Select MRI Image'}
              </Button>
            </label>
          </Paper>

          {selectedFile && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={handleAnalyze}
                disabled={loading}
                sx={{ px: 6, py: 1.5, borderRadius: 10, bgcolor: '#00d084', '&:hover': { bgcolor: '#00b874' } }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Run Analysis'}
              </Button>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>Analysis Result</Typography>
              <Divider sx={{ mb: 3 }} />

              {!result && !loading && !error && (
                <Box sx={{ textAlign: 'center', py: 8, opacity: 0.5 }}>
                  <ImageIcon sx={{ fontSize: 48, mb: 2 }} />
                  <Typography>Upload an MRI image to see detection results</Typography>
                </Box>
              )}

              {loading && (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <CircularProgress size={48} sx={{ mb: 2 }} />
                  <Typography variant="h6">Analyzing Image...</Typography>
                  <Typography variant="body2" color="textSecondary">Applying CNN Model for Tumor Detection</Typography>
                </Box>
              )}

              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>{error}</Alert>
              )}

              {result && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Box sx={{
                      width: 64, height: 64, borderRadius: '50%',
                      bgcolor: result.prediction === 'No Tumor' ? 'success.light' : 'error.light',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {result.prediction === 'No Tumor' ?
                        <CheckCircleIcon sx={{ fontSize: 32, color: 'success.main' }} /> :
                        <WarningIcon sx={{ fontSize: 32, color: 'error.main' }} />
                      }
                    </Box>
                    <Box>
                      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{result.prediction}</Typography>
                      <Typography variant="body2" color="textSecondary">Detection Status</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" gutterBottom>Model Confidence Score</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1, height: 8, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 4, overflow: 'hidden' }}>
                        <Box sx={{ width: `${result.confidence * 100}%`, height: '100%', bgcolor: 'primary.main' }} />
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{(result.confidence * 100).toFixed(1)}%</Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                    Note: This is an AI-generated analysis and should be verified by a professional radiologist.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MRIAnalysis;
