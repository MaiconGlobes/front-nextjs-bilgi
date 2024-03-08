import { styled } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import { BlankLayoutProps } from './types'

const BlankLayoutWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  height: '100vh',

  // V1 Blank 
  '& .content-center': {
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(5)
  },

  // V2 Blank 
  '& .content-right': {
    display: 'flex',
    minHeight: '100vh',
    overflowX: 'hidden',
    position: 'relative'
  }
}))

const BlankLayout = ({ children }: BlankLayoutProps) => {
  return (
    <BlankLayoutWrapper className='layout-wrapper'>
      <Box className='app-content' sx={{ minHeight: '100vh', overflowX: 'hidden', position: 'relative' }}>
        {children}
      </Box>
    </BlankLayoutWrapper>
  )
}

export default BlankLayout
