import React from 'react'
import { Button, Form, Table, Modal, Input, Select, Switch, Popconfirm } from 'antd';
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Manage_User = () => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingUser, setEditingUser] = useState([])
    const [adding, setAdding] = useState(false)
    const [status, setStatus] = useState(false)
    const [addingUser, setAddingUser] = useState([])
    const paginationConfig = {
        pageSize: 5,
    };
    const [filterField, setFilterField] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredDataList, setFilteredDataList] = useState(dataList);


    const [columns, setColumns] = useState([
        {
            key: "1",
            title: "UserId",
            dataIndex: "userId"
        },
        {
            key: "2",
            title: "User Name",
            dataIndex: "fullName"
        },
        {
            key: "3",
            title: "Role",
            dataIndex: "role"
        },
        {
            key: "4",
            title: "Account Status",
            dataIndex: "accountStatus",
            render: (_, record) => {
                return (
                    <>
                        <Popconfirm
                            title="Are you sure you want to switch user account status?"
                            onConfirm={() => {

                            }}
                        >
                            <Switch checkedChildren="Active" unCheckedChildren="Inactive" defaultChecked={record.accountStatus == "active"} onChange={(value) => {
                                updateStatus(value, record)
                            }}
                            />
                        </Popconfirm>
                    </>
                )
            }
        },
        {
            key: "5",
            title: "Action",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => { onEdit(record) }} style={{ color: 'darkblue', marginRight: 10 }} />
                        <DeleteOutlined onClick={() => {
                            onDeleteCourse(record)
                        }} style={{ color: 'red' }} />
                    </>
                )
            }
        }
    ]);
    const updateStatus = async (value, record) => {
        const data = {
            userId: `${record.userId}`,
            accountStatus: { value } ? "Active" : "Inactive"
        }
        await axios.put('/api/user/update', data)
    }

    const handleFilterFieldChange = (value) => {
        setFilterField(value);
        filterDataList(value, filterText);
    };

    const handleFilterTextChange = (e) => {
        const searchText = e.target.value;
        setFilterText(searchText);
        filterDataList(filterField, searchText);
    };

    const filterDataList = (field, searchText) => {
        if (field === '') {
            setFilteredDataList(dataList);
            return;
        }

        const filteredList = dataList.filter((record) =>
            record[field].toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredDataList(filteredList);
    };

    const onEdit = async (record) => {
        setEditing(true);
        const data = {
            userId: `${record.userId}`
        }
        const search = await axios.post('/api/user/search', data)
        setEditingUser(search.data.data);
    }

    const onAdding = () => {
        setAdding(true)
        setAddingUser([])
    }

    //**** updating a Course */
    const updateUser = () => {
        const data = editingUser
        console.log(data)
        axios.put('/api/user/update', data)
        getFetchData()
    }

    const getFetchData = async () => {
        const user = await axios.get('/api/user/all');
        setDataList(user.data.data);
    }

    const resetEditing = () => {
        setEditing(false)
        setEditingUser([]);
    }

    const resetAdding = async () => {
        setAdding(false)
        setAddingUser([])
        form.resetFields();
    }

    //**** Deleting a Course */
    const addUser = async () => {
        form.resetFields();
        const data = addingUser
        await axios.post('/api/user/add', data)
        getFetchData()
        form.resetFields();
    }

    //**** Deleting a Course */
    const onDeleteUser = (record) => {
        const data = {
            data: {
                userId: record.userId,
            },
        };
        axios.delete('/api/user/delete', data)
            .then(() => {
                getFetchData();
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    useEffect(() => {
        getFetchData();
    }, []);

    useEffect(() => {
        if (filterText == '' && filterField == '') {
            setFilteredDataList(dataList);
        }
        else {
            filterDataList(filterField, filterText)
        }
    }, [dataList]);
    return (
        <div>
            <h2>
                Manage Users
            </h2>
            <div>
                <div >
                    <div style={{ "width": "95%", "margin": "auto", "display": "flex", "flexFlow": "row", "justifyContent": "space-between" }}>

                        <div style={{ "width": "45%", "display": "flex", "flexFlow": "row", "justifyContent": "space-between" }}>
                            <div>
                                <label>Search by : </label>
                                <Select
                                    defaultValue=""
                                    style={{ marginBottom: 16, width: 200 }}
                                    onChange={handleFilterFieldChange}
                                >
                                    <Option disabled="true" value="">-- select field--</Option>
                                    <Option value="userId">UserID</Option>
                                    <Option value="fullName">User Name</Option>
                                    {/* Add more options for other fields */}
                                </Select>
                            </div>
                            <Input
                                placeholder="Search..."
                                value={filterText}
                                onChange={handleFilterTextChange}
                                style={{ marginBottom: 16, width: 200 }}
                            />
                        </div>
                        <Button type="primary" onClick={() => {
                            onAdding()
                        }}>Add User</Button>
                    </div>
                    <div>

                        <Table
                            columns={columns}
                            dataSource={filteredDataList}
                            pagination={paginationConfig}
                        >
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manage_User
