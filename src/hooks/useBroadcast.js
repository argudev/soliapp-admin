const useBroadcast = () => {

    const connectWebSocket_updates = (webSocketChannel,webSocketListen,callback) => {
        window.Echo.channel(webSocketChannel)
            .listen(webSocketListen, async (e) => {
                // e.message
                callback(e);
            });
    }
    const disconnectWebsocket=()=>{
        window.Echo.leave('cases-to-precommittee');
        window.Echo.leave('cases-to-committee');
        window.Echo.leave('cases-to-verifiying');
        window.Echo.leave('alerts');
        window.Echo.disconnect();
        console.log('ejecuto');
        
    }
    return { connectWebSocket_updates,disconnectWebsocket }
}

export default useBroadcast