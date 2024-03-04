import * as React from 'react';
import Box from '@mui/material/Box';
import useModal from '../../hooks/useModal';
import { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { UserContext } from '../../context/UserContext';
import '../../assets/ProfilePage.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useLoadingSpinner from '../../hooks/useLoadingSpinner';
import { LoadingSpinner } from '../../component/LoadingSpinner';
import DeleteCommunityModal from '../../modals/DeleteCommunityModal';
import FilterListIcon from '@mui/icons-material/FilterList';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';

interface Data {
  id: number;
  accountType: number;
  joinDate: number;
  name: string;
}

function createData(
  id: number,
  name: string,
  accountType: number,
  joinDate: number
): Data {
  return {
    id,
    name,
    accountType,
    joinDate,
  };
}

const rows = [
  createData(1, 'Cupcake', 305, 3.7),
  createData(2, 'Donut', 452, 25.0),
  createData(3, 'Eclair', 262, 16.0),
  createData(4, 'Frozen yoghurt', 159, 6.0),
  createData(5, 'Gingerbread', 356, 16.0),
  createData(6, 'Honeycomb', 408, 3.2),
  createData(7, 'Ice cream sandwich', 237, 9.0),
  createData(8, 'Jelly Bean', 375, 0.0),
  createData(9, 'KitKat', 518, 26.0),
  createData(10, 'Lollipop', 392, 0.2),
  createData(11, 'Marshmallow', 318, 0),
  createData(12, 'Nougat', 360, 19.0),
  createData(13, 'Oreo', 437, 18.0),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'User',
  },
  {
    id: 'accountType',
    numeric: true,
    disablePadding: false,
    label: 'Account',
  },
  {
    id: 'joinDate',
    numeric: true,
    disablePadding: false,
    label: 'Join Date',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all users',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Community Name
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete Users'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export function CommunityPage() {
  const { userId } = useContext(UserContext);

  const { isOpen, toggle } = useModal();

  const { toggleLoading, loading } = useLoadingSpinner();

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (userId) {
        // getUserDetails();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('accountType');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  return (
    <>
      <LoadingSpinner loadingState={loading} />
      {!loading && (
        <>
          <h1 style={{ marginLeft: 15, color: '#fff' }}> Communities</h1>
          <hr />

          <Box sx={{ width: '100%', marginTop: '15px' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <EnhancedTableToolbar numSelected={selected.length} />
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby='tableTitle'>
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                  />
                  <TableBody>
                    {visibleRows.map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role='checkbox'
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}
                          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          <TableCell padding='checkbox'>
                            <Checkbox
                              color='primary'
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component='th'
                            id={labelId}
                            scope='row'
                            padding='none'
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align='right'>{row.accountType}</TableCell>
                          <TableCell align='right'>{row.joinDate}</TableCell>
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{}}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component='div'
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
          {/* Modals */}
          <DeleteCommunityModal
            isOpen={isOpen}
            toggle={toggle}
          ></DeleteCommunityModal>
        </>
      )}
    </>
  );
}
