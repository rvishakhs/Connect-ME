import React , { forwardRef } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Message.css'

const Message = forwardRef(({message, user }, ref) => {
    const isUser = user === message.username ;
  return (
    <div  ref={ref} className={`message ${isUser && 'message_user'}`}>
        <card classname={isUser ? " message_usercard" : "message_guest"}>
            <CardContent >
                <Typography variant="body2">
                    {!isUser && <b>{message.username} : </b>} {message.message}
                </Typography>
            </CardContent>
        </card>
    </div>
  )
})

export default Message