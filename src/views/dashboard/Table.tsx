import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'

const DashboardTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Uf</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Casos</TableCell>
              <TableCell>Mortes</TableCell>
              <TableCell>Suspeitas</TableCell>
              <TableCell>% Mortes</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default DashboardTable
