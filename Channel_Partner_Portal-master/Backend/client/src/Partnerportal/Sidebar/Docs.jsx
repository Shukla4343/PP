import React from 'react';

function Docs() {
  const dummyData = [
    { partnerName: 'IndoWings Pvt. Ltd.', documentTitle: 'Complementary Terms 2023', documentLink: 'https://drive.google.com/drive/folders/1pkksmTWfrDPOAUUpdu5e9SS3czjJp2Gu?usp=sharing', accepted: true, askedDate: '2024-03-01', answeredDate: '2024-03-03' },
  ];

  const tableStyle = {
    borderCollapse: 'collapse',
    width: "100%", 
    margin: 'auto',
    backgroundColor: '#f5f5f5',
  };
  
  const thStyle = {
    backgroundColor: '#191b30',
    color: 'white',
    textAlign: 'left',
    padding: '29px',
    border: '1px solid #dddddd',
  };

  const tdStyle = {
    textAlign: 'left',
    padding: '20px',
    border: '1px solid #dddddd',
  };

  const handleLinkClick = (link) => {
    window.open(link, '_blank');
  };

  const buttonStyle = {
    backgroundColor: '#191b30',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  return (
    <div className="main-container">
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <h3 style={{ color: "white" }}>History of Documents</h3>
            </th>
          </tr>
        </thead>
      </table>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Partner Name</th>
            <th style={thStyle}>Document Title</th>
            <th style={thStyle}>Document Link</th>
            <th style={thStyle}>Accepted</th>
            <th style={thStyle}>Asked Date</th>
            <th style={thStyle}>Answered Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((data, index) => (
            <tr key={index}>
              <td style={tdStyle}>{data.partnerName}</td>
              <td style={tdStyle}>{data.documentTitle}</td>
              <td style={tdStyle}>
                <button style={buttonStyle} onClick={() => handleLinkClick(data.documentLink)}>Link</button>
              </td>
              <td style={tdStyle}>{data.accepted ? 'Yes' : 'No'}</td>
              <td style={tdStyle}>{data.askedDate}</td>
              <td style={tdStyle}>{data.answeredDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Docs;
