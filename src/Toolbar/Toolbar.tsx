import React, {useCallback} from 'react';
import styled from '@emotion/styled'
import {userSelectedLocationSubject} from "../state";
import {borderColor} from "../palette";
import {RGBColorToString} from "../Utils/ColorUtils";

const Container = styled('div')<{}>(() => ({
    display: "flex",
    flexDirection: "row",
    paddingTop: 50,
}));

const AddressField = styled('input')<{}>(() => ({
    borderRadius: 5,
    boxShadow: "0px 4px 5px 0px rgba(0,0,0,0.1)",
    border: "1px solid " + RGBColorToString(borderColor),
    padding: 4,
    width: 400,

    ":focus": {
        outline: "none",
    }
}))

const Toolbar: React.FC = () => {

    const addressFieldRefCallback = useCallback((addressFieldRef) => {
        console.log(addressFieldRef)
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

            console.log(lat, long)

            userSelectedLocationSubject.next([lat, long])
        });
    }, [])

    return (
        <Container className="Toolbar-container">
            <AddressField
                ref={addressFieldRefCallback}
                type="text"
                placeholder="Holiday location"
            />
        </Container>
    );
}

export default Toolbar;