using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;


public class Room
{
    public int RoomId { get; set; }

    public Room(int roomId)
    {
        RoomId = roomId;
    }
}

namespace signalRChatProject.Hubs
{
    class ChatHub : Hub
    {

        public async Task SendToAGroup(string userName, string message,string groupName)
        {
            await Clients.Group(groupName).SendAsync("messagedToGroup",userName,message);  
        }

        public async Task JoinToAGroup(string userName,string message,string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
            await Clients.Group(groupName).SendAsync("joinedToGroup",userName,groupName);
        }

        public async Task LeaveFromGroup(string userName,string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId,groupName);
            await Clients.Group(groupName).SendAsync("leftFromGroup",userName,groupName);
        }

        public async Task AddAGroup(Room[] rooms) 
        {
            await Clients.All.SendAsync("addedAGroup", rooms);
        }
      
        
    }
}