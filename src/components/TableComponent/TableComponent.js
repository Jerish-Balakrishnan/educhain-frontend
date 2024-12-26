import React, { useState, useEffect } from 'react';
import { Table, Input, Spin, Alert, Row, Col } from 'antd';
import axios from 'axios';

const TableComponent = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'https://raw.githubusercontent.com/RashitKhamidullin/Educhain-Assignment/refs/heads/main/applications'
                );
                setData(response.data);
                setFilteredData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handle search
    const handleSearch = (value) => {
        const filtered = data.filter((item) =>
            item.applicantName.toLowerCase().includes(value.toLowerCase()) ||
            item.status_En.toLowerCase().includes(value.toLowerCase()) ||
            item.studentID.toString().includes(value)
        );
        setFilteredData(filtered); // Update the filtered data state
    };

    const columns = [
        {
            title: 'Application No',
            dataIndex: 'applicationNO',
            key: 'applicationNO',
            sorter: (a, b) => a.applicationNO - b.applicationNO, // Enable sorting
        },
        {
            title: 'Applicant Name',
            dataIndex: 'applicantName',
            key: 'applicantName',
            sorter: (a, b) => a.applicantName.localeCompare(b.applicantName), // Sorting by name
        },
        {
            title: 'Application Date',
            dataIndex: 'applicationDate',
            key: 'applicationDate',
            sorter: (a, b) => new Date(a.applicationDate) - new Date(b.applicationDate), // Sorting by date
        },
        {
            title: 'Student ID',
            dataIndex: 'studentID',
            key: 'studentID',
        },
        {
            title: 'Paid Amount',
            dataIndex: 'paidAmount',
            key: 'paidAmount',
        },
        {
            title: 'Status (English)',
            dataIndex: 'status_En',
            key: 'status_En',
        },
        {
            title: 'Status (Arabic)',
            dataIndex: 'status_Ar',
            key: 'status_Ar',
        },
        {
            title: 'Last Updated',
            dataIndex: 'lastDate',
            key: 'lastDate',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Row justify="end" style={{ marginBottom: '20px' }}>
                <Col>
                    <Input.Search
                        placeholder="Search by Applicant Name, Status, or Student ID"
                        onSearch={handleSearch}
                        style={{ width: '300px' }}
                        allowClear
                    />
                </Col>
            </Row>
            {loading ? (
                <Spin />
            ) : error ? (
                <Alert message={error} type="error" />
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <Table
                        columns={columns}
                        dataSource={filteredData}
                        rowKey="applicationNO"
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1200 }}
                    />
                </div>
            )}
        </div>
    );
};

export default TableComponent;
