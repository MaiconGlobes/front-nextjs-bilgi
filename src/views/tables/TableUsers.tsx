import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Snackbar, Grid, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import IconButton from '@mui/material/IconButton';
import TextAccount from 'mdi-material-ui/TextAccount';
import DeleteIcon from 'mdi-material-ui/Delete';
import FormUsers from '../form-layouts/FormUsers';
import MuiAlert from '@mui/material/Alert';
import AccountBox from 'mdi-material-ui/AccountBox';
import TStateForm from 'src/@core/@types/state_forms';
import axios from 'axios';

type FormUsersProps = {
  response: any;
  dadosVazios: string;
  fetchData: () => void;
}

const TableUsers: React.FC<FormUsersProps> = ({ response, dadosVazios, fetchData }) => {
  const [rows, setRows] = useState([]);
  const [stateForm, setStateForm] = useState<TStateForm>('inserção');
  const [registroAtual, setRegistroAtual] = useState<string>('');
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  useEffect(() => {
    handleInsert(dadosVazios);
    setRows(response?.retorno?.dados || []);
  }, [response, dadosVazios]);

  const handleView = (linhaRegistro: any) => {
    setStateForm('visualização');
    setRegistroAtual(linhaRegistro);
  };

  const handleInsert = async (dadosVazios: any) => {
    setStateForm('inserção');
    setRegistroAtual(dadosVazios);
  };

  const handleEdit = (linhaRegistro: any) => {
    setStateForm('edição');
    setRegistroAtual(linhaRegistro);
  };

  const handleDelete = async (linhaRegistro: any) => {
    try {
      await axios.delete(`http://localhost:3005/v1/api/usuario/deletar-usuario?id=${linhaRegistro.id}`);
      setSnackbarSeverity('success');
      setSnackbarMessage('Usuário deletado com sucesso!');
      setSnackbarOpen(true);
      fetchData(); 
    } catch (error) {
      console.error(error);
      setSnackbarSeverity('error');
      setSnackbarMessage('Erro ao deletar o usuário');
      setSnackbarOpen(true);
    }
  };

   const handleSave = (dadosRequest: any) => {
      const updatedRows = rows.map((row: any) => {
         if (row.id === dadosRequest.usuario.id) {
            return dadosRequest.usuario;
         }

         return row;
      });

      setRows(updatedRows as any);
      setRegistroAtual('');
      setSnackbarSeverity('success');
      setSnackbarMessage('Sucesso na operação!');
      setSnackbarOpen(true);
      fetchData(); 
   };

  const handleClose = () => {
    setRegistroAtual('');
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <TableContainer component={Paper}>
       <Table sx={{ minWidth: 650 }} aria-label=''>
         <TableHead>
           <TableRow>
             <TableCell>Nome do usuário</TableCell>
             <TableCell align='left'>Email</TableCell>
             <TableCell align='left'>Município</TableCell>
             <TableCell align='right'>Estado (UF)</TableCell>
             <TableCell align='center'>CEP</TableCell>
             <TableCell align='right' component={()=>(
                <Button sx={{marginLeft: '1rem', marginTop: '1.2rem', width: '80%', fontSize: '0.8rem'}}
                   onClick={handleInsert} 
                   variant='contained' 
                   size='small' 
                   color='primary'
                >
                + Usuário
                </Button>
             )}>CEP</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {rows.map((row: any) => (
             <TableRow key={row.id}>
               <TableCell component='th' scope='row'>
                 {row.nome}
               </TableCell>
               <TableCell align='left'>{row.email}</TableCell>
               <TableCell align='left'>{row.municipio}</TableCell>
               <TableCell align='right'>{row.uf}</TableCell>
               <TableCell align='center'>{row.cep}</TableCell>
               <TableCell align='right'>
                 <IconButton color='inherit' aria-haspopup='true' onClick={() => handleView(row)} aria-controls='customized-menu'>
                   <AccountBox color='action' />
                 </IconButton>
                 <IconButton color='inherit' aria-haspopup='true' onClick={() => handleEdit(row)} aria-controls='customized-menu'>
                   <TextAccount color='info' />
                 </IconButton>
                 <IconButton color='inherit' aria-haspopup='true' onClick={() => handleDelete(row)} aria-controls='customized-menu'>
                   <DeleteIcon color='error' />
                 </IconButton>
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
 
       <Snackbar
         anchorOrigin={{
           vertical: 'top',
           horizontal: 'right',
         }}
         open={snackbarOpen}
         autoHideDuration={4200}
         onClose={handleCloseSnackbar}
       >
         <MuiAlert
           elevation={6}
           variant="filled"
           onClose={handleCloseSnackbar}
           severity={snackbarSeverity}
         >
           {snackbarMessage}
         </MuiAlert>
       </Snackbar>
 
       <Dialog
         open={Boolean(registroAtual)}
         onClose={handleClose}
         disableEscapeKeyDown
         maxWidth="lg"
       >
         <DialogTitle>Usuarios</DialogTitle>
         <DialogContent>
           <FormUsers
             statesForm={stateForm}
             dataRegister={registroAtual}
             onSave={handleSave}
             onClose={handleClose}
           />
         </DialogContent>
       </Dialog>
    </TableContainer>
   );
};

export default TableUsers;
