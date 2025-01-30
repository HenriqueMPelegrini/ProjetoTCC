import React, { useEffect, useMemo, useState, useContext } from 'react';
import {
    CCard,
    CCardBody,
    CCardText,
    CCardHeader,
    CCardTitle,
    CCardImage,
    CCardImageOverlay,
    CCardGroup,
    CCol,
    CRow,
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
    CListGroup,
    CListGroupItem,
    CFormSelect,
    CFormInput,
    CForm,
    CFormRange,
    CFormText,
    CButton,
    CContainer,
    CWidgetStatsF,
    CButtonGroup,
    CButtonToolbar,
    CProgress,
    CProgressBar,
    CSpinner
} from '@coreui/react'
import { CAvatar } from '@coreui/react'
import { CChart } from '@coreui/react-chartjs'
import { DocsExample } from 'src/components'
import inicioService from '../../../src/services/serviceInicio';
import imgCampo from '../../../../imagensTCC/campo.jfif';

import CIcon from '@coreui/icons-react'
import { cilChartPie } from '@coreui/icons'
import { UserContext } from '../../UserContext';

const Inicio = () => {
    const { userName } = useContext(UserContext);
    const [timeAdversario, setTimeAdversario] = useState(null)
    const [nometimeAdversario, setNomeTimeAdversario] = useState([])

    const [partida, setPartida] = useState([])
    const [setorAdver, setsetorAdver] = useState([])
    const [setorTime, setsetorTime] = useState([])
    const [rodada, setRodada] = useState(25);
    const [meuTime, setMeuTime] = useState([])
    const [respostaTreino, setRespostaTreino] = useState([])

    const [tatica, setTatica] = useState({
        "buildUpPlayPassing": 50,
        "buildUpPlayPassingClass": "Mixed",
        "buildUpPlayPositioningClass": "Organised",
        "buildUpPlaySpeed": 50,
        "buildUpPlaySpeedClass": "Balanced",
        "chanceCreationCrossing": 50,
        "chanceCreationCrossingClass": "Normal",
        "chanceCreationPassing": 50,
        "chanceCreationPassingClass": "Normal",
        "chanceCreationPositioningClass": "Free Form",
        "chanceCreationShooting": 50,
        "chanceCreationShootingClass": "Normal",
        "defenceAggression": 50,
        "defenceAggressionClass": "Press",
        "defenceDefenderLineClass": "Cover",
        "defencePressure": 50,
        "defencePressureClass": "Medium",
        "defenceTeamWidth": 50,
        "defenceTeamWidthClass": "Normal",
    })
    const [players, setPlayers] = useState([])
    const [dadosGrafico, setDadosGrafico] = useState({
        "derrota": "50",
        "empate": "50",
        "vitoria": "50",
    })
    const [provavelTatics, setProvTatics] = useState({})
    useEffect(() => {
        console.log(userName)
        const fetchTimeID = async () => { // carragar jogadores
            try {
               
                const time = await inicioService.buscarTimeID(userName)
                //console.log(part)
                setMeuTime(time)

            } catch (error) {
                console.error(error);
            }
        };
        fetchTimeID();
        const fetchTimeAdvID = async () => { // carragar jogadores
            try {
               
                const time = await inicioService.buscarTimeID(timeAdversario)
                //console.log(part)
                setNomeTimeAdversario(time)

            } catch (error) {
                console.error(error);
            }
        };
        fetchTimeAdvID()
        const fetchPartida = async () => {
            try {
                const part = await inicioService.buscarJogo(userName, rodada, "2015/2016")
                //console.log(part)
                setPartida(part)
                if (userName != part[0].home_team_api_id) {
                    setTimeAdversario(part[0].home_team_api_id);
                } else {
                    setTimeAdversario(part[0].away_team_api_id);
                }
                //console.log(partida)
            } catch (error) {
                console.error(error);
            }
        };
        fetchPartida();
        const fetchCaracterisca = async () => { // carragar caracterisca por setor do advesario
            try {
                const caracteristicas = await inicioService.buscarCaracteristicaAdversario(userName, rodada, "2015/2016")
                //console.log(part)
                setsetorAdver(caracteristicas)
                console.log(setorAdver)
            } catch (error) {
                console.error(error);
            }
        };
        fetchCaracterisca();

        const fetchPlayers = async () => { // carragar jogadores
            try {
                const player = await inicioService.buscarJogadores(userName, "2015/2016")
                //console.log(part)
                setPlayers(player)

            } catch (error) {
                console.error(error);
            }
        };
        fetchPlayers();

        const fetchProvTaticas = async () => { // carragar jogadores
            try {
                console.log(timeAdversario)
                const provTatics = await inicioService.buscarProvavelTatica(timeAdversario)
                //console.log(part)
                setProvTatics(provTatics)

            } catch (error) {
                console.error(error);
            }
        };
        fetchProvTaticas();
        const fetchTreinarMLP = async () => { // carragar jogadores
            try {
                const treino = await inicioService.treinarMLP({})
                console.log(treino)
                setRespostaTreino(treino)
            } catch (error) {
                console.error(error);
            }
        };
        fetchTreinarMLP();
    }, [timeAdversario,rodada])

    const manipularMudanca = (evento) => {
        const { name, value } = evento.target;
        // console.log(name)
        //console.log(value)
        setTatica({ ...tatica, [name]: value });
        console.log(provavelTatics)
    }

    const cadastrarTaticas = async () => {
        console.log("ENVIOU")
        const dadosML = await inicioService.cadastrarTatica(tatica)
        console.log(dadosML)
        setDadosGrafico(dadosML)
    }

    const setorData = setorAdver[0] || {};
    const setorDataTime = setorTime[0] || {};

    const translations = {
        crossing: "Cruzamento",
        finishing: "Finalização",
        heading_accuracy: "Precisão de Cabeceio",
        short_passing: "Passe Curto",
        volleys: "Voleios",
        dribbling: "Drible",
        curve: "Curva",
        free_kick_accuracy: "Precisão de Faltas",
        long_passing: "Passe Longo",
        ball_control: "Controle de Bola",
        acceleration: "Aceleração",
        sprint_speed: "Velocidade Final",
        agility: "Agilidade",
        reactions: "Reações",
        balance: "Equilíbrio",
        shot_power: "Força do Chute",
        jumping: "Impulsão",
        stamina: "Fôlego",
        strength: "Força",
        long_shots: "Chutes de Longa Distância",
        aggression: "Agressão",
        interceptions: "Intercepções",
        positioning: "Posicionamento",
        vision: "Visão",
        penalties: "Pênaltis",
        marking: "Marcação",
        standing_tackle: "Desarme em Pé",
        sliding_tackle: "Carrinho",
        gk_diving: "Mergulho do Goleiro",
        gk_handling: "Manuseio do Goleiro",
        gk_kicking: "Chute do Goleiro",
        gk_positioning: "Posicionamento do Goleiro",
        gk_reflexes: "Reflexos do Goleiro"
    };


    // Arrastar e soltar jogadores
    const [avatarLabels, setAvatarLabels] = useState(Array(12).fill(''));

    // const players = [
    //     { id: 1, name: 'Player 1' },
    //     { id: 2, name: 'Player 2' },
    //     { id: 3, name: 'Player 3' },
    //     // Adicione mais jogadores conforme necessário
    // ];

    const handleDragStart = (e, playerName) => {
        e.dataTransfer.setData('playerName', playerName);
    };

    const handleDrop = (e, index) => {
        const playerName = e.dataTransfer.getData('playerName');
        const newAvatarLabels = [...avatarLabels];
        newAvatarLabels[index] = playerName;
        setAvatarLabels(newAvatarLabels);
        // console.log(avatarLabels)

    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessário para permitir o drop
    };

    const calcularCaractresticas = () => { // calcular caracteristicas do seu time
        let retorno = [
            { setorDefensivo: 0, setorMeio: 0, setorOfensivo: 0, }
        ]
        let setorDef = {}
        let setorMei = {}
        let setorAta = {}
        for (let i = 0; i < avatarLabels.length; i++) {
            let aux = players[avatarLabels[i]]
            console.log(avatarLabels)
            if (aux) {
                if (i <= 4) {
                    if (Object.keys(setorDef).length === 0)
                        setorDef = { ...aux }
                    else
                        for (const stat in aux) {
                            //console.log(`${stat}: ${player[stat]}`);
                            setorDef[stat] += aux[stat]
                        }
                } else if (i >= 5 && i < 8) {
                    if (Object.keys(setorMei).length === 0)
                        setorMei = { ...aux }
                    else
                        for (const stat in aux) {
                            //console.log(`${stat}: ${player[stat]}`);
                            setorMei[stat] += aux[stat]
                        }
                } else if (i >= 9) {
                    if (Object.keys(setorAta).length === 0)
                        setorAta = { ...aux }
                    else
                        for (const stat in aux) {
                            //console.log(`${stat}: ${player[stat]}`);
                            setorAta[stat] += aux[stat]
                        }
                }
            }

            //console.log(setorMei)
            const top5SetorDef = getTop5InSetor(setorDef, 4);
            const top5SetorMei = getTop5InSetor(setorMei, 3);
            const top5SetorAta = getTop5InSetor(setorAta, 3);
            retorno[0].setorDefensivo = top5SetorDef
            retorno[0].setorMeio = top5SetorMei
            retorno[0].setorOfensivo = top5SetorAta
            console.log(retorno[0])
            setsetorTime(retorno[0])
        }


    }

    // Função para encontrar o maior valor de cada jogador e ordenar
    function getTop5InSetor(setor, qtddPos) {
        // Verifica se o setor é um objeto válido
        if (!setor || Object.keys(setor).length === 0) {
            return []; // Retorna um array vazio se o setor for inválido
        }

        // Converter o objeto 'setor' em um array de pares [nome, valor]
        const setorArray = Object.entries(setor).map(([name, value]) => {
            return { name, maxStatValue: value };
        });

        // Ordenar o array com base no maior valor encontrado
        setorArray.sort((a, b) => b.maxStatValue - a.maxStatValue);
        // Pegar os 5 primeiros jogadores após a ordenação
        const top5 = setorArray.slice(0, 5);

        // Ajustar os valores dividindo por 4
        const adjustedTop5 = top5.map(player => ({
            name: player.name,
            maxStatValue: (player.maxStatValue / qtddPos).toFixed(2) // Dividir e limitar a 2 casas decimais
        }));
        return adjustedTop5;

        // // Pegar os 5 primeiros jogadores após a ordenação
        // return setorArray.slice(0, 5);
    }
    return (
        <CRow>
            {/* <div>
                <h1>Bem-vindo, {userName} e {timeAdversario} e{rodada}: {respostaTreino[0]} !</h1>
            </div>
            <div>
            {respostaTreino.length != 0 ? (<h1>{respostaTreino[0]}</h1>) : (<div style={{ textAlign: 'center' }}><CSpinner color="info" /></div>)}
            </div> */}
            <CCol xs={12}>
                <CCard   className='mt-2'style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', padding : '3px' }}>
                    <CCardBody style={{ backgroundColor: '#f8f9fa', borderRadius: '15px 15px 0 0' }}>
                        <CCardTitle style={{ fontSize: '2rem', fontWeight: 'bold', color: '#003366' }}>
                        {meuTime && meuTime.length > 0 ? meuTime[0].team_long_name : "Nenhum time encontrado"}
                        </CCardTitle>
                        <CCardText style={{ fontSize: '1.5rem', color: '#555' }}>
                           {/* Rodada e Ano: */}
                            <div style={{ marginTop: '20px' }}>
                                <CRow>
                                    <CCol>
                                        Rodada: 
                                        <select className="form-select" style={{ padding: '8px', borderRadius: '5px' }}   defaultValue="25"onChange={(e) => setRodada(e.target.value)}>
                                            {Array.from({ length: 38 }, (_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                   Rodada {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </CCol>
                                    <CCol>
                                        Temporada:
                                        <select  disabled className="form-select" style={{ padding: '8px', borderRadius: '5px' }}>
                                            <option value="2015/2016">2015/2016</option>
                                        </select>
                                    </CCol>
                                </CRow>
                            </div>
                        </CCardText>

                    </CCardBody>
                    {/* <CCardFooter style={{ textAlign: 'center', backgroundColor: '#003366', borderRadius: '0 0 15px 15px', color: '#fff' }}>
                    Time escolhido com sucesso!
                </CCardFooter> */}
                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className='mt-4'>
                    <CCardHeader as="h5">Confronto</CCardHeader>
                    <CCardBody>
                        <CRow>
                            {/* <CCol sm={6}>
                                <CCard className="mb-3">
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CCardImage
                                            orientation="top"
                                            src='https://s.sde.globo.com/media/teams/2018/03/12/liverpool.svg'
                                            style={{ width: '100px', height: 'auto' }}
                                        />
                                    </div>
                                    <CCardBody>
                                        <CCard>
                                            <CCardHeader as="h6">Escalação</CCardHeader>
                                            <CCardBody>
                                                <CListGroup className='text-center'>
                                                    {partida.length > 0 ? (
                                                        partida.map((p, index) => (
                                                            <React.Fragment key={index}>
                                                                <CListGroupItem><strong>{p.home_player_1[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_2[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_3[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_4[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_5[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_6[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_7[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_8[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_9[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_10[0].player_name}</strong> </CListGroupItem>
                                                                <CListGroupItem><strong>{p.home_player_11[0].player_name}</strong> </CListGroupItem>


                                                            </React.Fragment>
                                                        ))
                                                    ) : (
                                                        <CListGroupItem>No Player found</CListGroupItem>
                                                    )}
                                                </CListGroup>
                                            </CCardBody>
                                        </CCard>

                                    </CCardBody>
                                </CCard>
                            </CCol> */}
                            <CCol sm={6}>
                                <CCard className="mb-3" style={{ border: 'none', boxShadow: 'none' }}>
                                    {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CCardImage
                                            orientation="top"
                                            src='https://upload.wikimedia.org/wikipedia/pt/0/01/Sunderland_AFC.png'

                                            style={{ width: '100px', height: '132px' }}
                                        />
                                    </div> */}
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <CCardTitle style={{ fontSize: '2rem', fontWeight: 'bold', color: '#003366' }}>
                                            {nometimeAdversario && nometimeAdversario.length > 0 ? nometimeAdversario[0].team_long_name : "Nenhum time encontrado"}
                                        </CCardTitle>
                                    </div>
                                    <CCardBody>
                                        <CCard>
                                            <CCardHeader as="h6">Escalação</CCardHeader>
                                            <CCardBody>
                                                <CListGroup className='text-center'>
                                                    {partida.length > 0 ? (
                                                        partida.map((p, index) => (
                                                            p.away_team_api_id != userName ? (
                                                                <React.Fragment key={index}>
                                                                    <CListGroupItem><strong>{p.away_player_1[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_2[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_3[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_4[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_5[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_6[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_7[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_8[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_9[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_10[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.away_player_11[0].player_name}</strong> </CListGroupItem>


                                                                </React.Fragment>
                                                            ) : (
                                                                <React.Fragment key={index}>
                                                                    <CListGroupItem><strong>{p.home_player_1[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_2[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_3[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_4[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_5[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_6[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_7[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_8[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_9[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_10[0].player_name}</strong> </CListGroupItem>
                                                                    <CListGroupItem><strong>{p.home_player_11[0].player_name}</strong> </CListGroupItem>


                                                                </React.Fragment>
                                                            )
                                                        ))
                                                    ) : (
                                                        <CListGroupItem>No Player found</CListGroupItem>
                                                    )}
                                                </CListGroup>
                                            </CCardBody>
                                        </CCard>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol sm={6}>
                                <CCard className="mb-3" style={{ border: 'none', boxShadow: 'none' }}>
                                    <CCardBody>
                                        <CCard className='mb-3' style={{ border: 'none', boxShadow: 'none' }}>
                                            <CCardHeader as="h6">Setor de Defesa</CCardHeader>
                                            <CCardBody>
                                                <div>
                                                    {setorAdver.length != 0 ? (Object.entries(setorData).map(([setor, valores]) => (
                                                        (setor == 'setorDefensivo') ?
                                                            (<div key={setor}>
                                                                {/* <h3>{setor}</h3> */}
                                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                                    {Object.entries(valores).map(([key, value]) => (
                                                                        <li key={key}>
                                                                            {/* <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[key] || key}:
                                                                            </span>
                                                                            <span style={{ marginLeft: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                                                                                {value}
                                                                            </span> */}
                                                                            <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[key] || key}:
                                                                            </span>

                                                                            <CProgress color="info" value={value}>
                                                                                <CProgressBar >{value}</CProgressBar>
                                                                            </CProgress>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>) : null

                                                    ))) : (<div style={{ textAlign: 'center' }}><CSpinner color="info" /></div>)}
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                        <CCard className='mb-3' style={{ border: 'none', boxShadow: 'none' }}>
                                            <CCardHeader as="h6">Setor de Meio Campo</CCardHeader>
                                            <CCardBody>
                                                <div>
                                                    {setorAdver.length != 0 ? (Object.entries(setorData).map(([setor, valores]) => (
                                                        (setor == 'setorMeio') ?
                                                            (<div key={setor}>
                                                                {/* <h3>{setor}</h3> */}
                                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                                    {Object.entries(valores).map(([key, value]) => (
                                                                        <li key={key}>
                                                                            {/* <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[key] || key}:
                                                                            </span>
                                                                            <span style={{ marginLeft: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                                                                                {value}
                                                                            </span> */}
                                                                            <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[key] || key}:
                                                                            </span>

                                                                            <CProgress color="info" value={value}>
                                                                                <CProgressBar >{value}</CProgressBar>
                                                                            </CProgress>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>) : null

                                                    ))) : (<div style={{ textAlign: 'center' }}><CSpinner color="info" /></div>)}
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                        <CCard style={{ border: 'none', boxShadow: 'none' }}>
                                            <CCardHeader as="h6">Setor de Ataque</CCardHeader>
                                            <CCardBody>
                                                <div>
                                                    {setorAdver.length != 0 ? (Object.entries(setorData).map(([setor, valores]) => (
                                                        (setor == 'setorOfensivo') ?
                                                            (<div key={setor}>
                                                                {/* <h3>{setor}</h3> */}
                                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                                    {Object.entries(valores).map(([key, value]) => (
                                                                        <li key={key}>
                                                                            {/* <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[key] || key}:
                                                                            </span>
                                                                            <span style={{ marginLeft: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                                                                                {value}
                                                                            </span> */}
                                                                            <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[key] || key}:
                                                                            </span>

                                                                            <CProgress color="info" value={value}>
                                                                                <CProgressBar >{value}</CProgressBar>
                                                                            </CProgress>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>) : null

                                                    ))) : (<div style={{ textAlign: 'center' }}><CSpinner color="info" /></div>)}
                                                </div>
                                            </CCardBody>
                                        </CCard>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className='mt-4' >
                    <CCardHeader as="h5">Escalação</CCardHeader>
                    <CCol xs={12}>
                        <CCard className="text-center">
                            <CCardHeader as="h6">Jogadores</CCardHeader>
                            <CCardBody>
                                <CContainer>
                                    <CRow xxl={{ cols: 11 }}>

                                        {/* Display Players */}

                                        {players.length != 0 ? (Object.keys(players).map((player, index) => (
                                            <CCol key={index} className="d-flex justify-content-around ">


                                                <div

                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, player)}
                                                    style={{ backgroundColor: 'white', cursor: 'pointer' }}
                                                >
                                                    {/* <CAvatar color="primary" size="xl">{player}</CAvatar> */}
                                                    <CButtonToolbar className="justify-content-between" role="group" aria-label="Toolbar with button groups">

                                                        <CButton color="secondary" variant="outline" disabled style={{ width: '90px', height: '85px' }}>{player}</CButton>


                                                    </CButtonToolbar>
                                                </div>
                                            </CCol>
                                        ))) : (<div style={{ textAlign: 'center' }}><CSpinner color="info" /></div>)}

                                    </CRow>
                                </CContainer>
                            </CCardBody>

                        </CCard>
                    </CCol>
                    <CCol xs={12}>
                        <CCard className="mb-3 bg-dark text-white">
                            <CCardImage src={imgCampo}
                                style={{ width: 'auto', height: '500px' }}
                            />
                            <CCardImageOverlay>


                                <CRow className='mt-5'>
                                    {/* <CAvatar color="primary" size="xl">CUI</CAvatar> */}
                                    {Array.from({ length: 4 }).map((_, rowIndex) => (
                                        <CRow key={rowIndex} className="">
                                            {/* {Array.from({ length: 3 }).map((_, colIndex) => (
                                                <CCol key={colIndex} xs={4} className="d-flex justify-content-center">
                                                    <CAvatar color="primary" size="xl">CUI</CAvatar>
                                                </CCol>
                                                
                                            ))} */}

                                            {/* GOLEIRO */}
                                            {(rowIndex == 1) ? (
                                                <CCol xs={2} className="d-flex justify-content-center">
                                                    {/* <CAvatar color="primary" size="xl">GOL</CAvatar> */}
                                                </CCol>
                                            ) : <CCol xs={2} className="d-flex justify-content-center"></CCol>

                                            }
                                            {/* DEFESA */}
                                            {(rowIndex < 4) ? (
                                                // <CCol xs={3} className="d-flex justify-content-center" >
                                                //     <CAvatar color="primary" size="xl">DEF</CAvatar>
                                                // </CCol>
                                                <CCol
                                                    xs={3}
                                                    className="d-flex justify-content-center"
                                                    onDrop={(e) => handleDrop(e, rowIndex + 1)}
                                                    onDragOver={handleDragOver}

                                                >
                                                    <CAvatar color="primary" size="xl">{avatarLabels[rowIndex + 1]}</CAvatar>

                                                </CCol>
                                            ) : <CCol xs={3} className="d-flex justify-content-center"></CCol>

                                            }
                                            {/* MEIO */}
                                            {(rowIndex < 3) ? (
                                                // <CCol xs={2} className="d-flex justify-content-center mt-5">
                                                //     <CAvatar color="primary" size="xl">MEI</CAvatar>
                                                // </CCol>
                                                <CCol
                                                    xs={2}
                                                    className="d-flex justify-content-center mt-5"
                                                    onDrop={(e) => handleDrop(e, rowIndex + 5)}
                                                    onDragOver={handleDragOver}
                                                >
                                                    <CAvatar color="primary" size="xl">{avatarLabels[rowIndex + 5]}</CAvatar>
                                                </CCol>
                                            ) : <CCol xs={2} className="d-flex justify-content-center"></CCol>
                                            }
                                            {/* ATAQUE */}
                                            {(rowIndex < 3) ? (
                                                // <CCol xs={4} className="d-flex justify-content-center mt-5 ">
                                                //     <CAvatar color="primary" size="xl">ATA</CAvatar>
                                                // </CCol>
                                                <CCol
                                                    xs={4}
                                                    className="d-flex justify-content-center mt-5"
                                                    onDrop={(e) => handleDrop(e, rowIndex + 9)}
                                                    onDragOver={handleDragOver}
                                                >
                                                    <CAvatar color="primary" size="xl">{avatarLabels[rowIndex + 9]}</CAvatar>
                                                </CCol>
                                            ) : null
                                            }
                                        </CRow>
                                    ))}
                                </CRow>

                            </CCardImageOverlay>
                        </CCard>
                    </CCol>
                    <CCol xs={12}>
                        <CCard className="text-center">
                            <CCardHeader as="h6">Caracteristicas dos Jogadores</CCardHeader>
                            <CCardBody>
                                <CRow>
                                    <CCol sm={4}>
                                        <CCard style={{ border: 'none', boxShadow: 'none' }}>
                                            <CCardHeader as="h6">Setor de Defesa</CCardHeader>
                                            <CCardBody>
                                                {/* <CCardTitle style={{fontSize: '22px',  fontWeight: 'bold', color: '#003366'}}>Setor de Defesa</CCardTitle> */}
                                                <div>
                                                    {Object.entries(setorTime).map(([setor, valores]) => (
                                                        setor === 'setorDefensivo' ? ( // Verifica se 'valores' é um array
                                                            // <h2>{setor}</h2>
                                                            <div key={setor}>
                                                                {/* <h3 sty={{ color: '#003366', fontSize: '20px' }}>Setor Defensivo</h3> */}
                                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                                    {valores.map((item, index) => (
                                                                        <li key={index} style={{ marginBottom: '10px' }}>
                                                                            <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[item.name] || item.name}:
                                                                            </span>
                                                                            {/* <span style={{ marginLeft: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                                                                                {item.maxStatValue}
                                                                            </span> */}
                                                                            <CProgress color="info" value={item.maxStatValue}>
                                                                                <CProgressBar >{item.maxStatValue}</CProgressBar>
                                                                            </CProgress>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : null
                                                    ))}
                                                </div>


                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    <CCol sm={4}>
                                        <CCard style={{ border: 'none', boxShadow: 'none' }}>
                                            <CCardHeader as="h6">Setor de Meio Campo</CCardHeader>
                                            <CCardBody>
                                                <div>
                                                    {Object.entries(setorTime).map(([setor, valores]) => (
                                                        setor === 'setorMeio' ? ( // Verifica se 'valores' é um array
                                                            // <h2>{setor}</h2>
                                                            <div key={setor}>
                                                                {/* <h3 sty={{ color: '#003366', fontSize: '20px' }}>Setor Defensivo</h3> */}
                                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                                    {valores.map((item, index) => (
                                                                        <li key={index} style={{ marginBottom: '10px' }}>
                                                                            <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[item.name] || item.name}:
                                                                            </span>
                                                                            {/* <span style={{ marginLeft: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                                                                                {item.maxStatValue}
                                                                            </span> */}
                                                                            <CProgress color="info" value={item.maxStatValue}>
                                                                                <CProgressBar >{item.maxStatValue}</CProgressBar>
                                                                            </CProgress>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : null
                                                    ))}
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    <CCol sm={4} >
                                        <CCard style={{ border: 'none', boxShadow: 'none' }} >
                                            <CCardHeader as="h6" >Setor de Ataque</CCardHeader>
                                            <CCardBody>
                                                <div>
                                                    {Object.entries(setorTime).map(([setor, valores]) => (
                                                        setor === 'setorOfensivo' ? ( // Verifica se 'valores' é um array
                                                            // <h2>{setor}</h2>
                                                            <div key={setor}>
                                                                {/* <h3 sty={{ color: '#003366', fontSize: '20px' }}>Setor Defensivo</h3> */}
                                                                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                                                                    {valores.map((item, index) => (
                                                                        <li key={index} style={{ marginBottom: '10px' }}>
                                                                            <span style={{ fontWeight: 'bold', color: '#003366', fontSize: '18px' }}>
                                                                                {translations[item.name] || item.name}:
                                                                            </span>
                                                                            {/* <span style={{ marginLeft: '15px', fontSize: '18px', fontWeight: 'bold' }}>
                                                                                {item.maxStatValue}
                                                                            </span> */}
                                                                            <CProgress color="info" value={item.maxStatValue}>
                                                                                <CProgressBar >{item.maxStatValue}</CProgressBar>
                                                                            </CProgress>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : null
                                                    ))}
                                                </div>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                    <hr></hr>
                                    <CCol sm={12}><CButton color="primary" variant="outline" onClick={calcularCaractresticas}>CALCULAR</CButton></CCol>

                                </CRow>
                            </CCardBody>

                        </CCard>
                    </CCol>

                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className='mt-4' >
                    <CCardHeader as="h5">Sugestão Tatica</CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol sm={4}>
                                <CCard>
                                    <CCardHeader as="h6">Chegada</CCardHeader>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Velocidade"
                                                    value={provavelTatics.buildUpPlaySpeed} />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Passe"
                                                    value={provavelTatics.buildUpPlayPassing} />
                                            </CCol>
                                        </CRow>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol sm={4}>
                                <CCard>
                                    <CCardHeader as="h6">Criação de Oportunidade</CCardHeader>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Passe"
                                                    value={provavelTatics.chanceCreationPassing} />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Cruzamento"
                                                    value={provavelTatics.chanceCreationCrossing} />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Finalização"
                                                    value={provavelTatics.chanceCreationShooting} />
                                            </CCol>
                                        </CRow>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                            <CCol sm={4}>
                                <CCard>
                                    <CCardHeader as="h6">Defesa</CCardHeader>
                                    <CCardBody>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Pressão"
                                                    value={provavelTatics.defencePressure} />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Agressividade"
                                                    value={provavelTatics.defenceAggression} />
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol xs={12}>
                                                <CWidgetStatsF
                                                    className="mb-3"
                                                    color="primary"
                                                    icon={<CIcon icon={cilChartPie} height={24} />}
                                                    title="Amplitude do Time"
                                                    value={provavelTatics.defencePressure} />
                                            </CCol>
                                        </CRow>

                                    </CCardBody>
                                </CCard>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className='mt-4'>
                    <CCardHeader as="h5">Taticas</CCardHeader>
                    <CCardBody>
                        <CCard className='mt-2'>
                            <CCardHeader as="h6">Chegada</CCardHeader>
                            <CCardBody>
                                <CForm className="row g-3">
                                    <CRow>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Velocidade"
                                                defaultValue='50'
                                                id='buildUpPlaySpeed'
                                                name='buildUpPlaySpeed'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.buildUpPlaySpeed}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Classe Velocidade"
                                                name='buildUpPlaySpeedClass'
                                                value={tatica.buildUpPlaySpeedClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Balanceado', value: 'Balanced' },
                                                    { label: 'Lento', value: 'Slow' },
                                                    { label: 'Rapido', value: 'Fast' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Passe"
                                                defaultValue='50'
                                                id='buildUpPlayPassing'
                                                name='buildUpPlayPassing'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.buildUpPlayPassing}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Classe Passe"
                                                name='buildUpPlayPassingClass'
                                                value={tatica.buildUpPlayPassingClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Normal', value: 'Mixed' },
                                                    { label: 'Curto', value: 'Short' },
                                                    { label: 'Longo', value: 'Long' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>

                                        <CCol md={12}>
                                            <CFormSelect id="inputState" label="Posicionamento"
                                                name='buildUpPlayPositioningClass'
                                                value={tatica.buildUpPlayPositioningClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Organizado', value: 'Organised' },
                                                    { label: 'Livre', value: 'Free Form' }

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                </CForm>

                            </CCardBody>
                        </CCard>

                        <CCard className='mt-2'>
                            <CCardHeader as="h6">Criação de Oportunidade</CCardHeader>
                            <CCardBody>
                                <CForm className="row g-3">
                                    <CRow>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Passe"
                                                defaultValue='50'
                                                id='chanceCreationPassing'
                                                name='chanceCreationPassing'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.chanceCreationPassing}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Estilo de Passe"
                                                name='chanceCreationPassingClass'
                                                value={tatica.chanceCreationPassingClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Normal', value: 'Normal' },
                                                    { label: 'Seguro', value: 'Safe' },
                                                    { label: 'Arriscado', value: 'Risky' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Cruzamentos"
                                                defaultValue='50'
                                                id='chanceCreationCrossing'
                                                name='chanceCreationCrossing'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.chanceCreationCrossing}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Estilo Cruzamentos"
                                                name='chanceCreationCrossingClass'
                                                value={tatica.chanceCreationCrossingClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Normal', value: 'Normal' },
                                                    { label: 'Poucos', value: 'Little' },
                                                    { label: 'Muitos', value: 'Lots' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Finalizações"
                                                defaultValue='50'
                                                id='chanceCreationShooting'
                                                name='chanceCreationShooting'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.chanceCreationShooting}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Estilo Finalizações"
                                                name='chanceCreationShootingClass'
                                                value={tatica.chanceCreationShootingClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Normal', value: 'Normal' },
                                                    { label: 'Poucas', value: 'Little' },
                                                    { label: 'Muitas', value: 'Lots' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>

                                        <CCol md={12}>
                                            <CFormSelect id="inputState" label="Posicionamento"
                                                name='chanceCreationPositioningClass'
                                                value={tatica.chanceCreationPositioningClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Organizado', value: 'Organised' },
                                                    { label: 'Livre', value: 'Free Form' }

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                </CForm>

                            </CCardBody>
                        </CCard>

                        <CCard className='mt-2'>
                            <CCardHeader as="h6">Defesa</CCardHeader>
                            <CCardBody>
                                <CForm className="row g-3">
                                    <CRow>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Pressão"
                                                defaultValue='50'
                                                id='defencePressure'
                                                name='defencePressure'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.defencePressure}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Estilo de Pressão"
                                                name='defencePressureClass'
                                                value={tatica.defencePressureClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Media', value: 'Medium' },
                                                    { label: 'Baixa', value: 'Deep' },
                                                    { label: 'Alta', value: 'High' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Agressividade"
                                                defaultValue='50'
                                                id='defenceAggression'
                                                name='defenceAggression'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.defenceAggression}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Estilo Agressividade"
                                                name='defenceAggressionClass'
                                                value={tatica.defenceAggressionClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Contra-Pressão', value: 'Contain' },
                                                    { label: 'Dupla', value: 'Double' },
                                                    { label: 'Pressão', value: 'Press' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>
                                        <CCol md={6}>
                                            < CFormRange min={0} max={100} step={1} label="Amplitude do Time"
                                                defaultValue='50'
                                                id='defenceTeamWidth'
                                                name='defenceTeamWidth'
                                                onChange={manipularMudanca} />
                                            <CFormText>{`Valor selecionado:${tatica.defenceTeamWidth}`}</CFormText>
                                        </CCol>
                                        <CCol md={6}>
                                            <CFormSelect id="inputState" label="Estilo de Amplitude"
                                                name='defenceTeamWidthClass'
                                                value={tatica.defenceTeamWidthClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Normal', value: 'Normal' },
                                                    { label: 'Fechada', value: 'Narrow' },
                                                    { label: 'Aberta', value: 'Wide' },

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                    <CRow className='mt-2'>

                                        <CCol md={12}>
                                            <CFormSelect id="inputState" label="Linha Defensiva"
                                                name='defenceDefenderLineClass'
                                                value={tatica.defenceDefenderLineClass}
                                                onChange={manipularMudanca}
                                                options={[
                                                    { label: 'Em linha', value: 'Offside Trap' },
                                                    { label: 'Cobertura', value: 'Cover' }

                                                ]}>
                                            </CFormSelect>
                                        </CCol>
                                    </CRow>
                                </CForm>

                            </CCardBody>
                        </CCard>
                        <div className="d-grid gap-2 col-6 mx-auto mt-4">
                        {respostaTreino.length != 0 ? (<CButton color="primary" onClick={cadastrarTaticas}>Testar</CButton>) 
                        : (<div style={{ textAlign: 'center' }}><CSpinner color="info" /><h3>Treinando Modelo...</h3></div>)}
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol xs={12}>
                <CCard className='mt-4'>
                    <CCardHeader as="h5">Resultados</CCardHeader>
                    <CCardBody>
                        <div style={{ width: '500px', height: '500px', margin: '0 auto' }}>
                            <CChart
                                type="doughnut"
                                data={{
                                    labels: ['Empate', 'Vitória', 'Derrota'],
                                    datasets: [
                                        {
                                            backgroundColor: ['#778899', '#00D8FF', '#DD1B16'],
                                            data: [dadosGrafico.empate, dadosGrafico.vitoria, dadosGrafico.derrota],
                                        },
                                    ],
                                }}
                            // options={{
                            //     plugins: {
                            //         legend: {
                            //             labels: {
                            //                 color: getStyle('--cui-body-color'),
                            //             }
                            //         }
                            //     },
                            // }}
                            />
                        </div>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Inicio
