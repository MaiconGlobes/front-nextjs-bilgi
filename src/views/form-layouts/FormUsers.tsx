import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import * as yup from 'yup';
import TStateForm from 'src/@core/@types/state_forms';

//Colocar interfaces com typagem e em arquivos com export
	interface State {
		id: string;
		nome: string;
		email: string;
		senha: string;
		confirmarSenha?: string;
		cpf: string;
		data_nascimento: string | Date;
		endereco: string | null;
		bairro: string | null;
		numero: string | null;
		municipio: string;
		uf: string;
		cep: string | null;
		mostrarSenha?: boolean;
		mostrarSenha2?: boolean;
		nomeErro?: string;
		cpfErro?: string;
		emailErro?: string;
		senhaErro?: string;
		confirmarSenhaErro?: string;
		dataNascimentoErro?: string;
		numeroErro?: string;
		municipioErro?: string;
		cepErro?: string;
	}

	type TUsuario = {
		usuario: State;
	};

	interface FormUsersProps {
		statesForm: TStateForm;
		dataRegister: any;
		onSave: (dadosRequest: any) => void;
		onClose: () => void;
		snackbarOpen: boolean;
		setSnackbarOpen: (isOpen: boolean) => void;
		snackbarMessage: string;
		setSnackbarMessage: (message: string) => void;
		snackbarSeverity: 'success' | 'error';
		setSnackbarSeverity: (severity: 'success' | 'error') => void;
	}
	 
	 

