import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Box from '@mui/system/Box';

/*
PURPOSE: Search field for finding pickup locations
PARAMS: None
RETURNS: A filtered list pertaining to the searched item
*/

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export default function DropoffSearch() {
    return (
        <Box sx={{border: '1px solid gray', borderRadius: 1}}>
             <Search>
                <SearchIconWrapper>
                  <LocationOnIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Dropoff Location"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
        </Box>  
    );
}