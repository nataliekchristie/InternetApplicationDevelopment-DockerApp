import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateMessages, handlTextChange, submitMessage } from './redux/actions/messageActions';
import './App.css';

const Message = ({ data }) => (<div>{data}</div>);

const App = ({ adminMode = true }) => {
  const text = useSelector(state => state.messageReducer.text);
  const messages = useSelector(state => state.messageReducer.messages);
  const dispatch = useDispatch();

  React.useEffect(() => {
    axios.get('/messanger/getMessages')
      .then((res) => {
        dispatch(updateMessages(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
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
    <div>
        <div className="listingTitle">{listing.title}</div>
        <div className="listingDescription">{listing.description}</div>
        <div className="listingType">{listing.type}</div>
        <div className="listingPrice">{listing.price}</div>
        <form>
          <textarea name="textarea" placeholder="test" onChange={e => setMessage(e.target.value)} />
          {message}
          <button className="submit" onClick={() => submitInquiry()}></button>
        </form>
      </div>
  );
  }
  else{
    return(
      <div>
      <div className="listingTitle">{listing.title}</div>
      <div className="listingDescription">{listing.description}</div>
      <div className="listingType">{listing.type}</div>
      <div className="listingPrice">{listing.price}</div>
      <div className="listingDelete" onClick={() => deleteListing()}>Delete</div>
      <div className="listingInquiries" onClick={() => viewInquiries()}>View Inquiries</div>
    </div>

    );
  }
};

export default App;
