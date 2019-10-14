import React, {useCallback} from 'react';
import styled from '@emotion/styled'
import {userSelectedLocationSubject} from "../state";
import {borderColor} from "../palette";
import {RGBColorToString} from "../Utils/ColorUtils";
import TextField from '@material-ui/core/TextField';


const Container = styled('div')<{}>(() => ({
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
}));

const Input = styled(TextField)<{}>(() => ({
    width: 400,
    backgroundColor: "white",
    borderRadius: 4,
    ":focus": {
        outline: "none",
    }
}))

const AddressField: React.FC = () => {

    const addressFieldRefCallback = useCallback((addressFieldRef) => {
        const options = {
            componentRestrictions: {country: ['fi']},
            types: ['geocode'],
        };

        // @ts-ignore
        const autocomplete = new google.maps.places.Autocomplete(addressFieldRef, options);

        autocomplete.setFields(["geometry.location"])

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()

            const lat = place.geometry.location.lat()
            const long = place.geometry.location.lng()

            userSelectedLocationSubject.next([lat, long])
        });
    }, [])

    return (
        <Container className="address-selector-container">
            <Input
                inputRef={addressFieldRefCallback}
                type="text"
                placeholder="Holiday location"
                variant="outlined"
            />
        </Container>
    );
}

export default AddressField;