from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os
from flask_cors import CORS


# Init flask app
app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'orders.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

# Order Class/Model
class Order(db.Model):
    orderid = db.Column(db.Integer, primary_key=True)
    clientname = db.Column(db.String(80), nullable=False)
    address = db.Column(db.String(120), nullable=False)
    contact = db.Column(db.String(80), nullable=False)
    sum = db.Column(db.Integer, nullable=False)
    ownerid = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(80), nullable=False)

    def __init__(self, clientname, address, contact, sum, ownerid):
        self.clientname = clientname
        self.address = address
        self.contact = contact
        self.sum = sum
        self.ownerid = ownerid
        self.status = 'processing'

# Order Schema
class OrderSchema(ma.Schema):
    class Meta:
        fields = ('orderid', 'clientname', 'address', 'contact', 'sum', 'status')

# Init Schema
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

# Create an Order
@app.route('/order', methods=['POST'])
def add_order():
    clientname = request.json['clientname']
    address = request.json['address']
    contact = request.json['contact']
    sum = request.json['sum']
    ownerid = request.json['ownerid']

    new_order = Order(clientname, address, contact, sum, ownerid)

    db.session.add(new_order)
    db.session.commit()

    return order_schema.jsonify(new_order)

# Get all Orders
@app.route('/orders', methods=['GET'])
def get_orders():
    all_orders = Order.query.all()
    result = orders_schema.dump(all_orders)
    return jsonify(result)

# Get all Orders by ownerid
@app.route('/orders/<int:id>', methods=['GET'])
def get_orders_by_owner(id):
    all_orders_by_owner = Order.query.filter_by(ownerid=id).all()
    result = orders_schema.dump(all_orders_by_owner)
    return jsonify(result)

# Handle single Order
@app.route('/order/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def handle_order(id):
    if request.method == 'GET':
        order = Order.query.get(id)
        return order_schema.jsonify(order)
    if request.method == 'PATCH':
        userid = request.json['userid']
        order = Order.query.get(id)
        if userid == order.ownerid:
            new_status = request.json['status']
            order.status = new_status
            db.session.commit()
            return order_schema.jsonify(order)
        else:
            return jsonify(success=False)
    if request.method == 'DELETE':
        userid = request.json['userid']
        order = Order.query.get(id)
        if userid == order.ownerid:
            db.session.delete(order)
            db.session.commit()
            return jsonify(success=True)
        else:
            return jsonify(success=False)

# run server on localhost
if __name__ == '__main__':
    app.run(host='localhost', port=3001)