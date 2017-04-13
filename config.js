module.exports = {
    'twitterCredentials' : {
        'consumer_key'      : process.env.ckey || 'e4wdzm8t8C3tH3H1YbgJAM7kE',
        'consumer_secret'  : process.env.csecret || 'MekcLxkwYEAPcOw7XYvFlDt2SybVzy1qKCN8DPHb6N7YxOFwNx',
        'access_token_key'   : process.env.atkey || '4437543435-Il2uLSiA2XugwWAwUg2FNdmqLtpFFfL376lC1pU',
        'access_token_secret': process.env.atsecret || 'slSzGb6ssq02nmo6H8fqQVjBOs1lbjt6VrMYatvpfVdnE'
    },
    
    'postgresqlCredentials' : {
        'user': 'xazz',
        'database': process.env.DATABASE_URL || 'salvation',
        'password': '1234',
        'host': 'localhost',
        'port': 5432,
        'max': 10,
        'idleTimeoutMillis': 30000
    }
};