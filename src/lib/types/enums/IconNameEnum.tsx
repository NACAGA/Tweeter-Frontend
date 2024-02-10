import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

export const IconNameEnum: any = {
    addCircle: <AddCircleIcon fontSize="medium" />,
    home: <HomeOutlinedIcon fontSize="medium" />,
    menu: <MenuRoundedIcon fontSize="medium" />,
    search: <SearchRoundedIcon fontSize="medium" />,
    addPage: <NoteAddOutlinedIcon fontSize="medium" />,
    group: <GroupOutlinedIcon fontSize="medium" />,
    person: <Person2OutlinedIcon fontSize="medium" />,
};

export type IconName = keyof typeof IconNameEnum;
