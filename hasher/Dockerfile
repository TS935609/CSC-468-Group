FROM python:alpine
RUN pip install Flask
COPY hasher.py / 
CMD ["python", "hasher.py" ]
Expose 80
HEALTHCHECK \
  --interval=1s --timeout=2s --retries=3 --start-period=1s \
  CMD curl http://localhost/ || exit 1
