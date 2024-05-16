import React from 'react'
import { Button, Form, Table, Modal, Input, DatePicker, Radio, Select } from 'antd';
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Teacher = () => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingStudent, setEditingStudent] = useState([])
    const [adding, setAdding] = useState(false)
    const [addingStudent, setAddingStudent] = useState([])
    const paginationConfig = {
        pageSize: 9,
    };
    const [filterField, setFilterField] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredDataList, setFilteredDataList] = useState(dataList);

    const [columns, setColumns] = useState([
        {
            key: "1",
            title: "StudentID",
            dataIndex: "teacherId"
        },
        {
            key: "2",
            title: "FirstName",
            dataIndex: "firstName"
        },
        {
            key: "3",
            title: "Lastname",
            dataIndex: "lastName"
        },
        {
            key: "4",
            title: "Gender",
            dataIndex: "gender"
        },
        {
            key: "5",
            title: "Department",
            dataIndex: "department"
        },               
        {
            key: "6",
            title: "Action",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => { onEdit(record) }} style={{ color: 'darkblue', marginRight: 10 }} />
                        <DeleteOutlined onClick={() => {
                            onDeleteTeacher(record)
                        }} style={{ color: 'red' }} />
                    </>
                )
            }
        }


    ]);

    const getFetchData = async () => {
        const teacher = await axios.get('/api/teacher/all');
        setDataList(teacher.data.data);  
    }

    useEffect(() => {
        getFetchData(); 
      }, [getFetchData]);

  return (
    <div>
      <Table
      columns={columns}
      dataSource={dataList}
      pagination={paginationConfig}
     >

      </Table>
    </div>
  )
}

export default Teacher
