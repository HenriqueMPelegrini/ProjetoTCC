import React, { useEffect, useMemo, useState } from 'react';
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCardText,
    CCardImage,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CForm,
    CFormLabel,
    CInputGroup,
    CFormInput,
    CContainer,
    CButton,

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilZoom } from '@coreui/icons'

import partidasService from '../../../src/services/servicePartidas';


const Tabela = (props) => {
    const [cpfCnpj, setC] = useState()
    const [partidas, setPartidas] = useState([])
    const [validated, setValidated] = useState(false)
    const [busca, setBusca] = useState('')


    useEffect(() => {
        const fetchPartida = async () => {
            try {
                const part = await partidasService.buscarPartidas("25", "2015/2016")
                //console.log(part)
                setPartidas(part)
                console.log(partidas)
            } catch (error) {
                console.error(error);
            }
        };
        fetchPartida();
    }, [])


    //   const empresasFiltradas = useMemo(() => {
    //     console.log(empresas)
    //     const lowerBusca = busca.toLowerCase();
    //     // return empresas.filter((empresa) => empresa.tradeName.toLowerCase().includes(lowerBusca))
    //     return empresas.filter((empresa) => {
    //       // Verifica se algum dos campos da empresa inclui a busca
    //       return Object.values(empresa).some(value => {
    //         if (typeof value === 'string') {
    //           return value.toLowerCase().includes(lowerBusca);
    //         }
    //         return false; // Ignora campos que não são strings
    //       });
    //     });
    //   }, [busca,empresas])

    return (
        <CContainer>
            <CForm
                className="row g-4 needs-validation mb-4 mt-2"
                noValidate
                validated={validated}
            //onSubmit={handleSubmit}
            >
                <CRow>
                    <CCol md={6}>
                        <CFormLabel htmlFor="validationCustomUsername">Pesquisar</CFormLabel>
                        <CInputGroup className="has-validation">
                            <CFormInput
                                type="text"
                                // aria-describedby="inputGroupPrependFeedback"
                                //feedbackInvalid="Campo 'Nome da Empresa' não foi preenchido"
                                // id="companyName"
                                // name='companyName'
                                // required
                                value={busca}
                                onChange={(ev) => setBusca(ev.target.value)}
                            />
                        </CInputGroup>
                    </CCol>
                    <CCol md={6}>
                        {/* <CButton color="primary"  style={{marginTop : "31px"}} className="me-2" variant="outline">
                            <CIcon icon={cilZoom} /> Pesquisar
                        </CButton> */}
                        {/* <CButton color="primary" style={{ marginTop: "31px" }} variant="outline" onClick={() => props.onExibir(false)}>
                            Novo
                        </CButton> */}
                        {partidas.length}
                    </CCol>

                </CRow>
            </CForm>
            <CRow>
                <CCol xs={12}>
                    <CCard
                        //color='dark'
                        textColor='white'
                        className="mb-3 text-center"
                        style={{ backgroundColor: 'transparent' }}

                    >
                        <CCardHeader>
                            <strong>Jogos</strong>
                        </CCardHeader>
                        <CCardBody>
                            {/* <p className="text-body-secondary small">
              Use <code>hover</code> property to enable a hover state on table rows within a{' '}
              <code>&lt;CTableBody&gt;</code>.
            </p> */}
                            {partidas.length > 0 ? (
                                <CCard className={`border-white `}  textColor='white' style={{ backgroundColor: 'transparent' }}>
                                    <CCardHeader>
                                        <strong>Liga Inglesa</strong>
                                    </CCardHeader>
                                    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }} className='mt-2 mb-3'>

                                        {partidas.map((p, index) => (
                                            p.league_id == 1729 ? (<CCol xs>
                                                <CCard
                                                    // className={`border-secondary `}
                                                    className={` border-top-dark border-top-3`}
                                                    key={index}
                                                >
                                                    <CCardBody>
                                                        <CRow>
                                                            <CCol sm={5}>
                                                                <CCard className={` border-light `}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <CCardImage
                                                                            orientation="top"
                                                                            src='https://s.sde.globo.com/media/teams/2018/03/12/liverpool.svg'
                                                                            style={{ width: '60px', height: 'auto' }}
                                                                        />
                                                                    </div>
                                                                    <CCardBody>
                                                                        <CCardText>
                                                                            {p.home_team_api_id[0].team_long_name}
                                                                        </CCardText>
                                                                    </CCardBody>
                                                                </CCard>
                                                            </CCol>
                                                            <CCol sm={2}  >
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40%' }}>
                                                                    <h3>X</h3>
                                                                </div>
                                                            </CCol>
                                                            <CCol sm={5}>
                                                                <CCard className={`border-light `} >
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <CCardImage
                                                                            orientation="top"
                                                                            src='https://s.sde.globo.com/media/teams/2018/03/12/liverpool.svg'
                                                                            style={{ width: '60px', height: 'auto' }}
                                                                        />
                                                                    </div>
                                                                    <CCardBody>
                                                                        <CCardText>
                                                                            {p.away_team_api_id[0].team_long_name}
                                                                        </CCardText>
                                                                    </CCardBody>
                                                                </CCard>
                                                            </CCol>
                                                        </CRow>

                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            ) : (
                                                null
                                            )


                                        ))}



                                    </CRow>
                                </CCard>
                            ) : (
                                null
                            )}

                            {partidas.length > 0 ? (
                                <CCard className={`border-dark `} style={{ backgroundColor: 'transparent' }}>
                                    <CCardHeader>
                                        <strong>Ligue 1</strong>
                                    </CCardHeader>
                                    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }} className='mt-2 mb-3'>

                                        {partidas.map((p, index) => (
                                            p.league_id == 4769 ? (<CCol xs>
                                                <CCard
                                                    // className={`border-secondary `}
                                                    className={` border-top-dark border-top-3`}
                                                    key={index}
                                                >
                                                    <CCardBody>
                                                        <CRow>
                                                            <CCol sm={5}>
                                                                <CCard className={` border-light `}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <CCardImage
                                                                            orientation="top"
                                                                            src='https://s.sde.globo.com/media/teams/2018/03/12/liverpool.svg'
                                                                            style={{ width: '60px', height: 'auto' }}
                                                                        />
                                                                    </div>
                                                                    <CCardBody>
                                                                        <CCardText>
                                                                            {p.home_team_api_id[0].team_long_name}
                                                                        </CCardText>
                                                                    </CCardBody>
                                                                </CCard>
                                                            </CCol>
                                                            <CCol sm={2}  >
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40%' }}>
                                                                    <h3>X</h3>
                                                                </div>
                                                            </CCol>
                                                            <CCol sm={5}>
                                                                <CCard className={`border-light `} >
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <CCardImage
                                                                            orientation="top"
                                                                            src='https://s.sde.globo.com/media/teams/2018/03/12/liverpool.svg'
                                                                            style={{ width: '60px', height: 'auto' }}
                                                                        />
                                                                    </div>
                                                                    <CCardBody>
                                                                        <CCardText>
                                                                            {p.away_team_api_id[0].team_long_name}
                                                                        </CCardText>
                                                                    </CCardBody>
                                                                </CCard>
                                                            </CCol>
                                                        </CRow>

                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            ) : (
                                                null
                                            )


                                        ))}



                                    </CRow>
                                </CCard>
                            ) : (
                                null
                            )}

                            {partidas.length > 0 ? (
                                <CCard className={`border-dark `}   style={{ backgroundColor: 'transparent' }}>
                                    <CCardHeader>
                                        <strong>Bundesliga</strong>
                                    </CCardHeader>
                                    <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }} className='mt-2 mb-3'>

                                        {partidas.map((p, index) => (
                                            p.league_id == 7809 ? (<CCol xs>
                                                <CCard
                                                    // className={`border-secondary `}
                                                    className={` border-top-dark border-top-3`}
                                                    key={index}
                                                
                                                >
                                                    <CCardBody>
                                                        <CRow>
                                                            <CCol sm={5}>
                                                                <CCard className={` border-light `}>
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <CCardImage
                                                                            orientation="top"
                                                                            src='https://s.sde.globo.com/media/teams/2018/03/12/liverpool.svg'
                                                                            style={{ width: '60px', height: 'auto' }}
                                                                        />
                                                                    </div>
                                                                    <CCardBody>
                                                                        <CCardText>
                                                                            {p.home_team_api_id[0].team_long_name}
                                                                        </CCardText>
                                                                    </CCardBody>
                                                                </CCard>
                                                            </CCol>
                                                            <CCol sm={2}  >
                                                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40%' }}>
                                                                    <h3>X</h3>
                                                                </div>
                                                            </CCol>
                                                            <CCol sm={5}>
                                                                <CCard className={`border-light `} >
                                                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                        <CCardImage
                                                                            orientation="top"
                                                                            src='https://s.sde.globo.com/media/teams/2018/03/12/liverpool.svg'
                                                                            style={{ width: '60px', height: 'auto' }}
                                                                        />
                                                                    </div>
                                                                    <CCardBody>
                                                                        <CCardText>
                                                                            {p.away_team_api_id[0].team_long_name}
                                                                        </CCardText>
                                                                    </CCardBody>
                                                                </CCard>
                                                            </CCol>
                                                        </CRow>

                                                    </CCardBody>
                                                </CCard>
                                            </CCol>
                                            ) : (
                                                null
                                            )


                                        ))}



                                    </CRow>
                                </CCard>
                            ) : (
                                null
                            )}

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>

    )
}
export default Tabela
