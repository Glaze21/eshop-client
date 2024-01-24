import { List } from './Cart.elements';
import CartItem from './CartItem';
import getCurrencySign from '../../util/currencies';
import getPriceAmount from '../../util/amounts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Cart = () => {
    const dispatch = useAppDispatch();
    const { cart, activeCurrency } = useAppSelector((state) => state.app);

    //const handleAmount = (item, increase) =>
    //dispatch(increase ? addToCart(item) : removeFromCart(item));

    const setActiveAttribute = (item, name, value) => {
        let newItem = {
            ...item,
            selectedAttributes: { ...item.selectedAttributes, [name]: value },
        };
        // dispatch(changeAttribute(item, newItem));
    };

    return (
        <div>
            <p className="title">Cart</p>
            <List>
                {cart.map((item, key) => (
                    <CartItem
                        item={item}
                        key={key}
                        price={getCurrencySign(activeCurrency) + getPriceAmount(item.prices, activeCurrency)}
                        onHandleAmount={() => {}}
                        onSetActiveAttribute={setActiveAttribute}
                    />
                ))}
            </List>
        </div>
    );
};

export default Cart;
