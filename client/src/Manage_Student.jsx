import React from 'react'
import { Button, Form, Table, Modal, Input, DatePicker, Radio, Select } from 'antd';
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'



function Manage_Student() {
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
            dataIndex: "studentId"
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
            title: "GradeLevel",
            dataIndex: "gradeLevel"
        },
        {
            key: "7",
            title: "Section",
            dataIndex: "section"
        },
        {
            key: "8",
            title: "Action",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => { onEdit(record) }} style={{ color: 'darkblue', marginRight: 10 }} />
                        <DeleteOutlined onClick={() => {
                            onDeleteStudent(record)
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
            studentId: `${record.studentId}`
        }
        const search = await axios.post('/api/student/search', data)
        setEditingStudent(search.data.data);
    }


    const getFetchData = async () => {
        const student = await axios.get('/api/student/all');
        setDataList(student.data.data);  
    }

    const onDeleteStudent = (record) => {
        const data = {
            data: {
                studentId: record.studentId,
            },
        };

        axios.delete('/api/student/delete', data)
            .then(() => {
                getFetchData();
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    const onAdding = () => {
        setAdding(true)
        setAddingStudent([])
    }

    const resetEditing = () => {
        setEditing(false)
        setEditingStudent([]);
    }



    const updateStudent = () => {
        const data = editingStudent
        console.log(data)
        axios.put('/api/student/update', data)
        getFetchData()
    }

    const handleOk = () => {
        form.validateFields().then((values) => {
            addStudent()
            onOk();
        });
    };

    const addStudent = async () => {

        setAddingStudent((pre) => {
            return { ...pre, enrollerdCourses: "" }
        })
        setAddingStudent((pre) => {
            return { ...pre, transcript: { ...pre.transcript, courseId: '' } }
        })
        setAddingStudent((pre) => {
            return { ...pre, transcript: { ...pre.transcript, grade: '' } }
        })
        const data = addingStudent
        await axios.post('/api/student/add', data)
        form.resetFields();
        getFetchData()

    }

       
    const resetAdding = () => {
        setAdding(false);
        form.resetFields();
    };



    useEffect(() => {
        getFetchData(); 
      }, []);
    
    useEffect(() => {
        if (filterText=='' && filterField==''){
        setFilteredDataList(dataList);
        }
        else{
            filterDataList(filterField, filterText)
        }
    }, [dataList]);

    return (
        <div>
            <h2>
                Manage Student
            </h2>
            <div>
                <div>
                <div style={{"width":"95%", "margin":"auto", "display":"flex", "flexFlow":"row" ,"justifyContent": "space-between"}}>
                        
                        <div style={{"width":"45%", "display":"flex", "flexFlow":"row" ,"justifyContent": "space-between"}}>
                        <div>
                        <label>Search by : </label>
                        <Select
                            defaultValue=""
                            style={{ marginBottom: 16, width: 200 }}
                            onChange={handleFilterFieldChange}
                        >
                            <Option disabled="true" value="">-- select field--</Option>
                            <Option value="studentId">StudentID</Option>
                            <Option value="firstName">Student Name</Option>
                            <Option value="department">Department</Option>
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
                        }}>Add Course</Button>
                    </div>
                    </div>
                    <div>
                        <Table
                            columns={columns}
                            dataSource={filteredDataList}
                            pagination={paginationConfig}
                        >
                        </Table>
                        <Modal
                            title="Edit Student"
                            open={editing}
                            okText="Update"
                            onCancel={() => { resetEditing() }}
                            onOk={() => {
                                updateStudent();
                                resetEditing()
                            }}
                        >
                            <label> FirstName</label>
                            <Input value={editingStudent.firstName}
                                onChange={(e) => {
                                    setEditingStudent((pre) => {
                                        return { ...pre, firstName: e.target.value }
                                    })
                                }}
                            ></Input>
                            <label> LastName</label>
                            <Input value={editingStudent.lastName}
                                onChange={(e) => {
                                    setEditingStudent((pre) => {
                                        return { ...pre, lastName: e.target.value }
                                    })
                                }}
                            ></Input>
                            <label> Email</label>
                            <Input value={editingStudent.email}
                                onChange={(e) => {
                                    setEditingStudent((pre) => {
                                        return { ...pre, email: e.target.value }
                                    })
                                }}
                            ></Input>
                            <label> Date of Birth</label>

                            <DatePicker format={"yyyy-mm-ddT00:00:00.000Z"}
                                onChange={(e) => {
                                    setEditingStudent((pre) => {
                                        return { ...pre, dateOfBirth: e.target.value }
                                    })
                                }}
                            ></DatePicker>
                            <label> Department</label>
                            <Input value={editingStudent.department}
                                onChange={(e) => {
                                    setEditingStudent((pre) => {
                                        return { ...pre, department: e.target.value }
                                    })
                                }}
                            ></Input>
                            <label> Section</label>
                            <Input value={editingStudent.section}
                                onChange={(e) => {
                                    setEditingStudent((pre) => {
                                        return { ...pre, section: e.target.value }
                                    })
                                }}
                            ></Input>

                        </Modal>
                        <Modal
                            title="Add Student"
                            open={adding}
                            okText="Add Student"
                            onCancel={() => {
                                setAdding(false)
                                resetAdding()
                            }}
                            onOk={() => {
                                handleOk()
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
                                                setAddingStudent((pre) => {
                                                    return { ...pre, firstName: e.target.value }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item name="lastName" label="Lastname">
                                        <Input
                                            onChange={(e) => {
                                                setAddingStudent((pre) => {
                                                    return { ...pre, lastName: e.target.value }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item name="email" label="Email">
                                        <Input
                                            onChange={(e) => {
                                                setAddingStudent((pre) => {
                                                    return { ...pre, email: e.target.value }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item name="password" label="Password">
                                        <Input.Password
                                            onChange={(e) => {
                                                setAddingStudent((pre) => {
                                                    return { ...pre, password: e.target.value }
                                                })
                                            }}
                                        />
                                    </Form.Item>

                                    <Form.Item name="dateOfBirth" label="Date Of Birth">
                                        <DatePicker
                                            onChange={(date, dateString) => {
                                                setAddingStudent((pre) => {
                                                    return { ...pre, dateOfBirth: dateString }
                                                })
                                            }}
                                        ></DatePicker>
                                    </Form.Item>
                                    <Form.Item name="gender" label="Gender">
                                        <Radio.Group onChange={(e) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, gender: e.target.value }
                                            })
                                        }}>
                                            <Radio value="Male">Male</Radio>
                                            <Radio value="Female">Female</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item name="contactNumber" label="Contact Number">
                                        <Input type="number" onChange={(e) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, contactNumber: e.target.value }
                                            })
                                        }}>
                                        </Input>
                                    </Form.Item>

                                </fieldset>
                                <fieldset>
                                    <legend>Address Information</legend>
                                    <Form.Item name="street" label="Street">
                                        <Input onChange={(e) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, address: { ...pre.address, street: e.target.value } }
                                            })
                                        }}>
                                        </Input>
                                    </Form.Item>
                                    <Form.Item name="city" label="City">
                                        <Input onChange={(e) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, address: { ...pre.address, city: e.target.value } }
                                            })
                                        }}>
                                        </Input>
                                    </Form.Item>
                                    <Form.Item name="state" label="Zone">
                                        <Input onChange={(e) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, address: { ...pre.address, state: e.target.value } }
                                            })
                                        }}>
                                        </Input>
                                    </Form.Item>
                                    <Form.Item name="postalCode" label="Postal Code">
                                        <Input onChange={(e) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, address: { ...pre.address, postalCode: e.target.value } }
                                            })
                                        }}>
                                        </Input>
                                    </Form.Item>
                                    <Form.Item name="country" label="Nationality">
                                        <Input defaultValue={"Ethiopian"} onChange={(e) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, address: { ...pre.address, country: e.target.value } }
                                            })
                                        }}>
                                        </Input>
                                    </Form.Item>
                                </fieldset>
                                <fieldset>
                                    <legend>Academic Information</legend>
                                    <Form.Item name="department" label="Department">
                                        <Input
                                            onChange={(e) => {
                                                setAddingStudent((pre) => {
                                                    return { ...pre, department: e.target.value }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item name="gradeLevel" label="Grade Level">
                                        <Select onChange={(value) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, gradeLevel: value }
                                            })
                                        }}>
                                            <Select.Option value={1}>1</Select.Option>
                                            <Select.Option value={2}>2</Select.Option>
                                            <Select.Option value={3}>3</Select.Option>
                                            <Select.Option value={4}>4</Select.Option>
                                            <Select.Option value={5}>5</Select.Option>
                                            <Select.Option value={6}>6</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="section" label="Section">
                                        <Select onChange={(value) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, section: value }
                                            })
                                        }}>
                                            <Select.Option value='A'>A</Select.Option>
                                            <Select.Option value='B'>B</Select.Option>
                                            <Select.Option value='C'>C</Select.Option>
                                            <Select.Option value='D'>D</Select.Option>

                                        </Select>
                                    </Form.Item>
                                    <Form.Item name="semester" label="Semester">
                                        <Select onChange={(value) => {
                                            setAddingStudent((pre) => {
                                                return { ...pre, semester: value }
                                            })
                                        }}>
                                            <Select.Option value={1}>1</Select.Option>
                                            <Select.Option value={2}>2</Select.Option>

                                        </Select>
                                    </Form.Item>
                                </fieldset>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
  )
}

export default Manage_Student
