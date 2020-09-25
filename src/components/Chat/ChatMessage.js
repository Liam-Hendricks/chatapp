import React,{useRef,useEffect} from 'react';
import {PropTypes} from 'prop-types';

const ChatMessage =({message,auth,index,size})=>{
    const {text,uid,photoURL}=message;
    const move =useRef(null);
    useEffect(()=>{
        if(index+1===size){
            move.current.scrollIntoView({behavior:'smooth'});
        }
    },[])

   
      const messageClass = uid === auth.currentUser.uid? 'sent':'received';//conditional css 
      console.log(`index ${index} ,size:${size}`)
      return(
          <>
            <div className={`message ${messageClass}`}>
            <img src={`${photoURL}`}/>
            <p>{text}</p>
            </div>
            {index+1===size? <div ref={move}>

            </div>:false }  
                      
            
           
         </>
      )
}

ChatMessage.defaultProps = {
    message: {},
    auth:{},
    
};
ChatMessage.propTypes = {
    auth:PropTypes.object,
    message:PropTypes.shape({
        text:PropTypes.string,
        uid:PropTypes.string,
        photoURL:PropTypes.string
    }),
    size:PropTypes.number,
    index:PropTypes.number,
}
export default ChatMessage

