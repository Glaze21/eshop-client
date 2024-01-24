import { AttributeContainer, SizeBoxText, SizeBoxSwatch } from './MinicartPopUpMenu.elements';

const Attribute = ({ attribute, selectedAttributes, onSetActiveAttribute }) => {
    const setActiveAttribute = (name, value) => {
        onSetActiveAttribute(name, value);
    };

    return (
        <AttributeContainer>
            <p>{attribute.name}:</p>
            <div>
                {attribute.items.map((attributeItem, key) => (
                    <div key={key}>
                        {attribute.type === 'text' ? (
                            <SizeBoxText
                                onClick={() => setActiveAttribute(attribute.id, attributeItem.id)}
                                active={(attributeItem.id === selectedAttributes[attribute.id]).toString()}
                            >
                                <p>{attributeItem.value}</p>
                            </SizeBoxText>
                        ) : attribute.type === 'swatch' ? (
                            <SizeBoxSwatch
                                color={attributeItem.value}
                                onClick={() => setActiveAttribute(attribute.id, attributeItem.id)}
                                active={(attributeItem.id === selectedAttributes[attribute.id]).toString()}
                            />
                        ) : (
                            <div />
                        )}
                    </div>
                ))}
            </div>
        </AttributeContainer>
    );
};

export default Attribute;
