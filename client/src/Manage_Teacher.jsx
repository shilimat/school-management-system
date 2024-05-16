import React from 'react'
import { Button, Form, Table, Modal, Input, DatePicker, Radio, Select } from 'antd';
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Manage_Teacher = () => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingTeacher, setEditingTeacher] = useState([])
    const [adding, setAdding] = useState(false)
    const [addingTeacher, setAddingTeacher] = useState([])
    const paginationConfig = {
        pageSize: 3,
    };
    const [filterField, setFilterField] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredDataList, setFilteredDataList] = useState(dataList);

    const [columns, setColumns] = useState([
        {
            key: "1",
            title: "TeacherID",
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
            teacherId: `${record.teacherId}`
        }
        const search = await axios.post('/api/teacher/search', data)
        setEditingTeacher(search.data.data);
    }

    const onAdding = () => {
        setAdding(true)
        setAddingTeacher([])
    }

    //**** updating a Course */
    const updateTeacher = () => {
        const data = editingTeacher
        console.log(data)
        axios.put('/api/teacher/update', data)
        getFetchData()
    }

    const getFetchData = async () => {
        const teacher = await axios.get('/api/teacher/all');
        setDataList(teacher.data.data);
    }

    const resetEditing = () => {
        setEditing(false)
        setEditingTeacher([]);
    }

    const resetAdding = async () => {
        setAdding(false)
        setAddingTeacher([])
        form.resetFields();
    }

    //**** Deleting a Course */
    const addTeacher = async () => {
        setAddingTeacher((pre) => {
            return { ...pre, courses: { ...pre.courses, courseId: '' } }
        })
        setAddingTeacher((pre) => {
            return { ...pre, courses: { ...pre.courses, semester: '' } }
        })
        setAddingTeacher((pre) => {
            return { ...pre, courses: { ...pre.courses, section: '' } }
        })
        const data = addingTeacher
        await axios.post('/api/teacher/add', data)
        getFetchData()
        form.resetFields();
    }

    //**** Deleting a Course */
    const onDeleteTeacher = (record) => {
        const data = {
            data: {
                teacherId: record.teacherId,
            },
        };
        axios.delete('/api/teacher/delete', data)
            .then(() => {
                getFetchData();
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    const getDepartments = async () => {
        const departments = await axios.get('/api/department/all')
        setAllDepartments(departments.data.data);
    }

    useEffect(() => {
        getFetchData();
        getDepartments();
    }, []);

    // useEffect(() => {
    //     getDepartments();
    // }, []);

    useEffect(() => {
        console.log(editingTeacher);
        console.log(allDepartments)
    }, [editingTeacher]);

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
                Manage Teacher
            </h2>
            <div>

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
                                <Option value="teacherId">TeacherID</Option>
                                <Option value="firstName">First Name</Option>
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
                    }}>Add Teacher</Button>
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
                        title="Edit Teacher"
                        open={editing}
                        okText="Update"
                        onCancel={() => { resetEditing() }}
                        onOk={() => {
                            updateTeacher();
                            resetEditing()
                        }}
                    >
                        <label> First Name</label>
                        <Input value={editingTeacher.firstName}
                            onChange={(e) => {
                                setEditingTeacher((pre) => {
                                    return { ...pre, firstName: e.target.value }
                                })
                            }}
                        ></Input>
                        <label> Last Name</label>
                        <Input value={editingTeacher.lastName}
                            onChange={(e) => {
                                setEditingTeacher((pre) => {
                                    return { ...pre, lastName: e.target.value }
                                })
                            }}
                        ></Input>

                        <label> Gender</label>
                        <Radio.Group onChange={(e) => {
                            setEditingTeacher((pre) => {
                                return { ...pre, gender: e.target.value }
                            })
                        }}>
                            <Radio value="Male" checked={editingTeacher.gender === "Male"} >Male</Radio>
                            <Radio value="Female" checked={editingTeacher.gender === "Female"} >Female</Radio>
                        </Radio.Group>

                        <label> Email</label>
                        <Input value={editingTeacher.email}
                            onChange={(e) => {
                                setEditingTeacher((pre) => {
                                    return { ...pre, email: e.target.value }
                                })
                            }}
                        ></Input>

                        <label> department</label>
                        <Select
                        placeholder="--Select Department--"
                            onChange={(value) => {
                                setEditingTeacher((pre) => {
                                    return { ...pre, department: value }
                                })
                            }}
                        >
                            {
                                allDepartments.map((opts) => <option value={opts.name}>{opts.name}</option>)
                            }
                        </Select>
                    </Modal>


                    {/* **** Adding Teacher Modal **** */}
                    <Modal
                        title="Add Teacher"
                        open={adding}
                        okText="Add Teacher"
                        onCancel={() => {
                            setAdding(false)
                            resetAdding()
                        }}
                        onOk={() => {
                            addTeacher()
                            resetAdding()

                        }}
                    >
                        <Form form={form}>
                            <fieldset>
                                <legend>Personal Information</legend>
                                <Form.Item name="firstName" label="Firstname" rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a value',
                                    },
                                ]}>
                                    <Input
                                        onChange={(e) => {
                                            setAddingTeacher((pre) => {
                                                return { ...pre, firstName: e.target.value }
                                            })
                                        }}
                                    ></Input>
                                </Form.Item>
                                <Form.Item name="lastName" label="Lastname">
                                    <Input
                                        onChange={(e) => {
                                            setAddingTeacher((pre) => {
                                                return { ...pre, lastName: e.target.value }
                                            })
                                        }}
                                    ></Input>
                                </Form.Item>
                                <Form.Item name="email" label="Email">
                                    <Input
                                        onChange={(e) => {
                                            setAddingTeacher((pre) => {
                                                return { ...pre, email: e.target.value }
                                            })
                                        }}
                                    ></Input>
                                </Form.Item>
                                <Form.Item name="gender" label="Gender">
                                    <Radio.Group onChange={(e) => {
                                        setAddingTeacher((pre) => {
                                            return { ...pre, gender: e.target.value }
                                        })
                                    }}>
                                        <Radio value="Male">Male</Radio>
                                        <Radio value="Female">Female</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item name="department" label="Department">
                                    <Select
                                    placeholder="--Select Department--"
                                        onChange={(value) => {
                                            setAddingTeacher((pre) => {
                                                return { ...pre, department: value }
                                            })
                                        }}
                                    >
                                        {
                                            allDepartments.map((opts) => <option value={opts.name}>{opts.name}</option>)
                                        }
                                    </Select>
                                </Form.Item>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Form.Item name="building" label="BuildingNo">
                                        <Input type="number"
                                            onChange={(e) => {
                                                setAddingTeacher((pre) => {
                                                    return { ...pre, office: { ...pre.office, building: e.target.value } }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item name="roomNumber" label="RoomNo">
                                        <Input type="number"
                                            onChange={(e) => {
                                                setAddingTeacher((pre) => {
                                                    return { ...pre, office: { ...pre.office, roomNumber: e.target.value } }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item name="officeHours" label="Office Hours">
                                        <Input type="number"
                                            onChange={(e) => {
                                                setAddingTeacher((pre) => {
                                                    return { ...pre, office: { ...pre.office, officeHours: e.target.value } }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                </div>
                            </fieldset>
                        </Form>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default Manage_Teacher
