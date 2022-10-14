# load ip addresses to environment

export API_SERVER_IP=$(getent hosts server | awk '{ print $1 }')
export PGADMIN_IP=$(getent hosts pgadmin | awk '{ print $1 }')

envsubst '$API_SERVER_IP $PGADMIN_IP' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf
