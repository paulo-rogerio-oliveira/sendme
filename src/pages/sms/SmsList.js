import React, { useEffect,  useState } from 'react';
import { Button, Table} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { smsService } from '../../services/smsService';
import ValidationMessage from '../../components/validation/ValidationMessage';
import { useAuth } from '../../hooks/useAuth';



const SmsList = ()=>{

    const URL= process.env.REACT_APP_API;
    const[modelList, setModelList] = useState([]);
    const navigate = useNavigate();
    const {loading} = useAuth();
    const [errors, setErrors] = useState({});
    const service = smsService();

    useEffect(()=>{

       LoadModels();

    },[]);

    const LoadModels = async ()=>{

       const result = await service.listSmsConfiguration();
       
       if (!result.errors) {
            setModelList(result);
       } else{
          
            setErrors(result.errors);
            console.log(errors);
       }
       


    }

    const RemoveItem = async (itemID)=>{
        console.log(URL);

        await service.removeSmsConfiguration(itemID);
        const newList = modelList.filter( value=> value.id !== itemID)
        setModelList(newList);
     
    }
    


    return (
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-10'>
                <h2>Your sms configurations</h2>
                <ValidationMessage collection={errors} hasError={errors} property="general" />
            </div>
        
        </div>
        
        <div className='row'>
            {loading&&<p>Loading data...</p>}

            <Table hover bordered dark>
                    <thead>
                        <tr>
                        <th>Application name</th>
                        <th>Application provider</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            modelList && modelList.map( (item) => (
                                
                                <tr key={item.id}> 
                                    {console.log(item)}
                                    <td> {item.applicationName} </td>
                                    <td> {item.providerName} </td>
                                    <td>
                                            <div className='row justify-content-around'>
                                                <div className='col-4'>
                                                    <Button onClick={ ()=>{ let itemID =`${item.id}`; RemoveItem(itemID);  }  } >Remove</Button> 
                                                </div>
                                                <div className='col-4'>
                                                    <Button onClick={ ()=> navigate(`/sms/edit/${item.id}`)}> Edit </Button>
                                                </div>
                                            
                                            </div>



                                    </td>
                                </tr>      

                            ))

                        }
                    </tbody>
            </Table>
            <div  className='row justify-content-end'>
                
                <div className='col-1'>
                    <Button   onClick= {()=> navigate(`/sms/add`)} >Add</Button>
                </div>
        
                <div className='col-1'>
                    <Button   onClick= {()=> LoadModels()} >refresh</Button>
                </div>
                        
            </div>    

        </div>
            </div>
    );
}

export default SmsList;