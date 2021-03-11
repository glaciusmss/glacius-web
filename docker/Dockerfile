FROM node:12

RUN apt-get -y update \
	&& apt-get install -y git

RUN npm install -g @vue/cli

RUN mkdir -p /var/www/html/

COPY ./docker/start.sh /usr/local/bin/start

RUN chmod +x /usr/local/bin/start

WORKDIR /var/www/html/

CMD [ "/usr/local/bin/start" ]