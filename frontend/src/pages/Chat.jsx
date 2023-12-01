import UserChat from "../components/chats/UserChat"
import { ChatContext } from "../context/ChatContext"
import AuthContext from "../context/AuthContext"

export default function Chat() {
  const { user } = useContext(AuthContext)
  const { userChats, chatsLoading, chatsError } = useContext(ChatContext)

  return (
    <>
      <div>
        {userChats?.length < 1 ? null : (
          <div>
            <div>
              {chatsLoading && <p>Loading Chats...</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index}>
                    <UserChat chat={chat} user={user} />
                  </div>
                )
              })}
            </div>
            <p>ChatBox</p>
          </div>
        )}
      </div>
    </>
  )
}