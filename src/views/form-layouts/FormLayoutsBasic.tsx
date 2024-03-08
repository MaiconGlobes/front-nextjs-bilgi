import { ChangeEvent, MouseEvent, useState, SyntheticEvent } from 'react'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

type State = {
  password: string
  showPassword: boolean,
  email : String,
}

type FormValues = {
  uiid?: string;
}

const FormLayoutsBasic = () => {

  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
    email : ''
  })

  const [confirmPassValues, setConfirmPassValues] = useState<State>({
    password: '',
    showPassword: false,
    email : ''
  })

  const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value })
    console.log('Enviando email para a API:', values.email);
  }

  const handleConfirmPassChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  }
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleClickConfirmPassShow = () => {
    setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <Card>
      <CardHeader title='Dados básicos' titleTypographyProps={{ variant: 'h6' }} />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField fullWidth label='Nome' placeholder='Leonard Carter' />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='Email'
                onChange={handleChange('email')}
                placeholder={'Seu melhor email'}
                helperText='Você pode usar letras, números e pontos'
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                <OutlinedInput
                  id='form-layouts-basic-password'
                  label='Password'
                  value={values.password}
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  aria-describedby='form-layouts-basic-password-helper'
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id='form-layouts-basic-password-helper'>
                Use 8 ou mais caracteres com uma mistura de letras, números e símbolos
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                <OutlinedInput
                  label='Confirm Password'
                  value={confirmPassValues.password}
                  id='form-layouts-confirm-password'
                  onChange={handleConfirmPassChange('password')}
                  aria-describedby='form-layouts-confirm-password-helper'
                  type={confirmPassValues.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickConfirmPassShow}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >
                        {confirmPassValues.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText id='form-layouts-confirm-password-helper'>
             
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default FormLayoutsBasic
