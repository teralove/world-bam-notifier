// vers 1.0.0
module.exports = function WorldBamNotifier(dispatch) {
  
    // templateId : Name
    const BossName = {
        35: 'Nyxarras',
        9050: 'Yunaras',
        7011: 'Linyphi',
        33: 'Betsael',
        5011: 'Kanash',
        99: 'Divine Reaver'
    };    
    
    // templateId : huntingZoneId (idling)
    // templateId : huntingZoneId (in-combat)
    const BossId = [
        [35, 6553638], // Nyx
        [35, 13107238], // Nyx     
        
        [9050, 6553652], // Yuna
        [9050, 13107252], // Yuna (unverified)
        
        [7011, 6553651], // Lyn
        [7011, 13107251], // Lyn (unverified)
        
        [33, 3932217], // Betsy
        [33, 13107217], // Betsy (unverified)
        
        [5011, 6553604], // Kanash
        [5011, 13107204], // Kanash
        
        [99, 6553610], // DR
        [99, 13107210] // DR (unverified)
    ];
    
    let currentChannel = 0;
    
    dispatch.hook('S_SPAWN_NPC', 3, (event) => {
        //console.log('S_SPAWN_NPC: ' + event.templateId + ' : ' + event.huntingZoneId);
        for(let i = 0; i < BossId.length; i++)
        {
            if (event.templateId == BossId[i][0] && event.huntingZoneId == BossId[i][1]) {
                systemMessage('BAM Found: ' + BossName[event.templateId] + '     Channel: ' + currentChannel);
            }            
         }
    })
    
    dispatch.hook('S_CURRENT_CHANNEL', 2, (event) => {
        currentChannel = event.channel;
    });
    
    function systemMessage(msg) {
        dispatch.toClient('S_CHAT', 1, {
            channel: 7, // 7 = whisper
            authorName: '',
            message: msg
        });
    }

}