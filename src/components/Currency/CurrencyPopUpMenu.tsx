import { Container, List, ListItem } from './CurrencyPopUpMenu.elements';
import getCurrencySign from '../../util/currencies';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const CurrencyPopUpMenu = ({ onItemClick }) => {
    const dispatch = useAppDispatch();
    const currencies = useAppSelector((state: any) => state.root.currencies);

    const handleClick = (currency: string): void => {
        // dispatch(setCurrency(currency));
        onItemClick();
    };

    return (
        <Container>
            <List>
                {currencies.map((currency, key) => (
                    <ListItem key={key} onClick={() => handleClick(currency)}>
                        {getCurrencySign(currency) + ' ' + currency}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default CurrencyPopUpMenu;
