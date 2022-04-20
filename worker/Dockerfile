FROM python:alpine
RUN pip install requests
RUN pip install mysql-connector-python
COPY worker.py / 
CMD ["python", "worker.py"]
