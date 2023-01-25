import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

// const ChatSection = () => {
//   const [message, setMessage] = useState('');
//   const [response, setResponse] = useState('');
  

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     axios.post('http://localhost:8080/', {data : { message: message }})
// //       .then(res => {
// //         setResponse(Object.values(res.data));
// //         // set the response
// //        // setResponse(res.data);
// //       })
// //       .catch(err => {
// //         console.error(err);
// //       });
// //   }

// const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:8080/', {data : { message: message }})
//       .then(res => {
//         // update the state to display the response in the chat window
//         setResponse(res.data);
//       })
//       .catch(err => {
//         console.error(err);
//       });
//     }
//   },[response];
//   let chatList = response.map((chat, index) => {
//     return (
//       <div key={index}>
//         <div>{chat.prompt}</div>
//         <div>{chat.response}</div>
//       </div>
//     );
//   });
//   return <div>{chatList}</div>;

//   return (
//     <section className="container my-5" id="espaceChat">
//       <div className="card-body border border-dark rounded msg_card_body" id="boite">
//         <div className="d-flex justify-content-start mb-4">
//           <div className="img_cont_msg">
//             <img src="assets/user.jpeg" className="rounded-circle user_img_msg" alt='user' />
//           </div>
//           <div className="msg_cotainer">
//             {message}
//           </div>
//         </div>

//         <div className="d-flex justify-content-end mb-4">
//           <div className="msg_cotainer_send">
//           {response.map((history, index) => (
//   <div key={index}>
//     <p>{history.prompt}</p>
//     <p>{history.response}</p>
//   </div>
// ))}

//           </div>
//           <div className="img_cont_msg">
//             <img src="assets/chatboot.jpeg" className="rounded-circle user_img_msg"  alt='robot'/>
//           </div>
//         </div>
//       </div>
//       <div className="card-footer">
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <div className="input-group-append">
//               <button type="reset" className="input-group-text attach_btn">
//                 <i className="bi bi-arrow-clockwise"></i>
//               </button>
//             </div>
//             <textarea 
//               name="msg" 
//               className="form-control type_msg" 
//               placeholder="Type your message..."
//               value={message}
//               onChange={e => setMessage(e.target.value)}
//             />
//             <div className="input-group-append">
//               <button type="submit" className="input-group-text send_btn"  >
//                 <i className="bi bi-send"></i>
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ChatSection;

const ChatSection = () => {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then(res => {
              setResponse(res.data);
            })
            .catch(err => {
              console.error(err);
            });
    }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8080/', {data : { message: message }})
        .then(res => {
          setResponse(res.data);
          console.log(response);
        })
        .catch(err => {
          console.error(err);
        });
    }
  
    let chatList;
    if (Array.isArray(response)) {
      chatList = response.map((chat, index) => {
        const parsedPrompt = JSON.parse(chat.prompt);
        return (
          <div key={index}>
            <div className="d-flex justify-content-start mb-4">
                <div className="img_cont_msg">
                    <img src="assets/user.jpeg" className="rounded-circle user_img_msg" alt='msg' />
                </div>
                <div className="msg_cotainer">
                {parsedPrompt.data.message}
                </div>
            </div>
       
                <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                    {chat.response}
                    </div>
                    <div className="img_cont_msg">
                <img src="assets/chatboot.jpeg" className="rounded-circle user_img_msg" alt='res' />
                    </div>
                </div>
          </div>
        );
      });
    }
  
    return (
      <section className="container my-5" id="espaceChat">
        <div className="card-body border border-dark rounded msg_card_body" id="boite">
        {chatList}
</div>
        <div className="card-footer">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-group-append">
                <button type="reset" className="input-group-text attach_btn">
                  <i className="bi bi-arrow-clockwise"></i>
                </button>
              </div>
              <textarea 
                name="msg" 
                className="form-control type_msg" 
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <div className="input-group-append">
                <button type="submit" className="input-group-text send_btn">
                  <i className="bi bi-send"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    );
  };
  export default ChatSection;