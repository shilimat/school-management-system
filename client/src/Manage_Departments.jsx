import React from 'react'
import { Button, Form, Table, Modal, Input, Select } from 'antd';
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'


const Manage_Departments = () => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [allColleges, setAllColleges] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState([])
    const [adding, setAdding] = useState(false)
    const [addingDepartment, setAddingDepartment] = useState([])
    const paginationConfig = {
        pageSize: 5,
    };
    const [filterField, setFilterField] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredDataList, setFilteredDataList] = useState(dataList);


    const [columns, setColumns] = useState([
        {
            key: "1",
            title: "Department",
            dataIndex: "departmentId"
        },
        {
            key: "2",
            title: "Department Name",
            dataIndex: "name"
        },
        {
            key: "3",
            title: "College",
            dataIndex: "collegeId"
        },
        {
            key: "4",
            title: "Department Head",
            dataIndex: "headOfDepartment"
        },

        {
            key: "5",
            title: "Action",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => { onEdit(record) }} style={{ color: 'darkblue', marginRight: 10 }} />
                        <DeleteOutlined onClick={() => {
                            onDeleteDepartment(record)
                        }} style={{ color: 'red' }} />
                    </>
                )
            }
        }
    ]);

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
            departmentId: `${record.departmentId}`
        }
        const search = await axios.post('/api/department/search', data)
        setEditingDepartment(search.data.data);
    }

    const onAdding = () => {
        setAdding(true)
        setAddingDepartment([])
    }

    //**** updating a Course */
    const updateDepartment = () => {
        const data = editingDepartment
        console.log(data)
        axios.put('/api/department/update', data)
        getFetchData()
    }

    const getFetchData = async () => {
        const department = await axios.get('/api/department/all');
        setDataList(department.data.data);
    }

    const resetEditing = () => {
        setEditing(false)
        setEditingDepartment([]);
    }

    const resetAdding = async () => {
        setAdding(false)
        setAddingDepartment([])
        form.resetFields();
    }

    //**** Deleting a Course */
    const addDepartment = async () => {
        form.resetFields();
        const data = addingDepartment
        await axios.post('/api/department/add', data)
        getFetchData()
    }

    //**** Deleting a Course */
    const onDeleteDepartment = (record) => {
        const data = {
            data: {
                departmentId: record.departmentId,
            },
        };
        axios.delete('/api/department/delete', data)
            .then(() => {
                getFetchData();
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    const getColleges = async () => {
        const colleges = await axios.get('/api/college/all')
        setAllColleges(colleges.data.data);
    }

    useEffect(() => {
        getFetchData();
        getColleges();
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
                Manage Departments
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
                                    <Option value="departmentId">DepartmentID</Option>
                                    <Option value="name">Department Name</Option>
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
                        }}>Add Department</Button>
                    </div>
                    <div>

                        <Table
                            columns={columns}
                            dataSource={filteredDataList}
                            pagination={paginationConfig}
                        >
                        </Table>

                        {/* **** Editing Course Modal **** */}
                        <Modal
                            title="Edit Department"
                            open={editing}
                            okText="Update"
                            onCancel={() => { resetEditing() }}
                            onOk={() => {
                                updateDepartment();
                                resetEditing()
                            }}
                        >
                            <label> Department Name</label>
                            <Input value={editingDepartment.name}
                                onChange={(e) => {
                                    setEditingDepartment((pre) => {
                                        return { ...pre, name: e.target.value }
                                    })
                                }}
                            ></Input>
                            <label for="collegeid"> College Id</label>
                            <Select style={{width:"100%"}}
                                placeholder="--Select College--"
                                onChange={(value) => {
                                    setEditingDepartment((pre) => {
                                        return { ...pre, collegeId: value }
                                    })
                                }}
                            >
                                {
                                    allColleges.map((opts) => <option value={opts.collegeId}>{opts.name}</option>)
                                }
                            </Select>

                            <label> Department head</label>
                            <Input value={editingDepartment.headOfDepartment}
                                onChange={(e) => {
                                    setEditingDepartment((pre) => {
                                        return { ...pre, headOfDepartment: e.target.value }
                                    })
                                }}
                            ></Input>

                            <label> Contact Details</label>
                            <Input value={editingDepartment.contactDetails}
                                onChange={(e) => {
                                    setEditingDepartment((pre) => {
                                        return { ...pre, contactDetails: e.target.value }
                                    })
                                }}
                            ></Input>
                        </Modal>


                        {/* **** Adding Course Modal **** */}
                        <Modal
                            title="Add Department"
                            open={adding}
                            okText="Add Department"
                            onCancel={() => { resetAdding() }}
                            onOk={() => {
                                addDepartment();
                                resetAdding()
                            }}
                        >
                            <Form form={form}></Form>
                            <fieldset>
                                <legend>Department Information</legend>
                                <Form.Item name="name" label="Department Name" rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a value',
                                    },
                                ]}>
                                    <Input
                                        onChange={(e) => {
                                            setAddingDepartment((pre) => {
                                                return { ...pre, name: e.target.value }
                                            })
                                        }}
                                    ></Input>
                                </Form.Item>

                                <Form.Item name="collegeId" label="College Id" rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a value',
                                    },
                                ]}>
                                    <Select
                                        placeholder="--Select College--"
                                        onChange={(value) => {
                                            setAddingDepartment((pre) => {
                                                return { ...pre, collegeId: value }
                                            })
                                        }}
                                    >
                                        {
                                            allColleges.map((opts) => <option value={opts.collegeId}>{opts.name}</option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name="headOfDepartment" label="Department Head" rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a value',
                                    },
                                ]}>
                                    <Input
                                        onChange={(e) => {
                                            setAddingDepartment((pre) => {
                                                return { ...pre, headOfDepartment: e.target.value }
                                            })
                                        }}
                                    ></Input>
                                </Form.Item>
                                <Form.Item name="contactDetails" label="Contact Details" rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a value',
                                    },
                                ]}>
                                    <Input
                                        onChange={(e) => {
                                            setAddingDepartment((pre) => {
                                                return { ...pre, contactDetails: e.target.value }
                                            })
                                        }}
                                    ></Input>
                                </Form.Item>

                            </fieldset>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manage_Departments
