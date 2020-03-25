# node-rest-api
rest api server in node

/products: GET, POST, 
/products/{productId}: GET, PATCH, DELETE

/orders: GET, POST, (Wip)
/orders/{orderId}: GET, DELETE (Wip)


run the service: 
1. add file "nodemon.json" containing 
      {
        "env": {
          "MONGO_ATLAS_PASSWORD": password
        }
      }

2. "npm start" from 'sampsite' dir
