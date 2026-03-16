import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Divider,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert,
  IconButton
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  PlayArrow as PlayIcon,
  Description as ReportIcon,
  CheckCircle as SuccessIcon,
  History as HistoryIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

const MRIAnalysis = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [tab, setTab] = useState(0);
  const [history, setHistory] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchHistory = () => {
    fetch('http://localhost:8080/api/v1/mri/recent')
      .then(res => res.json())
      .then(data => setHistory(data.scans || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleStartAnalysis = async () => {
    if (!file) return;
    setAnalyzing(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('patient_id', 'BUM-' + Math.floor(Math.random() * 1000)); // Sample ID

    try {
      const res = await fetch('http://localhost:8080/api/v1/mri/analyze', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setResult({
          prediction: data.prediction_label,
          confidence: data.confidence,
          area: 'Detected Area', // Placeholder
          size: 'Estimated size: 12mm', // Placeholder
        });
        fetchHistory();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">MRI Analysis</Typography>
        <Typography variant="body2" color="text.secondary">Upload and process brain MRI scans for automated tumor detection.</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={3}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>Scan Upload</Typography>
                <input
                  type="file"
                  id="mri-upload"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <label htmlFor="mri-upload">
                  <Box
                    sx={{
                      border: '2px dashed #e0e0e0',
                      borderRadius: 4,
                      p: 6,
                      textAlign: 'center',
                      bgcolor: '#fafafa',
                      mb: 3,
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f0f0f0', borderColor: '#135bec' }
                    }}
                  >
                    <UploadIcon sx={{ fontSize: 48, color: file ? '#135bec' : '#bdbdbd', mb: 2 }} />
                    <Typography variant="h6" color="text.primary">
                      {file ? file.name : 'Click or drag MRI scan here'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">Supports DICOM, JPEG, PNG (Max 50MB)</Typography>
                  </Box>
                </label>

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={analyzing ? null : <PlayIcon />}
                    disabled={analyzing || !file}
                    sx={{ borderRadius: 2, bgcolor: '#135bec' }}
                    onClick={handleStartAnalysis}
                  >
                    {analyzing ? 'Processing...' : 'Start ML Analysis'}
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                    onClick={() => { setFile(null); setResult(null); }}
                  >
                    Clear Scan
                  </Button>
                </Stack>

                {analyzing && (
                  <Box mt={3}>
                    <Typography variant="body2" mb={1}>Analyzing patterns and extracting features...</Typography>
                    <LinearProgress sx={{ borderRadius: 2, height: 8 }} />
                  </Box>
                )}
              </CardContent>
            </Card>

            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                  <HistoryIcon color="action" />
                  <Typography variant="h6" fontWeight="bold">Recent History</Typography>
                </Stack>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Patient</TableCell>
                        <TableCell>Result</TableCell>
                        <TableCell align="right">View</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {history.map((h, i) => (
                        <TableRow key={i} hover>
                          <TableCell>{new Date(h.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{h.patient_id}</TableCell>
                          <TableCell>
                            <Chip label={h.prediction} size="small" color={h.prediction === 'No Tumor' ? 'success' : 'error'} variant="outlined" />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton size="small"><ViewIcon fontSize="small"/></IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ borderRadius: 4, height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Analysis Results</Typography>

              {!result && !analyzing && (
                <Box textAlign="center" py={10}>
                  <Typography color="text.secondary">No active analysis. Please upload and start a scan.</Typography>
                </Box>
              )}

              {result && (
                <Box>
                  <Alert icon={<SuccessIcon />} severity="success" sx={{ borderRadius: 3, mb: 3 }}>
                    Analysis Complete
                  </Alert>

                  <Stack spacing={3} mb={4}>
                    <Box>
                      <Typography variant="caption" color="text.secondary">PREDICTED CLASS</Typography>
                      <Typography variant="h4" fontWeight="bold" color={result.prediction === 'No Tumor' ? '#2e7d32' : '#d32f2f'}>
                        {result.prediction}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption" color="text.secondary">CONFIDENCE SCORE</Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <LinearProgress
                          variant="determinate"
                          value={result.confidence}
                          sx={{ flex: 1, height: 10, borderRadius: 5 }}
                          color={result.confidence > 90 ? "success" : "warning"}
                        />
                        <Typography fontWeight="bold">{result.confidence?.toFixed(1)}%</Typography>
                      </Stack>
                    </Box>
                  </Stack>

                  <Divider sx={{ mb: 3 }} />

                  <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
                    <Tab label="Clinical" />
                    <Tab label="System" />
                  </Tabs>

                  {tab === 0 && (
                    <Stack spacing={2}>
                      <Box display="flex" justifyContent="space-between" p={1.5} bgcolor="#f8f9fa" borderRadius={2}>
                        <Typography variant="body2" color="text.secondary">Region</Typography>
                        <Typography variant="body2" fontWeight="bold">{result.area}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between" p={1.5} bgcolor="#f8f9fa" borderRadius={2}>
                        <Typography variant="body2" color="text.secondary">Measurement</Typography>
                        <Typography variant="body2" fontWeight="bold">{result.size}</Typography>
                      </Box>
                    </Stack>
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ReportIcon />}
                    sx={{ mt: 4, borderRadius: 2, bgcolor: '#135bec', height: 48 }}
                  >
                    Generate Diagnostic Report
                  </Button>
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
