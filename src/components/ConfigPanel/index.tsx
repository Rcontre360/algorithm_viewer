import React from 'react'
import clsx from 'clsx'
import {useDispatch} from 'redux/hooks'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typo from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';

import {
  onStartAlgorithm,
  onSetSpeed,
  onSetAlgorithm,
} from 'redux/actions'

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background:theme.palette.grey['800'],
    color:'white',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  innerCard: {
    background: theme.palette.grey['700'],
    margin: '0.5em'
  }
}));

type Props = {
  setOpen:(open:boolean)=>void;
  sizeOnOpen:(size:number)=>void;
  open:boolean;
  title?:React.ComponentType<unknown> | string;
};

const ConfigPanel: React.FC<Props> = (props) => {

  const {open,setOpen,title,children,sizeOnOpen} = props;
  const [openList,setOpenList] = React.useState<boolean>(true);
  const classes = useStyles()
  const theme = useTheme();
  const dispatch = useDispatch()

  const handleSpeedChange = (event:React.ChangeEvent<{}>,value:number | number[])=>{
    onSetSpeed((value as number)*1000)(dispatch)
  }

  const handleSetAlgorithm =(algorithm:AlgorithmSignature)=>
    (event:React.MouseEvent<EventTarget>)=>{
      onSetAlgorithm(algorithm)(dispatch)
    }

  React.useEffect(()=>{
    sizeOnOpen(open?drawerWidth:0)
  },[open])

  return(
  <>
    <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={e=>setOpen(true)}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typo variant="h6" noWrap>
          Graph Playground
        </Typo>
      </Toolbar>
    </AppBar>
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        {title || <div></div>}
        <IconButton onClick={e=>setOpen(false)}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
        className={classes.list}
      >
        <ListItem>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Data structure:" />
          <ListItemText primary="Graph" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Algorithm:" />
          <ListItemText primary="Deep First Search" />
        </ListItem>
        <ListItem button onClick={e=>setOpenList(!openList)} >
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Available Algorithms" />
          {openList ? <ExpandMore />:<ExpandLess /> }
        </ListItem>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nested}>
            <ListItem button onClick={handleSetAlgorithm('dfs')}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Deep First Search" />
            </ListItem>
            <ListItem button onClick={handleSetAlgorithm('bfs')}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Breath First Search" />
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Card className={classes.innerCard}>
        <Box display='flex' alignContent='center' flexDirection='column' padding='1em'>
          <Box display='flex' justifyContent='space-between'>
            <Typo variant='h6'>
              Set speed
            </Typo>
            <Button variant="contained" color='primary' onClick={e=>onStartAlgorithm(0)(dispatch)}>
              Start Algorithm
            </Button>
          </Box>
          <Slider
            defaultValue={0.5}
            step={0.1}
            marks
            min={0.1}
            max={2}
            valueLabelDisplay="auto"
            onChange={handleSpeedChange}
          />
        </Box>
      </Card>
    </Drawer>
    <Box style={{width:'100%',paddingLeft:open?drawerWidth:0}}>
      {children}
    </Box>
  </>
  )
}

export default ConfigPanel