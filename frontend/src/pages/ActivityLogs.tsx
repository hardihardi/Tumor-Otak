import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  TextField,
  InputAdornment,
  Stack,
  IconButton,
  Tooltip,
  Skeleton
} from '@mui/material';
import {
  Search as SearchIcon,
  Info as InfoIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';

const ActivityLogs = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/logs')
      .then(res => res.json())
      .then(data => {
        setLogs(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredLogs = logs.filter(log =>
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.module.toLowerCase().includes(search.toLowerCase()) ||
    (log.user_id && log.user_id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4" fontWeight="bold">Activity Logs</Typography>
        <Typography variant="body2" color="text.secondary">Audit trail for all user actions and system events.</Typography>
      </Box>

      <Card sx={{ borderRadius: 4, overflow: 'hidden' }}>
        <Box p={3} borderBottom="1px solid #f0f0f0">
          <Stack direction="row" spacing={2}>
            <TextField
              placeholder="Search logs..."
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: 400 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton sx={{ bgcolor: '#f5f5f5' }}>
              <FilterIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead sx={{ bgcolor: '#f8f9fa' }}>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Module</TableCell>
                <TableCell>Timestamp</TableCell>
                <TableCell align="right">Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                [1,2,3,4,5].map(i => (
                  <TableRow key={i}><TableCell colSpan={5}><Skeleton /></TableCell></TableRow>
                ))
              ) : filteredLogs.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight="bold">
                      {log.user_id || 'System'}
                    </Typography>
                  </TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>
                    <Chip label={log.module} size="small" variant="outlined" />
                  </TableCell>
                  <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="View JSON data">
                      <IconButton size="small">
                        <InfoIcon fontSize="small" color="action" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {!loading && filteredLogs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography color="text.secondary">No logs found.</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default ActivityLogs;
