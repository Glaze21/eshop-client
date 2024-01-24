import getCurrencySign from '../../util/currencies';
import { Link } from 'react-router-dom';
import getPriceAmount from '../../util/amounts';
import MinicartItem from './MinicartItem';

import { Container, List, Total, TopContainer, ButtonContainer } from './MinicartPopUpMenu.elements';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const MinicartPopUpMenu = ({ onItemClick }) => {
    const dispatch = useAppDispatch();
    const { cart, total, activeCurrency } = useAppSelector((state) => state.app);

    const handleAmount = (item, increase) => {
        if (increase) {
            //dispatch(addToCart(item));
        } else {
            //dispatch(removeFromCart(item));
        }
    };

    const handleClick = () => {
        onItemClick();
    };

    const setActiveAttribute = (item, name, value) => {
        let newItem = {
            ...item,
            selectedAttributes: { ...item.selectedAttributes, [name]: value },
        };
        //dispatch(changeAttribute(item, newItem));
    };

    return (
        <Container>
            <div>
                <TopContainer>
                    <div className="title-container">
                        <p className="my-bag">My Bag,</p> <p className="items">2 items</p>
                    </div>
                    <List>
                        {cart.map((item, key) => (
                            <MinicartItem
                                key={key}
                                item={item}
                                price={getCurrencySign(activeCurrency) + getPriceAmount(item.prices, activeCurrency)}
                                onHandleAmount={handleAmount}
                                onSetActiveAttribute={setActiveAttribute}
                            />
                        ))}
                    </List>
                    <div className="white-space" />
                    <Total>
                        <p className="text">Total</p>
                        <p className="amount">
                            {total.length !== 0 ? (
                                <>
                                    {getCurrencySign(activeCurrency) +
                                        Math.round((getPriceAmount(total, activeCurrency) + Number.EPSILON) * 100) / 100}
                                </>
                            ) : (
                                <>{getCurrencySign(activeCurrency) + 0}</>
                            )}
                        </p>
                    </Total>
                </TopContainer>
                <ButtonContainer>
                    <Link className="view-bag" to="/cart" onClick={handleClick}>
                        View bag
                    </Link>
                    <button className="check-out">Check out</button>
                </ButtonContainer>
            </div>
        </Container>
    );
};

export default MinicartPopUpMenu;
