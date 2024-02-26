import { useState } from 'react'
import { Link } from 'react-router-dom'
// import Model from 'react-bootstrap/Modal'
import Modal from 'react-bootstrap/Modal'

import Button from 'react-bootstrap/Button'
// import userIcon from '../images/image.png'
import { FaRegUserCircle } from "react-icons/fa";
// import { FaUserCircle } from "react-icons/fa";

import { setToken } from '../utils/helpers/common'
import { registerUser, loginUser } from '../utils/actions/auth'

export default function Nav() {

  const toggleModal = () => {
    // Toggle the state to show/hide the register modal
    setModalShow((prevShow) => !prevShow)
  }

  // const navigate = useNavigate()

  // useEffect(() => {
  //   if (res?.status === 201) {
  //     setToken(res.data.token)
  //     navigate('/login')
  //   }
  // }, [res, navigate])

  const [show, setShow] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [loginModalShow, setLoginModalShow] = useState(false)

  const [registerData, setRegisterData] = useState(
    {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    })

  const [loginData, setLoginData] = useState(
    {
      email: '',
      password: '',
    })

  function handleChange(e) {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  function handleLoginChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  async function submitRegistration(e) {
    e.preventDefault()
    const res = await registerUser(registerData)
    console.log(res)
    if (res.status === 201) {
      console.log('REGISTRATION SUCCESSFUL')
      setModalShow(false)
      setLoginModalShow(true)
    }
  }

  async function submitLogin(e) {
    e.preventDefault()
    const res = await loginUser(loginData)
    console.log(res)
    if (res.status === 202) {
      console.log('LOGIN SUCCESSFUL')
      setLoginModalShow(false)
      setToken(res.data.token)
    }
  }

  return (
    <>
      <div className='navbar'>
        <div className="header-title">
          <h1><Link to='/'>Vinous Voyages</Link></h1>
        </div>
        <div className="header-menues">
          <header className='p-2 p-md-3 p-lg-4'>
            <button className='nav-toggle' onClick={() => setShow(true)} >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </header>

          <Modal show={show} fullscreen={true} onHide={() => setShow(false)} className='indexs'>
            <Modal.Header closeButton>
            </Modal.Header>
            <nav onClick={() => setShow(false)}>
              <ul className=' burger-menu nav nav-underline navbar-link-danger bg-link-danger'>
                <li className='nav-item'>
                  <Link to='/' className='nav-link' >Home</Link>&nbsp;
                </li>
                <li className='nav-item'>
                  <Link to='/wineryIndex' className='nav-link' >Winery Index</Link>&nbsp;
                </li>
                <li className='nav-item'>
                  <Link to='/wineryIndex/create' className='nav-link' >Create Winery</Link>&nbsp;
                </li>
                <li className='nav-item'>
                  <Link to='/profile' className='nav-link' >profile</Link>&nbsp;
                </li>
              </ul>
            </nav>
          </Modal>
          <Button className="icon" onClick={toggleModal}>
            <FaRegUserCircle fill="black" className="user-icon"/>
            {/* <img className='logo rounded-circle d-inline-block align-center' src={userIcon} height='50' alt='user icon' /> */}
          </Button>
        </div>

        <Modal show={modalShow} halfscreen={true} onHide={() => setModalShow(false)} className='centered-modal'>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <form className='create'>
              <h1 className='text-center'>sign-up</h1>
              <input type='text' name='username' placeholder='Username...' onChange={handleChange} />
              <input type='email' name='email' placeholder='Email...' onChange={handleChange} />
              <input type='password' name='password' placeholder='Password...' onChange={handleChange} />
              <input type='password' name='passwordConfirmation' placeholder='confirm password...' onChange={handleChange} />
              <button className='btn btn-danger' type='submit' onClick={submitRegistration}>Register</button>
              {/* Below will return a message to user if username taken, etc. Need to set this up. */}
              {/* {res && <p className='danger'>{res.data.message}</p>} */}
              <div className='sign in'>
                Already have an account ?  &nbsp;
                <button type="button" className="btn btn-danger" onClick={() => {
                  setModalShow(false) // Close signup modal if open
                  setLoginModalShow(true) // Open login modal
                }}>
                  log-in
                </button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={loginModalShow} halfscreen={true} onHide={() => setLoginModalShow(false)} className='centered-modal'>
          <Modal.Header closeButton>

          </Modal.Header>
          <Modal.Body>
            <form className='log_in'>
              <h1 className='text-center bold display-3 mb-4'>Login</h1>
              <input type='email' name='email' placeholder='Email...' onChange={handleLoginChange} />
              <input type='password' name='password' placeholder='Password...' onChange={handleLoginChange} />
              <button className='btn btn-danger' type='submit' onClick={submitLogin}>Login</button>
              {/* Add message on server side to inform  visitor to login if haven't or other errors?*/}
              {/* {res?.data?.message && <p className='danger bold mt-4'>{res.data.message}</p>} */}
              <button type="button" className="btn btn-danger" onClick={() => {
                setModalShow(true)
                setLoginModalShow(false)
              }}>
                sign up
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}