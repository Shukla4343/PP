import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import backgroundImage from '../images/3.png';

function Contract(props) {
    const { id } = useParams();
    const [partner, setPartner] = useState({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const [contractGenerated, setContractGenerated] = useState(false);
    const [contractPdf, setContractPdf] = useState(null); // State to hold contract PDF URL


    useEffect(() => {
        axios.get(`http://localhost:3307/reads/${id}`)
            .then(res => {
                setPartner(res.data[0]);
            })
            .catch(err => console.log(err))
    }, [id]);

    const getMonthName = (monthNumber) => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        return months[monthNumber - 1]; // Adjust to 0-based index
    };
    // Extracting day, month, and year from selected date
    const currentDayName = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
    const currentDayOfMonth = selectedDate.getDate();
    const currentMonths = selectedDate.getMonth() + 1;
    const currentMonth = getMonthName(currentMonths);
    const currentYear = selectedDate.getFullYear();
   
// Function to handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleGenerateContract = async () => {
        const jsonData =
        {
            "current_day": selectedDate.toLocaleDateString('en-US', { weekday: 'long' }),
            "current_month": currentMonth,
            "current_year": selectedDate.getFullYear(),
            "contract_location": partner.city,
            "company_name": partner.company_name,
            "company_pan": partner.pan_number,
            "company_address": partner.address + ", " + partner.city + ", " + partner.state,
            "director_name": partner.name,
            "partner_city": partner.city,
            "partner_state": partner.state,
            "current_date": `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`,
            "commission": partner.commission
        };
        console.log(jsonData);
        try {
            const response = await axios.post('http://localhost:3307/api/generate-contract', {
                templateId: "6673f60a8192c533c6e91d5a",
                urlType: "url",
                jsonData: jsonData // Send constructed jsonData
            });
            console.log('Contract generated:', response.data.url);
            setContractPdf(response.data.url); 
            setContractGenerated(true);
            // console.log(contractPdf);
        } catch (error) {
            console.error('Error generating contract:', error);
            // Handle error, show error message to user
        }
    };

    const handleInitiateContract = async () => {
        if (!contractPdf) {
            console.error('PDF URL is not yet available');
            return;
        }
        const signerName = partner.name;
        const signatureType = "AADHAARESIGN-OTP";
      

        try {
            const response = await axios.post('http://localhost:3307/api/initiate-contract', 
                {
                    pdf: contractPdf,
                    contractName: "Indo Wings Channel Partner Contract",
                    contractExecuterName: partner.name,
                    successRedirectUrl:"https://partner.indowings.com/",
                    failureRedirectUrl:"https://www.indowings.com/contact.php",
                    callbackUrl:"https://partner.indowings.com/",
                    callbackUrlAuthorizationHeader:"Indo Wings",
                    signerdetail: [
                        {
                            signerName,
                            signatureType,
                            signatures: [
                                {
                                    pageNo: ["All"],
                                    signaturePosition: ["BOTTOMLEFT"]
                                }
                            ]
                        }
                    ],
                    signerCallbackUrl:"https://partner.indowings.com/",
                    customerMailList:[partner.username],
                    workflow: true
            });

            console.log('Contract initiated:', response.data);
            // console.log(response.data.signerdetail.esignUrl);
        } catch (error) {
            console.error('Error initiating contract:', error);
           
        }
        
      
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', width: '90%', maxWidth: '1200px' }}>
                <h3 className='text-center mb-4'>Partner Contract Details</h3>
                <table className="table table-bordered table-hover">
                    <tbody>
                        <tr>
                            <th className="text-center" style={{ width: '30%' }}>Attribute</th>
                            <th className="text-center">Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>{partner.id}</td>
                        </tr>
                        <tr>
                            <td>Company Email ID</td>
                            <td>{partner.username}</td>
                        </tr>
                        <tr>
                            <td>Company Name</td>
                            <td>{partner.company_name}</td>
                        </tr>
                        <tr>
                            <td>Company PAN Number</td>
                            <td>{partner.pan_number}</td>
                        </tr>
                        <tr>
                            <td>Company Address</td>
                            <td>{partner.address}, {partner.city}, {partner.state}</td>
                        </tr>
                        <tr>
                            <td>Partner City</td>
                            <td>{partner.city}</td>
                        </tr>
                        <tr>
                            <td>Partner State</td>
                            <td>{partner.state}</td>
                        </tr>
                        <tr>
                            <td>Director Name</td>
                            <td>{partner.name}</td>
                        </tr>
                        <tr>
                            <td>Select Date:  <DatePicker selected={selectedDate} onChange={handleDateChange} dateFormat="dd/MM/yyyy" className='form-control' /> </td>
                            <td>{`${currentDayOfMonth}/${currentMonth}/${currentYear}`}</td>
                        </tr>
                        <tr>
                            <td>Contract Signing Day</td>
                            <td>{currentDayName}</td>
                        </tr>

                        <tr>
                            <td>Current Month</td>
                            <td>{currentMonth}</td>
                        </tr>
                        <tr>
                            <td>Current Year</td>
                            <td>{currentYear}</td>
                        </tr>
                        <tr>
                            <td>Contract Location</td>
                            <td>{partner.city}</td>
                        </tr>
                        <tr>
                            <td>Commission</td>
                            <td>{partner.commission}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center">
            
                       

                    <Link to="/addpartner" className='btn btn-primary me-2'>Back</Link>
                    {/* <button className='btn btn-primary me-2' onClick={handleGenerateContract} > {contractGenerated ? 'Contract Generated' : 'Generate Contract'}</button> */}
                    {contractGenerated ? (
                            <React.Fragment>
                                <button className='btn btn-primary me-2' onClick={handleInitiateContract} >Initiate Contract</button>
                                
                            </React.Fragment>
                        ) : (
                            <button className='btn btn-primary me-2' onClick={handleGenerateContract}>Generate Contract</button>
                        )}
            
                </div>
            </div>
        </div>
    )
}

export default Contract;
