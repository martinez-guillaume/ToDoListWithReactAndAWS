import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () => {

  return (
    <MDBFooter className='text-center text-lg-start text-muted pt-24'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
        </div>
        <div>
          <a href='https://www.linkedin.com/in/guillaume-martinez-232602259/' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='https://github.com/martinez-guillaume' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
            <div className='flex items-baseline'>
            <MDBIcon icon="gem" />
              <h6 className='text-uppercase fw-bold mb-4 ml-2'>
                
                 To Do List
              </h6>
              </div>
              <p>
              Chaque jour, des utilisateurs organisent leur travail et leur quotidien avec To Do List.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Fonctionnalités</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Fonctionnalités
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Équipes
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Modèles
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Ressources</h6>
              <p>
                <a href='#!' className='text-reset'>
                Applications
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Centre d'aide
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Méthodes de productivité
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Intégrations
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>To Do List</h6>
              <p>
                 À propos
              </p>
              <p>
                
                Confidentialité
              </p>
              <p>
                 Sécurité
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4'>
        © To Do List inc  
        <a className='text-reset fw-bold pl-2' href='https://mdbootstrap.com/' >
         guillaume.m.developer@gmail.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;