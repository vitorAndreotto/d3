# Usa uma imagem oficial do MySQL
FROM mysql:8.0

# Copia o arquivo de configuração para o container
COPY my.cnf /etc/mysql/my.cnf

# Copia o arquivo de dump para o container
COPY dump.sql /docker-entrypoint-initdb.d/

# Define o ponto de entrada padrão
CMD ["mysqld"]