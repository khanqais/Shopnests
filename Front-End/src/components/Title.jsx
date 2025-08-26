import React from 'react'

const Title = () => {
  const titleStyle = {
    width: '100%',
    padding: '20px 0'
  };

  const wrapperStyle = {
    display: 'flex',
    justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start',
    alignItems: 'center',
    marginLeft: window.innerWidth <= 768 ? '0' : 
                window.innerWidth <= 1024 ? '180px' : '265px',
    padding: '0 20px',
    textAlign: window.innerWidth <= 768 ? 'center' : 'left'
  };

  const textStyle = {
    fontWeight: '300',
    fontSize: window.innerWidth <= 320 ? '22px' :
              window.innerWidth <= 400 ? '24px' :
              window.innerWidth <= 576 ? '28px' :
              window.innerWidth <= 768 ? '32px' :
              window.innerWidth <= 1024 ? '36px' : '40px',
    margin: '0',
    color: '#333',
    letterSpacing: window.innerWidth <= 400 ? '0.2px' : '0.5px'
  };

  return (
    <div style={titleStyle}>
      <div style={wrapperStyle}>
        <p style={textStyle}>All Collection</p>
      </div>
    </div>
  )
}

export default Title
