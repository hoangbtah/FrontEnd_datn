<template>
    <div> 
    <TheHeader/>
    <PageContent/>
    <TheFooter/>
    <!-- show chat bot  -->
    <!-- <df-messenger
  intent="WELCOME" v-if="ShowChatbot"
  chat-title="chatbot_web"
  agent-id="07c89bea-66d2-4fe6-9244-b83f0a6e34ae"
  language-code="en"
></df-messenger> -->
<!-- <script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></script>
<df-messenger
  intent="WELCOME"
  chat-title="FSHOP"
  agent-id="980225b8-6137-47f2-8848-db03bd871700"
  language-code="vi"
></df-messenger> -->
<df-messenger
  intent="WELCOME"
  chat-title="FSHOP"
  agent-id="980225b8-6137-47f2-8848-db03bd871700"
  language-code="vi" style="z-index:10"
></df-messenger>
    </div>
    
</template>
<script>
import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import PageContent from './PageContent.vue'
export default {
    name:'UserIndex',
    components:{TheHeader,PageContent,TheFooter},
    data(){
      return {
        ShowChatbot:true
      }
    }

}
</script>
<style>
@import url('../assets/css/style.css');
</style>