import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'start' }}>
      <Typography sx={{ mr: 2 }} fontSize={11}>
        {`© ${new Date().getFullYear()}, Todos os direitos reservados `}
      </Typography>
    </Box>
  )
}

export default FooterContent
