import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import { getTranslations } from "next-intl/server";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

interface IParams{
    conversationId: string;
}

const ConversationId = async ({ 
    params
}:{
    params: IParams
}) => {
    
    const conversation = await getConversationById(params.conversationId);
    const messages = await getMessages(params.conversationId);

    const t = await getTranslations('State');

    if(!conversation){
        console.log("server sider conversation folder: ")
        return(
            <div className="lg:pl-80 h-full">
                <div className="h-full flex flex-col">
                    <EmptyState emptyMessage={t('emptyState')} />
                </div>
            </div>
        )
    }
    return (
        <div className="lg:pl-80 h-full">
            <div className="h-full flex flex-col">
                <Header conversation={conversation} />
                <Body initialMessages={messages} />
                <Form />
            </div>
        </div>
    )
}


export default ConversationId;