const FormUsers: React.FC<FormUsersProps> = ({ statesForm, dataRegister, onSave, onClose, snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage, snackbarSeverity, setSnackbarSeverity }) => {
	//Separar as funções em utils
	const formatDateForInput = (dateString: string) => {
		
		if (!dateString) 
			return '';
		
		const ano = dateString.substring(0, 4);
		const mes = dateString.substring(5, 7);
		const dia = dateString.substring(8, 10);

  		return `${dia}/${mes}/${ano}`;
	};

	const formatCEPForInput = (cepString: string) => {
		
		if (!cepString) 
			return '';
		
		const inicio = cepString.substring(0, 5);
		const final = cepString.substring(5, 8);

  		return `${inicio}-${final}`;
	};

	const formatCPFForInput = (cpfString: string) => {
		
		if (cpfString == undefined) 
		return '';
	
		const grupo1 = cpfString.substring(0, 3);
		const grupo2 = cpfString.substring(3, 6);
		const grupo3 = cpfString.substring(6, 9);
		const final  = cpfString.substring(9, 11);

		return `${grupo1}.${grupo2}.${grupo3}-${final}`;
	};

	//Esse escopo seta os vaores às variáveis para que as mesmasseja usadas no form "input"
	const [values, setValues] = useState<State>({
		id: '',
		nome: dataRegister.nome || '',
		email: dataRegister.email || '',
		senha: '',
		confirmarSenha: '',
		cpf: statesForm === 'inserção' ? '' : formatCPFForInput(String(dataRegister.cpf)) || '',
		data_nascimento: statesForm === 'inserção' ? '' : formatDateForInput(String(dataRegister.data_nascimento)) || '',
		endereco: dataRegister.endereco || null,
		bairro: dataRegister.bairro || null,
		numero: dataRegister.numero || null,
		municipio: dataRegister.municipio || '',
		uf: dataRegister.uf || '',
		cep: statesForm === 'inserção' ? '' : formatCEPForInput(String(dataRegister.cep)) || null,
		mostrarSenha: false,
		mostrarSenha2: false,
		nomeErro: '',
		cpfErro: '',
		emailErro: '',
		senhaErro: '',
		confirmarSenhaErro: '',
		dataNascimentoErro: '',
		numeroErro: '',
		municipioErro: '',
		cepErro: '',
	});

	//Isso deve estar em um controlador separado
	const schema = yup.object().shape({
		nome				 : yup.string().min(10, 'Nome deve ter no mínimo 10 caracteres').max(200, 'Nome deve ter no máximo 50 caracteres').required('Nome é obrigatório'),
		email				 : yup.string().email('Email inválido').max(200, 'Email deve ter no máximo 50 caracteres').required('Email é obrigatório'),
		cpf				 : yup.string().min(14, 'CPF deve ter 11 caracteres').max(14, 'CPF deve ter 11 caracteres').required('O CPF é obrigatório'),
		senha				 : yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(8, 'Senha deve ter no máximo 8 caracteres').required('A senha é obrigatória'),
		confirmarSenha	 : yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').max(8, 'Senha deve ter no máximo 8 caracteres').oneOf([yup.ref('senha'), ''], 'As senhas devem ser iguais').required('A confirmação de senha é obrigatória'),
		data_nascimento : yup.string().required('Data de nascimento é obrigatório'),
		municipio		 : yup.string().min(3, 'Município deve ter no mínimo 3 caracteres').max(50, 'Município deve ter no máximo 10 caracteres').required('Município é obrigatório'),
		cep		       : yup.string().max(9, 'CEP deve ter no máximo 8 caracteres'),
	});
	 
	//Dados de URI, senhas etc, devem estar no .env
	const fetchData = async (dadosRequest: TUsuario) => {
		try {
			if (statesForm !== 'deleção') {
				await schema.validate(values, { abortEarly: false });
	
				setValues((prevValues) => ({
					...prevValues,
					senhaErro: '',
					nomeErro: '',
					emailErro: '',
					cpfErro: '',
					dataNascimentoErro: '',
					numeroErro: '',
					municipioErro: '',
					cepErro: ''
				 }));
			} 

			const base_url = `${process.env.NEXT_PUBLIC_BASE_URL}`; 

			if (statesForm === 'inserção') {
				await axios
					.post(`${base_url}/usuario/cadastrar-usuario`, dadosRequest)
					.then((response) => {
						if (response.status === 201) {
							setSnackbarSeverity('success');
							setSnackbarMessage('Usuário cadastrado com sucesso!');
							setSnackbarOpen(true);
							onSave(dadosRequest as TUsuario);
						} else{
							throw new Error(response.data.retorno.status);
						}
				})
				.catch((error) => {
						setSnackbarSeverity('error');
						setSnackbarMessage(error?.response?.data?.retorno?.mensagens?.status ? error.response.data.retorno.mensagens.status : 'Erro ao cadastrar usuário');
						setSnackbarOpen(true);

						if (axios.isAxiosError(error)) {
							if (error.response) {
							console.error(error.response.data.retorno.mensagens);
						}
					} else {
						console.error(error);
					}
				});
			} else if (statesForm === 'edição') {
				await axios
					.put(`${base_url}/usuario/editar-usuario`, dadosRequest)
					.then(() => {
						setSnackbarSeverity('success');
						setSnackbarMessage('Usuário atualizado com sucesso!');
						setSnackbarOpen(true);
						onSave(dadosRequest as TUsuario);
					})
					.catch((error) => {
						setSnackbarSeverity('error');
						setSnackbarMessage('Erro ao atualizar usuário');
						setSnackbarOpen(true);

						if (axios.isAxiosError(error)) {
							if (error.response) {
								console.error(error.response.data.retorno.mensagens);
							}
						} else {
							console.error(error);
						}
					});
			} else if (statesForm === 'deleção') {
				await axios
					.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/usuario/deletar-usuario?id=${dataRegister.id}`)
					.then(() => {
						setSnackbarSeverity('success');
						setSnackbarMessage('Usuário deletado com sucesso!');
						setSnackbarOpen(true);
						onSave(dadosRequest as TUsuario);
					})
					.catch((error) => {
						setSnackbarSeverity('error');
						setSnackbarMessage('Erro ao deletar usuário');
						setSnackbarOpen(true);

						if (axios.isAxiosError(error)) {
							if (error.response) {
								console.error(error.response.data.retorno.mensagens);
							}
						} else {
							console.error(error);
						}
					});
			}  
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				error.inner.forEach((e) => {
					setValues((prevValues) => ({
					...prevValues,
					[`${e.path}Erro` as keyof State]: e.message,
					}));
				});
			}
		}
	};

	const formatDate = (dateString: string) => {
		const [day, month, year] = dateString.split('/');
		const formattedDate = `${year}-${month?.padStart(2, '0')}-${day?.padStart(2, '0')}`;
		
		return new Date(formattedDate).toISOString();
	};
	 
	//"dadosRequest" é o objeto que será enviado à API com todas as infos atualizadas
	const handleSomeActionOnSave = () => {
		const dataISO8601 = formatDate(values.data_nascimento.toString());
		const cepIntegro = values.cep ? values.cep?.replace('-', '') : values.cep
		const cfpIntegro = values.cpf ? values.cpf?.replaceAll('.', '').replaceAll('-', '') : values.cpf

		const dadosRequest: TUsuario = {
			usuario: {
				id: dataRegister.id,
				nome: values.nome,
				email: values.email,
				senha: values.senha,
				confirmarSenha: values.confirmarSenha,
				cpf: cfpIntegro,
				data_nascimento: dataISO8601,
				endereco: values.endereco,
				bairro: values.bairro,
				numero: values.numero,
				municipio: values.municipio,
				uf: values.uf,
				cep: cepIntegro,
				mostrarSenha: values.mostrarSenha,
				mostrarSenha2: values.mostrarSenha2,
			},
		};

		//Remove variáveis que usa no controlador yup mas não pode ir para API. API deve tratar esses campos que não pertencem ao model do banco
		delete dadosRequest.usuario.confirmarSenha;
		delete dadosRequest.usuario.mostrarSenha;
		delete dadosRequest.usuario.mostrarSenha2;

		fetchData(dadosRequest);
	};
	
	const handleCEPChange = (prop: keyof State) => (event: React.ChangeEvent<{ value: unknown }>) => {
		const inputCEP = event.target.value;
		const onlyNumbers = String(inputCEP).replace(/\D/g, '');
	 
		let formattedCEP = onlyNumbers
		  .replace(/(\d{5})(\d)/, '$1-$2');
		
		if (formattedCEP.length > 9) {
		  formattedCEP = formattedCEP.substring(0, 9)
		}
	 
		setValues({ ...values, cep: formattedCEP });
	 };

	const handleDateChange = (event:any) => {
		const inputDate = event.target.value;
		const formattedDate = inputDate
			.replace(/\D/g, '') 				  
			.replace(/(\d{2})(\d)/, '$1/$2') 
			.replace(/(\d{2})(\d)/, '$1/$2') 
			.replace(/(\d{4})\d+?$/, '$1'); 
		
		setValues({ ...values, data_nascimento: formattedDate });
	};

	const handleCPFChange = (prop: keyof State) => (event: React.ChangeEvent<{ value: unknown }>) => {
		const inputCPF = event.target.value;
		const onlyNumbers = String(inputCPF).replace(/\D/g, '');
	 
		let formattedCPF = onlyNumbers
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d)/, '$1.$2')
		.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  
	 if (formattedCPF.length > 14) {
		formattedCPF = formattedCPF.substring(0, 14);
	 }
	 
		setValues({ ...values, cpf: formattedCPF });
	 };

	const handleSomeActionOnClose = () => {
		onClose();
	};

	const handleChange = (prop: keyof State) => (event: React.ChangeEvent<{ value: unknown }>) => {
		setValues({ ...values, [prop]: event.target.value as string });
	};

	const handlePasswordChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, mostrarSenha: !values.mostrarSenha });
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleConfirmChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleClickShowConfirmPassword = () => {
		setValues({ ...values, mostrarSenha2: !values.mostrarSenha2 });
	};

	const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	return (
		<Card >
			<CardHeader 
				title={statesForm === 'visualização' ? 'Modo visualização' : statesForm === 'inserção' ? 'Modo inserção' : statesForm === 'edição' ? 'Modo edição' : `Deseja realmente excluir ${values.nome}?` } 
				titleTypographyProps={{ variant: 'h6' }} 
			/>
			<Divider sx={{ margin: 0 }} />
			<form onSubmit={(e) => e.preventDefault()}>
				{statesForm != 'deleção' && (
					<CardContent >
						<Grid container spacing={5} >
							<Grid item xs={12}>
							<Typography variant='body2' sx={{ fontWeight: 600 }}>
								1. Detalhes da conta
							</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								label='Nome completo'
								placeholder='Nome completo abreviado'
								value={values.nome}
								error={!!values.nomeErro}
								helperText={values.nomeErro} 
								onChange={handleChange('nome')}
							/>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								type='email'
								label='Email'
								placeholder='Seu melhor email aqui'
								value={values.email}
								error={!!values.emailErro}
								helperText={values.emailErro} 
								onChange={handleChange('email')}
							/>
							</Grid>
							<Grid item xs={12} sm={6}>
							{(statesForm === 'inserção' || statesForm === 'edição') && (
									<TextField
										fullWidth
										label='Senha'
										placeholder='Sua senha'
										value={values.senha}
										onChange={handlePasswordChange('senha')}
										type={values.mostrarSenha ? 'text' : 'password'}
										error={!!values.senhaErro}
										helperText={values.senhaErro}
										InputProps={{
											endAdornment: (
											<InputAdornment position='end'>
												<IconButton
													edge='end'
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													aria-label='toggle password visibility'
												>
													{values.mostrarSenha ? <EyeOutline /> : <EyeOffOutline />}
												</IconButton>
											</InputAdornment>
											),
										}}
									/>)}
							</Grid>
							<Grid item xs={12} sm={6}>
							{(statesForm === 'inserção' || statesForm === 'edição') && (
								<TextField
									fullWidth
									label='Confirmar senha'
									placeholder='Confirme sua senha'
									value={values.confirmarSenha}
									onChange={handleConfirmChange('confirmarSenha')}
									type={values.mostrarSenha2 ? 'text' : 'password'}
									error={!!values.confirmarSenhaErro}
									helperText={values.confirmarSenhaErro}
									InputProps={{
										endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												edge='end'
												onClick={handleClickShowConfirmPassword}
												onMouseDown={handleMouseDownConfirmPassword}
												aria-label='toggle password visibility'
											>
												{values.mostrarSenha2 ? <EyeOutline /> : <EyeOffOutline />}
											</IconButton>
										</InputAdornment>
										),
									}}
								/>)}
							</Grid>
							<Grid item xs={12}>
							<Divider sx={{ marginBottom: 0 }} />
							</Grid>
							<Grid item xs={12}>
							<Typography variant='body2' sx={{ fontWeight: 600 }}>
								2. Informações pessoais
							</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								label='CPF'
								placeholder='Seu CPF'
								value={values.cpf}
								error={!!values.cpfErro}
								helperText={values.cpfErro} 
								onChange={handleCPFChange('cpf')}
							/>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								label='Data de Nascimento'
								placeholder='Sua data de nascimento'
								value={values.data_nascimento}
								error={!!values.dataNascimentoErro}
								helperText={values.dataNascimentoErro} 
								onChange={handleDateChange}
							/> 

							</Grid>
							<Grid item xs={12}>
							<Divider sx={{ marginBottom: 0 }} />
							</Grid>
							<Grid item xs={12}>
							<Typography variant='body2' sx={{ fontWeight: 600 }}>
								2. Endereço
							</Typography>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								label='Endereço'
								placeholder='Seu endereço completo'
								value={values.endereco || ''}
								onChange={handleChange('endereco')}
							/>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								label='Número'
								placeholder='Número'
								value={values.numero || ''}
								error={!!values.numeroErro}
								helperText={values.numeroErro} 
								onChange={handleChange('numero')}
							/>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								label='Município'
								placeholder='Seu município'
								value={values.municipio}
								error={!!values.municipioErro}
								helperText={values.municipioErro} 
								onChange={handleChange('municipio')}
							/>
							</Grid>
							<Grid item xs={12} sm={6}>
							<FormControl fullWidth>
								<InputLabel id='uf-select-label'>UF</InputLabel>
								<Select
									disabled={statesForm === 'visualização'}
									label='UF'
									id='uf-select'
									value={values.uf}
									//@ts-ignore
									onChange={handleChange('uf')}
								>
									<MenuItem value='PR'>Paraná</MenuItem>
									<MenuItem value='SP'>São Paulo</MenuItem>
								</Select>
							</FormControl>
							</Grid>
							<Grid item xs={12} sm={6}>
							<TextField
								disabled={statesForm === 'visualização'}
								fullWidth
								label='CEP'
								placeholder='Seu CEP'
								value={values.cep || ''}
								error={!!values.cepErro}
								helperText={values.cepErro}
								onChange={handleCEPChange('cep')}
							/>
							</Grid>
						</Grid>
					</CardContent>
			)}
			<Divider sx={{ margin: 0 }} />
			<CardActions sx={{ justifyContent: 'flex-end', width: '100%' }}>
			{statesForm != 'visualização' && (
				<Button 
					onClick={handleSomeActionOnSave} 
					variant='contained' 
					size='medium' 
					color={statesForm === 'deleção' ? 'error' : 'primary'}
				>
					{(statesForm === 'inserção' || statesForm === 'edição') ? 'Salvar' : 'Excluir'}
				</Button>
			)} 				
				<Button 
					onClick={handleSomeActionOnClose} 
					variant='contained' 
					size='medium' 
					color='secondary'
				>
					{statesForm === 'visualização' ? 'Fechar' : 'Cancelar'}
				</Button>
			</CardActions>
			</form>
		</Card>
	);
};

export default FormUsers;
