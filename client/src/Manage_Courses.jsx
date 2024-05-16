import React from 'react'
import { Button, Form, Table, Modal, Input, Select } from 'antd';
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Manage_Courses = () => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [editing, setEditing] = useState(false);
    const [editingCourse, setEditingCourse] = useState([])
    const [adding, setAdding] = useState(false)
    const [addingCourse, setAddingCourse] = useState([])
    const paginationConfig = {
        pageSize: 5,
    };
    const [filterField, setFilterField] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredDataList, setFilteredDataList] = useState(dataList);


    const [columns, setColumns] = useState([
        {
            key: "1",
            title: "CourseID",
            dataIndex: "courseId"
        },
        {
            key: "2",
            title: "Credit Name",
            dataIndex: "name"
        },
        {
            key: "3",
            title: "Credit Hour",
            dataIndex: "credits"
        },

        {
            key: "4",
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
            courseId: `${record.courseId}`
        }
        const search = await axios.post('/api/course/search', data)
        setEditingCourse(search.data.data);
    }

    const onAdding = () => {
        setAdding(true)
        setAddingCourse([])
    }

    //**** updating a Course */
    const updateCourse = () => {
        const data = editingCourse
        console.log(data)
        axios.put('/api/course/update', data)
        getFetchData()
    }

    const getFetchData = async () => {
        const course = await axios.get('/api/course/all');
        setDataList(course.data.data);
    }

    const resetEditing = () => {
        setEditing(false)
        setEditingCourse([]);
    }

    const resetAdding = async () => {
        setAdding(false)
        setAddingCourse([])
        form.resetFields();
    }

    //**** Deleting a Course */
    const addCourse = async () => {
        form.resetFields();
        const data = addingCourse
        await axios.post('/api/course/add', data)
        getFetchData()
        form.resetFields();
    }

    //**** Deleting a Course */
    const onDeleteCourse = (record) => {
        const data = {
            data: {
                courseId: record.courseId,
            },
        };
        axios.delete('/api/course/delete', data)
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
                Manage Courses
            </h2>
            <div>
                <div >
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
                            <Option value="courseId">CourseID</Option>
                            <Option value="name">Course Name</Option>
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
                    <div>

                        <Table
                            columns={columns}
                            dataSource={filteredDataList}
                            pagination={paginationConfig}
                        >
                        </Table>

                        {/* **** Editing Course Modal **** */}
                        <Modal
                            title="Edit Course"
                            open={editing}
                            okText="Update"
                            onCancel={() => { resetEditing() }}
                            onOk={() => {
                                updateCourse();
                                resetEditing()
                            }}
                        >
                            <label> Course Name</label>
                            <Input value={editingCourse.name}
                                onChange={(e) => {
                                    setEditingCourse((pre) => {
                                        return { ...pre, name: e.target.value }
                                    })
                                }}
                            ></Input>
                            <label> Credit Score</label>
                            <Input type="number" value={editingCourse.credits}
                                onChange={(e) => {
                                    setEditingCourse((pre) => {
                                        return { ...pre, credits: e.target.value }
                                    })
                                }}
                            ></Input>
                        </Modal>


                        {/* **** Adding Course Modal **** */}
                        <Modal
                            title="Add Course"
                            open={adding}
                            okText="Add Course"
                            onCancel={() => { resetAdding() }}
                            onOk={() => {
                                addCourse();
                                resetAdding()
                            }}
                        >
                            <Form form={form}></Form>
                            <fieldset>
                                <legend>Course Information</legend>
                                <Form.Item name="name" label="Course Name" rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a value',
                                    },
                                ]}>
                                    <Input
                                        onChange={(e) => {
                                            setAddingCourse((pre) => {
                                                return { ...pre, name: e.target.value }
                                            })
                                        }}
                                    ></Input>
                                </Form.Item>

                                <Form.Item name="credits" label="Credit Score" rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a value',
                                    },
                                ]}>
                                    <Input type="number"
                                        onChange={(e) => {
                                            setAddingCourse((pre) => {
                                                return { ...pre, credits: e.target.value }
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

export default Manage_Courses
