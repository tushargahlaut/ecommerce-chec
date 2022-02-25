import { Typography,Button,Card,CardActions,CardContent,CardMedia } from "@material-ui/core";
import useStyles from "./styles"
const CartItem = ({item,handleUpdateCartQty,handleRemoveFromCart}) => {
    const classes = useStyles();
    return (  
        <Card>
            <CardMedia image={item.image.url} alt={item.name} className={classes.media} ></CardMedia>
            <CardContent className={classes.cardContent}>
                <Typography variant="h4">{item.name}</Typography>
                <Typography variant="h5">{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button type="button" onClick={()=>handleUpdateCartQty(item.id,item.quantity-1)} size="small">-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type="button" onClick={()=>handleUpdateCartQty(item.id,item.quantity+1)} size="small">+</Button>
                </div>
                <Button onClick={()=>handleRemoveFromCart(item.id)} variant="contained" type="button" color="secondary"  >Remove</Button>
            </CardActions>
        </Card>
    );
}


 export default CartItem;