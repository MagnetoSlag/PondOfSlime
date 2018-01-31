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
2. ED_2
   - FileName: ShopOrder.json
   - Location:"./" 
   - Description: File holding all order informaion, usually called Order Enrty, or Book of Entry
   - 
3. ED_3
   - FileName: GuestBook.json
   - Location: "./"
   - Description: File holding access right/permission information
