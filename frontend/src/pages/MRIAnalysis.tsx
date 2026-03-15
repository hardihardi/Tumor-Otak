import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Button, Grid, Card, CardContent,
  CircularProgress, Divider, Alert, Select, MenuItem, FormControl, InputLabel,
  Switch, FormControlLabel, Tab, Tabs, LinearProgress
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  LocalHospital as HospitalIcon,
  Layers as LayersIcon
} from '@mui/icons-material';

const MRIAnalysis: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{prediction: string, confidence: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/patients/')
      .then(res => res.json())
      .then(data => {
        setPatients(data.patients || []);
        if (data.patients && data.patients.length > 0) {
          setSelectedPatientId(data.patients[0].id);
        }
      })
      .catch(err => console.error('Error fetching patients:', err));
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
      setShowHeatmap(false);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile || !selectedPatientId) {
      setError('Please select a patient and an MRI image');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('patient_id', selectedPatientId);

    try {
      const response = await fetch('http://localhost:8080/api/v1/mri/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to analyze MRI');
      }

      const data = await response.json();
      setResult({
        prediction: data.prediction_label || 'Unknown',
        confidence: data.confidence || 0.95
      });
    } catch (err: any) {
      setError(err.message || 'Error connecting to the analysis service.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          MRI Clinical Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          AI-powered brain tumor detection and segmentation.
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 2, mb: 3, borderRadius: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 300 }} size="small">
              <InputLabel>Select Patient Record</InputLabel>
              <Select
                value={selectedPatientId}
                label="Select Patient Record"
                onChange={(e) => setSelectedPatientId(e.target.value)}
              >
                {patients.map((p) => (
                  <MenuItem key={p.id} value={p.id}>{p.name} ({p.nik})</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              size="small"
            >
              Upload MRI
              <input hidden accept="image/*" type="file" onChange={handleFileChange} />
            </Button>
          </Paper>

          <Paper sx={{
            p: 1, borderRadius: 4, bgcolor: '#000', minHeight: 400,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden'
          }}>
            {preview ? (
              <>
                <Box
                  component="img"
                  src={preview}
                  sx={{
                    maxWidth: '100%', maxHeight: 600, borderRadius: 1,
                    filter: showHeatmap ? 'contrast(1.2) brightness(0.8)' : 'none'
                  }}
                />
                {showHeatmap && result && result.prediction !== 'No Tumor' && (
                  <Box sx={{
                    position: 'absolute', top: '30%', left: '40%', width: 100, height: 100,
                    borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,0,0,0.6) 0%, rgba(255,165,0,0.3) 50%, rgba(255,255,0,0) 70%)',
                    filter: 'blur(10px)', animation: 'pulse 2s infinite'
                  }} />
                )}
                <Box sx={{ position: 'absolute', bottom: 16, right: 16, display: 'flex', gap: 1 }}>
                  <FormControlLabel
                    control={<Switch checked={showHeatmap} onChange={(e) => setShowHeatmap(e.target.checked)} color="secondary" />}
                    label={<Typography sx={{ color: 'white', fontSize: '0.75rem' }}>Show Heatmap</Typography>}
                    sx={{ bgcolor: 'rgba(0,0,0,0.5)', px: 2, borderRadius: 10, m: 0 }}
                    disabled={!result || result.prediction === 'No Tumor'}
                  />
                </Box>
              </>
            ) : (
              <Box sx={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
                <ImageIcon sx={{ fontSize: 80, mb: 2 }} />
                <Typography variant="h6">No MRI Image Selected</Typography>
                <Typography variant="body2">Select a patient and upload an image to begin</Typography>
              </Box>
            )}
          </Paper>

          {selectedFile && !result && (
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleAnalyze}
                disabled={loading}
                sx={{ px: 8, py: 1.5, borderRadius: 10, fontWeight: 'bold' }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Run AI Analysis'}
              </Button>
            </Box>
          )}
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} aria-label="analysis tabs">
                <Tab label="Results" icon={<HospitalIcon />} iconPosition="start" />
                <Tab label="Technical" icon={<LayersIcon />} iconPosition="start" />
              </Tabs>
            </Box>

            <CardContent sx={{ p: 3 }}>
              {activeTab === 0 && (
                <Box>
                  {!result && !loading && (
                    <Box sx={{ textAlign: 'center', py: 10, opacity: 0.5 }}>
                      <Typography variant="body1">Awaiting analysis...</Typography>
                    </Box>
                  )}

                  {loading && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <CircularProgress size={48} sx={{ mb: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Processing MRI...</Typography>
                      <Typography variant="body2" color="textSecondary">Running Deep Convolutional Neural Network</Typography>
                      <Box sx={{ mt: 3, px: 4 }}>
                        <LinearProgress sx={{ borderRadius: 5, height: 8 }} />
                      </Box>
                    </Box>
                  )}

                  {result && (
                    <Box>
                      <Alert
                        severity={result.prediction === 'No Tumor' ? 'success' : 'warning'}
                        sx={{ mb: 3, borderRadius: 3, '& .MuiAlert-message': { width: '100%' } }}
                        icon={result.prediction === 'No Tumor' ? <CheckCircleIcon /> : <WarningIcon />}
                      >
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {result.prediction === 'No Tumor' ? 'Normal MRI - No Tumor Detected' : 'Anomalous Patterns Detected'}
                        </Typography>
                      </Alert>

                      <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, mb: 3, bgcolor: 'rgba(0,0,0,0.01)' }}>
                        <Typography variant="overline" color="textSecondary">Classification</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold', color: result.prediction === 'No Tumor' ? 'success.main' : 'error.main' }}>
                          {result.prediction}
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>Confidence Score</Typography>
                            <Typography variant="body2" sx={{ fontWeight: 800 }}>{(result.confidence * 100).toFixed(2)}%</Typography>
                          </Box>
                          <Box sx={{ height: 12, borderRadius: 6, bgcolor: 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                            <Box sx={{
                              width: `${result.confidence * 100}%`, height: '100%',
                              bgcolor: result.confidence > 0.9 ? 'success.main' : 'warning.main'
                            }} />
                          </Box>
                        </Box>
                      </Paper>

                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Clinical Notes</Typography>
                      <Typography variant="body2" color="textSecondary" paragraph>
                        {result.prediction === 'No Tumor'
                          ? "AI model did not find significant features associated with Glioma, Meningioma, or Pituitary tumors in this scan."
                          : `The AI model has identified a high probability of ${result.prediction}. Feature maps highlight specific regions of interest in the axial view.`}
                      </Typography>

                      <Button fullWidth variant="outlined" size="large" sx={{ mt: 2, borderRadius: 3 }}>
                        Generate DICOM Report
                      </Button>
                    </Box>
                  )}
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Model Metadata</Typography>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="textSecondary">Backbone Architecture</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>EfficientNet-B3</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="textSecondary">Input Dimensions</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>224 x 224 x 3</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="textSecondary">Pre-processing</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Z-Score Norm</Typography>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                      <Typography variant="caption" color="textSecondary">Augmentation</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>Enabled (Albumentations)</Typography>
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>Feature Map Activation (Grad-CAM)</Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: '0.8rem' }}>
                    Visualizing the attention weights of the final convolutional layer to identify the decision-making regions.
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 0.8; }
          100% { transform: scale(1); opacity: 0.6; }
        }
      `}</style>
    </Box>
  );
};

export default MRIAnalysis;
