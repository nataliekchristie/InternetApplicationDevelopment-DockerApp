import axios from 'axios';
import FormData from 'form-data'

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
  
  export const updateType = listtype => {
    console.log("reached updateType");
    return {
      type: 'LISTINGS_SET_TYPE',
      listtype,
    };
  };

  export const setListings = (listings) => {
    return{
      type: 'LISTINGS_SET_LISTINGS',
      listings: listings,
    }
  }

/*
export const createListing = ({ description, type, price, title }) => (
    axios.post('/listingapi/createListing', {
        description: description,
        type: type,
        price: price,
        title: title
    })
);*/


export const createListing = () => (dispatch, getState) => {
  console.log("reached createListing action");
  axios.post('/listingapi/createListing', { 
    type: getState().listingReducer.type,
    description: getState().listingReducer.description,
    title: getState().listingReducer.title,
    price: getState().listingReducer.price  })
    .then(() => { 
      console.log("Success");
    })
    .catch((e) => console.log(e));
};

// export const createListing = () => (dispatch, getState) => {
//   const postData = new FormData();
//   postData.append('image',messageReducer.image);
//   postData.append('description',messageReducer.description);
//   postData.append('type',messageReducer.type);
//   postData.append('title',messageReducer.title);
//   postData.append('price',messageReducer.price);
//   axios.post('/listingapi/createListing', postData)
//     .then(() => { 
//       console.log("Success");
//     })
//     .catch(e => console.log(e));
// };



export const getListings = () => (dispatch) => {
    //update state of listings in listing reducer
 axios.get('/listingapi/getListings')
 .then((response) => dispatch(setListings(response.data)))
 .catch((err) => {
   console.log(err);
 })
  };



