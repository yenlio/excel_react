import React, { useState } from 'react';
import * as xlsx from 'xlsx'
import FileSaver from 'file-saver';
import * as types from '../constants'


export default function ExcelComponent(props) {
    const [id, setid] = useState("")
    const [name, setname] = useState('')
    const [gender, setgender] = useState('')

    const [nameUpdate, setNameUpdate] = useState('')
    const [genderUpdate, setGenderUpdate] = useState('')
    const [file, setfile] = useState("")

    let listData = []
    if (props.listItem) {
        listData = props.listItem.map((item, key) => {
            return (
                <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.gender}</td>
                    <td><button onClick={() => {
                        props.deleteDispatch(item._id)
                    }}>DELETE</button></td>
                    <td><button onClick={() => { setNameUpdate(item.name); setGenderUpdate(item.gender); setid(item._id) }}>Chon</button></td>
                </tr>
            )
        })
    }

    let { activePage, totalPage } = props

    let listButton = []
    for (let i = 1; i <= totalPage; i++) {
        listButton.push(i)
    }
    const pagination = listButton.map((item, key) => {
        if (activePage === item) {
            return (
                <button
                    key={key}
                    style={{ backgroundColor: "blue" }}
                    onClick={() => {
                        props.initLoad(item)
                    }}

                >{item}</button>
            )
        }
        else {
            return (
                <button
                    key={key}
                    style={{ backgroundColor: "" }}
                    onClick={() => {
                        props.initLoad(item)
                    }}

                >{item}</button>
            )
        }
    })



    const uploadFile = () => {
        const formData = new FormData()
        formData.append("upload", file)
        props.upLoadDispatch(formData)
    }

        //hàm export ra excel
    const exportExcel = (csvData, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const fileExtension = '.xlsx';
        const ws = xlsx.utils.json_to_sheet(csvData); //chuyển đổi từ json sang dạng sheet trong excel
        const wb = { Sheets: { 'date': ws }, SheetNames: ['date'] ,CalcPr:{refMode:'B9'}};  //đặt tên cho cái trang tính mình add dữ liệu
        const excelBuffer = xlsx.write(wb, { bookType: 'xlsx', type: 'array' });   //ghi dữ liệu vào trang tính
        const data = new Blob([excelBuffer], { type: fileType });  //new blob để có thể tải về 
        FileSaver.saveAs(data, fileName + fileExtension)
    }


    const exportFile = async () => {
        const dataAll = await new Promise((resolve, reject) => {
            let objFetch = {
                method: types.HTTP_READ
            }
            const url = types.DOMAIN + 'exportExcel'
            fetch(url, objFetch)
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error))
        })
       

        exportExcel(dataAll.result, "excel123")
    }


    return (
        <div>
            <div>
                <input type="file" onChange={(e) => { setfile(e.target.files[0]) }} />

                <button onClick={uploadFile}>upload</button>
            </div>
            <div>
                <input onChange={(e) => { setname(e.target.value) }} value={name} placeholder="name" />
                <input onChange={(e) => { setgender(e.target.value) }} value={gender} placeholder="gender" />
                <button onClick={() => {
                    props.addDispatch({ id: Math.ceil(Math.random) * 100, name: name, gender: gender })
                }}>ADD</button>
            </div>

            <div>
                <input onChange={(e) => { setNameUpdate(e.target.value) }} value={nameUpdate} placeholder="nameUpdate" />
                <input onChange={(e) => { setGenderUpdate(e.target.value) }} value={genderUpdate} placeholder="genderUpdate" />
                <button onClick={() => {
                    props.updateDispatch({ id: id, name: nameUpdate, gender: genderUpdate })
                }}>UPDATE</button>
            </div>

            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>ID</td>
                            <td>NAME</td>
                            <td>GENDER</td>
                        </tr>
                        {listData}
                    </tbody>
                </table>
                {pagination}
            </div>

            <div>
                <button onClick={exportFile}>download</button>
            </div>

        </div>
    )
}
