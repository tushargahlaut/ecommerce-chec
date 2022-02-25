import {Paper,Stepper,Step,StepLabel,Typography,CircularProgress,Divider,Button} from "@material-ui/core"
import { mergeClasses } from "@material-ui/styles";
import { useEffect, useState } from "react";
import useStyles from "./styles";
import PaymentForm from "../PaymentForm";
import AddressForm from "../AddressForm";
import {commerce} from "../../../lib/commerce"


const steps = ["Shipping Address","Payment Details"]

const Confirmation = () => (
    <div>   
        Confirmation
    </div>
);

const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    const [checkoutToken,setCheckoutToken] = useState(null);
    useEffect(()=>{
        const generateToken = async () =>{
            try {
                const token = await commerce.checkout.generateToken(cart.id,{type:"cart"});
                setCheckoutToken(token);
                console.log(token);
            } catch (err) {
                
            }
        }
        generateToken();
    },[cart]);

    const classes = useStyles();
    const [shippingData,setShippingData] = useState([]);
    const [activeStep,setActiveStep] = useState(0);
    const next = (data) => {
        setShippingData(data);
        nextStep();
    }
    console.log(next);
    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next}/> : <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />
    const Confirmation = () => (
        <div>   
            Confirmation
        </div>
    );
 
    

    return ( 
        <>
        <div className={classes.toolbar}/>
        <main main className={classes.layout}> 
            <Paper className={classes.paper}>
            <Typography variant="h4" align="center" >Checkout</Typography>

            <Stepper activestep={0} className={classes.stepper}>
                    {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                    ))}     
            </Stepper>
            {activeStep === steps.length ? <Confirmation/> : checkoutToken && <Form/>} 

            </Paper>
        </main>

        </>
     );
}
 
export default Checkout; 