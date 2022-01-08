import { put, takeEvery, select } from "@redux-saga/core/effects";
import callAPI from '../fetchAPIs/callAPI'
import * as types from '../constants'
import * as actions from '../actions/ExcelActions'
import uploadExcel from '../fetchAPIs/uploadExcel'

function* getListExcel(action) {
    try {
        const res = yield callAPI("GET", `?activePage=${action.payload}&limit=${types.LIMIT}`, "")

        yield put(actions.getExcelSuccess({
            listItem: res.pagination,
            totalPage: res.totalPage,
            activePage: action.payload
        }))

    } catch (error) {
        yield put(actions.getExcelFallure({
            message: error.message
        }))

    }
}


function* addListExcel(action) {
    try {
        const res = yield callAPI(types.HTTP_CREATE, "", action.payload)

        const pagination = yield callAPI("GET", `?activePage=${1}&limit=${types.LIMIT}`, "")
        console.log(pagination, "pagiii");


        yield put(actions.addExcelSuccess(res))

        yield put(actions.getExcelRequest(pagination.totalPage))
    } catch (error) {

    }
}


function* deleteListExcel(action) {
    try {
        let path = `${action.payload}`
        const res = yield callAPI(types.HTTP_DELETE, path, "")
        yield put(actions.deleteExcelSuccess(res))
        const reducer = yield select((state) => {
            return {
                listItem: state.reducer.listItem,
                activePage: state.reducer.activePage,
                totalPage: state.reducer.totalPage,
                textSearch: state.reducer.textSearch
            }
        })

        console.log(reducer.listItem.length, "lang");
        if (reducer.listItem.length > 1) {
            yield put(actions.getExcelRequest(reducer.activePage))
        }
        else (
            yield put(actions.getExcelRequest(reducer.activePage - 1))
        )


    } catch (error) {
        yield put(actions.deleteExcelFallure(error))
    }
}
function* updateListExcel(action) {
    try {
        const res = yield callAPI(types.HTTP_UPDATE, `${action.payload.id}`, action.payload)
        yield put(actions.updateExcelSuccess(res))

        const reducer = yield select((state) => {
            return {
                listItem: state.reducer.listItem,
                activePage: state.reducer.activePage,
                totalPage: state.reducer.totalPage,
                textSearch: state.reducer.textSearch
            }
        })

        yield put(actions.getExcelRequest(reducer.activePage))

    } catch (error) {
        yield put(actions.updateExcelFallure(error))
    }
}
function* uploadFileExcel(action) {
    try {
        console.log(action.payload,"payload");
        const res = yield uploadExcel(types.HTTP_CREATE, "upload", action.payload)
        yield put(actions.upLoadExcelSuccess(res))
        yield put(actions.getExcelRequest(1))
    } catch (error) {
        yield put(actions.UploadExcelFallure(error))
    }
}


export const ExcelSaga = [
    takeEvery(types.GET_EXCEL_REQUEST, getListExcel),
    takeEvery(types.ADD_EXCEL_REQUEST, addListExcel),
    takeEvery(types.DELETE_EXCEL_REQUEST, deleteListExcel),
    takeEvery(types.UPDATE_EXCEL_REQUEST, updateListExcel),
    takeEvery(types.UPLOAD_EXCEL_REQUEST, uploadFileExcel),

]

















// import { put, select, takeEvery } from 'redux-saga/effects'
// import callAPI from '../fetchAPIs/callAPI'
// import * as types from '../constants'
// import * as actions from '../actions/ExcelActions'
// import uploadExcel from '../fetchAPIs/uploadExcel'





// function* getListExcel(action) {
//     try {
//         const res = yield callAPI("GET", `?activePage=${action.payload}&limit=${types.LIMIT}`, "")

//         yield put(actions.getExcelSuccess({
//             listItem: res.pagination,
//             totalPage: res.totalPage,
//             activePage: action.payload
//         }))

//     } catch (error) {
//         yield put(actions.getExcelFallure({
//             message: error.message
//         }))

//     }
// }

// function* addListExcel(action) {
//     try {
//         const res = yield callAPI(types.HTTP_CREATE, "", action.payload)

//         const pagination = yield callAPI("GET", `?activePage=${1}&limit=${types.LIMIT}`, "")
//         console.log(pagination, "pagiii");


//         yield put(actions.addExcelSuccess(res))

//         yield put(actions.getExcelRequest(pagination.totalPage))
//     } catch (error) {

//     }
// }

// function* uploadFileExcel(action) {
//     try {
//         const res = yield uploadExcel(types.HTTP_CREATE, "upload", action.payload)
//         yield put(actions.upLoadExcelSuccess(res))
//         yield put(actions.getExcelRequest(1))
//     } catch (error) {
//         yield put(actions.UploadExcelFallure(error))
//     }
// }

// function* deleteListExcel(action) {
//     try {
//         console.log(action.payload, "phayload");
//         let path = `${action.payload}`
//         const res = yield callAPI(types.HTTP_DELETE, path, "")
//         yield put(actions.deleteExcelSuccess(res))
//         const reducer = yield select((state) => {
//             return {
//                 listItem: state.reducer.listItem,
//                 activePage: state.reducer.activePage,
//                 totalPage: state.reducer.totalPage,
//                 textSearch: state.reducer.textSearch
//             }
//         })

//         console.log(reducer.activePage, "acti");

//         const get = yield callAPI("GET", `?activePage=${reducer.activePage}&limit=${types.LIMIT}`, "")

//         yield put(actions.getExcelRequest(get.totalPage))


//     } catch (error) {
//         yield put(actions.deleteExcelFallure(error))
//     }
// }

// function* updateListExcel(action) {
//     try {
//         const res = yield callAPI(types.HTTP_UPDATE, `${action.payload.id}`, action.payload)
//         yield put(actions.updateExcelSuccess(res))

//         const reducer = yield select((state) => {
//             return {
//                 listItem: state.reducer.listItem,
//                 activePage: state.reducer.activePage,
//                 totalPage: state.reducer.totalPage,
//                 textSearch: state.reducer.textSearch
//             }
//         })

//         yield put(actions.getExcelRequest(reducer.activePage))

//     } catch (error) {
//         yield put(actions.updateExcelFallure(error))
//     }
// }

// export const ExcelSaga = [
//     takeEvery(types.GET_EXCEL_REQUEST, getListExcel),
//     takeEvery(types.ADD_EXCEL_REQUEST, addListExcel),
//     takeEvery(types.UPLOAD_EXCEL_REQUEST, uploadFileExcel),
//     takeEvery(types.DELETE_EXCEL_REQUEST, deleteListExcel),
//     takeEvery(types.UPDATE_EXCEL_REQUEST, updateListExcel),
// ]