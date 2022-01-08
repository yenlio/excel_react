import * as types from '../constants'
import * as actions from '../actions/ExcelActions'
const DEFAULT_STATE = {
    listItem: [],
    isFetching: false,
    dataFetched: false,
    totalPage: 0,
    activePage: 1,
    error: false,
    errorMessage: null
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case types.GET_EXCEL_REQUEST:
        case types.ADD_EXCEL_REQUEST:
        case types.UPLOAD_EXCEL_REQUEST:
        case types.DELETE_EXCEL_REQUEST:
        case types.UPDATE_EXCEL_REQUEST:

            return {
                ...state,
                isFetching: true
            }
        case types.GET_EXCEL_SUCCESS:
            console.log(action.payload,"reduuu");
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                listItem: action.payload.listItem,
                totalPage: action.payload.totalPage,
                activePage: action.payload.activePage
            }
        case types.ADD_EXCEL_SUCCESS:
        case types.UPLOAD_EXCEL_SUCCESS:
        case types.DELETE_EXCEL_SUCCESS:
        case types.UPDATE_EXCEL_SUCCESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
            }
        case types.GET_EXCEL_FAILURE:
        case types.ADD_EXCEL_FAILURE:
        case types.UPLOAD_EXCEL_FAILURE:
        case types.DELETE_EXCEL_FAILURE:
        case types.UPDATE_EXCEL_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessage: action.payload.errorMessage
            }
        default:
            return state;
    }
}