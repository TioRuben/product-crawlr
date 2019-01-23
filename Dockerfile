FROM postgres
EXPOSE 5432
COPY init.sql /docker-entrypoint-initdb.d/
ENV POSTGRES_USER shop
ENV POSTGRES_PASSWORD vs2AMBjvnGQLr75Q
ENV POSTGRES_DB shop