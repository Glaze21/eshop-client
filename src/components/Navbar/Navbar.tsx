import { useState, useRef, useEffect } from 'react';
import { Nav, NavBtn, NavMenu, NavLogo, CurrencyContainer, CartContainer, ModalBackdrop } from './Navbar.elements';
import { getAllCurrencies } from '../../redux/actions';
import CurrencyPopUpMenu from '../Currency/CurrencyPopUpMenu';
import MinicartPopUpMenu from '../Minicart/MinicartPopUpMenu';
import getCurrencySign from '../../util/currencies';
import getCartQuantity from '../../util/cartQuantity';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const Header = () => {
    const dispatch = useAppDispatch();
    const { categories, activeCategory, activeCurrency, cart } = useAppSelector((state) => state.app);

    const [currencyPopUpMenu, setCurrencyPopUpMenu] = useState(false);
    const [minicartPopUpMenu, setMinicartPopUpMenu] = useState(false);
    const backdropRef = useRef(null);

    useEffect(() => {
        dispatch(getAllCurrencies());
        //dispatch(setAllCategories());
    }, [dispatch]);

    const toggleCurrencyPopUpMenu = () => {
        setCurrencyPopUpMenu(!currencyPopUpMenu);
    };

    const toggleMinicartPopUpMenu = () => {
        const element = backdropRef.current;
        element.style.display = minicartPopUpMenu ? 'none' : 'block';
        setMinicartPopUpMenu(!minicartPopUpMenu);
    };

    const handleChangeCategory = (category) => {
        //dispatch(setCategory(category));
    };

    return (
        <Nav>
            <div className="backdrop" ref={backdropRef} />
            <div>
                <NavMenu>
                    {categories &&
                        categories.map((category, key) => (
                            <NavBtn
                                value={category}
                                to={`/${category}`}
                                key={key}
                                active={(category === activeCategory).toString()}
                                onClick={() => handleChangeCategory(category)}
                            >
                                {category}
                            </NavBtn>
                        ))}
                </NavMenu>
                <NavLogo src="/logo.svg" alt="Logo" />
                <NavMenu>
                    <CurrencyContainer onClick={toggleCurrencyPopUpMenu} active={currencyPopUpMenu.toString()}>
                        {getCurrencySign(activeCurrency) + ' ' + activeCurrency}
                        <img src="/arrow.svg" alt="" />
                    </CurrencyContainer>
                    <CartContainer onClick={toggleMinicartPopUpMenu}>
                        <img src="/empty-cart.svg" alt="cart" />
                        {cart.length > 0 && <p key={cart[0].id}>{getCartQuantity(cart)}</p>}
                    </CartContainer>
                    {currencyPopUpMenu && (
                        <>
                            <CurrencyPopUpMenu onItemClick={toggleCurrencyPopUpMenu} />
                            <ModalBackdrop onClick={toggleCurrencyPopUpMenu} />
                        </>
                    )}
                    {minicartPopUpMenu && (
                        <>
                            <MinicartPopUpMenu onItemClick={toggleMinicartPopUpMenu} />
                            <ModalBackdrop onClick={toggleMinicartPopUpMenu} />
                        </>
                    )}
                </NavMenu>
            </div>
        </Nav>
    );
};

export default Header;
