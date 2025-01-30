import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link } from 'react-router-dom'
import selecaoService from '../../../src/services/serviceSelecaoTime';

const selecaoTime = () => {
    const { setUserName } = useContext(UserContext);
    const [name, setName] = useState(null);
    const navigate = useNavigate();

    const [times, setTimes] = useState([])
    useEffect(() => {
        const fetchTimes = async () => {
            try {
                const part = await selecaoService.buscarTimes()
                //console.log(part)
                setTimes(part)
                //console.log(partidas)
            } catch (error) {
                console.error(error);
            }
        };
        fetchTimes();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        //alert(`Nome selecionado: ${name.team_long_name}`);
        //console.log(name)
        if (name.trim()) {
            setUserName(name);
            navigate('/inicio'); // Redireciona para "início"
        }
    };

    return (

        <CRow className="justify-content-center mt-5" >
            <CCol md={11} style={{ marginTop: '10%' }}>
                <CCardGroup>
                    <CCard className="p-4">
                        <CCardBody>
                            <CForm onSubmit={handleSubmit}>
                                <h1>Selecione um time</h1>
                                <p className="text-body-secondary">Selecione um time e click no botão Continuar</p>
                                {/* <CInputGroup className="mb-3">
                                    <CInputGroupText>
                                        <CIcon icon={cilUser} />
                                    </CInputGroupText>
                                    <CFormInput placeholder="Username" autoComplete="username" />
                                </CInputGroup>
                                <CInputGroup className="mb-4">
                                    <CInputGroupText>
                                        <CIcon icon={cilLockLocked} />
                                    </CInputGroupText>
                                    <CFormInput
                                        type="password"
                                        placeholder="Password"
                                        autoComplete="current-password"
                                    />
                                </CInputGroup>
                                <CRow>
                                    <CCol xs={6}>
                                        <CButton color="primary" className="px-4">
                                            Login
                                        </CButton>
                                    </CCol>
                                    <CCol xs={6} className="text-right">
                                        <CButton color="link" className="px-0">
                                            Forgot password?
                                        </CButton>
                                    </CCol>
                                </CRow> */}
                                <CFormSelect aria-label="Selecione um time" onChange={(e) => setName(e.target.value)}>
                                {/* <CFormSelect aria-label="Selecione um time" onChange={(e) => setName(JSON.parse(e.target.value))} // Desserializa para um objeto
                                > */}
                                    <option>Selecione um time</option>
                                    {times.map((time, index) => (
                                        <option key={index} value={time.team_api_id}> {/* Use o campo 'id' ou outro identificador único */}
                                            {time.team_long_name} {/* Use o campo que contém o nome do time */}
                                        </option>
                                    ))}
                                </CFormSelect>
                                <CButton type="submit" color="primary" style={{ padding: '10px 20px', marginTop : '20px' }}>
                                    Continuar
                                </CButton>
                            </CForm>
                        </CCardBody>
                    </CCard>
                    {/* <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                        <CCardBody className="text-center">

                        </CCardBody>
                    </CCard> */}
                </CCardGroup>
            </CCol>
        </CRow>

    );

};

export default selecaoTime;
