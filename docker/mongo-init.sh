mongosh <<EOF
var config = {'_id': 's0','members': [{_id:0, host: 'mongodb-teste'}]};
rs.initiate(config, { force: true });
rs.status();
EOF