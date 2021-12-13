const initialState = () => ({
    type: '',
    description: '',
    price: '',
    title: '',
    listings: [],
  });
  
  const listingReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
            //state for title of the product
    case 'LISTINGS_SET_TITLE':
        return {
          ...state,
          title: action.title,
        }
  
      //state for description of the product
      case 'LISTINGS_SET_DESCRIPTION':
        return {
          ...state,
          description: action.description,
        }
  
      //state for price of the product
      case 'LISTINGS_SET_PRICE':
        return {
          ...state,
          price: action.price,
        }
  
      //state for tyoe of product
      case 'LISTINGS_SET_TYPE':
        return {
          ...state,
          type: action.types,
        }
  
      //state for all of the lsitings
      case 'LISTINGS_SET_LISTINGS':
        return {
          ...state,
          listings: listings,
        }
      default:
        return state;
    }
  };
  
  export default listingReducer;