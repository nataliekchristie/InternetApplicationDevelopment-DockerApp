import React, {useState} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';
import './App.css';

const Message = ({ data }) => (<div>{data}</div>);

const App = ({ adminMode = true }) => {
  const text = useSelector(state => state.messageReducer.text);
  const messages = useSelector(state => state.messageReducer.messages);
  const dispatch = useDispatch();

  // used for setting info when making new listing
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState();
  const [price, setPrice] = useState();
  
  // for making messages
  const [message, setMessage] = useState();

  // used to stream existing listings
  const [listings, setListings] = useState([]);
  const addListing = newListing=> setListings(state => [...state, newListing]);

  // use for when we create listing form 
  function submitListing(e){
    e.preventDefault();
    axios.post('/api/makingListing', {
      title: title,
      description: description,
      type: type,
      price: price,
    })
    .then( res => {
      console.log("Listing made")
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  // submit message saved in state
/*
  function submitMessage{

  }*/

  // uses api function to get listings from mongodb and stores in array
  function getListings(){
    axios.get('/getListings', (req,res) => {
    })
    .then((res) => res.data.forEach(listing => addListing(listing)))
    .catch((err) => {
      console.log(err);
    });
  }

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
  }, []);

  const onSubmit = () => {
    dispatch(submitMessage());
  }

  const handleTextChange = (e) => {
    dispatch(handlTextChange(e.target.value));
  };
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
      <div className ="listingCreationForm">
      <form>
        <div className="makeListing">Make Listing:</div>
        <div className="listingText">Description:</div>
        <div><textarea id="input-description" onChange={e => setDescription(e.target.value)}></textarea></div>
        <div className="listingText">Type:</div>
        <div><textarea id="input-type" onChange={e => setType(e.target.value)}></textarea></div>
        <div className="listingText">Price:</div>
        <div><textarea id="input-price" onChange={e => setPrice(e.target.value)}></textarea></div>
        <div className="listingText">Title:</div>
        <div><textarea id="input-title" onChange={e => setTitle(e.target.value)}></textarea></div>
        <div><button id="submit" onClick={() => submitListing()}>Submit</button></div>
      </form>
      </div>
    
      <div className="listings">
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
        ))}
      </div>
      </div>
      <div className="rightsidebar">
        <div className="rightsidebarContent">
          
        </div>
      </div>
      <div className="footer"></div>
      </div>
  );
  }
  else{
    return(
      <div>
        <div className="listings">
        {listings.map(listing => (
      <div className="listing">
      <div className="listingTitle">{listing.title}</div>
      <div className="listingDescription">{listing.description}</div>
      <div className="listingType">{listing.type}</div>
      <div className="listingPrice">{listing.price}</div>
      <div className="listingDelete" >Delete</div>
      </div>
        ))}
      </div>
    </div>

    );
  }
};

export default App;
