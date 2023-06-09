import { useContext, useEffect, useState } from "react";
import SendMessage from "./SendMessage";
import ChatBoxHeader from "./ChatBoxHeader";
import Message from './Message';
import { ChatContext } from "../store/ChatContext";
import {findChat} from '../api/ChatRequests'
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase";
import {SiChatbot} from 'react-icons/si'

const Chatbox = ({setSendMessage, receivedMessage}) => {
  const [user] = useAuthState(auth)
  const [chatId, setChatId] = useState("")
  const  {onChatUser} = useContext(ChatContext)
  const [messagesData, setMessagesData] = useState([]);
  
  useEffect(()=>{

     const getChatId = async() =>{

      try{
  
        const response = await findChat(user.uid, onChatUser.userId);
        
       
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        
       
        setChatId(data._id)
      }
      catch(error){
         return error;
      }
  }

  getChatId();

    },[onChatUser])
  
    
    
  return (
    
    <>  
    {onChatUser.name?
        <div className="relative w-full h-screen bg-[#e7e6e6]">
      
        <ChatBoxHeader onChatUser={onChatUser}/>
        <Message messagesData={messagesData} setMessagesData={setMessagesData} receivedMessage={receivedMessage} chatId={chatId} user={user}/>
        <SendMessage messagesData={messagesData} setMessagesData={setMessagesData} setSendMessage={setSendMessage} receiverId={onChatUser.userId}  chatId={chatId} user={user}/>
      </div>
      :
      <div className="w-full h-screen flex flex-col gap-2 items-center justify-center bg-gray-300">
        <span className="text-4xl md:text-6xl text-blue-500"><SiChatbot/></span>
        <h1 className="text-md md:text-xl text-gray-800">Welcome to Chatify App!</h1>
      </div>
      }
      </>
    
    
      
    
  );
};

export default Chatbox;
