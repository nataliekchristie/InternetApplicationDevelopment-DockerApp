import React, {useState} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';
import { createListing, updateDescription, updatePrice, updateTitle, updateType } from './redux/actions/listingActions';
import './App.css';

const Message = ({ data }) => (<div>{data}</div>);

const App = ({ adminMode = true }) => {
  const text = useSelector(globalState => globalState.messageReducer.text);
  const messages = useSelector(globalState => globalState.messageReducer.messages);
  // const listtitle = useSelector(globalState => globalState.listingReducer.title);
  // const listdescription = useSelector(globalState => globalState.listingReducer.description);
  // const listprice = useSelector(globalState => globalState.listingReducer.price);
  // const listtype = useSelector(globalState => globalState.listingReducer.type);
  const dispatch = useDispatch();

  // used for setting info when making new listing
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState();
  
  // for making messages
  const [message, setMessage] = useState();

  // used to stream existing listings
  const [listings, setListings] = useState([]);
  const addListing = newListing => setListings(state => [...state, newListing]);

  // use for when we create listing form 
  
  // function submitListing(){
  //   axios.post('/listingapi/createListing', {
  //     title: title,
  //     description: description,
  //     type: type,
  //     price: price,
  //   })
  //   .then( res => {
  //     console.log("Listing made")
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }
  


  // submit message saved in state
/*
  function submitMessage{

  }*/

  // uses api function to get listings from mongodb and stores in array

  /*
  function getListings(){
    axios.get('/listingapi/getListings', (req,res) => {
    })
    .then((res) => res.data.forEach(listing => addListing(listing)))
    .catch((err) => {
      console.log(err);
    });
  }*/

  /*
  // load listings 
  React.useEffect(() => {
    axios.get('/listingapi/getListings')
      .then((res) => res.data.forEach(listing => addListing(listing)))
      .catch((e) => {
        console.log(e);
      });
  }, []);*/

  React.useEffect(() => {
    try {
      axios
        .get('/listingapi/getListings')
        .then(response => response.data.forEach(listing => addListing(listing)));
    }
    catch (err) {
      console.log(err);
    }

  }, []);

  /*
  React.useEffect(() => {
    axios.get('/messanger/getMessages')
      .then((res) => {
        dispatch(updateMessages(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
      // call listings upon load
      getListings();
  }, []);*/

  /*
  const onSubmit = () => {
    dispatch(createListing());
  }*/

  // submit listing to createListing action using set parameters on form
  /*
  const onSubmit = () => {
    dispatch(
      createListing(
        description,
        type,
        price,
        title,
    ));
  }*/

const createListing = () => {
    console.log("reached createListing action");
    axios.post('/listingapi/createListing', { 
      type: type,
      description: description,
      title: title,
      price: price,  })
      .then(() => { 
        console.log("Success");
      })
      .catch((e) => console.log(e));
  };

  // const createListing = () => (dispatch, getState) => {
//   const postData = new FormData();
//   postData.append('image',image);
//   postData.append('description',description);
//   postData.append('type',type);
//   postData.append('title',title);
//   postData.append('price',price);
//   axios.post('/listingapi/createListing', postData)
//     .then(() => { 
//       console.log("Success");
//     })
//     .catch(e => console.log(e));
// };

  const listingDescription = (e) => {
    setDescription(e.target.value);
    dispatch(updateDescription((e.target.value)));
    console.log("description updated");
   // console.log(listdescription);
  };

  const listingTitle = (e) => {
    setTitle(e.target.value);
    dispatch(updateTitle((e.target.value)));
    console.log("title updated");
   //console.log(listtitle);
  };

  const listingPrice = (e) => {
    setPrice(e.target.value);
    dispatch(updatePrice((e.target.value)));
    console.log("price updated");
  //  console.log(listprice);
  };

  const listingType = (e) => {
    setType(e.target.value);
    dispatch(updateType((e.target.value)));
    console.log("type updated");
  //   console.log(listtype);
  };

   
  const onSubmit = () => {
    console.log("reached submit");
   // dispatch(createListing());
   createListing();
    console.log("listing info submitted");
  }


  /*
  const handleTextChange = (e) => {
    dispatch(handlTextChange(e.target.value));
  };*/
