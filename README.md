# delta-shopping

## Project setup

### Prerequisites
```
Node and npm need should be installed on the system
- `node >= 10.12.0`
- `npm >= 6.5`
```

### Install Dependencies
```
npm install
```

### Run development environment
```
npm run dev
```

### API description
```
This API calculates the price of a basket of shopping.
Items are presented one at a time, in a list, identified by name - for example "Apple" or "Banana".

Multiple items are present multiple times in the list, so for example ["Apple", "Apple", "Banana"] is a basket with two apples and one banana.
 
Items are priced as follows:

 - Apples are 35p each
 - Bananas are 20p each
 - Melons are 50p each, but are available as ‘buy one get one free’
 - Limes are 15p each, but are available in a ‘three for the price of two’ offer

Given a list of shopping, calculate the total cost of those items.
```

### API document calculate price
```
HOST: 'http://localhost:3000/api/v1/shopping/calculate-price' \
METHOD: POST
HEADER: 'Content-Type: application/json'
REQUEST BODY: 
{
    "fruits": ["Apple", "Apple", "Banana", "Melon", "Melon", "Melon", "Lime", "Lime", "Lime", "Lime"]
}

RESPONSE BODY:
{
    "success": true,
    "totalPrice": "₹2.35",
    "message": "Successfully calculated the price"
}

```

### API Curl for calculate price (Can be directly copied in postman)
```
curl --location 'http://localhost:3000/api/v1/shopping/calculate-price' \
--header 'Content-Type: application/json' \
--data '{
    "fruits": ["Apple", "Apple", "Banana", "Melon", "Melon", "Melon", "Lime", "Lime", "Lime", "Lime"]
}'
```