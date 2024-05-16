import React from 'react'
import { Button, Form, Table, Modal, Input, DatePicker, Radio, Select } from 'antd';
import { useState, useEffect, useNavigate } from 'react'
import axios from 'axios'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

const Manage_College = () => {
    const [form] = Form.useForm();
    const [dataList, setDataList] = useState([]);
    const [collegeBlock, setCollegeBlock] = useState(0);
    const [collegeRoom, setCollegeRoom] = useState(0);
    const [editing, setEditing] = useState(false);
    const [editingCollege, setEditingCollege] = useState([])
    const [adding, setAdding] = useState(false)
    const [addingCollege, setAddingCollege] = useState({})
    const paginationConfig = {
        pageSize: 5,
    };
    const [filterField, setFilterField] = useState('');
    const [filterText, setFilterText] = useState('');
    const [filteredDataList, setFilteredDataList] = useState(dataList);


    const [columns, setColumns] = useState([
        {
            key: "1",
            title: "CollegeID",
            dataIndex: "collegeId"
        },
        {
            key: "2",
            title: "Collage Name",
            dataIndex: "name"
        },
        {
            key: "4",
            title: "Location",
            dataIndex: "location"
        },
        {
            key: "5",
            title: "Dean",
            dataIndex: "dean"
        },

        {
            key: "6",
            title: "Action",
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => { onEdit(record) }} style={{ color: 'darkblue', marginRight: 10 }} />
                        <DeleteOutlined onClick={() => {
                            onDeleteCollege(record)
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
            collegeId: `${record.collegeId}`
        }
        const search = await axios.post('/api/college/search', data)
        setEditingCollege(search.data.data);
        console.log(editingCollege)
    }

    useEffect(() => {

    }, [editingCollege]);

    const onAdding = () => {
        setAdding(true)
        setAddingCollege([])
    }

    //**** updating a Course */
    const updateCollege = () => {
        const data = editingCollege
        axios.put('/api/college/update', data)
        getFetchData()
    }

    const getFetchData = async () => {
        const college = await axios.get('/api/college/all');
        setDataList(college.data.data);
    }

    const resetEditing = () => {
        setEditing(false)
        setEditingCollege([]);
    }

    const resetAdding = async () => {
        setAdding(false)
        setAddingCollege([])
        form.resetFields();
    }

    //**** Deleting a Course */
    const addCollege = async () => {
        const newlocation = "B" + collegeBlock + " R" + collegeRoom;
        const updatedCollege = { ...addingCollege, location: newlocation };
        await axios.post('/api/college/add', updatedCollege);
        getFetchData();
        form.resetFields();
    }

    useEffect(() => {
        console.log(addingCollege);
    }, [addingCollege]);

    //**** Deleting a Course */
    const onDeleteCollege = (record) => {
        const data = {
            data: {
                collegeId: record.collegeId,
            },
        };
        axios.delete('/api/college/delete', data)
            .then(() => {
                getFetchData();
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    const separateLettersAndNumbers = (location) => {
        const regex = /(B|R)(\d+)/;
        const matches = location.match(regex);
        if (matches && matches.length === 3) {
            const letters = matches[1].trim();
            const block = matches[2].trim();
            const room = matches[3].trim();
            return ({ block, room })
        }
    };

    const combineLettersAndNumbers = (letters, numbers) => {
        return `${letters}${numbers}`;
    };

    const updateLocation = (location, collegeBlock, collegeRoom) => {
        const { letters } = separateLettersAndNumbers(location);
        const updatedLocation = `B${collegeBlock} R${collegeRoom}`;
        return updatedLocation;
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
                Manage College
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
                                    <Option value="collegeId">CollegeID</Option>
                                    <Option value="name">College Name</Option>
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
                        }}>Add College</Button>
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
                            title="Edit College"
                            open={editing}
                            okText="Update"
                            onCancel={() => { resetEditing() }}
                            onOk={() => {
                                updateCollege();
                                resetEditing();
                            }}
                        >

                            <fieldset>
                                <legend>College Information</legend>
                                <label>College Name</label>
                                <Input
                                    value={editingCollege.name}
                                    onChange={(e) => {
                                        setEditingCollege((pre) => {
                                            return { ...pre, name: e.target.value }
                                        })
                                    }}
                                />

                                <label>Location</label>

                                <Input
                                    value={editingCollege.location}
                                    onChange={(e) => {
                                        setEditingCollege((pre) => {
                                            return { ...pre, location: e.target.value }
                                        })
                                    }}
                                />

                                <label>College Dean</label>

                                <Input
                                    value={editingCollege.dean}
                                    onChange={(e) => {
                                        setEditingCollege((pre) => {
                                            return { ...pre, dean: e.target.value }
                                        })
                                    }}
                                />
                                <label>Contact Details</label>

                                <Input
                                    value={editingCollege.contactDetails}
                                    onChange={(e) => {
                                        setEditingCollege((pre) => {
                                            return { ...pre, contactDetails: e.target.value }
                                        })
                                    }}
                                />
                            </fieldset>
                        </Modal>


                        {/* **** Adding Course Modal **** */}
                        <Modal
                            title="Add College"
                            open={adding}
                            okText="Add College"
                            onCancel={() => { resetAdding() }}
                            onOk={() => {
                                addCollege();
                                resetAdding()
                            }}
                        >
                            <Form form={form}>
                                <fieldset>
                                    <legend>College Information</legend>
                                    <Form.Item name="name" label="College Name" rules={[
                                        {
                                            required: true,
                                            message: 'Please enter a value',
                                        },
                                    ]}>
                                        <Input
                                            onChange={(e) => {
                                                setAddingCollege((pre) => {
                                                    return { ...pre, name: e.target.value }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                 <div style={{display:"flex", flexDirection:"row"}}>
                                    <Form.Item name="block" label="Block Number" rules={[
                                        {
                                            required: true,
                                            message: 'Please enter a value',
                                        },
                                    ]}>
                                        <Input type="number"
                                            onChange={(e) => {
                                                setCollegeBlock(e.target.value)
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    <Form.Item name="room" label="Room Number" rules={[
                                        {
                                            required: true,
                                            message: 'Please enter a value',
                                        },
                                    ]}>
                                        <Input type="number"
                                            onChange={(e) => {
                                                setCollegeRoom(e.target.value)
                                            }}
                                        ></Input>
                                    </Form.Item>
                                    </div>
                                    <Form.Item name="dean" label="College Dean" rules={[
                                        {
                                            required: true,
                                            message: 'Please enter a value',
                                        },
                                    ]}>
                                        <Input
                                            onChange={(e) => {
                                                setAddingCollege((pre) => {
                                                    return { ...pre, dean: e.target.value }
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
                                                setAddingCollege((pre) => {
                                                    return { ...pre, contactDetails: e.target.value }
                                                })
                                            }}
                                        ></Input>
                                    </Form.Item>
                                </fieldset>
                            </Form>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manage_College
