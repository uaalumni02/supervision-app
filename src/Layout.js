import React from 'react'

import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Header from './components/common/Header/Header'


const useStyles = makeStyles((theme) => ({
    grid: {
        width: '100%',
        margin: '0px',
        minHeight: '100vh'
    }
}))

const Layout = ({children}) => {
    const classes = useStyles()
    return (
        <>
            <Header />
            <Grid>
                
                { children  }
            </Grid>
        </>
    )
}


export default Layout