import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ExcelComponent from '../components/ExcelComponent'
import * as actions from '../actions/ExcelActions'

const ExcelContainer = (props) => {
    useEffect(()=>{
        props.initLoad(1)
    }, [])
    return(
        <div>
            <ExcelComponent {...props} />
        </div>
    )
}


function mapStateToProps(state) {
    return {
        listItem:state.reducer.listItem,
        activePage:state.reducer.activePage,
        totalPage:state.reducer.totalPage
    
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initLoad:(data)=>{
            dispatch(actions.getExcelRequest(data))
        },
        addDispatch:(data)=>{
            dispatch(actions.addExcelRequest(data))
        },
        deleteDispatch:(id)=>{
            dispatch(actions.deleteExcelRequest(id))
        },
        updateDispatch:(data)=>{
            dispatch(actions.updateExcelRequest(data))
        },
        upLoadDispatch:(data)=>{
            dispatch(actions.upLoadExcelRequest(data))
        }
      
    };
}


export default connect(
    mapStateToProps,mapDispatchToProps
)(ExcelContainer);