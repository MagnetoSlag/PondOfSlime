//'use strict';
const Discord = require('discord.js');              //Import Discord Library into our program, so we can use constant 'Discord' 
const Bot = new Discord.Client();                   //Declare a constant 'bot' as a client of Discord, i.e. a bot account
const Config = require('./notebook.js');            //Import File access function into our program
const FileHandle = require("fs");                   //Init FileHandle to handle our file input output in our program
const prefix = ">";                                 //You can change the command prefix anytime you like
let OrderBook = JSON.parse(FileHandle.readFileSync("./ShopOrder.json", "utf8"));        //Read OrderBook from local file
let GangList = JSON.parse(FileHandle.readFileSync("./GuestBook.json", "utf8"));         //Read GangList from local file


function CheckPermission(NametoLookUp) {
    //Perform User Permission Checks
    if (!GangList[NametoLookUp]) {
        // new user, adding to database with inintal access right 100
        GangList[NametoLookUp] = 100;       //Initial new user access right is 100
        FileHandle.writeFileSync("./GuestBook.json", JSON.stringify(GangList), (err) => {
            if (err) console.error(err)
        });
        console.log('New User added ' + NametoLookUp );
        return GangList[NametoLookUp];           
    } else {
        console.log('Gangster Back! ' + NametoLookUp);
        return GangList[NametoLookUp];
    }

}

function GenOrderTag() {
    //Generate random order tag and check for consistency
    //The logic is kind of dumb here, can be modify to enchance performance later
    var TempTag = Math.floor(Math.random() * 999) + 1;
    var i;
    var OKTag = 0;
    var y = OrderBook.OrderNumber.length;
    console.log("Requested GenOrderTag, assigned: " + TempTag);
    console.log('Array Length: ' + y);
    while (OKTag == 0) {
        i = 0;
        while (i < y) {
            OKTag = 1;
            if (OrderBook.OrderNumber[i].OrderTag == TempTag) {
                console.log('Order Tag Taken!! ' + TempTag);
                //same OrderTag found, gen new one and test again
                if (TempTag == 999) {       //make sure Order Number is below 1000
                    TempTag = 0;
                } else {
                    TempTag++;
                }
                OKTag = 0;                  //make sure the new value will be tested for duplication again
                i = y;                      //this will exit the while loop asap instead of using return or break
            } else {
                i++;
            }
        }
    console.log('GenOrderTag duplication scan completed!');
    }
    console.log("GenOrderTag Function Done with OrderTag: " + TempTag);
    return TempTag;
}

