from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import datetime,timedelta
from dateutil.relativedelta import *
from flask_cors import CORS
import os
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///yoga-class.db'  # Use SQLite for simplicity
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.environ["RENDER_MOUNT_POINT"]}/yoga-class.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)
# Define User model
class User(db.Model):
    username = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(50))
    name = db.Column(db.String(100))
    age = db.Column(db.Integer, db.CheckConstraint('age >= 18 AND age <= 65'))
    contact = db.Column(db.String(20))
    joined_date = db.Column(db.DateTime,default=datetime.now())
    is_active = db.Column(db.Boolean,default=True)

# Define Batches model
class Batches(db.Model):
    batch_id = db.Column(db.Integer, primary_key=True)
    batch = db.Column(db.String(50))

# Define BatchChangeRequest model
class BatchChangeRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), db.ForeignKey('user.username'))
    requested_time = db.Column(db.DateTime,default=datetime.now()+relativedelta(months=+1))  # You may want to use a proper date type here
    batch_id = db.Column(db.Integer, db.ForeignKey('batches.batch_id'))

# Define PaymentHistory model
class PaymentHistory(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), db.ForeignKey('user.username'))
    time_of_payment = db.Column(db.DateTime,default=datetime.now())  # Adjust as per your requirements
    amount = db.Column(db.Integer,default=500)

# Create tables
with app.app_context():
    db.create_all()
# Routes
@app.route('/')
def home():
    return 'Welcome to the Yoga Class App!'

@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    age = data.get('age')
    age = int(age)
    contact = data.get('contact')
    batch = data.get('batch')
    batch = int(batch)
    # Hash and salt the password before storing
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        username=username,
        password=hashed_password,
        name=name,
        age=age,
        contact=contact
    )
    new_batch_change_request = BatchChangeRequest(username=username,batch_id=batch,requested_time=datetime.utcnow())
    try:
        db.session.add(new_user)
        db.session.add(new_batch_change_request)
        db.session.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Username already exists'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401
@app.route('/batch-change', methods=['POST'])
def batchChangeRequest():
    data = request.get_json()
    username = data.get('username')
    new_batch_id = data.get('new_batch_id')
    new_batch_id = int(new_batch_id)
    new_batch_change_request = BatchChangeRequest(username=username,batch_id=new_batch_id)
    try:
        db.session.add(new_batch_change_request)
        db.session.commit()
        return jsonify({'message': 'Request Processed Successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
@app.route('/get-current-batch',methods=['GET'])
def getCurrentBatch():
    username = request.args.get('username')
    # Query the BatchChangeRequest table
    query = db.session.query(BatchChangeRequest.batch_id).filter_by(username=username)
    # Add a condition to filter records with requested_time less than the current time
    query = query.filter(BatchChangeRequest.requested_time < datetime.now())
    # Order the results by requested_time in descending order and limit to 1 to get the most recent record
    query = query.order_by(BatchChangeRequest.requested_time.desc()).limit(1)
    result = query.first()
    if result is not None:
        res2 = db.session.query(Batches.batch).filter_by(batch_id=result.batch_id)
        res2 = res2.first()
        return jsonify({'current_batch': result.batch_id,'batch':res2[0]})
    else:
        return jsonify({'error': f'No records found for username: {username}'}), 404
@app.route('/complete-payment',methods=['POST'])
def completePayment():
    data = request.get_json()
    username = data.get('username')
    amount = data.get('amount')
    new_payment = PaymentHistory(username=username,amount=amount)
    try:
        db.session.add(new_payment)
        db.session.commit()
        return jsonify({'message': 'Payment Processed Successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
@app.route('/get-payment-status',methods=['GET'])    
def getPaymentStatus():
    username = request.args.get('username')
    query = db.session.query(PaymentHistory.time_of_payment).filter_by(username=username)
    # Order the results by time_of_payment in descending order and limit to 1 to get the most recent record
    query = query.order_by(PaymentHistory.time_of_payment.desc()).limit(1)
    current_month_year = datetime.now()
    result = query.first()
    user = User.query.get(username)
    current_month,current_year = current_month_year.month,current_month_year.year
    if(result):
        last_payment = result[0]
        last_payment_month,last_payment_year = last_payment.month,last_payment.year
        diff = (current_year-last_payment_year)*12 + current_month-last_payment_month
    else:
        last_payment = None
        joined_date = user.joined_date
        joined_date_month,joined_date_year = joined_date.month,joined_date.year
        diff = (current_year-joined_date_year)*12 + current_month-joined_date_month + 1
    if diff==0:
        return jsonify({'due_status': False,'amount':0})
    else:
        return jsonify({'due_status': True,'amount':diff*500})
@app.route('/get-active-status',methods=['GET'])
def getActiveStatus():
    username = request.args.get('username')
    update_user_activity(username)
    user = User.query.get(username)
    if user.is_active:
        return jsonify({'is_active': True})
    else:
        return jsonify({'is_active': False})

def update_user_activity(username):
    try:
        user = User.query.get(username)
        query = db.session.query( PaymentHistory.time_of_payment).filter_by(username=username)
        query = query.order_by(PaymentHistory.time_of_payment.desc()).limit(1)
        result = query.first()
        if not result:
            current_month_year = datetime.now().strftime('%m/%Y')
            joined_month_year = user.joined_date.strftime('%m/%Y')
            if current_month_year == joined_month_year:
                user.is_active = True
            else:
                user.is_active = False
        else:
            current_month = datetime.now().month
            current_year = datetime.now().year
            last_payment_month = result[0].month
            last_payment_year = result[0].year
            diff = (current_year-last_payment_year)*12 + current_month-last_payment_month
            if diff<=1:
                user.is_active = True
            else:
                user.is_active = False

        db.session.commit()
    except:
        db.session.rollback()
        return False
    return True
if __name__ == '__main__':
    app.run(debug=True)
