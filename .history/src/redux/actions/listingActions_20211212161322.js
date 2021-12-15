import axios from 'axios';

export const updateTitle = title => {
    return {
      type: 'LISTINGS_SET_TITLE',
      title,
    };
  };
  
  export const updateDescription = description => {
    return {
      type: 'LISTINGS_SET_DESCRIPTION',
      description,
    };
  };
  
  export const updatePrice = price => {
    return {
      type: 'LISTINGS_SET_PRICE',
      price,
    };
  };
  
  export const updateType = type => {
    return {
      type: 'LISTINGS_SET_TYPE',
      type,
    };
  };


export const createListing = ({ description, type, price, title }) => (
    axios.post('/listingapi/createListing', {
        description: description,
        type: type,
        price: price,
        title: title
    })
);

export const submitListing = () => (dispatch, getState) => {
  axios.post('/listingapi/createListing', { 
    type: getState().messageReducer.type,
    description: getState().messageReducer.description,
    title: getState().messageReducer.title,
    price: getState().messageReducer.price  })
    .then(() => { 
      console.log("Success");
    })
    .catch(e => console.log(e));
};

export const submitMessage = () => (dispatch) => {
    //update state of listings in listing reducer
 axios.get('/listingapi/getListings')
 .then((response) => dispatch({ type: 'LISTINGS_SET_LISTINGS', payload: response.data.items }));
  };
