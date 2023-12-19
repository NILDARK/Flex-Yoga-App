from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy.exc import IntegrityError
from datetime import datetime, timedelta
from dateutil.relativedelta import relativedelta
from flask_cors import CORS
import os

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
CORS(app)

class User(db.Model):
    """User Model for the database."""
    username = db.Column(db.String(50), primary_key=True)
    password = db.Column(db.String(1000))
    name = db.Column(db.String(10000))
    age = db.Column(db.Integer, db.CheckConstraint('age >= 18 AND age <= 65'))
    contact = db.Column(db.String(20))
    joined_date = db.Column(db.DateTime, default=lambda: datetime.now())
    is_active = db.Column(db.Boolean, default=True)

class Batches(db.Model):
    """Batches Model for the database."""
    batch_id = db.Column(db.Integer, primary_key=True)
    batch = db.Column(db.String(50))

class BatchChangeRequest(db.Model):
    """BatchChangeRequest Model for the database."""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), db.ForeignKey('user.username'))
    requested_time = db.Column(db.DateTime, default=lambda: datetime.now() + relativedelta(months=+1))
    batch_id = db.Column(db.Integer, db.ForeignKey('batches.batch_id'))

class PaymentHistory(db.Model):
    """PaymentHistory Model for the database."""
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), db.ForeignKey('user.username'))
    time_of_payment = db.Column(db.DateTime, default=lambda: datetime.now())
    amount = db.Column(db.Integer, default=500)

with app.app_context():
    db.create_all()
    batch_1 = Batches(batch='6-7AM')
    batch_2 = Batches(batch='7-8AM')
    batch_3 = Batches(batch='8-9AM')
    batch_4 = Batches(batch='5-6PM')

    db.session.add_all([batch_1, batch_2, batch_3, batch_4])
    db.session.commit()

@app.route('/')
def home():
    """Home route that welcomes users."""
    return 'Welcome to the Yoga Class App!'

@app.route('/create_user', methods=['POST'])
def create_user():
    """Endpoint for creating a new user and enrolling in a batch."""
    data = request.get_json()

    username = data.get('username')
    password = data.get('password')
    name = data.get('name')
    age = int(data.get('age'))
    contact = data.get('contact')
    batch = int(data.get('batch'))

    # Hash and salt the password before storing
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        username=username,
        password=hashed_password,
        name=name,
        age=age,
        contact=contact
    )

    new_batch_change_request = BatchChangeRequest(username=username, batch_id=batch, requested_time=datetime.utcnow())

    try:
        db.session.add(new_user)
        db.session.commit()
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
    """Endpoint for validating user credentials and logging in."""
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/batch-change', methods=['POST'])
def batch_change_request():
    """Endpoint for initiating a batch change request."""
    data = request.get_json()
    username = data.get('username')
    new_batch_id = int(data.get('new_batch_id'))
    new_batch_change_request = BatchChangeRequest(username=username, batch_id=new_batch_id)

    try:
        db.session.add(new_batch_change_request)
        db.session.commit()
        return jsonify({'message': 'Request Processed Successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/get-current-batch', methods=['GET'])
def get_current_batch():
    """Endpoint for retrieving the user's current yoga batch."""
    username = request.args.get('username')

    query = (
        db.session.query(BatchChangeRequest.batch_id)
        .filter_by(username=username)
        .filter(BatchChangeRequest.requested_time < datetime.now())
        .order_by(BatchChangeRequest.requested_time.desc())
        .limit(1)
    )

    result = query.first()

    if result is not None:
        res2 = db.session.query(Batches.batch).filter_by(batch_id=result.batch_id).first()
        return jsonify({'current_batch': result.batch_id, 'batch': res2[0]})
    else:
        return jsonify({'error': f'No records found for username: {username}'}), 404

@app.route('/complete-payment', methods=['POST'])
def complete_payment():
    """Endpoint for recording the completion of a payment for the user."""
    data = request.get_json()
    username = data.get('username')
    amount = data.get('amount')
    new_payment = PaymentHistory(username=username, amount=amount)

    try:
        db.session.add(new_payment)
        db.session.commit()
        return jsonify({'message': 'Payment Processed Successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

@app.route('/get-payment-status', methods=['GET'])
def get_payment_status():
    """Endpoint for retrieving the payment status for the user."""
    username = request.args.get('username')

    query = (
        db.session.query(PaymentHistory.time_of_payment)
        .filter_by(username=username)
        .order_by(PaymentHistory.time_of_payment.desc())
        .limit(1)
    )

    current_month_year = datetime.now()

    result = query.first()
    user = User.query.get(username)
    current_month, current_year = current_month_year.month, current_month_year.year

    if result:
        last_payment = result[0]
        last_payment_month, last_payment_year = last_payment.month, last_payment.year
        diff = (current_year - last_payment_year) * 12 + current_month - last_payment_month
    else:
        last_payment = None
        joined_date = user.joined_date
        joined_date_month, joined_date_year = joined_date.month, joined_date.year
        diff = (current_year - joined_date_year) * 12 + current_month - joined_date_month + 1

    if diff == 0:
        return jsonify({'due_status': False, 'amount': 0})
    else:
        return jsonify({'due_status': True, 'amount': diff * 500})

@app.route('/get-active-status', methods=['GET'])
def get_active_status():
    """Endpoint for retrieving the user's active status."""
    username = request.args.get('username')
    update_user_activity(username)
    user = User.query.get(username)

    if user.is_active:
        return jsonify({'is_active': True})
    else:
        return jsonify({'is_active': False})

def update_user_activity(username):
    """Helper function to update the user's activity status."""
    try:
        user = User.query.get(username)
        query = (
            db.session.query(PaymentHistory.time_of_payment)
            .filter_by(username=username)
            .order_by(PaymentHistory.time_of_payment.desc())
            .limit(1)
        )

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
            diff = (current_year - last_payment_year) * 12 + current_month - last_payment_month

            if diff <= 1:
                user.is_active = True
            else:
                user.is_active = False

        db.session.commit()
    except:
        db.session.rollback()
        return False

    return True

if __name__ == '__main__':
    app.run(debug=False)
