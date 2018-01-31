# ShoppingCart for Discord

## External Dependency (i.e. This program need those stuff inorder to work)

You will need to place those stuff in the folder specified. For this project, put them all in the folder same as the app.js will be ok
1. ED_1
   - FileName: notebook.js
   - Location:"./" (i.e. Same folder as this app.js file)
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
   - This is where your shopping cart store order information, I call it *OrderBook*, each order will be called an *OrderEntry* with the following fields:
     - 1. ***Order Tag***  : This is the random number generated and you name it as OrderID before, but I call it Order Tag here
     - 2. ***Particulars***: The item ordered in the order entry
     - 3. ***Customer***   : User who place this order
     - 4. ***From Server***: Where the user from
     - 5. ***Status***     : This indiciated the status of the order, currently only two status "unclaim" and claimed by "User"
     - You can manually edit the ShopOrder.json with the following format:
     ```
     {OrderNumber:[
         {
3. ED_3
   - FileName: GuestBook.json
   - Location: "./"
   - Description: File holding access right/permission information
