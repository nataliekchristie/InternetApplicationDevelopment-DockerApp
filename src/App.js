import React, {useState} from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';
import { createListing, updateDescription, updatePrice, updateTitle, updateType } from './redux/actions/listingActions';
import './App.css';
import FormData from 'form-data'

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
  const [file, setFile] = useState();
  const [pic100, setpic100] = useState(true);
  const [pic500, setpic500] = useState(false);

  
  
  // for making messages
  const [message, setMessage] = React.useState('');

  // used to stream existing listings
  const [listings, setListings] = useState([]);

  // fetch existing messages
  React.useEffect(() => {
    // triggers when component mounts
    fetch('/service1/get-messages') // defaults to GET
    .then(res => res.json())
    .then(result => {
      console.log(result);
      dispatch({
        type: 'UPDATE_MESSAGES',
        messages: result,
      });
    })
    .catch(console.log);
  }, []);

  // change to submitMessage later
  const enterMessage = () => {
    console.log('Submitting message');

    const requestOptions = {
      method: 'post',
      body: message,
    };
    fetch('/service1/submit-message', requestOptions) // makes network request
      .catch(console.log);

    setMessage('');
  }
  // uses api function to get listings from mongodb and stores in array

  React.useEffect(() => {
    try {
      axios
        .get('/listingapi/getListings')
        .then(response => {setListings(response.data)});
    }
    catch (err) {
      console.error(err);
    }

  }, []);

  const changePic = () => {
    setpic100(!pic100);
    setpic500(!pic500);
    console.log("pic size changed");
  }

  const createListing = () => {
  console.log("Reached createListing in App.js");
  const postData = new FormData();
  console.log("After image.files");
  console.log(file.name);
  postData.append('description',description);
  postData.append('type',type);
  postData.append('title',title);
  postData.append('price',price);
  postData.append('file', file, file.name);
  axios.post('/listingapi/createListing', postData)
    .then(() => { 
      console.log("Listing successfully made");
    })
    .catch(e => console.log(e));
};

const deleteListing = (listingid) => {
  /*
  console.log("Reached deleteListing in App.js");
  axios.get('/listingapi/deleteListing',listingid)
  .then(() => {
    console.log("Listing deleted");
  })
  .catch( (e) => {
    console.log(e);
    console.log("error in deleting listing");
  });*/
}

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

  const setImageHandler = (e) => {
    setFile(e.target.files[0]);
  };

   
  const onSubmit = () => {
    console.log("reached submit");
   // dispatch(createListing());
   createListing();
    console.log("listing info submitted");
  }

  
  if(adminMode){
  return(
    <div className="container">
      <div className="header">
        <div className="headerContent">
       
        </div>
      </div>
      <div className="leftsidebar">
        <div className="leftsidebarContent">
        <div className="login-content">
            <form>
              <div className="login-login">Admin login:</div>
              <div className="login-username">Username:</div>
              <div className="loginBox"><textarea></textarea></div>
              <div className="login-password">Password:</div>
              <div className="loginBox"><textarea></textarea></div>
              <div><button className="login-submit" id="submit">Log in</button></div>
            </form>
          </div>
        </div>
      </div>
      <div className="centercontent">
      <div className="listings">
        {
         listings.map(listing => (
        <div className="listing" key={listing.title}>
        <div className="listingTitle">{listing.title}</div>
        { pic100 &&
        <div className="listingImage"><img src={`/listingapi/getImage100/`+listing.title} alt="x" onClick={changePic}/></div>
          }
          { pic500 &&
        <div className="listingImage"><img src={`/listingapi/getImage500/`+listing.title} alt="x" onClick={changePic}/></div>
          }
        <div className="listingDescription">{listing.description}</div>
        <div className="listingType">{listing.type}</div>
        <div className="listingPrice">{listing.price}</div>
        <div className="delete-button" onClick={deleteListing()}>remove listing</div>
        </div>
         ))}
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
        <input id="file-input" className="file-input" type="file" accept="image/gif, image/jpeg, image/png" name="file" onChange = {e => setImageHandler(e)}/>
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
      <div className="container">
      <div className="header">
        <div className="headerContent">
       
        </div>
      </div>
      <div className="leftsidebar">
        <div className="leftsidebarContent">
        <div className="login-content">
            <form>
              <div className="login-login">Admin login:</div>
              <div className="login-username">Username:</div>
              <div className="loginBox"><textarea></textarea></div>
              <div className="login-password">Password:</div>
              <div className="loginBox"><textarea></textarea></div>
              <div><button className="login-submit" id="submit">Log in</button></div>
            </form>
          </div>
        </div>
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

        {/* inquiry */}
        <div className="inquiry"><textarea value={message} onChange={e => setMessage(e.target.value)}></textarea></div>
        <div><button onClick={enterMessage}>Submit Inquiry</button></div>
        <div>{messages.map(i => <div>{i}</div>)}</div>
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
        ))}
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
        <input id="file-input" className="file-input" type="file" accept="image/gif, image/jpeg, image/png" onChange = {e => setImageHandler(e)}/>
        <div><button className="makeListingSubmit" id="submit" onClick={onSubmit}>GO!</button></div>
      </form>
      </div>
        </div>
      </div>
      <div className="footer"></div>
      </div>

    );
  }
};

export default App;
