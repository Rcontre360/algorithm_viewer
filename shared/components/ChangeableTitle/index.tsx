import React from 'react';
import Typo,{TypographyProps} from '@material-ui/core/Typography';
import IconButton,{IconButtonProps} from '@material-ui/core/IconButton';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import TextInput,{TextFieldProps} from '@material-ui/core/TextField'

const useStyles = makeStyles((theme) => ({
  button:{
  	borderRadius:'4px',
  },
  mainButton:{
  	padding:'0 10px',
  	borderRadius:'4px'
  },
  title:{
  	margin:0,
  	padding:0
  }
}));

interface Props{
	title: string;
	titleProps?: TypographyProps;
	inputProps?: TextFieldProps;
	buttonProps?:IconButtonProps;
	onChange:(title:string) => void;
};

const ChangeableTitle:React.FunctionComponent<Props & IconButtonProps> = (props:Props) => {
	const { titleProps, inputProps, title, onChange, buttonProps,...rest} = props;
	const [isChanging,setIsChanging] = React.useState(false);
	const [currentTitle,setCurrentTitle] = React.useState(title);
	const [{titleSize,buttonSize},setSizes] = React.useState({titleSize:0,buttonSize:0});
	const titleRef = React.useRef<HTMLSpanElement>(null)
	const buttonRef = React.useRef<HTMLButtonElement>(null)
	const classes = useStyles()

	const handleOnChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
		if (inputProps && inputProps.onChange) inputProps.onChange(event)
		setCurrentTitle(event.target.value)
	}

	const handleSetTitle = ()=>{
		onChange(currentTitle)
		setIsChanging(false)
	}

	const handleRejectTitle = ()=>{
		setCurrentTitle(title)
		setIsChanging(false)
	}

	React.useEffect(()=>{
		if (titleRef.current && buttonRef.current)
			setSizes({
				titleSize:titleRef!.current!.clientHeight-5,
				buttonSize:titleRef!.current!.clientHeight
			})
	},[titleRef,buttonRef])

	React.useEffect(()=>{
		setCurrentTitle(title)
	},[title])

	if (isChanging)
		return (
		<Box display='flex' alignItems='flex-start' {...rest}>
	  	<TextInput
	  		style={{ height:buttonSize,margin:0 }}
			InputLabelProps={{
			style: {
				height:titleSize,
			},
			}}
			inputProps={{
				style: {
				height:buttonSize,
				padding: '3px',
				fontSize:titleSize,
				},
			}}
	  		value={currentTitle}
	  		onChange={handleOnChange}
	  		{...inputProps}
	  	/>
	  	<IconButton 
	  		className={classes.button} 
	  		onClick={handleSetTitle} 
	  		style={{
	  			width:buttonSize,
	  			height:buttonSize,
	  			padding: '20px',
	  		}}
			{...buttonProps}
	  	>
	  		<CheckIcon/>
	  	</IconButton>
	  	<IconButton 
	  		className={classes.button} 
	  		onClick={handleRejectTitle} 
	  		style={{
	  			width:buttonSize,
	  			height:buttonSize,
	  			padding: '20px',
	  		}}
			{...buttonProps}
	  	>
	  		<ClearIcon/>
	  	</IconButton>
	  </Box>
		)

  return (
  <IconButton ref={buttonRef} className={classes.mainButton} onClick={()=>setIsChanging(true)} {...rest}>
		<Typo ref={titleRef} className={classes.title} {...titleProps}>
			{title}
		</Typo>
	</IconButton>
  )
}

export default ChangeableTitle;