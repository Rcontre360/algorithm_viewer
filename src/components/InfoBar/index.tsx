import React from 'react';
import {useSelector} from '../../redux/hooks'
import Box from '@material-ui/core/Box';
import Typo from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme=>({
	container:{
		display:'flex',
		flexDirection:'column',
		background:theme.palette.grey['900'],
		color:'white',
		padding:20,
		borderRadius:4,
		position:'absolute',
		right:-100,
	}
}));

const InfoBar = (props: React.HTMLAttributes<any>) => {
	const {
		output,
		speed,
	} = useSelector(({common,graph})=>({...graph,...common}))
	const [algorithmCode,setAlgorithmCode] = React.useState<string[]>([])
	const classes = useStyles()

	React.useEffect(()=>{
		output && output.forEach(({state},index)=>{
			setTimeout(setAlgorithmCode,speed*index,state)
		})
	},[output])

	return (
		<div {...props} className={classes.container} >
			<Typo nonWrap>Variables: </Typo>  
			{
				algorithmCode && algorithmCode.map(code => (
					<Typo nonWrap>{code}</Typo>
				))
			}
		</div>
	)
}

export default InfoBar;