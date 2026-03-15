import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Avatar
} from '@mui/material';
import { Assignment as AssignmentIcon } from '@mui/icons-material';

const ActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/logs')
      .then(res => res.json())
      .then(data => setLogs(data.logs || []));
  }, []);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>Log Aktivitas</Typography>

      <TableContainer component={Paper} sx={{ borderRadius: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Aksi</TableCell>
              <TableCell>Modul</TableCell>
              <TableCell>Timestamp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} hover>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ width: 32, height: 32, fontSize: '0.8rem', bgcolor: 'primary.light' }}>
                      {log.user_id?.substring(0, 1) || 'U'}
                    </Avatar>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>{log.user_id || 'System'}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>
                  <Chip label={log.module} size="small" variant="outlined" />
                </TableCell>
                <TableCell sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>
                  {new Date(log.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {logs.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 3, opacity: 0.5 }}>
                  Belum ada log aktivitas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ActivityLogs;
