import { threadId } from "worker_threads";

class FriendsList {
    friends = [];

    addFriend(name){
        this.friends.push(name);
    }

    removeFriend(name){
        const idx = this.friends.indexOf(name)
        if(idx === -1){
            throw new Error("User not found");
        }
        this.friends.splice(idx, 1);
    }
}


describe('my test', () => {
    let friendsList;
    
    beforeEach(() => {
        friendsList = new FriendsList(); 
    });

    it('friendslist class available', () => {
        expect("FriendsList").toEqual(FriendsList.name);
    });

    it('initialize friendslist', () => {
        expect(friendsList.friends).toEqual([]);
    });

    it('a new friend can be added', () => {
        friendsList.addFriend("sagar");
        expect(friendsList.friends.length).toEqual(1);
        expect(friendsList.friends[0]).toEqual("sagar");
    })

    describe('remove friend', () => {
        it('remove friend successfully', () => {
            friendsList.addFriend("sagar");
            expect(friendsList.friends[0]).toEqual("sagar");
            friendsList.removeFriend("sagar");
            expect(friendsList.friends[0]).toBeUndefined();
            
        });
        it('remove invalid friends', () => {
           expect(() => friendsList.removeFriend("sagar")).toThrow(new Error("User not found")); 
        });
    })
});


// Refer Jest Documentation
// https://jestjs.io/docs/en/mock-functions