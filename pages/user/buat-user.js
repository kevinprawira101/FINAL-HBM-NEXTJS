import React from 'react'
import Layout from '../../components/Layout';
import { Form, Row, Col, Button } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik, Form as Forms } from 'formik';
import Axios from 'axios'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const UserSchema = Yup.object().shape({
    first_name: Yup.string().required('*required'),
    last_name: Yup.string().required('*required'),
    email: Yup.string().required('*required'),
    password: Yup.string().required('*required'),
});

export default function User({ data }) {
    const url = 'http://localhost:3000/api/user/user';

    return (
        <Layout>
            <Formik
                initialValues={{
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    role_id: '',
                }}

                validationSchema={UserSchema}
                onSubmit={async (values) => {
                    Axios.post(url, values).
                        then(function (response) {
                            console.log(response)
                        }).
                        catch(function (error) {
                            console.log(error)

                        })
                }}
            >
                {(props) => (
                    <Forms noValidate>
                        <div>
                            <h4>Buat User Baru</h4>
                            <div class="mt-12 container">
                                <Form>
                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>First Name</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder="First Name" name="first_name" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.first_name && props.touched.first_name ? <div class="text-red-500 text-sm">{props.errors.first_name}</div> : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Last Name</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder="Last Name" name="last_name" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.last_name && props.touched.last_name ? <div class="text-red-500 text-sm">{props.errors.last_name}</div> : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Email</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder="Email" name="email" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.email && props.touched.email ? <div class="text-red-500 text-sm">{props.errors.email}</div> : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Password</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Form.Control placeholder="Password" name="password" onChange={props.handleChange} onBLur={props.handleBlur} />
                                            {props.errors.password && props.touched.password ? <div class="text-red-500 text-sm">{props.errors.password}</div> : null}
                                        </Col>
                                    </Row>

                                    <Row className="mb-2">
                                        <Col sm="2">
                                            <Form.Label>Roles</Form.Label>
                                        </Col>
                                        <Col sm="4">
                                            <Row>
                                                <Col>
                                                    {/* <Form.Control as="select" defaultValue="Choose..." name="role_id" onChange={props.handleChange} onBLur={props.handleBlur} >
                                                        {data.map((i, index) => (
                                                            <option key={i.id} value={index}>{i.roleType}</option>
                                                        ))}
                                                    </Form.Control> */}
                                                    <Form.Control as="select" name="role_id" onChange={props.handleChange} onBLur={props.handleBlur} >
                                                        {data.map((i, index) => (
                                                            <option key={i.id} value={i.id}>{i.roleType}</option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col sm="2" />
                                        <Col sm="4" className="d-flex justify-content-end mt-10">
                                            <Button variant="danger mr-2">Batal</Button>
                                            <Button variant="success" onClick={props.handleSubmit}>Simpan</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                    </Forms>
                )}

            </Formik>
        </Layout>
    )
}

export async function getServerSideProps() {
    const roles = await prisma.role.findMany({
        orderBy: [
            {
                id: 'asc'
            }
        ]
    });

    return {
        props: {
            data: roles
        }

    }
}