import React from 'react';
import Box from '@material-ui/core/Box';
import Typo from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles'
import {useSelector} from '@shared/redux/hooks'

const useStyles = makeStyles(theme=>({
	container:{
		display:'flex',
		flexDirection:'column',
		color:'white',
		borderRadius:4,
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
			<Typo noWrap>Variables: </Typo>  
			{
				algorithmCode && algorithmCode.map(code => (
					<Typo noWrap>{code}</Typo>
				))
			}
		</div>
	)
}

export default InfoBar;