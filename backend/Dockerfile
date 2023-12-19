FROM python:3.8-slim

RUN mkdir -p /backend
WORKDIR /backend
COPY . /backend
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python", "flex-yoga-app.wsgi"]