Bot.on('message', (message) => {

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    // This is a prototype command with user access right check, you can copy and put your own code and required access right for new command
    if (command === 'prototype') {
        //Rename the command above ^^^
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 100) {
            //Adjust access right above ^^
            //Insert your code below vvv
            // your code goes here
            //==========================
            message.channel.send("Sorry this command is under construction!");
        } else {    
            // Insufficient Access Level
            //Feel Free to change the message here
            message.channel.send("I am sorry " + message.author.username + ",\
            currently you dont have permission to perform this task, you may use \
            >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    //Production command begin here ======================== vvvvvvvvvvvvvvv ==============================
    //BlackListed User Command ------------------------ vvvvvvvv --------------------
    if (command === 'feedback') {
        message.channel.send("Sorry this command is under construftion!");
        // I am not sure how you would like to handle feedback, I suppose anyone can send feedback to you? even backlisted user? or you can block them with 
        // CheckPermission function too
    }

    // Regular User Command ------------------------- User Access Level >= 100 ------------------
    if (command === 'order') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 100) {

            if (message.content.includes(" ")) {
                var ShoppingCart = {
                    OrderTag: "",
                    Particulars: "",
                    Customer: "",
                    FromServer: "",
                    Status: ""
                };

                let ItemPlaced = message.content.replace(">order", "");    //This extract remaining words into variable ItemPlaced
                ItemPlaced.trim();
                ShoppingCart.OrderTag = GenOrderTag();
                ShoppingCart.Particulars = ItemPlaced;
                ShoppingCart.Customer = message.author.username;
                ShoppingCart.FromServer = message.guild.name;
                ShoppingCart.Status = "unclaim";
                //Review order
                message.channel.send("Your Name: " + ShoppingCart.Customer);
                message.channel.send("From Server: " + ShoppingCart.FromServer);
                message.channel.send("Order Tag: " + ShoppingCart.OrderTag);

                //Add Order to Shopping Cart
                OrderBook.OrderNumber.push(ShoppingCart);
                FileHandle.writeFileSync("./ShopOrder.json", JSON.stringify(OrderBook), (err) => {
                if (err) {
                         console.error(err);
                        message.channel.send("Sorry, your order cannot be processed at the moment. Please try again later.");
                    } 
                });
                message.channel.send("Thank you for ordering " + ItemPlaced);
                message.channel.send("Your order has been placed with Order Tag: " + ShoppingCart.OrderTag);
            } else {
                 return message.channel.send("Please Order Something");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'showmyorder') {
        var AccessRight = CheckPermission(message.author.username);
        var i;
        var HasEntry = 1;
        if (AccessRight >= 100) {
            for (i = 0; i < OrderBook.OrderNumber.length; i++) {
                if (OrderBook.OrderNumber[i].Customer == message.author.username) {
                    message.channel.send(i + "~ OrderTag: <" + OrderBook.OrderNumber[i].OrderTag + "> Particulars: " + OrderBook.OrderNumber[i].Particulars);
                    //Show order status or not?
                    HasEntry = 0;       //do not display no entry message if have order history before
                }
            }
            if (HasEntry) {
                message.channel.send("Sorry, we dont have any record of your order!");
            }

        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'cancelorder') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 100) {
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var OrderTagFound = 0;                                              //A Flag showing rather such Order Tag found or not in OrderBook
                var TempTag = args.shift();                                         //Assign Order Tag after command to variable TempTag
                for (var i = 1; i < OrderBook.OrderNumber.length; i++) {
                    if (OrderBook.OrderNumber[i].OrderTag == TempTag) {             //find order with same TempTag
                        OrderTagFound = 1;                                          //indicate an order entry found with same Order Tag
                        if (OrderBook.OrderNumber[i].Customer == message.author.username) {
                            OrderBook.OrderNumber.splice(i, 1);                     //Delete that OrderEntry in OrderBook if customer name is same as author
                            FileHandle.writeFile("./ShopOrder.json", JSON.stringify(OrderBook), (err) => {
                                if (err) {
                                    console.error(err);
                                    message.channel.send("Sorry, your order cannot be processed at the moment. Please try again later.");
                                }
                            });
                            message.channel.send("Your order <OrderTag:" + TempTag + "> has been canceled.");
                        } else {
                        // customer in record belongs to someone else
                            message.channel.send("Sorry you cannot cancel order not owned by you. " + OrderBook.OrderNumber[i].Customer);
                        }
                    }
                }

                if (OrderTagFound == 0) {                                           //or you can write 'if(!OrderTagFound)' instead
                    message.channel.send("Sorry, no such order found, you may use >showmyorder to check your order.");
                }

            } else {
                message.channel.send("Sorry, I need ONE Order Tag to work with!");
            }
            
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    // User with Chef Access Level ------------------ User Access Level >= 150 -----------------
    if (command === 'orderclaim') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 150) {
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var OrderTagFound = 0;                                              //A Flag showing rather such Order Tag found or not in OrderBook
                var TempTag = args.shift();                                         //Assign Order Tag after command to variable TempTag
                for (var i = 1; i < OrderBook.OrderNumber.length; i++) {
                    if (OrderBook.OrderNumber[i].OrderTag == TempTag) {             //find order with same TempTag
                        OrderTagFound = 1;                                          //indicate an order entry found with same Order Tag
                        if (OrderBook.OrderNumber[i].Status == "unclaim") {
                            OrderBook.OrderNumber[i].Status = message.author.username;
                            FileHandle.writeFile("./ShopOrder.json", JSON.stringify(OrderBook), (err) => {
                                if (err) {
                                    console.error(err);
                                    message.channel.send("Sorry, your command cannot be processed at the moment. Please try again later.");
                                }
                            });
                            message.channel.send("You've claimed <OrderTag:" + TempTag + ">");
                        } else {
                            // customer in record belongs to someone else
                            message.channel.send("Sorry <OrderTag:" + TempTag +"> already been claimed.");
                        }
                    }
                }

                if (OrderTagFound == 0) {                                           //or you can write 'if(!OrderTagFound)' instead
                    message.channel.send("Sorry, no such order found!");
                }

            } else {
                message.channel.send("Sorry, I need ONE Order Tag to work with!");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'orderdel') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 150) {
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var OrderTagFound = 0;                                              //A Flag showing rather such Order Tag found or not in OrderBook
                var TempTag = args.shift();                                         //Assign Order Tag after command to variable TempTag
                for (var i = 1; i < OrderBook.OrderNumber.length; i++) {
                    if (OrderBook.OrderNumber[i].OrderTag == TempTag) {             //find order with same TempTag
                        OrderTagFound = 1;                                          //indicate an order entry found with same Order Tag
                        OrderBook.OrderNumber.splice(i, 1);                         //Delete that OrderEntry in OrderBook
                        FileHandle.writeFile("./ShopOrder.json", JSON.stringify(OrderBook), (err) => {
                            if (err) {
                                console.error(err);
                                message.channel.send("Sorry, your command cannot be processed at the moment. Please try again later.");
                            }
                        });
                        message.channel.send("Order <OrderTag:" + TempTag + "> has been canceled."); 
                    }
                }

                if (OrderTagFound == 0) {                                           //or you can write 'if(!OrderTagFound)' instead
                    message.channel.send("Sorry, no such order found!");
                }

            } else {
                message.channel.send("Sorry, I need ONE Order Tag to work with!");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'orderinfo') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 150) {
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var OrderTagFound = 0;                                              //A Flag showing rather such Order Tag found or not in OrderBook
                var TempTag = args.shift();                                         //Assign Order Tag after command to variable TempTag
                for (var i = 1; i < OrderBook.OrderNumber.length; i++) {
                    if (OrderBook.OrderNumber[i].OrderTag == TempTag) {             //find order with same TempTag
                        OrderTagFound = 1;                                          //indicate an order entry found with same Order Tag
                        message.channel.send("<OrderTag:" + TempTag + ">");
                        message.channel.send("Particulars: " + OrderBook.OrderNumber[i].Particulars);
                        message.channel.send("Order by Customer: " + OrderBook.OrderNumber[i].Customer);
                        message.channel.send("From Server: " + OrderBook.OrderNumber[i].FromServer);
                        if (OrderBook.OrderNumber[i].Status == "unclaim") {
                            message.channel.send("Status >> Order Placed");
                        } else {
                            message.channel.send("Status >> Order claimed by: " + OrderBook.OrderNumber[i].Status);
                        }
                    }
                }

                if (OrderTagFound == 0) {                                           //or you can write 'if(!OrderTagFound)' instead
                    message.channel.send("Sorry, no such order found!");
                }

            } else {
                message.channel.send("Sorry, I need ONE Order Tag to work with!");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'orderdeliver') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 150) {
            // Sorry I am not sure what you want to do with this command
            // you can try play with this first hee hee
            message.channel.send("Sorry this command is under construction!");
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    // User with Admin Access Level ------------------ User Access Level >= 200 -----------------
    if (command === 'blacklist') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 200) {
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var TempUser = args.shift();                                        //Assign UserID after command to variable TempUser
                if (!GangList[TempUser]) {                                          //No such UserID in GangList
                     return message.channel.send("Sorry, no such User found!");    
                } else {   
                    GangList[TempUser] = 10;                                     //Min 100 access right is needed as a normal user
                    FileHandle.writeFileSync("./GuestBook.json", JSON.stringify(GangList), (err) => {
                        if (err) console.error(err)
                    });
                    console.log('Black Listed ' + TempUser + ", current Access Level: " + GangList[TempUser]);
                    message.channel.send("Black listed " + TempUser);
                }  
            } else {
                message.channel.send("Sorry, I need ONE User Name to work with!");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'chefadd') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 200) {
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var TempUser = args.shift();                                        //Assign UserID after command to variable TempUser
                console.log('Looking for ' + TempUser);
                if (!GangList[TempUser]) {                                          //No such UserID in GangList
                    return message.channel.send("Sorry, no such User found!");
                } else {
                    GangList[TempUser] = 150;                                       //Min 150 access right is needed as a Chef
                    FileHandle.writeFileSync("./GuestBook.json", JSON.stringify(GangList), (err) => {
                        if (err) console.error(err)
                    });
                    console.log('Promoted ' + TempUser + " as Chef, current Access Level: " + GangList[TempUser]);
                    message.channel.send("Promoted " + TempUser + " as Chef");
                    //You may want to send the user a message to notify his/her promotion too
                }
            } else {
                message.channel.send("Sorry, I need ONE User Name to work with!");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'chefdel') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 200) {
            // I assume delet a chef means making him/er a normal user?
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var TempUser = args.shift();                                        //Assign UserID after command to variable TempUser
                if (!GangList[TempUser]) {                                          //No such UserID in GangList
                    return message.channel.send("Sorry, no such User found!");
                } else {
                    GangList[TempUser] = 100;                                       //100 access right is a normal user
                    FileHandle.writeFileSync("./GuestBook.json", JSON.stringify(GangList), (err) => {
                        if (err) console.error(err)
                    });
                    console.log(TempUser + " now is a normal user, current Access Level: " + GangList[TempUser]);
                    message.channel.send(TempUser + " is a normal user now.");
                    //You may want to send the user a message to notify his/her promotion too
                }
            } else {
                message.channel.send("Sorry, I need ONE User Name to work with!");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }

    if (command === 'chefadmin') {
        var AccessRight = CheckPermission(message.author.username);
        if (AccessRight >= 200) {
            if (args.length == 1) {                                                 //Check rather there is a string after the command entered
                var TempUser = args.shift();                                        //Assign UserID after command to variable TempUser
                console.log('Looking for ' + TempUser);
                if (!GangList[TempUser]) {                                          //No such UserID in GangList
                    return message.channel.send("Sorry, no such User found!");
                } else {
                    GangList[TempUser] = 200;                                       //Min 200 access right is needed as an Admin
                    FileHandle.writeFileSync("./GuestBook.json", JSON.stringify(GangList), (err) => {
                        if (err) console.error(err)
                    });
                    console.log('Promoted ' + TempUser + " as Admin, current Access Level: " + GangList[TempUser]);
                    message.channel.send("Promoted " + TempUser + " as Admin");
                    //You may want to send the user a message to notify his/her promotion too
                }
            } else {
                message.channel.send("Sorry, I need ONE User Name to work with!");
            }
        } else {
            // Insufficient Access Level
            message.channel.send("I am sorry " + message.author.username + ", currently you dont have permission to perform this task, you may use >feedback to leave a message and our staff will get back to you asap!, thank you");
        }
    }
     
});
Bot.login(Config.my_token);
console.log('Bot is up and running');


