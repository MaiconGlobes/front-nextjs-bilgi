import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import TableUsers from 'src/views/tables/TableUsers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@mui/material'

	const Table = () => {
	const [dadosAPI, setDadosAPI] = useState(null);
   const [registroAtual, setRegistroAtual] = useState<string>('');

	const fetchData = async () => {
		try {
			const res = await axios.get('http://localhost:3005/v1/api/usuario/listar-usuario');
			setDadosAPI(res.data);
			
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [registroAtual]);

	return (
		<Grid container spacing={6}>
			<Grid item xs={12} sx={{ position: 'relative' }}>
				<Typography variant='h5'>
					<Link href='/register/users/'>
						Usuarios do sistema
					</Link>
				</Typography>
				<Typography variant='body2'>Lista de contatos completa...</Typography>
			</Grid>
			<Grid item xs={12}>
				<Card sx={{alignItems : 'center'}}>
					<CardHeader title='Listagem' titleTypographyProps={{ variant: 'h6' }} />
                  {dadosAPI ? (
                     <TableUsers response={dadosAPI} dadosVazios={registroAtual}/>
                  ) : (
                     <Typography variant='body2'>Carregando dados...</Typography>
                  )}
				</Card>
			</Grid>
		</Grid>
	)
}

export default Table
