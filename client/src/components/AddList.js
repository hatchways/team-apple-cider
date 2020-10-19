import React from 'react'
import {Dialog} from '@material-ui/core'

function AddList(props)
{
    const {state, setState} = props;
    return (
        <Dialog open={state}>
            Hello World
        </Dialog>);
}

export default AddList;