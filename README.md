# ENV variables and their development values
#
# Secret key is included here only in development.
export SECRET_KEY_BASE="2c83f7055dfb1f11e8698764515bafeb85136f98d864a8fb2246b429d61cf43f91b8d60bdf138abdf11bc0aeb36098964274d9a597bd24fc58751df58f8dd9ac14fb77f56"

export STW_CLOUDFRONT_DOMAIN="da3bndq04bonc.cloudfront.net"

export STW_ROOT_URL="http://developmentsimpletoken.org:8080"
export STW_SALE_ROOT_URL="http://sale.developmentsimpletoken.org:8080"
export STW_KYC_ROOT_URL="http://kyc.developmentost.com:8080"

export STW_CAMPAIGN_ENCRYPTED_CLIENT_ID="118e1817b0fa6360e19933fe8af41a34"
export STW_CAMPAIGN_ENCRYPTED_LIST_ID="275467b8adfdf751"

export STW_REDIS_ENDPOINT=""
export STW_MEMCACHED_INSTANCES='127.0.0.1:11211,127.0.0.1:11210'
export STW_SK_ADMIN_PW=""

export STW_GEOIP_FILE_WITH_PATH='../GeoIP2-City.mmdb'

export STW_RECAPTCHA_SITE_KEY="6LfbfzQUAAAAAObwp0iXySZxH69WXY6NsLdKZF6B"

export STW_EARLY_ACCESS_REGISTER_START_DATE='2017-11-01 13:00:00 UTC'
export STW_EARLY_ACCESS_REGISTER_END_DATE='2017-11-13 20:00:00 UTC'
export STW_EARLY_ACCESS_SALE_START_DATE='2017-11-14 13:00:00 UTC'
export STW_GENERAL_ACCESS_SALE_START_DATE='2017-11-15 13:00:00 UTC'
export STW_GENERAL_ACCESS_SALE_END_DATE='2017-12-01 13:00:00 UTC'

# OST Other Product Urls
export COMPANY_ROOT_URL='http://developmentost.com:8080/'
export COMPANY_KIT_ROOT_URL='http://kit.developmentost.com:8080/'
export COMPANY_VIEW_ROOT_URL='http://view.developmentost.com:8080/'



#TO locally start angular app add this in your nginx.conf in server block kyc.developmentost.com;
#  location /js-css/dev/admin/angular/ {
#        rewrite  angular\/(.*)\.self(.*)\.js$  http://localhost:4200/$1.js  permanent;
#  }