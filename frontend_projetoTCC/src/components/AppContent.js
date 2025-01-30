import React, { Suspense, useContext  } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  CContainer, CSpinner, CCard,
  CCardBody,
  CCardText,
  CCardHeader,
  CCardTitle,
  CCardImage,
  CCardImageOverlay
} from '@coreui/react'

import { UserContext } from '../UserContext';

// routes config
import routes from '../routes'
import { color } from 'chart.js/helpers'


const AppContent = () => {
  const { userName } = useContext(UserContext);
  return (
    <CContainer
      //className="px-4"
      lg
      style={{
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      <div
        style={{
          // backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYJWbgEG_rEaq6C47iMWlPMlpGbrY3bDsR3g&s')`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          // backgroundRepeat: 'no-repeat',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1
        }}
      />
      <Suspense fallback={<CSpinner color="primary" />} >
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  //element={<route.element />}
                  element={
                    route.path === '/inicio' && !userName ? (
                      <Navigate to="/selecaoTime" replace />
                    ) : (
                      <route.element />
                    )
                  }
                />
              )
            )
          })}
          <Route path="/" element={<Navigate to="inicio" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
