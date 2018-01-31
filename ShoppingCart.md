# ShoppingCart for Discord

## External Dependency (i.e. This program need those stuff inorder to work)

You will need to place those stuff in the folder specified. For this project, put them all in the folder same as the app.js will be ok
1. ED_1
   - FileName: notebook.js
   - Location:"./" (i.e. Same folder as this app.js file as well as the package.json file, where you run your node command)
   - Description: JavaScript File for storage of configuration related variables. (e.g. token, common variables etc.)
   - I didnt include this notebook.js in this repository, you can create a file with the following content:
   ```
   module.exports = {
      my_token: 'Place your token here'
      }
   ```
   - The program will get the token from file *notebook.js*, therefore, you no need to disclose your token when putting or getting code form external, because the *app.js* will get your token via ***my_token***.
   
2. ED_2
   - FileName: ShopOrder.json
   - Location:"./" 
   - Description: File holding all order informaion, usually called Order Enrty, or Book of Entry
   - This is where your shopping cart store order information, it is an **Array** with **Objects**, I call it *OrderBook*, each order will be called an *OrderEntry* as an object stored in the array. While *OderBook* is an object, where *OrderBook.OrderNumber[]* is an array. (well enough for confusion). Just to know each order consist of the following fields:
     - 1. ***Order Tag***  : This is the random number generated and you name it as OrderID before, but I call it Order Tag here
     - 2. ***Particulars***: The item ordered in the order entry
     - 3. ***Customer***   : User who place this order
     - 4. ***From Server***: Where the user from
     - 5. ***Status***     : This indiciated the status of the order, currently only two status "unclaim" and claimed by "User"
     - You can manually edit the ShopOrder.json with the following format:
     ```
     {OrderNumber:[
         {Order Entry # 1},
         {Order Entry # 2},
         {Order Entry # 3}
         ]}
     ```
     notice that last Order Entry has no ',' at the end.
     In life file, should be look like this:
     ```
     {"OrderNumber":[
         {"OrderTag":1, "Particulars":"Coke","Customer":"SlimeFrog","FromServer":"SlimeKingdom","Status":"unclaim"}
         ]
     }
     ```
     so you can edit the order informaton manaully without calling the bot or discord. Just edit the file will be ok
3. ED_3
   - FileName: GuestBook.json
   - Location: "./"
   - Description: File holding access right/permission information
   - This is bascially a file storing all the user permission in your bot program/application whichever you call it. This is **Object** file only, not an array with the following format:
   ```
   {UserName:AccessLevel,UserName:AccessLevel,UserName:AccessLevel}
   ```
   also the last entry has no "," following it.
   Real life example will be:
   ```
   {"Slime":100,"SlimeFrog":200}
   ```
   The bot, use a no. called *Access Level* to determin rather a user have access to certain command. Currently:
   ```
   Access Level < 100 is Black Listed User
   Access Level >= 100 is Normal User -- (new user will auto assign this Access Level)
   Access Level >= 150 is Chef
   Access Level >= 200 is Admin
   Access Level >= 250 is GOD!!
   ```
   Clever CEO may already notice, you can edit the GuestBook.json manually, see if you can add yourself as GOD manually in the GuestBook.json file.
   
   The reason why not using 1,2,3,4 is to leave room for adding extra *role* in your bot later on, so that you no need to change all the code, say if you want to add a role called *Worker* later, just assign below 175 access level is ok.
   
I tested the bot for few times already, but should still have bugs, so you better do more test on it.

## How the Math.Random work

This is to share with you how we generate random Order Tag in our bot. In the function *GenOrderTag* there is a code:
```
Math.floor(Math.random() * 999) + 1;
```
The function Math.random() will generate a random number range from 0 to 1 (not included 1), therefore, if you want to generate random number within 1000, then you should times the result with 999. Other example is if you want to make a roll dice function, then you can times the Math.random with 6, then you will only get result within 6.

Then we *floor* (remove all decimal) from the random result, you will always get a 998 or below number, so add 1 makes the random result possible to show 999.

