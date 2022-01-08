import * as types from '../constants'

export function getExcelRequest(payload) {
    return({
        type: types.GET_EXCEL_REQUEST,
        payload
    })
}

export function getExcelSuccess(payload) {
    return({
        type: types.GET_EXCEL_SUCCESS,
        payload
    })
}

export function getExcelFallure(payload) {
    return({
        type: types.GET_EXCEL_FAILURE,
        payload
    })
}

//add

export function addExcelRequest(payload) {
    return({
        type: types.ADD_EXCEL_REQUEST,
        payload
    })
}

export function addExcelSuccess(payload) {
    return({
        type: types.ADD_EXCEL_SUCCESS,
        payload
    })
}

export function addExcelFallure(payload) {
    return({
        type: types.ADD_EXCEL_FAILURE,
        payload
    })
}

//delete
export function deleteExcelRequest(payload) {
    return({
        type: types.DELETE_EXCEL_REQUEST,
        payload
    })
}

export function deleteExcelSuccess(payload) {
    return({
        type: types.DELETE_EXCEL_SUCCESS,
        payload
    })
}

export function deleteExcelFallure(payload) {
    return({
        type: types.DELETE_EXCEL_FAILURE,
        payload
    })
}

//update
export function updateExcelRequest(payload) {
    return({
        type: types.UPDATE_EXCEL_REQUEST,
        payload
    })
}

export function updateExcelSuccess(payload) {
    return({
        type: types.UPDATE_EXCEL_SUCCESS,
        payload
    })
}

export function updateExcelFallure(payload) {
    return({
        type: types.UPDATE_EXCEL_FAILURE,
        payload
    })
}

//upload
export function upLoadExcelRequest(payload) {
    return({
        type: types.UPLOAD_EXCEL_REQUEST,
        payload
    })
}

export function upLoadExcelSuccess(payload) {
    return({
        type: types.UPLOAD_EXCEL_SUCCESS,
        payload
    })
}

export function UploadExcelFallure(payload) {
    return({
        type: types.UPLOAD_EXCEL_FAILURE,
        payload
    })
}




