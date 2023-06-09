

    const baseURL = 'https://chat-app-server-fed8.onrender.com/api/chat'

    export const createChatRequest = (senderId, receiverId ) => fetch(`${baseURL}/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            senderId: senderId,
          receiverId: receiverId
         
        })
    })
    

    export const findChat = (userId,chatUserId) => fetch(`${baseURL}/find/${userId}/${chatUserId}`)
   
    export const getChatContactsRequest = (userId) => fetch(`${baseURL}/${userId}`)

   
      
