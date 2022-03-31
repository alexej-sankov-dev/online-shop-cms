# Run

```bash
$ python3 -m venv venv  # on Windows, use "python -m venv venv" instead
$ . venv/bin/activate  # on Windows, use "venv\Scripts\activate" instead
$ pip3 install -r requirements.txt
```

In the project directory, run the serer on [http://localhost:3001]:

### `python3 server.py`

# Data Model
## Order
### Comlumns:
    orderid - Integer, primary_key
    clientname - String(80, nullable=False
    address - String(120), nullable=False
    contact - String(80), nullable=False
    sum - Integer, nullable=False
    ownerid - Integer, nullable=False
    status - String(80), nullable=False


# Rest API

## Get Orders
### Request
    `GET /orders`
### Respone
    `Body: [{"orderid":x, "clientname":"x", "address":"x","contact":"x", "sum":x, "status":"x"}]`

## Get Orders of a User
### Request
    `GET /orders/:id`
### Respone
    `Body: [{"orderid":x, "clientname":"x", "address":"x","contact":"x", "sum":x, "status":"x"}]`

## Get Order
### Request
    `GET /order/:id`
### Respone
    `Body: {"orderid":x, "clientname":"x", "address":"x","contact":"x", "sum":x, "status":"x"}`

## Create Order
### Request
    `POST /order`
    `Body: {"clientname":"x", "address":"x","contact":"x", "sum":x, "ownerid"=x}`
### Respone
    `Body: {"orderid":x, "clientname":"x", "address":"x","contact":"x", "sum":x, "status":"processing"}`
    When created Order.status ==  processing

## Update Status of Order
### Request
    `PATCH /order/:id`
    `Body: {"userid"=x, "status":"new_status"}`
    Checks premission to edit if userid == ownerid
### Respone
    if user is allowed to change:
    `Body: {"orderid":x, "clientname":"x", "address":"x","contact":"x", "sum":x, "status":"processing"}`
    if user is not allowed to change:
    `Body: {"success":false}`

## Delete Order
### Request
    `DELETE /order/:id`
    `Body: {"userid"=x}`
    Checks premission to delete if userid == ownerid
### Respone
    if user is allowed to change:
    `Body: {"success":true}`
    if user is not allowed to change:
    `Body: {"success":false}