/*
  return (
    <div className="App">
      <div>
        <div className="message-area">
          {messages.map((message, i) => <Message key={i} data={message} />)}
        </div>
      </div>
      <div>
        <input type="text" value={text} onChange={handleTextChange} />
      </div>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  ); */

  
  if(adminMode){
  return(
    <div className="container">
      <div className="header">
        <div className="headerContent">

        </div>
      </div>
      <div className="leftsidebar">
        <div className="leftsidebarContent"></div>
      </div>
      <div className="centercontent">
     {/* THIS IS AN EXAMPLE LISTING TO FORMATTING CSS */}
      <div className="listings">
      <div className="listing">
        <div className="listingTitle">Listing Title</div>
        <div className="listingImage"><img src="https://dummyimage.com/200x200/e3e3e3/525252.jpg"></img></div>
        <div className="listingDescription">Description for listing</div>
        <div className="listingType">Listing type</div>
        <div className="listingPrice">$100</div>
        </div>
        <div className="listing">
        <div className="listingTitle">Listing Title</div>
        <div className="listingImage"><img src="https://dummyimage.com/200x200/e3e3e3/525252.jpg"></img></div>
        <div className="listingDescription">Description for listing</div>
        <div className="listingType">Listing type</div>
        <div className="listingPrice">$100</div>
        </div>
        <div className="listing">
        <div className="listingTitle">Listing Title</div>
        <div className="listingImage"><img src="https://dummyimage.com/200x200/e3e3e3/525252.jpg"></img></div>
        <div className="listingDescription">Description for listing</div>
        <div className="listingType">Listing type</div>
        <div className="listingPrice">$100</div>
        </div>
        {/*
         {listings.map(listing => (
        <div className="listing">
        <div className="listingTitle">{listing.title}</div>
        <div className="listingDescription">{listing.description}</div>
        <div className="listingType">{listing.type}</div>
        <div className="listingPrice">{listing.price}</div>
        <form>
          <textarea name="textarea" onChange={e => setMessage(e.target.value)} />
          {message}
          <button className="submit" ></button>
        </form>
        </div>
        ))}*/}
      </div>
      </div>
      <div className="rightsidebar">
        <div className="rightsidebarContent">
        <div className ="listingCreationForm">
      <form>
        <div className="makeListing">Make Listing</div>
        <div className="listingText">Description:</div>
        <div className="makeListingBox"><textarea id="input-description" onChange={listingDescription}></textarea></div>
        <div className="listingText">Type:</div>
        <div className="makeListingBox"><textarea id="input-type" onChange={listingType}></textarea></div>
        <div className="listingText">Price:</div>
        <div className="makeListingBox"><textarea id="input-price" onChange={listingPrice}></textarea></div>
        <div className="listingText">Title:</div>
        <div className="makeListingBox"><textarea id="input-title" onChange={listingTitle}></textarea></div>
        <div><button className="makeListingSubmit" id="submit" onClick={onSubmit}>GO!</button></div>
      </form>
      </div>
        </div>
      </div>
      <div className="footer"></div>
      </div>
  );
  }
  else{
    return(
      <div>
        {/* THIS IS EXAMPLE LISTING TO FORMAT*/}
        <div className="listings">
        <div className="listing">
      <div className="listingTitle">"Listing Title"</div>
      <div className="listingDescription">This is a filler description</div>
      <div className="listingType">Type</div>
      <div className="listingPrice">Price</div>
      <div className="listingDelete" >Delete</div>
      </div>
          {{/* 
        {listings.map(listing => (
      <div className="listing">
      <div className="listingTitle">{listing.title}</div>
      <div className="listingDescription">{listing.description}</div>
      <div className="listingType">{listing.type}</div>
      <div className="listingPrice">{listing.price}</div>
      <div className="listingDelete" >Delete</div>
      </div>
        ))}*/}}
      </div>
    </div>

    );
  }
};

export default App;
